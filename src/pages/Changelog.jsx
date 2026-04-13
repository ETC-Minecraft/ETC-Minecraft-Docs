const releases = [
  {
    version: 'Unreleased',
    date: null,
    sections: {
      'Por agregar': [
        'Soporte SQLite/MySQL para datos de jugadores persistentes',
        'Paginación en menús con más de 54 ítems',
        'Tests unitarios con JUnit 5',
        'Workflow de GitHub Actions para desplegar esta documentación en GitHub Pages',
      ],
    },
  },
  {
    version: '1.0.0',
    date: '2026-04-13',
    sections: {
      Añadido: [
        'Sistema de comandos YAML personalizados con acciones, condiciones, variables, cooldowns y delays',
        'Sistema de menús GUI con soporte para Geyser/Floodgate (SimpleForm para Bedrock)',
        'ChatInputManager: sistema de preguntas y captura de input del jugador',
        'MuteManager: silenciar/des-silenciar jugadores persistentemente',
        'BuildProtectionListener e ItemProtectionListener',
        'CommandBlockManager: bloquear comandos específicos',
        'InvSeeCommand y EnderChestCommand',
        'VaultManager: acciones [MONEY_GIVE], [MONEY_TAKE] y condición money',
        'CommandLogger: registro opcional de ejecuciones a logs/commands.log',
        'ScheduledTaskManager: tareas periódicas definidas en YAML',
        'UpdateChecker: notificación a OPs sobre nuevas versiones vía GitHub Releases API',
        'bStats: telemetría anónima de uso del plugin',
        'Licencia MIT',
        'CHANGELOG.md en formato Keep a Changelog',
        'Plantillas de issues para GitHub (.github/ISSUE_TEMPLATE/)',
        'GitHub Actions: build en PR/main + release automático en tags v*.*.*',
        'Documentación completa en React + Vite + TailwindCSS',
      ],
    },
  },
]

export default function Changelog() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Changelog</h1>
      <p className="text-zinc-400 mb-2">
        Historial de cambios de ETCCore. Sigue el formato{' '}
        <a
          href="https://keepachangelog.com/es-ES/1.0.0/"
          target="_blank"
          rel="noreferrer"
          className="text-brand-400 hover:underline"
        >
          Keep a Changelog
        </a>{' '}
        y{' '}
        <a
          href="https://semver.org/lang/es/"
          target="_blank"
          rel="noreferrer"
          className="text-brand-400 hover:underline"
        >
          Semantic Versioning
        </a>
        .
      </p>
      <p className="text-zinc-500 text-sm mb-10">
        El CHANGELOG completo está en{' '}
        <code className="text-zinc-400">CHANGELOG.md</code> en la raíz del repositorio.
      </p>

      <div className="space-y-10">
        {releases.map((release) => (
          <div key={release.version}>
            <div className="flex items-baseline gap-3 mb-4">
              <h2 className="text-xl font-bold text-white">
                {release.version === 'Unreleased' ? (
                  <span className="text-zinc-400">[Sin publicar]</span>
                ) : (
                  <span>[{release.version}]</span>
                )}
              </h2>
              {release.date && (
                <span className="text-sm text-zinc-500">— {release.date}</span>
              )}
            </div>

            {Object.entries(release.sections).map(([sectionTitle, items]) => (
              <div key={sectionTitle} className="mb-4">
                <h3 className="text-sm font-semibold text-brand-400 uppercase tracking-wider mb-2">
                  {sectionTitle}
                </h3>
                <ul className="space-y-1">
                  {items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-zinc-400">
                      <span className="text-zinc-600 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="border-b border-zinc-800 mt-6" />
          </div>
        ))}
      </div>
    </div>
  )
}
