import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Award, GraduationCap, Briefcase, ShieldCheck } from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-[0_30px_100px_rgba(0,0,0,0.1)] overflow-hidden font-sans text-slate-800 border border-slate-100 p-20">

            {/* Centered Header */}
            <header className="text-center mb-20 space-y-6">
                <div className="space-y-4">
                    <h1 className="text-6xl font-light tracking-[-0.02em] text-slate-900 border-b-2 border-slate-100 pb-8 inline-block px-12">
                        {data.personal_info?.full_name?.toUpperCase() || "NAME SURNAME"}
                    </h1>
                    <p className="text-sm font-black uppercase tracking-[0.6em] text-slate-400">
                        {data.personal_info?.profession || "PROFESSIONAL TITLE"}
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={12} style={{ color: accentColor }} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={12} style={{ color: accentColor }} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={12} style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                </div>
            </header>

            <main className="space-y-16">
                {/* Executive Summary */}
                {data.professional_summary && (
                    <section className="max-w-3xl mx-auto text-center space-y-6">
                        <div className="flex items-center justify-center gap-6">
                            <div className="h-px w-12 bg-slate-100" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Executive Summary</h2>
                            <div className="h-px w-12 bg-slate-100" />
                        </div>
                        <p className="text-xl font-medium leading-relaxed text-slate-700 italic px-10">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Professional Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="space-y-10">
                        <div className="flex items-center gap-6">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 whitespace-nowrap">Professional Mandate</h2>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>
                        <div className="space-y-12">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="grid grid-cols-12 gap-10 group">
                                    <div className="col-span-3 text-right">
                                        <span className="text-[10px] font-black tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 uppercase">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <div className="col-span-9 space-y-4">
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase group-hover:text-indigo-600 transition-colors">
                                                {exp.position}
                                            </h3>
                                            <p className="text-sm font-black uppercase tracking-widest mt-1" style={{ color: accentColor }}>{exp.company}</p>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed font-medium pl-6 border-l-2 border-slate-50">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Strategic Projects */}
                {data.project && data.project.length > 0 && (
                    <section className="space-y-10">
                        <div className="flex items-center gap-6">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 whitespace-nowrap">Strategic Initiatives</h2>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            {data.project.map((p, index) => (
                                <div key={index} className="space-y-2 p-4 bg-slate-50/50 rounded-xl border border-slate-100 shadow-sm">
                                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">{p.name}</h3>
                                    <p className="text-[10px] text-slate-500 font-medium leading-snug line-clamp-3 italic">{p.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-16">
                    {/* Left Column */}
                    <div className="space-y-16">
                        {/* Expertise */}
                        {data.skills && data.skills.length > 0 && (
                            <section className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 whitespace-nowrap">Strategic Expertise</h2>
                                    <div className="h-px flex-1 bg-slate-100" />
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {data.skills.map((skill, index) => (
                                        <div key={index} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-700">
                                            <div className="size-1 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                                            <span>{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {data.languages && data.languages.length > 0 && (
                            <section className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 whitespace-nowrap">Global Range</h2>
                                    <div className="h-px flex-1 bg-slate-100" />
                                </div>
                                <div className="space-y-4">
                                    {data.languages.map((lang, index) => (
                                        <div key={index} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
                                            <span>{lang.name}</span>
                                            <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-slate-400">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-16">
                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 whitespace-nowrap">Academic Rigor</h2>
                                    <div className="h-px flex-1 bg-slate-100" />
                                </div>
                                <div className="space-y-8">
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="space-y-2">
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{edu.degree}</h3>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">{edu.institution}</p>
                                            <p className="text-[9px] font-black tracking-widest text-slate-300">{formatDate(edu.graduation_date)}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {data.certifications && data.certifications.length > 0 && (
                            <section className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 whitespace-nowrap">Validation</h2>
                                    <div className="h-px flex-1 bg-slate-100" />
                                </div>
                                <div className="space-y-6">
                                    {data.certifications.map((cert, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <ShieldCheck size={18} className="text-slate-300 mt-0.5 shrink-0" />
                                            <div>
                                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">{cert.name}</h3>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{cert.issuer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-24 pt-12 border-t border-slate-100 flex justify-between items-end">
                <div className="space-y-2">
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-200">Confidential Executive Profile</p>
                    <div className="h-1 w-20 bg-slate-50" />
                </div>
                {data.personal_info?.linkedin && (
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 group cursor-pointer hover:text-indigo-600 transition-colors">
                        <Linkedin size={14} className="text-slate-300 group-hover:text-indigo-400" />
                        <span>Digital Verification</span>
                    </div>
                )}
            </footer>
        </div>
    );
};

export default ExecutiveTemplate;
