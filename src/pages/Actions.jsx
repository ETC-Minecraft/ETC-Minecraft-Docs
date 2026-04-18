import CodeBlock from '../components/CodeBlock.jsx'
import { Link } from 'react-router-dom'

const actions = [
  { prefix: '[MESSAGE] texto',        desc: 'Envía un mensaje al jugador que ejecutó el comando. Soporta &colores.' },
  { prefix: '[BROADCAST] texto',      desc: 'Envía un mensaje a todos los jugadores online.' },
  { prefix: '[CONSOLE] comando',      desc: 'Ejecuta un comando como consola.' },
  { prefix: '[PLAYER] comando',       desc: 'El jugador ejecuta un comando (sin barra).' },
  { prefix: '[ACTIONBAR] texto',      desc: 'Muestra texto en la barra de acción (encima del hotbar).' },
  { prefix: '[FLY:ON]',               desc: 'Activa el vuelo del jugador forzando allowFlight y flying.' },
  { prefix: '[FLY:OFF]',              desc: 'Desactiva el vuelo del jugador forzando allowFlight=false y flying=false.' },
  { prefix: '[TITLE] título;subtítulo', desc: 'Muestra un título en pantalla.' },
  { prefix: '[TITLE:fi:stay:fo] ...',  desc: 'Título con tiempos custom (ticks): fadeIn, stay, fadeOut.' },
  { prefix: '[SOUND] NOMBRE',         desc: 'Reproduce un sonido al jugador. Ej: ENTITY_ENDERMAN_TELEPORT' },
  { prefix: '[SOUND:vol:pitch] NOMBRE', desc: 'Sonido con volumen y pitch personalizados.' },
  { prefix: '[CLOSE]',                desc: 'Cierra el inventario/menú actual (solo en menús).' },
  { prefix: '[DELAY:ticks] acción',   desc: 'Retrasa la acción X ticks (20 ticks = 1 segundo).' },
  { prefix: '[CHANCE:X] acción',      desc: 'Ejecuta la acción con X% de probabilidad.' },
  { prefix: '[IF condición] acción',  desc: 'Ejecuta la acción solo si se cumple la condición.' },
  { prefix: '[VAR:SET] nombre = expr', desc: 'Asigna un valor a una variable del jugador.' },
  { prefix: '[VAR:ADD] nombre = expr', desc: 'Suma/concatena al valor actual de la variable.' },
  { prefix: '[VAR:DEL] nombre',       desc: 'Elimina una variable del jugador.' },
  { prefix: '[INPUT] var;prompt',     desc: 'Espera que el jugador escriba algo en el chat y lo guarda en la variable.' },
  { prefix: '[MENU] nombre',          desc: 'Abre el menú GUI con ese nombre.' },
  { prefix: '[MONEY_GIVE:cantidad]',  desc: 'Da dinero al jugador (requiere Vault).' },
  { prefix: '[MONEY_TAKE:cantidad]',  desc: 'Quita dinero al jugador (no hace nada si no tiene suficiente).' },
]

const conditions = [
  ['permission:node',   'El jugador tiene el permiso `node`'],
  ['!permission:node',  'El jugador NO tiene el permiso'],
  ['world:nombre',      'El jugador está en ese mundo'],
  ['health>N',          'La vida del jugador es mayor que N'],
  ['health<N',          'La vida del jugador es menor que N'],
  ['var:nombre=valor',  'La variable del jugador tiene ese valor'],
  ['var:nombre>=N',     'Variable numérica ≥ N'],
  ['money>=1000',       'Saldo ≥ 1000 (requiere Vault)'],
]

const exampleYml = `
description: "Sistema de compra con Vault"
actions:
  - "[IF !permission:vip] [IF money>=500] [MONEY_TAKE:500]"
  - "[IF !permission:vip] [IF money>=500] [CONSOLE] lp user {player} parent add vip"
  - "[IF !permission:vip] [IF money>=500] [MESSAGE] &a¡Compraste el rango VIP!"
  - "[IF !permission:vip] [IF money<500] [MESSAGE] &cNecesitas $500. Tienes: &e{balance_fmt}"
  - "[IF permission:vip] [MESSAGE] &eYa tienes el rango VIP."
`

export default function Actions() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Acciones</h1>
      <p className="text-zinc-400 mb-8">
        Las acciones se definen en la lista <code className="text-brand-400">actions:</code> de cada comando.
        Cada línea es una acción que se ejecuta en orden al usar el comando.
      </p>

      <div className="mb-6 rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 text-sm text-zinc-300">
        Si vas a combinar acciones con permisos, grupos o reglas de entrada como <code className="text-brand-400">[FLY:OFF]</code>,
        el listado completo de nodos disponibles está en <Link to="/etccore/config" className="text-brand-400 hover:underline">Configuración → Permisos</Link>.
      </div>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">Referencia de acciones</h2>
      <div className="space-y-2">
        {actions.map(a => (
          <div key={a.prefix} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-zinc-800 pb-2">
            <code className="text-brand-400 font-mono text-sm shrink-0 w-72">{a.prefix}</code>
            <span className="text-zinc-400 text-sm">{a.desc}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Condiciones [IF]</h2>
      <p className="text-zinc-400 mb-4">
        Prefija cualquier acción con <code className="text-brand-400">[IF condición]</code> para ejecutarla
        condicionalmente. Puedes anidar varios <code className="text-brand-400">[IF]</code>.
      </p>
      <div className="space-y-2 mb-6">
        {conditions.map(([cond, desc]) => (
          <div key={cond} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-zinc-800 pb-2">
            <code className="text-green-400 font-mono text-sm shrink-0 w-60">{cond}</code>
            <span className="text-zinc-400 text-sm">{desc}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-3">Ejemplo completo</h2>
      <CodeBlock code={exampleYml} title="commands/comprar-vip.yml" />

      <h2 className="text-2xl font-bold text-white mt-10 mb-3">Placeholders de acciones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {[
          ['{player}', 'Nombre del jugador'],
          ['{world}',  'Nombre del mundo actual'],
          ['{x} {y} {z}', 'Coordenadas del jugador'],
          ['{args}',   'Todos los argumentos'],
          ['{arg0} {arg1}...', 'Argumento por posición'],
          ['{var:nombre}', 'Valor de una variable YAML'],
          ['{balance}', 'Saldo numérico (Vault)'],
          ['{balance_fmt}', 'Saldo formateado (Vault)'],
        ].map(([ph, desc]) => (
          <div key={ph} className="flex gap-3 bg-zinc-900 border border-zinc-800 rounded p-2">
            <code className="text-yellow-400 shrink-0">{ph}</code>
            <span className="text-zinc-400">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
