import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

const CallToAction = ({ onGetStarted }) => {
  return (
    <div className='relative w-full max-w-6xl mx-auto px-6 mt-32 mb-24 group'>
      {/* 1. Background "Aura" - Glows behind the card */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#0f172a]/80 backdrop-blur-2xl p-1 md:p-[2px]">
        
        {/* 2. Animated Border Beam Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-[30%] h-full group-hover:animate-[move-border_3s_linear_infinite] opacity-0 group-hover:opacity-100" 
             style={{ filter: 'blur(8px)', left: '-30%' }} />

        <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-[2.9rem] px-8 md:px-20 py-16 md:py-24 overflow-hidden">
          
          {/* 3. Floating Geometric Shapes (Glassmorphism) */}
          <div className="absolute -top-10 -left-10 size-40 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-20 size-60 bg-blue-600/10 rounded-full blur-[100px]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
              <Sparkles className="size-4 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">AI-Powered Excellence</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8 leading-[1.1]">
              Elevate your career <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400">
                in one single click.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-medium">
              Don't let a generic resume hold you back. Use our intelligent builder to 
              generate industry-specific content that beats the ATS every time.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <button 
                onClick={onGetStarted}
                className="group/btn relative px-10 py-5 bg-white text-black font-bold rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
              >
                Get Started Free
                <ArrowRight className="size-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-5 text-slate-300 font-semibold hover:text-white transition-colors">
                View Live Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Animation Logic */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes move-border {
          0% { left: -30%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}} />
    </div>
  )
}

export default CallToAction