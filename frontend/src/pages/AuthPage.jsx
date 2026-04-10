import { Lock, Mail, User2Icon, Loader2, Eye, EyeOff, User, ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/auth'
import GlobeCanvas from '../components/auth/GlobeCanvas'

const AuthPage = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    email: 'john@example.com',
    password: 'password123'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (isLogin) {
        await auth.login(formData.email, formData.password)
        setSuccess('Login successful! Redirecting...')
        setTimeout(() => navigate('/home'), 1000)
      } else {
        await auth.register(formData.name, formData.email, formData.password)
        setSuccess('Registration successful! You can now login.')
        setTimeout(() => {
          setIsLogin(true)
          setSuccess('')
        }, 2000)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='min-h-screen bg-[#020617] flex overflow-hidden font-sans'>

      {/* Left side: Premium Image Section */}
      <div className='hidden lg:flex lg:w-3/5 relative overflow-hidden group'>
        
        {/* 3D Parallax Globe Background */}
        <GlobeCanvas />
        
        {/* Foreground Content over the Globe */}
        <div className='relative z-20 h-full flex flex-col justify-end p-20 max-w-2xl pointer-events-none'>
          <div className='h-1 w-24 bg-indigo-500 mb-8' />
          <h1 className='text-7xl font-black text-white tracking-tighter leading-none mb-6 uppercase'>
            Elevate Your <br /> <span className='text-indigo-400'>Career</span> Path
          </h1>
          <p className='text-xl text-slate-300 font-light leading-relaxed mb-12 border-l-2 border-white/10 pl-8'>
            Design an editorial-grade resume in minutes. Let our premium industry-standard templates open doors for your next big move.
          </p>

          <div className='flex gap-12'>
            <div className='space-y-1'>
              <p className='text-2xl font-black text-white'>100K+</p>
              <p className='text-xs font-bold uppercase tracking-widest text-slate-500'>Global Users</p>
            </div>
            <div className='space-y-1'>
              <p className='text-2xl font-black text-white'>50+</p>
              <p className='text-xs font-bold uppercase tracking-widest text-slate-500'>Pro Templates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Auth Form */}
      <div className='w-full lg:w-2/5 flex items-center justify-center p-8 bg-[#020617] relative'>
        {/* Subtle background glow */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full' />

        <div className='w-full max-w-md relative z-10'>
          {/* Glassmorphic Form Card */}
          <div className='glass-card rounded-[2rem] p-10 space-y-8'>
            <div className='flex justify-between items-center'>
              <div className='w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20'>
                <User className='text-white size-6' />
              </div>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className='text-xs font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors'
              >
                {isLogin ? 'Create Account' : 'Back to Login'}
              </button>
            </div>

            <div className='space-y-2'>
              <h2 className='text-4xl font-black text-white tracking-tight uppercase'>
                {isLogin ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className='text-slate-400 font-medium'>
                {isLogin ? 'Provide your credentials to continue' : 'Enter your details to create a profile'}
              </p>
            </div>

            {/* Error/Success Feedbacks */}
            {error && (
              <div className='p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm'>
                <div className='w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse' />
                {error}
              </div>
            )}
            {success && (
              <div className='p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm'>
                <div className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse' />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
              {!isLogin && (
                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1'>Name</label>
                  <div className='relative group'>
                    <User2Icon size={18} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors' />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className='pl-12 !bg-slate-900/50'
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1'>Email Address</label>
                <div className='relative group'>
                  <Mail size={18} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors' />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className='pl-12 !bg-slate-900/50'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1'>Password</label>
                <div className='relative group'>
                  <Lock size={18} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors' />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className='pl-12 pr-12 !bg-slate-900/50'
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors'
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className='w-full btn-primary h-14 rounded-2xl flex items-center justify-center gap-3 text-lg font-black uppercase tracking-widest'
              >
                {loading ? (
                  <Loader2 size={24} className='animate-spin' />
                ) : (
                  <>
                    {isLogin ? 'Authenticate' : 'Register'}
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <p className='text-center text-slate-600 text-xs font-medium'>
              {isLogin ? "Secured by industry-standard encryption protocols" : "By registering, you agree to our professional terms"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
