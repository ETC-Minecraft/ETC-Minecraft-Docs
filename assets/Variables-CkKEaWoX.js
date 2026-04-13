import{j as e}from"./index-tLS-NHUW.js";import{C as r}from"./CodeBlock-DDEf8jbJ.js";import"./react-vendor-DD0BoVN6.js";import"./syntax-highlighter-CyytDYit.js";const l=`
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
`,o=`
actions:
  - "[INPUT] nombre;¿Cuál es tu nombre en Discord?"
  # El jugador escribe en el chat…
  - "[MESSAGE] &7Tu Discord guardado: &f{var:nombre}"
`,n=[["{var:nombre}",'Valor de la variable "nombre" del jugador'],["{player}","Nombre del jugador"],["{world}","Nombre del mundo"],["{x} {y} {z}","Coordenadas enteras"],["{args}","Todos los argumentos del comando"],["{arg0}...{argN}","Argumento por posición (0-based)"],["{balance}","Saldo numérico (requiere Vault)"],["{balance_fmt}","Saldo formateado por el plugin de economía"],["%placeholder%","Cualquier placeholder de PlaceholderAPI (si está instalado)"]];function m(){return e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-white mb-2",children:"Variables & Placeholders"}),e.jsxs("p",{className:"text-zinc-400 mb-8",children:["ETCCore almacena variables por jugador en"," ",e.jsx("code",{className:"text-brand-400",children:"plugins/ETCCore/playerdata/<uuid>.yml"}),". Son persistentes entre reinicios del servidor."]}),e.jsx("h2",{className:"text-xl font-bold text-white mt-8 mb-3",children:"Operaciones de variable"}),e.jsx(r,{code:l,title:"ejemplo de variables en commands/ejemplo.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-3",children:"Input de chat [INPUT]"}),e.jsx("p",{className:"text-zinc-400 mb-1",children:"Captura el próximo mensaje del jugador y lo guarda en una variable. El chat original no se muestra al resto de jugadores."}),e.jsx(r,{code:o,title:"commands/registro.yml"}),e.jsx("h2",{className:"text-xl font-bold text-white mt-10 mb-4",children:"Referencia de placeholders"}),e.jsx("div",{className:"space-y-2",children:n.map(([a,s])=>e.jsxs("div",{className:"flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-zinc-800 pb-2",children:[e.jsx("code",{className:"text-yellow-400 font-mono text-sm shrink-0 w-52",children:a}),e.jsx("span",{className:"text-zinc-400 text-sm",children:s})]},a))}),e.jsx("div",{className:"mt-8 p-4 bg-zinc-900 border border-zinc-700 rounded-lg",children:e.jsxs("p",{className:"text-sm text-zinc-400",children:[e.jsx("strong",{className:"text-zinc-200",children:"Tip:"})," Las expresiones matemáticas simples funcionan al asignar variables:",e.jsxs("code",{className:"text-brand-400 block mt-1",children:["[VAR:SET] total = ","{var:precio}"," * ","{var:cantidad}"]})]})})]})}export{m as default};
