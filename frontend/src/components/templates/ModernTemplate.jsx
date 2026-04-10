import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, CheckCircle2 } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short"
		});
	};

	return (
		<div className="w-[210mm] min-h-[297mm] bg-white text-slate-800 flex flex-col overflow-hidden">
			{/* Header - Compact & Premium */}
			<header className="p-10 pb-8 text-white flex justify-between items-start relative overflow-hidden" style={{ backgroundColor: accentColor }}>
				<div className="relative z-10 max-w-[70%]">
					<h1 className="text-5xl font-black tracking-tighter mb-2 leading-none uppercase">
						{data.personal_info?.full_name || "Your Name"}
					</h1>
					<p className="text-xl font-bold opacity-90 tracking-widest uppercase mb-6">
						{data.personal_info?.profession || "Professional Title"}
					</p>

					<div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-bold uppercase tracking-wider opacity-80">
						{data.personal_info?.email && (
							<div className="flex items-center gap-2">
								<Mail className="size-3" />
								<span>{data.personal_info.email}</span>
							</div>
						)}
						{data.personal_info?.phone && (
							<div className="flex items-center gap-2">
								<Phone className="size-3" />
								<span>{data.personal_info.phone}</span>
							</div>
						)}
						{data.personal_info?.location && (
							<div className="flex items-center gap-2">
								<MapPin className="size-3" />
								<span>{data.personal_info.location}</span>
							</div>
						)}
						{data.personal_info?.linkedin && (
							<div className="flex items-center gap-2">
								<Linkedin className="size-3" />
								<span>LinkedIn</span>
							</div>
						)}
					</div>
				</div>

				{data.personal_info?.image && (
					<div className="relative z-10 shrink-0">
						<img
							src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)}
							alt="Profile"
							className="size-36 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
						/>
					</div>
				)}

				{/* Decorative background element */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
			</header>

			<div className="flex-1 grid grid-cols-12">
				{/* Main Content (Left) */}
				<div className="col-span-8 p-10 pr-6 space-y-8">
					{/* Professional Summary */}
					{data.professional_summary && (
						<section>
							<div className="flex items-center gap-3 mb-4">
								<div className="p-1.5 rounded-lg text-white" style={{ backgroundColor: accentColor }}>
									<Award className="size-4" />
								</div>
								<h2 className="text-sm font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>
									Executive Profile
								</h2>
							</div>
							<p className="text-sm leading-relaxed text-slate-600 font-medium italic border-l-2 pl-4" style={{ borderColor: accentColor + '30' }}>
								{data.professional_summary}
							</p>
						</section>
					)}

					{/* Experience */}
					{data.experience && data.experience.length > 0 && (
						<section>
							<div className="flex items-center gap-3 mb-6">
								<div className="p-1.5 rounded-lg text-white" style={{ backgroundColor: accentColor }}>
									<Briefcase className="size-4" />
								</div>
								<h2 className="text-sm font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>
									Work History
								</h2>
							</div>

							<div className="space-y-6">
								{data.experience.map((exp, index) => (
									<div key={index} className="group relative pl-4 border-l-2 border-slate-100">
										<div className="absolute -left-[9px] top-1 size-4 rounded-full bg-white border-2 group-hover:scale-125 transition-transform" style={{ borderColor: accentColor }} />

										<div className="flex justify-between items-baseline mb-1">
											<h3 className="text-lg font-black text-slate-900 tracking-tight">{exp.position}</h3>
											<span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">
												{formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
											</span>
										</div>
										<p className="text-sm font-bold mb-3" style={{ color: accentColor }}>{exp.company}</p>

										{exp.description && (
											<div className="text-[13px] text-slate-600 leading-relaxed font-medium">
												{exp.description.split('\n').map((line, i) => (
													<div key={i} className="flex gap-2 mb-1">
														<span className="text-slate-300 mt-1">•</span>
														<span>{line}</span>
													</div>
												))}
											</div>
										)}
									</div>
								))}
							</div>
						</section>
					)}
				</div>

				{/* Sidebar (Right) */}
				<aside className="col-span-4 bg-slate-50/50 p-10 pl-6 space-y-8 h-full border-l border-slate-100">
					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section>
							<h2 className="text-xs font-black uppercase tracking-[0.2em] mb-5 pb-2 border-b-2 border-slate-200" style={{ color: accentColor }}>
								Expertise
							</h2>
							<div className="flex flex-wrap gap-2">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1.5 text-[10px] font-bold bg-white text-slate-700 border border-slate-200 rounded-lg shadow-sm"
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}

					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							<h2 className="text-xs font-black uppercase tracking-[0.2em] mb-5 pb-2 border-b-2 border-slate-200" style={{ color: accentColor }}>
								Academic
							</h2>
							<div className="space-y-5">
								{data.education.map((edu, index) => (
									<div key={index} className="space-y-1">
										<div className="flex items-center gap-2 text-slate-800">
											<GraduationCap className="size-3 shrink-0" style={{ color: accentColor }} />
											<h3 className="font-bold text-xs uppercase tracking-tight leading-tight">
												{edu.degree}
											</h3>
										</div>
										<p className="text-[11px] font-medium text-slate-500 italic pl-5">{edu.institution}</p>
										<p className="text-[10px] font-black text-slate-400 pl-5 uppercase tracking-widest">{formatDate(edu.graduation_date)}</p>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Certifications */}
					{data.certifications && data.certifications.length > 0 && (
						<section>
							<h2 className="text-xs font-black uppercase tracking-[0.2em] mb-5 pb-2 border-b-2 border-slate-200" style={{ color: accentColor }}>
								Certificates
							</h2>
							<div className="space-y-3">
								{data.certifications.map((cert, index) => (
									<div key={index} className="flex items-start gap-2 text-[10px] font-bold text-slate-600">
										<div className="size-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: accentColor }} />
										<span>{cert.name || cert}</span>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Languages */}
					{data.languages && data.languages.length > 0 && (
						<section>
							<h2 className="text-xs font-black uppercase tracking-[0.2em] mb-5 pb-2 border-b-2 border-slate-200" style={{ color: accentColor }}>
								Languages
							</h2>
							<div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
								{data.languages.map((lang, index) => (
									<span key={index}>{lang.name || lang}</span>
								))}
							</div>
						</section>
					)}

					{/* Projects */}
					{data.project && data.project.length > 0 && (
						<section>
							<h2 className="text-xs font-black uppercase tracking-[0.2em] mb-5 pb-2 border-b-2 border-slate-200" style={{ color: accentColor }}>
								Projects
							</h2>
							<div className="space-y-4">
								{data.project.slice(0, 3).map((p, index) => (
									<div key={index} className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-slate-200 transition-colors">
										<h3 className="text-xs font-black text-slate-800 mb-1 tracking-tight">{p.name}</h3>
										<p className="text-[10px] text-slate-500 leading-snug line-clamp-3">
											{p.description}
										</p>
									</div>
								))}
							</div>
						</section>
					)}
				</aside>
			</div>

			{/* Footer Tag */}
			<footer className="p-4 bg-slate-900 text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] text-center">
				Generated via JobReady AI Engine
			</footer>
		</div>
	);
}

export default ModernTemplate;
