import { useState, useRef } from 'react'
import jsYaml from 'js-yaml'

// ── Color utils (shared) ──────────────────────────────────────────────────────
const MC_COLORS = [
  { code: '&0', hex: '#000000' },{ code: '&1', hex: '#0000AA' },{ code: '&2', hex: '#00AA00' },
  { code: '&3', hex: '#00AAAA' },{ code: '&4', hex: '#AA0000' },{ code: '&5', hex: '#AA00AA' },
  { code: '&6', hex: '#FFAA00' },{ code: '&7', hex: '#AAAAAA' },{ code: '&8', hex: '#555555' },
  { code: '&9', hex: '#5555FF' },{ code: '&a', hex: '#55FF55' },{ code: '&b', hex: '#55FFFF' },
  { code: '&c', hex: '#FF5555' },{ code: '&d', hex: '#FF55FF' },{ code: '&e', hex: '#FFFF55' },
  { code: '&f', hex: '#FFFFFF' },{ code: '&l', hex: null },{ code: '&o', hex: null },{ code: '&r', hex: null },
]
function ColorText({ text }) {
  if (!text) return <span className="text-zinc-600 italic">Sin texto</span>
  const parts = text.split(/(&[0-9a-flmnor])/gi)
  let color = '#AAAAAA', bold = false
  const nodes = []
  parts.forEach((p, i) => {
    const mc = MC_COLORS.find(c => c.code.toLowerCase() === p.toLowerCase())
    if (mc) { if (mc.hex) color = mc.hex; if (mc.code === '&l') bold = true; if (mc.code === '&r') { color = '#AAAAAA'; bold = false } }
    else if (p) nodes.push(<span key={i} style={{ color, fontWeight: bold?'bold':'normal' }}>{p}</span>)
  })
  return <span>{nodes}</span>
}

// ── Action type definitions ───────────────────────────────────────────────────
const ACTION_DEFS = {
  MESSAGE:    { label: '💬 Mensaje al jugador',      color: 'blue',    serialize: d => `[MESSAGE] ${d.text??''}` },
  BROADCAST:  { label: '📢 Broadcast (todos)',        color: 'yellow',  serialize: d => `[BROADCAST] ${d.text??''}` },
  CONSOLE:    { label: '⌨️ Comando de consola',       color: 'red',     serialize: d => `[CONSOLE] ${d.cmd??''}` },
  PLAYER:     { label: '🕹️ Comando del jugador',      color: 'green',   serialize: d => `[PLAYER] ${d.cmd??''}` },
  CLOSE:      { label: '✖️ Cerrar menú',              color: 'zinc',    serialize: () => '[CLOSE]' },
  MENU:       { label: '🗂️ Abrir menú',               color: 'purple',  serialize: d => `[MENU] ${d.name??''}` },
  SOUND:      { label: '🔊 Reproducir sonido',        color: 'cyan',    serialize: d => `[SOUND] ${d.sound??''}${d.pitch?`:${d.pitch}`:''}` },
  TITLE:      { label: '🖼️ Título en pantalla',       color: 'orange',  serialize: d => `[TITLE] ${d.title??''};${d.subtitle??''};${d.fadein??10};${d.stay??60};${d.fadeout??10}` },
  ACTIONBAR:  { label: '📍 ActionBar',                color: 'pink',    serialize: d => `[ACTIONBAR] ${d.text??''}` },
  DELAY:      { label: '⏱️ Esperar (delay)',           color: 'zinc',    serialize: d => `[DELAY] ${d.ticks??20}` },
  MONEY_ADD:  { label: '💰 Dar dinero (Vault)',        color: 'green',   serialize: d => `[MONEY_ADD] ${d.amount??0}` },
  MONEY_TAKE: { label: '💸 Quitar dinero (Vault)',     color: 'red',     serialize: d => `[MONEY_TAKE] ${d.amount??0}` },
  'VAR:SET':  { label: '📦 Variable: establecer',     color: 'indigo',  serialize: d => `[VAR:SET] ${d.varname??''} = ${d.value??''}` },
  'VAR:ADD':  { label: '➕ Variable: sumar',           color: 'indigo',  serialize: d => `[VAR:ADD] ${d.varname??''} = ${d.value??''}` },
  'VAR:TAKE': { label: '➖ Variable: restar',          color: 'indigo',  serialize: d => `[VAR:TAKE] ${d.varname??''} = ${d.value??''}` },
  IF:         { label: '🔀 Condición (IF)',            color: 'amber',   serialize: d => `[IF ${d.condition??''}] ${d.then??''}${d.else?` [ELSE] ${d.else}`:''}` },
  RANDOM:     { label: '🎲 Aleatorio (chance)',        color: 'pink',    serialize: d => `[RANDOM:${d.chance??50}] ${d.action??''}` },
  COOLDOWN:   { label: '⏰ Cooldown',                  color: 'zinc',    serialize: d => `[COOLDOWN:${d.id??'cd'}:${d.seconds??60}] ${d.message??''}` },
  TELEPORT:   { label: '🌀 Teleportar',               color: 'teal',    serialize: d => `[TELEPORT] ${d.world??'world'} ${d.x??0} ${d.y??64} ${d.z??0}` },
  GIVE:       { label: '🎁 Dar ítem',                  color: 'orange',  serialize: d => `[GIVE] ${d.material??'DIAMOND'} ${d.amount??1}` },
}

const COLOR_MAP = {
  blue:'bg-blue-900/30 border-blue-800 text-blue-300', yellow:'bg-yellow-900/20 border-yellow-800 text-yellow-300',
  red:'bg-red-900/20 border-red-800 text-red-300', green:'bg-green-900/20 border-green-800 text-green-300',
  zinc:'bg-zinc-800/50 border-zinc-700 text-zinc-400', purple:'bg-purple-900/20 border-purple-800 text-purple-300',
  cyan:'bg-cyan-900/20 border-cyan-800 text-cyan-300', orange:'bg-orange-900/20 border-orange-800 text-orange-300',
  pink:'bg-pink-900/20 border-pink-800 text-pink-300', indigo:'bg-indigo-900/20 border-indigo-800 text-indigo-300',
  amber:'bg-amber-900/20 border-amber-800 text-amber-300', teal:'bg-teal-900/20 border-teal-800 text-teal-300',
}

const CONDITION_TYPES = [
  { label: 'Tiene permiso',   template: 'permission:{p1}',          fields: [{ key:'p1', ph:'mi.permiso', label:'Permiso' }] },
  { label: 'Está en mundo',   template: 'world:{p1}',               fields: [{ key:'p1', ph:'world', label:'Mundo' }] },
  { label: 'Dinero >=',       template: 'money>={p1}',              fields: [{ key:'p1', ph:'500', label:'Cantidad' }] },
  { label: 'Variable ==',     template: 'var:{p1}=={p2}',           fields: [{ key:'p1', ph:'puntos', label:'Variable' },{ key:'p2', ph:'10', label:'Valor' }] },
  { label: 'Variable >=',     template: 'var:{p1}>={p2}',           fields: [{ key:'p1', ph:'puntos', label:'Variable' },{ key:'p2', ph:'10', label:'Valor' }] },
  { label: 'Salud >=',        template: 'health>={p1}',             fields: [{ key:'p1', ph:'10', label:'Puntos de vida' }] },
  { label: 'Gamemode ==',     template: 'gamemode:{p1}',            fields: [{ key:'p1', ph:'SURVIVAL', label:'SURVIVAL/CREATIVE/etc' }] },
  { label: 'Ítem en mano ==', template: 'holding:{p1}',             fields: [{ key:'p1', ph:'DIAMOND_SWORD', label:'Material' }] },
]

const PAPI_TOKENS = ['%player_name%','%player_displayname%','%player_world%','%player_health%','%player_level%','%vault_balance%','%luckperms_primary_group%']
const ETC_TOKENS = ['{player}','{world}','{balance}','{balance_fmt}','{var:puntos}','{cooldown:id}']
const MC_SOUNDS = ['ENTITY_PLAYER_LEVELUP','ENTITY_EXPERIENCE_ORB_PICKUP','BLOCK_NOTE_BLOCK_PLING','ENTITY_VILLAGER_TRADE','ENTITY_ENDERMAN_TELEPORT','BLOCK_CHEST_OPEN','BLOCK_CHEST_CLOSE','ENTITY_ENDER_DRAGON_GROWL','ITEM_FIRECHARGE_USE','ENTITY_CREEPER_PRIMED']

// ── Token inserter / text field helper ────────────────────────────────────────
function TokenField({ value, onChange, placeholder, label, monospaced = false, multiline = false, tokens = true }) {
  const ref = useRef(null)
  const insert = (t) => {
    const el = ref.current; if (!el) { onChange(value + t); return }
    const s = el.selectionStart ?? value.length, e = el.selectionEnd ?? value.length
    const next = value.slice(0,s) + t + value.slice(e)
    onChange(next)
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(s+t.length, s+t.length) })
  }
  const cls = `w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-brand-500 ${monospaced ? 'font-mono text-green-300' : 'text-zinc-200'}`
  return (
    <div>
      {label && <label className="block text-xs text-zinc-500 mb-1">{label}</label>}
      {multiline
        ? <textarea ref={ref} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={2} className={cls+' resize-none'} />
        : <input ref={ref} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className={cls} />}
      {value && !monospaced && <div className="mt-1 text-xs px-1"><ColorText text={value} /></div>}
      {tokens && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {[...ETC_TOKENS,...PAPI_TOKENS].map(p => (
            <button key={p} type="button" onClick={() => insert(p)}
              className="text-[10px] px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-brand-400 rounded font-mono transition-colors">{p}</button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Condition builder ─────────────────────────────────────────────────────────
function ConditionBuilder({ value, onChange }) {
  const [typeIdx, setTypeIdx] = useState(0)
  const [params, setParams] = useState({})
  const ct = CONDITION_TYPES[typeIdx]
  const build = (t, p) => {
    let tpl = t.template
    t.fields.forEach(f => { tpl = tpl.replace(`{${f.key}}`, p[f.key] ?? f.ph) })
    onChange(tpl)
  }
  return (
    <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-3 space-y-2">
      <select value={typeIdx} onChange={e => { const i=parseInt(e.target.value); setTypeIdx(i); setParams({}); build(CONDITION_TYPES[i],{}) }}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:border-brand-500">
        {CONDITION_TYPES.map((c,i) => <option key={i} value={i}>{c.label}</option>)}
      </select>
      {ct.fields.map(f => (
        <input key={f.key} value={params[f.key]??''} onChange={e => { const p={...params,[f.key]:e.target.value}; setParams(p); build(ct,p) }}
          placeholder={f.label + ': ' + f.ph}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-brand-500" />
      ))}
      <div className="flex items-center gap-2 bg-zinc-900 rounded-lg px-2 py-1">
        <span className="text-[10px] text-zinc-600">Resultado:</span>
        <code className="text-xs text-amber-300 font-mono">{value || '—'}</code>
      </div>
    </div>
  )
}

// ── Per-type action form ──────────────────────────────────────────────────────
function ActionForm({ type, data, onChange }) {
  const up = (k,v) => onChange({ ...data, [k]: v })
  switch(type) {
    case 'MESSAGE': case 'BROADCAST': case 'ACTIONBAR':
      return <TokenField value={data.text??''} onChange={v=>up('text',v)} placeholder="&aMessaje con {player} y %placeholder%" label="Texto" />
    case 'CONSOLE': case 'PLAYER':
      return <TokenField value={data.cmd??''} onChange={v=>up('cmd',v)} placeholder={type==='CONSOLE'?'give {player} diamond 1':'spawn'} label="Comando" monospaced tokens />
    case 'CLOSE':
      return <p className="text-xs text-zinc-500 italic">Cierra el menú abierto. Sin parámetros.</p>
    case 'MENU':
      return <TokenField value={data.name??''} onChange={v=>up('name',v)} placeholder="nombre-del-menu" label="Nombre del menú (sin extensión)" tokens={false} />
    case 'SOUND':
      return (
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Sonido</label>
            <select value={data.sound??''} onChange={e=>up('sound',e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-zinc-200 focus:outline-none focus:border-brand-500">
              <option value="">— selecciona —</option>
              {MC_SOUNDS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input value={data.sound??''} onChange={e=>up('sound',e.target.value)} placeholder="O escribe el nombre…"
              className="mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-zinc-200 font-mono focus:outline-none focus:border-brand-500" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="block text-xs text-zinc-500 mb-1">Volumen (1.0)</label><input type="number" step="0.1" value={data.volume??1} onChange={e=>up('volume',e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-zinc-200 focus:outline-none focus:border-brand-500" /></div>
            <div><label className="block text-xs text-zinc-500 mb-1">Pitch (1.0)</label><input type="number" step="0.1" value={data.pitch??1} onChange={e=>up('pitch',e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-zinc-200 focus:outline-none focus:border-brand-500" /></div>
          </div>
        </div>
      )
    case 'TITLE':
      return (
        <div className="space-y-2">
          <TokenField value={data.title??''} onChange={v=>up('title',v)} placeholder="&6&lTítulo principal" label="Título" />
          <TokenField value={data.subtitle??''} onChange={v=>up('subtitle',v)} placeholder="&7Subtítulo" label="Subtítulo" />
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[['fadein','Fade in (ticks)',10],['stay','Duración (ticks)',60],['fadeout','Fade out (ticks)',10]].map(([k,l,d]) => (
              <div key={k}><label className="block text-zinc-500 mb-1">{l}</label><input type="number" value={data[k]??d} onChange={e=>up(k,e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-zinc-200 focus:outline-none focus:border-brand-500" /></div>
            ))}
          </div>
        </div>
      )
    case 'DELAY':
      return (
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Ticks (20 = 1 segundo)</label>
          <input type="number" value={data.ticks??20} onChange={e=>up('ticks',e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-zinc-200 focus:outline-none focus:border-brand-500" />
          {data.ticks && <p className="text-xs text-zinc-600 mt-1">= {(data.ticks / 20).toFixed(1)} segundos</p>}
        </div>
      )
    case 'MONEY_ADD': case 'MONEY_TAKE':
      return <div><label className="block text-xs text-zinc-500 mb-1">Cantidad</label><input type="number" value={data.amount??0} onChange={e=>up('amount',e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-zinc-200 focus:outline-none focus:border-brand-500" /></div>
    case 'VAR:SET': case 'VAR:ADD': case 'VAR:TAKE':
      return (
        <div className="grid grid-cols-2 gap-2">
          <TokenField value={data.varname??''} onChange={v=>up('varname',v)} placeholder="puntos" label="Nombre de la variable" tokens={false} />
          <TokenField value={data.value??''} onChange={v=>up('value',v)} placeholder={type==='VAR:SET'?'0':'{var:puntos} + 1'} label="Valor" tokens={false} />
        </div>
      )
    case 'IF':
      return (
        <div className="space-y-3">
          <div><label className="block text-xs text-zinc-500 mb-1">Condición</label><ConditionBuilder value={data.condition??''} onChange={v=>up('condition',v)} /></div>
          <TokenField value={data.then??''} onChange={v=>up('then',v)} placeholder="[MESSAGE] &aSí se cumplió" label="Si verdadero" monospaced tokens={false} />
          <TokenField value={data.else??''} onChange={v=>up('else',v)} placeholder="[MESSAGE] &cNo se cumplió (opcional)" label="Si falso (opcional)" monospaced tokens={false} />
        </div>
      )
    case 'RANDOM':
      return (
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Probabilidad: <span className="text-brand-400">{data.chance??50}%</span></label>
            <input type="range" min="1" max="100" value={data.chance??50} onChange={e=>up('chance',parseInt(e.target.value))}
              className="w-full accent-brand-500" />
            <div className="flex justify-between text-xs text-zinc-600"><span>1%</span><span>100%</span></div>
          </div>
          <TokenField value={data.action??''} onChange={v=>up('action',v)} placeholder="[MESSAGE] &a¡Ganaste!" label="Acción si acierta" monospaced tokens={false} />
        </div>
      )
    case 'COOLDOWN':
      return (
        <div className="space-y-2">
          <TokenField value={data.id??''} onChange={v=>up('id',v)} placeholder="premio-diario" label="ID del cooldown" tokens={false} />
          <div><label className="block text-xs text-zinc-500 mb-1">Tiempo (segundos)</label><input type="number" value={data.seconds??3600} onChange={e=>up('seconds',e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-zinc-200 focus:outline-none focus:border-brand-500" />{data.seconds && <p className="text-xs text-zinc-600 mt-0.5">{data.seconds >= 86400 ? `${(data.seconds/86400).toFixed(1)} días` : data.seconds >= 3600 ? `${(data.seconds/3600).toFixed(1)} horas` : `${(data.seconds/60).toFixed(0)} minutos`}</p>}</div>
          <TokenField value={data.message??''} onChange={v=>up('message',v)} placeholder="&cEspera {cooldown:premio-diario}" label="Mensaje en cooldown" />
        </div>
      )
    case 'TELEPORT':
      return (
        <div className="grid grid-cols-2 gap-2">
          <TokenField value={data.world??''} onChange={v=>up('world',v)} placeholder="world" label="Mundo" tokens={false} />
          {[['x','X','0'],['y','Y','64'],['z','Z','0']].map(([k,l,d]) => (
            <div key={k}><label className="block text-xs text-zinc-500 mb-1">{l}</label><input type="number" value={data[k]??d} onChange={e=>up(k,e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-zinc-200 focus:outline-none focus:border-brand-500" /></div>
          ))}
        </div>
      )
    case 'GIVE':
      return (
        <div className="grid grid-cols-2 gap-2">
          <TokenField value={data.material??''} onChange={v=>up('material',v)} placeholder="DIAMOND" label="Material (ID)" tokens={false} />
          <div><label className="block text-xs text-zinc-500 mb-1">Cantidad</label><input type="number" value={data.amount??1} onChange={e=>up('amount',e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-sm text-zinc-200 focus:outline-none focus:border-brand-500" /></div>
        </div>
      )
    default: return null
  }
}

// ── Action Card ───────────────────────────────────────────────────────────────
function ActionCard({ block, index, total, onChange, onRemove, onMove }) {
  const [expanded, setExpanded] = useState(true)
  const def = ACTION_DEFS[block.type]
  const colorCls = COLOR_MAP[def?.color??'zinc']
  const preview = def?.serialize(block) ?? ''

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${colorCls}`}>
      <div className="flex items-center gap-2 px-4 py-2.5 cursor-pointer" onClick={() => setExpanded(e=>!e)}>
        <span className="font-semibold text-sm flex-1">{def?.label ?? block.type}</span>
        <div className="flex items-center gap-1 shrink-0">
          <button type="button" onClick={e=>{e.stopPropagation();onMove(index,-1)}} disabled={index===0}
            className="opacity-60 hover:opacity-100 disabled:opacity-20 transition-opacity px-1 text-xs">▲</button>
          <button type="button" onClick={e=>{e.stopPropagation();onMove(index,1)}} disabled={index===total-1}
            className="opacity-60 hover:opacity-100 disabled:opacity-20 transition-opacity px-1 text-xs">▼</button>
          <button type="button" onClick={e=>{e.stopPropagation();onRemove()}}
            className="opacity-60 hover:opacity-100 transition-opacity px-1 text-xs text-red-400">✕</button>
          <svg className={`w-3.5 h-3.5 transition-transform ml-1 ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 bg-zinc-900/60 space-y-3">
          <select value={block.type} onChange={e => onChange({ type: e.target.value })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:border-brand-500">
            {Object.entries(ACTION_DEFS).map(([t,d]) => <option key={t} value={t}>{d.label}</option>)}
          </select>
          <ActionForm type={block.type} data={block} onChange={onChange} />
          {preview && (
            <div className="bg-zinc-950 rounded-lg px-3 py-1.5 flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] text-zinc-600 shrink-0">YAML:</span>
              <code className="text-xs text-zinc-400 font-mono whitespace-nowrap">{preview}</code>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ActionBuilder() {
  const [blocks, setBlocks] = useState([])
  const [copied, setCopied] = useState(false)

  const add = (type) => setBlocks(prev => [...prev, { type }])
  const update = (i, d) => setBlocks(prev => prev.map((b,j) => j===i ? d : b))
  const remove = (i) => setBlocks(prev => prev.filter((_,j) => j!==i))
  const move = (i, dir) => setBlocks(prev => {
    const a = [...prev]; const j = i+dir
    if (j<0 || j>=a.length) return a
    ;[a[i],a[j]] = [a[j],a[i]]; return a
  })

  const lines = blocks.map(b => ACTION_DEFS[b.type]?.serialize(b) ?? `[${b.type}]`).filter(Boolean)
  const yaml = jsYaml.dump({ actions: lines }, { lineWidth: 120, quotingType: '"' })

  const copy = () => { navigator.clipboard?.writeText(yaml); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div>
      <div className="mb-8">
        <div className="text-brand-400 text-sm font-mono mb-3">Herramientas · ETCCore</div>
        <h1 className="text-3xl font-bold text-white mb-2">⚡ Action Builder</h1>
        <p className="text-zinc-400">
          Construye listas de acciones visualmente. Cada bloque tiene su formulario específico.
          El YAML se genera en tiempo real — cópialo para usarlo en comandos, menús o tareas programadas.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: builder */}
        <div className="space-y-4">
          {/* Add buttons */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p className="text-xs text-zinc-500 mb-3 font-medium uppercase tracking-wider">Añadir acción</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {Object.entries(ACTION_DEFS).map(([type, def]) => (
                <button key={type} onClick={() => add(type)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium border transition-all hover:scale-[1.02] active:scale-95 ${COLOR_MAP[def.color]}`}>
                  <span className="text-sm">{def.label.split(' ')[0]}</span>
                  <span className="leading-tight">{def.label.split(' ').slice(1).join(' ')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action blocks */}
          {blocks.length === 0 ? (
            <div className="text-center py-12 text-zinc-600 bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-800">
              <div className="text-4xl mb-2">⚡</div>
              <p>Añade acciones usando los botones de arriba</p>
            </div>
          ) : (
            <div className="space-y-2">
              {blocks.map((b,i) => (
                <ActionCard key={i} block={b} index={i} total={blocks.length}
                  onChange={d=>update(i,d)} onRemove={()=>remove(i)} onMove={move} />
              ))}
            </div>
          )}
        </div>

        {/* Right: YAML */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-xs text-zinc-400 rounded-t-xl border border-zinc-700 border-b-0">
              <span>actions: <span className="text-zinc-300">({lines.length} acciones)</span></span>
              <button onClick={copy} className="flex items-center gap-1.5 hover:text-white transition-colors">
                {copied
                  ? <><svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg><span className="text-green-400">¡Copiado!</span></>
                  : <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copiar YAML</>}
              </button>
            </div>
            <pre className="bg-zinc-900 border border-zinc-700 rounded-b-xl p-4 text-xs text-zinc-300 font-mono overflow-auto whitespace-pre max-h-[520px]">
              {yaml || '# Añade acciones para ver el YAML\n'}
            </pre>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2">
            <p className="text-white font-semibold text-sm">¿Dónde usar estas acciones?</p>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-zinc-500">
              {[
                ['Comandos YAML','En el campo actions: de commands/mi-cmd.yml'],
                ['Ítems de menú','En la sección actions: de cada slot de menus/mi-menu.yml'],
                ['Tareas programadas','En el campo actions: de scheduled/mi-tarea.yml'],
              ].map(([t,d]) => (
                <div key={t} className="flex items-start gap-2 bg-zinc-800/50 rounded-lg px-3 py-1.5">
                  <span className="text-brand-400 font-medium shrink-0">{t}</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
