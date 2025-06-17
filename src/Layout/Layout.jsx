import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
               <div className=' flex'>
            <Sidebar sidebarOpen={sidebarOpen} />
              <div className={` ${sidebarOpen ? "ml-[70px]" : "ml-[250px]"} w-[100%]`}>
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <Outlet />
              </div>
        </div>
  )
}

export default Layout