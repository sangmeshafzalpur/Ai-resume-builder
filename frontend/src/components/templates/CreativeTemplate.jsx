import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Award, GraduationCap, Briefcase, Star, Zap, Cpu, Sparkles } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    const renderImage = () => {
        if (!data.personal_info?.image) return (
            <div className="size-40 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transform -rotate-6 shadow-2xl">
                <Sparkles className="size-12 text-white/20" />
            </div>
        );
        const imgSrc = typeof data.personal_info.image === 'string'
            ? data.personal_info.image
            : URL.createObjectURL(data.personal_info.image);
        return (
            <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <img
                    src={imgSrc}
                    alt="Profile"
                    className="relative size-44 rounded-[2.5rem] object-cover border-[6px] border-white shadow-2xl transform rotate-3 group-hover:rotate-0 transition-all duration-500 ease-out"
                />
            </div>
        );
    };

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-[0_0_100px_rgba(0,0,0,0.1)] overflow-hidden font-sans text-slate-900 border border-slate-100">

            {/* Header: Editorial Style */}
            <header className="relative grid grid-cols-12 overflow-hidden">
                {/* Left Accent Bar */}
                <div className="col-span-1" style={{ backgroundColor: accentColor }}>
                    <div className="h-full flex flex-col items-center justify-center gap-12 py-10 opacity-30">
                        <div className="size-1.5 rounded-full bg-white" />
                        <div className="size-1.5 rounded-full bg-white" />
                        <div className="size-1.5 rounded-full bg-white" />
                    </div>
                </div>

                {/* Main Header Content */}
                <div className="col-span-11 relative py-20 px-12 bg-slate-900 text-white">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
                        <div className="space-y-4 max-w-2xl">
                            <h1 className="text-7xl font-black tracking-[-0.05em] leading-[0.8] uppercase animate-in slide-in-from-left duration-700">
                                {data.personal_info?.full_name?.split(' ')[0] || "FIRST"}
                                <span className="block italic text-indigo-400 outline-text" style={{ WebkitTextStroke: `1px ${accentColor}`, color: 'transparent' }}>
                                    {data.personal_info?.full_name?.split(' ')[1] || "LAST"}
                                </span>
                            </h1>
                            <div className="h-0.5 w-32 bg-white/20" />
                            <p className="text-sm font-black uppercase tracking-[0.4em] text-slate-400">
                                {data.personal_info?.profession || "Designation / Industry"}
                            </p>
                        </div>
                        {renderImage()}
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.02] -skew-x-12 transform translate-x-1/2" />
                    <div className="absolute -bottom-20 -left-20 size-80 rounded-full blur-[100px] opacity-20" style={{ backgroundColor: accentColor }} />
                </div>
            </header>

            <div className="grid grid-cols-12">
                {/* Side Content: Contact & Meta */}
                <aside className="col-span-1 w-full" style={{ backgroundColor: accentColor }}>
                    <div className="h-full flex flex-col items-center justify-end py-12 gap-8 text-white/40">
                        <Mail size={16} />
                        <Phone size={16} />
                        <Linkedin size={16} />
                    </div>
                </aside>

                <div className="col-span-11 px-16 py-16 grid grid-cols-12 gap-16">

                    {/* Left Column: Narrative & Experience */}
                    <div className="col-span-12 lg:col-span-7 space-y-16">

                        {/* Summary */}
                        {data.professional_summary && (
                            <section className="relative">
                                <div className="absolute -left-10 top-0 text-slate-100 font-black text-8xl -z-10 select-none">
                                    01
                                </div>
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-4">
                                    <span className="h-px w-8 bg-slate-200" />
                                    Perspective
                                </h2>
                                <p className="text-xl font-medium leading-relaxed text-slate-700 italic border-l-4 pl-8" style={{ borderColor: accentColor }}>
                                    "{data.professional_summary}"
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <section className="relative">
                                <div className="absolute -left-10 top-0 text-slate-100 font-black text-8xl -z-10 select-none">
                                    02
                                </div>
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10 flex items-center gap-4">
                                    <span className="h-px w-8 bg-slate-200" />
                                    Trajectory
                                </h2>
                                <div className="space-y-12">
                                    {data.experience.map((exp, index) => (
                                        <div key={index} className="group">
                                            <div className="flex justify-between items-end mb-4">
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">
                                                    {exp.position}
                                                </h3>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-1">
                                                    {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="h-px w-4 bg-indigo-500" />
                                                <p className="text-sm font-black uppercase tracking-widest" style={{ color: accentColor }}>{exp.company}</p>
                                            </div>
                                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm text-slate-600 leading-relaxed group-hover:bg-white group-hover:shadow-xl transition-all duration-300">
                                                {exp.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {data.project && data.project.length > 0 && (
                            <section className="relative">
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10 flex items-center gap-4">
                                    <span className="h-px w-8 bg-slate-200" />
                                    Artifacts
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {data.project.map((p, index) => (
                                        <div key={index} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Sparkles className="size-12" style={{ color: accentColor }} />
                                            </div>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="size-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor + '10' }}>
                                                    <Star className="size-5" style={{ color: accentColor }} />
                                                </div>
                                                <h3 className="font-black text-slate-900 uppercase tracking-tight">{p.name}</h3>
                                            </div>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                {p.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Skills, Education, Info */}
                    <div className="col-span-12 lg:col-span-5 space-y-16">

                        {/* Contact Meta */}
                        <section className="p-10 bg-slate-950 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-8">Node / Access</h2>
                            <div className="space-y-6">
                                {data.personal_info?.email && (
                                    <div className="group flex items-center gap-4">
                                        <div className="size-9 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <Mail size={14} className="text-indigo-400" />
                                        </div>
                                        <span className="text-xs font-bold tracking-tight text-slate-300 break-all">{data.personal_info.email}</span>
                                    </div>
                                )}
                                {data.personal_info?.phone && (
                                    <div className="group flex items-center gap-4">
                                        <div className="size-9 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <Phone size={14} className="text-indigo-400" />
                                        </div>
                                        <span className="text-xs font-bold tracking-tight text-slate-300">{data.personal_info.phone}</span>
                                    </div>
                                )}
                                {data.personal_info?.location && (
                                    <div className="group flex items-center gap-4">
                                        <div className="size-9 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <MapPin size={14} className="text-indigo-400" />
                                        </div>
                                        <span className="text-xs font-bold tracking-tight text-slate-300">{data.personal_info.location}</span>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Skills: Visual Grid */}
                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-8 px-4 flex items-center gap-4">
                                    Logic
                                    <div className="h-px flex-1 bg-slate-100" />
                                </h2>
                                <div className="flex flex-wrap gap-2 px-4">
                                    {data.skills.map((skill, index) => (
                                        <div key={index} className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all cursor-default">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-10 px-4 flex items-center gap-4">
                                    Foundations
                                    <div className="h-px flex-1 bg-slate-100" />
                                </h2>
                                <div className="space-y-8 px-4">
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="relative group">
                                            <div className="absolute -left-4 top-0 h-full w-1 bg-slate-100 group-hover:bg-indigo-500 transition-colors" />
                                            <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight leading-none mb-2">{edu.degree}</h3>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{edu.institution}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {data.languages && data.languages.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-8 px-4 flex items-center gap-4">
                                    Linguistics
                                    <div className="h-px flex-1 bg-slate-100" />
                                </h2>
                                <div className="space-y-4 px-4">
                                    {data.languages.map((lang, index) => (
                                        <div key={index} className="flex justify-between items-center group">
                                            <span className="text-xs font-black uppercase tracking-tight text-slate-700">{lang.name}</span>
                                            <div className="flex-1 border-b-2 border-dotted border-slate-100 mx-4" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-500 transition-colors">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>
                </div>
            </div>

            {/* Footer Style Accent */}
            <div className="h-10 w-full" style={{ backgroundColor: accentColor }} />
        </div>
    );
};

export default CreativeTemplate;
