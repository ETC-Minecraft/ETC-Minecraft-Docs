import { useState, useRef } from 'react'
import jsYaml from 'js-yaml'

// ── Color utils ───────────────────────────────────────────────────────────────
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

function McTextInput({ value, onChange, placeholder, label }) {
  const ref = useRef(null)
  const insert = (code) => {
    const el = ref.current; if (!el) { onChange(value+code); return }
    const s = el.selectionStart ?? value.length, e = el.selectionEnd ?? value.length
    const next = value.slice(0,s)+code+value.slice(e); onChange(next)
    requestAnimationFrame(()=>{ el.focus(); el.setSelectionRange(s+code.length,s+code.length) })
  }
  return (
    <div>
      {label && <label className="block text-xs text-zinc-500 mb-1">{label}</label>}
      <div className="flex flex-wrap gap-1 mb-1.5">
        {MC_COLORS.map(c => (
          <button key={c.code} type="button" onClick={()=>insert(c.code)}
            className="w-5 h-5 rounded border border-zinc-700 hover:scale-110 transition-transform text-[8px] font-bold flex items-center justify-center"
            style={c.hex?{backgroundColor:c.hex,color:['#000000','#0000AA','#00AA00','#00AAAA','#AA0000','#AA00AA'].includes(c.hex)?'#fff':'#000'}:{background:'#374151',color:'#9CA3AF'}}
            title={c.code}>{c.hex?'':c.code.slice(1).toUpperCase()}</button>
        ))}
      </div>
      <input ref={ref} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-brand-500" />
      {value && <div className="mt-1 text-xs px-2 py-0.5 bg-zinc-900 rounded"><ColorText text={value} /></div>}
    </div>
  )
}

// ── Tokens ────────────────────────────────────────────────────────────────────
const PAPI = ['%player_name%','%player_displayname%','%player_world%','%player_health%','%player_level%','%vault_balance%']
const ETC = ['{player}','{world}','{balance}','{arg:1}','{arg:2}','{args}','{var:nombre}','{cooldown:id}']

function TokenPalette({ onInsert }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3">
      <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">Placeholders disponibles</p>
      <div className="flex flex-wrap gap-1">
        {[...ETC,...PAPI].map(t => (
          <button key={t} type="button" onClick={()=>onInsert(t)}
            className="text-[10px] px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-brand-400 rounded font-mono transition-colors">{t}</button>
        ))}
      </div>
    </div>
  )
}

// ── Arg type editor ───────────────────────────────────────────────────────────
const ARG_TYPES = ['STRING','NUMBER','PLAYER','WORLD','GAMEMODE','BOOLEAN','MATERIAL']
const QUICK_ARGS = [
  { label: '👤 Jugador', type: 'PLAYER', opt: false },
  { label: '🔢 Número',  type: 'NUMBER', opt: false },
  { label: '💬 Texto',   type: 'STRING', opt: false },
  { label: '🌍 Mundo',   type: 'WORLD',  opt: false },
]

function ArgEditor({ args, onChange }) {
  const add = (type, opt=false) => onChange([...args, { type, optional: opt, name: '', default: '' }])
  const upd = (i,k,v) => onChange(args.map((a,j)=>j===i?{...a,[k]:v}:a))
  const del = (i) => onChange(args.filter((_,j)=>j!==i))

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {QUICK_ARGS.map(q => (
          <button key={q.label} type="button" onClick={()=>add(q.type)}
            className="text-xs px-2.5 py-1.5 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-brand-600 text-zinc-300 rounded-lg transition-all">{q.label}</button>
        ))}
        <button type="button" onClick={()=>add('STRING',true)}
          className="text-xs px-2.5 py-1.5 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-zinc-500 rounded-lg transition-all">+ Opcional</button>
      </div>
      {args.length === 0 && <p className="text-xs text-zinc-600 italic">Sin argumentos — el comando no requiere parámetros</p>}
      <div className="space-y-2">
        {args.map((a,i) => (
          <div key={i} className="flex items-center gap-2 bg-zinc-800/60 border border-zinc-700 rounded-xl px-3 py-2">
            <span className="text-zinc-500 text-xs w-4">{i+1}</span>
            <select value={a.type} onChange={e=>upd(i,'type',e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-1.5 py-0.5 text-xs text-zinc-200 focus:outline-none focus:border-brand-500">
              {ARG_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <input value={a.name} onChange={e=>upd(i,'name',e.target.value)} placeholder="nombre (opcional)"
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-0.5 text-xs text-zinc-200 focus:outline-none focus:border-brand-500 font-mono" />
            <label className="flex items-center gap-1 text-xs text-zinc-500 shrink-0">
              <input type="checkbox" checked={a.optional} onChange={e=>upd(i,'optional',e.target.checked)} className="accent-brand-500 rounded" />
              Opcional
            </label>
            {a.optional && (
              <input value={a.default} onChange={e=>upd(i,'default',e.target.value)} placeholder="default"
                className="w-20 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-0.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-brand-500" />
            )}
            <button type="button" onClick={()=>del(i)} className="text-red-500 hover:text-red-400 text-xs px-1">✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Action type quick builder (inline) ───────────────────────────────────────
const ACTION_DEFS = {
  MESSAGE:   { label:'💬 Mensaje',     color:'text-blue-400',  serialize:d=>'[MESSAGE] '+(d.text||'') },
  BROADCAST: { label:'📢 Broadcast',   color:'text-yellow-400',serialize:d=>'[BROADCAST] '+(d.text||'') },
  CONSOLE:   { label:'⌨️ Consola',     color:'text-red-400',   serialize:d=>'[CONSOLE] '+(d.cmd||'') },
  PLAYER:    { label:'🕹️ Jugador cmd', color:'text-green-400', serialize:d=>'[PLAYER] '+(d.cmd||'') },
  CLOSE:     { label:'✖️ Cerrar menú', color:'text-zinc-400',  serialize:()=>'[CLOSE]' },
  MENU:      { label:'🗂️ Abrir menú',  color:'text-purple-400',serialize:d=>'[MENU] '+(d.name||'') },
  SOUND:     { label:'🔊 Sonido',      color:'text-cyan-400',  serialize:d=>'[SOUND] '+(d.sound||'') },
  TITLE:     { label:'🖼️ Título',      color:'text-orange-400',serialize:d=>`[TITLE] ${d.title||''};${d.subtitle||''};${d.fadein||10};${d.stay||60};${d.fadeout||10}` },
  DELAY:     { label:'⏱️ Delay',       color:'text-zinc-400',  serialize:d=>'[DELAY] '+(d.ticks||20) },
  MONEY_ADD: { label:'💰 Dar dinero',  color:'text-green-400', serialize:d=>'[MONEY_ADD] '+(d.amount||0) },
  MONEY_TAKE:{ label:'💸 Quitar $',    color:'text-red-400',   serialize:d=>'[MONEY_TAKE] '+(d.amount||0) },
  'VAR:SET': { label:'📦 Var: set',    color:'text-indigo-400',serialize:d=>`[VAR:SET] ${d.varname||''}=${d.value||''}` },
  IF:        { label:'🔀 IF',          color:'text-amber-400', serialize:d=>`[IF ${d.condition||''}] ${d.then||''}`},
  COOLDOWN:  { label:'⏰ Cooldown',    color:'text-zinc-400',  serialize:d=>`[COOLDOWN:${d.id||'cd'}:${d.seconds||60}] ${d.message||''}` },
}

function ActionMiniForm({ type, data, onChange }) {
  const up = (k,v) => onChange({...data,[k]:v})
  if (type==='MESSAGE'||type==='BROADCAST') return <input value={data.text||''} onChange={e=>up('text',e.target.value)} placeholder="Texto..." className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-brand-500" />
  if (type==='CONSOLE'||type==='PLAYER') return <input value={data.cmd||''} onChange={e=>up('cmd',e.target.value)} placeholder="Comando..." className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-brand-500" />
  if (type==='MENU') return <input value={data.name||''} onChange={e=>up('name',e.target.value)} placeholder="nombre-menu" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-brand-500" />
  if (type==='SOUND') return <input value={data.sound||''} onChange={e=>up('sound',e.target.value)} placeholder="ENTITY_PLAYER_LEVELUP" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-brand-500" />
  if (type==='DELAY') return <input type="number" value={data.ticks||20} onChange={e=>up('ticks',e.target.value)} placeholder="ticks" className="w-24 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:border-brand-500" />
  if (type==='MONEY_ADD'||type==='MONEY_TAKE') return <input type="number" value={data.amount||0} onChange={e=>up('amount',e.target.value)} placeholder="cantidad" className="w-28 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:border-brand-500" />
  if (type==='VAR:SET') return (<><input value={data.varname||''} onChange={e=>up('varname',e.target.value)} placeholder="variable" className="w-28 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-brand-500" /><input value={data.value||''} onChange={e=>up('value',e.target.value)} placeholder="valor" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-brand-500" /></>)
  if (type==='TITLE') return (<><input value={data.title||''} onChange={e=>up('title',e.target.value)} placeholder="Título" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-brand-500" /><input value={data.subtitle||''} onChange={e=>up('subtitle',e.target.value)} placeholder="Subtítulo" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-brand-500" /></>)
  if (type==='COOLDOWN') return (<><input value={data.id||''} onChange={e=>up('id',e.target.value)} placeholder="id" className="w-24 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none" /><input type="number" value={data.seconds||3600} onChange={e=>up('seconds',e.target.value)} placeholder="segs" className="w-20 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 focus:outline-none" /></>)
  if (type==='IF') return (<><input value={data.condition||''} onChange={e=>up('condition',e.target.value)} placeholder="condición" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none" /><input value={data.then||''} onChange={e=>up('then',e.target.value)} placeholder="acción si true" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none" /></>)
  return null
}

function ActionsSection({ actions, onChange }) {
  const add = (type) => onChange([...actions, { type }])
  const upd = (i,d) => onChange(actions.map((a,j)=>j===i?d:a))
  const del = (i) => onChange(actions.filter((_,j)=>j!==i))
  const mv = (i,dir) => { const a=[...actions], j=i+dir; if(j<0||j>=a.length) return;[a[i],a[j]]=[a[j],a[i]]; onChange(a) }

  return (
    <div className="space-y-2">
      {/* Quick add */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
        {Object.entries(ACTION_DEFS).map(([type,def])=>(
          <button key={type} type="button" onClick={()=>add(type)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-all ${def.color}`}>
            <span className="text-sm">{def.label.split(' ')[0]}</span>
            <span className="text-zinc-400 leading-tight text-[10px]">{def.label.split(' ').slice(1).join(' ')}</span>
          </button>
        ))}
      </div>

      {/* Lines */}
      {actions.length === 0 && <p className="text-xs text-zinc-600 italic py-2">Sin acciones configuradas</p>}
      <div className="space-y-1.5">
        {actions.map((a,i) => (
          <div key={i} className="flex items-center gap-2 bg-zinc-800/60 border border-zinc-700 rounded-xl px-2 py-1.5">
            <span className={`text-xs shrink-0 ${ACTION_DEFS[a.type]?.color??'text-zinc-400'}`}>{ACTION_DEFS[a.type]?.label??a.type}</span>
            <select value={a.type} onChange={e=>upd(i,{type:e.target.value})}
              className="bg-transparent border-0 text-[10px] text-zinc-600 focus:outline-none cursor-pointer">
              {Object.keys(ACTION_DEFS).map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <ActionMiniForm type={a.type} data={a} onChange={d=>upd(i,d)} />
            <div className="flex gap-0.5 shrink-0">
              <button type="button" onClick={()=>mv(i,-1)} disabled={i===0} className="text-zinc-600 hover:text-zinc-300 disabled:opacity-20 px-0.5 text-xs">▲</button>
              <button type="button" onClick={()=>mv(i,1)} disabled={i===actions.length-1} className="text-zinc-600 hover:text-zinc-300 disabled:opacity-20 px-0.5 text-xs">▼</button>
              <button type="button" onClick={()=>del(i)} className="text-red-500 hover:text-red-400 px-0.5 text-xs ml-0.5">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Toggle switch ─────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, label, desc }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className={`relative mt-0.5 w-9 h-5 rounded-full transition-colors shrink-0 ${checked?'bg-brand-500':'bg-zinc-700'}`}
        onClick={()=>onChange(!checked)}>
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked?'translate-x-4':''}`}/>
      </div>
      <div>
        <p className="text-sm text-zinc-200 group-hover:text-white transition-colors">{label}</p>
        {desc && <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>}
      </div>
    </label>
  )
}

// ── YAML builder ──────────────────────────────────────────────────────────────
function buildYaml(cmd) {
  const doc = {}
  if (cmd.description) doc.description = cmd.description
  if (cmd.permission) doc.permission = cmd.permission
  if (cmd.permissionMessage) doc['permission-message'] = cmd.permissionMessage
  if (cmd.cooldownSec) { doc['cooldown-seconds'] = parseInt(cmd.cooldownSec)||0; if (cmd.cooldownMsg) doc['cooldown-message'] = cmd.cooldownMsg }
  if (cmd.aliases.filter(Boolean).length) doc.aliases = cmd.aliases.filter(Boolean)
  if (cmd.consoleAllowed) doc['console-allowed'] = true
  if (cmd.onlyOp) doc['only-op'] = true

  const argList = cmd.args.map(a => {
    const o = { type: a.type }
    if (a.name) o.name = a.name
    if (a.optional) { o.optional = true; if (a.default) o.default = a.default }
    return o
  })
  if (argList.length) doc.args = argList

  const lines = cmd.actions.map(b => ACTION_DEFS[b.type]?.serialize(b) ?? `[${b.type}]`).filter(Boolean)
  if (lines.length) doc.actions = lines

  const top = cmd.name ? { [cmd.name]: doc } : doc
  return jsYaml.dump(top, { lineWidth: 120, quotingType: '"' })
}

// ── Main ──────────────────────────────────────────────────────────────────────
const DEFAULT = { name:'mi-comando', description:'', permission:'', permissionMessage:'&cSin permiso.', cooldownSec:'', cooldownMsg:'', aliases:[''], consoleAllowed:false, onlyOp:false, args:[], actions:[] }

export default function CommandBuilder() {
  const [cmd, setCmd] = useState(DEFAULT)
  const [copied, setCopied] = useState(false)
  const up = (k,v) => setCmd(p=>({...p,[k]:v}))

  const yaml = buildYaml(cmd)
  const copy = () => { navigator.clipboard?.writeText(yaml); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div>
      <div className="mb-8">
        <div className="text-brand-400 text-sm font-mono mb-3">Herramientas · ETCCore</div>
        <h1 className="text-3xl font-bold text-white mb-2">📝 Command Builder</h1>
        <p className="text-zinc-400">
          Configura un comando completo paso a paso. Rellena los campos de cada sección
          y el YAML se actualizará en tiempo real — listo para guardar en <code className="text-brand-400">commands/mi-cmd.yml</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: form */}
        <div className="space-y-4">

          {/* Tokens */}
          <TokenPalette onInsert={(t) => {
            // Insert to focused field — just show as reference
          }} />

          {/* 1. Metadata */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-white font-semibold flex items-center gap-2"><span className="text-brand-400">01</span> Información básica</h2>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Nombre del comando <span className="text-zinc-600">(sin /)</span></label>
              <input value={cmd.name} onChange={e=>up('name',e.target.value)} placeholder="mi-comando"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm text-zinc-200 font-mono focus:outline-none focus:border-brand-500" />
              <p className="text-xs text-zinc-600 mt-0.5">Archivo: <span className="text-zinc-400 font-mono">commands/{cmd.name||'mi-comando'}.yml</span></p>
            </div>
            <McTextInput value={cmd.description} onChange={v=>up('description',v)} placeholder="&7Descripción del comando" label="Descripción" />
            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <Toggle checked={cmd.consoleAllowed} onChange={v=>up('consoleAllowed',v)} label="Permitir desde consola" desc="Si está en false, los operadores de consola no pueden ejecutarlo" />
              <Toggle checked={cmd.onlyOp} onChange={v=>up('onlyOp',v)} label="Solo para OPs" desc="Requiere ser operador del servidor para ejecutar" />
            </div>
          </div>

          {/* 2. Permission */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-white font-semibold flex items-center gap-2"><span className="text-brand-400">02</span> Permisos</h2>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Nodo de permiso</label>
              <input value={cmd.permission} onChange={e=>up('permission',e.target.value)} placeholder="miplugin.comando"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm text-zinc-200 font-mono focus:outline-none focus:border-brand-500" />
            </div>
            <McTextInput value={cmd.permissionMessage} onChange={v=>up('permissionMessage',v)} placeholder="&cNo tienes permiso." label="Mensaje si no tiene permiso" />
          </div>

          {/* 3. Cooldown */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-white font-semibold flex items-center gap-2"><span className="text-brand-400">03</span> Cooldown</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Segundos (0 = desactivado)</label>
                <input type="number" value={cmd.cooldownSec} onChange={e=>up('cooldownSec',e.target.value)} placeholder="0"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-brand-500" />
                {cmd.cooldownSec>0 && <p className="text-xs text-zinc-600 mt-0.5">{cmd.cooldownSec>=86400?`${(cmd.cooldownSec/86400).toFixed(1)} días`:cmd.cooldownSec>=3600?`${(cmd.cooldownSec/3600).toFixed(1)} horas`:`${(cmd.cooldownSec/60).toFixed(0)} minutos`}</p>}
              </div>
            </div>
            <McTextInput value={cmd.cooldownMsg} onChange={v=>up('cooldownMsg',v)} placeholder="&cEspera {cooldown:mi-comando}" label="Mensaje en cooldown" />
          </div>

          {/* 4. Aliases */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-white font-semibold flex items-center gap-2"><span className="text-brand-400">04</span> Aliases</h2>
            {cmd.aliases.map((a,i) => (
              <div key={i} className="flex gap-2">
                <input value={a} onChange={e=>up('aliases',cmd.aliases.map((x,j)=>j===i?e.target.value:x))} placeholder={`alias ${i+1}`}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm text-zinc-200 font-mono focus:outline-none focus:border-brand-500" />
                {cmd.aliases.length>1 && <button type="button" onClick={()=>up('aliases',cmd.aliases.filter((_,j)=>j!==i))} className="text-red-500 hover:text-red-400 px-2">✕</button>}
              </div>
            ))}
            <button type="button" onClick={()=>up('aliases',[...cmd.aliases,''])}
              className="text-xs text-brand-400 hover:text-brand-300 transition-colors">+ Añadir alias</button>
          </div>

          {/* 5. Args */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-white font-semibold flex items-center gap-2"><span className="text-brand-400">05</span> Argumentos</h2>
            <ArgEditor args={cmd.args} onChange={v=>up('args',v)} />
          </div>

          {/* 6. Actions */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-white font-semibold flex items-center gap-2"><span className="text-brand-400">06</span> Acciones</h2>
            <ActionsSection actions={cmd.actions} onChange={v=>up('actions',v)} />
          </div>
        </div>

        {/* Right: YAML */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-xs text-zinc-400 rounded-t-xl border border-zinc-700 border-b-0">
              <span className="font-mono text-zinc-300">commands/{cmd.name||'mi-comando'}.yml</span>
              <button onClick={copy} className="flex items-center gap-1.5 hover:text-white transition-colors">
                {copied
                  ? <><svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg><span className="text-green-400">¡Copiado!</span></>
                  : <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copiar YAML</>}
              </button>
            </div>
            <pre className="bg-zinc-900 border border-zinc-700 rounded-b-xl p-4 text-xs text-zinc-300 font-mono overflow-auto whitespace-pre max-h-[600px]">
              {yaml}
            </pre>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2">
            <p className="text-white font-semibold text-sm">¿Cómo usar el YAML generado?</p>
            <ol className="space-y-1 text-xs text-zinc-500 list-decimal list-inside">
              <li>Copia el YAML completo</li>
              <li>Crea el archivo <code className="text-brand-400 font-mono">plugins/ETCCore/commands/{cmd.name||'mi-comando'}.yml</code></li>
              <li>Pega el contenido en el archivo</li>
              <li>Ejecuta <code className="text-brand-400 font-mono">/etc reload</code> o reinicia el servidor</li>
              <li>El comando <code className="text-brand-400 font-mono">/{cmd.name||'mi-comando'}</code> estará disponible</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
