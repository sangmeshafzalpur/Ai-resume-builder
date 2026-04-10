import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Award, Briefcase, GraduationCap, Layout } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-[0_30px_100px_rgba(0,0,0,0.1)] overflow-hidden font-sans text-slate-800">
            <div className="grid grid-cols-12 min-h-[297mm]">

                {/* Left Profile Sidebar */}
                <aside className="col-span-4 bg-slate-50 p-12 flex flex-col items-center text-center space-y-12">

                    {/* Image Area */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-slate-200 rounded-full scale-110 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                        {data.personal_info?.image ? (
                            <img
                                src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)}
                                alt="Profile"
                                className="w-48 h-48 object-cover rounded-full border-8 border-white shadow-2xl relative z-10"
                            />
                        ) : (
                            <div className="w-48 h-48 bg-white rounded-full border-8 border-slate-100 flex items-center justify-center relative z-10 shadow-xl">
                                <Layout size={48} className="text-slate-200" />
                            </div>
                        )}
                    </div>

                    {/* Contact Info */}
                    <section className="w-full space-y-8">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Connection</h2>
                        <div className="space-y-4 text-xs font-medium text-slate-500">
                            {data.personal_info?.email && (
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Email</p>
                                    <p className="break-all">{data.personal_info.email}</p>
                                </div>
                            )}
                            {data.personal_info?.phone && (
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Phone</p>
                                    <p>{data.personal_info.phone}</p>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Location</p>
                                    <p>{data.personal_info.location}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Skills Sidebar */}
                    {data.skills && data.skills.length > 0 && (
                        <section className="w-full space-y-8">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Aptitudes</h2>
                            <div className="flex flex-wrap justify-center gap-3">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400 shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages Sidebar */}
                    {data.languages && data.languages.length > 0 && (
                        <section className="w-full space-y-8">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Languages</h2>
                            <div className="space-y-4">
                                {data.languages.map((lang, index) => (
                                    <div key={index} className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">{lang.name}</p>
                                        <p className="text-[9px] font-bold text-slate-400 italic uppercase">{lang.level}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Content Area */}
                <main className="col-span-8 p-20 space-y-20">

                    {/* Hero Section */}
                    <header className="space-y-4">
                        <h1 className="text-7xl font-thin tracking-tighter text-slate-900 leading-none">
                            {data.personal_info?.full_name?.split(' ')[0] || "Name"}<br />
                            <span className="font-black uppercase tracking-tighter">{data.personal_info?.full_name?.split(' ').slice(1).join(' ') || "Surname"}</span>
                        </h1>
                        <div className="h-2 w-24" style={{ backgroundColor: accentColor }} />
                        <p className="text-xl font-light text-slate-500 tracking-widest uppercase py-4">
                            {data.personal_info?.profession || "PROFESSIONAL"}
                        </p>
                    </header>

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="relative">
                            <div className="absolute -left-10 top-0 bottom-0 w-px bg-slate-100" />
                            <p className="text-lg font-light leading-relaxed text-slate-600">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience Section */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="space-y-12">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Professional Path</h2>
                            <div className="space-y-16">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{exp.position}</h3>
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                {formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-lg font-medium italic" style={{ color: accentColor }}>{exp.company}</p>
                                        <p className="text-slate-500 font-light leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects / Education Grid */}
                    <div className="grid grid-cols-2 gap-16 pt-8 border-t border-slate-50">
                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section className="space-y-8">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Academic</h2>
                                <div className="space-y-8">
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="space-y-2">
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{edu.degree}</h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{edu.institution}</p>
                                            <p className="text-[9px] font-black text-slate-200 uppercase">{formatDate(edu.graduation_date)}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {data.certifications && data.certifications.length > 0 && (
                            <section className="space-y-8">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Certifications</h2>
                                <div className="space-y-6">
                                    {data.certifications.map((cert, index) => (
                                        <div key={index} className="space-y-1">
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{cert.name}</h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cert.issuer}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MinimalImageTemplate;