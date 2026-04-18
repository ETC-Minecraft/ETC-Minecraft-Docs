import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock.jsx'

const configYml = `# plugins/ETCWorlds/config.yml

# Carpeta donde viven los mundos creados por ETCWorlds (relativa al server root).
worlds-folder: mundos

# Pre-cargar (warmup) los chunks alrededor del spawn al arrancar mundos marcados keep-loaded.
preload:
  enabled: true
  radius-chunks: 4

# Descarga automática de mundos vacíos.
idle-unload:
  enabled: true
  check-interval-seconds: 60
  empty-grace-seconds: 300       # tiempo sin jugadores antes de descargar
  ignore-keep-loaded: true

# Backups asíncronos (zip) rotativos.
backups:
  enabled: true
  interval-minutes: 360          # cada 6h
  keep: 5                        # cuántos snapshots conservar por mundo
  folder: backups

# Teleport seguro (busca bloque sólido y altura libre).
safe-teleport:
  enabled: true
  search-radius: 8
  max-y: 320

# Mensajes (color codes con &)
messages:
  prefix: "&8[&bETCWorlds&8] &r"
  no-permission: "&cNo tienes permiso."
  world-not-found: "&cMundo no encontrado: &7%name%"
  loading: "&7Cargando mundo &f%name%&7..."
  teleported: "&aTeletransportado a &f%name%"`

const worldRulesYml = `# &lt;mundos&gt;/&lt;world&gt;/etcworlds.yml — auto-generado por mundo
name: skyworld
template: SKYBLOCK
environment: NORMAL
ambient: NORMAL
gamemode: SURVIVAL          # FORCED si force-gamemode true
force-gamemode: true
pvp: false
allow-fly: true
allow-build: true
keep-inventory: true
keep-experience: true
disable-hunger: true
disable-fall-damage: true
disable-mob-spawn: false
fixed-time: 6000            # null = ciclo normal
fixed-weather: CLEAR        # null = clima normal
world-border: 6000
spawn-x: 0.5
spawn-y: 65
spawn-z: 0.5
linked-nether: skyworld_nether
linked-end: skyworld_end
keep-loaded: true
is-template: false
per-player-instance: false
public-access: true
whitelist: []               # uuids — si publicAccess=false sólo estos entran
blacklist: []
world-group: skyblock       # comparte inv/xp/gm con otros mundos del mismo grupo
allowed-commands: []        # vacío = todos; lista = filtro de comandos permitidos
custom-min-y: -64           # rango personalizado (datapack auto)
custom-max-y: 320`

const templates = [
  { name: 'NORMAL',           desc: 'Mundo vainilla.' },
  { name: 'FLAT',             desc: 'SuperFlat clásico.' },
  { name: 'AMPLIFIED',        desc: 'Terreno amplificado.' },
  { name: 'LARGE_BIOMES',     desc: 'Biomas extendidos.' },
  { name: 'VOID',             desc: 'Vacío total — sin estructura.' },
  { name: 'SKYBLOCK',         desc: 'Vacío con isla inicial (árbol + cofre).' },
  { name: 'ONEBLOCK',         desc: 'Un único bloque que se regenera al romperse (pool aleatoria).' },
  { name: 'LAYERED_VOID',     desc: 'Capas planas configurables con vacío encima.' },
  { name: 'FLOATING_ISLANDS', desc: 'Islas suspendidas dispersas (ruido).' },
  { name: 'SINGLE_BIOME',     desc: 'Mundo entero forzado a un solo bioma.' },
  { name: 'CUSTOM_HEIGHT',    desc: 'Mundo NORMAL con min/max-Y personalizados (genera datapack auto, hasta y=4064).' },
]

const commands = [
  { cmd: '/etcworlds create <name> <template> [env] [seed]', desc: 'Crea un nuevo mundo. env = NORMAL/NETHER/THE_END.' },
  { cmd: '/etcworlds delete <name>',          desc: 'Elimina un mundo (con backup automático previo).' },
  { cmd: '/etcworlds load <name>',            desc: 'Carga un mundo registrado.' },
  { cmd: '/etcworlds unload <name> [save]',   desc: 'Descarga un mundo (save=true por defecto).' },
  { cmd: '/etcworlds import <name> <ruta>',   desc: 'Registra un mundo existente (acepta carpeta dentro o fuera de mundos/).' },
  { cmd: '/etcworlds importzip <zipPath>',    desc: 'Descomprime un .zip y registra el mundo extraído.' },
  { cmd: '/etcworlds export <name> [destZip]',desc: 'Exporta el mundo a .zip (asíncrono).' },
  { cmd: '/etcworlds backup <name>',          desc: 'Snapshot manual rotativo.' },
  { cmd: '/etcworlds set <name> <prop> <val>',desc: 'Cambia una propiedad (pvp, fly, gamemode, time, weather, border, group, isTemplate, perPlayerInstance, etc.).' },
  { cmd: '/etcworlds link <name> <nether|end> <targetWorld>', desc: 'Enlaza portales nether/end de un mundo a otro.' },
  { cmd: '/etcworlds spawn <name>',           desc: 'Define el spawn del mundo en tu posición actual.' },
  { cmd: '/etcworlds list',                   desc: 'Lista todos los mundos gestionados.' },
  { cmd: '/etcworlds info <name>',            desc: 'Detalles + reglas + tamaño en disco + jugadores.' },
  { cmd: '/etcworlds tp <name> [x y z]',      desc: 'Teleport con pre-warmup de chunks (Folia-safe).' },
  { cmd: '/etcworlds gui',                    desc: 'Abre la GUI gráfica de gestión.' },
  { cmd: '/etcworlds clone <plantilla> <nuevo>', desc: 'Clona un mundo plantilla bajo otro nombre.' },
  { cmd: '/etcworlds instance <plantilla>',   desc: 'Crea (o carga) tu instancia personal de la plantilla.' },
  { cmd: '/etcworlds pregen <world> <radio>', desc: 'Lanza pre-gen vía ETCRegionGenerator (si está cargado).' },
  { cmd: '/etcworlds seeds',                  desc: 'Lista presets de seeds curados.' },
  { cmd: '/etcworlds templates',              desc: 'Lista los templates disponibles.' },
  { cmd: '/etcworlds reload',                 desc: 'Recarga config.yml + reglas de cada mundo.' },
  { cmd: '/world <name> [x y z]',             desc: 'Alias corto de /etcworlds tp con permiso etcworlds.tp.' },
  { cmd: '/worldlist',                        desc: 'Versión pública compacta de list.' },
  { cmd: '/worldinfo [name]',                 desc: 'Info del mundo actual o el indicado.' },
  { cmd: '/worldspawn',                       desc: 'Teleport al spawn del mundo actual.' },
]

const perms = [
  { perm: 'etcworlds.admin',     desc: 'Acceso completo a todos los subcomandos.', def: 'op' },
  { perm: 'etcworlds.create',    desc: 'Crear / borrar / importar / exportar mundos.',  def: 'op' },
  { perm: 'etcworlds.load',      desc: 'Cargar / descargar mundos.',                    def: 'op' },
  { perm: 'etcworlds.set',       desc: 'Cambiar reglas, link, spawn, pregen.',          def: 'op' },
  { perm: 'etcworlds.template',  desc: 'Marcar plantillas y clonar.',                   def: 'op' },
  { perm: 'etcworlds.tp',        desc: 'Teleport entre mundos / crear instancias.',     def: 'true' },
  { perm: 'etcworlds.gui',       desc: 'Abrir la GUI gráfica.',                         def: 'op' },
  { perm: 'etcworlds.bypass',    desc: 'Saltar whitelist/blacklist por mundo.',         def: 'op' },
  { perm: 'etcworlds.reload',    desc: 'Recargar configuración.',                       def: 'op' },
]

const placeholders = [
  { tag: '%etcworlds_count%',          desc: 'Total de mundos gestionados.' },
  { tag: '%etcworlds_loaded_count%',   desc: 'Mundos actualmente cargados en memoria.' },
  { tag: '%etcworlds_world%',          desc: 'Nombre del mundo del jugador.' },
  { tag: '%etcworlds_template%',       desc: 'Template del mundo actual.' },
  { tag: '%etcworlds_group%',          desc: 'World group del mundo actual.' },
  { tag: '%etcworlds_pvp%',            desc: 'true/false según PvP.' },
  { tag: '%etcworlds_size_<world>%',   desc: 'Tamaño del mundo en disco (formato humano).' },
]

export default function ETCWorldsDocs() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-brand-400 text-sm font-mono mb-3">
          ETC-Minecraft / ETCWorlds
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">🌍 ETCWorlds</h1>
        <p className="text-zinc-400 text-lg max-w-3xl mb-5">
          Plugin nativo <strong className="text-zinc-200">Folia / Paper 1.21.1+</strong> para gestionar
          múltiples mundos: creación con templates personalizados (void, skyblock, oneblock,
          islas flotantes, biomas únicos, alturas custom hasta <code className="text-brand-400">y=4064</code>),
          enlaces de dimensión, reglas por mundo, world-groups con inventario compartido,
          instancias por jugador, backups rotativos, GUI, y bridge con ETCRegionGenerator.
        </p>
        <div className="flex flex-wrap gap-3 mb-5">
          <span className="px-3 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-xs text-zinc-300">Folia ✔</span>
          <span className="px-3 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-xs text-zinc-300">Java 21</span>
          <span className="px-3 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-xs text-zinc-300">PlaceholderAPI</span>
          <span className="px-3 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-xs text-zinc-300">ETCCore hook</span>
          <span className="px-3 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-xs text-zinc-300">11 templates</span>
        </div>
      </div>

      {/* Quick start */}
      <h2 id="inicio" className="text-2xl font-semibold text-white mb-4">⚡ Inicio rápido</h2>
      <ol className="list-decimal list-inside text-zinc-300 space-y-2 mb-8 marker:text-brand-400">
        <li>Coloca <code className="text-brand-400">ETCWorlds-1.0.0.jar</code> en <code>plugins/</code> (recomendado: junto a ETCCore).</li>
        <li>Inicia el server una vez para generar <code>plugins/ETCWorlds/config.yml</code>.</li>
        <li>Crea tu primer mundo:&nbsp;
          <code className="text-brand-400">/etcworlds create lobby VOID</code>
        </li>
        <li>Teletransporta:&nbsp;
          <code className="text-brand-400">/world lobby</code> o <code className="text-brand-400">/etcworlds gui</code>.
        </li>
        <li>Configura reglas:&nbsp;
          <code className="text-brand-400">/etcworlds set lobby pvp false</code>,&nbsp;
          <code className="text-brand-400">/etcworlds set lobby fly true</code>.
        </li>
      </ol>

      {/* Templates */}
      <h2 id="templates" className="text-2xl font-semibold text-white mb-4">🎨 Templates de generación</h2>
      <div className="overflow-x-auto rounded-lg border border-zinc-700/50 mb-8">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800/60 text-zinc-300">
            <tr><th className="text-left px-3 py-2">Template</th><th className="text-left px-3 py-2">Descripción</th></tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {templates.map(t => (
              <tr key={t.name}>
                <td className="px-3 py-2 font-mono text-brand-400">{t.name}</td>
                <td className="px-3 py-2 text-zinc-300">{t.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-zinc-400 text-sm mb-8">
        Para <code>CUSTOM_HEIGHT</code> ETCWorlds genera automáticamente un datapack con un
        <code className="text-brand-400"> dimension_type</code> personalizado (min_y / height) que respeta
        los límites de Paper (hasta <code>y=4064</code>). El datapack se coloca dentro de la carpeta del mundo.
      </p>

      {/* Commands */}
      <h2 id="comandos" className="text-2xl font-semibold text-white mb-4">📟 Comandos</h2>
      <div className="overflow-x-auto rounded-lg border border-zinc-700/50 mb-8">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800/60 text-zinc-300">
            <tr><th className="text-left px-3 py-2">Comando</th><th className="text-left px-3 py-2">Función</th></tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {commands.map(c => (
              <tr key={c.cmd}>
                <td className="px-3 py-2 font-mono text-brand-400 whitespace-nowrap">{c.cmd}</td>
                <td className="px-3 py-2 text-zinc-300">{c.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permissions */}
      <h2 id="permisos" className="text-2xl font-semibold text-white mb-4">🔐 Permisos</h2>
      <div className="overflow-x-auto rounded-lg border border-zinc-700/50 mb-8">
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

      {/* Config */}
      <h2 id="config" className="text-2xl font-semibold text-white mb-4">⚙️ Configuración</h2>
      <p className="text-zinc-400 mb-3">El archivo principal queda en <code className="text-brand-400">plugins/ETCWorlds/config.yml</code>:</p>
      <CodeBlock language="yaml" code={configYml} />

      {/* Per-world rules */}
      <h2 id="reglas" className="text-2xl font-semibold text-white mt-10 mb-4">📜 Reglas por mundo</h2>
      <p className="text-zinc-400 mb-3">
        Cada mundo gestionado tiene un archivo <code className="text-brand-400">etcworlds.yml</code> dentro de
        su carpeta (<code>mundos/&lt;name&gt;/etcworlds.yml</code>). Puede editarse a mano y recargarse con
        <code> /etcworlds reload</code>:
      </p>
      <CodeBlock language="yaml" code={worldRulesYml} />

      {/* World groups */}
      <h2 id="groups" className="text-2xl font-semibold text-white mt-10 mb-4">👥 World Groups (inventarios compartidos)</h2>
      <p className="text-zinc-400 mb-3">
        Los mundos que comparten <code className="text-brand-400">world-group</code> también comparten
        inventario, armadura, ender chest, XP, niveles, vida, hambre y gamemode. Los mundos en grupos
        distintos guardan/restauran un snapshot al cambiar (estilo PerWorldInventory).
      </p>
      <p className="text-zinc-400 mb-8">
        Por defecto todos los mundos están en el grupo <code>default</code>. Cambia con:&nbsp;
        <code className="text-brand-400">/etcworlds set survival group survival</code>.
      </p>

      {/* Instances + clone */}
      <h2 id="instances" className="text-2xl font-semibold text-white mb-4">🧬 Plantillas, clones e instancias</h2>
      <ul className="list-disc list-inside text-zinc-300 space-y-2 marker:text-brand-400 mb-3">
        <li><strong className="text-white">Plantilla</strong>: marca un mundo como <code>isTemplate=true</code> con
          <code className="text-brand-400"> /etcworlds set parkour isTemplate true</code>.</li>
        <li><strong className="text-white">Clonar</strong>: copia exacta bajo otro nombre con&nbsp;
          <code className="text-brand-400">/etcworlds clone parkour parkour-evento</code>.</li>
        <li><strong className="text-white">Instancia por jugador</strong>: si la plantilla tiene&nbsp;
          <code>perPlayerInstance=true</code>, cada jugador entra a su propia copia con&nbsp;
          <code className="text-brand-400">/etcworlds instance parkour</code> (whitelist automática).</li>
      </ul>
      <p className="text-zinc-400 mb-8">
        Las instancias se descargan automáticamente cuando quedan vacías (idle-unload).
      </p>

      {/* Linking */}
      <h2 id="dimensiones" className="text-2xl font-semibold text-white mb-4">🌌 Enlaces de dimensión</h2>
      <p className="text-zinc-400 mb-3">
        Crea <code>survival_nether</code> y <code>survival_end</code> y enlázalos con:
      </p>
      <CodeBlock language="bash" code={`/etcworlds link survival nether survival_nether
/etcworlds link survival end survival_end`} />
      <p className="text-zinc-400 mt-3 mb-8">
        Cuando un jugador atraviesa un portal en <code>survival</code>, ETCWorlds lo redirige al mundo
        enlazado aplicando la escala vainilla (1:8 al Nether, 1:1 al End). Funciona también con mundos
        en otros entornos (ambient mixto).
      </p>

      {/* Backups & idle */}
      <h2 id="backups" className="text-2xl font-semibold text-white mb-4">💾 Backups e idle-unload</h2>
      <p className="text-zinc-400 mb-3">
        Snapshots <code>.zip</code> rotativos en <code>plugins/ETCWorlds/backups/&lt;world&gt;/</code>.
        El número de copias por mundo se controla con <code className="text-brand-400">backups.keep</code>.
        Generación 100 % asíncrona (<code>getAsyncScheduler</code>).
      </p>
      <p className="text-zinc-400 mb-8">
        El descargador de mundos vacíos libera RAM tras <code>idle-unload.empty-grace-seconds</code>
        sin jugadores; mundos con <code>keep-loaded=true</code> quedan exentos.
      </p>

      {/* Placeholders */}
      <h2 id="placeholders" className="text-2xl font-semibold text-white mb-4">🔌 PlaceholderAPI</h2>
      <div className="overflow-x-auto rounded-lg border border-zinc-700/50 mb-8">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800/60 text-zinc-300">
            <tr><th className="text-left px-3 py-2">Placeholder</th><th className="text-left px-3 py-2">Descripción</th></tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {placeholders.map(p => (
              <tr key={p.tag}>
                <td className="px-3 py-2 font-mono text-brand-400">{p.tag}</td>
                <td className="px-3 py-2 text-zinc-300">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ETCCore + RegionGen */}
      <h2 id="hooks" className="text-2xl font-semibold text-white mb-4">🔗 Integraciones</h2>
      <ul className="list-disc list-inside text-zinc-300 space-y-2 marker:text-brand-400 mb-8">
        <li>
          <strong className="text-white">ETCCore</strong>: ETCWorlds usa los servicios de variables y acciones
          de ETCCore si está presente — puedes invocar <code>/world</code> y disparar acciones YAML al entrar.
        </li>
        <li>
          <strong className="text-white">ETCRegionGenerator</strong>: <code>/etcworlds pregen &lt;world&gt; &lt;radio&gt;</code>
          delega en el plugin para pre-generar chunks sin lag.
        </li>
        <li>
          <strong className="text-white">PlaceholderAPI</strong>: expone <code>%etcworlds_*%</code>.
        </li>
        <li>
          <strong className="text-white">LuckPerms / Vault / Floodgate</strong>: soft-deps; ETCWorlds respeta
          permisos por mundo y se integra con <code>/spawn</code> de ETCCore.
        </li>
      </ul>

      {/* Examples */}
      <h2 id="ejemplos" className="text-2xl font-semibold text-white mb-4">📚 Recetas</h2>
      <p className="text-zinc-400 mb-2">Skyblock con instancias por jugador:</p>
      <CodeBlock language="bash" code={`/etcworlds create sky-tmpl SKYBLOCK
/etcworlds set sky-tmpl isTemplate true
/etcworlds set sky-tmpl perPlayerInstance true
/etcworlds set sky-tmpl group skyblock
/etcworlds set sky-tmpl pvp false
/etcworlds set sky-tmpl fly true
# y los jugadores entran con:
/etcworlds instance sky-tmpl`} />

      <p className="text-zinc-400 mt-6 mb-2">Mundo "amplificado" alto con ambient nether (atmósfera y mobs nether sobre terreno overworld):</p>
      <CodeBlock language="bash" code={`/etcworlds create infierno AMPLIFIED NORMAL
/etcworlds set infierno ambient NETHER
/etcworlds set infierno custom-max-y 500
/etcworlds set infierno fixed-time 18000`} />

      <p className="text-zinc-400 mt-6 mb-2">Survival con enlaces de dimensión y grupo aislado:</p>
      <CodeBlock language="bash" code={`/etcworlds create survival NORMAL
/etcworlds create survival_nether NORMAL NETHER
/etcworlds create survival_end NORMAL THE_END
/etcworlds link survival nether survival_nether
/etcworlds link survival end survival_end
/etcworlds set survival group survival
/etcworlds set survival_nether group survival
/etcworlds set survival_end group survival`} />

      <div className="mt-10 p-4 rounded-lg bg-zinc-800/40 border border-zinc-700/50">
        <p className="text-zinc-300 text-sm">
          ¿Vienes de Multiverse o MultiWorld? La sintaxis es deliberadamente similar y los mundos existentes
          pueden importarse con <code className="text-brand-400">/etcworlds import &lt;name&gt; &lt;ruta&gt;</code> sin tocar archivos.
        </p>
      </div>
    </div>
  )
}
