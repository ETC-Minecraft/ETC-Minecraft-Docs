import { Link } from 'react-router-dom'

const features = [
  { icon: '⚡', title: 'Comandos YAML', desc: 'Crea comandos sin programar. Motor de acciones con IF, CHANCE, DELAY, VAR, INPUT y más.' },
  { icon: '🖥️', title: 'GUIs de menú', desc: 'Diseña interfaces de inventario desde archivos .yml. Soporte Geyser para jugadores Bedrock.' },
  { icon: '💎', title: 'Variables & Economía', desc: 'Variables persistentes por jugador. Integración con Vault para economía en comandos.' },
  { icon: '🛡️', title: 'Protecciones', desc: 'Protección de construcción e ítems por permisos LuckPerms. Bloqueo de comandos por grupo.' },
  { icon: '💬', title: 'Chat & Mute', desc: 'Formato de chat con prefijos LuckPerms y PlaceholderAPI. Sistema de mute temporal y permanente.' },
  { icon: '🕐', title: 'Tareas programadas', desc: 'Ejecuta acciones automáticas cada X segundos desde archivos YAML. Disabled by default.' },
  { icon: '🔄', title: 'Auto-reload', desc: 'Detecta cambios en archivos automáticamente. Sin reinicios del servidor.' },
  { icon: '📦', title: 'Folia-compatible', desc: 'Soporte nativo para Paper y Folia 1.21.1+. Scheduler correcto en todos los contextos.' },
]

export default function ETCCoreHome() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-brand-400 text-sm font-mono mb-3">
          ETC-Minecraft / ETCCore
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          El plugin base para<br />
          <span className="text-brand-400">tu servidor Minecraft</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mb-6">
          ETCCore te permite crear comandos personalizados, menús GUI, variables por jugador,
          protecciones, sistema de mute y mucho más — todo desde archivos YAML, sin programar.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/etccore/getting-started"
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors"
          >
            Empezar →
          </Link>
          <a
            href="https://github.com/ETC-Minecraft/ETCCore/releases/latest"
            target="_blank" rel="noreferrer"
            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-semibold transition-colors"
          >
            Descargar JAR
          </a>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-5">
          {['Paper 1.21.1+', 'Folia 1.21.1+', 'Java 21+', 'MIT License', 'Open Source'].map(b => (
            <span key={b} className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Features grid */}
      <h2 className="text-2xl font-bold text-white mb-5">¿Qué incluye ETCCore?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {features.map(f => (
          <div key={f.title} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-brand-400/50 transition-colors">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-white mb-1">{f.title}</h3>
            <p className="text-sm text-zinc-400">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick start */}
      <div className="p-5 rounded-xl border border-zinc-700 bg-zinc-900">
        <h3 className="font-bold text-white mb-2">Instalación rápida</h3>
        <ol className="list-decimal list-inside text-sm text-zinc-400 space-y-1">
          <li>Descarga el <code className="text-brand-400">.jar</code> y colócalo en <code className="text-brand-400">plugins/</code></li>
          <li>Inicia el servidor — se crea <code className="text-brand-400">plugins/ETCCore/</code> con ejemplos</li>
          <li>Edita o crea archivos <code className="text-brand-400">.yml</code> en <code className="text-brand-400">commands/</code> y <code className="text-brand-400">menus/</code></li>
          <li>Usa <code className="text-brand-400">/etccore reload</code> o deja que el auto-reload detecte los cambios</li>
        </ol>
        <Link to="/etccore/getting-started" className="inline-block mt-3 text-sm text-brand-400 hover:underline">
          Ver guía completa →
        </Link>
      </div>
    </div>
  )
}
