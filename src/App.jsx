import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import GettingStarted from './pages/GettingStarted.jsx'
import Actions from './pages/Actions.jsx'
import Menus from './pages/Menus.jsx'
import Variables from './pages/Variables.jsx'
import Economy from './pages/Economy.jsx'
import Scheduled from './pages/Scheduled.jsx'
import Config from './pages/Config.jsx'
import Projects from './pages/Projects.jsx'
import Changelog from './pages/Changelog.jsx'

export default function App() {
  return (
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
  )
}
