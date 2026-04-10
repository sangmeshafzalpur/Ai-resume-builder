import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../../utils/auth'

/**
 * A wrapper component that protects routes, redirecting unauthenticated
 * users to the landing page.
 */
const PrivateRoute = () => {
  const user = auth.getCurrentUser()
  
  // If no user exists, redirect to login (root path)
  if (!user) {
    return <Navigate to="/" replace />
  }

  // If user exists, render the child routes/components
  return <Outlet />
}

export default PrivateRoute
