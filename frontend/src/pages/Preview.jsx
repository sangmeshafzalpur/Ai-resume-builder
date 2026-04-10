import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { resumeApi } from '../utils/resumeApi'
import ResumePreview from '../components/ResumePreview'
import { Download, Loader2, AlertCircle } from 'lucide-react'
import { exportPDF } from '../utils/pdfExport'

const Preview = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const previewRef = useRef(null)

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await resumeApi.getResumeById(resumeId)
        setResumeData(data)
        document.title = `${data.title || 'Resume'} - Professional Profile`
      } catch (error) {
        console.error('Failed to load resume for preview:', error)
        setNotFound(true)
        document.title = 'Resume Not Found'
      } finally {
        setLoading(false)
      }
    }

    fetchResume()
  }, [resumeId])

  const handleDownload = async () => {
    if (!previewRef.current || !resumeData) return
    setIsDownloading(true)
    try {
      await exportPDF(previewRef.current, resumeData.title || 'Resume')
    } catch (err) {
      console.error('Download failed:', err)
      alert('High-fidelity download failed. Falling back to browser print.')
      window.print()
    } finally {
      setIsDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4 text-slate-400'>
        <Loader2 className='size-10 animate-spin text-indigo-500' />
        <p className='font-bold uppercase tracking-widest text-[10px]'>Retrieving Profile...</p>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className='min-h-screen bg-[#020617] flex items-center justify-center p-6'>
        <div className='glass-card p-12 rounded-[3rem] border-white/5 text-center max-w-lg'>
          <AlertCircle className='size-16 text-rose-500 mx-auto mb-6 opacity-80' />
          <h1 className='text-4xl font-black text-white mb-4 tracking-tight'>Access Revoked</h1>
          <p className='text-slate-400 font-medium leading-relaxed mb-10'>
            This resume is either private, has been moved, or does not exist in our secure registry.
          </p>
          <a href="/dashboard" className='btn-secondary px-8 py-3 rounded-2xl'>Return to Hub</a>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#020617] text-slate-300 selection:bg-indigo-500/30 overflow-x-hidden'>
      {/* Background Ambience */}
      <div className='fixed inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute -top-1/4 -right-1/4 size-[1000px] bg-indigo-500/5 blur-[200px]' />
        <div className='absolute -bottom-1/4 -left-1/4 size-[1000px] bg-violet-500/5 blur-[200px]' />
      </div>

      <div className='max-w-5xl mx-auto px-6 py-12 relative z-10'>
        {/* Header Section */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-12'>
          <div className='space-y-1'>
            <h1 className='text-4xl font-black text-white tracking-tighter'>
              {resumeData.title || 'Untitled Resume'}
            </h1>
            <div className='flex items-center gap-3'>
              <span className='size-2 rounded-full bg-indigo-500' />
              <p className='text-xs font-black uppercase tracking-[0.2em] text-slate-500'>
                Secure Deployment Profile
              </p>
            </div>
          </div>

          <div className='flex items-center gap-4 w-full sm:w-auto'>
            <div className='hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-indigo-400'>
              <div className='size-1.5 rounded-full bg-indigo-400 animate-pulse' />
              <span>Verified Link</span>
            </div>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className='flex-1 sm:flex-none btn-primary px-8 py-3.5 shadow-indigo-500/30 active:scale-95 disabled:opacity-50 transition-all rounded-2xl'
            >
              {isDownloading ? (
                <Loader2 className='size-4 animate-spin' />
              ) : (
                <Download className='size-4' />
              )}
              <span className='font-bold'>{isDownloading ? 'Capturing...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>

        {/* Document Frame */}
        <div className='rounded-[3rem] border border-white/5 bg-slate-900/40 p-4 sm:p-12 shadow-2xl overflow-hidden relative group'>
          <div className='absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity opacity-50' />

          <div
            ref={previewRef}
            className="bg-white rounded-xl shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden scale-[0.99] sm:scale-100 origin-top"
          >
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>

        {/* Footer */}
        <div className='mt-16 text-center space-y-4 pb-12'>
          <p className='text-[10px] font-black uppercase tracking-[0.4em] text-slate-600'>
            Crafted with Resume Builder Pro Premium
          </p>
          <div className='flex justify-center gap-6'>
            <div className='size-1 bg-slate-800 rounded-full' />
            <div className='size-1 bg-slate-800 rounded-full' />
            <div className='size-1 bg-slate-800 rounded-full' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
