import{j as e}from"./index-DArFSGYo.js";import{C as n}from"./CodeBlock-Dhaq0QrE.js";import"./react-vendor--lVoH5OK.js";import"./syntax-highlighter-BZGa3jO2.js";const t=`
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
`,s=`
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
`;function d(){return e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-white mb-2",children:"Economía (Vault)"}),e.jsx("p",{className:"text-zinc-400 mb-8",children:"ETCCore integra Vault para manejar dinero dentro de acciones YAML. Requiere Vault + un plugin de economía como EssentialsX o CMI."}),e.jsx("div",{className:"p-4 bg-yellow-950/40 border border-yellow-700/50 rounded-lg mb-8",children:e.jsxs("p",{className:"text-sm text-yellow-300",children:[e.jsx("strong",{children:"Nota Folia:"})," Vault no es nativo de Folia. Las llamadas a economía son seguras dentro del contexto de un jugador (que es exactamente como ETCCore las ejecuta), pero pueden causar advertencias de hilo en algunos plugins de economía. Prueba con tu plugin específico."]})}),e.jsx("h2",{className:"text-xl font-bold text-white mb-3",children:"Acciones disponibles"}),e.jsx("div",{className:"space-y-3 mb-8",children:[["[MONEY_GIVE:cantidad]","Da dinero al jugador.","text-green-400"],["[MONEY_TAKE:cantidad]","Quita dinero. No hace nada si no tiene suficiente — combina con [IF money>=X] para verificar antes.","text-red-400"],["[IF money>=cantidad]","Condición: el jugador tiene al menos esa cantidad.","text-blue-400"],["[IF money<=cantidad]","Condición: el jugador tiene como máximo esa cantidad.","text-blue-400"],["[IF money>cantidad]","Condición: estrictamente mayor que.","text-blue-400"],["[IF money<cantidad]","Condición: estrictamente menor que.","text-blue-400"]].map(([a,o,i])=>e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 border-b border-zinc-800 pb-3",children:[e.jsx("code",{className:`${i} font-mono text-sm shrink-0 w-56`,children:a}),e.jsx("span",{className:"text-zinc-400 text-sm",children:o})]},a))}),e.jsx("h2",{className:"text-xl font-bold text-white mb-2",children:"Placeholders de economía"}),e.jsxs("div",{className:"flex gap-6 mb-8 text-sm",children:[e.jsxs("div",{children:[e.jsx("code",{className:"text-yellow-400",children:"{balance}"})," ",e.jsx("span",{className:"text-zinc-400",children:"— saldo numérico sin formato"})]}),e.jsxs("div",{children:[e.jsx("code",{className:"text-yellow-400",children:"{balance_fmt}"})," ",e.jsx("span",{className:"text-zinc-400",children:"— saldo formateado por el plugin de economía"})]})]}),e.jsx("h2",{className:"text-xl font-bold text-white mb-3",children:"Ejemplo: comprar un rango"}),e.jsx(n,{code:t,title:"commands/comprar-vip.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-8 mb-3",children:"Ejemplo: tienda en menú"}),e.jsx(n,{code:s,title:"menus/tienda.yml (fragmento)"})]})}export{d as default};
