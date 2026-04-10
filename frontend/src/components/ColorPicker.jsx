import { Check, Palette, Plus } from 'lucide-react'; // Added Plus
import React, { useState, useRef } from 'react'

const ColorPicker = ({ selectedColor, onChange }) => {
    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Red", value: "#ff3333" },
        { name: "Pink", value: "#eaaeae" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Green", value: "#10B981" },
        { name: "Orange", value: "#F97316" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Gray", value: "#6B7280" },
        { name: "Black", value: "#1F2937" },
    ]

    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null); // Ref to trigger the hidden color input

    // Check if the current selectedColor is one of the presets
    const isCustomColor = !colors.some(c => c.value === selectedColor) && selectedColor;

    return (
        <div className='relative'>
            <button
                className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mr-4 text-indigo-400 bg-indigo-500/10 border border-indigo-400 hover:bg-indigo-500 hover:text-white transition-all px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                onClick={() => setIsOpen(!isOpen)}
            >
                <Palette size={16} />
                <span className='max-sm:hidden'>Accent Color</span>
            </button>

            {isOpen && (
                <div className='grid grid-cols-4 w-64 gap-4 absolute top-full right-0 mt-4 z-50 glass-card bg-[#0f172a]/95 backdrop-blur-2xl border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-[2rem] p-5 animate-in fade-in slide-in-from-top-4 duration-300'>
                    {colors.map((color) => (
                        <div key={color.value} className='relative cursor-pointer group flex flex-col items-center' onClick={() => { onChange(color.value); setIsOpen(false) }}>
                            <div
                                className="w-10 h-10 rounded-full border border-white/10 group-hover:scale-110 transition-all duration-300 shadow-lg"
                                style={{ backgroundColor: color.value }}
                            />
                            {selectedColor === color.value && (
                                <div className='absolute inset-0 flex items-center justify-center pb-5'>
                                    <div className="bg-black/20 backdrop-blur-sm rounded-full p-1">
                                        <Check className='size-4 text-white drop-shadow-md' />
                                    </div>
                                </div>
                            )}
                            <p className='text-[9px] font-bold uppercase tracking-widest text-center mt-2 text-slate-500 group-hover:text-indigo-400 transition-colors capitalize'>{color.name}</p>
                        </div>
                    ))}

                    {/* --- CUSTOM COLOR PICKER OPTION --- */}
                    <div className='relative cursor-pointer group flex flex-col items-center' onClick={() => fileInputRef.current.click()}>
                        <div
                            className={`w-10 h-10 rounded-full border-2 border-dashed ${isCustomColor ? 'border-transparent' : 'border-white/20'} flex items-center justify-center group-hover:border-indigo-500/50 transition-all duration-300 shadow-lg`}
                            style={{ backgroundColor: isCustomColor ? selectedColor : 'transparent' }}
                        >
                            <Plus size={18} className={isCustomColor ? 'text-white' : 'text-slate-500'} />
                        </div>

                        {/* Hidden Native Color Input */}
                        <input
                            type="color"
                            ref={fileInputRef}
                            className="absolute inset-0 opacity-0 cursor-pointer w-0 h-0"
                            onChange={(e) => {
                                onChange(e.target.value);
                                setIsOpen(false);
                            }}
                        />
                        <p className='text-[9px] font-bold uppercase tracking-widest text-center mt-2 text-slate-500 group-hover:text-indigo-400 transition-colors'>Custom</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ColorPicker