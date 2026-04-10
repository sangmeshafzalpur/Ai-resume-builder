import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Award, GraduationCap, Briefcase, Folder, User } from "lucide-react";

const SidebarTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-[0_30px_100px_rgba(0,0,0,0.1)] flex overflow-hidden font-sans border border-slate-100">

            {/* Sidebar: High Contrast */}
            <aside className="w-[80mm] shrink-0 p-12 text-white flex flex-col space-y-12 relative overflow-hidden"
                style={{ backgroundColor: accentColor }}>

                {/* Decorative Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[150%] h-[150%] rotate-12 border-[40px] border-white rounded-full" />
                </div>

                {/* Profile Image */}
                <div className="relative z-10">
                    {data.personal_info?.image ? (
                        <div className="relative group">
                            <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                            <img
                                src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)}
                                alt="Profile"
                                className="w-full aspect-square object-cover rounded-3xl border-4 border-white/30 relative z-10 shadow-2xl"
                            />
                        </div>
                    ) : (
                        <div className="w-full aspect-square bg-white/10 rounded-3xl border-4 border-white/20 flex items-center justify-center relative z-10">
                            <User size={64} className="text-white/20" />
                        </div>
                    )}
                </div>

                <div className="space-y-12 relative z-10">
                    {/* Contact Section */}
                    <section className="space-y-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/10 pb-3">Contact</h2>
                        <div className="space-y-5">
                            {data.personal_info?.email && (
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black uppercase text-white/30">Email</p>
                                    <p className="text-sm font-medium break-all">{data.personal_info.email}</p>
                                </div>
                            )}
                            {data.personal_info?.phone && (
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black uppercase text-white/30">Phone</p>
                                    <p className="text-sm font-medium">{data.personal_info.phone}</p>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black uppercase text-white/30">Location</p>
                                    <p className="text-sm font-medium">{data.personal_info.location}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Expertise Section */}
                    {data.skills && data.skills.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/10 pb-3">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/5 whitespace-nowrap">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications (Brief) */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/10 pb-3">Validations</h2>
                            <div className="space-y-4">
                                {data.certifications.map((cert, index) => (
                                    <div key={index} className="space-y-1">
                                        <p className="text-xs font-black uppercase leading-tight">{cert.name}</p>
                                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{cert.issuer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-20 space-y-20 bg-white">

                {/* Header */}
                <header className="space-y-4">
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                        {data.personal_info?.full_name || "NAME SURNAME"}
                    </h1>
                    <p className="text-xl font-medium tracking-[0.2em] uppercase" style={{ color: accentColor }}>
                        {data.personal_info?.profession || "PROFESSIONAL TITLE"}
                    </p>
                    <div className="h-1 w-24 bg-slate-900" />
                </header>

                {/* Professional Statement */}
                {data.professional_summary && (
                    <section className="space-y-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200">Perspective</h2>
                        <p className="text-xl font-light text-slate-500 leading-relaxed italic border-l-4 border-slate-50 pl-10 py-2">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Experience Chronology */}
                {data.experience && data.experience.length > 0 && (
                    <section className="space-y-12">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200">Chronology</h2>
                        <div className="space-y-16">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="group relative">
                                    <div className="absolute -left-10 top-0 bottom-0 w-px bg-slate-50 group-hover:bg-slate-100 transition-colors" />
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{exp.position}</h3>
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                {formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-lg font-bold italic" style={{ color: accentColor }}>{exp.company}</p>
                                        <p className="text-slate-500 font-light leading-relaxed text-base">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Academic Background */}
                {data.education && data.education.length > 0 && (
                    <section className="space-y-10">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200">Academic</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {data.education.map((edu, index) => (
                                <div key={index} className="space-y-2 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight">{edu.degree}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{edu.institution}</p>
                                    <p className="text-[9px] font-bold text-slate-300 italic">{formatDate(edu.graduation_date)}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
};

export default SidebarTemplate;
