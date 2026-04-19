import CodeBlock from '../components/CodeBlock.jsx'

const submenus = [
  {
    id: 'mundos',
    icon: '🌍',
    title: 'Mundos',
    desc: 'Lista paginada de todos los mundos creados en ETCWorlds visibles para el jugador. Respeta los flags publicAccess, menuVisible, whitelist y accessPermission del mundo. Click para teletransportar.',
  },
  {
    id: 'pocketworlds',
    icon: '🪐',
    title: 'PocketWorlds',
    desc: 'Muestra el propio PocketWorld y todos a los que el jugador ha sido invitado. Cabezas de jugador con el nombre del dueño. Click para teletransportar.',
  },
  {
    id: 'pvp',
    icon: '⚔️',
    title: 'PvP (toggle)',
    desc: 'Activa o desactiva el PvP personal. Por defecto activado. Cuando está desactivado, el jugador no recibe ni causa daño entre jugadores (incluye proyectiles). Estado persistente en PlayerDataManager.',
  },
  {
    id: 'homes',
    icon: '🏠',
    title: 'Homes',
    desc: (
      <>
        Lista paginada de homes.
        <ul className="list-disc list-inside mt-1 space-y-1 text-zinc-400 text-sm">
          <li><strong className="text-zinc-300">Click izquierdo</strong> → teletransporte a la home.</li>
          <li><strong className="text-zinc-300">Click derecho</strong> → sobrescribe la home con tu posición actual.</li>
          <li><strong className="text-zinc-300">Q (tirar)</strong> → abre confirmación de borrado (lana verde = confirmar, lana roja = cancelar).</li>
        </ul>
      </>
    ),
  },
  {
    id: 'warps',
    icon: '🧭',
    title: 'Warps',
    desc: 'Lista paginada de warps públicos del servidor. Click para teletransportar.',
  },
  {
    id: 'tpa',
    icon: '🌀',
    title: 'Solicitudes TPA',
    desc: 'Solicitudes de teletransporte pendientes hacia el jugador. Click izquierdo = aceptar (/tpaccept), click derecho = rechazar (/tpdeny). Las solicitudes expiradas no aparecen.',
  },
  {
    id: 'stats',
    icon: '📖',
    title: 'Estadísticas',
    desc: 'Tiempo de juego (via PlaytimeManager), número de homes guardadas, estado del PvP y balance de Vault (si está disponible).',
  },
  {
    id: 'top',
    icon: '🏆',
    title: 'Top jugadores',
    desc: 'Ranking paginado por tiempo de juego de los jugadores online. Muestra cabeza + nombre + tiempo formateado.',
  },
  {
    id: 'misiones',
    icon: '📋',
    title: 'Misiones',
    desc: 'Marcador de posición — muestra "Próximamente" hasta que se implemente el sistema de misiones.',
  },
]

const perms = [
  { perm: 'etccore.menu',        desc: 'Abrir el menú con /menu.',                  def: 'true' },
  { perm: 'etccore.menu.bypass', desc: 'Ver mundos/pocketworlds ocultos o privados.', def: 'op' },
]

const pvpExplain = `# El toggle PvP se guarda en PlayerDataManager bajo la clave "pvp"
# (valor "true" o "false", default true si no existe).
# PVPListener cancela EntityDamageByEntityEvent si alguno de los dos tiene pvp=false.
# También cancela daño por proyectiles (arco, tridente, bola de nieve, etc.)`

const menuPermExample = `# En LuckPerms:
/lp group default permission set etccore.menu true
/lp group vip permission set etccore.menu.bypass true`

const worldsBridgeNote = `# ETCCore se comunica con ETCWorlds por reflexión (sin dependencia de compilación).
# Si ETCWorlds no está instalado, las secciones "Mundos" y "PocketWorlds"
# simplemente muestran un mensaje de "plugin no disponible" en lugar de fallar.`

const commandsMenuYml = `# plugins/ETCCore/commands/menu.yml
commands:
  menu:
    description: "Abre el menu principal del servidor"
    aliases: [m, etcmenu, menus]
    permission: ""
    no-permission-message: "&cNo tienes permiso para usar este comando."
    console-allowed: false
    actions:
      - "[MENU] menu"`

const menusMenuYml = `# plugins/ETCCore/menus/menu.yml (extracto)
title: "&8» &b&lMenú Principal"
rows: 4
permission: "etccore.menu"
items:
  10:
    material: GRASS_BLOCK
    name: "&a&lMundos"
    actions:
      - "[ETCMENU] mundos"
  12:
    material: ENDER_PEARL
    name: "&d&lPocketWorlds"
    actions:
      - "[ETCMENU] pocketworlds"
  14:
    material: DIAMOND_SWORD
    name: "&c&lPvP"
    close-on-click: true
    actions:
      - "[ETCMENU] pvp"
  35:
    material: BARRIER
    name: "&c&lCerrar"
    actions:
      - "[CLOSE]"`

const etcMenuActionDoc = `# Tipos validos para [ETCMENU] tipo:
#   mundos / worlds         -> WorldsMenu (lista de mundos)
#   pocketworlds / pw       -> PocketWorldsMenu
#   homes / home            -> HomesMenu
#   warps / warp            -> WarpsMenu
#   tpa / requests          -> Solicitudes TPA pendientes
#   stats / estadisticas    -> StatsMenu
#   top                     -> TopMenu (ranking de playtime)
#   pvp                     -> Toggle PvP del propio jugador (sin GUI)`

export default function ETCCoreMenu() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-brand-400 text-sm font-mono mb-3">
          ETCCore / Menú dinámico
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">🗂️ Menú GUI Dinámico</h1>
        <p className="text-zinc-400 text-lg max-w-3xl mb-5">
          Un menú de inventario programático y dinámico, distinto de los{' '}
          <strong className="text-zinc-200">Menús YAML</strong> configurables.
          Se abre con <code className="text-brand-400">/menu</code> y agrupa en un solo lugar
          las funciones más usadas del servidor: mundos, homes, warps, TPA, PvP y más.
        </p>
        <div className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-700/40 text-emerald-200 text-sm mb-6">
          <strong>✨ 100% editable desde YAML:</strong> tanto el comando{' '}
          <code className="text-emerald-300">/menu</code> como el menú principal viven en archivos
          YAML que puedes modificar sin recompilar el plugin. Solo los <em>submenús internos</em>{' '}
          (mundos, homes, etc) son dinámicos en código y se invocan con la nueva acción{' '}
          <code className="text-emerald-300">[ETCMENU] tipo</code>.
        </div>
        <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-700/40 text-amber-200 text-sm mb-6">
          <strong>⚠️ Diferencia clave:</strong> Los <em>submenús</em> (mundos, pocketworlds, homes,
          warps, tpa, stats, top) son dinámicos en código y se actualizan en cada apertura. El{' '}
          <em>menú principal</em> y el <em>comando</em> son configurables como cualquier otro
          menú/comando YAML del plugin.
        </div>
      </div>

      {/* YAML Configuration */}
      <h2 id="configuracion-yaml" className="text-2xl font-semibold text-white mb-4">📝 Configuración YAML</h2>
      <p className="text-zinc-400 mb-3 text-sm">
        El comando <code className="text-brand-400">/menu</code> se registra dinámicamente desde{' '}
        <code className="text-brand-400">commands/menu.yml</code> y abre el menú{' '}
        <code className="text-brand-400">menus/menu.yml</code>. Puedes editar título, items, slots,
        permisos, sonidos y acciones sin tocar código Java.
      </p>
      <h3 className="text-lg font-semibold text-white mb-2">commands/menu.yml</h3>
      <CodeBlock language="yaml" code={commandsMenuYml} />
      <h3 className="text-lg font-semibold text-white mt-4 mb-2">menus/menu.yml</h3>
      <CodeBlock language="yaml" code={menusMenuYml} />

      {/* New action */}
      <h2 id="accion-etcmenu" className="text-2xl font-semibold text-white mt-10 mb-4">🎯 Acción <code className="text-brand-400">[ETCMENU]</code></h2>
      <p className="text-zinc-400 mb-3 text-sm">
        Nueva acción disponible en cualquier menú o comando YAML del plugin. Abre uno de los
        submenús internos (que necesitan código Java por su lógica dinámica) sin tener que
        ejecutar otro comando intermedio.
      </p>
      <CodeBlock language="yaml" code={etcMenuActionDoc} />
      <p className="text-zinc-400 mt-3 mb-8 text-sm">
        Ejemplo: para añadir un botón de “Mis Homes” en cualquier otro menú YAML basta con
        añadir <code className="text-brand-400">- "[ETCMENU] homes"</code> en sus acciones.
      </p>


      {/* Command */}
      <h2 id="comando" className="text-2xl font-semibold text-white mb-4">📟 Comando</h2>
      <div className="overflow-x-auto rounded-lg border border-zinc-700/50 mb-6">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800/60 text-zinc-300">
            <tr>
              <th className="text-left px-3 py-2">Uso</th>
              <th className="text-left px-3 py-2">Descripción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            <tr>
              <td className="px-3 py-2 font-mono text-brand-400">/menu</td>
              <td className="px-3 py-2 text-zinc-300">Abre el menú principal.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-mono text-brand-400">/menu mundos</td>
              <td className="px-3 py-2 text-zinc-300">Abre directamente el submenú de mundos.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-mono text-brand-400">/menu pocketworlds</td>
              <td className="px-3 py-2 text-zinc-300">Submenú de PocketWorlds.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-mono text-brand-400">/menu homes</td>
              <td className="px-3 py-2 text-zinc-300">Submenú de homes.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-mono text-brand-400">/menu warps</td>
              <td className="px-3 py-2 text-zinc-300">Submenú de warps.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-mono text-brand-400">/menu tpa</td>
              <td className="px-3 py-2 text-zinc-300">Solicitudes TPA pendientes.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-mono text-brand-400">/menu stats</td>
              <td className="px-3 py-2 text-zinc-300">Estadísticas del jugador.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-mono text-brand-400">/menu top</td>
              <td className="px-3 py-2 text-zinc-300">Top de jugadores.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-zinc-400 text-sm mb-8">
        Aliases del comando: <code className="text-brand-400">/m</code>,{' '}
        <code className="text-brand-400">/etcmenu</code>,{' '}
        <code className="text-brand-400">/menus</code>.
        El tab-completer ofrece los submenús disponibles.
      </p>

      {/* Permissions */}
      <h2 id="permisos" className="text-2xl font-semibold text-white mb-4">🔐 Permisos</h2>
      <div className="overflow-x-auto rounded-lg border border-zinc-700/50 mb-4">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800/60 text-zinc-300">
            <tr>
              <th className="text-left px-3 py-2">Permiso</th>
              <th className="text-left px-3 py-2">Descripción</th>
              <th className="text-left px-3 py-2">Default</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {perms.map(p => (
              <tr key={p.perm}>
                <td className="px-3 py-2 font-mono text-brand-400">{p.perm}</td>
                <td className="px-3 py-2 text-zinc-300">{p.desc}</td>
                <td className="px-3 py-2 text-zinc-400">{p.def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CodeBlock language="bash" code={menuPermExample} />

      {/* Bypass note */}
      <div className="mt-4 mb-8 p-4 rounded-lg bg-zinc-800/40 border border-zinc-700/50 text-sm text-zinc-300">
        <strong className="text-white">etccore.menu.bypass</strong>: permite ver mundos con{' '}
        <code className="text-brand-400">menuVisible: false</code> y pocketworlds privados a los que
        no fue invitado. Útil para Staff.
      </div>

      {/* Submenus */}
      <h2 id="submenus" className="text-2xl font-semibold text-white mb-4">📋 Submenús</h2>
      <div className="space-y-6 mb-10">
        {submenus.map(m => (
          <div key={m.id} id={m.id} className="p-4 rounded-xl border border-zinc-700/60 bg-zinc-900/60">
            <h3 className="font-semibold text-white text-lg mb-1">
              {m.icon} {m.title}
            </h3>
            <p className="text-zinc-400 text-sm">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* PvP system */}
      <h2 id="pvp-system" className="text-2xl font-semibold text-white mb-4">⚔️ Toggle PvP</h2>
      <p className="text-zinc-400 mb-3">
        El PvP personal se puede activar/desactivar desde el submenú o directamente en el menú
        principal. El estado se guarda de forma persistente en <code className="text-brand-400">PlayerDataManager</code>
        bajo la clave <code className="text-brand-400">pvp</code> (valor <code>true</code>/<code>false</code>).
      </p>
      <p className="text-zinc-400 mb-3">
        El <code className="text-brand-400">PVPListener</code> cancela automáticamente el daño cuando
        alguno de los jugadores involucrados tiene el PvP desactivado, incluyendo daño por proyectiles.
        El atacante recibe un aviso (con anti-spam de 2 segundos).
      </p>
      <CodeBlock language="yaml" code={pvpExplain} />

      {/* ETCWorlds integration */}
      <h2 id="integracion-worlds" className="text-2xl font-semibold text-white mt-10 mb-4">🔗 Integración con ETCWorlds</h2>
      <p className="text-zinc-400 mb-3">
        El menú se comunica con ETCWorlds mediante un bridge por reflexión. Esto significa que
        ETCCore <strong className="text-zinc-200">no depende de ETCWorlds en compilación</strong> — si
        ETCWorlds no está instalado, los submenús de Mundos y PocketWorlds simplemente muestran
        un aviso, sin errores.
      </p>
      <p className="text-zinc-400 mb-3">
        Para que los mundos aparezcan en el menú de Mundos, el mundo debe tener:
      </p>
      <ul className="list-disc list-inside text-zinc-300 space-y-2 marker:text-brand-400 mb-3 text-sm">
        <li><code className="text-brand-400">menuVisible: true</code> (default) — visible en el menú.</li>
        <li><code className="text-brand-400">publicAccess: true</code> — o el jugador en la whitelist, o tiene el permiso <code>accessPermission</code>, o tiene <code>etccore.menu.bypass</code>.</li>
        <li>No debe ser una instancia por jugador (<code>perPlayerInstance: false</code>).</li>
        <li>No debe ser un PocketWorld (los PW van en su propio submenú).</li>
      </ul>
      <CodeBlock language="yaml" code={worldsBridgeNote} />
      <p className="text-zinc-400 mt-3 mb-8 text-sm">
        Controlar visibilidad desde el juego:{' '}
        <code className="text-brand-400">/etcworlds set lobby menu-visible false</code>
      </p>

      {/* Implementation note */}
      <h2 id="implementacion" className="text-2xl font-semibold text-white mb-4">🛠️ Detalles técnicos</h2>
      <p className="text-zinc-400 mb-3 text-sm">
        Los submenús extienden la clase base <code className="text-brand-400">EtcMenu</code> que
        implementa <code>InventoryHolder</code>. Un único <code className="text-brand-400">MenuListener</code>
        maneja todos los clicks detectando el holder. La acción{' '}
        <code className="text-brand-400">[ETCMENU] tipo</code> es interpretada por{' '}
        <code className="text-brand-400">CustomCommand</code> y delega en{' '}
        <code className="text-brand-400">EtcMenuOpener</code>.
      </p>
      <ul className="list-disc list-inside text-zinc-300 space-y-1 marker:text-brand-400 mb-8 text-sm">
        <li>Los mundos y pocketworlds se consultan en tiempo real — nuevos mundos aparecen sin recargar.</li>
        <li>Las homes se leen desde <code>TeleportManager</code> en cada apertura.</li>
        <li>Las solicitudes TPA expiradas se filtran automáticamente.</li>
        <li>Los menús con listas largas usan paginación con botones «anterior / siguiente».</li>
      </ul>
    </div>
  )
}
