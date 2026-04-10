import { FilePenIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, Check, ChevronLeft, ChevronRight, Layout, Download, Loader2, LogOut } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/auth'
import { resumeApi } from '../utils/resumeApi'
import { exportPDF } from '../utils/pdfExport'
import ResumePreview from '../components/ResumePreview'

const templates = [
  {
    id: "classic",
    name: "Classic",
    preview: "A clean, traditional resume format with clear sections and professional typography",
    color: "#3B82F6"
  },
  {
    id: "modern",
    name: "Modern",
    preview: "Sleek design with strategic use of color and modern font choice",
    color: "#8B5CF6"
  },
  {
    id: "minimal-image",
    name: "Minimal Image",
    preview: "Minimal design with a single image and clean typography",
    color: "#14B8A6"
  },
  {
    id: "minimal",
    name: "Minimal",
    preview: "Ultra-clean design that puts your content front and center",
    color: "#6366F1"
  },
  {
    id: "executive",
    name: "Executive",
    preview: "Designed for leadership roles with emphasis on high-level achievements",
    color: "#F59E0B"
  },
  {
    id: "creative",
    name: "Creative",
    preview: "Bold layout with unique visual elements for design and arts professionals",
    color: "#EC4899"
  },
  {
    id: "sidebar",
    name: "Professional Sidebar",
    preview: "Two-column layout that separates contact info and skills from work history",
    color: "#10B981"
  },
  {
    id: "technical",
    name: "Technical",
    preview: "Optimized for developers and engineers to highlight project stacks",
    color: "#EF4444"
  }
]

const Dashboard = () => {
  const colors = ["#9333ea", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]
  const [allResumes, setAllResumes] = useState([])
  const [loadingResumes, setLoadingResumes] = useState(true)
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [createStep, setCreateStep] = useState(1) // Step 1: Choose template, Step 2: Enter title

  // Quick Export State
  const [exportingId, setExportingId] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const exportRef = useRef(null)

  const navigate = useNavigate()

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }

  const quickExport = async (resumeItem) => {
    setExportingId(resumeItem._id)
    // Small delay to ensure the hidden preview is rendered with the right data
    setTimeout(async () => {
      try {
        if (exportRef.current) {
          await exportPDF(exportRef.current, resumeItem.title || 'Resume')
        }
      } catch {
        alert('Quick export failed. Please use the builder to download.')
      } finally {
        setExportingId(null)
      }
    }, 500)
  }

  useEffect(() => {
    const currentUser = auth.getCurrentUser()
    if (!currentUser) {
      navigate('/')
    }
  }, [navigate])

  const loadAllResumes = async () => {
    try {
      setLoadingResumes(true)
      const resumes = await resumeApi.getResumes()
      setAllResumes(resumes)
    } catch (error) {
      console.error('Failed to load resumes:', error)
      setAllResumes([])
    } finally {
      setLoadingResumes(false)
    }
  }

  const createResume = async (event) => {
    event.preventDefault()
    if (!selectedTemplate) {
      alert('Please select a template first')
      return
    }
    setShowCreateResume(false)
    setCreateStep(1)

    const templateObj = templates.find(t => t.id === selectedTemplate)
    const accentColor = templateObj ? templateObj.color : "#3B82F6"

    try {
      setIsCreating(true)
      // POST to MongoDB - gets a real _id back from the server
      const created = await resumeApi.createResume({
        title: title || 'New Resume',
        personal_info: {},
        professional_summary: "",
        experience: [],
        education: [],
        skills: [],
        project: [],
        certifications: [],
        languages: [],
        template: selectedTemplate,
        accent_color: accentColor,
        public: false,
      })

      setAllResumes(prev => [created, ...prev])
      setSelectedTemplate('')
      setTitle('')
      navigate(`/builder/${created._id}`)
    } catch (error) {
      alert('Failed to create resume. Please try again.')
      console.error(error)
    } finally {
      setIsCreating(false)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setShowUploadResume(false)

    if (!resume) {
      alert('Please select a PDF file to upload')
      return
    }

    try {
      const created = await resumeApi.createResume({
        title: title || `${resume.name.split('.')[0]} Resume`,
        personal_info: {},
        professional_summary: "",
        experience: [],
        education: [],
        skills: [],
        project: [],
        certifications: [],
        languages: [],
        template: "classic",
        accent_color: "#3B82F6",
        public: false,
      })

      setAllResumes(prev => [created, ...prev])
      navigate(`/builder/${created._id}`)
    } catch (error) {
      alert('Failed to create resume. Please try again.')
      console.error(error)
    }
  }

  const editTitle = async (event) => {
    event.preventDefault()
    if (title.trim()) {
      try {
        const updated = await resumeApi.updateResume(editResumeId, { title })
        setAllResumes(prev => prev.map(r => r._id === editResumeId ? updated : r))
      } catch (error) {
        console.error('Failed to rename resume:', error)
      }
    }
    setEditResumeId('')
    setTitle('')
  }

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm("Are you sure you want to delete this resume?")
    if (confirm) {
      try {
        await resumeApi.deleteResume(resumeId)
        setAllResumes(prev => prev.filter(r => r._id !== resumeId))
      } catch (error) {
        alert('Failed to delete resume. Please try again.')
        console.error(error)
      }
    }
  }

  // Load resumes from backend on mount
  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className='min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30'>
      <div className='max-w-7xl mx-auto px-6 py-12'>

        {/* Header Section */}
        <div className='mb-16 flex flex-col md:flex-row items-end justify-between gap-8'>
          <div className="space-y-2">
            <h1 className='text-5xl font-black tracking-tighter text-white'>
              Your <span className="gradient-text">Resumes</span>
            </h1>
            <p className='text-slate-400 font-medium text-lg'>
              Manage and create professional resumes with ease.
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => setShowCreateResume(true)}
              className='flex-1 md:flex-none btn-primary'
            >
              <PlusIcon size={20} />
              <span>Create New</span>
            </button>
            <button
              onClick={() => setShowUploadResume(true)}
              className='flex-1 md:flex-none btn-secondary'
            >
              <UploadCloudIcon size={20} />
              <span>Upload PDF</span>
            </button>
            <button
              onClick={handleLogout}
              className='flex-1 md:flex-none btn-secondary bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 hover:text-white transition-all'
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Resume Grid */}
        {loadingResumes ? (
          <div className='flex flex-col items-center justify-center py-32 gap-4'>
            <Loader2 size={40} className='animate-spin text-indigo-400' />
            <p className='text-slate-500 font-semibold uppercase tracking-widest text-xs'>Loading your resumes...</p>
          </div>
        ) : allResumes.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-32 gap-6 border-2 border-dashed border-white/5 rounded-[3rem]'>
            <div className='size-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center'>
              <FilePenIcon size={36} className='text-indigo-400' />
            </div>
            <div className='text-center space-y-2'>
              <h3 className='text-white font-black text-xl uppercase tracking-tight'>No Resumes Yet</h3>
              <p className='text-slate-500 text-sm font-medium max-w-xs mx-auto leading-relaxed'>Your personal workspace is empty. Create your first professional resume to get started.</p>
            </div>
            <button onClick={() => setShowCreateResume(true)} className='btn-primary'>
              <PlusIcon size={18} />
              <span>Create your first resume</span>
            </button>
          </div>
        ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {allResumes.map((resumeItem, index) => {
            const baseColor = templates.find(t => t.id === resumeItem.template)?.color || colors[index % colors.length];
            return (
              <div
                key={index}
                onClick={() => navigate(`/builder/${resumeItem._id}`)}
                className='group relative aspect-[3/4] glass-card rounded-[2.5rem] p-6 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden border-white/5 hover:border-indigo-500/30'
              >
                {/* Accent Glow */}
                <div
                  className='absolute -top-24 -right-24 size-48 opacity-20 blur-[60px] transition-opacity group-hover:opacity-40'
                  style={{ backgroundColor: baseColor }}
                />

                {/* Content */}
                <div className="h-full flex flex-col justify-between relative z-10">
                  <div className="space-y-4">
                    <div
                      className='size-14 rounded-2xl flex items-center justify-center shadow-inner'
                      style={{ backgroundColor: `${baseColor}20`, color: baseColor }}
                    >
                      <FilePenIcon size={28} />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight'>
                        {resumeItem.title}
                      </h3>
                      <p className='text-sm text-slate-500 font-medium mt-1 uppercase tracking-widest'>
                        {resumeItem.template} Template
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Updated</span>
                      <span className='text-xs font-bold text-slate-400'>
                        {new Date(resumeItem.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => quickExport(resumeItem)}
                        disabled={exportingId === resumeItem._id}
                        className='p-2.5 bg-slate-800/50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all border border-white/5'
                        title="Quick Export PDF"
                      >
                        {exportingId === resumeItem._id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Download size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => { setEditResumeId(resumeItem._id); setTitle(resumeItem.title) }}
                        className='p-2.5 bg-slate-800/50 hover:bg-white hover:text-slate-900 rounded-xl transition-all border border-white/5'
                      >
                        <PencilIcon size={16} />
                      </button>
                      <button
                        onClick={() => deleteResume(resumeItem._id)}
                        className='p-2.5 bg-slate-800/50 hover:bg-rose-500 hover:text-white rounded-xl transition-all border border-white/5'
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        )}

        {/* Hidden Preview for Quick Export */}
        <div className="fixed -left-[2000px] top-0 pointer-events-none opacity-0">
          <div id="resume-preview" ref={exportRef}>
            {exportingId && (
              <ResumePreview
                data={allResumes.find(r => r._id === exportingId)}
                template={allResumes.find(r => r._id === exportingId)?.template}
                accentColor={allResumes.find(r => r._id === exportingId)?.accent_color}
              />
            )}
          </div>
        </div>


        {/* Create Resume Modal - Step 1: Choose Template */}
        {showCreateResume && createStep === 1 && (
          <div className='fixed inset-0 bg-[#020617]/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300'>
            <div
              onClick={e => e.stopPropagation()}
              className='relative glass-card border-white/10 shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] rounded-[3rem] w-full max-w-4xl p-8 sm:p-12 overflow-hidden'
            >
              {/* Modal Glows */}
              <div className='absolute -top-32 -right-32 size-64 bg-indigo-600/20 blur-[100px]' />
              <div className='absolute -bottom-32 -left-32 size-64 bg-purple-600/20 blur-[100px]' />

              <div className="relative z-10">
                {/* Step Indicator */}
                <div className='flex items-center gap-4 mb-10'>
                  <div className='flex items-center gap-3 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20'>
                    <div className='size-6 rounded-full bg-indigo-500 text-white text-[10px] font-black flex items-center justify-center'>1</div>
                    <span className='text-xs font-black uppercase tracking-widest text-indigo-400'>Select Design</span>
                  </div>
                  <div className='h-[1px] w-12 bg-slate-800' />
                  <div className='flex items-center gap-3 px-4 py-2'>
                    <div className='size-6 rounded-full bg-slate-800 text-slate-500 text-[10px] font-black flex items-center justify-center'>2</div>
                    <span className='text-xs font-black uppercase tracking-widest text-slate-500'>Details</span>
                  </div>
                </div>

                <div className="mb-10">
                  <h2 className='text-4xl font-black tracking-tighter text-white mb-2'>Choose your <span className="gradient-text">Identity</span></h2>
                  <p className='text-slate-400 font-medium'>Select a professional template to reflect your career journey.</p>
                </div>

                {/* Template Grid */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar'>
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`group relative p-5 rounded-[2rem] cursor-pointer transition-all duration-500 border-2 ${selectedTemplate === template.id
                        ? 'border-indigo-500 bg-indigo-500/10 shadow-2xl shadow-indigo-500/20'
                        : 'border-white/5 bg-slate-950/40 hover:border-white/20 hover:bg-slate-900/40'
                        }`}
                    >
                      {/* Template Preview Icon */}
                      <div
                        className='aspect-square rounded-2xl mb-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-inner overflow-hidden relative'
                        style={{ backgroundColor: `${template.color}10` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                        <Layout
                          className='size-12 transition-all duration-500 group-hover:rotate-6'
                          style={{ color: template.color }}
                        />
                      </div>

                      <h4 className={`font-black text-xs uppercase tracking-widest mb-2 ${selectedTemplate === template.id ? 'text-indigo-400' : 'text-slate-400'}`}>
                        {template.name}
                      </h4>
                      <p className='text-[10px] leading-relaxed text-slate-500 line-clamp-2 font-medium'>
                        {template.preview}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className='flex items-center justify-between mt-12 pt-8 border-t border-white/5'>
                  <button
                    type="button"
                    onClick={() => { setShowCreateResume(false); setSelectedTemplate(''); setCreateStep(1) }}
                    className='text-sm font-bold text-slate-500 hover:text-white transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!selectedTemplate) {
                        alert('Please select a template')
                        return
                      }
                      setCreateStep(2)
                    }}
                    className={`btn-primary px-10 py-4 ${!selectedTemplate && 'opacity-50 pointer-events-none'}`}
                  >
                    <span>Next Phase</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                className='absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors hover:bg-white/5 rounded-full'
                onClick={() => { setShowCreateResume(false); setSelectedTemplate(''); setCreateStep(1) }}
              >
                <XIcon size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Create Resume Modal - Step 2: Enter Title */}
        {showCreateResume && createStep === 2 && (
          <div className='fixed inset-0 bg-[#020617]/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300'>
            <form
              onSubmit={createResume}
              onClick={e => e.stopPropagation()}
              className='relative glass-card border-white/10 shadow-2xl rounded-[3rem] w-full max-w-xl p-8 sm:p-12 overflow-hidden'
            >
              <div className='absolute -top-32 -right-32 size-64 bg-indigo-600/20 blur-[100px]' />

              <div className="relative z-10">
                {/* Step Indicator */}
                <div className='flex items-center gap-4 mb-10'>
                  <div className='flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20'>
                    <div className='size-6 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center'>
                      <Check size={12} />
                    </div>
                    <span className='text-xs font-black uppercase tracking-widest text-emerald-400'>Design Set</span>
                  </div>
                  <div className='h-[1px] w-12 bg-indigo-500' />
                  <div className='flex items-center gap-3 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20'>
                    <div className='size-6 rounded-full bg-indigo-500 text-white text-[10px] font-black flex items-center justify-center'>2</div>
                    <span className='text-xs font-black uppercase tracking-widest text-indigo-400'>Name Choice</span>
                  </div>
                </div>

                <div className="mb-10">
                  <h2 className='text-4xl font-black tracking-tighter text-white mb-2'>Give it a <span className="gradient-text">Name</span></h2>
                  <p className='text-slate-400 font-medium'>How should we identify this project?</p>
                </div>

                {/* Selected Template Badge */}
                <div className='flex items-center gap-4 mb-10 p-4 rounded-3xl bg-white/5 border border-white/5'>
                  <div
                    className='size-12 rounded-2xl flex items-center justify-center'
                    style={{ backgroundColor: `${templates.find(t => t.id === selectedTemplate)?.color}20` }}
                  >
                    <Layout
                      className='size-6'
                      style={{ color: templates.find(t => t.id === selectedTemplate)?.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className='text-sm font-black text-white uppercase tracking-widest'>
                      {templates.find(t => t.id === selectedTemplate)?.name}
                    </p>
                    <p className='text-xs text-slate-500 font-medium'>Selected Template</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCreateStep(1)}
                    className='text-xs font-bold text-indigo-400 hover:text-white transition-colors px-4 py-2 rounded-lg bg-indigo-400/10'
                  >
                    Change
                  </button>
                </div>

                <div className='space-y-6'>
                  <div className="space-y-3">
                    <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1'>Project Title</label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      type="text"
                      placeholder="e.g. Senior Product Designer 2024"
                      className='bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-500/20 placeholder:text-slate-700 text-white font-medium'
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className='flex items-center justify-between mt-12 pt-8 border-t border-white/5'>
                  <button
                    type="button"
                    onClick={() => setCreateStep(1)}
                    className='flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white transition-colors'
                  >
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className='btn-primary px-10 py-4 shadow-indigo-500/40 disabled:opacity-60'
                  >
                    {isCreating ? (
                      <><Loader2 size={18} className="animate-spin" /><span>Creating...</span></>
                    ) : (
                      <><span>Begin Journey</span><ChevronRight size={18} /></>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="button"
                className='absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors hover:bg-white/5 rounded-full'
                onClick={() => { setShowCreateResume(false); setSelectedTemplate(''); setCreateStep(1); setTitle('') }}
              >
                <XIcon size={24} />
              </button>
            </form>
          </div>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <div className='fixed inset-0 bg-[#020617]/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300'>
            <form
              onSubmit={uploadResume}
              onClick={e => e.stopPropagation()}
              className='relative glass-card border-white/10 shadow-2xl rounded-[3rem] w-full max-w-xl p-8 sm:p-12 overflow-hidden'
            >
              <div className='absolute -top-32 -right-32 size-64 bg-indigo-600/20 blur-[100px]' />

              <div className="relative z-10">
                <div className="mb-10">
                  <h2 className='text-4xl font-black tracking-tighter text-white mb-2'>Smart <span className="gradient-text">Import</span></h2>
                  <p className='text-slate-400 font-medium'>Upload your existing PDF to jumpstart your build.</p>
                </div>

                <div className='space-y-6'>
                  <div className="space-y-3">
                    <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1'>Resume Title</label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      type="text"
                      placeholder="e.g. Current Professional CV"
                      className='bg-white/5 border border-white/10 rounded-2xl px-12 py-4 focus:ring-4 focus:ring-indigo-500/20 placeholder:text-slate-700 text-white font-medium'
                      required
                    />
                  </div>

                  <div className='group'>
                    <label htmlFor="resume-input" className='cursor-pointer'>
                      <div className='flex flex-col items-center justify-center gap-4 border-2 border-white/10 border-dashed rounded-[2rem] p-12 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/5 transition-all'>
                        {resume ? (
                          <div className="text-center">
                            <Check className="size-12 text-emerald-400 mx-auto mb-4" />
                            <p className='text-indigo-400 font-black text-sm uppercase tracking-widest'>{resume.name}</p>
                          </div>
                        ) : (
                          <>
                            <div className="p-5 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                              <UploadCloud className='size-10 text-slate-500 group-hover:text-indigo-400 transition-colors' />
                            </div>
                            <p className='text-sm text-slate-500 font-bold uppercase tracking-widest'>Select PDF Package</p>
                          </>
                        )}
                      </div>
                    </label>
                    <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button
                    type="button"
                    onClick={() => { setShowUploadResume(false); setTitle(''); setResume(null) }}
                    className='flex-1 btn-secondary py-4'
                  >
                    Cancel
                  </button>
                  <button className='flex-[2] btn-primary py-4 shadow-indigo-500/40'>
                    Import Design
                  </button>
                </div>
              </div>

              <button
                type="button"
                className='absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors hover:bg-white/5 rounded-full'
                onClick={() => { setShowUploadResume(false); setTitle(''); setResume(null) }}
              >
                <XIcon size={24} />
              </button>
            </form>
          </div>
        )}

        {/* Edit Title Modal */}
        {editResumeId && (
          <div className='fixed inset-0 bg-[#020617]/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300'>
            <form
              onSubmit={editTitle}
              onClick={e => e.stopPropagation()}
              className='relative glass-card border-white/10 shadow-2xl rounded-[3rem] w-full max-w-md p-8 sm:p-12 overflow-hidden'
            >
              <div className='absolute -top-32 -right-32 size-64 bg-indigo-600/20 blur-[100px]' />

              <div className="relative z-10">
                <h2 className='text-3xl font-black tracking-tighter text-white mb-8'>Update <span className="gradient-text">Identity</span></h2>

                <div className='space-y-6'>
                  <div className="space-y-3">
                    <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1'>Resume Title</label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      type="text"
                      placeholder="New Title"
                      className='bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-500/20 text-white font-medium'
                      required
                    />
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button
                    type="button"
                    onClick={() => { setEditResumeId(''); setTitle('') }}
                    className='flex-1 btn-secondary py-4'
                  >
                    Cancel
                  </button>
                  <button className='flex-[2] btn-primary py-4'>
                    Apply Changes
                  </button>
                </div>
              </div>

              <button
                type="button"
                className='absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors hover:bg-white/5 rounded-full'
                onClick={() => { setEditResumeId(''); setTitle('') }}
              >
                <XIcon size={24} />
              </button>
            </form>
          </div>
        )}


      </div>
    </div>
  )
}

export default Dashboard