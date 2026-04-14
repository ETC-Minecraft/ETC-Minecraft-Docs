import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock.jsx'

const configYml = `# plugins/ETCRegionGenerator/config.yml

generation:
  # Máximo de chunks generándose en paralelo.
  # low-end  (2-4 núcleos):   16 – 32
  # mid-range (6-8 núcleos):  32 – 64  ← por defecto
  # high-end (12+ núcleos):  64 – 128
  max-concurrent-chunks: 64

  # Delay opcional (ms) entre cada envío de chunk. 0 = desactivado.
  tick-delay-ms: 0

  # Omitir chunks que ya existen en el archivo de región.
  skip-existing: true

  # Guardar progreso para retomar al reiniciar.
  auto-save-progress: true

  # Cada cuántos segundos guardar el progreso a disco.
  auto-save-interval: 30

messages:
  prefix: "<dark_gray>[<gradient:#00e0ff:#00ff99>ETCRGen</gradient>]</dark_gray> "
  # Segundos entre broadcasts de progreso automáticos (0 = desactivado).
  progress-broadcast-interval: 60`

const commands = [
  { cmd: '/etcgen start <mundo> <centroX> <centroZ> <radioBlocks>', desc: 'Inicia la pre-generación circular alrededor de las coordenadas indicadas.' },
  { cmd: '/etcgen pause <mundo>', desc: 'Pausa la tarea activa en ese mundo.' },
  { cmd: '/etcgen resume <mundo>', desc: 'Reanuda una tarea pausada.' },
  { cmd: '/etcgen status [mundo]', desc: 'Muestra el progreso actual de uno o todos los mundos.' },
  { cmd: '/etcgen cancel <mundo>', desc: 'Cancela y elimina la tarea (alias: stop).' },
  { cmd: '/etcgen reload', desc: 'Recarga config.yml sin reiniciar.' },
]

const permissions = [
  { perm: 'etcgen.use', desc: 'Acceso a todos los comandos de ETCRegionGenerator.', def: 'op' },
  { perm: 'etcgen.admin', desc: 'Overrides de admin — cancelar tareas de otros, recargar config.', def: 'op' },
]

export default function ETCRegionGeneratorDocs() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-brand-400 text-sm font-mono mb-3">
          ETC-Minecraft / ETCRegionGenerator
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">
          🗺️ ETCRegionGenerator
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mb-5">
          Pre-generador de regiones nativo para <strong className="text-zinc-200">Folia</strong>.
          Genera y escribe archivos <code className="text-brand-400">.mca</code> directamente en disco de forma
          concurrente — sin picos de lag, sin esperas para los jugadores.
        </p>
        <div className="flex flex-wrap gap-3 mb-5">
          <a
            href="https://github.com/ETC-Minecraft/ETCRegionGenerator/releases/latest"
            target="_blank" rel="noreferrer"
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors"
          >
            Descargar JAR
          </a>
          <a
            href="https://github.com/ETC-Minecraft/ETCRegionGenerator"
            target="_blank" rel="noreferrer"
            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-semibold transition-colors"
          >
            GitHub →
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Folia 1.21+', 'Java 21+', 'MIT License'].map(b => (
            <span key={b} className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
              {b}
            </span>
          ))}
          <span className="text-xs px-2 py-1 rounded bg-red-900/30 text-red-400 border border-red-800">
            Solo Folia · Paper/Spigot no soportados
          </span>
        </div>
      </div>

      {/* Features */}
      <h2 className="text-xl font-bold text-white mb-4">Características</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[
          { icon: '⚡', title: 'Folia-nativo', desc: 'Toda la generación corre en el thread de región correcto. API de Folia usada al 100%.' },
          { icon: '🔀', title: 'Concurrente', desc: 'Límite de chunks en vuelo configurable para saturar tu CPU sin sobrecargar el servidor.' },
          { icon: '⏸️', title: 'Pausa / Reanudar', desc: 'Para y continúa la generación en cualquier momento sin perder el progreso.' },
          { icon: '💾', title: 'Persistencia', desc: 'El estado de las tareas se guarda en `tasks.yml`. La generación sobrevive reinicios.' },
          { icon: '⏩', title: 'Skip existentes', desc: 'Omite chunks ya generados por defecto (configurable).' },
          { icon: '📊', title: 'Estado en vivo', desc: 'Barra de progreso y broadcasts periódicos a consola y OPs online.' },
        ].map(f => (
          <div key={f.title} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-brand-400/50 transition-colors">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-white mb-1">{f.title}</h3>
            <p className="text-sm text-zinc-400">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Requirements */}
      <h2 className="text-xl font-bold text-white mb-3">Requisitos</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-2 pr-6 text-zinc-400 font-semibold">Requisito</th>
              <th className="text-left py-2 text-zinc-400 font-semibold">Versión</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="py-2 pr-6 text-zinc-300">Java</td><td className="py-2 text-brand-400">21+</td></tr>
            <tr><td className="py-2 pr-6 text-zinc-300">Software de servidor</td><td className="py-2 text-brand-400">Folia 1.21.x</td></tr>
            <tr><td className="py-2 pr-6 text-zinc-300">Minecraft</td><td className="py-2 text-brand-400">1.21.x</td></tr>
          </tbody>
        </table>
      </div>

      {/* Installation */}
      <h2 className="text-xl font-bold text-white mb-3">Instalación</h2>
      <ol className="list-decimal list-inside text-zinc-400 space-y-2 text-sm mb-10">
        <li>
          Descarga el último <code className="text-brand-400">ETCRegionGenerator-x.x.x.jar</code> desde{' '}
          <a href="https://github.com/ETC-Minecraft/ETCRegionGenerator/releases" target="_blank" rel="noreferrer" className="text-brand-400 hover:underline">
            GitHub Releases
          </a>
        </li>
        <li>Coloca el JAR en la carpeta <code className="text-brand-400">plugins/</code> de tu servidor Folia</li>
        <li>Inicia (o reinicia) el servidor</li>
        <li>Edita <code className="text-brand-400">plugins/ETCRegionGenerator/config.yml</code> según tus necesidades</li>
      </ol>

      {/* Commands */}
      <h2 className="text-xl font-bold text-white mb-3">Comandos</h2>
      <p className="text-sm text-zinc-500 mb-3">
        Aliases: <code className="text-brand-400">/regiongen</code>, <code className="text-brand-400">/rgen</code>
      </p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-2 pr-6 text-zinc-400 font-semibold">Comando</th>
              <th className="text-left py-2 text-zinc-400 font-semibold">Descripción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {commands.map(c => (
              <tr key={c.cmd}>
                <td className="py-2 pr-6 align-top font-mono text-brand-400 whitespace-nowrap">{c.cmd}</td>
                <td className="py-2 text-zinc-400">{c.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-10 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-2">Ejemplo</p>
        <code className="text-sm text-brand-400">/etcgen start world 0 0 5000</code>
        <p className="text-xs text-zinc-500 mt-1">
          Genera todos los chunks dentro de un radio de 5.000 bloques alrededor de 0, 0 en el mundo <code className="text-brand-400">world</code>.
        </p>
      </div>

      {/* Permissions */}
      <h2 className="text-xl font-bold text-white mb-3">Permisos</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-2 pr-6 text-zinc-400 font-semibold">Permiso</th>
              <th className="text-left py-2 pr-6 text-zinc-400 font-semibold">Descripción</th>
              <th className="text-left py-2 text-zinc-400 font-semibold">Default</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {permissions.map(p => (
              <tr key={p.perm}>
                <td className="py-2 pr-6 font-mono text-brand-400 text-xs whitespace-nowrap">{p.perm}</td>
                <td className="py-2 pr-6 text-zinc-400">{p.desc}</td>
                <td className="py-2 text-zinc-500">{p.def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Config */}
      <h2 className="text-xl font-bold text-white mb-3">Configuración</h2>
      <p className="text-zinc-400 text-sm mb-3">
        Archivo: <code className="text-brand-400">plugins/ETCRegionGenerator/config.yml</code>
      </p>
      <CodeBlock lang="yaml" code={configYml} />

      {/* Build from source */}
      <h2 className="text-xl font-bold text-white mt-10 mb-3">Compilar desde fuente</h2>
      <CodeBlock lang="bash" code={`git clone https://github.com/ETC-Minecraft/ETCRegionGenerator.git\ncd ETCRegionGenerator\nmvn package`} />
      <p className="text-sm text-zinc-500 mt-2 mb-8">
        El JAR compilado estará en <code className="text-brand-400">target/ETCRegionGenerator-&lt;version&gt;.jar</code>.
        Requiere JDK 21 y Maven 3.8+.
      </p>

      {/* Nav footer */}
      <div className="border-t border-zinc-800 pt-6 flex items-center justify-between">
        <Link to="/projects" className="text-sm text-zinc-400 hover:text-white transition-colors">
          ← Todos los proyectos
        </Link>
        <a
          href="https://github.com/ETC-Minecraft/ETCRegionGenerator/issues/new"
          target="_blank" rel="noreferrer"
          className="text-sm text-brand-400 hover:underline"
        >
          Reportar un issue
        </a>
      </div>
    </div>
  )
}
