import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Award, GraduationCap, Briefcase, Code, Terminal, Cpu, Github, ExternalLink, Zap } from "lucide-react";

const TechnicalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-[210mm] mx-auto bg-slate-950 min-h-[297mm] shadow-2xl overflow-hidden font-mono text-slate-300 border border-slate-800">

            {/* Command Line Header */}
            <header className="p-12 bg-slate-900 border-b border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 flex gap-2">
                    <div className="size-3 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="size-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                    <div className="size-3 rounded-full bg-green-500/20 border border-green-500/40" />
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                            <Terminal size={14} />
                            <span>/users/{data.personal_info?.full_name?.toLowerCase().replace(' ', '_') || 'root'}</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tight text-white uppercase">
                            {data.personal_info?.full_name || "RESUME.BIN"}
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="px-4 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-emerald-400 flex items-center gap-2">
                            <Zap size={12} />
                            <span>System.{data.personal_info?.profession || "Engineer"}</span>
                        </div>
                        <div className="px-4 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-[10px] font-bold text-slate-400 flex items-center gap-2">
                            <MapPin size={12} />
                            <span>{data.personal_info?.location || "Remote / Node"}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-slate-800 pt-6">
                        {data.personal_info?.email && (
                            <div className="flex items-center gap-3 text-[10px] tracking-tight">
                                <Mail size={12} className="text-slate-500" />
                                <span className="hover:text-emerald-400 transition-colors cursor-pointer">{data.personal_info.email}</span>
                            </div>
                        )}
                        {data.personal_info?.github && (
                            <div className="flex items-center gap-3 text-[10px] tracking-tight">
                                <Github size={12} className="text-slate-500" />
                                <span className="hover:text-emerald-400 transition-colors cursor-pointer">github.com/profile</span>
                            </div>
                        )}
                        {data.personal_info?.linkedin && (
                            <div className="flex items-center gap-3 text-[10px] tracking-tight">
                                <Linkedin size={12} className="text-slate-500" />
                                <span className="hover:text-emerald-400 transition-colors cursor-pointer">linkedin.com/in/user</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Decorative Grid BG */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </header>

            <div className="p-12 grid grid-cols-12 gap-12">

                {/* Main: Experience & Projects */}
                <main className="col-span-12 lg:col-span-8 space-y-12">

                    {/* Summary / Readme */}
                    {data.professional_summary && (
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-500">
                                <Code size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">readme.md</span>
                            </div>
                            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl relative group overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: accentColor }} />
                                <p className="text-sm leading-relaxed text-slate-400 italic">
                                    "{data.professional_summary}"
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Experience / History */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="space-y-8">
                            <div className="flex items-center gap-3 text-slate-500">
                                <Briefcase size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">employment_history</span>
                            </div>
                            <div className="space-y-10">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="group relative pl-8 border-l border-slate-800">
                                        <div className="absolute -left-1.5 top-1 size-3 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-emerald-500 transition-colors" />
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-black text-white tracking-tight">{exp.position}</h3>
                                                <p className="text-sm font-bold mt-1" style={{ color: accentColor }}>@ {exp.company}</p>
                                            </div>
                                            <div className="text-[10px] font-black bg-slate-900 text-slate-500 px-3 py-1 rounded-md border border-slate-800">
                                                {formatDate(exp.start_date)} : {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-400 leading-relaxed whitespace-pre-line bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                                            {exp.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section className="space-y-8">
                            <div className="flex items-center gap-3 text-slate-500">
                                <Cpu size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">compiled_projects</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {data.project.map((p, index) => (
                                    <div key={index} className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl group hover:border-emerald-500/50 hover:bg-emerald-500/[0.02] transition-all duration-500">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="size-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-emerald-400 transition-colors">
                                                <Code size={16} />
                                            </div>
                                            <ExternalLink size={14} className="text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <h3 className="font-black text-white text-sm mb-3 group-hover:text-emerald-400 transition-colors">{p.name}</h3>
                                        <p className="text-[11px] text-slate-500 leading-relaxed">
                                            {p.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Sidebar: Skills & Meta */}
                <aside className="col-span-12 lg:col-span-4 space-y-12">

                    {/* Skills Grid */}
                    {data.skills && data.skills.length > 0 && (
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-slate-500">
                                <Terminal size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">tech_stack</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {data.skills.map((skill, index) => (
                                    <div key={index} className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white hover:border-slate-600 transition-all text-center">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-slate-500">
                                <GraduationCap size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">education</span>
                            </div>
                            <div className="space-y-6">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="p-4 bg-slate-900/30 border border-slate-800 rounded-2xl space-y-2">
                                        <p className="text-xs font-black text-white">{edu.degree}</p>
                                        <p className="text-[10px] text-emerald-500">{edu.institution}</p>
                                        <div className="pt-2 flex justify-between text-[8px] text-slate-500 uppercase tracking-widest font-black">
                                            <span>{formatDate(edu.graduation_date)}</span>
                                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certs & Awards */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-slate-500">
                                <Award size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">credentials</span>
                            </div>
                            <div className="space-y-4">
                                {data.certifications.map((cert, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="size-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-emerald-500/50 transition-colors">
                                            <Award size={14} className="text-slate-500 group-hover:text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-white leading-tight mb-1">{cert.name}</h3>
                                            <p className="text-[9px] text-slate-500 uppercase tracking-widest">{cert.issuer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-slate-500">
                                <Terminal size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">language_modules</span>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {data.languages.map((lang, index) => (
                                    <div key={index} className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500">
                                        <span className="text-emerald-500/70">{lang.name}</span>
                                        <div className="h-px flex-1 mx-4 bg-slate-800/50" />
                                        <span>{lang.level || 'v1.0'}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>
            </div>

            {/* Terminal Status Bar */}
            <footer className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">
                <div className="flex gap-6">
                    <span className="flex items-center gap-2"><div className="size-1 rounded-full bg-emerald-500" /> System Online</span>
                    <span>UTF-8</span>
                    <span>Line 297, Col 210</span>
                </div>
                <div className="flex gap-4">
                    <span style={{ color: accentColor }}>{data.personal_info?.full_name?.toUpperCase() || 'ROOT'}@PORTFOLIO</span>
                </div>
            </footer>
        </div>
    );
};

export default TechnicalTemplate;

