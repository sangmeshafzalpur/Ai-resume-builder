import { Sparkles, Lightbulb, Loader2 } from 'lucide-react'
import React, { useState } from 'react'

const ProfessionalSummaryForm = ({ data, onChange }) => {
  const [isRefining, setIsRefining] = useState(false)

  const handleAIRefine = () => {
    if (!data || data.length < 10) {
      alert("Please enter a basic summary first for the AI to refine.")
      return
    }

    setIsRefining(true)

    // Simulate AI processing
    setTimeout(() => {
      const refinedVersions = [
        `Results-driven professional with a proven track record of excellence. ${data} Focused on delivering high-impact solutions and driving organizational growth through strategic innovation.`,
        `Dynamic and visionary leader with extensive experience in the field. ${data} Dedicated to optimizing operational efficiency and fostering a culture of continuous improvement.`,
        `Highly skilled expert specializing in complex problem-solving. ${data} Committed to achieving superior results through data-driven strategies and collaborative leadership.`
      ]

      const randomVersion = refinedVersions[Math.floor(Math.random() * refinedVersions.length)]
      onChange(randomVersion)
      setIsRefining(false)
    }, 1500)
  }

  return (
    <div className='space-y-8 animate-in fade-in duration-700'>
      <div className='flex items-center justify-between'>
        <div className="space-y-1">
          <h3 className='text-sm font-black text-white uppercase tracking-widest'>Executive Summary</h3>
          <p className='text-[10px] font-bold text-slate-500 uppercase tracking-widest italic'>Craft your professional narrative</p>
        </div>
        <button
          onClick={handleAIRefine}
          disabled={isRefining}
          title="Enhance with AI"
          className='flex items-center gap-2.5 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/5 disabled:opacity-50'
        >
          {isRefining ? <Loader2 className='size-3.5 animate-spin' /> : <Sparkles className='size-3.5' />}
          {isRefining ? 'Refining...' : 'AI Refine'}
        </button>
      </div>

      <div className='space-y-6'>
        <div className="relative group">
          <textarea
            value={data || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={8}
            className='w-full bg-white/5 border border-white/10 rounded-3xl p-6 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 outline-none transition-all text-sm text-slate-300 placeholder:text-slate-700 font-medium leading-relaxed resize-none'
            placeholder='Write a compelling professional summary that highlights your key strengths, career trajectory, and unique value proposition...'
          />
          <div className="absolute inset-0 rounded-3xl border border-indigo-500/0 group-focus-within:border-indigo-500/20 pointer-events-none transition-all" />
        </div>

        <div className='flex items-start gap-4 p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10'>
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Lightbulb size={16} />
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500 font-medium uppercase tracking-wide">
            <span className="text-indigo-400 font-black">Pro Tip: </span>
            Keep it concise (3-4 sentences). Focus on quantifiable achievements and your most relevant high-level skills.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalSummaryForm
