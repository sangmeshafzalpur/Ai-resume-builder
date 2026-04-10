import React from "react";

const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-12 bg-white text-gray-900 font-light">
            {/* Header */}
            <header className="mb-10 flex justify-between items-start">
                <div className="flex-1">
                    <h1 className="text-4xl font-thin mb-4 tracking-wide">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                        {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                        {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                        {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                        {data.personal_info?.linkedin && (
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        )}
                    </div>
                </div>
                {data.personal_info?.image && (
                    <img
                        src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)}
                        alt="Profile"
                        className="size-24 object-cover border border-gray-100"
                    />
                )}
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-10">
                    <p className=" text-gray-700 leading-relaxed max-w-2xl">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xs uppercase tracking-widest mb-6 font-medium text-gray-400">
                        Experience
                    </h2>

                    <div className="space-y-8">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className="text-sm text-gray-400">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-sm font-medium mb-2" style={{ color: accentColor }}>{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-line max-w-3xl">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xs uppercase tracking-widest mb-6 font-medium text-gray-400">
                        Projects
                    </h2>

                    <div className="space-y-6">
                        {data.project.map((proj, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <h3 className="text-lg font-medium">{proj.name}</h3>
                                <p className="text-gray-600 text-sm max-w-2xl">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xs uppercase tracking-widest mb-6 font-medium text-gray-400">
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium text-gray-800">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-sm text-gray-600">{edu.institution}</p>
                                </div>
                                <span className="text-sm text-gray-400">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xs uppercase tracking-widest mb-6 font-medium text-gray-400">
                        Skills
                    </h2>

                    <div className="text-gray-600 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        {data.skills.map((skill, index) => (
                            <span key={index} className="border-b" style={{ borderBottomColor: accentColor + '40' }}>{skill}</span>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-2 gap-12">
                {/* Certifications */}
                {data.certifications && data.certifications.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-xs uppercase tracking-widest mb-6 font-medium text-gray-400">
                            Certifications
                        </h2>
                        <ul className="space-y-2">
                            {data.certifications.map((cert, index) => (
                                <li key={index} className="text-sm text-gray-600 font-medium tracking-tight">
                                    {cert.name || cert}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Languages */}
                {data.languages && data.languages.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-xs uppercase tracking-widest mb-6 font-medium text-gray-400">
                            Languages
                        </h2>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
                            {data.languages.map((lang, index) => (
                                <span key={index}>{lang.name || lang}</span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default MinimalTemplate;