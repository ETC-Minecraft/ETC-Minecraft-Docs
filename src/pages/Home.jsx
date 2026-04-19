import { Link } from 'react-router-dom'

const projects = [
  {
    badge: '⬡',
    name: 'ETCCore',
    type: 'Plugin · Paper / Folia',
    desc: 'Comandos YAML, menús GUI, economía, variables y más. El núcleo de cualquier servidor ETC.',
    to: '/etccore',
    status: 'Activo',
  },
  {
    badge: '🗺️',
    name: 'ETCRegionGenerator',
    type: 'Plugin · Folia',
    desc: 'Pre-generación concurrente de regiones `.mca`. Sin lag, con pausa/reanudar y persistencia.',
    to: '/etcregion-generator',
    status: 'Activo',
  },
  {
    badge: '�',
    name: 'ETCWorlds',
    type: 'Plugin · Paper / Folia',
    desc: 'Gestión de múltiples mundos: templates (Void, Skyblock, OneBlock…), world-groups, instancias por jugador, PocketWorlds, backups rotativos y más.',
    to: '/etcworlds',
    status: 'Activo',
  },
  {
    badge: '�🎨',
    name: 'ETC-ResourcePack',
    type: 'Resource Pack · Java Edition',
    desc: 'Íconos, texturas custom y HUD personalizado para integración con ETCCore.',
    to: null,
    status: 'Próximamente',
  },
  {
    badge: '📦',
    name: 'ETC-DataPack',
    type: 'Data Pack · Vanilla+',
    desc: 'Mecánicas adicionales sin mods: crafting custom, avances, loot tables.',
    to: null,
    status: 'Próximamente',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-brand-400 text-sm font-mono mb-3">
          ETC-Minecraft / Docs
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Documentación<br />
          <span className="text-brand-400">ETC-Minecraft</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mb-6">
          Plugins, herramientas y recursos open-source para servidores Minecraft.<br />
          Folia · Paper · Java Edition 1.21+
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors"
          >
            Ver proyectos →
          </Link>
          <a
            href="https://github.com/ETC-Minecraft"
            target="_blank" rel="noreferrer"
            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-semibold transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Projects grid */}
      <h2 className="text-xl font-bold text-white mb-4">Proyectos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {projects.map(p => (
          <div
            key={p.name}
            className={`p-5 rounded-xl border bg-zinc-900 flex flex-col gap-2 transition-colors ${p.to ? 'border-zinc-700 hover:border-brand-400/50' : 'border-zinc-800 opacity-60'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{p.badge}</span>
                <div>
                  <h3 className="font-semibold text-white text-sm">{p.name}</h3>
                  <p className="text-xs text-zinc-500">{p.type}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.status === 'Activo' ? 'bg-green-900/40 text-green-400 border border-green-800' : 'bg-yellow-900/30 text-yellow-500 border border-yellow-800'}`}>
                {p.status}
              </span>
            </div>
            <p className="text-sm text-zinc-400 flex-1">{p.desc}</p>
            {p.to ? (
              <Link to={p.to} className="text-sm text-brand-400 hover:underline">
                Ver documentación →
              </Link>
            ) : (
              <span className="text-sm text-zinc-600 italic">Documentación no disponible aún</span>
            )}
          </div>
        ))}
      </div>

      {/* About */}
      <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900">
        <h3 className="font-bold text-white mb-2">¿Qué es ETC-Minecraft?</h3>
        <p className="text-sm text-zinc-400 mb-3">
          Organización de desarrollo open-source enfocada en crear plugins, herramientas y recursos para
          servidores Minecraft. Todo el código está bajo licencia MIT — libre de usar, modificar y distribuir.
        </p>
        <a
          href="https://github.com/ETC-Minecraft"
          target="_blank" rel="noreferrer"
          className="text-sm text-brand-400 hover:underline"
        >
          Ver organización en GitHub →
        </a>
      </div>
    </div>
  )
}
