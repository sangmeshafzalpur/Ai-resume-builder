import { Check, Layout } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const templates = [
        {
            id: "classic",
            name: "Classic",
            preview: "A clean, traditional resume format with clear sections and professional typography"
        },
        {
            id: "modern",
            name: "Modern",
            preview: "Sleek design with strategic use of color and modern font choice"
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            preview: "Minimal design with a single image and clean typography"
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "Ultra-clean design that puts your content front and center"
        },
        // --- NEW TEMPLATES ---
        {
            id: "executive",
            name: "Executive",
            preview: "Designed for leadership roles with emphasis on high-level achievements and impact"
        },
        {
            id: "creative",
            name: "Creative",
            preview: "Bold layout with unique visual elements for design and arts professionals"
        },
        {
            id: "sidebar",
            name: "Professional Sidebar",
            preview: "Two-column layout that separates contact info and skills from work history"
        },
        {
            id: "technical",
            name: "Technical",
            preview: "Optimized for developers and engineers to highlight project stacks and certifications"
        }
    ]

    return (
        <div className='relative'>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/5'
            >
                <Layout size={14} />
                <span className='max-sm:hidden'>Select Style</span>
            </button>

            {isOpen && (
                <div className='absolute top-full right-0 w-80 max-h-[500px] overflow-y-auto p-4 mt-4 z-50 glass-card bg-[#0f172a]/90 backdrop-blur-xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] custom-scrollbar animate-in fade-in slide-in-from-top-4 duration-300'>
                    <div className="space-y-3">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => { onChange(template.id); setIsOpen(false) }}
                                className={`relative p-5 border rounded-2xl cursor-pointer transition-all group ${selectedTemplate === template.id ?
                                        "border-indigo-500/50 bg-indigo-500/10 shadow-inner shadow-indigo-500/20" :
                                        "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10"
                                    }`}
                            >
                                {selectedTemplate === template.id && (
                                    <div className='absolute top-4 right-4'>
                                        <div className='size-5 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50'>
                                            <Check className='w-3 h-3 text-white' />
                                        </div>
                                    </div>
                                )}

                                <div className='space-y-1.5'>
                                    <h4 className={`text-xs font-black uppercase tracking-widest ${selectedTemplate === template.id ? 'text-indigo-400' : 'text-white'}`}>
                                        {template.name}
                                    </h4>
                                    <p className='text-[10px] leading-relaxed text-slate-500 font-medium line-clamp-2 italic'>
                                        {template.preview}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TemplateSelector