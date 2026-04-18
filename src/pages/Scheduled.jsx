import CodeBlock from '../components/CodeBlock.jsx'

const exampleYml = `
# commands/scheduled/avisos.yml
# Envía un mensaje automático cada 30 minutos

enabled: false          # Cambia a true para activar

interval: 1800          # Segundos entre ejecuciones (1800 = 30 min)

actions:
  - "[BROADCAST] &8[&6Servidor&8] &e¡No olvides leer las reglas: &b/reglas"
  - "[BROADCAST] &8[&6Servidor&8] &e¿Necesitas ayuda? Escribe &b/ticket"
`

const resetYml = `
# commands/scheduled/reset-diario.yml
# Guarda el mundo y anuncia fin del día cada 24h

enabled: false
interval: 86400

actions:
  - "[BROADCAST] &c⚠ &eSe guardará el servidor en 10 segundos..."
  - "[CONSOLE] save-all"
  - "[BROADCAST] &aGuardado completado."
`

export default function Scheduled() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Tareas programadas</h1>
      <p className="text-zinc-400 mb-8">
        Las tareas programadas se definen en{' '}
        <code className="text-brand-400">plugins/ETCCore/commands/scheduled/*.yml</code>.
        Se ejecutan automáticamente cada X segundos mientras el servidor esté corriendo.
      </p>

      <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg mb-8">
        <h3 className="font-semibold text-white mb-2">⚠ Desactivadas por defecto</h3>
        <p className="text-sm text-zinc-400">
          Todas las tareas vienen con <code className="text-brand-400">enabled: false</code>.
          Actívalas solo cuando las necesites para no impactar el rendimiento.
        </p>
      </div>

      <h2 className="text-xl font-bold text-white mb-3">Estructura YAML</h2>
      <div className="space-y-2 mb-6">
        {[
          ['enabled',  'true/false — activa o desactiva la tarea sin borrar el archivo.'],
          ['interval', 'Segundos entre ejecuciones. Mínimo: 1 (= 20 ticks). Ejemplo: 3600 = 1h.'],
          ['actions',  'Lista de acciones a ejecutar. Solo se soportan [BROADCAST] y [CONSOLE].'],
        ].map(([field, desc]) => (
          <div key={field} className="flex gap-4 border-b border-zinc-800 pb-2 text-sm">
            <code className="text-brand-400 w-24 shrink-0">{field}:</code>
            <span className="text-zinc-400">{desc}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-3">Acciones soportadas</h2>
      <p className="text-zinc-400 mb-3 text-sm">
        Las tareas globales no tienen jugador asociado, por eso solo soportan estas dos acciones:
      </p>
      <div className="space-y-2 mb-8">
        <div className="flex gap-4 border-b border-zinc-800 pb-2 text-sm">
          <code className="text-brand-400 w-40 shrink-0">[BROADCAST] texto</code>
          <span className="text-zinc-400">Envía mensaje a todos los jugadores online.</span>
        </div>
        <div className="flex gap-4 border-b border-zinc-800 pb-2 text-sm">
          <code className="text-brand-400 w-40 shrink-0">[CONSOLE] comando</code>
          <span className="text-zinc-400">Ejecuta un comando como consola.</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-3">Ejemplo: avisos automáticos</h2>
      <CodeBlock code={exampleYml} title="commands/scheduled/avisos.yml" />

      <h2 className="text-xl font-bold text-white mt-8 mb-3">Ejemplo: guardado diario</h2>
      <CodeBlock code={resetYml} title="commands/scheduled/reset-diario.yml" />

      <h2 className="text-xl font-bold text-white mt-8 mb-3">Recarga</h2>
      <p className="text-zinc-400">
        Las tareas se recargan con <code className="text-brand-400">/etccore reload</code>.
        Las tareas activas se cancelan y se reinician con la nueva configuración.
      </p>
    </div>
  )
}
