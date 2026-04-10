import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User, Camera, Trash2 } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const fields = [
        { key: 'full_name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Jonathan Doe', required: true },
        { key: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'hello@design.com', required: true },
        { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+1 (555) 000-0000' },
        { key: 'location', label: 'Location', icon: MapPin, type: 'text', placeholder: 'San Francisco, CA' },
        { key: 'profession', label: 'Profession', icon: BriefcaseBusiness, type: 'text', placeholder: 'Senior Product Designer' },
        { key: 'linkedin', label: 'Linkedin Profile', icon: Linkedin, type: 'url', placeholder: 'linkedin.com/in/username' },
        { key: 'website', label: 'Personal Website', icon: Globe, type: 'url', placeholder: 'portfolio.me' }
    ]

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header section (already managed by ResumeBuilder, but adding specific sub-header if needed) */}

            {/* Image Upload Section */}
            <div className='flex flex-col sm:flex-row items-center gap-8 p-6 rounded-3xl bg-white/5 border border-white/5 shadow-inner'>
                <div className="relative group">
                    <label className="cursor-pointer block">
                        {data.image ? (
                            <div className="relative size-24 rounded-[2rem] overflow-hidden border-2 border-indigo-500/30 group-hover:border-indigo-500 transition-all shadow-2xl">
                                <img
                                    src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                                    alt='Portrait'
                                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="text-white size-6" />
                                </div>
                            </div>
                        ) : (
                            <div className='size-24 rounded-[2rem] bg-slate-900 border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/5 transition-all'>
                                <Camera className='size-8 mb-1' />
                                <span className="text-[10px] font-black uppercase tracking-widest">Upload</span>
                            </div>
                        )}
                        <input type='file' accept="image/jpeg, image/png" className="hidden" onChange={(e) => handleChange("image", e.target.files[0])} />
                    </label>

                    {data.image && (
                        <button
                            onClick={() => handleChange("image", null)}
                            className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                        >
                            <Trash2 size={12} />
                        </button>
                    )}
                </div>

                <div className="flex-1 space-y-4">
                    <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">Profile Portrait</h4>
                        <p className="text-xs text-slate-500 font-medium">Use a high-quality professional photo for better impact.</p>
                    </div>

                    {typeof data.image === 'object' && (
                        <div className='flex items-center gap-4 py-2 px-4 rounded-2xl bg-black/20 border border-white/5'>
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">AI Background Removal</p>
                            </div>
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input type="checkbox" className='sr-only peer' onChange={() => setRemoveBackground(prev => !prev)} checked={removeBackground} />
                                <div className='w-10 h-5 bg-slate-800 rounded-full peer peer-checked:bg-emerald-500 transition-colors duration-300'></div>
                                <div className='absolute left-1 top-1 size-3 bg-slate-400 rounded-full transition-all duration-300 peer-checked:translate-x-5 peer-checked:bg-white'></div>
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => {
                    const Icon = field.icon;
                    const isFullWidth = field.key === 'full_name' || field.key === 'profession';

                    return (
                        <div key={field.key} className={`space-y-2 ${isFullWidth ? 'md:col-span-2' : ''}`}>
                            <label className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1'>
                                <Icon className='size-3.5 text-indigo-400/60' />
                                {field.label}
                                {field.required && <span className='text-rose-500'>*</span>}
                            </label>
                            <div className="relative group">
                                <input
                                    type={field.type}
                                    value={data[field.key] || ""}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    className='w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium'
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                                <div className="absolute inset-0 rounded-2xl border border-indigo-500/0 group-focus-within:border-indigo-500/20 pointer-events-none transition-all" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PersonalInfoForm
