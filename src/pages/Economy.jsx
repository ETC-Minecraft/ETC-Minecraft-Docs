import CodeBlock from '../components/CodeBlock.jsx'

const economyYml = `
description: "Comprar el rango VIP por $500"
actions:
  # 1. Verificar si ya tiene el rango
  - "[IF permission:vip] [MESSAGE] &eYa tienes el rango VIP."

  # 2. Verificar si tiene dinero suficiente
  - "[IF !permission:vip] [IF money<500] [MESSAGE] &cNecesitas $500. Tu balance: &e{balance_fmt}"

  # 3. Cobrar y dar el rango
  - "[IF !permission:vip] [IF money>=500] [MONEY_TAKE:500]"
  - "[IF !permission:vip] [IF money>=500] [CONSOLE] lp user {player} parent add vip"
  - "[IF !permission:vip] [IF money>=500] [MESSAGE] &a¡Rango VIP activado! Se descontaron $500."
  - "[IF !permission:vip] [IF money>=500] [SOUND] ENTITY_PLAYER_LEVELUP"
`

const shopMenuYml = `
# menus/tienda.yml — Slot con botón de compra
items:
  13:
    material: GOLD_INGOT
    name: "&6&lRango VIP"
    lore:
      - "&7Precio: &e$500"
      - "&7Tu saldo: &e{balance_fmt}"
      - ""
      - "&aClick para comprar"
    glow: true
    close-on-click: true
    actions:
      - "[IF money<500] [MESSAGE] &cNo tienes suficiente dinero."
      - "[IF money>=500] [MONEY_TAKE:500]"
      - "[IF money>=500] [CONSOLE] lp user {player} parent add vip"
      - "[IF money>=500] [MESSAGE] &a¡Compra exitosa!"
`

export default function Economy() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Economía (Vault)</h1>
      <p className="text-zinc-400 mb-8">
        ETCCore integra Vault para manejar dinero dentro de acciones YAML.
        Requiere Vault + un plugin de economía como EssentialsX o CMI.
      </p>

      <div className="p-4 bg-yellow-950/40 border border-yellow-700/50 rounded-lg mb-8">
        <p className="text-sm text-yellow-300">
          <strong>Nota Folia:</strong> Vault no es nativo de Folia. Las llamadas a economía son seguras
          dentro del contexto de un jugador (que es exactamente como ETCCore las ejecuta), pero pueden
          causar advertencias de hilo en algunos plugins de economía. Prueba con tu plugin específico.
        </p>
      </div>

      <h2 className="text-xl font-bold text-white mb-3">Acciones disponibles</h2>
      <div className="space-y-3 mb-8">
        {[
          ['[MONEY_GIVE:cantidad]', 'Da dinero al jugador.', 'text-green-400'],
          ['[MONEY_TAKE:cantidad]', 'Quita dinero. No hace nada si no tiene suficiente — combina con [IF money>=X] para verificar antes.', 'text-red-400'],
          ['[IF money>=cantidad]',  'Condición: el jugador tiene al menos esa cantidad.', 'text-blue-400'],
          ['[IF money<=cantidad]',  'Condición: el jugador tiene como máximo esa cantidad.', 'text-blue-400'],
          ['[IF money>cantidad]',   'Condición: estrictamente mayor que.', 'text-blue-400'],
          ['[IF money<cantidad]',   'Condición: estrictamente menor que.', 'text-blue-400'],
        ].map(([action, desc, color]) => (
          <div key={action} className="flex flex-col sm:flex-row gap-2 border-b border-zinc-800 pb-3">
            <code className={`${color} font-mono text-sm shrink-0 w-56`}>{action}</code>
            <span className="text-zinc-400 text-sm">{desc}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-2">Placeholders de economía</h2>
      <div className="flex gap-6 mb-8 text-sm">
        <div><code className="text-yellow-400">{'{balance}'}</code> <span className="text-zinc-400">— saldo numérico sin formato</span></div>
        <div><code className="text-yellow-400">{'{balance_fmt}'}</code> <span className="text-zinc-400">— saldo formateado por el plugin de economía</span></div>
      </div>

      <h2 className="text-xl font-bold text-white mb-3">Ejemplo: comprar un rango</h2>
      <CodeBlock code={economyYml} title="commands/comprar-vip.yml" />

      <h2 className="text-xl font-bold text-white mt-8 mb-3">Ejemplo: tienda en menú</h2>
      <CodeBlock code={shopMenuYml} title="menus/tienda.yml (fragmento)" />
    </div>
  )
}
