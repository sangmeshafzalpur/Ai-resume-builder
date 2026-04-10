import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ children }) => {
    return (
        <header className='sticky top-0 z-50 w-full px-6 py-4'>
            <div className='max-w-7xl mx-auto'>
                <nav className='glass-card flex items-center justify-between px-6 py-3 rounded-2xl border-white/10'>
                    <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
                        <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase hidden sm:block">
                            Sigma<span className="text-indigo-400">CV</span>
                        </span>
                    </Link>

                    <div className='flex items-center gap-6'>
                        <div className='hidden md:flex items-center gap-8'>
                            <Link to="/home" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Features</Link>
                            <Link to="/dashboard" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Templates</Link>
                        </div>
                        <div className='h-6 w-[1px] bg-slate-800' />
                        <div className='flex items-center gap-4'>
                            {children}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}


export default Navbar
