import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <span className="text-brand-400">⬡</span>
          <span>ETC-Minecraft</span>
          <span className="text-xs text-zinc-500 font-normal">Docs</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-400">
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
  )
}
