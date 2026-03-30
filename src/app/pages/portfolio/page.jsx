/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiArrowRight, HiOutlineExternalLink, HiSearch } from "react-icons/hi";
import InspectionTrigger from "../service-details/[slug]/InspectionTrigger";

const projectTypes = ["All", "Residential", "Commercial", "Industrial"];

export default function PortfolioPage() {
    const [portfolios, setPortfolios] = useState([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Fetch Portfolios from Backend
    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const res = await fetch(`${API_URL}/portfolios`);
                const data = await res.json();
                setPortfolios(data.data || []);
            } catch (err) {
                console.error("Failed to fetch portfolios", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPortfolios();
    }, [API_URL]);

    // Filtering Logic
    const filteredProjects = portfolios.filter(project =>
        filter === "All" || project.type === filter
    );

    // Content Summary Generator
    const getExcerpt = (html, limit = 120) => {
        if (!html) return "";
        const plainText = html
            .replace(/<[^>]*>?/gm, "")
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&")
            .trim();

        return plainText.length > limit ? plainText.substring(0, limit) + "..." : plainText;
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-black uppercase italic tracking-widest opacity-30 animate-pulse">
            Analyzing Dispatch Records...
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors pt-32 pb-20 selection:bg-orange-600/20 selection:text-orange-600">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <span className="text-orange-600 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 block">
                        Proven Recovery
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter mb-6 uppercase italic leading-[0.9] md:leading-[0.85]">
                        Project <span className="text-orange-600 underline decoration-4 underline-offset-8">Chronicles</span>
                    </h1>
                </div>
                {/* --- Header & Filtering --- */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 md:mb-24 gap-10 md:gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-left max-w-2xl px-2"
                    >

                        <p className="text-secondary font-medium border-l-4 border-orange-600 pl-4 md:pl-6 italic max-w-xl text-sm md:text-base">
                            From commercial water extraction to residential fire reconstruction, explore our certified track record of restoring properties across Virginia, DC, and Maryland.
                        </p>
                    </motion.div>

                    {/* Filter Switcher */}
                    <div className="w-full lg:w-auto overflow-hidden">
                        <div className="flex bg-accent/30 p-1.5 md:p-2 rounded-[20px] md:rounded-[25px] border border-secondary/10 backdrop-blur-sm shadow-inner overflow-x-auto no-scrollbar scroll-smooth snap-x">
                            {projectTypes.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`px-6 md:px-8 py-3 md:py-4 rounded-[15px] md:rounded-[20px] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap snap-center ${filter === type
                                        ? "bg-orange-600 text-white shadow-xl shadow-orange-600/30 scale-105"
                                        : "text-secondary hover:text-foreground"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Portfolio Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="group relative flex flex-col h-137.5 rounded-[50px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(234,88,12,0.25)] transition-all duration-700 border border-secondary/5 bg-accent/10"
                            >
                                {/* Background Image logic (Show the first 'After' image or fallback) */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={project.images?.after?.[0]?.url || project.images?.before?.[0]?.url || "https://images.unsplash.com/photo-1541976844346-f18aeac57b06"}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent transition-opacity group-hover:opacity-30" />
                                    <div className={`absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100 bg-linear-to-t from-orange-950 via-orange-900/40 to-transparent`} />
                                </div>

                                {/* Content Layer */}
                                <div className="relative z-10 flex-1 flex flex-col justify-end p-10 md:p-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-white/10 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/20 backdrop-blur-md">
                                            {project.type}
                                        </span>
                                        <span className="text-orange-400 font-bold text-[10px] uppercase tracking-widest line-clamp-1 italic">
                                            {project.subCategory?.name || "Certified Restoration"}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none group-hover:translate-x-2 transition-transform duration-500">
                                        {project.title}
                                    </h3>

                                    <div className="transition-all duration-700 ease-in-out max-h-0 opacity-0 translate-y-10 group-hover:max-h-64 group-hover:opacity-100 group-hover:translate-y-0">
                                        <p className="text-gray-300 text-[13px] font-medium leading-relaxed mb-8 italic 
                                            /* Responsive Fixes */
                                            line-clamp-3 
                                            wrap-break-word 
                                            overflow-hidden 
                                            max-w-full">
                                            {getExcerpt(project.description)}
                                        </p>
                                        <Link href={`/pages/portfolio/${project._id}`} className="group/btn flex items-center justify-between w-full p-5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-black hover:text-white transition-all shadow-lg">
                                            Analyze Technical Scope
                                            <HiArrowRight className="group-hover/btn:translate-x-2 transition-transform" size={20} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="absolute top-10 right-10 p-5 bg-black/30 backdrop-blur-xl rounded-[25px] border border-white/10 group-hover:bg-orange-600 transition-all duration-300 z-50 cursor-pointer">
                                    <Link
                                        href={`/pages/portfolio/${project._id}`}
                                        className="block relative z-50" // block class use kora hoyeche clickable area boro korar jonno
                                        onClick={(e) => e.stopPropagation()} // Eita oboshshoi dorkar jate card-er onno click-er sathe clash na hoy
                                    >
                                        <HiOutlineExternalLink className="text-white" size={28} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* --- Dynamic Portfolio CTA --- */}
                <div className="mt-28 p-10 md:p-12 rounded-[50px] bg-accent/20 border border-secondary/10 flex flex-col md:flex-row items-center justify-between gap-10 backdrop-blur-sm shadow-xl">
                    <div className="flex-1 space-y-3">
                        <div className="p-3 bg-orange-600/10 text-orange-600 rounded-2xl w-fit border border-orange-600/30">
                            <HiSearch size={28} />
                        </div>
                        <h2 className="text-foreground font-black text-3xl md:text-4xl uppercase italic tracking-tighter">
                            Looking for specific <span className="text-orange-600 underline underline-offset-8 decoration-white/10">protocols?</span>
                        </h2>
                        <p className="text-secondary font-bold text-sm max-w-lg leading-relaxed">
                            We provide technical documentation for residential and commercial dispatches similar to your case.
                        </p>
                    </div>
                    {/* <Link href="/pages/contact" className="px-14 py-6 bg-orange-600 text-white font-black rounded-3xl shadow-2xl shadow-orange-600/30 hover:bg-black transition-all hover:-translate-y-2 uppercase tracking-widest text-sm shrink-0">
                        Request Case Studies
                    </Link> */}
                    <InspectionTrigger />
                </div>
            </div>
        </div>
    );
}