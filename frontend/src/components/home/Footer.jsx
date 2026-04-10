import React from 'react'

const Footer = () => {
    return (
        <footer className="relative bg-[#020617] pt-28 pb-12 px-6 md:px-16 lg:px-32 mt-40 border-t border-slate-900/60 overflow-hidden">
            
            {/* 1. Background Glow & Accent Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 size-80 bg-indigo-600/10 blur-[120px] -z-10 rounded-full" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <a href="#" className="flex items-center gap-3 group">
                            <div className="size-11 bg-indigo-600 rounded-2xl rotate-12 flex items-center justify-center group-hover:rotate-0 transition-all duration-500 shadow-lg shadow-indigo-600/20">
                                <span className="text-white font-black text-2xl">R</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">Ai Resume Builder<span className="text-indigo-500">.</span></span>
                        </a>
                        <p className="text-slate-400 text-[15px] max-w-sm leading-relaxed">
                            The next generation of career development. We use AI to help you build resumes that beat the ATS and land the interviews you deserve.
                        </p>
                        
                        {/* Social Links with Glow */}
                        <div className="flex items-center gap-4">
                            <SocialIcon href="#" icon={<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />} />
                            <SocialIcon href="#" icon={<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />} />
                        </div>
                    </div>

                    {/* Links Columns */}
                    <FooterColumn title="Platform">
                        <li><a className="hover:text-indigo-400 transition-colors">Templates</a></li>
                        <li><a className="hover:text-indigo-400 transition-colors">AI Writer</a></li>
                        <li><a className="hover:text-indigo-400 transition-colors">Premium</a></li>
                        <li><a className="hover:text-indigo-400 transition-colors">Success Stories</a></li>
                    </FooterColumn>

                    <FooterColumn title="Resources">
                        <li><a className="hover:text-indigo-400 transition-colors">Career Blog</a></li>
                        <li><a className="hover:text-indigo-400 transition-colors">Help Center</a></li>
                        <li>
                            <a className="flex items-center group hover:text-indigo-400 transition-colors">
                                Hiring
                                <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">3 Openings</span>
                            </a>
                        </li>
                        <li><a className="hover:text-indigo-400 transition-colors">Affiliate</a></li>
                    </FooterColumn>

                    <FooterColumn title="Legal">
                        <li><a className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                        <li><a className="hover:text-indigo-400 transition-colors">Terms of Use</a></li>
                        <li><a className="hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
                    </FooterColumn>
                </div>

                {/* Bottom Bar Section */}
                <div className="pt-10 border-t border-slate-900/80 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-[12px] text-slate-500 font-medium">
                        <p>© 2026 Ai Resume Builder Intelligence Inc.</p>
                        <span className="hidden sm:block size-1 bg-slate-800 rounded-full" />
                        <p>Made with ❤️ for 888</p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Status Indicator */}
                        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-900/50 border border-slate-800 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Systems Operational</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Poppins Font - Essential for the look */}
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                footer { font-family: 'Poppins', sans-serif; }
            `}} />
        </footer>
    )
}

// Sub-components for a cleaner, DRY code structure
const FooterColumn = ({ title, children }) => (
    <div className="flex flex-col gap-5">
        <p className="text-white text-[13px] font-bold uppercase tracking-[0.15em]">{title}</p>
        <ul className="flex flex-col gap-3.5 text-slate-400 text-[14px]">
            {children}
        </ul>
    </div>
);

const SocialIcon = ({ href, icon }) => (
    <a 
        href={href} 
        className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)] transition-all duration-300 group"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
            {icon}
        </svg>
    </a>
);

export default Footer;