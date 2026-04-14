const projects = [
  {
    name: 'ETCCore',
    status: 'Activo',
    statusColor: 'text-green-400',
    type: 'Plugin · Paper / Folia',
    description:
      'Plugin de comandos YAML, menús, economía, protecciones y más. El núcleo de cualquier servidor con la marca ETC.',
    repo: 'https://github.com/ETC-Minecraft/ETCCore',
    badge: '⬡',
  },
  {
    name: 'ETCRegionGenerator',
    status: 'Activo',
    statusColor: 'text-green-400',
    type: 'Plugin · Paper / Folia',
    description:
      'Plugin para generación y gestión de regiones en servidores Minecraft. Automatiza la creación de zonas del mapa de forma controlada.',
    repo: 'https://github.com/ETC-Minecraft/ETCRegionGenerator',
    badge: '🗺️',
  },
  {
    name: 'ETC-Minecraft Docs',
    status: 'Activo',
    statusColor: 'text-green-400',
    type: 'Documentación · React + Vite',
    description:
      'Este sitio de documentación. Hecho con React 18, Vite 5 y TailwindCSS.',
    repo: 'https://github.com/ETC-Minecraft/ETC-Minecraft-Docs',
    badge: '📄',
  },
  {
    name: 'ETC-ResourcePack',
    status: 'Próximamente',
    statusColor: 'text-yellow-400',
    type: 'Resource Pack · Java Edition',
    description:
      'Resource pack oficial de la marca ETC. Íconos, texturas custom, HUD personalizado.',
    repo: null,
    badge: '🎨',
  },
  {
    name: 'ETC-DataPack',
    status: 'Próximamente',
    statusColor: 'text-yellow-400',
    type: 'Data Pack · Vanilla+',
    description:
      'Mecánicas adicionales sin mods. Crafting custom, avances, loot tables.',
    repo: null,
    badge: '📦',
  },
]

export default function Projects() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Proyectos ETC-Minecraft</h1>
      <p className="text-zinc-400 mb-8">
        Todos los proyectos desarrollados bajo la organización{' '}
        <a
          href="https://github.com/ETC-Minecraft"
          target="_blank"
          rel="noreferrer"
          className="text-brand-400 hover:underline"
        >
          github.com/ETC-Minecraft
        </a>
        . Diseñados para servidores Java Edition (Paper/Folia) con soporte Bedrock via Geyser.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.name}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{p.badge}</span>
              <span className={`text-xs font-semibold ${p.statusColor}`}>{p.status}</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{p.name}</h2>
              <p className="text-xs text-zinc-500 mt-0.5">{p.type}</p>
            </div>
            <p className="text-sm text-zinc-400 flex-1">{p.description}</p>
            {p.repo ? (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-brand-400 hover:underline"
              >
                Ver repositorio →
              </a>
            ) : (
              <span className="text-sm text-zinc-600 italic">Repositorio no disponible aún</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
        <h3 className="font-bold text-white mb-1">¿Quieres contribuir?</h3>
        <p className="text-sm text-zinc-400 mb-3">
          Los plugins de ETC-Minecraft son open-source bajo licencia MIT. Pull requests, issues y sugerencias son bienvenidos.
        </p>
        <a
          href="https://github.com/ETC-Minecraft/ETCCore/issues/new/choose"
          target="_blank"
          rel="noreferrer"
          className="inline-block px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm rounded-lg transition-colors"
        >
          Abrir issue
        </a>
      </div>
    </div>
  )
}
