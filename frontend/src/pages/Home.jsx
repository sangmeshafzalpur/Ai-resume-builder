import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { auth } from '../utils/auth'
import CanvasBackground from '../components/home/CanvasBackground'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonial from '../components/home/Testimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  const navigate = useNavigate()

  const user = auth.getCurrentUser()

  const handleGetStarted = () => {
    navigate('/dashboard')
  }

  const handleLogin = () => {
    navigate('/auth')
  }

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-transparent relative">
      <CanvasBackground />
      {/* Main Content */}
      <div className="relative z-10">
        <Hero 
          onGetStarted={handleGetStarted} 
          onLogin={handleLogin} 
          user={user} 
          onLogout={handleLogout} 
        />
        <Features/>
        <Testimonial/>
        <CallToAction onGetStarted={handleGetStarted} />
        <Footer/>
      </div>
    </div>
  )
}

export default Home
