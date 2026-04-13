import CodeBlock from '../components/CodeBlock.jsx'

const configYml = `
# config.yml

verbose-outputs: true
# Muestra mensajes de debug en consola al cargar comandos/menús.

auto-reload: false
# Recarga automáticamente los YAML al detectar cambios en disco.
# Usa con cuidado en producción.

update-checker: true
# Comprueba nuevas versiones en GitHub Releases al iniciar.
# Solo notifica a operadores al conectarse.

log-commands: false
# Guarda en plugins/ETCCore/logs/commands.log cada ejecución
# de un comando personalizado (jugador, mundo, args, timestamp).

build-protection: false
# Evita que jugadores sin permiso construyan o rompan bloques.

build-protection-message: "&cNo tienes permiso para construir aquí."
# Mensaje al intentar construir sin permiso.

item-protection: false
# Evita que jugadores sin permiso usen ítems (clic derecho).

item-protection-message: "&cNo puedes usar este ítem."
# Mensaje al intentar usar un ítem protegido.
`

const chatFmtYml = `
# chat-format.yml
format: "&7[&f{world}&7] &e{player}&7: &f{message}"
`

const blockedYml = `
# blocked-commands.yml
blocked:
  - gamemode
  - op
  - deop
`

const sections = [
  {
    title: 'config.yml — opciones principales',
    rows: [
      ['verbose-outputs', 'boolean', 'true', 'Mensajes de debug en consola al cargar YAMLs.'],
      ['auto-reload', 'boolean', 'false', 'Recarga archivos automáticamente al detectar cambios.'],
      ['update-checker', 'boolean', 'true', 'Notifica a OPs sobre nuevas versiones de ETCCore.'],
      ['log-commands', 'boolean', 'false', 'Registra cada ejecución en logs/commands.log.'],
      ['build-protection', 'boolean', 'false', 'Bloquea construcción a jugadores sin permiso.'],
      ['build-protection-message', 'string', '…', 'Mensaje al intentar construir sin permiso.'],
      ['item-protection', 'boolean', 'false', 'Bloquea uso de ítems a jugadores sin permiso.'],
      ['item-protection-message', 'string', '…', 'Mensaje al intentar usar ítem protegido.'],
    ],
  },
]

export default function Config() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Configuración</h1>
      <p className="text-zinc-400 mb-8">
        ETCCore usa tres archivos de configuración principales en{' '}
        <code className="text-brand-400">plugins/ETCCore/</code>.
        Todos se recargan con <code className="text-brand-400">/fccmds reload</code>.
      </p>

      <h2 className="text-xl font-bold text-white mb-3">config.yml</h2>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left py-2 pr-4 text-zinc-400 font-medium">Clave</th>
              <th className="text-left py-2 pr-4 text-zinc-400 font-medium">Tipo</th>
              <th className="text-left py-2 pr-4 text-zinc-400 font-medium">Por defecto</th>
              <th className="text-left py-2 text-zinc-400 font-medium">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {sections[0].rows.map(([key, type, def, desc]) => (
              <tr key={key} className="border-b border-zinc-800">
                <td className="py-2 pr-4"><code className="text-brand-400">{key}</code></td>
                <td className="py-2 pr-4 text-zinc-500">{type}</td>
                <td className="py-2 pr-4 text-zinc-500"><code>{def}</code></td>
                <td className="py-2 text-zinc-400">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock code={configYml} title="config.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">chat-format.yml</h2>
      <p className="text-zinc-400 mb-3 text-sm">
        Define el formato del chat. Soporta los placeholders integrados{' '}
        <code className="text-brand-400">{'{world}'}</code>,{' '}
        <code className="text-brand-400">{'{player}'}</code> y{' '}
        <code className="text-brand-400">{'{message}'}</code>, más cualquier placeholder de PlaceholderAPI.
      </p>
      <CodeBlock code={chatFmtYml} title="chat-format.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">blocked-commands.yml</h2>
      <p className="text-zinc-400 mb-3 text-sm">
        Lista de comandos bloqueados para jugadores sin <code className="text-brand-400">fccmds.admin</code>.
        Solo escribe el nombre del comando sin barra.
      </p>
      <CodeBlock code={blockedYml} title="blocked-commands.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">Permisos</h2>
      <div className="space-y-2">
        {[
          ['fccmds.admin', 'Acceso a /fccmds reload y notificaciones de actualización.'],
          ['fccmds.invSee', 'Ver inventario de otros jugadores con /invsee.'],
          ['fccmds.enderChest', 'Ver ender-chest de otros jugadores con /ec.'],
          ['fccmds.mute', 'Mutear y desmutear jugadores con /mute.'],
          ['fccmds.build', 'Permite construir cuando build-protection está habilitado.'],
          ['fccmds.item', 'Permite usar ítems cuando item-protection está habilitado.'],
        ].map(([perm, desc]) => (
          <div key={perm} className="flex gap-4 border-b border-zinc-800 pb-2 text-sm">
            <code className="text-brand-400 w-52 shrink-0">{perm}</code>
            <span className="text-zinc-400">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
