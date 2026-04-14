import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu.jsx'
import SearchModal from './SearchModal.jsx'

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)

  // Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(o => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-7xl mx-auto gap-3">
          <div className="flex items-center gap-2">
            <MobileMenu />
            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white">
              <span className="text-brand-400">⬡</span>
              <span>ETC-Minecraft</span>
              <span className="text-xs text-zinc-500 font-normal hidden sm:inline">Docs</span>
            </Link>
          </div>

          {/* Search bar */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 text-sm text-zinc-500 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-lg px-3 py-1.5 transition-colors flex-1 max-w-xs"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <span className="hidden sm:inline">Buscar…</span>
            <kbd className="ml-auto hidden sm:inline text-xs bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>

          <nav className="hidden sm:flex items-center gap-4 text-sm text-zinc-400 shrink-0">
            <a
              href="https://github.com/ETC-Minecraft/ETCCore/releases/latest"
              target="_blank" rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Descargar
            </a>
            <a
              href="https://github.com/ETC-Minecraft"
              target="_blank" rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
          </nav>
        </div>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  )
}
