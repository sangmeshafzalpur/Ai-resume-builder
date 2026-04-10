import React from 'react'
import Title from './Title';
import { Sparkles, Zap, ShieldCheck, Layout, Globe, Cpu } from 'lucide-react';

const Features = () => {
    return (
        <>
            <div id='features' className='flex flex-col items-center py-20 px-6 bg-transparent scroll-mt-12 overflow-hidden'>
                
                {/* 1. Social Proof Pill (Redesigned) */}
                <div className="flex items-center p-1 rounded-full bg-slate-900/50 border border-slate-800 text-sm text-slate-300 font-medium max-w-max mx-auto mb-12 px-5 py-1.5 gap-3 hover:bg-slate-800/80 transition-all duration-300 group shadow-lg shadow-indigo-500/5">
                    <div className="flex items-center">
                        <img className="w-8 h-8 rounded-full border-2 border-[#020617] object-cover ring-2 ring-indigo-500/20"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100"
                            alt="userImage1" />
                        <img className="w-8 h-8 rounded-full border-2 border-[#020617] object-cover -translate-x-3 ring-2 ring-indigo-500/20"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100"
                            alt="userImage2" />
                        <img className="w-8 h-8 rounded-full border-2 border-[#020617] object-cover -translate-x-6 ring-2 ring-indigo-500/20"
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100"
                            alt="userImage3" />
                    </div>
                    <p className="-translate-x-3 text-xs sm:text-sm tracking-wide">
                        Join <span className="text-white font-bold">10k+</span> professionals
                    </p>
                </div>

                <Title 
                    title={<span className="text-white">All the features you need</span>} 
                    description="Our AI-powered engine handles the heavy lifting so you can focus on landing the job." 
                />

                {/* 2. Bento-Style Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-7xl w-full">
                    
                    {/* Big Feature Card */}
                    <div className="md:col-span-2 relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/30 p-8 hover:border-indigo-500/30 transition-all duration-500 group">
                        <div className="absolute -top-24 -left-24 size-64 bg-indigo-600/10 blur-[80px] group-hover:bg-indigo-600/20 transition-all" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="bg-indigo-500/10 p-3 rounded-2xl w-fit mb-6">
                                <Sparkles className="text-indigo-400 size-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">AI Resume Intelligence</h3>
                            <p className="text-slate-400 max-w-md mb-8">Automatically generate industry-tailored bullet points that resonate with recruiters and bypass ATS filters.</p>
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-7.svg" alt="showcase" className="mt-auto rounded-xl border border-slate-800 shadow-2xl transition-transform group-hover:scale-[1.02] duration-500" />
                        </div>
                    </div>

                    {/* Smaller Feature Card */}
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/30 p-8 hover:border-emerald-500/30 transition-all duration-500 group">
                        <div className="absolute -bottom-24 -right-24 size-64 bg-emerald-600/10 blur-[80px]" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="bg-emerald-500/10 p-3 rounded-2xl w-fit mb-6">
                                <Zap className="text-emerald-400 size-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Real-time Preview</h3>
                            <p className="text-slate-400 mb-8">See exactly how your resume looks as you type. Professional formatting is handled instantly.</p>
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-8.svg" alt="showcase" className="mt-auto transition-transform group-hover:-rotate-2 duration-500" />
                        </div>
                    </div>

                    {/* Small Icon Features */}
                    <FeatureIconCard icon={<Layout className="text-blue-400" />} title="Modern Templates" desc="Crafted by career experts." />
                    <FeatureIconCard icon={<ShieldCheck className="text-purple-400" />} title="Privacy First" desc="Your data is encrypted & safe." />
                    <FeatureIconCard icon={<Cpu className="text-rose-400" />} title="ATS Optimized" desc="Built to rank higher." />

                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                #features { font-family: 'Poppins', sans-serif; }
            `}</style>
        </>
    );
};

// Sub-component for small cards
const FeatureIconCard = ({ icon, title, desc }) => (
    <div className="p-8 rounded-[2rem] border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 transition-all group">
        <div className="bg-slate-800 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default Features;