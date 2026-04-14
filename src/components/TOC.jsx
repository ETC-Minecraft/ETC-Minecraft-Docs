import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function TOC() {
  const [headings, setHeadings] = useState([])
  const [active, setActive] = useState('')
  const { pathname } = useLocation()

  // Extract headings from the main content area after render
  useEffect(() => {
    const timer = setTimeout(() => {
      const main = document.querySelector('main')
      if (!main) return
      const nodes = Array.from(main.querySelectorAll('h2, h3'))
      const items = nodes
        .filter(n => n.textContent.trim())
        .map((n, i) => {
          if (!n.id) n.id = `heading-${i}`
          return { id: n.id, text: n.textContent.trim(), level: parseInt(n.tagName[1]) }
        })
      setHeadings(items)
    }, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  // Highlight active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
    )
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <aside className="hidden xl:block w-52 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto pt-8 pb-16 pl-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">En esta página</p>
      <ul className="space-y-1.5">
        {headings.map(h => (
          <li key={h.id}>
            <button
              onClick={() => scrollTo(h.id)}
              className={`text-left text-xs transition-colors leading-snug w-full ${h.level === 3 ? 'pl-3' : ''} ${
                active === h.id ? 'text-brand-400 font-medium' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
