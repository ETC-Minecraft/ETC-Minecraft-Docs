import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4">🧱</div>
      <h1 className="text-4xl font-bold text-white mb-2">404</h1>
      <p className="text-zinc-400 mb-6 max-w-sm">
        Esta página no existe o fue movida. Revisa la URL o usa la búsqueda para encontrar lo que buscas.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm rounded-lg transition-colors"
        >
          Ir al inicio
        </Link>
        <Link
          to="/projects"
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm rounded-lg transition-colors"
        >
          Ver proyectos
        </Link>
      </div>
    </div>
  )
}
