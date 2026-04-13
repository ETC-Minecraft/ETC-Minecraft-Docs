import CodeBlock from '../components/CodeBlock.jsx'

const survivalYml = `
description: "Teletransporte al mundo survival"
permission: ""
console-allowed: false
cooldown: 60
cooldown-message: "&cEspera &e{remaining}s &cpara usar /survival de nuevo."
actions:
  - "[TITLE:10:70:20] &a¡Teletransportando!;&7Buscando zona segura..."
  - "[SOUND] ENTITY_ENDERMAN_TELEPORT"
  - "[CONSOLE] rtp {player} world_survival"
`

const multiYml = `
commands:
  spawn:
    description: "Ir al spawn"
    actions:
      - "[CONSOLE] spawn {player}"
      - "[SOUND] ENTITY_ENDERMAN_TELEPORT"

  kit:
    description: "Reclamar kit diario"
    cooldown: 86400
    actions:
      - "[PLAYER] kit-diario"
`

export default function GettingStarted() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold text-white mb-2">Instalación</h1>
      <p className="text-zinc-400 mb-8">Guía rápida para poner ETCCore en marcha.</p>

      <h2 className="text-xl font-bold text-white mt-8 mb-3">Requisitos</h2>
      <ul className="text-zinc-400 space-y-1 list-disc list-inside">
        <li><strong className="text-zinc-200">Paper o Folia</strong> 1.21.1 o superior</li>
        <li><strong className="text-zinc-200">Java 21</strong> o superior</li>
        <li><span className="text-zinc-500">(Opcional)</span> LuckPerms, PlaceholderAPI, Vault</li>
      </ul>

      <h2 className="text-xl font-bold text-white mt-8 mb-3">Pasos</h2>
      <ol className="text-zinc-400 space-y-3 list-decimal list-inside">
        <li>
          Descarga el <code className="text-brand-400">ETCCore-x.x.x.jar</code> de{' '}
          <a href="https://github.com/ETC-Minecraft/ETCCore/releases/latest"
             target="_blank" rel="noreferrer"
             className="text-brand-400 hover:underline">
            GitHub Releases
          </a>
        </li>
        <li>Coloca el JAR en la carpeta <code className="text-brand-400">plugins/</code> de tu servidor</li>
        <li>Inicia (o reinicia) el servidor</li>
        <li>
          Se creará <code className="text-brand-400">plugins/ETCCore/</code> con archivos de ejemplo:
          <div className="mt-2 text-sm font-mono bg-zinc-900 border border-zinc-700 rounded p-3 text-zinc-300">
            plugins/ETCCore/<br />
            ├── config.yml<br />
            ├── commands/<br />
            │   ├── inicio.yml<br />
            │   ├── survival.yml<br />
            │   └── scheduled/<br />
            ├── menus/<br />
            │   ├── panel.yml<br />
            │   └── tienda.yml<br />
            └── playerdata/
          </div>
        </li>
        <li>Edita o crea archivos <code className="text-brand-400">.yml</code> según tus necesidades</li>
        <li>
          Recarga con <code className="text-brand-400">/fccmds reload</code> — o activa el{' '}
          <strong className="text-zinc-200">auto-reload</strong> en <code className="text-brand-400">config.yml</code> para detección automática
        </li>
      </ol>

      <h2 className="text-xl font-bold text-white mt-10 mb-3">Formato simple</h2>
      <p className="text-zinc-400 mb-1">
        El nombre del archivo (sin <code className="text-brand-400">.yml</code>) se convierte en el comando.
        El archivo <code className="text-brand-400">commands/survival.yml</code> crea el comando <code className="text-brand-400">/survival</code>:
      </p>
      <CodeBlock code={survivalYml} title="commands/survival.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">Formato múltiple</h2>
      <p className="text-zinc-400 mb-1">
        Un archivo puede definir varios comandos bajo la clave <code className="text-brand-400">commands:</code>:
      </p>
      <CodeBlock code={multiYml} title="commands/varios.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-3">Comandos internos</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="py-2 pr-4 text-zinc-300">Comando</th>
              <th className="py-2 text-zinc-300">Descripción</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              ['/fccmds reload', 'Recarga comandos, menús, blocked-commands y chat-format'],
              ['/fccmds onlinemode [true|false]', 'Cambia el modo online del servidor en caliente'],
              ['/enderchest [jugador]', 'Abre tu ender chest o el de otro jugador (online u offline)'],
              ['/invsee <jugador>', 'Ve y edita el inventario de un jugador online u offline'],
              ['/mute <jugador> [duración] [razón]', 'Silencia a un jugador • 30s, 5m, 2h, 1d, perm'],
              ['/unmute <jugador>', 'Quita el silencio a un jugador'],
            ].map(([cmd, desc]) => (
              <tr key={cmd} className="border-b border-zinc-800">
                <td className="py-2 pr-4 font-mono text-brand-400 whitespace-nowrap">{cmd}</td>
                <td className="py-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
