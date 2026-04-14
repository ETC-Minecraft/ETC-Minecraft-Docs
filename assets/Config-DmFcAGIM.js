import{j as e}from"./index-B_-vPkSX.js";import{C as t}from"./CodeBlock-EEFLniX_.js";import"./react-vendor-DD0BoVN6.js";import"./syntax-highlighter-CKvlAzMS.js";const r=`
# config.yml

verbose-outputs: true
# Muestra mensajes de debug en consola al cargar comandos/menús.

auto-reload: false
# Recarga automáticamente los YAML al detectar cambios en disco.
# Usa con cuidado en producción.

update-checker: true
# Comprueba nuevas versiones en GitHub Releases al iniciar.
# Solo notifica a operadores al conectarse.

log-commands: false
# Guarda en plugins/ETCCore/logs/commands.log cada ejecución
# de un comando personalizado (jugador, mundo, args, timestamp).

build-protection: false
# Evita que jugadores sin permiso construyan o rompan bloques.

build-protection-message: "&cNo tienes permiso para construir aquí."
# Mensaje al intentar construir sin permiso.

item-protection: false
# Evita que jugadores sin permiso usen ítems (clic derecho).

item-protection-message: "&cNo puedes usar este ítem."
# Mensaje al intentar usar un ítem protegido.
`,n=`
# chat-format.yml
format: "&7[&f{world}&7] &e{player}&7: &f{message}"
`,i=`
# blocked-commands.yml
blocked:
  - gamemode
  - op
  - deop
`,l=[{title:"config.yml — opciones principales",rows:[["verbose-outputs","boolean","true","Mensajes de debug en consola al cargar YAMLs."],["auto-reload","boolean","false","Recarga archivos automáticamente al detectar cambios."],["update-checker","boolean","true","Notifica a OPs sobre nuevas versiones de ETCCore."],["log-commands","boolean","false","Registra cada ejecución en logs/commands.log."],["build-protection","boolean","false","Bloquea construcción a jugadores sin permiso."],["build-protection-message","string","…","Mensaje al intentar construir sin permiso."],["item-protection","boolean","false","Bloquea uso de ítems a jugadores sin permiso."],["item-protection-message","string","…","Mensaje al intentar usar ítem protegido."]]}];function p(){return e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-white mb-2",children:"Configuración"}),e.jsxs("p",{className:"text-zinc-400 mb-8",children:["ETCCore usa tres archivos de configuración principales en"," ",e.jsx("code",{className:"text-brand-400",children:"plugins/ETCCore/"}),". Todos se recargan con ",e.jsx("code",{className:"text-brand-400",children:"/fccmds reload"}),"."]}),e.jsx("h2",{className:"text-xl font-bold text-white mb-3",children:"config.yml"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-zinc-700",children:[e.jsx("th",{className:"text-left py-2 pr-4 text-zinc-400 font-medium",children:"Clave"}),e.jsx("th",{className:"text-left py-2 pr-4 text-zinc-400 font-medium",children:"Tipo"}),e.jsx("th",{className:"text-left py-2 pr-4 text-zinc-400 font-medium",children:"Por defecto"}),e.jsx("th",{className:"text-left py-2 text-zinc-400 font-medium",children:"Descripción"})]})}),e.jsx("tbody",{children:l[0].rows.map(([s,a,o,c])=>e.jsxs("tr",{className:"border-b border-zinc-800",children:[e.jsx("td",{className:"py-2 pr-4",children:e.jsx("code",{className:"text-brand-400",children:s})}),e.jsx("td",{className:"py-2 pr-4 text-zinc-500",children:a}),e.jsx("td",{className:"py-2 pr-4 text-zinc-500",children:e.jsx("code",{children:o})}),e.jsx("td",{className:"py-2 text-zinc-400",children:c})]},s))})]})}),e.jsx(t,{code:r,title:"config.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"chat-format.yml"}),e.jsxs("p",{className:"text-zinc-400 mb-3 text-sm",children:["Define el formato del chat. Soporta los placeholders integrados"," ",e.jsx("code",{className:"text-brand-400",children:"{world}"}),","," ",e.jsx("code",{className:"text-brand-400",children:"{player}"})," y"," ",e.jsx("code",{className:"text-brand-400",children:"{message}"}),", más cualquier placeholder de PlaceholderAPI."]}),e.jsx(t,{code:n,title:"chat-format.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"blocked-commands.yml"}),e.jsxs("p",{className:"text-zinc-400 mb-3 text-sm",children:["Lista de comandos bloqueados para jugadores sin ",e.jsx("code",{className:"text-brand-400",children:"fccmds.admin"}),". Solo escribe el nombre del comando sin barra."]}),e.jsx(t,{code:i,title:"blocked-commands.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"Permisos"}),e.jsx("div",{className:"space-y-2",children:[["fccmds.admin","Acceso a /fccmds reload y notificaciones de actualización."],["fccmds.invSee","Ver inventario de otros jugadores con /invsee."],["fccmds.enderChest","Ver ender-chest de otros jugadores con /ec."],["fccmds.mute","Mutear y desmutear jugadores con /mute."],["fccmds.build","Permite construir cuando build-protection está habilitado."],["fccmds.item","Permite usar ítems cuando item-protection está habilitado."]].map(([s,a])=>e.jsxs("div",{className:"flex gap-4 border-b border-zinc-800 pb-2 text-sm",children:[e.jsx("code",{className:"text-brand-400 w-52 shrink-0",children:s}),e.jsx("span",{className:"text-zinc-400",children:a})]},s))})]})}export{p as default};
