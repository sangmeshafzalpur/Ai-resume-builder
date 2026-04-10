import { Lock, Mail, Loader2, CheckCircle, AlertCircle, Eye, EyeOff, Fingerprint } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/auth'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: 'john@example.com', password: 'password123' })

  useEffect(() => {
    if (auth.isLoggedIn()) navigate('/app')
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      auth.login(formData.email, formData.password)
      setSuccess('Identity Verified!')
      setTimeout(() => navigate('/app'), 1500)
    } catch (err) {
      setError(err.message || 'Verification Failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F0F2F5] p-6 font-sans">
      {/* Abstract Background Shapes */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="relative w-full max-w-[420px]">
        {/* The Claymorphic Card */}
        <div className="bg-[#F0F2F5] rounded-[3rem] p-10 
          shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] 
          border border-white/40">
          
          {/* Brand Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center
              shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),inset_-4px_-4px_8px_rgba(0,0,0,0.2),8px_8px_16px_rgba(249,115,22,0.3)]
              rotate-3">
              <Fingerprint size={40} color="white" strokeWidth={1.5} />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Nexus ID</h1>
            <p className="text-slate-500 text-sm font-semibold tracking-wide mt-1">SECURE TERMINAL ACCESS</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Status Feedback */}
            {success && (
              <div className="text-center p-3 bg-white rounded-2xl shadow-inner border border-green-100 animate-bounce">
                <span className="text-green-600 text-xs font-black uppercase tracking-tighter italic">{success}</span>
              </div>
            )}
            {error && (
              <div className="text-center p-3 bg-white rounded-2xl shadow-inner border border-red-100">
                <span className="text-red-500 text-xs font-black uppercase tracking-tighter italic">{error}</span>
              </div>
            )}

            {/* Input Groups */}
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="USER IDENTIFIER"
                  className="w-full pl-12 pr-6 py-4 bg-[#F0F2F5] rounded-2xl outline-none
                    shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
                    focus:shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff]
                    text-slate-700 text-xs font-bold placeholder:text-slate-400 transition-all"
                  required 
                />
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>

              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="ACCESS ENCRYPTION"
                  className="w-full pl-12 pr-12 py-4 bg-[#F0F2F5] rounded-2xl outline-none
                    shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
                    focus:shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff]
                    text-slate-700 text-xs font-bold placeholder:text-slate-400 transition-all"
                  required 
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 py-4 rounded-2xl bg-[#F0F2F5] text-slate-800 font-black uppercase tracking-[0.2em] text-sm
                shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]
                active:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
                hover:text-orange-600 transition-all flex items-center justify-center gap-3 border border-white/20"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Authorize"
              )}
            </button>
          </form>

          {/* Minimalist Footer */}
          <div className="mt-12 flex justify-center gap-6">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login