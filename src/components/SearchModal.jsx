import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { NAV_PAGES } from '../lib/nav.js'

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const results = query.trim().length < 1
    ? []
    : NAV_PAGES.filter(p => {
        const q = query.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.section.toLowerCase().includes(q) ||
          p.keywords.toLowerCase().includes(q)
        )
      }).slice(0, 8)

  const go = (path) => {
    navigate(path)
    onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
          <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar en la documentación…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') onClose() }}
            className="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm outline-none"
          />
          <kbd className="text-xs text-zinc-600 bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded">Esc</kbd>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map(p => (
              <li key={p.path}>
                <button
                  onClick={() => go(p.path)}
                  className="w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-white">{p.title}</p>
                    <p className="text-xs text-zinc-500">{p.section}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : query.trim().length > 0 ? (
          <div className="px-4 py-6 text-sm text-zinc-500 text-center">
            Sin resultados para &ldquo;{query}&rdquo;
          </div>
        ) : (
          <div className="px-4 py-4">
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">Páginas</p>
            <ul className="space-y-0.5">
              {NAV_PAGES.slice(0, 5).map(p => (
                <li key={p.path}>
                  <button
                    onClick={() => go(p.path)}
                    className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 transition-colors"
                  >
                    <span className="text-sm text-zinc-400">{p.title}</span>
                    <span className="text-xs text-zinc-600 ml-auto">{p.section}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-zinc-800 px-4 py-2 flex gap-4 text-xs text-zinc-600">
          <span><kbd className="bg-zinc-800 border border-zinc-700 px-1 rounded">↵</kbd> seleccionar</span>
          <span><kbd className="bg-zinc-800 border border-zinc-700 px-1 rounded">Esc</kbd> cerrar</span>
        </div>
      </div>
    </div>,
    document.body
  )
}
