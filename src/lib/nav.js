/**
 * Central navigation registry.
 * Used by: SearchModal, PrevNext, Sidebar.
 * Each entry: { path, title, section, keywords }
 */
export const NAV_PAGES = [
  // General
  { path: '/',         title: 'Inicio',    section: 'General',           keywords: 'home inicio proyectos etc-minecraft' },
  { path: '/projects', title: 'Proyectos', section: 'General',           keywords: 'proyectos plugins herramientas etc-minecraft' },

  // ETCCore
  { path: '/etccore',                   title: 'ETCCore — Inicio',            section: 'ETCCore',        keywords: 'etccore plugin paper folia comandos yaml menus gui' },
  { path: '/etccore/getting-started',   title: 'Instalación',                 section: 'ETCCore',        keywords: 'instalacion install jar descarga requisitos paper folia' },
  { path: '/etccore/config',            title: 'config.yml',                  section: 'ETCCore',        keywords: 'config configuracion yml opciones auto-reload luckperms' },
  { path: '/etccore/changelog',         title: 'Changelog',                   section: 'ETCCore',        keywords: 'changelog cambios versiones historial' },
  { path: '/etccore/actions',           title: 'Acciones',                    section: 'ETCCore · Comandos YAML', keywords: 'acciones actions message broadcast console player title sound delay chance if condiciones' },
  { path: '/etccore/variables',         title: 'Variables & Placeholders',    section: 'ETCCore · Comandos YAML', keywords: 'variables placeholders var set add del input playerdata persistentes' },
  { path: '/etccore/economy',           title: 'Economía (Vault)',            section: 'ETCCore · Comandos YAML', keywords: 'economia vault dinero money give take balance' },
  { path: '/etccore/scheduled',         title: 'Tareas programadas',          section: 'ETCCore · Comandos YAML', keywords: 'scheduled tareas programadas automaticas intervalos cron' },
  { path: '/etccore/menus',             title: 'Menús GUI',                   section: 'ETCCore · Interfaces',    keywords: 'menus gui inventario items slots bedrock geyser' },

  // ETCRegionGenerator
  { path: '/etcregion-generator',       title: 'ETCRegionGenerator',          section: 'ETCRegionGenerator',     keywords: 'region generator folia chunks mca pre-generate concurrent pause resume' },

  // Tools
  { path: '/playground',                title: '🧪 YAML Playground',         section: 'Herramientas',            keywords: 'playground yaml validador test probar comandos acciones' },
  { path: '/tools/menu-builder',        title: '🖥️ Menu Builder',            section: 'Herramientas',            keywords: 'menu builder visual gui inventario slots items yaml menus' },
  { path: '/tools/action-builder',      title: '⚡ Action Builder',           section: 'Herramientas',            keywords: 'action builder acciones visual list yaml message console sound vault' },
  { path: '/tools/command-builder',     title: '📝 Command Builder',          section: 'Herramientas',            keywords: 'command builder comando completo yaml cooldown args placeholderapi vault luckperms' },
]

/** Flat ordered list for prev/next (excludes general pages and tools) */
export const DOC_SEQUENCE = NAV_PAGES.filter(p =>
  p.path !== '/' && p.path !== '/projects' && !p.path.startsWith('/tools') && p.path !== '/playground'
)
