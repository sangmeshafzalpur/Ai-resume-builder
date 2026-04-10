import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import AuthPage from './pages/AuthPage'
import Home from './pages/Home'
import PrivateRoute from './components/auth/PrivateRoute'

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<AuthPage />} />
        <Route path='/view/:resumeId' element={<Preview />} />
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/builder/:resumeId' element={<ResumeBuilder />} />
          
          {/* Layout Wrapper Example (if needed for shared UI) */}
          <Route path='/app' element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
