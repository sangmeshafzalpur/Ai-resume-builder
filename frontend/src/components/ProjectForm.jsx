import React from "react";
import { FolderGit2, Plus, Trash2, Globe, Github, Layers } from "lucide-react";

const ProjectForm = ({ data, onChange }) => {
  const addProjectForm = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
      link: "",
    };

    onChange([...data, newProject]);
  }

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
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
            Portfolio Showcase
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
            Highlight your most impactful work
          </p>
        </div>

        <button
          onClick={addProjectForm}
          className="btn-primary px-6 py-3 text-[10px] shadow-indigo-500/20"
        >
          <Plus className="size-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects List */}
      {data.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/5">
          <div className="size-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6 border border-slate-800">
            <FolderGit2 className="size-8 text-slate-700" />
          </div>
          <p className="text-white font-black text-xs uppercase tracking-[0.2em] mb-2">No Projects Listed</p>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
            Your projects are the best proof of your technical expertise
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {data.map((project, index) => (
            <div
              key={index}
              className="group relative glass-card border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.15)]"
            >
              {/* Card Label */}
              <div className="absolute top-0 left-12 -translate-y-1/2 px-4 py-1.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/40">
                Project #{index + 1}
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeProject(index)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-red-500/5 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={16} />
              </button>

              <div className="space-y-8 pt-4">
                {/* Name & Type */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                      <Layers className="size-3.5 text-indigo-400/60" />
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={project.name || ""}
                      onChange={(e) => updateProject(index, "name", e.target.value)}
                      placeholder="e.g. AI-Powered Analytics Dashboard"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                      <FolderGit2 className="size-3.5 text-indigo-400/60" />
                      Category / Stack
                    </label>
                    <input
                      type="text"
                      value={project.type || ""}
                      onChange={(e) => updateProject(index, "type", e.target.value)}
                      placeholder="e.g. Next.js / AWS / Tailwind"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                    />
                  </div>
                </div>

                {/* Project Link */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                    <Globe className="size-3.5 text-indigo-400/60" />
                    Live Preview / Repository URL
                  </label>
                  <div className="relative group/link">
                    <input
                      type="url"
                      value={project.link || ""}
                      onChange={(e) => updateProject(index, "link", e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-sm text-white placeholder:text-slate-700 font-medium"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/link:text-indigo-400 transition-colors">
                      <Github size={18} />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                    Development Narrative
                  </label>
                  <div className="relative group/textarea">
                    <textarea
                      rows={4}
                      value={project.description || ""}
                      onChange={(e) => updateProject(index, "description", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 outline-none transition-all text-sm text-slate-300 placeholder:text-slate-700 font-medium leading-relaxed resize-none"
                      placeholder="Articulate the problem solved and technical challenges overcome..."
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

export default ProjectForm;
