/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

export default function ProjectGallery({ images, type }) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!images || images.length === 0) return null;

    return (
        <div className="space-y-4">
            {/* Header Label */}
            <div className={`flex items-center gap-3 font-black uppercase text-xs tracking-widest ${type === 'before' ? 'text-red-500' : 'text-green-500'}`}>
                {type === 'before' ? (
                    <><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Initial Damage (Before)</>
                ) : (
                    <>✓ Restored Asset (After)</>
                )}
            </div>

            {/* Main Large Image */}
            <div className="relative h-100 md:h-137.5 rounded-[50px] overflow-hidden border-4 border-card shadow-2xl bg-accent/20">
                <img 
                    src={images[activeIndex]?.url} 
                    alt={`${type}-${activeIndex}`} 
                    className={`w-full h-full object-cover transition-all duration-500 ${type === 'before' ? 'grayscale' : ''}`}
                />
            </div>

            {/* Thumbnails Row */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`relative min-w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                                activeIndex === idx ? 'border-orange-600 scale-105' : 'border-transparent opacity-60'
                            }`}
                        >
                            <img src={img.url} className="w-full h-full object-cover" alt="thumb" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}