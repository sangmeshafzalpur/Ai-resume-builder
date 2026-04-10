import React from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Navbar from '../components/Navbar'
import { auth } from '../utils/auth'

const Layout = () => {
  const navigate = useNavigate()
  
  // Redirect to auth if not authenticated
  if (!auth.isLoggedIn()) {
    return <Navigate to="/" />
  }

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }

  return (
    <div>
      <div className='min-h-screen bg-gray-50'>
        <Navbar>
          <button 
            onClick={handleLogout}
            className='ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2'
          >
            <LogOut size={18} />
            Logout
          </button>
        </Navbar>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
