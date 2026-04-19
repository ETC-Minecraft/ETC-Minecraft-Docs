import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function NavItem({ to, label, end = false, indent = false }) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `block text-sm py-1 transition-colors border-l border-transparent ` +
          (indent ? 'pl-5 ' : 'pl-2 ') +
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

function SubHeader({ children }) {
  return (
    <li className="pt-3 pb-0.5">
      <p className="text-xs font-medium text-zinc-600 uppercase tracking-widest pl-5">{children}</p>
    </li>
  )
}

function CollapsibleSection({ badge, title, prefix, children }) {
  const { pathname } = useLocation()
  const isActive = pathname === prefix || pathname.startsWith(prefix + '/')
  const [open, setOpen] = useState(isActive)

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between gap-1.5 mb-1 pr-3 py-1 rounded-md transition-colors group ${
          isActive ? 'text-brand-400' : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <div className="flex items-center gap-1.5">
          {badge && <span className="text-sm leading-none">{badge}</span>}
          <span className="text-xs font-semibold uppercase tracking-widest">{title}</span>
        </div>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {open && (
        <ul className="space-y-0.5 mb-1">
          {children}
        </ul>
      )}
    </div>
  )
}

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="hidden md:block w-60 shrink-0 border-r border-zinc-800 pl-6 pt-8 pb-16 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <SidebarContent onNavigate={onNavigate} />
    </aside>
  )
}

export function SidebarContent({ onNavigate }) {
  const nav = onNavigate ?? (() => {})
  return (
    <div className="pr-2">
      {/* General */}
      <div className="mb-5">
        <ul className="space-y-0.5" onClick={nav}>
          <NavItem to="/" label="Inicio" end />
          <NavItem to="/projects" label="Proyectos" end />
        </ul>
      </div>

      <div className="border-t border-zinc-800/60 mb-4" />

      {/* ETCCore */}
      <CollapsibleSection badge="⬡" title="ETCCore" prefix="/etccore">
        <div onClick={nav}>
          <NavItem to="/etccore" label="Inicio" end />
          <NavItem to="/etccore/getting-started" label="Instalación" />
          <NavItem to="/etccore/config" label="config.yml" />
          <NavItem to="/etccore/changelog" label="Changelog" />

          <SubHeader>Comandos YAML</SubHeader>
          <NavItem to="/etccore/actions" label="Acciones" indent />
          <NavItem to="/etccore/variables" label="Variables & Placeholders" indent />
          <NavItem to="/etccore/economy" label="Economía (Vault)" indent />
          <NavItem to="/etccore/scheduled" label="Tareas programadas" indent />

          <SubHeader>Interfaces</SubHeader>
          <NavItem to="/etccore/menus" label="Menús GUI" indent />
        </div>
      </CollapsibleSection>

      <div className="border-t border-zinc-800/60 my-4" />

      {/* ETCRegionGenerator */}
      <CollapsibleSection badge="🗺️" title="ETCRegionGenerator" prefix="/etcregion-generator">
        <div onClick={nav}>
          <NavItem to="/etcregion-generator" label="Documentación" end />
        </div>
      </CollapsibleSection>

      <div className="border-t border-zinc-800/60 my-4" />

      {/* ETCWorlds */}
      <CollapsibleSection badge="🌍" title="ETCWorlds" prefix="/etcworlds">
        <div onClick={nav}>
          <NavItem to="/etcworlds" label="Documentación" end />
          <SubHeader>Secciones</SubHeader>
          <NavItem to="/etcworlds#templates"   label="Templates"           indent />
          <NavItem to="/etcworlds#comandos"    label="Comandos"            indent />
          <NavItem to="/etcworlds#permisos"    label="Permisos"            indent />
          <NavItem to="/etcworlds#config"      label="config.yml"          indent />
          <NavItem to="/etcworlds#reglas"      label="Reglas por mundo"    indent />
          <NavItem to="/etcworlds#groups"      label="World Groups"        indent />
          <NavItem to="/etcworlds#pocketworlds" label="PocketWorlds"       indent />
          <NavItem to="/etcworlds#registry"    label="Registry"            indent />
        </div>
      </CollapsibleSection>

      <div className="border-t border-zinc-800/60 my-4" />

      {/* Coming soon */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">Próximamente</p>
        <ul className="space-y-0.5">
          <li className="flex items-center gap-2 text-sm py-1 pl-2 text-zinc-700">
            <span>🎨</span><span>ETC-ResourcePack</span>
          </li>
          <li className="flex items-center gap-2 text-sm py-1 pl-2 text-zinc-700">
            <span>📦</span><span>ETC-DataPack</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-zinc-800/60 mb-4" />

      {/* Tools */}
      <CollapsibleSection badge="🛠️" title="Herramientas" prefix="/tools">
        <div onClick={nav}>
          <NavItem to="/playground" label="🧪 YAML Playground" />
          <NavItem to="/tools/menu-builder" label="🖥️ Menu Builder" />
          <NavItem to="/tools/action-builder" label="⚡ Action Builder" />
          <NavItem to="/tools/command-builder" label="📝 Command Builder" />
        </div>
      </CollapsibleSection>
    </div>
  )
}
