import { useState, useCallback } from 'react'
import jsYaml from 'js-yaml'

const ACTIONS = [
  { prefix: /^\[MESSAGE\]/i,      label: 'MESSAGE',       color: 'text-blue-400',   desc: (v) => `Envía al jugador: ${v}` },
  { prefix: /^\[BROADCAST\]/i,    label: 'BROADCAST',     color: 'text-yellow-400', desc: (v) => `Broadcast a todos: ${v}` },
  { prefix: /^\[CONSOLE\]/i,      label: 'CONSOLE',       color: 'text-purple-400', desc: (v) => `Ejecuta como consola: /${v.trim()}` },
  { prefix: /^\[PLAYER\]/i,       label: 'PLAYER',        color: 'text-cyan-400',   desc: (v) => `Jugador ejecuta: /${v.trim()}` },
  { prefix: /^\[ACTIONBAR\]/i,    label: 'ACTIONBAR',     color: 'text-teal-400',   desc: (v) => `ActionBar: ${v}` },
  { prefix: /^\[SOUND[^\]]*\]/i,  label: 'SOUND',         color: 'text-pink-400',   desc: (v) => `Reproduce sonido: ${v}` },
  { prefix: /^\[TITLE[^\]]*\]/i,  label: 'TITLE',         color: 'text-indigo-400', desc: (v) => `Título en pantalla: ${v}` },
  { prefix: /^\[DELAY:[^\]]+\]/i, label: 'DELAY',         color: 'text-orange-400', desc: (v) => `Retrasa ${v.match(/\d+/)?.[0] ?? '?'} ticks (${((v.match(/\d+/)?.[0] ?? 0) / 20).toFixed(1)}s)` },
  { prefix: /^\[CHANCE:[^\]]+\]/i,label: 'CHANCE',        color: 'text-lime-400',   desc: (v) => `${v.match(/[\d.]+/)?.[0] ?? '?'}% de probabilidad` },
  { prefix: /^\[IF [^\]]+\]/i,    label: 'IF',            color: 'text-green-400',  desc: (v) => `Condición: ${v.match(/\[IF ([^\]]+)\]/i)?.[1] ?? ''}` },
  { prefix: /^\[VAR:(SET|ADD|DEL)\]/i, label: 'VAR',      color: 'text-rose-400',   desc: (v) => `Variable: ${v}` },
  { prefix: /^\[INPUT\]/i,        label: 'INPUT',         color: 'text-violet-400', desc: (v) => `Captura input: ${v}` },
  { prefix: /^\[MENU\]/i,         label: 'MENU',          color: 'text-sky-400',    desc: (v) => `Abre menú: ${v}` },
  { prefix: /^\[MONEY_GIVE:[^\]]+\]/i, label: 'MONEY_GIVE', color: 'text-emerald-400', desc: (v) => `Da dinero: $${v.match(/[\d.]+/)?.[0] ?? '?'}` },
  { prefix: /^\[MONEY_TAKE:[^\]]+\]/i, label: 'MONEY_TAKE', color: 'text-red-400',    desc: (v) => `Quita dinero: $${v.match(/[\d.]+/)?.[0] ?? '?'}` },
  { prefix: /^\[CLOSE\]/i,        label: 'CLOSE',         color: 'text-zinc-400',   desc: () => 'Cierra el inventario' },
]

function parseAction(line) {
  const trimmed = line.trim()
  for (const a of ACTIONS) {
    if (a.prefix.test(trimmed)) {
      const afterTag = trimmed.replace(/^\[[^\]]+\]\s*/i, '')
      return { label: a.label, color: a.color, desc: a.desc(trimmed), raw: trimmed, rest: afterTag }
    }
  }
  return { label: 'UNKNOWN', color: 'text-zinc-500', desc: `Acción desconocida: "${trimmed}"`, raw: trimmed, rest: trimmed }
}

const EXAMPLE = `description: "Comprar rango VIP"
permission: ""
cooldown: 0
actions:
  - "[IF !permission:vip] [IF money>=500] [MONEY_TAKE:500]"
  - "[IF !permission:vip] [IF money>=500] [CONSOLE] lp user {player} parent add vip"
  - "[IF !permission:vip] [IF money>=500] [MESSAGE] &a¡Compraste el rango VIP!"
  - "[IF !permission:vip] [IF money<500] [MESSAGE] &cNecesitas $500. Tienes: &e{balance_fmt}"
  - "[IF permission:vip] [MESSAGE] &eYa tienes el rango VIP."`

export default function YAMLPlayground() {
  const [yaml, setYaml] = useState(EXAMPLE)
  const [result, setResult] = useState(null)

  const validate = useCallback(() => {
    try {
      const parsed = jsYaml.load(yaml)
      const actions = parsed?.actions ?? []
      const preview = actions.map(a => parseAction(String(a)))
      setResult({ ok: true, parsed, preview, error: null })
    } catch (e) {
      setResult({ ok: false, parsed: null, preview: [], error: e.message })
    }
  }, [yaml])

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-brand-400 text-sm font-mono mb-3">
          Herramientas
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">🧪 YAML Playground</h1>
        <p className="text-zinc-400">
          Pega un bloque de comando ETCCore, valida la sintaxis YAML y ve una preview de qué haría cada acción.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Editor */}
        <div>
          <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-xs text-zinc-400 rounded-t-lg border border-zinc-700 border-b-0">
            <span>tu-comando.yml</span>
            <button
              onClick={() => setYaml(EXAMPLE)}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Cargar ejemplo
            </button>
          </div>
          <textarea
            value={yaml}
            onChange={e => setYaml(e.target.value)}
            spellCheck={false}
            className="w-full h-80 p-4 font-mono text-sm bg-zinc-900 border border-zinc-700 rounded-b-lg text-zinc-200 resize-none focus:outline-none focus:border-brand-600 transition-colors"
          />
          <button
            onClick={validate}
            className="mt-3 w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Validar y previsualizar
          </button>
        </div>

        {/* Preview */}
        <div>
          <div className="bg-zinc-800 px-4 py-2 text-xs text-zinc-400 rounded-t-lg border border-zinc-700 border-b-0 flex items-center gap-2">
            <span>Preview</span>
            {result && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${result.ok ? 'bg-green-900/40 text-green-400 border border-green-800' : 'bg-red-900/40 text-red-400 border border-red-800'}`}>
                {result.ok ? '✓ YAML válido' : '✗ Error de sintaxis'}
              </span>
            )}
          </div>
          <div className="h-80 p-4 bg-zinc-900 border border-zinc-700 rounded-b-lg overflow-y-auto">
            {!result && (
              <p className="text-zinc-600 text-sm text-center mt-8">
                Presiona "Validar y previsualizar" para ver el análisis.
              </p>
            )}
            {result?.error && (
              <div className="text-red-400 text-sm font-mono bg-red-900/20 border border-red-800 rounded p-3">
                {result.error}
              </div>
            )}
            {result?.ok && (
              <div className="space-y-2">
                {result.preview.length === 0 && (
                  <p className="text-zinc-500 text-sm">No hay acciones definidas en <code className="text-brand-400">actions:</code>.</p>
                )}
                {result.preview.map((a, i) => (
                  <div key={i} className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-950">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded bg-zinc-800 ${a.color}`}>
                        {a.label}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">{a.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Parsed fields */}
          {result?.ok && result.parsed && (
            <div className="mt-3 p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs space-y-1">
              {result.parsed.description && (
                <div className="flex gap-2"><span className="text-zinc-500 shrink-0">Descripción:</span><span className="text-zinc-300">{result.parsed.description}</span></div>
              )}
              {result.parsed.permission !== undefined && (
                <div className="flex gap-2"><span className="text-zinc-500 shrink-0">Permiso:</span><span className="text-brand-400">{result.parsed.permission || '(ninguno)'}</span></div>
              )}
              {result.parsed.cooldown !== undefined && (
                <div className="flex gap-2"><span className="text-zinc-500 shrink-0">Cooldown:</span><span className="text-zinc-300">{result.parsed.cooldown}s</span></div>
              )}
              {result.parsed['console-allowed'] !== undefined && (
                <div className="flex gap-2"><span className="text-zinc-500 shrink-0">Consola:</span><span className="text-zinc-300">{result.parsed['console-allowed'] ? 'permitido' : 'no permitido'}</span></div>
              )}
              <div className="flex gap-2"><span className="text-zinc-500 shrink-0">Acciones:</span><span className="text-zinc-300">{result.preview.length}</span></div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-400">
        <strong className="text-white">Nota:</strong> Esta es una preview visual, no una simulación en vivo del servidor.
        Las condiciones <code className="text-brand-400">[IF]</code>, el orden de ejecución y los placeholders como{' '}
        <code className="text-brand-400">{'{player}'}</code> se muestran tal cual, sin resolver.
      </div>
    </div>
  )
}
