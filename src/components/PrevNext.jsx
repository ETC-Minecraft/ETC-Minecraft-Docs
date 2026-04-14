import { useLocation, Link } from 'react-router-dom'
import { DOC_SEQUENCE } from '../lib/nav.js'

export default function PrevNext() {
  const { pathname } = useLocation()
  const idx = DOC_SEQUENCE.findIndex(p => p.path === pathname)
  if (idx === -1) return null

  const prev = DOC_SEQUENCE[idx - 1] ?? null
  const next = DOC_SEQUENCE[idx + 1] ?? null

  if (!prev && !next) return null

  return (
    <div className="mt-12 pt-6 border-t border-zinc-800 grid grid-cols-2 gap-4">
      <div>
        {prev && (
          <Link
            to={prev.path}
            className="group flex flex-col p-4 rounded-xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 transition-colors"
          >
            <span className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </span>
            <span className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">{prev.title}</span>
            <span className="text-xs text-zinc-600 mt-0.5">{prev.section}</span>
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            to={next.path}
            className="group flex flex-col p-4 rounded-xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 transition-colors text-right"
          >
            <span className="text-xs text-zinc-500 mb-1 flex items-center gap-1 justify-end">
              Siguiente
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">{next.title}</span>
            <span className="text-xs text-zinc-600 mt-0.5">{next.section}</span>
          </Link>
        )}
      </div>
    </div>
  )
}
