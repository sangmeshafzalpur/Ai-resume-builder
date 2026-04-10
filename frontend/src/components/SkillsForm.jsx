import React, { useState } from "react";
import { Plus, X, Zap, Cpu } from "lucide-react";

const SkillsForm = ({ data, onChange }) => {

    const [newSkill, setNewSkill] = useState("");

    const addSkill = () => {
        if (newSkill.trim() && !data.includes(newSkill.trim())) {
            onChange([...data, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">

            {/* Header */}
            <div className="flex items-center justify-between bg-white/5 p-6 rounded-[2rem] border border-white/5">
                <div className="space-y-1">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">
                        Technical Arsenal
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
                        Define your core competencies
                    </p>
                </div>
                <div className="size-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Cpu size={20} />
                </div>
            </div>

            {/* Add Skill Input */}
            <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                    <Zap className="size-3.5 text-indigo-400/60" />
                    Acquire New Skill
                </label>
                <div className="flex gap-4">
                    <div className="relative flex-1 group">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="e.g. Distributed Systems, Tailwind CSS..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                        />
                        <div className="absolute inset-0 rounded-2xl border border-indigo-500/0 group-focus-within:border-indigo-500/20 pointer-events-none transition-all" />
                    </div>

                    <button
                        onClick={addSkill}
                        className="btn-primary px-8 rounded-2xl text-[10px]"
                    >
                        <Plus size={16} />
                        <span>Add</span>
                    </button>
                </div>
            </div>

            {/* Skills List */}
            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                    Current Inventory
                </label>

                <div className="flex flex-wrap gap-3 p-6 rounded-[2rem] bg-black/20 border border-white/5 min-h-[100px] content-start">
                    {data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full h-full py-4 space-y-2 opacity-30">
                            <Cpu className="size-6 text-slate-500" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">Inventory Empty</p>
                        </div>
                    ) : (
                        data.map((skill, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-2.5 px-4 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-xs font-bold text-indigo-300 transition-all hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:scale-105"
                            >
                                <span>{skill}</span>

                                <button
                                    onClick={() => removeSkill(index)}
                                    className="text-slate-500 hover:text-rose-500 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillsForm;
