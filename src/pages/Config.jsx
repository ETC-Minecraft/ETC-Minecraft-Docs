import CodeBlock from '../components/CodeBlock.jsx'

const configYml = `
# config.yml

verbose-outputs: false
auto-reload: true
update-checker: true
log-commands: false
build-protection: true
build-protection-message: "&cNo tienes permiso para construir aquí."
item-protection: true
item-protection-message: "&cNo puedes usar este ítem."
mute-default-reason: "Violación de las normas del servidor"
`

const onJoinYml = `
# on-join.yml

join-rules:
  quitar-fly-default:
    enabled: true
    only-groups: ["default"]
    delay-ticks: 20
    always-actions:
      - "[FLY:OFF]"
    first-join-actions: []

  bienvenida-default:
    enabled: true
    only-groups: ["default"]
    first-join-actions:
      - "[CONSOLE] lobby {player}"
      - "[MESSAGE] &aBienvenido, esta es tu primera vez en el servidor."
`

const deathRespawnYml = `
# death-respawn.yml

respawn-rules:
  lobby-sin-cama:
    enabled: true
    fallback-actions:
      - "[CONSOLE] lobby {player}"

  hardcore-spawn-fijo:
    enabled: false
    only-worlds: ["hardcore"]
    respawn-location:
      world: "world"
      x: 0.5
      y: 72.0
      z: 0.5
      yaw: 0.0
      pitch: 0.0
`

const teleportYml = `
# teleport.yml

homes:
  default-limit: 3
  public-default-limit: 1
  group-limits:
    default:
      private: 3
      public: 1
    vip:
      private: 6
      public: 2

warmups:
  home: 3
  publichome: 3
  warp: 3
  lobby: 2
  spawn: 2
  back: 0
  reborn: 0
  rtp: 5
  tpa: 3
  tp-admin: 0
  cancel-move-distance: 0.15
  cancel-on-move:
    home: true
    warp: true
    back: false
    reborn: false
    rtp: true

cooldowns:
  back: 10
  reborn: 10
  rtp: 60

tpa:
  expire-seconds: 60

deaths:
  history-limit: 3
`

const playtimeYml = `
# playtime.yml

enabled: true
sync-interval-seconds: 60
vars-prefix: "playtime"
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

const tables = {
  config: [
    ['verbose-outputs', 'boolean', 'false', 'Mensajes de debug al cargar YAMLs.'],
    ['auto-reload', 'boolean', 'true', 'Recarga archivos automáticamente al detectar cambios.'],
    ['update-checker', 'boolean', 'true', 'Notifica a OPs sobre nuevas versiones.'],
    ['log-commands', 'boolean', 'false', 'Registra ejecuciones en logs/commands.log.'],
    ['build-protection', 'boolean', 'true', 'Bloquea construcción a jugadores sin permiso.'],
    ['item-protection', 'boolean', 'true', 'Bloquea tirar y recoger ítems.'],
  ],
  teleport: [
    ['homes.default-limit', 'int', '3', 'Límite base de homes privados.'],
    ['homes.public-default-limit', 'int', '1', 'Límite base de homes públicos.'],
    ['homes.group-limits', 'section', '…', 'Overrides de límites por grupo de LuckPerms.'],
    ['warmups.<tipo>', 'int', '0-5', 'Warmup en segundos por tipo de teleport.'],
    ['warmups.cancel-on-move.<tipo>', 'boolean', 'true/false', 'Cancela el warmup si el jugador se mueve.'],
    ['cooldowns.<tipo>', 'int', '0-60', 'Cooldown por tipo de teleport.'],
    ['tpa.expire-seconds', 'int', '60', 'Expiración de solicitudes TPA.'],
    ['deaths.history-limit', 'int', '3', 'Cantidad de muertes guardadas para /reborn.'],
  ],
  playtime: [
    ['enabled', 'boolean', 'true', 'Activa o desactiva la sincronización automática.'],
    ['sync-interval-seconds', 'int', '60', 'Cada cuánto se sincroniza el playtime.'],
    ['vars-prefix', 'string', 'playtime', 'Prefijo usado para variables persistentes.'],
  ],
}

const permissionGroups = [
  {
    title: 'Permisos fijos',
    rows: [
      ['etccore.admin', 'Administración, reload y avisos de actualización.'],
      ['etccore.staff', 'Marca al jugador como staff para placeholders.'],
      ['etccore.vanish', 'Usar /vanish y ver vanished en TAB.'],
      ['etccore.build', 'Permite colocar y romper bloques.'],
      ['etccore.items', 'Permite tirar y recoger ítems.'],
      ['etccore.mute', 'Permite usar /mute y /unmute.'],
      ['etccore.home', 'Usar /home, /homes y /homelist.'],
      ['etccore.sethome', 'Usar /sethome y /edithome.'],
      ['etccore.delhome', 'Usar /delhome.'],
      ['etccore.publichome', 'Usar /publichome y /publichomelist.'],
      ['etccore.warp', 'Usar /warp, /warps y /warplist.'],
      ['etccore.warp.manage', 'Crear, editar y borrar warps.'],
      ['etccore.lobby', 'Usar /lobby.'],
      ['etccore.lobby.set', 'Definir el lobby.'],
      ['etccore.lobby.others', 'Mandar a otro jugador con /lobby <jugador>.'],
      ['etccore.spawn', 'Usar /spawn.'],
      ['etccore.spawn.set', 'Definir el spawn.'],
      ['etccore.spawn.others', 'Mandar a otro jugador con /spawn <jugador>.'],
      ['etccore.teleport.others', 'Permiso genérico para enviar a otros con /lobby y /spawn.'],
      ['etccore.back', 'Volver a la última ubicación guardada.'],
      ['etccore.reborn', 'Volver a una muerte guardada y usar /deathlist.'],
      ['etccore.rtp', 'Usar /rtp.'],
      ['etccore.tpa', 'Solicitudes de teletransporte.'],
      ['etccore.tpaall', 'Enviar solicitud masiva con /tpaall.'],
      ['etccore.tpadmin', 'Comandos administrativos de teleport.'],
      ['etccore.teleport.warmup.bypass', 'Ignora warmups de teletransporte.'],
      ['etccore.teleport.cooldown.bypass', 'Ignora cooldowns de teletransporte.'],
    ],
  },
  {
    title: 'Permisos dinámicos',
    rows: [
      ['etccore.commands.<nombre>', 'Se crea por cada comando YAML cargado.'],
      ['etccore.menus.<nombre>', 'Se crea por cada menú cargado.'],
      ['etccore.allow.<comando>', 'Permite un comando concreto en blocked-commands.yml.'],
      ['etccore.home.limit.<n>', 'Amplía el límite de homes privados por permiso.'],
      ['etccore.publichome.limit.<n>', 'Amplía el límite de homes públicos por permiso.'],
      ['permission: nodo.libre', 'Nodo personalizado definido dentro de un comando YAML.'],
    ],
  },
]

function SettingsTable({ rows }) {
  return (
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
          {rows.map(([key, type, def, desc]) => (
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
  )
}

export default function Config() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Configuración</h1>
      <p className="text-zinc-400 mb-8">
        ETCCore separa la configuración por sistema en <code className="text-brand-400">plugins/ETCCore/</code>.
        Todos los archivos se recargan con <code className="text-brand-400">/etccore reload</code>.
      </p>

      <h2 className="text-xl font-bold text-white mb-3">config.yml</h2>
      <SettingsTable rows={tables.config} />
      <CodeBlock code={configYml} title="config.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">on-join.yml</h2>
      <p className="text-zinc-400 mb-3 text-sm">
        Aquí van las reglas de entrada. Puedes combinar grupos, permisos, mundos, delays, cooldowns y acciones como <code className="text-brand-400">[FLY:OFF]</code>.
      </p>
      <CodeBlock code={onJoinYml} title="on-join.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">death-respawn.yml</h2>
      <p className="text-zinc-400 mb-3 text-sm">
        Define el fallback al morir con acciones o con una ubicación nativa usando <code className="text-brand-400">respawn-location</code>.
      </p>
      <CodeBlock code={deathRespawnYml} title="death-respawn.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">teleport.yml</h2>
      <SettingsTable rows={tables.teleport} />
      <p className="text-zinc-400 mb-3 text-sm">
        Controla homes, public homes, warps, lobby, spawn, back, reborn, rtp y solicitudes TPA. También define warmups, cancelación por movimiento, cooldowns y límites por grupo.
      </p>
      <CodeBlock code={teleportYml} title="teleport.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">playtime.yml</h2>
      <SettingsTable rows={tables.playtime} />
      <p className="text-zinc-400 mb-3 text-sm">
        Sincroniza el tiempo jugado a variables persistentes como <code className="text-brand-400">playtime.seconds</code> y <code className="text-brand-400">playtime.human</code>.
      </p>
      <CodeBlock code={playtimeYml} title="playtime.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">chat-format.yml</h2>
      <p className="text-zinc-400 mb-3 text-sm">
        Define el formato del chat. Soporta <code className="text-brand-400">{'{world}'}</code>, <code className="text-brand-400">{'{player}'}</code>, <code className="text-brand-400">{'{message}'}</code> y placeholders de PlaceholderAPI.
      </p>
      <CodeBlock code={chatFmtYml} title="chat-format.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">blocked-commands.yml</h2>
      <p className="text-zinc-400 mb-3 text-sm">
        Lista de comandos bloqueados. Solo escribe el nombre sin barra.
      </p>
      <CodeBlock code={blockedYml} title="blocked-commands.yml" />

      <h2 id="permisos-etccore" className="text-xl font-bold text-white mt-10 mb-3">Permisos</h2>
      <p className="text-zinc-400 mb-4 text-sm">
        ETCCore mezcla permisos fijos con nodos dinámicos creados desde comandos YAML, menús, bloqueos y límites de homes.
      </p>
      <div className="space-y-8">
        {permissionGroups.map(group => (
          <div key={group.title}>
            <h3 className="text-white font-semibold mb-2">{group.title}</h3>
            <div className="space-y-2">
              {group.rows.map(([perm, desc]) => (
                <div key={perm} className="flex gap-4 border-b border-zinc-800 pb-2 text-sm">
                  <code className="text-brand-400 w-72 shrink-0">{perm}</code>
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
        code={`/lp group terricola permission set etccore.build true\n/lp group terricola permission set etccore.items true\n/lp group terricola permission set etccore.allow.lobby true\n/lp group default permission set etccore.commands.kit false\n/lp group vip permission set etccore.menus.tienda true\n/lp group vip permission set etccore.home.limit.6 true\n/lp group owner permission set etccore.teleport.warmup.bypass true`}
      />
    </div>
  )
}
