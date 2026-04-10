import { GraduationCap, Plus, Trash2, School, BookOpen, Calendar, Award } from "lucide-react";
import React from "react";

const EducationForm = ({ data, onChange }) => {
    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: ""
        };

        onChange([...data, newEducation]);
    };

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">

            {/* Header */}
            <div className="flex items-center justify-between bg-white/5 p-6 rounded-[2rem] border border-white/5">
                <div className="space-y-1">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">
                        Academic background
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
                        Showcase your scholarly achievements
                    </p>
                </div>

                <button
                    onClick={addEducation}
                    className="btn-primary px-6 py-3 text-[10px] shadow-indigo-500/20"
                >
                    <Plus className="size-3.5" />
                    <span>Add Milestone</span>
                </button>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/5">
                    <div className="size-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6 border border-slate-800">
                        <GraduationCap className="size-8 text-slate-700" />
                    </div>
                    <p className="text-white font-black text-xs uppercase tracking-[0.2em] mb-2">Academic Silence</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
                        Educational history helps define your professional foundation
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {data.map((education, index) => (
                        <div
                            key={index}
                            className="group relative glass-card border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.15)]"
                        >
                            {/* Card Label */}
                            <div className="absolute top-0 left-12 -translate-y-1/2 px-4 py-1.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/40">
                                Education #{index + 1}
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={() => removeEducation(index)}
                                className="absolute top-6 right-6 p-2 rounded-xl bg-red-500/5 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="space-y-8 pt-4">
                                {/* Institution & Degree */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                            <School className="size-3.5 text-indigo-400/60" />
                                            Institution
                                        </label>
                                        <input
                                            type="text"
                                            value={education.institution || ""}
                                            onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                            placeholder="e.g. Stanford University"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                            <Award className="size-3.5 text-indigo-400/60" />
                                            Degree / Program
                                        </label>

                                        <div className="relative group/select">
                                            <select
                                                value={education.degree || ""}
                                                onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white font-medium appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-[#020617] text-slate-500">Select Degree Type</option>

                                                {/* Engineering */}
                                                <optgroup label="Engineering" className="bg-[#020617] text-indigo-400 font-bold">
                                                    <option value="B.Tech CS">B.Tech / B.E - Computer Science</option>
                                                    <option value="B.Tech IT">B.Tech / B.E - Information Technology</option>
                                                    <option value="B.Tech AI">B.Tech / B.E - Artificial Intelligence</option>
                                                    <option value="B.Tech DS">B.Tech / B.E - Data Science</option>
                                                </optgroup>

                                                {/* Masters */}
                                                <optgroup label="Post Graduate" className="bg-[#020617] text-indigo-400 font-bold">
                                                    <option value="M.Tech CS">M.Tech / M.E - Computer Science</option>
                                                    <option value="MBA">MBA - Business Administration</option>
                                                    <option value="MCA">MCA - Computer Applications</option>
                                                </optgroup>

                                                {/* Science & Arts */}
                                                <optgroup label="Other Disciplines" className="bg-[#020617] text-indigo-400 font-bold">
                                                    <option value="BSc CS">BSc - Computer Science</option>
                                                    <option value="BCom">BCom - Accounting & Finance</option>
                                                    <option value="BA">BA - Economics / English</option>
                                                    <option value="PhD">PhD - Research Doctorate</option>
                                                </optgroup>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Field & Graduation */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                            <BookOpen className="size-3.5 text-indigo-400/60" />
                                            Major Specialization
                                        </label>
                                        <input
                                            type="text"
                                            value={education.field || ""}
                                            onChange={(e) => updateEducation(index, "field", e.target.value)}
                                            placeholder="e.g. Human Computer Interaction"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                            <Calendar className="size-3.5 text-indigo-400/60" />
                                            Graduation Epoch
                                        </label>
                                        <input
                                            type="month"
                                            value={education.graduation_date || ""}
                                            onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                                        />
                                    </div>
                                </div>

                                {/* GPA */}
                                <div className="space-y-2 max-w-md">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                        <Award className="size-3.5 text-indigo-400/60" />
                                        Performance Index (GPA)
                                    </label>
                                    <input
                                        type="text"
                                        value={education.gpa || ""}
                                        onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                                        placeholder="e.g. 3.9 / 4.0 or First Class with Distinction"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EducationForm;
