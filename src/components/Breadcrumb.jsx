import { Link, useLocation } from 'react-router-dom'
import { NAV_PAGES } from '../lib/nav.js'

const SEGMENTS = {
  'etccore':            { label: 'ETCCore',             to: '/etccore' },
  'getting-started':    { label: 'Instalación',         to: null },
  'config':             { label: 'config.yml',          to: null },
  'changelog':          { label: 'Changelog',           to: null },
  'actions':            { label: 'Acciones',            to: null },
  'variables':          { label: 'Variables',           to: null },
  'economy':            { label: 'Economía',            to: null },
  'scheduled':          { label: 'Tareas programadas',  to: null },
  'menus':              { label: 'Menús GUI',           to: null },
  'etcregion-generator':{ label: 'ETCRegionGenerator',  to: null },
  'projects':           { label: 'Proyectos',           to: null },
  'playground':         { label: 'YAML Playground',     to: null },
  'tools':              { label: 'Herramientas',        to: '/tools' },
  'menu-builder':       { label: 'Menu Builder',        to: null },
  'action-builder':     { label: 'Action Builder',      to: null },
  'command-builder':    { label: 'Command Builder',     to: null },
}

export default function Breadcrumb() {
  const { pathname } = useLocation()

  // Don't show on home
  if (pathname === '/') return null

  const parts = pathname.replace(/^\//, '').split('/').filter(Boolean)

  const crumbs = [{ label: 'Inicio', to: '/' }]

  let builtPath = ''
  parts.forEach((seg, i) => {
    builtPath += '/' + seg
    const meta = SEGMENTS[seg]
    const isLast = i === parts.length - 1
    crumbs.push({
      label: meta?.label ?? seg,
      to: isLast ? null : (meta?.to ?? builtPath),
    })
  })

  return (
    <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6 flex-wrap" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg className="w-3 h-3 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          )}
          {crumb.to ? (
            <Link to={crumb.to} className="hover:text-zinc-300 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-zinc-400">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
