import { Award, Plus, Trash2, ShieldCheck, Calendar, Building } from "lucide-react";
import React from "react";

const CertificationsForm = ({ data, onChange }) => {
    const addCertification = () => {
        const newCert = {
            name: "",
            issuer: "",
            date: ""
        };
        onChange([...data, newCert]);
    };

    const removeCertification = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateCertification = (index, field, value) => {
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
                        Professional Validation
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
                        Verify your industry expertise
                    </p>
                </div>

                <button
                    onClick={addCertification}
                    className="btn-primary px-6 py-3 text-[10px] shadow-indigo-500/20"
                >
                    <Plus className="size-3.5" />
                    <span>Add Credential</span>
                </button>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/5">
                    <div className="size-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6 border border-slate-800">
                        <Award className="size-8 text-slate-700" />
                    </div>
                    <p className="text-white font-black text-xs uppercase tracking-[0.2em] mb-2">Uncertified</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
                        Certifications add substantial weight to your professional profile
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {data.map((cert, index) => (
                        <div
                            key={index}
                            className="group relative glass-card border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.15)]"
                        >
                            {/* Card Label */}
                            <div className="absolute top-0 left-12 -translate-y-1/2 px-4 py-1.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/40">
                                Certificate #{index + 1}
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={() => removeCertification(index)}
                                className="absolute top-6 right-6 p-2 rounded-xl bg-red-500/5 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="space-y-8 pt-4">
                                {/* Name & Issuer */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                            <ShieldCheck className="size-3.5 text-indigo-400/60" />
                                            Credential Name
                                        </label>
                                        <input
                                            type="text"
                                            value={cert.name || ""}
                                            onChange={(e) => updateCertification(index, "name", e.target.value)}
                                            placeholder="e.g. AWS Solutions Architect Professional"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                            <Building className="size-3.5 text-indigo-400/60" />
                                            Issuing Body
                                        </label>
                                        <input
                                            type="text"
                                            value={cert.issuer || ""}
                                            onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                                            placeholder="e.g. Amazon Web Services"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="space-y-2 max-w-sm">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                        <Calendar className="size-3.5 text-indigo-400/60" />
                                        Attainment Date
                                    </label>
                                    <input
                                        type="month"
                                        value={cert.date || ""}
                                        onChange={(e) => updateCertification(index, "date", e.target.value)}
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

export default CertificationsForm;
