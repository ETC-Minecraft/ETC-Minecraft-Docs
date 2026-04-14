import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import TOC from './TOC.jsx'
import PrevNext from './PrevNext.jsx'
import Breadcrumb from './Breadcrumb.jsx'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10 min-w-0">
          <Breadcrumb />
          <Outlet />
          <PrevNext />
        </main>
        <TOC />
      </div>
    </div>
  )
}
