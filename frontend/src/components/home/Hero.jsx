import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Menu, X, Sparkles, LogOut } from 'lucide-react';

const Hero = ({ onGetStarted, user, onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);


    
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    

    return (
        <div className="relative min-h-screen bg-transparent text-white selection:bg-indigo-500/30 overflow-hidden">
            
            {/* 1. Futuristic Background Elements */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                
                {/* Main Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent blur-[120px] pointer-events-none" />
                <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-purple-600/5 blur-[120px] rounded-full" />
            </div>

            {/* 2. Glassmorphic Navbar */}
            <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 border-b ${scrolled ? 'bg-[#020617]/70 backdrop-blur-xl border-slate-800 py-3' : 'bg-transparent border-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 group">
                        <div className="size-9 bg-indigo-600 rounded-lg flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform shadow-lg shadow-indigo-600/20">
                            <span className="font-black text-lg">R</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">Ai Resume Builder</span>
                    </a>

                   

                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Welcome</span>
                                    <span className="text-sm font-bold text-slate-200 leading-none">{user.name}</span>
                                </div>
                                <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Logout">
                                    <LogOut size={20} />
                                </button>
                                <button onClick={onGetStarted} className="relative group px-6 py-2.5 bg-indigo-600 text-white text-[13px] font-bold rounded-xl hover:bg-indigo-500 active:scale-95 transition-all shadow-xl shadow-indigo-600/20">
                                    Get Started
                                </button>
                            </>
                        ) : (
                            <button onClick={onGetStarted} className="relative group px-6 py-2.5 bg-white text-black text-[13px] font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                                Get started
                            </button>
                        )}
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 text-slate-400">
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* 3. Hero Content */}
            <main className="relative z-10 pt-44 pb-20 px-6 flex flex-col items-center">
                
                {/* AI Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-10 animate-fade-in">
                    <Sparkles className="size-4 text-indigo-400" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-300">New: GPT-4o Resume Analysis</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-center max-w-5xl leading-[1] mb-8">
                    Land your next <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 drop-shadow-sm">
                        dream role with AI.
                    </span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl text-center max-w-2xl mb-12 leading-relaxed">
                    The only resume builder that thinks like a recruiter. Generate ATS-optimized content, sleek designs, and expert bullet points in seconds.
                </p>

                {/* CTA Group */}
                <div className="flex flex-col sm:flex-row items-center gap-5">
                    <button 
                        onClick={onGetStarted}
                        className="group relative px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30 flex items-center gap-3"
                    >
                        Start Building for Free
                        <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="flex items-center gap-3 px-10 py-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800 transition-colors text-slate-300 font-bold">
                        <Play className="size-5 fill-current" />
                        Watch Demo
                    </button>
                </div>

                {/* Social Proof (Redesigned Avatars) */}
                <div className="mt-16 flex flex-col items-center gap-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <img 
                                key={i}
                                src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                                className="size-10 rounded-full border-2 border-[#020617] object-cover ring-1 ring-slate-800" 
                                alt="User"
                            />
                        ))}
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex gap-1 mb-1">
                            {Array(5).fill(0).map((_, i) => (
                                <svg key={i} className="size-4 text-amber-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            ))}
                        </div>
                        <p className="text-[13px] text-slate-500 font-medium">
                            Loved by <span className="text-white">10,000+</span> ambitious professionals
                        </p>
                    </div>
                </div>

                {/* Logos Section */}
                <div className="mt-32 w-full max-w-5xl">
                    <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-10">Trusted by talent at</p>
                    <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 grayscale opacity-40 hover:opacity-100 transition-opacity duration-700">
                        {/* Map your companiesLogo SVGs here */}
                        <div className="h-7 w-32 bg-slate-800/50 rounded animate-pulse" />
                        <div className="h-7 w-32 bg-slate-800/50 rounded animate-pulse" />
                        <div className="h-7 w-32 bg-slate-800/50 rounded animate-pulse" />
                        <div className="h-7 w-32 bg-slate-800/50 rounded animate-pulse" />
                    </div>
                </div>
            </main>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[110] bg-[#020617] flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-white">
                    <X size={32} />
                </button>
                <a href="#" className="text-3xl font-bold" onClick={() => setMenuOpen(false)}>Home</a>
                <a href="#features" className="text-3xl font-bold" onClick={() => setMenuOpen(false)}>Features</a>
                <a href="#testimonials" className="text-3xl font-bold" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <Link to='/app' className="mt-4 px-10 py-4 bg-indigo-600 rounded-2xl font-bold">Get Started</Link>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');
                * { font-family: 'Poppins', sans-serif; }
                .animate-fade-in { animation: fadeIn 1s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}} />
        </div>
    )
}

export default Hero;