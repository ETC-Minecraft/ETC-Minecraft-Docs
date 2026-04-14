import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import jsYaml from 'js-yaml'
import { MC_ITEMS, ITEM_CATEGORIES, itemIcon, itemName } from '../lib/mcItems.js'

// ── MC color utils ────────────────────────────────────────────────────────────

const MC_COLORS = [
  { code: '&0', hex: '#000000', name: 'Negro' },
  { code: '&1', hex: '#0000AA', name: 'Azul' },
  { code: '&2', hex: '#00AA00', name: 'Verde' },
  { code: '&3', hex: '#00AAAA', name: 'Aqua' },
  { code: '&4', hex: '#AA0000', name: 'Rojo' },
  { code: '&5', hex: '#AA00AA', name: 'Morado' },
  { code: '&6', hex: '#FFAA00', name: 'Dorado' },
  { code: '&7', hex: '#AAAAAA', name: 'Gris' },
  { code: '&8', hex: '#555555', name: 'Gris osc.' },
  { code: '&9', hex: '#5555FF', name: 'Azul cl.' },
  { code: '&a', hex: '#55FF55', name: 'Verde cl.' },
  { code: '&b', hex: '#55FFFF', name: 'Aqua cl.' },
  { code: '&c', hex: '#FF5555', name: 'Rojo cl.' },
  { code: '&d', hex: '#FF55FF', name: 'Rosa' },
  { code: '&e', hex: '#FFFF55', name: 'Amarillo' },
  { code: '&f', hex: '#FFFFFF', name: 'Blanco' },
  { code: '&l', hex: null, name: 'Negrita' },
  { code: '&o', hex: null, name: 'Cursiva' },
  { code: '&r', hex: null, name: 'Reset' },
]

function ColorText({ text, className = '' }) {
  if (!text) return <span className={`text-zinc-600 italic ${className}`}>Sin texto</span>
  const parts = text.split(/(&[0-9a-flmnor])/gi)
  let color = '#AAAAAA', bold = false, italic = false
  const nodes = []
  parts.forEach((part, i) => {
    const mc = MC_COLORS.find(c => c.code.toLowerCase() === part.toLowerCase())
    if (mc) {
      if (mc.hex) color = mc.hex
      if (mc.code === '&l') bold = true
      if (mc.code === '&o') italic = true
      if (mc.code === '&r') { color = '#AAAAAA'; bold = false; italic = false }
    } else if (part) {
      nodes.push(<span key={i} style={{ color, fontWeight: bold ? 'bold' : 'normal', fontStyle: italic ? 'italic' : 'normal' }}>{part}</span>)
    }
  })
  return <span className={className}>{nodes}</span>
}

function insertAtCursor(ref, text, setter, currentValue) {
  const el = ref.current
  if (!el) { setter(currentValue + text); return }
  const s = el.selectionStart ?? currentValue.length
  const e = el.selectionEnd ?? currentValue.length
  const next = currentValue.slice(0, s) + text + currentValue.slice(e)
  setter(next)
  requestAnimationFrame(() => {
    el.focus()
    el.setSelectionRange(s + text.length, s + text.length)
  })
}

// ── Item Picker Modal ─────────────────────────────────────────────────────────

function ItemPickerModal({ current, onSelect, onClose }) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Todos')

  const filtered = MC_ITEMS.filter(item => {
    const matchCat = cat === 'Todos' || item.cat === cat
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <h3 className="font-semibold text-white text-sm">Seleccionar ítem de Minecraft</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors text-lg leading-none">✕</button>
        </div>
        <div className="px-4 py-2 border-b border-zinc-800 space-y-2">
          <input
            autoFocus
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-500 placeholder-zinc-500"
            placeholder="Buscar ítem… (ej: diamante, espada, cristal)"
          />
          <div className="flex flex-wrap gap-1">
            {['Todos', ...ITEM_CATEGORIES].map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${cat === c ? 'bg-brand-600 border-brand-600 text-white' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-y-auto p-3 grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-1.5">
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-8 text-zinc-600 text-sm">Sin resultados</div>
          )}
          {filtered.map(item => {
            const url = itemIcon(item.id)
            const isSelected = item.id === current
            return (
              <button key={item.id} onClick={() => { onSelect(item.id); onClose() }}
                title={item.name}
                className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all hover:bg-zinc-800 group ${isSelected ? 'border-brand-500 bg-brand-900/30' : 'border-transparent hover:border-zinc-700'}`}>
                <div className="w-10 h-10 flex items-center justify-center rounded bg-zinc-800/60">
                  {url ? <img src={url} alt={item.name} className="w-8 h-8 object-contain [image-rendering:pixelated]" onError={e => { e.target.style.display='none' }} /> : <span className="text-xl">📦</span>}
                </div>
                <span className="text-[9px] text-zinc-500 text-center leading-tight group-hover:text-zinc-300 line-clamp-2">{item.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>,
    document.body
  )
}

// ── Slot item display ────────────────────────────────────────────────────────

function SlotIcon({ material, size = 'md' }) {
  const url = itemIcon(material)
  const s = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'
  if (!url) return <span className="text-zinc-600 text-xs">?</span>
  return (
    <img src={url} alt={itemName(material)} className={`${s} object-contain [image-rendering:pixelated]`}
      onError={e => { e.target.replaceWith(Object.assign(document.createElement('span'), { textContent: '📦', className: 'text-lg' })) }} />
  )
}

// ── Rich text input ──────────────────────────────────────────────────────────

function McTextInput({ value, onChange, placeholder, label }) {
  const inputRef = useRef(null)
  const insert = (str) => insertAtCursor(inputRef, str, onChange, value)
  return (
    <div>
      {label && <label className="block text-xs text-zinc-500 mb-1">{label}</label>}
      <div className="flex flex-wrap gap-0.5 mb-1">
        {MC_COLORS.map(c => (
          <button key={c.code} type="button" onClick={() => insert(c.code)}
            title={`${c.code} — ${c.name}`}
            className="w-5 h-5 rounded text-[9px] font-bold border border-zinc-700 hover:scale-125 transition-transform leading-none flex items-center justify-center select-none"
            style={{ background: c.hex ?? '#2a2a2a', color: c.hex ? (c.hex === '#000000' ? '#888' : '#000') : '#fff' }}>
            {!c.hex ? c.code[1] : ''}
          </button>
        ))}
      </div>
      <input ref={inputRef} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-200 font-mono focus:outline-none focus:border-brand-500" />
      {value && (
        <div className="mt-1 px-2 py-1 bg-zinc-950/60 rounded text-sm min-h-[24px]">
          <ColorText text={value} />
        </div>
      )}
    </div>
  )
}

// ── Actions Editor ───────────────────────────────────────────────────────────

const ACTION_TEMPLATES = [
  { label: 'Mensaje',      icon: '💬', line: '[MESSAGE] &aTexto al jugador' },
  { label: 'Broadcast',    icon: '📢', line: '[BROADCAST] &e%player_name% hizo algo' },
  { label: 'Consola',      icon: '⌨️', line: '[CONSOLE] give {player} diamond 1' },
  { label: 'Jugador',      icon: '🕹️', line: '[PLAYER] spawn' },
  { label: 'Cerrar',       icon: '✖️', line: '[CLOSE]' },
  { label: 'Abrir menú',   icon: '🗂️', line: '[MENU] nombre-menu' },
  { label: 'Sonido',       icon: '🔊', line: '[SOUND] ENTITY_PLAYER_LEVELUP' },
  { label: 'Título',       icon: '🖼️', line: '[TITLE] &6Título;&7Sub' },
  { label: 'ActionBar',    icon: '📍', line: '[ACTIONBAR] &e+100 puntos' },
  { label: 'Dar dinero',   icon: '💰', line: '[MONEY_ADD] 500' },
  { label: 'Quitar dinero',icon: '💸', line: '[MONEY_TAKE] 500' },
  { label: 'Variable SET', icon: '📦', line: '[VAR:SET] puntos = 0' },
  { label: 'Variable +',   icon: '➕', line: '[VAR:ADD] puntos = {var:puntos} + 1' },
  { label: 'Condición',    icon: '🔀', line: '[IF permission:mi.permiso] [MESSAGE] &aSí' },
  { label: 'Delay',        icon: '⏱️', line: '[DELAY] 40' },
  { label: 'Cooldown',     icon: '⏰', line: '[COOLDOWN:premio:86400] &cEspera {cooldown:premio}' },
  { label: 'Chance',       icon: '🎲', line: '[RANDOM:50] [MESSAGE] &a¡Ganaste!' },
]
const PAPI_TOKENS = ['%player_name%','%player_health%','%player_level%','%vault_balance%','%luckperms_primary_group%']
const ETC_TOKENS = ['{player}','{world}','{balance}','{balance_fmt}','{var:puntos}']

function ActionsEditor({ actions, onChange }) {
  const refs = useRef([])
  const update = (i, v) => { const a = [...actions]; a[i] = v; onChange(a) }
  const remove = (i) => onChange(actions.filter((_, j) => j !== i))
  const move = (i, dir) => {
    const a = [...actions]; const j = i + dir
    if (j < 0 || j >= a.length) return
    ;[a[i], a[j]] = [a[j], a[i]]; onChange(a)
  }
  const insertIntoLine = (i, text) => {
    const el = refs.current[i]
    const s = el?.selectionStart ?? actions[i].length
    const e = el?.selectionEnd ?? actions[i].length
    const next = actions[i].slice(0, s) + text + actions[i].slice(e)
    update(i, next)
    requestAnimationFrame(() => { el?.focus(); el?.setSelectionRange(s + text.length, s + text.length) })
  }
  return (
    <div className="space-y-3">
      <p className="text-xs text-zinc-500">Añadir acción rápida:</p>
      <div className="flex flex-wrap gap-1">
        {ACTION_TEMPLATES.map(t => (
          <button key={t.label} type="button" onClick={() => onChange([...actions, t.line])}
            className="text-xs px-2 py-1 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 rounded-lg text-zinc-300 transition-all flex items-center gap-1">
            <span>{t.icon}</span><span>{t.label}</span>
          </button>
        ))}
      </div>
      {actions.length === 0 && (
        <div className="text-center py-4 text-zinc-600 text-xs border border-dashed border-zinc-800 rounded-lg">Sin acciones</div>
      )}
      {actions.map((line, i) => (
        <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="flex items-center px-3 py-1.5 bg-zinc-800/50 border-b border-zinc-800 gap-2">
            <span className="text-xs text-zinc-500 font-mono flex-1 truncate">{line.slice(0,50)}</span>
            <button onClick={() => move(i,-1)} disabled={i===0} className="text-zinc-600 hover:text-white disabled:opacity-30 text-xs">▲</button>
            <button onClick={() => move(i,1)} disabled={i===actions.length-1} className="text-zinc-600 hover:text-white disabled:opacity-30 text-xs">▼</button>
            <button onClick={() => remove(i)} className="text-red-600 hover:text-red-400 text-xs">✕</button>
          </div>
          <div className="p-2.5 space-y-1.5">
            <input ref={el => refs.current[i] = el} value={line} onChange={e => update(i, e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-green-300 font-mono focus:outline-none focus:border-brand-500" />
            <div className="flex flex-wrap gap-1">
              {[...ETC_TOKENS,...PAPI_TOKENS].map(p => (
                <button key={p} type="button" onClick={() => insertIntoLine(i, p)}
                  className="text-[10px] px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-brand-400 rounded font-mono transition-colors">{p}</button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Slot Editor Modal ─────────────────────────────────────────────────────────

function SlotEditorModal({ slot, item, onSave, onClose }) {
  const [material, setMaterial] = useState(item.material ?? 'AIR')
  const [name, setName] = useState(item.name ?? '')
  const [lore, setLore] = useState(item.lore ?? [])
  const [glow, setGlow] = useState(item.glow ?? false)
  const [closeOnClick, setCloseOnClick] = useState(item.closeOnClick ?? false)
  const [actions, setActions] = useState(item.actions ?? [])
  const [tab, setTab] = useState('item')
  const [pickerOpen, setPickerOpen] = useState(false)

  const url = itemIcon(material)

  const save = () => {
    onSave({ material, name, lore: lore.filter(Boolean), glow, closeOnClick, actions })
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
          <div className="w-10 h-10 flex items-center justify-center bg-zinc-800 rounded-lg shrink-0">
            {url ? <img src={url} alt={itemName(material)} className="w-8 h-8 object-contain [image-rendering:pixelated]" /> : <span className="text-zinc-600">?</span>}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">Slot {slot}</p>
            <div className="text-xs"><ColorText text={name || '&7Sin nombre'} /></div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white text-xl leading-none shrink-0">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800">
          {[['item','📦 Ítem'],['lore','📄 Lore'],['actions','⚡ Acciones']].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-4 py-2 text-xs font-medium transition-colors ${tab===id ? 'text-brand-400 border-b-2 border-brand-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {tab === 'item' && (
            <>
              {/* Material picker button */}
              <div>
                <label className="block text-xs text-zinc-500 mb-2">Material</label>
                <button type="button" onClick={() => setPickerOpen(true)}
                  className="w-full flex items-center gap-3 bg-zinc-800 border border-zinc-700 hover:border-brand-500 rounded-xl px-3 py-2.5 transition-colors group">
                  <div className="w-10 h-10 flex items-center justify-center bg-zinc-700 rounded-lg">
                    {url ? <img src={url} alt={itemName(material)} className="w-8 h-8 object-contain [image-rendering:pixelated]" /> : <span className="text-2xl">📦</span>}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white text-sm font-medium">{itemName(material)}</p>
                    <p className="text-zinc-500 text-xs font-mono">{material}</p>
                  </div>
                  <span className="text-zinc-500 group-hover:text-brand-400 transition-colors text-xs">Cambiar →</span>
                </button>
              </div>

              <McTextInput value={name} onChange={setName} placeholder="&a&lNombre del ítem" label="Nombre (soporta &colores)" />

              <div className="flex gap-6">
                {[
                  { label: 'Glow ✨', val: glow, set: setGlow },
                  { label: 'Cerrar al clic', val: closeOnClick, set: setCloseOnClick },
                ].map(({ label, val, set }) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer">
                    <div onClick={() => set(v => !v)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${val ? 'bg-brand-600' : 'bg-zinc-700'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${val ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                    <span className="text-sm text-zinc-400">{label}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {tab === 'lore' && (
            <div className="space-y-2">
              <p className="text-xs text-zinc-500">Líneas de descripción del ítem. Soporta &colores y placeholders.</p>
              {lore.map((line, i) => (
                <div key={i} className="bg-zinc-800/50 border border-zinc-800 rounded-xl p-2 space-y-1.5">
                  <div className="flex items-center gap-1">
                    <div className="flex flex-wrap gap-0.5 flex-1">
                      {MC_COLORS.slice(0,16).map(c => (
                        <button key={c.code} type="button" onClick={() => {
                          const l = [...lore]; l[i] = l[i] + c.code; setLore(l)
                        }}
                          className="w-4 h-4 rounded border border-zinc-700 hover:scale-125 transition-transform"
                          style={{ background: c.hex ?? '#333' }} title={c.name} />
                      ))}
                    </div>
                    <button onClick={() => { const l=[...lore]; if(i>0){[l[i],l[i-1]]=[l[i-1],l[i]];setLore(l)} }} disabled={i===0} className="text-zinc-600 hover:text-white disabled:opacity-30 text-xs px-0.5">▲</button>
                    <button onClick={() => { const l=[...lore]; if(i<l.length-1){[l[i],l[i+1]]=[l[i+1],l[i]];setLore(l)} }} disabled={i===lore.length-1} className="text-zinc-600 hover:text-white disabled:opacity-30 text-xs px-0.5">▼</button>
                    <button onClick={() => setLore(lore.filter((_,j)=>j!==i))} className="text-red-600 hover:text-red-400 text-xs px-0.5">✕</button>
                  </div>
                  <input value={line} onChange={e => { const l=[...lore]; l[i]=e.target.value; setLore(l) }}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm text-zinc-200 font-mono focus:outline-none focus:border-brand-500"
                    placeholder={`&7Línea ${i+1}…`} />
                  {line && <div className="px-1 text-xs"><ColorText text={line} /></div>}
                </div>
              ))}
              <button type="button" onClick={() => setLore(l=>[...l,''])} className="text-xs text-brand-400 hover:text-brand-300 transition-colors">+ Añadir línea</button>
            </div>
          )}

          {tab === 'actions' && <ActionsEditor actions={actions} onChange={setActions} />}
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-4 py-3 border-t border-zinc-800">
          <button onClick={() => { onSave(null); onClose() }} className="text-xs text-red-500 hover:text-red-400 mr-auto">Limpiar slot</button>
          <button onClick={onClose} className="text-sm px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors">Cancelar</button>
          <button onClick={save} className="text-sm px-5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-colors">Guardar ✓</button>
        </div>
      </div>
      {pickerOpen && <ItemPickerModal current={material} onSelect={setMaterial} onClose={() => setPickerOpen(false)} />}
    </div>,
    document.body
  )
}

// ── YAML generation ──────────────────────────────────────────────────────────

function buildYaml({ title, rows, permission, items }) {
  const obj = { title, rows }
  if (permission) obj.permission = permission
  const itemsObj = {}
  Object.entries(items).forEach(([slot, it]) => {
    if (!it || it.material === 'AIR') return
    const entry = { material: it.material }
    if (it.name) entry.name = it.name
    if (it.lore?.length) entry.lore = it.lore
    if (it.glow) entry.glow = true
    if (it.closeOnClick) entry['close-on-click'] = true
    if (it.actions?.length) entry.actions = it.actions
    itemsObj[parseInt(slot)] = entry
  })
  if (Object.keys(itemsObj).length) obj.items = itemsObj
  return jsYaml.dump(obj, { lineWidth: 120, quotingType: '"' })
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function MenuBuilder() {
  const [rows, setRows] = useState(3)
  const [title, setTitle] = useState('&8⬛ &6&lMi Menú &8⬛')
  const [permission, setPermission] = useState('')
  const [menuName, setMenuName] = useState('mi-menu')
  const [items, setItems] = useState({})
  const [editingSlot, setEditingSlot] = useState(null)
  const [copied, setCopied] = useState(false)

  const totalSlots = rows * 9

  useEffect(() => {
    const max = rows * 9
    setItems(prev => {
      const cleaned = {}
      Object.entries(prev).forEach(([k,v]) => { if (parseInt(k) < max) cleaned[k] = v })
      return cleaned
    })
  }, [rows])

  const yaml = buildYaml({ title, rows, permission, menuName, items })

  const copyYaml = () => {
    navigator.clipboard?.writeText(yaml)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const editingItem = editingSlot !== null ? (items[editingSlot] ?? {}) : null

  const saveSlot = useCallback((slot, data) => {
    setItems(prev => {
      if (!data) { const n = {...prev}; delete n[slot]; return n }
      return { ...prev, [slot]: data }
    })
  }, [])

  const usedSlots = Object.keys(items).filter(k => items[k]?.material && items[k].material !== 'AIR').length

  return (
    <div>
      <div className="mb-8">
        <div className="text-brand-400 text-sm font-mono mb-3">Herramientas · ETCCore</div>
        <h1 className="text-3xl font-bold text-white mb-2">🖥️ Menu Builder</h1>
        <p className="text-zinc-400">
          Diseña menús GUI visualmente — selecciona ítems reales de Minecraft, añade colores, lore y acciones.
          Al terminar copia el YAML en <code className="text-brand-400">plugins/ETCCore/menus/{menuName}.yml</code>.
        </p>
      </div>

      {/* Config */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Nombre del archivo</label>
          <input value={menuName} onChange={e => setMenuName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-500" />
        </div>
        <McTextInput value={title} onChange={setTitle} placeholder="&6&lMi Menú" label="Título del menú (&colores)" />
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Permiso (vacío = todos)</label>
          <input value={permission} onChange={e => setPermission(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-500"
            placeholder="mi.permiso" />
        </div>
      </div>

      {/* Rows */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xs text-zinc-500">Filas:</span>
        {[1,2,3,4,5,6].map(r => (
          <button key={r} onClick={() => setRows(r)}
            className={`w-9 h-9 rounded-lg text-sm font-bold transition-all border ${rows===r ? 'bg-brand-600 border-brand-600 text-white' : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
            {r}
          </button>
        ))}
        <span className="text-xs text-zinc-600 ml-1 tabular-nums">{usedSlots}/{totalSlots} slots usados</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Inventory grid */}
        <div>
          <div className="bg-zinc-700 border border-zinc-600 border-b-0 rounded-t-xl px-4 py-2 text-center">
            <span className="text-sm font-bold"><ColorText text={title || '&7Sin título'} /></span>
          </div>
          <div className="bg-zinc-800 border border-zinc-600 rounded-b-xl p-3">
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(9,1fr)' }}>
              {Array.from({ length: totalSlots }, (_, slot) => {
                const it = items[slot]
                const hasItem = it?.material && it.material !== 'AIR'
                return (
                  <button key={slot} onClick={() => setEditingSlot(slot)}
                    className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center relative transition-all group
                      ${hasItem
                        ? 'border-zinc-500 bg-zinc-700 hover:border-brand-500 hover:scale-105'
                        : 'border-zinc-700 bg-zinc-900/80 hover:border-zinc-600 hover:bg-zinc-800'}`}>
                    {hasItem ? (
                      <>
                        <SlotIcon material={it.material} />
                        {it.name && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs whitespace-nowrap z-10 pointer-events-none shadow-lg">
                            <ColorText text={it.name} />
                          </div>
                        )}
                        {it.glow && <span className="absolute top-0.5 right-0.5 text-[8px] text-yellow-300 leading-none">✨</span>}
                        {it.actions?.length > 0 && <span className="absolute bottom-0.5 right-0.5 text-[8px] text-green-400 leading-none">⚡</span>}
                      </>
                    ) : (
                      <span className="text-[10px] text-zinc-700 group-hover:text-zinc-500 transition-colors">{slot}</span>
                    )}
                  </button>
                )
              })}
            </div>
            <p className="text-center text-xs text-zinc-600 mt-2">Clic en cualquier slot para configurarlo</p>
          </div>
          <div className="flex gap-4 mt-1.5 text-xs text-zinc-600">
            <span>✨ = glow</span><span>⚡ = acciones</span>
          </div>
        </div>

        {/* YAML */}
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-xs text-zinc-400 rounded-t-xl border border-zinc-700 border-b-0">
              <span><span className="text-zinc-600">menus/</span><span className="text-white font-mono">{menuName}.yml</span></span>
              <button onClick={copyYaml} className="flex items-center gap-1.5 hover:text-white transition-colors">
                {copied
                  ? <><svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg><span className="text-green-400">¡Copiado!</span></>
                  : <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copiar YAML</>}
              </button>
            </div>
            <pre className="bg-zinc-900 border border-zinc-700 rounded-b-xl p-4 text-xs text-zinc-300 font-mono overflow-auto whitespace-pre max-h-[420px]">{yaml}</pre>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-400">
            <p className="text-white font-semibold mb-2">¿Cómo usarlo?</p>
            <ol className="list-decimal list-inside text-xs space-y-1">
              <li>Guarda el YAML en <code className="text-brand-400">plugins/ETCCore/menus/{menuName}.yml</code></li>
              <li>Recarga con <code className="text-brand-400">/fccmds reload</code></li>
              <li>Abre con la acción <code className="text-brand-400">[MENU] {menuName}</code></li>
            </ol>
          </div>
        </div>
      </div>

      {editingSlot !== null && (
        <SlotEditorModal slot={editingSlot} item={editingItem} onSave={data => saveSlot(editingSlot, data)} onClose={() => setEditingSlot(null)} />
      )}
    </div>
  )
}
