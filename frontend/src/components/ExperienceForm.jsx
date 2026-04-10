import { Briefcase, Plus, Sparkles, Trash2, MapPin, Calendar, Building2, Layout, Loader2 } from "lucide-react";
import React, { useState } from "react";
const ExperienceForm = ({ data, onChange }) => {
  const [refiningIndices, setRefiningIndices] = useState([]);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      location: "",
      employment_type: "",
      website: "",
      start_date: "",
      end_date: "",
      description: "",
      skills: "",
      is_current: false
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAIRefine = (index) => {
    const exp = data[index];
    if (!exp.position) {
      alert("Please enter a job title first so the AI knows the context.");
      return;
    }

    setRefiningIndices(prev => [...prev, index]);

    // Simulate AI suggestion based on position
    setTimeout(() => {
      const suggestions = [
        `Spearheaded the development of a high-performance system for ${exp.company || 'the organization'}, resulting in a 25% increase in operational efficiency.`,
        `Collaborated with cross-functional teams to deliver innovative solutions for ${exp.position} challenges, reducing project turnaround time by 30%.`,
        `Managed and optimized key workflows as a ${exp.position}, driving a 15% growth in user engagement and overall service quality.`,
        `Implemented strategic initiatives that enhanced team productivity and streamlined complex processes within ${exp.company || 'the firm'}.`
      ];

      const currentDesc = exp.description || "";
      const newDesc = currentDesc + (currentDesc ? "\n\n" : "") + suggestions[Math.floor(Math.random() * suggestions.length)];

      updateExperience(index, "description", newDesc);
      setRefiningIndices(prev => prev.filter(i => i !== index));
    }, 1200);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">

      {/* Header */}
      <div className="flex items-center justify-between bg-white/5 p-6 rounded-[2rem] border border-white/5">
        <div className="space-y-1">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">
            Career Journey
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
            Document your professional evolution
          </p>
        </div>

        <button
          onClick={addExperience}
          className="btn-primary px-6 py-3 text-[10px] shadow-indigo-500/20"
        >
          <Plus className="size-3.5" />
          <span>New Experience</span>
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/5">
          <div className="size-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6 border border-slate-800">
            <Briefcase className="size-8 text-slate-700" />
          </div>
          <p className="text-white font-black text-xs uppercase tracking-[0.2em] mb-2">No Records Found</p>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
            Begin by adding your most recent professional role
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {data.map((experience, index) => (
            <div
              key={index}
              className="group relative glass-card border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.15)]"
            >
              {/* Card Label */}
              <div className="absolute top-0 left-12 -translate-y-1/2 px-4 py-1.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/40">
                Experience #{index + 1}
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeExperience(index)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-red-500/5 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={16} />
              </button>

              <div className="space-y-8 pt-4">
                {/* Company & Position */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                      <Building2 className="size-3.5 text-indigo-400/60" />
                      Organization
                    </label>
                    <input
                      type="text"
                      value={experience.company || ""}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                      <Layout className="size-3.5 text-indigo-400/60" />
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={experience.position || ""}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      placeholder="e.g. Lead Designer"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                    />
                  </div>
                </div>

                {/* Dates & Location */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                      <Calendar className="size-3.5 text-indigo-400/60" />
                      Commencement
                    </label>
                    <input
                      type="month"
                      value={experience.start_date || ""}
                      onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                      <Calendar className="size-3.5 text-indigo-400/60" />
                      Conclusion
                    </label>
                    <input
                      type="month"
                      disabled={experience.is_current}
                      value={experience.end_date || ""}
                      onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                      <MapPin className="size-3.5 text-indigo-400/60" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={experience.location || ""}
                      onChange={(e) => updateExperience(index, "location", e.target.value)}
                      placeholder="Remote / NYC"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 p-4 rounded-2xl bg-black/20 border border-white/5 w-fit">
                  <label className="flex items-center gap-3 cursor-pointer group/toggle">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={experience.is_current}
                        onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                      />
                      <div className="w-10 h-5 bg-slate-800 rounded-full peer peer-checked:bg-indigo-500 transition-colors duration-300"></div>
                      <div className="absolute left-1 top-1 size-3 bg-slate-400 rounded-full transition-all duration-300 peer-checked:translate-x-5 peer-checked:bg-white"></div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/toggle:text-white transition-colors">
                      Currently Working Here
                    </span>
                  </label>
                </div>

                {/* Description */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                      Professional Narrative
                    </label>

                    <button
                      type="button"
                      onClick={() => handleAIRefine(index)}
                      disabled={refiningIndices.includes(index)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 hover:bg-indigo-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest disabled:opacity-50"
                    >
                      {refiningIndices.includes(index) ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                      {refiningIndices.includes(index) ? 'Analyzing...' : 'AI Suggest Lines'}
                    </button>
                  </div>

                  <div className="relative group/textarea">
                    <textarea
                      rows={5}
                      value={experience.description || ""}
                      onChange={(e) => updateExperience(index, "description", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 outline-none transition-all text-sm text-slate-300 placeholder:text-slate-700 font-medium leading-relaxed resize-none"
                      placeholder="Highlight your key achievements and strategic responsibilities..."
                    />
                    <div className="absolute inset-0 rounded-[2rem] border border-indigo-500/0 group-focus-within/textarea:border-indigo-500/20 pointer-events-none transition-all" />
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

export default ExperienceForm;
