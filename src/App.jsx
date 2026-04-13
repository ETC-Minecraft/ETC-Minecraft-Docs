import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const GettingStarted = lazy(() => import('./pages/GettingStarted.jsx'))
const Actions = lazy(() => import('./pages/Actions.jsx'))
const Menus = lazy(() => import('./pages/Menus.jsx'))
const Variables = lazy(() => import('./pages/Variables.jsx'))
const Economy = lazy(() => import('./pages/Economy.jsx'))
const Scheduled = lazy(() => import('./pages/Scheduled.jsx'))
const Config = lazy(() => import('./pages/Config.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const Changelog = lazy(() => import('./pages/Changelog.jsx'))

export default function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-zinc-400">Cargando…</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="getting-started" element={<GettingStarted />} />
          <Route path="actions" element={<Actions />} />
          <Route path="menus" element={<Menus />} />
          <Route path="variables" element={<Variables />} />
          <Route path="economy" element={<Economy />} />
          <Route path="scheduled" element={<Scheduled />} />
          <Route path="config" element={<Config />} />
          <Route path="projects" element={<Projects />} />
          <Route path="changelog" element={<Changelog />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
