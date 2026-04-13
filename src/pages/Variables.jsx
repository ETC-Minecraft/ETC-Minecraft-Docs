import CodeBlock from '../components/CodeBlock.jsx'

const varExample = `
actions:
  # Asignar un valor
  - "[VAR:SET] puntos = 0"

  # Sumar al valor actual
  - "[VAR:ADD] puntos = {var:puntos} + 10"

  # Usar en mensaje
  - "[MESSAGE] &aTus puntos: &e{var:puntos}"

  # Condicional basado en variable
  - "[IF var:puntos>=100] [CONSOLE] lp user {player} parent add vip"
  - "[IF var:rango=admin] [BROADCAST] &6{player} es admin."
`

const inputExample = `
actions:
  - "[INPUT] nombre;¿Cuál es tu nombre en Discord?"
  # El jugador escribe en el chat…
  - "[MESSAGE] &7Tu Discord guardado: &f{var:nombre}"
`

const placeholders = [
  ['{var:nombre}',   'Valor de la variable "nombre" del jugador'],
  ['{player}',       'Nombre del jugador'],
  ['{world}',        'Nombre del mundo'],
  ['{x} {y} {z}',   'Coordenadas enteras'],
  ['{args}',         'Todos los argumentos del comando'],
  ['{arg0}...{argN}','Argumento por posición (0-based)'],
  ['{balance}',      'Saldo numérico (requiere Vault)'],
  ['{balance_fmt}',  'Saldo formateado por el plugin de economía'],
  ['%placeholder%',  'Cualquier placeholder de PlaceholderAPI (si está instalado)'],
]

export default function Variables() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Variables & Placeholders</h1>
      <p className="text-zinc-400 mb-8">
        ETCCore almacena variables por jugador en{' '}
        <code className="text-brand-400">plugins/ETCCore/playerdata/&lt;uuid&gt;.yml</code>.
        Son persistentes entre reinicios del servidor.
      </p>

      <h2 className="text-xl font-bold text-white mt-8 mb-3">Operaciones de variable</h2>
      <CodeBlock code={varExample} title="ejemplo de variables en commands/ejemplo.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">Input de chat [INPUT]</h2>
      <p className="text-zinc-400 mb-1">
        Captura el próximo mensaje del jugador y lo guarda en una variable.
        El chat original no se muestra al resto de jugadores.
      </p>
      <CodeBlock code={inputExample} title="commands/registro.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-4">Referencia de placeholders</h2>
      <div className="space-y-2">
        {placeholders.map(([ph, desc]) => (
          <div key={ph} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-zinc-800 pb-2">
            <code className="text-yellow-400 font-mono text-sm shrink-0 w-52">{ph}</code>
            <span className="text-zinc-400 text-sm">{desc}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-zinc-900 border border-zinc-700 rounded-lg">
        <p className="text-sm text-zinc-400">
          <strong className="text-zinc-200">Tip:</strong> Las expresiones matemáticas simples funcionan al asignar variables:
          <code className="text-brand-400 block mt-1">[VAR:SET] total = {'{var:precio}'} * {'{var:cantidad}'}</code>
        </p>
      </div>
    </div>
  )
}
