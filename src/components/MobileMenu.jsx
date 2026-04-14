import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { SidebarContent } from './Sidebar.jsx'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        aria-label="Abrir menú"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-72 bg-zinc-950 border-r border-zinc-800 overflow-y-auto pt-4 pb-16 px-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-white">ETC-Minecraft Docs</span>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-500 hover:text-white p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
