/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiPlus, HiArrowRight } from "react-icons/hi";
import Link from "next/link";

const categoryUIConfig = {
    "Water Damage Restoration": {
        gradient: "from-blue-950/90 via-blue-900/40 to-transparent",
        accent: "text-blue-500"
    },
    "Fire & Smoke Damage": {
        gradient: "from-red-950/90 via-red-900/40 to-transparent",
        accent: "text-red-500"
    },
    "Mold Remediation": {
        gradient: "from-emerald-950/90 via-emerald-900/40 to-transparent",
        accent: "text-emerald-500"
    },
};

export default function ServiceContent({ categories }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleCategoryClick = async (category) => {
        setSelectedCategory(category);
        setSubCategories([]);
        try {
            const res = await fetch(`${API_URL}/sub-categories?category=${category._id}`);
            const data = await res.json();
            setSubCategories(data.data || []);
        } catch (err) {
            console.error("Error fetching sub-categories:", err);
        }
    };

    return (
        <>
            {/* --- Main Category Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative">
                {categories.map((cat, index) => {
                    const ui = categoryUIConfig[cat.name] || { gradient: "from-slate-950/90" };
                    return (
                        <motion.div
                            key={cat._id}
                            layoutId={`card-${cat._id}`}
                            onClick={() => handleCategoryClick(cat)}
                            className="group relative h-96 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-md shadow-green-400 hover:shadow-2xl bg-accent/30 backdrop-blur-sm transition-all"
                        >
                            {/* Background Image with Hover Logic */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 grayscale-0 md:grayscale-30 md:group-hover:grayscale-0 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                style={{ backgroundImage: `url(${cat.image?.url})` }}
                            />

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-linear-to-t transition-opacity duration-500 opacity-40 md:opacity-0 md:group-hover:opacity-100 ${ui.gradient}`} />

                            <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
                                <h3 className="text-3xl font-black text-green-500 md:text-forground md:group-hover:text-white transition-colors uppercase italic tracking-tighter leading-none">
                                    {cat.name}
                                </h3>
                                <div className="flex items-center gap-2 text-orange-400 md:group-hover:opacity-100 transition-all font-black text-[10px] tracking-widest mt-4">
                                    Analyze Solutions <HiArrowRight />
                                </div>
                            </div>

                            {/* Icon Toggle */}
                            <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-orange-500/30 bg-orange-600/10 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all z-20 shadow-lg">
                                <HiPlus size={24} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* --- Expanded Category Modal --- */}
            <AnimatePresence>
                {selectedCategory && (
                    <>
                        {/* 1. Backdrop Layer: Background blur ebong dark overlay add kora hoyeche */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCategory(null)}
                            // 'bg-black/60' overlay dive ebong 'backdrop-blur-md' pichoner content blur korbe
                            className="fixed inset-0 bg-black/60 backdrop-blur-2xl z-60 "
                        />

                        {/* 2. Expanded Content Card: Ekhne 'bg-background' (solid color) nishchit kora hoyeche */}
                        <motion.div
                            layoutId={`card-${selectedCategory._id}`}
                            className="fixed inset-4 md:inset-10 lg:inset-20 z-70 bg-background border border-border rounded-[3rem]  overflow-hidden flex flex-col lg:flex-row  shadow-md shadow-green-400 hover:shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="absolute top-6 right-6 p-3 bg-accent text-white hover:bg-orange-600 hover:text-white rounded-full transition-all z-80 shadow-xl"
                            >
                                <HiX size={24} />
                            </button>

                            {/* Modal Left: Info & Sub-Categories */}
                            <div className="w-full lg:w-3/5 p-8 md:p-16 overflow-y-auto custom-scrollbar bg-background">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Certified Recovery Protocol</span>
                                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-8">
                                        {selectedCategory.name} <span className="text-orange-600">Solutions</span>
                                    </h2>
                                    <p className="text-white font-medium italic text-lg max-w-xl mb-12">
                                        Prime Solution provides industry-leading techniques to restore your property efficiently and safely. Select a specific service below:
                                    </p>

                                    {/* Sub-Category List */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {subCategories.length > 0 ? (
                                            subCategories.map((sub) => (
                                                <Link
                                                    key={sub._id}
                                                    href={`/pages/service-details/${sub.slug}`}
                                                    className="group/item flex items-center justify-between p-6 bg-accent/30 rounded-4xl transition-all duration-300 shadow-md shadow-green-500 hover:shadow-2xl"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-1">{sub.serviceType}</span>
                                                        <span className="text-md font-black text-white uppercase italic group-hover/item:text-orange-600 transition-colors">{sub.name}</span>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-orange-600 group-hover/item:bg-orange-600 group-hover/item:text-white transition-all shadow-md">
                                                        <HiArrowRight size={18} />
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            // --- Skeleton Loading State ---
                                            <>
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between p-6 bg-accent/20 shadow-2xl rounded-4xl animate-pulse"
                                                    >
                                                        <div className="flex flex-col gap-3 w-full">
                                                            {/* Sub-label skeleton */}
                                                            <div className="h-2 w-16 bg-orange-600/20 rounded-full"></div>
                                                            {/* Title skeleton */}
                                                            <div className="h-4 w-3/4 bg-secondary/20 rounded-full"></div>
                                                        </div>
                                                        {/* Icon circle skeleton */}
                                                        <div className="w-10 h-10 rounded-full bg-secondary/10 shrink-0"></div>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Modal Right: Image Context */}
                            <div className="hidden lg:block w-2/5 relative bg-accent">
                                <img
                                    src={selectedCategory.image?.url}
                                    alt={selectedCategory.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient overlay to blend image with background */}
                                <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent" />
                                <div className="absolute bottom-12 left-12 right-12 p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-4xl">
                                    <p className="text-white text-xs font-bold leading-relaxed italic opacity-90">
                                        Equipped with state-of-the-art technology to handle {selectedCategory.name.toLowerCase()} for commercial and residential estates.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}