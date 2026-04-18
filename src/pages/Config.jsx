import CodeBlock from '../components/CodeBlock.jsx'

const configYml = `
# config.yml

verbose-outputs: false
# Muestra mensajes de debug en consola al cargar comandos/menús.

auto-reload: true
# Recarga automáticamente los YAML al detectar cambios en disco.
# Usa con cuidado en producción.

update-checker: true
# Comprueba nuevas versiones en GitHub Releases al iniciar.
# Solo notifica a operadores al conectarse.

log-commands: false
# Guarda en plugins/ETCCore/logs/commands.log cada ejecución
# de un comando personalizado (jugador, mundo, args, timestamp).

build-protection: true
# Evita que jugadores sin permiso construyan o rompan bloques.

build-protection-message: "&cNo tienes permiso para construir aquí."
# Mensaje al intentar construir sin permiso.

item-protection: true
# Evita que jugadores sin permiso tiren o recojan ítems.

item-protection-message: "&cNo puedes usar este ítem."
# Mensaje al intentar usar un ítem protegido.

join-rules:
  quitar-fly-default:
    enabled: true
    only-groups: ["default"]
    delay-ticks: 20
    always-actions:
      - "[FLY:OFF]"
    first-join-actions: []
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
      ['verbose-outputs', 'boolean', 'false', 'Mensajes de debug en consola al cargar YAMLs.'],
      ['auto-reload', 'boolean', 'true', 'Recarga archivos automáticamente al detectar cambios.'],
      ['update-checker', 'boolean', 'true', 'Notifica a OPs sobre nuevas versiones de ETCCore.'],
      ['log-commands', 'boolean', 'false', 'Registra cada ejecución en logs/commands.log.'],
      ['build-protection', 'boolean', 'true', 'Bloquea construcción a jugadores sin permiso.'],
      ['build-protection-message', 'string', '…', 'Mensaje al intentar construir sin permiso.'],
      ['item-protection', 'boolean', 'true', 'Bloquea tirar y recoger ítems a jugadores sin permiso.'],
      ['item-protection-message', 'string', '…', 'Mensaje al intentar usar ítem protegido.'],
    ],
  },
]

const permissionGroups = [
  {
    title: 'Permisos fijos',
    rows: [
      ['etccore.admin', 'Administración, reload y avisos de actualización.'],
      ['etccore.staff', 'Marca al jugador como staff para placeholders.'],
      ['etccore.vanish', 'Usar /vanish y ver vanished en TAB.'],
      ['etccore.enderchest', 'Abrir tu propio enderchest.'],
      ['etccore.enderchest.others', 'Abrir el enderchest de otros jugadores.'],
      ['etccore.invsee', 'Ver inventarios online.'],
      ['etccore.invsee.offline', 'Ver inventarios offline.'],
      ['etccore.build', 'Permite colocar y romper bloques.'],
      ['etccore.build.bypass', 'Ignora protección de construcción e ítems.'],
      ['etccore.items', 'Permite tirar y recoger ítems.'],
      ['etccore.chat', 'Permite hablar por el chat.'],
      ['etccore.mute', 'Permite usar /mute y /unmute.'],
      ['etccore.cmdblock.bypass', 'Ignora blocked-commands.yml.'],
    ],
  },
  {
    title: 'Permisos dinámicos',
    rows: [
      ['etccore.commands.<nombre>', 'Se crea por cada comando YAML cargado.'],
      ['etccore.menus.<nombre>', 'Se crea por cada menú cargado.'],
      ['etccore.allow.<comando>', 'Permite un comando concreto en blocked-commands.yml.'],
      ['permission: nodo.libre', 'Nodo personalizado que tú definas dentro de un comando YAML.'],
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

      <h2 id="permisos-etccore" className="text-xl font-bold text-white mt-10 mb-3">Permisos</h2>
      <p className="text-zinc-400 mb-4 text-sm">
        ETCCore mezcla permisos fijos del plugin con nodos dinámicos creados desde comandos YAML, menús y reglas de bloqueo de comandos.
      </p>
      <div className="space-y-8">
        {permissionGroups.map(group => (
          <div key={group.title}>
            <h3 className="text-white font-semibold mb-2">{group.title}</h3>
            <div className="space-y-2">
              {group.rows.map(([perm, desc]) => (
                <div key={perm} className="flex gap-4 border-b border-zinc-800 pb-2 text-sm">
                  <code className="text-brand-400 w-64 shrink-0">{perm}</code>
                  <span className="text-zinc-400">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-white font-semibold mt-8 mb-2">Ejemplos rápidos de LuckPerms</h3>
      <CodeBlock
        title="LuckPerms"
        code={`/lp group terricola permission set etccore.build true\n/lp group terricola permission set etccore.items true\n/lp group terricola permission set etccore.allow.lobby true\n/lp group default permission set etccore.commands.kit false\n/lp group vip permission set etccore.menus.tienda true`}
      />
    </div>
  )
}
