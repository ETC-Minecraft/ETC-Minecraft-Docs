import{j as e}from"./index-DNMFRe0z.js";import{C as o}from"./CodeBlock-l8WS-RyJ.js";import"./react-vendor--lVoH5OK.js";import"./syntax-highlighter-BZGa3jO2.js";const t=`
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
`,r=[["material","Nombre del material (EMERALD, COMPASS, PLAYER_HEAD…)"],["name","Nombre del ítem. Soporta &colores."],["lore","Lista de líneas de descripción."],["glow","true/false — efecto de encantamiento brillante."],["close-on-click","Cierra el inventario al hacer clic."],["custom-model-data","Número de modelo personalizado (resource pack)."],["permission","Permiso para abrir el menú completo (en raíz)."],["actions","Lista de acciones al hacer clic (igual que en comandos)."]];function d(){return e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-white mb-2",children:"Menús GUI"}),e.jsxs("p",{className:"text-zinc-400 mb-8",children:["Los menús se definen en archivos ",e.jsx("code",{className:"text-brand-400",children:".yml"})," dentro de"," ",e.jsx("code",{className:"text-brand-400",children:"plugins/ETCCore/menus/"}),". Se abren con la acción ",e.jsx("code",{className:"text-brand-400",children:"[MENU] nombre"}),"."]}),e.jsx("h2",{className:"text-xl font-bold text-white mt-8 mb-3",children:"Estructura del archivo"}),e.jsx(o,{code:t,title:"menus/ejemplo.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-4",children:"Propiedades de ítem"}),e.jsx("div",{className:"space-y-2",children:r.map(([a,s])=>e.jsxs("div",{className:"flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-zinc-800 pb-2",children:[e.jsxs("code",{className:"text-brand-400 font-mono text-sm shrink-0 w-44",children:[a,":"]}),e.jsx("span",{className:"text-zinc-400 text-sm",children:s})]},a))}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"Slots de inventario"}),e.jsxs("p",{className:"text-zinc-400 mb-3",children:["Los slots se numeran de izquierda a derecha, de arriba a abajo, empezando en 0. Para ",e.jsx("strong",{className:"text-zinc-200",children:"rows: 4"})," (36 slots):"]}),e.jsx("div",{className:"grid grid-cols-9 gap-1 bg-zinc-900 border border-zinc-700 rounded p-3 text-xs text-zinc-400 font-mono max-w-xs",children:Array.from({length:36},(a,s)=>e.jsx("div",{className:"text-center bg-zinc-800 rounded py-1",children:s},s))}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"Soporte Geyser (Bedrock)"}),e.jsxs("p",{className:"text-zinc-400",children:["Si tienes ",e.jsx("strong",{className:"text-zinc-200",children:"Floodgate"})," instalado, los jugadores de Bedrock Edition verán un formulario nativo (SimpleForm) en lugar del GUI de cofre. Los botones corresponden a los ítems con acciones, en orden por slot. No necesitas configurar nada extra — se detecta automáticamente."]})]})}export{d as default};
