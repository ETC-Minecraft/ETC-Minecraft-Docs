import{j as e}from"./index-DArFSGYo.js";import{C as t}from"./CodeBlock-Dhaq0QrE.js";import"./react-vendor--lVoH5OK.js";import"./syntax-highlighter-BZGa3jO2.js";const n=`
# config.yml

verbose-outputs: false
auto-reload: true
update-checker: true
log-commands: false
build-protection: true
build-protection-message: "&cNo tienes permiso para construir aquí."
item-protection: true
item-protection-message: "&cNo puedes usar este ítem."
mute-default-reason: "Violación de las normas del servidor"
`,m=`
# on-join.yml

join-rules:
  quitar-fly-default:
    enabled: true
    only-groups: ["default"]
    delay-ticks: 20
    always-actions:
      - "[FLY:OFF]"
    first-join-actions: []

  bienvenida-default:
    enabled: true
    only-groups: ["default"]
    first-join-actions:
      - "[CONSOLE] lobby {player}"
      - "[MESSAGE] &aBienvenido, esta es tu primera vez en el servidor."
`,d=`
# death-respawn.yml

respawn-rules:
  lobby-sin-cama:
    enabled: true
    fallback-actions:
      - "[CONSOLE] lobby {player}"

  hardcore-spawn-fijo:
    enabled: false
    only-worlds: ["hardcore"]
    respawn-location:
      world: "world"
      x: 0.5
      y: 72.0
      z: 0.5
      yaw: 0.0
      pitch: 0.0
`,p=`
# teleport.yml

homes:
  default-limit: 3
  public-default-limit: 1
  group-limits:
    default:
      private: 3
      public: 1
    vip:
      private: 6
      public: 2

warmups:
  home: 3
  publichome: 3
  warp: 3
  lobby: 2
  spawn: 2
  back: 0
  reborn: 0
  rtp: 5
  tpa: 3
  tp-admin: 0
  cancel-move-distance: 0.15
  cancel-on-move:
    home: true
    warp: true
    back: false
    reborn: false
    rtp: true

cooldowns:
  back: 10
  reborn: 10
  rtp: 60

tpa:
  expire-seconds: 60

deaths:
  history-limit: 3
`,b=`
# playtime.yml

enabled: true
sync-interval-seconds: 60
vars-prefix: "playtime"
`,u=`
# chat-format.yml
format: "&7[&f{world}&7] &e{player}&7: &f{message}"
`,x=`
# blocked-commands.yml
blocked:
  - gamemode
  - op
  - deop
`,r={config:[["verbose-outputs","boolean","false","Mensajes de debug al cargar YAMLs."],["auto-reload","boolean","true","Recarga archivos automáticamente al detectar cambios."],["update-checker","boolean","true","Notifica a OPs sobre nuevas versiones."],["log-commands","boolean","false","Registra ejecuciones en logs/commands.log."],["build-protection","boolean","true","Bloquea construcción a jugadores sin permiso."],["item-protection","boolean","true","Bloquea tirar y recoger ítems."]],teleport:[["homes.default-limit","int","3","Límite base de homes privados."],["homes.public-default-limit","int","1","Límite base de homes públicos."],["homes.group-limits","section","…","Overrides de límites por grupo de LuckPerms."],["warmups.<tipo>","int","0-5","Warmup en segundos por tipo de teleport."],["warmups.cancel-on-move.<tipo>","boolean","true/false","Cancela el warmup si el jugador se mueve."],["cooldowns.<tipo>","int","0-60","Cooldown por tipo de teleport."],["tpa.expire-seconds","int","60","Expiración de solicitudes TPA."],["deaths.history-limit","int","3","Cantidad de muertes guardadas para /reborn."]],playtime:[["enabled","boolean","true","Activa o desactiva la sincronización automática."],["sync-interval-seconds","int","60","Cada cuánto se sincroniza el playtime."],["vars-prefix","string","playtime","Prefijo usado para variables persistentes."]]},h=[{title:"Permisos fijos",rows:[["etccore.admin","Administración, reload y avisos de actualización."],["etccore.staff","Marca al jugador como staff para placeholders."],["etccore.vanish","Usar /vanish y ver vanished en TAB."],["etccore.build","Permite colocar y romper bloques."],["etccore.items","Permite tirar y recoger ítems."],["etccore.mute","Permite usar /mute y /unmute."],["etccore.home","Usar /home, /homes y /homelist."],["etccore.sethome","Usar /sethome y /edithome."],["etccore.delhome","Usar /delhome."],["etccore.publichome","Usar /publichome y /publichomelist."],["etccore.warp","Usar /warp, /warps y /warplist."],["etccore.warp.manage","Crear, editar y borrar warps."],["etccore.lobby","Usar /lobby."],["etccore.lobby.set","Definir el lobby."],["etccore.spawn","Usar /spawn."],["etccore.spawn.set","Definir el spawn."],["etccore.back","Volver a la última ubicación guardada."],["etccore.reborn","Volver a una muerte guardada y usar /deathlist."],["etccore.rtp","Usar /rtp."],["etccore.tpa","Solicitudes de teletransporte."],["etccore.tpaall","Enviar solicitud masiva con /tpaall."],["etccore.tpadmin","Comandos administrativos de teleport."],["etccore.teleport.warmup.bypass","Ignora warmups de teletransporte."],["etccore.teleport.cooldown.bypass","Ignora cooldowns de teletransporte."]]},{title:"Permisos dinámicos",rows:[["etccore.commands.<nombre>","Se crea por cada comando YAML cargado."],["etccore.menus.<nombre>","Se crea por cada menú cargado."],["etccore.allow.<comando>","Permite un comando concreto en blocked-commands.yml."],["etccore.home.limit.<n>","Amplía el límite de homes privados por permiso."],["etccore.publichome.limit.<n>","Amplía el límite de homes públicos por permiso."],["permission: nodo.libre","Nodo personalizado definido dentro de un comando YAML."]]}];function l({rows:o}){return e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-zinc-700",children:[e.jsx("th",{className:"text-left py-2 pr-4 text-zinc-400 font-medium",children:"Clave"}),e.jsx("th",{className:"text-left py-2 pr-4 text-zinc-400 font-medium",children:"Tipo"}),e.jsx("th",{className:"text-left py-2 pr-4 text-zinc-400 font-medium",children:"Por defecto"}),e.jsx("th",{className:"text-left py-2 text-zinc-400 font-medium",children:"Descripción"})]})}),e.jsx("tbody",{children:o.map(([s,a,c,i])=>e.jsxs("tr",{className:"border-b border-zinc-800",children:[e.jsx("td",{className:"py-2 pr-4",children:e.jsx("code",{className:"text-brand-400",children:s})}),e.jsx("td",{className:"py-2 pr-4 text-zinc-500",children:a}),e.jsx("td",{className:"py-2 pr-4 text-zinc-500",children:e.jsx("code",{children:c})}),e.jsx("td",{className:"py-2 text-zinc-400",children:i})]},s))})]})})}function g(){return e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-white mb-2",children:"Configuración"}),e.jsxs("p",{className:"text-zinc-400 mb-8",children:["ETCCore separa la configuración por sistema en ",e.jsx("code",{className:"text-brand-400",children:"plugins/ETCCore/"}),". Todos los archivos se recargan con ",e.jsx("code",{className:"text-brand-400",children:"/etccore reload"}),"."]}),e.jsx("h2",{className:"text-xl font-bold text-white mb-3",children:"config.yml"}),e.jsx(l,{rows:r.config}),e.jsx(t,{code:n,title:"config.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"on-join.yml"}),e.jsxs("p",{className:"text-zinc-400 mb-3 text-sm",children:["Aquí van las reglas de entrada. Puedes combinar grupos, permisos, mundos, delays, cooldowns y acciones como ",e.jsx("code",{className:"text-brand-400",children:"[FLY:OFF]"}),"."]}),e.jsx(t,{code:m,title:"on-join.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"death-respawn.yml"}),e.jsxs("p",{className:"text-zinc-400 mb-3 text-sm",children:["Define el fallback al morir con acciones o con una ubicación nativa usando ",e.jsx("code",{className:"text-brand-400",children:"respawn-location"}),"."]}),e.jsx(t,{code:d,title:"death-respawn.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"teleport.yml"}),e.jsx(l,{rows:r.teleport}),e.jsx("p",{className:"text-zinc-400 mb-3 text-sm",children:"Controla homes, public homes, warps, lobby, spawn, back, reborn, rtp y solicitudes TPA. También define warmups, cancelación por movimiento, cooldowns y límites por grupo."}),e.jsx(t,{code:p,title:"teleport.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"playtime.yml"}),e.jsx(l,{rows:r.playtime}),e.jsxs("p",{className:"text-zinc-400 mb-3 text-sm",children:["Sincroniza el tiempo jugado a variables persistentes como ",e.jsx("code",{className:"text-brand-400",children:"playtime.seconds"})," y ",e.jsx("code",{className:"text-brand-400",children:"playtime.human"}),"."]}),e.jsx(t,{code:b,title:"playtime.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"chat-format.yml"}),e.jsxs("p",{className:"text-zinc-400 mb-3 text-sm",children:["Define el formato del chat. Soporta ",e.jsx("code",{className:"text-brand-400",children:"{world}"}),", ",e.jsx("code",{className:"text-brand-400",children:"{player}"}),", ",e.jsx("code",{className:"text-brand-400",children:"{message}"})," y placeholders de PlaceholderAPI."]}),e.jsx(t,{code:u,title:"chat-format.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"blocked-commands.yml"}),e.jsx("p",{className:"text-zinc-400 mb-3 text-sm",children:"Lista de comandos bloqueados. Solo escribe el nombre sin barra."}),e.jsx(t,{code:x,title:"blocked-commands.yml"}),e.jsx("h2",{id:"permisos-etccore",className:"text-xl font-bold text-white mt-10 mb-3",children:"Permisos"}),e.jsx("p",{className:"text-zinc-400 mb-4 text-sm",children:"ETCCore mezcla permisos fijos con nodos dinámicos creados desde comandos YAML, menús, bloqueos y límites de homes."}),e.jsx("div",{className:"space-y-8",children:h.map(o=>e.jsxs("div",{children:[e.jsx("h3",{className:"text-white font-semibold mb-2",children:o.title}),e.jsx("div",{className:"space-y-2",children:o.rows.map(([s,a])=>e.jsxs("div",{className:"flex gap-4 border-b border-zinc-800 pb-2 text-sm",children:[e.jsx("code",{className:"text-brand-400 w-72 shrink-0",children:s}),e.jsx("span",{className:"text-zinc-400",children:a})]},s))})]},o.title))}),e.jsx("h3",{className:"text-white font-semibold mt-8 mb-2",children:"Ejemplos rápidos de LuckPerms"}),e.jsx(t,{title:"LuckPerms",code:`/lp group terricola permission set etccore.build true
/lp group terricola permission set etccore.items true
/lp group terricola permission set etccore.allow.lobby true
/lp group default permission set etccore.commands.kit false
/lp group vip permission set etccore.menus.tienda true
/lp group vip permission set etccore.home.limit.6 true
/lp group owner permission set etccore.teleport.warmup.bypass true`})]})}export{g as default};
