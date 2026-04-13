import { NavLink } from 'react-router-dom'

const sections = [
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
  {
    title: 'ETC-Minecraft',
    links: [
      { to: '/projects', label: 'Proyectos' },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-56 shrink-0 border-r border-zinc-800 pl-6 pt-8 pb-16 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      {sections.map(sec => (
        <div key={sec.title} className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
            {sec.title}
          </p>
          <ul className="space-y-1">
            {sec.links.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block text-sm py-1 transition-colors pl-2 border-l border-transparent ` +
                    (isActive
                      ? 'text-brand-400 border-brand-400 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:border-zinc-600')
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}
