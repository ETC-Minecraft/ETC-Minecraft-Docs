import CodeBlock from '../components/CodeBlock.jsx'

const menuYml = `
title: "&8⬛ &6&lMI MENÚ &8⬛"
rows: 3             # 1–6 filas (9 slots por fila)
permission: ""      # permiso necesario para abrirlo (vacío = libre)

items:
  # Slot 0–8 = borde superior
  0: { material: BLACK_STAINED_GLASS_PANE, name: " " }
  # ...

  # Botón en el centro (slot 13 en 3 filas)
  13:
    material: EMERALD
    name: "&a&lTienda"
    lore:
      - "&7Gasta tus puntos aquí."
      - "&7Puntos: &e{var:puntos}"
    glow: true
    close-on-click: false
    actions:
      - "[MENU] tienda"

  # Cerrar
  26:
    material: BARRIER
    name: "&cCerrar"
    close-on-click: true
    actions:
      - "[CLOSE]"
`

const itemFields = [
  ['material',        'Nombre del material (EMERALD, COMPASS, PLAYER_HEAD…)'],
  ['name',            'Nombre del ítem. Soporta &colores.'],
  ['lore',            'Lista de líneas de descripción.'],
  ['glow',            'true/false — efecto de encantamiento brillante.'],
  ['close-on-click',  'Cierra el inventario al hacer clic.'],
  ['custom-model-data', 'Número de modelo personalizado (resource pack).'],
  ['permission',      'Permiso para abrir el menú completo (en raíz).'],
  ['actions',         'Lista de acciones al hacer clic (igual que en comandos).'],
]

export default function Menus() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Menús GUI</h1>
      <p className="text-zinc-400 mb-8">
        Los menús se definen en archivos <code className="text-brand-400">.yml</code> dentro de{' '}
        <code className="text-brand-400">plugins/ETCCore/menus/</code>.
        Se abren con la acción <code className="text-brand-400">[MENU] nombre</code>.
      </p>

      <h2 className="text-xl font-bold text-white mt-8 mb-3">Estructura del archivo</h2>
      <CodeBlock code={menuYml} title="menus/ejemplo.yml" />

      <h2 className="text-xl font-bold text-white mt-10 mb-4">Propiedades de ítem</h2>
      <div className="space-y-2">
        {itemFields.map(([field, desc]) => (
          <div key={field} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-zinc-800 pb-2">
            <code className="text-brand-400 font-mono text-sm shrink-0 w-44">{field}:</code>
            <span className="text-zinc-400 text-sm">{desc}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mt-10 mb-3">Slots de inventario</h2>
      <p className="text-zinc-400 mb-3">
        Los slots se numeran de izquierda a derecha, de arriba a abajo, empezando en 0.
        Para <strong className="text-zinc-200">rows: 4</strong> (36 slots):
      </p>
      <div className="grid grid-cols-9 gap-1 bg-zinc-900 border border-zinc-700 rounded p-3 text-xs text-zinc-400 font-mono max-w-xs">
        {Array.from({ length: 36 }, (_, i) => (
          <div key={i} className="text-center bg-zinc-800 rounded py-1">{i}</div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mt-10 mb-3">Soporte Geyser (Bedrock)</h2>
      <p className="text-zinc-400">
        Si tienes <strong className="text-zinc-200">Floodgate</strong> instalado, los jugadores de
        Bedrock Edition verán un formulario nativo (SimpleForm) en lugar del GUI de cofre.
        Los botones corresponden a los ítems con acciones, en orden por slot.
        No necesitas configurar nada extra — se detecta automáticamente.
      </p>
    </div>
  )
}
