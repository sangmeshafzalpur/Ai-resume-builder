import { Globe, Plus, Trash2, Languages } from "lucide-react";
import React from "react";

const LanguagesForm = ({ data, onChange }) => {
    const addLanguage = () => {
        const newLang = {
            name: "",
            level: "Native"
        };
        onChange([...data, newLang]);
    };

    const removeLanguage = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateLanguage = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const levels = ["Native", "Fluent", "Professional", "Intermediate", "Beginner"];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">

            {/* Header */}
            <div className="flex items-center justify-between bg-white/5 p-6 rounded-[2rem] border border-white/5">
                <div className="space-y-1">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">
                        Linguistic Range
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
                        Expand your global reach
                    </p>
                </div>

                <button
                    onClick={addLanguage}
                    className="btn-primary px-6 py-3 text-[10px] shadow-indigo-500/20"
                >
                    <Plus className="size-3.5" />
                    <span>Add Language</span>
                </button>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/5">
                    <div className="size-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6 border border-slate-800">
                        <Globe className="size-8 text-slate-700" />
                    </div>
                    <p className="text-white font-black text-xs uppercase tracking-[0.2em] mb-2">Monolingual</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
                        Multilingual capabilities are highly valued in modern professional environments
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.map((lang, index) => (
                        <div
                            key={index}
                            className="group relative glass-card border-white/5 rounded-[2rem] p-6 transition-all duration-500 hover:border-indigo-500/30 hover:shadow-xl"
                        >
                            {/* Remove Button */}
                            <button
                                onClick={() => removeLanguage(index)}
                                className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-500/5 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                            >
                                <Trash2 size={14} />
                            </button>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                        <Languages className="size-3.5 text-indigo-400/60" />
                                        Language
                                    </label>
                                    <input
                                        type="text"
                                        value={lang.name || ""}
                                        onChange={(e) => updateLanguage(index, "name", e.target.value)}
                                        placeholder="e.g. French"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                        <Award className="size-3.5 text-indigo-400/60" />
                                        Proficiency Level
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={lang.level || "Native"}
                                            onChange={(e) => updateLanguage(index, "level", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white font-medium appearance-none cursor-pointer"
                                        >
                                            {levels.map(level => (
                                                <option key={level} value={level} className="bg-[#020617] text-white">{level}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguagesForm;
