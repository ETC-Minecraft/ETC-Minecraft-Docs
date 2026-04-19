import{j as e}from"./index-DNMFRe0z.js";import{C as a}from"./CodeBlock-l8WS-RyJ.js";import"./react-vendor--lVoH5OK.js";import"./syntax-highlighter-BZGa3jO2.js";const r=`
actions:
  # Asignar un valor
  - "[VAR:SET] puntos = 0"

  # Sumar al valor actual
  - "[VAR:ADD] puntos = {var:puntos} + 10"

  # Usar en mensaje
  - "[MESSAGE] &aTus puntos: &e{var:puntos}"

  # Condicional basado en variable
  - "[IF var:puntos>=100] [CONSOLE] lp user {player} parent add vip"
  - "[IF var:rango=admin] [BROADCAST] &6{player} es admin."
`,t=`
actions:
  - "[INPUT] nombre;¿Cuál es tu nombre en Discord?"
  # El jugador escribe en el chat…
  - "[MESSAGE] &7Tu Discord guardado: &f{var:nombre}"
`,o=`
actions:
  - "[MESSAGE] &7Llevas &f{var:playtime.human} &7jugados."
  - "[IF var:playtime.hours>=5] [MESSAGE] &aYa superaste las 5 horas en el servidor."
`,n=[["{var:nombre}",'Valor de la variable "nombre" del jugador'],["{var:playtime.seconds}","Tiempo jugado sincronizado automáticamente en segundos"],["{var:playtime.human}","Tiempo jugado formateado, por ejemplo 2h 15m 4s"],["{player}","Nombre del jugador"],["{world}","Nombre del mundo"],["{x} {y} {z}","Coordenadas enteras"],["{args}","Todos los argumentos del comando"],["{arg0}...{argN}","Argumento por posición (0-based)"],["{balance}","Saldo numérico (requiere Vault)"],["{balance_fmt}","Saldo formateado por el plugin de economía"],["%placeholder%","Cualquier placeholder de PlaceholderAPI (si está instalado)"]];function p(){return e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-white mb-2",children:"Variables & Placeholders"}),e.jsxs("p",{className:"text-zinc-400 mb-8",children:["ETCCore almacena variables por jugador en"," ",e.jsx("code",{className:"text-brand-400",children:"plugins/ETCCore/playerdata/<uuid>.yml"}),". Son persistentes entre reinicios del servidor."]}),e.jsx("h2",{className:"text-xl font-bold text-white mt-8 mb-3",children:"Operaciones de variable"}),e.jsx(a,{code:r,title:"ejemplo de variables en commands/ejemplo.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"Input de chat [INPUT]"}),e.jsx("p",{className:"text-zinc-400 mb-1",children:"Captura el próximo mensaje del jugador y lo guarda en una variable. El chat original no se muestra al resto de jugadores."}),e.jsx(a,{code:t,title:"commands/registro.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-4",children:"Referencia de placeholders"}),e.jsx("div",{className:"space-y-2",children:n.map(([s,l])=>e.jsxs("div",{className:"flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-zinc-800 pb-2",children:[e.jsx("code",{className:"text-yellow-400 font-mono text-sm shrink-0 w-52",children:s}),e.jsx("span",{className:"text-zinc-400 text-sm",children:l})]},s))}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"Playtime automático"}),e.jsxs("p",{className:"text-zinc-400 mb-3",children:["ETCCore puede sincronizar automáticamente el tiempo jugado de cada jugador con ",e.jsx("code",{className:"text-brand-400",children:"playtime.yml"}),". Por defecto genera las variables ",e.jsx("code",{className:"text-brand-400",children:"playtime.ticks"}),", ",e.jsx("code",{className:"text-brand-400",children:"playtime.seconds"}),", ",e.jsx("code",{className:"text-brand-400",children:"playtime.minutes"}),", ",e.jsx("code",{className:"text-brand-400",children:"playtime.hours"}),", ",e.jsx("code",{className:"text-brand-400",children:"playtime.days"})," y ",e.jsx("code",{className:"text-brand-400",children:"playtime.human"}),"."]}),e.jsx(a,{code:o,title:"usar playtime en acciones"}),e.jsx("h3",{className:"text-white font-semibold mt-8 mb-2",children:"Placeholders ETCCore para PlaceholderAPI"}),e.jsx(a,{title:"PlaceholderAPI",code:`%etccore_playtime_ticks%
%etccore_playtime_seconds%
%etccore_playtime_human%`}),e.jsx("div",{className:"mt-8 p-4 bg-zinc-900 border border-zinc-700 rounded-lg",children:e.jsxs("p",{className:"text-sm text-zinc-400",children:[e.jsx("strong",{className:"text-zinc-200",children:"Tip:"})," Las expresiones matemáticas simples funcionan al asignar variables:",e.jsxs("code",{className:"text-brand-400 block mt-1",children:["[VAR:SET] total = ","{var:precio}"," * ","{var:cantidad}"]})]})})]})}export{p as default};
