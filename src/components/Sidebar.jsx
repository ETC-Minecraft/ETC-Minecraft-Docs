import { NavLink } from 'react-router-dom'

const docSections = [
  {
    title: 'ETCCore',
    links: [
      { to: '/',                label: 'Inicio' },
      { to: '/getting-started', label: 'Instalación' },
      { to: '/config',          label: 'config.yml' },
      { to: '/changelog',       label: 'Changelog' },
    ],
  },
  {
    title: 'Comandos YAML',
    links: [
      { to: '/actions',   label: 'Acciones' },
      { to: '/variables', label: 'Variables & Placeholders' },
      { to: '/economy',   label: 'Economía (Vault)' },
      { to: '/scheduled', label: 'Tareas programadas' },
    ],
  },
  {
    title: 'Interfaces',
    links: [
      { to: '/menus', label: 'Menús GUI' },
    ],
  },
]

const projects = [
  {
    name: 'ETCCore',
    badge: '⬡',
    status: 'active',
    repo: 'https://github.com/ETC-Minecraft/ETCCore',
    docs: '/',
  },
  {
    name: 'ETCRegionGenerator',
    badge: '🗺️',
    status: 'active',
    repo: 'https://github.com/ETC-Minecraft/ETCRegionGenerator',
    docs: null,
  },
  {
    name: 'ETC-ResourcePack',
    badge: '🎨',
    status: 'soon',
    repo: null,
    docs: null,
  },
  {
    name: 'ETC-DataPack',
    badge: '📦',
    status: 'soon',
    repo: null,
    docs: null,
  },
]

function NavItem({ to, label, end }) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `block text-sm py-1 transition-colors pl-2 border-l border-transparent ` +
          (isActive
            ? 'text-brand-400 border-brand-400 font-semibold'
            : 'text-zinc-400 hover:text-white hover:border-zinc-600')
        }
      >
        {label}
      </NavLink>
    </li>
  )
}

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-56 shrink-0 border-r border-zinc-800 pl-6 pt-8 pb-16 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">

      {/* Doc sections */}
      {docSections.map(sec => (
        <div key={sec.title} className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
            {sec.title}
          </p>
          <ul className="space-y-1">
            {sec.links.map(link => (
              <NavItem key={link.to} to={link.to} label={link.label} end={link.to === '/'} />
            ))}
          </ul>
        </div>
      ))}

      {/* Projects section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 pr-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Proyectos
          </p>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `text-xs transition-colors ${isActive ? 'text-brand-400' : 'text-zinc-600 hover:text-zinc-400'}`
            }
          >
            ver todos
          </NavLink>
        </div>
        <ul className="space-y-1">
          {projects.map(p => (
            <li key={p.name}>
              {p.docs ? (
                <NavLink
                  to={p.docs}
                  end={p.docs === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm py-1 pl-2 border-l transition-colors ` +
                    (isActive
                      ? 'text-brand-400 border-brand-400 font-semibold'
                      : 'text-zinc-400 hover:text-white border-transparent hover:border-zinc-600')
                  }
                >
                  <span className="text-base leading-none">{p.badge}</span>
                  <span className="truncate">{p.name}</span>
                  {p.status === 'active' && (
                    <span className="ml-auto mr-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  )}
                </NavLink>
              ) : (
                <div className="flex items-center gap-2 text-sm py-1 pl-2 border-l border-transparent text-zinc-600">
                  <span className="text-base leading-none">{p.badge}</span>
                  <span className="truncate">{p.name}</span>
                  {p.status === 'soon' && (
                    <span className="ml-auto mr-1 text-xs text-yellow-600 shrink-0">pronto</span>
                  )}
                  {p.status === 'active' && p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto mr-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 hover:bg-green-400"
                      title="Ver en GitHub"
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

    </aside>
  )
}
