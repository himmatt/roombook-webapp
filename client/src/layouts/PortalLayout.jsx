import { Outlet } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const PortalLayout = () => {
  return (
    <div className="h-screen bg-slate-100 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default PortalLayout
