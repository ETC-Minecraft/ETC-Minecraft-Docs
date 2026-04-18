import{j as e}from"./index-BOahBsPU.js";import{C as s}from"./CodeBlock-DHYq0Gm_.js";import"./react-vendor--lVoH5OK.js";import"./syntax-highlighter-BZGa3jO2.js";const c=`
# commands/scheduled/avisos.yml
# Envía un mensaje automático cada 30 minutos

enabled: false          # Cambia a true para activar

interval: 1800          # Segundos entre ejecuciones (1800 = 30 min)

actions:
  - "[BROADCAST] &8[&6Servidor&8] &e¡No olvides leer las reglas: &b/reglas"
  - "[BROADCAST] &8[&6Servidor&8] &e¿Necesitas ayuda? Escribe &b/ticket"
`,n=`
# commands/scheduled/reset-diario.yml
# Guarda el mundo y anuncia fin del día cada 24h

enabled: false
interval: 86400

actions:
  - "[BROADCAST] &c⚠ &eSe guardará el servidor en 10 segundos..."
  - "[CONSOLE] save-all"
  - "[BROADCAST] &aGuardado completado."
`;function i(){return e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-white mb-2",children:"Tareas programadas"}),e.jsxs("p",{className:"text-zinc-400 mb-8",children:["Las tareas programadas se definen en"," ",e.jsx("code",{className:"text-brand-400",children:"plugins/ETCCore/commands/scheduled/*.yml"}),". Se ejecutan automáticamente cada X segundos mientras el servidor esté corriendo."]}),e.jsxs("div",{className:"p-4 bg-zinc-900 border border-zinc-700 rounded-lg mb-8",children:[e.jsx("h3",{className:"font-semibold text-white mb-2",children:"⚠ Desactivadas por defecto"}),e.jsxs("p",{className:"text-sm text-zinc-400",children:["Todas las tareas vienen con ",e.jsx("code",{className:"text-brand-400",children:"enabled: false"}),". Actívalas solo cuando las necesites para no impactar el rendimiento."]})]}),e.jsx("h2",{className:"text-xl font-bold text-white mb-3",children:"Estructura YAML"}),e.jsx("div",{className:"space-y-2 mb-6",children:[["enabled","true/false — activa o desactiva la tarea sin borrar el archivo."],["interval","Segundos entre ejecuciones. Mínimo: 1 (= 20 ticks). Ejemplo: 3600 = 1h."],["actions","Lista de acciones a ejecutar. Solo se soportan [BROADCAST] y [CONSOLE]."]].map(([a,t])=>e.jsxs("div",{className:"flex gap-4 border-b border-zinc-800 pb-2 text-sm",children:[e.jsxs("code",{className:"text-brand-400 w-24 shrink-0",children:[a,":"]}),e.jsx("span",{className:"text-zinc-400",children:t})]},a))}),e.jsx("h2",{className:"text-xl font-bold text-white mb-3",children:"Acciones soportadas"}),e.jsx("p",{className:"text-zinc-400 mb-3 text-sm",children:"Las tareas globales no tienen jugador asociado, por eso solo soportan estas dos acciones:"}),e.jsxs("div",{className:"space-y-2 mb-8",children:[e.jsxs("div",{className:"flex gap-4 border-b border-zinc-800 pb-2 text-sm",children:[e.jsx("code",{className:"text-brand-400 w-40 shrink-0",children:"[BROADCAST] texto"}),e.jsx("span",{className:"text-zinc-400",children:"Envía mensaje a todos los jugadores online."})]}),e.jsxs("div",{className:"flex gap-4 border-b border-zinc-800 pb-2 text-sm",children:[e.jsx("code",{className:"text-brand-400 w-40 shrink-0",children:"[CONSOLE] comando"}),e.jsx("span",{className:"text-zinc-400",children:"Ejecuta un comando como consola."})]})]}),e.jsx("h2",{className:"text-xl font-bold text-white mb-3",children:"Ejemplo: avisos automáticos"}),e.jsx(s,{code:c,title:"commands/scheduled/avisos.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-8 mb-3",children:"Ejemplo: guardado diario"}),e.jsx(s,{code:n,title:"commands/scheduled/reset-diario.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-8 mb-3",children:"Recarga"}),e.jsxs("p",{className:"text-zinc-400",children:["Las tareas se recargan con ",e.jsx("code",{className:"text-brand-400",children:"/fccmds reload"}),". Las tareas activas se cancelan y se reinician con la nueva configuración."]})]})}export{i as default};
