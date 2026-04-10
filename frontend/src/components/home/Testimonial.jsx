import React from 'react'
import Title from './Title';
import { BookUserIcon, Twitter } from 'lucide-react';

const Testimonial = () => {
    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@neilstellar',
            date: 'April 20, 2025',
            text: "The AI suggestions are scarily good. It helped me rephrase my boring bullet points into high-impact achievements."
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
            date: 'May 10, 2025',
            text: "Finally, a resume builder that doesn't look like it's from 2005. Clean, fast, and the export quality is top-notch."
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordantalks',
            date: 'June 5, 2025',
            text: "Beat the ATS on my first try with the 'Tech-Optimized' template. Got 3 interviews within a week!"
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Sarah Chen',
            handle: '@sarahcodes',
            date: 'May 12, 2025',
            text: "The real-time preview is a game changer. I love how I can see the layout adjust as I add new skills."
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-6 rounded-2xl mx-4 bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-300 w-80 shrink-0 group relative overflow-hidden">
            {/* Hover Glow Effect */}
            <div className="absolute -top-10 -right-10 size-20 bg-indigo-600/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start">
                <div className="flex gap-3">
                    <img className="size-11 rounded-full object-cover border border-slate-700" src={card.image} alt={card.name} />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-white text-sm tracking-wide">{card.name}</p>
                            <div className="bg-blue-500 rounded-full p-0.5">
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="white"><path d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" /></svg>
                            </div>
                        </div>
                        <span className="text-xs text-slate-500">{card.handle}</span>
                    </div>
                </div>
                <Twitter className="size-4 text-slate-600 group-hover:text-sky-400 transition-colors" />
            </div>

            <p className="text-[14px] leading-relaxed py-5 text-slate-300">
                "{card.text}"
            </p>

            <div className="flex items-center justify-between text-slate-500 text-[11px] pt-4 border-t border-slate-800/50">
                <div className="flex items-center gap-1.5 uppercase tracking-tighter">
                    <span>Verified Insight</span>
                </div>
                <p>{card.date}</p>
            </div>
        </div>
    );

    return (
        <div id='testimonials' className='flex flex-col items-center py-24 bg-transparent scroll-mt-12 overflow-hidden'>
            {/* Tagline Pill */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2 mb-10 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                <BookUserIcon className="size-4" />
                <span>Wall of Love</span>
            </div>

            <Title 
                title={<span className="text-white">Trusted by world-class talent</span>} 
                description="Our users are landing jobs at companies like Google, Tesla, and Airbnb. Here is what they have to say." 
            />

            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .marquee-inner {
                    animation: marqueeScroll 40s linear infinite;
                }

                .marquee-reverse {
                    animation-direction: reverse;
                }

                /* Stop animation on hover */
                .marquee-row:hover .marquee-inner {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Gradient Fades for the edges */}
            <div className="w-full relative mt-16">
                <div className="absolute left-0 top-0 h-full w-32 md:w-64 z-20 pointer-events-none bg-gradient-to-r from-[#020617]/50 to-transparent"></div>
                <div className="absolute right-0 top-0 h-full w-32 md:w-64 z-20 pointer-events-none bg-gradient-to-l from-[#020617]/50 to-transparent"></div>

                {/* Row 1 */}
                <div className="marquee-row w-full overflow-hidden mb-6">
                    <div className="marquee-inner flex min-w-max">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                </div>

                {/* Row 2 (Reverse) */}
                <div className="marquee-row w-full overflow-hidden">
                    <div className="marquee-inner marquee-reverse flex min-w-max">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial;