import { useState } from 'react'

const CATEGORIES = ['Todos', 'Plugins', 'Herramientas', 'Próximamente']

const projects = [
  {
    name: 'ETCCore',
    status: 'Activo',
    category: 'Plugins',
    type: 'Plugin · Paper / Folia',
    description:
      'Plugin núcleo: comandos YAML, menús GUI, economía (Vault), variables por jugador, sistema de mute, protección de construcción y más.',
    repo: 'https://github.com/ETC-Minecraft/ETCCore',
    docs: '/getting-started',
    badge: '⬡',
    tags: ['Java 21+', 'Paper', 'Folia', 'YAML', 'Vault'],
    featured: true,
  },
  {
    name: 'ETCRegionGenerator',
    status: 'Activo',
    category: 'Plugins',
    type: 'Plugin · Folia',
    description:
      'Pre-generación de regiones `.mca` de forma concurrente y nativa en Folia. Sin lag, con pausa/reanudar, persistencia entre reinicios y barra de progreso en vivo.',
    repo: 'https://github.com/ETC-Minecraft/ETCRegionGenerator',
    docs: null,
    badge: '🗺️',
    tags: ['Java 21+', 'Folia', 'Concurrente'],
    featured: true,
  },
  {
    name: 'ETC-Minecraft Docs',
    status: 'Activo',
    category: 'Herramientas',
    type: 'Documentación · React + Vite',
    description:
      'Este sitio de documentación. Construido con React 18, Vite 5 y TailwindCSS. Cubre todos los proyectos de la organización.',
    repo: 'https://github.com/ETC-Minecraft/ETC-Minecraft-Docs',
    docs: null,
    badge: '📄',
    tags: ['React', 'Vite', 'TailwindCSS'],
    featured: false,
  },
  {
    name: 'ETC-ResourcePack',
    status: 'Próximamente',
    category: 'Próximamente',
    type: 'Resource Pack · Java Edition',
    description:
      'Resource pack oficial de la marca ETC. Íconos, texturas custom y HUD personalizado para integración con ETCCore.',
    repo: null,
    docs: null,
    badge: '🎨',
    tags: ['Resource Pack', 'Java Edition'],
    featured: false,
  },
  {
    name: 'ETC-DataPack',
    status: 'Próximamente',
    category: 'Próximamente',
    type: 'Data Pack · Vanilla+',
    description:
      'Mecánicas adicionales sin mods: crafting custom, avances, loot tables y recetas modificadas.',
    repo: null,
    docs: null,
    badge: '📦',
    tags: ['Data Pack', 'Vanilla+'],
    featured: false,
  },
]

const statusStyles = {
  Activo: 'bg-green-900/40 text-green-400 border border-green-800',
  Próximamente: 'bg-yellow-900/30 text-yellow-400 border border-yellow-800',
}

function ProjectCard({ p }) {
  return (
    <div className={`bg-zinc-900 border rounded-xl p-5 flex flex-col gap-3 transition-colors hover:border-zinc-600 ${p.featured ? 'border-zinc-700' : 'border-zinc-800'}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none">{p.badge}</span>
          <div>
            <h2 className="text-base font-bold text-white leading-tight">{p.name}</h2>
            <p className="text-xs text-zinc-500 mt-0.5">{p.type}</p>
          </div>
        </div>
        <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyles[p.status]}`}>
          {p.status}
        </span>
      </div>

      <p className="text-sm text-zinc-400 flex-1 leading-relaxed">{p.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {p.tags.map(tag => (
          <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-1 border-t border-zinc-800">
        {p.repo ? (
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-brand-400 hover:text-brand-300 hover:underline transition-colors"
          >
            GitHub →
          </a>
        ) : (
          <span className="text-xs text-zinc-600 italic">Sin repositorio aún</span>
        )}
        {p.docs && (
          <a href={p.docs} className="text-xs text-zinc-400 hover:text-white transition-colors">
            Documentación →
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState('Todos')

  const filtered =
    activeTab === 'Todos'
      ? projects
      : projects.filter(p => p.category === activeTab)

  const featured = filtered.filter(p => p.featured)
  const rest = filtered.filter(p => !p.featured)

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Proyectos ETC-Minecraft</h1>
      <p className="text-zinc-400 mb-6">
        Todos los proyectos bajo{' '}
        <a
          href="https://github.com/ETC-Minecraft"
          target="_blank"
          rel="noreferrer"
          className="text-brand-400 hover:underline"
        >
          github.com/ETC-Minecraft
        </a>
        . Open-source · MIT · Java Edition 1.21+
      </p>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-zinc-900 border border-zinc-800 p-1 rounded-lg w-fit">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
              activeTab === cat
                ? 'bg-brand-600 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {cat}
            <span className="ml-1.5 text-xs opacity-60">
              {cat === 'Todos' ? projects.length : projects.filter(p => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <>
          {activeTab === 'Todos' && (
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">Destacados</p>
          )}
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {featured.map(p => <ProjectCard key={p.name} p={p} />)}
          </div>
        </>
      )}

      {/* Rest */}
      {rest.length > 0 && (
        <>
          {activeTab === 'Todos' && featured.length > 0 && (
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">Otros</p>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map(p => <ProjectCard key={p.name} p={p} />)}
          </div>
        </>
      )}

      {filtered.length === 0 && (
        <p className="text-zinc-500 text-sm py-8 text-center">No hay proyectos en esta categoría aún.</p>
      )}

      <div className="mt-10 p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
        <h3 className="font-bold text-white mb-1">¿Quieres contribuir?</h3>
        <p className="text-sm text-zinc-400 mb-3">
          Los proyectos de ETC-Minecraft son open-source bajo licencia MIT. Pull requests, issues y sugerencias son bienvenidos.
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
