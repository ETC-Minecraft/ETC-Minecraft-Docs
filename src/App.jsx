import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const ETCCoreHome = lazy(() => import('./pages/ETCCoreHome.jsx'))
const GettingStarted = lazy(() => import('./pages/GettingStarted.jsx'))
const Actions = lazy(() => import('./pages/Actions.jsx'))
const Menus = lazy(() => import('./pages/Menus.jsx'))
const Variables = lazy(() => import('./pages/Variables.jsx'))
const Economy = lazy(() => import('./pages/Economy.jsx'))
const Scheduled = lazy(() => import('./pages/Scheduled.jsx'))
const Config = lazy(() => import('./pages/Config.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const Changelog = lazy(() => import('./pages/Changelog.jsx'))
const ETCRegionGeneratorDocs = lazy(() => import('./pages/ETCRegionGeneratorDocs.jsx'))
const YAMLPlayground = lazy(() => import('./pages/YAMLPlayground.jsx'))
const MenuBuilder = lazy(() => import('./pages/MenuBuilder.jsx'))
const ActionBuilder = lazy(() => import('./pages/ActionBuilder.jsx'))
const CommandBuilder = lazy(() => import('./pages/CommandBuilder.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-zinc-400">Cargando…</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="playground" element={<YAMLPlayground />} />

          {/* ETCCore docs */}
          <Route path="etccore">
            <Route index element={<ETCCoreHome />} />
            <Route path="getting-started" element={<GettingStarted />} />
            <Route path="config" element={<Config />} />
            <Route path="changelog" element={<Changelog />} />
            <Route path="actions" element={<Actions />} />
            <Route path="variables" element={<Variables />} />
            <Route path="economy" element={<Economy />} />
            <Route path="scheduled" element={<Scheduled />} />
            <Route path="menus" element={<Menus />} />
          </Route>

          {/* ETCRegionGenerator docs */}
          <Route path="etcregion-generator" element={<ETCRegionGeneratorDocs />} />

          {/* Visual tools */}
          <Route path="tools">
            <Route path="menu-builder" element={<MenuBuilder />} />
            <Route path="action-builder" element={<ActionBuilder />} />
            <Route path="command-builder" element={<CommandBuilder />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
