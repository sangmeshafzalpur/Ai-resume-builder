import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { resumeApi } from '../utils/resumeApi'
import {
  ArrowLeft,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
  Download,
  Share2,
  Globe,
  Lock,
  Loader2,
} from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import CertificationsForm from '../components/CertificationsForm'
import LanguagesForm from '../components/LanguagesForm'
import { exportPDF } from '../utils/pdfExport'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const navigate = useNavigate()
  const resumeRef = useRef(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    skills: [],
    project: [],
    certifications: [],
    languages: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: 'personal', name: 'Personal', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles },
    { id: 'certifications', name: 'Certifications', icon: GraduationCap },
    { id: 'languages', name: 'Languages', icon: Globe },
  ]

  const activeSection = sections[activeSectionIndex]

  // Initialize resume data when component mounts or resumeId changes
  useEffect(() => {
    if (!resumeId) {
      navigate('/dashboard')
      return
    }

    const fetchResume = async () => {
      try {
        const data = await resumeApi.getResumeById(resumeId)
        document.title = `Editing: ${data.title}`
        // Ensure all arrays/objects are safely defaulted
        setResumeData({
          ...data,
          personal_info: data.personal_info || {},
          experience: data.experience || [],
          education: data.education || [],
          skills: data.skills || [],
          project: data.project || [],
          certifications: data.certifications || [],
          languages: data.languages || [],
        })
      } catch (error) {
        console.error('Failed to load resume:', error)
        alert('Resume not found or access denied.')
        navigate('/dashboard')
      } finally {
        // isLoading removed as it was unused
      }
    }

    fetchResume()
  }, [resumeId, navigate])

  const calculateStrength = () => {
    let score = 0
    const info = resumeData.personal_info

    // Personal Info (Max 25)
    if (info?.full_name) score += 5
    if (info?.email) score += 5
    if (info?.phone) score += 5
    if (info?.location) score += 5
    if (info?.image) score += 5

    // Summary (Max 15)
    if (resumeData.professional_summary?.length > 50) score += 15
    else if (resumeData.professional_summary?.length > 0) score += 5

    // Experience (Max 20)
    if (resumeData.experience?.length >= 2) score += 20
    else if (resumeData.experience?.length === 1) score += 10

    // Education (Max 15)
    if (resumeData.education?.length >= 1) score += 15

    // Skills (Max 15)
    if (resumeData.skills?.length >= 5) score += 15
    else if (resumeData.skills?.length >= 1) score += 5

    // Others (Max 10)
    if (resumeData.project?.length >= 1) score += 5
    if (resumeData.certifications?.length >= 1) score += 5

    return Math.min(score, 100)
  }

  const downloadPDF = async () => {
    if (!resumeRef.current) return
    setIsDownloading(true)
    try {
      // Use the actual paper container for capture
      const paperElement = document.getElementById('resume-content-paper');
      const fileName = (resumeData.title || 'My_Resume').replace(/\s+/g, '_');

      await exportPDF(paperElement || resumeRef.current, fileName)

      // UX confirmation
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl z-[100] animate-in slide-in-from-bottom-10';
      notification.innerText = '✓ PDF DOWNLOADED SUCCESSFULLY';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);

    } catch (err) {
      console.error('Export Error:', err);
      const wantPrint = window.confirm('Smart Download encountered a browser restriction. Would you like to use the system print menu instead?');
      if (wantPrint) window.print();
    } finally {
      setIsDownloading(false)
    }
  }

  const saveResume = async () => {
    setIsSaving(true)
    try {
      await resumeApi.updateResume(resumeId, resumeData)
      return true
    } catch (error) {
      console.error('Error saving resume:', error)
      return false
    } finally {
      setIsSaving(false)
    }
  }

  const handleShare = async () => {
    if (!resumeData.public) {
      alert('Please make your resume public before sharing.')
      return
    }

    const shareUrl = `${window.location.origin}/view/${resumeData._id}`
    const shareText = `Check out my resume: ${resumeData.title || 'My Resume'}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: resumeData.title || 'My Resume',
          text: shareText,
          url: shareUrl,
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        alert('Shareable link copied to clipboard!')
      }
      navigate(`/view/${resumeData._id}`)
    } catch (err) {
      console.error('Share failed:', err)
      if (err.name !== 'AbortError') {
        alert('Failed to share. Please try again.')
      }
    }
  }

  const handleSaveChanges = async () => {
    const success = await saveResume()
    if (success) {
      alert('Resume saved successfully!')
    } else {
      alert('Failed to save resume. Please try again.')
    }
  }

  const strength = calculateStrength()

  return (
    <div className='min-h-screen bg-[#020617] text-slate-300 selection:bg-indigo-500/30'>
      {/* Top Header / Actions */}
      <div className='sticky top-0 z-40 w-full px-6 py-4 bg-[#020617]/80 backdrop-blur-md border-b border-white/5'>
        <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6'>
          <div className="flex items-center gap-6">
            <Link
              to={'/dashboard'}
              className='group flex items-center gap-3 text-slate-500 hover:text-white transition-all'
            >
              <div className='p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all'>
                <ArrowLeft className='size-5' />
              </div>
              <span className='font-bold text-sm uppercase tracking-widest text-slate-400'>Dashboard</span>
            </Link>

            <div className="h-8 w-[1px] bg-slate-800 hidden sm:block" />

            <div>
              <h1 className="text-lg font-black text-white leading-none mb-1 truncate max-w-[200px]">
                {resumeData.title || 'Untitled Resume'}
              </h1>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-indigo-500 rounded-full animate-pulse' />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                  Live Editing
                </p>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-4 w-full sm:w-auto justify-end'>
            {/* Strength Meter Mini */}
            <div className='hidden md:flex flex-col items-end gap-1 mr-4'>
              <div className='flex items-center gap-2'>
                <span className='text-[10px] font-black uppercase text-slate-500'>Content Strength</span>
                <span className={`text-[10px] font-black ${strength > 70 ? 'text-emerald-400' : strength > 40 ? 'text-amber-400' : 'text-rose-400'}`}>{strength}%</span>
              </div>
              <div className='w-32 h-1 bg-slate-900 rounded-full overflow-hidden'>
                <div
                  className={`h-full transition-all duration-1000 ${strength > 70 ? 'bg-emerald-500' : strength > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                  style={{ width: `${strength}%` }}
                />
              </div>
            </div>

            {/* Public/Private Toggle */}
            <button
              onClick={() =>
                setResumeData((prev) => ({ ...prev, public: !prev.public }))
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${resumeData.public
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-white'
                }`}
            >
              {resumeData.public ? <Globe size={14} /> : <Lock size={14} />}
              <span>{resumeData.public ? 'Public' : 'Private'}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              disabled={!resumeData.public}
              className={`p-2.5 rounded-xl transition-all ${resumeData.public
                ? 'bg-slate-900 border border-slate-800 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400'
                : 'bg-slate-950 border border-white/5 text-slate-700 cursor-not-allowed'
                }`}
            >
              <Share2 size={18} />
            </button>

            {/* Download Button */}
            <button
              onClick={downloadPDF}
              disabled={isDownloading}
              className='btn-primary px-6 py-2.5 text-xs'
            >
              {isDownloading ? (
                <div className='flex items-center gap-2'>
                  <Loader2 size={16} className='animate-spin' />
                  <span>Generating PDF...</span>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <Download size={16} />
                  <span>Download PDF</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 mt-12 pb-24'>
        <div className='grid lg:grid-cols-12 gap-12'>
          {/* Editor Side */}
          <div className='lg:col-span-5'>
            <div className='sticky top-32 glass-card rounded-[2.5rem] border-white/5 shadow-2xl overflow-hidden'>
              {/* Progress Bar */}
              <div className='h-1.5 w-full bg-white/5 relative'>
                <div
                  className='absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-1000'
                  style={{
                    width: `${((activeSectionIndex + 1) / sections.length) * 100}%`,
                  }}
                />
              </div>

              <div className='p-8 sm:p-10'>
                {/* Section Header */}
                <div className='flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12'>
                  <div className='flex items-center gap-5'>
                    <div className='p-4 rounded-[1.25rem] bg-indigo-500/10 text-indigo-400 shadow-inner'>
                      {activeSection.icon &&
                        React.createElement(activeSection.icon, { size: 28 })}
                    </div>
                    <div>
                      <h2 className='text-2xl font-black text-white tracking-tight'>
                        {activeSection.name}
                      </h2>
                      <p className='text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1'>
                        Step {activeSectionIndex + 1} <span className="text-slate-700 mx-1">/</span> {sections.length}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2 bg-black/40 p-2 rounded-2xl border border-white/5 w-full xl:w-auto'>
                    <TemplateSelector
                      selectedTemplate={resumeData.template}
                      onChange={(val) =>
                        setResumeData((prev) => ({
                          ...prev,
                          template: val,
                        }))
                      }
                    />
                    <div className='w-[1px] h-6 bg-slate-800 mx-1' />
                    <ColorPicker
                      selectedColor={resumeData.accent_color}
                      onChange={(val) =>
                        setResumeData((prev) => ({
                          ...prev,
                          accent_color: val,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Content Strength Widget */}
                <div className='mb-10 p-5 bg-indigo-500/5 rounded-3xl border border-indigo-500/10 flex items-center justify-between'>
                  <div className='space-y-1'>
                    <p className='text-xs font-black uppercase text-indigo-400 tracking-widest'>Profile Strength</p>
                    <p className='text-[10px] font-medium text-slate-500'>Complete all sections for a better score</p>
                  </div>
                  <div className='relative w-14 h-14'>
                    <svg className='w-full h-full -rotate-90' viewBox='0 0 36 36'>
                      <path
                        className='text-slate-900 stroke-current'
                        strokeWidth='3'
                        fill='none'
                        d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      />
                      <path
                        className={`${strength > 70 ? 'text-emerald-500' : strength > 40 ? 'text-indigo-500' : 'text-rose-500'} stroke-current transition-all duration-1000 ease-out`}
                        strokeWidth='3'
                        strokeDasharray={`${strength}, 100`}
                        strokeLinecap='round'
                        fill='none'
                        d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      />
                    </svg>
                    <div className='absolute inset-0 flex items-center justify-center text-[10px] font-black text-white'>
                      {strength}%
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className='min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500'>
                  {activeSection.id === 'personal' && (
                    <PersonalInfoForm
                      data={resumeData.personal_info}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal_info: data,
                        }))
                      }
                      removeBackground={removeBackground}
                      setRemoveBackground={setRemoveBackground}
                    />
                  )}

                  {activeSection.id === 'summary' && (
                    <ProfessionalSummaryForm
                      data={resumeData.professional_summary}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          professional_summary: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === 'experience' && (
                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          experience: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === 'education' && (
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          education: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === 'projects' && (
                    <ProjectForm
                      data={resumeData.project || []}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          project: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === 'skills' && (
                    <SkillsForm
                      data={resumeData.skills || []}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          skills: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === 'certifications' && (
                    <CertificationsForm
                      data={resumeData.certifications || []}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          certifications: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === 'languages' && (
                    <LanguagesForm
                      data={resumeData.languages || []}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          languages: data,
                        }))
                      }
                    />
                  )}
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className='w-full btn-primary py-4 mt-8'
                >
                  {isSaving ? (
                    <div className='flex items-center gap-2'>
                      <Loader2 size={20} className='animate-spin' />
                      <span>Synchronizing...</span>
                    </div>
                  ) : 'Synchronize Changes'}
                </button>

                {/* Navigation */}
                <div className='flex items-center justify-between mt-12 pt-8 border-t border-white/5'>
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                    }
                    className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeSectionIndex === 0
                      ? 'text-slate-700 cursor-not-allowed'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    disabled={activeSectionIndex === 0}
                  >
                    <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => {
                      if (activeSectionIndex < sections.length - 1) {
                        setActiveSectionIndex((prev) => prev + 1)
                      } else {
                        handleSaveChanges()
                        setTimeout(() => navigate(`/view/${resumeId}`), 500)
                      }
                    }}
                    className='group flex items-center gap-3 px-8 py-3 rounded-2xl text-sm font-black uppercase tracking-widest bg-white text-slate-900 hover:bg-indigo-50 transition-all active:scale-95 shadow-xl shadow-white/5'
                  >
                    <span>
                      {activeSectionIndex === sections.length - 1
                        ? 'Complete'
                        : 'Next Phase'}
                    </span>
                    <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Side */}
          <div className='lg:col-span-7'>
            <div className='sticky top-32'>
              <div className='mb-6 flex items-center justify-between px-4'>
                <div className='flex items-center gap-4'>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className='text-[10px] font-black uppercase tracking-[0.3em] text-slate-500'>
                      Live Dynamic Preview
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${resumeData.public
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-500 border border-white/5'
                      }`}
                  >
                    {resumeData.public ? <Globe size={12} /> : <Lock size={12} />}
                    <span>{resumeData.public ? 'Public Access' : 'Private Mode'}</span>
                  </div>
                </div>

                <button
                  onClick={downloadPDF}
                  disabled={isDownloading}
                  className='flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors'
                >
                  {isDownloading ? <Loader2 size={14} className='animate-spin' /> : <Download size={14} />}
                  <span>Quick Export</span>
                </button>
              </div>

              <div className='rounded-[2rem] border border-white/5 bg-slate-900/50 p-2 overflow-hidden overflow-y-auto max-h-[calc(100vh-250px)] custom-scrollbar'>
                <div
                  ref={resumeRef}
                  className='bg-white rounded-[1.8rem] overflow-hidden'
                >
                  <ResumePreview
                    data={resumeData}
                    template={resumeData.template}
                    accentColor={resumeData.accent_color}
                  />
                </div>
              </div>

              <p className="text-center text-[10px] font-bold text-slate-600 mt-6 uppercase tracking-[0.2em]">
                Scroll to explore full design
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default ResumeBuilder