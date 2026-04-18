import{j as e}from"./index-BOahBsPU.js";import{C as t}from"./CodeBlock-DHYq0Gm_.js";import"./react-vendor--lVoH5OK.js";import"./syntax-highlighter-BZGa3jO2.js";const c=`
# config.yml

verbose-outputs: false
# Muestra mensajes de debug en consola al cargar comandos/menús.

auto-reload: true
# Recarga automáticamente los YAML al detectar cambios en disco.
# Usa con cuidado en producción.

update-checker: true
# Comprueba nuevas versiones en GitHub Releases al iniciar.
# Solo notifica a operadores al conectarse.

log-commands: false
# Guarda en plugins/ETCCore/logs/commands.log cada ejecución
# de un comando personalizado (jugador, mundo, args, timestamp).

build-protection: true
# Evita que jugadores sin permiso construyan o rompan bloques.

build-protection-message: "&cNo tienes permiso para construir aquí."
# Mensaje al intentar construir sin permiso.

item-protection: true
# Evita que jugadores sin permiso tiren o recojan ítems.

item-protection-message: "&cNo puedes usar este ítem."
# Mensaje al intentar usar un ítem protegido.

join-rules:
  quitar-fly-default:
    enabled: true
    only-groups: ["default"]
    delay-ticks: 20
    always-actions:
      - "[FLY:OFF]"
    first-join-actions: []
`,i=`
# chat-format.yml
format: "&7[&f{world}&7] &e{player}&7: &f{message}"
`,n=`
# blocked-commands.yml
blocked:
  - gamemode
  - op
  - deop
`,l=[{title:"config.yml — opciones principales",rows:[["verbose-outputs","boolean","false","Mensajes de debug en consola al cargar YAMLs."],["auto-reload","boolean","true","Recarga archivos automáticamente al detectar cambios."],["update-checker","boolean","true","Notifica a OPs sobre nuevas versiones de ETCCore."],["log-commands","boolean","false","Registra cada ejecución en logs/commands.log."],["build-protection","boolean","true","Bloquea construcción a jugadores sin permiso."],["build-protection-message","string","…","Mensaje al intentar construir sin permiso."],["item-protection","boolean","true","Bloquea tirar y recoger ítems a jugadores sin permiso."],["item-protection-message","string","…","Mensaje al intentar usar ítem protegido."]]}],d=[{title:"Permisos fijos",rows:[["etccore.admin","Administración, reload y avisos de actualización."],["etccore.staff","Marca al jugador como staff para placeholders."],["etccore.vanish","Usar /vanish y ver vanished en TAB."],["etccore.enderchest","Abrir tu propio enderchest."],["etccore.enderchest.others","Abrir el enderchest de otros jugadores."],["etccore.invsee","Ver inventarios online."],["etccore.invsee.offline","Ver inventarios offline."],["etccore.build","Permite colocar y romper bloques."],["etccore.build.bypass","Ignora protección de construcción e ítems."],["etccore.items","Permite tirar y recoger ítems."],["etccore.chat","Permite hablar por el chat."],["etccore.mute","Permite usar /mute y /unmute."],["etccore.cmdblock.bypass","Ignora blocked-commands.yml."]]},{title:"Permisos dinámicos",rows:[["etccore.commands.<nombre>","Se crea por cada comando YAML cargado."],["etccore.menus.<nombre>","Se crea por cada menú cargado."],["etccore.allow.<comando>","Permite un comando concreto en blocked-commands.yml."],["permission: nodo.libre","Nodo personalizado que tú definas dentro de un comando YAML."]]}];function b(){return e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-white mb-2",children:"Configuración"}),e.jsxs("p",{className:"text-zinc-400 mb-8",children:["ETCCore usa tres archivos de configuración principales en"," ",e.jsx("code",{className:"text-brand-400",children:"plugins/ETCCore/"}),". Todos se recargan con ",e.jsx("code",{className:"text-brand-400",children:"/fccmds reload"}),"."]}),e.jsx("h2",{className:"text-xl font-bold text-white mb-3",children:"config.yml"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-zinc-700",children:[e.jsx("th",{className:"text-left py-2 pr-4 text-zinc-400 font-medium",children:"Clave"}),e.jsx("th",{className:"text-left py-2 pr-4 text-zinc-400 font-medium",children:"Tipo"}),e.jsx("th",{className:"text-left py-2 pr-4 text-zinc-400 font-medium",children:"Por defecto"}),e.jsx("th",{className:"text-left py-2 text-zinc-400 font-medium",children:"Descripción"})]})}),e.jsx("tbody",{children:l[0].rows.map(([s,o,a,r])=>e.jsxs("tr",{className:"border-b border-zinc-800",children:[e.jsx("td",{className:"py-2 pr-4",children:e.jsx("code",{className:"text-brand-400",children:s})}),e.jsx("td",{className:"py-2 pr-4 text-zinc-500",children:o}),e.jsx("td",{className:"py-2 pr-4 text-zinc-500",children:e.jsx("code",{children:a})}),e.jsx("td",{className:"py-2 text-zinc-400",children:r})]},s))})]})}),e.jsx(t,{code:c,title:"config.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"chat-format.yml"}),e.jsxs("p",{className:"text-zinc-400 mb-3 text-sm",children:["Define el formato del chat. Soporta los placeholders integrados"," ",e.jsx("code",{className:"text-brand-400",children:"{world}"}),","," ",e.jsx("code",{className:"text-brand-400",children:"{player}"})," y"," ",e.jsx("code",{className:"text-brand-400",children:"{message}"}),", más cualquier placeholder de PlaceholderAPI."]}),e.jsx(t,{code:i,title:"chat-format.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"blocked-commands.yml"}),e.jsxs("p",{className:"text-zinc-400 mb-3 text-sm",children:["Lista de comandos bloqueados para jugadores sin ",e.jsx("code",{className:"text-brand-400",children:"fccmds.admin"}),". Solo escribe el nombre del comando sin barra."]}),e.jsx(t,{code:n,title:"blocked-commands.yml"}),e.jsx("h2",{id:"permisos-etccore",className:"text-xl font-bold text-white mt-10 mb-3",children:"Permisos"}),e.jsx("p",{className:"text-zinc-400 mb-4 text-sm",children:"ETCCore mezcla permisos fijos del plugin con nodos dinámicos creados desde comandos YAML, menús y reglas de bloqueo de comandos."}),e.jsx("div",{className:"space-y-8",children:d.map(s=>e.jsxs("div",{children:[e.jsx("h3",{className:"text-white font-semibold mb-2",children:s.title}),e.jsx("div",{className:"space-y-2",children:s.rows.map(([o,a])=>e.jsxs("div",{className:"flex gap-4 border-b border-zinc-800 pb-2 text-sm",children:[e.jsx("code",{className:"text-brand-400 w-64 shrink-0",children:o}),e.jsx("span",{className:"text-zinc-400",children:a})]},o))})]},s.title))}),e.jsx("h3",{className:"text-white font-semibold mt-8 mb-2",children:"Ejemplos rápidos de LuckPerms"}),e.jsx(t,{title:"LuckPerms",code:`/lp group terricola permission set etccore.build true
/lp group terricola permission set etccore.items true
/lp group terricola permission set etccore.allow.lobby true
/lp group default permission set etccore.commands.kit false
/lp group vip permission set etccore.menus.tienda true`})]})}export{b as default};
