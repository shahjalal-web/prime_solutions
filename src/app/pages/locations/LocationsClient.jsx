"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowNarrowRight, HiLocationMarker, HiSearch, HiPhone } from "react-icons/hi";

function toSlug(name) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Group cities by county
function groupByCounty(cities) {
    const groups = {};
    const order = ["Loudoun County", "Fairfax County", "Prince William County", "Arlington County", "Independent City", "Washington DC", "Maryland", ""];
    cities.forEach((city) => {
        const key = city.county || "Other Areas";
        if (!groups[key]) groups[key] = [];
        groups[key].push(city);
    });
    // Sort groups by predefined order
    const sorted = {};
    order.forEach((key) => {
        const label = key || "Other Areas";
        if (groups[label]) sorted[label] = groups[label];
    });
    // Add any remaining groups
    Object.keys(groups).forEach((key) => {
        if (!sorted[key]) sorted[key] = groups[key];
    });
    return sorted;
}

export default function LocationsClient({ cities }) {
    const [search, setSearch] = useState("");

    const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(search.toLowerCase()) ||
        (city.county && city.county.toLowerCase().includes(search.toLowerCase()))
    );

    const grouped = groupByCounty(filtered);
    const totalResults = filtered.length;

    return (
        <div className="min-h-screen bg-background pt-10 pb-24 px-6 selection:bg-primary/10">

            {/* --- Hero Section --- */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <HiLocationMarker className="text-primary" size={20} />
                            <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">
                                Northern VA · DC · MD
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase italic text-foreground tracking-tighter leading-none mb-6">
                            Our Service
                            <span className="text-primary"> Areas</span>
                        </h1>

                        <p className="text-secondary font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-12">
                            We provide 24/7 emergency restoration services across Northern Virginia, Washington DC, and Maryland. Find your city below.
                        </p>
                    </motion.div>

                    {/* --- Search Bar --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-xl mx-auto"
                    >
                        <div className="relative group">
                            <HiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" size={22} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search your city or county..."
                                className="w-full bg-card border-2 border-border rounded-2xl py-5 pl-14 pr-6 outline-none font-bold text-foreground placeholder:text-secondary/50 focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all text-lg"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground text-sm font-black uppercase tracking-widest transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <p className="text-secondary/60 text-xs font-bold mt-3 tracking-wide">
                            {search ? `${totalResults} ${totalResults === 1 ? "city" : "cities"} found` : `${cities.length} cities across the DMV region`}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- Emergency Banner --- */}
            {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-5xl mx-auto mb-16"
            >
                <div className="bg-foreground text-background rounded-[30px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 blur-[60px] rounded-full -mr-10 -mt-10" />
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Emergency? Don&apos;t wait.</p>
                        <p className="text-lg md:text-xl font-black uppercase italic tracking-tight">We respond within 60 minutes — anywhere in our service area</p>
                    </div>
                    <a
                        href="tel:+15716557207"
                        className="relative z-10 flex items-center gap-3 bg-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-500 hover:text-white transition-all shadow-lg shadow-primary/30 whitespace-nowrap"
                    >
                        <HiPhone className="animate-pulse" size={20} /> Call 24/7
                    </a>
                </div>
            </motion.div> */}

            {/* --- Cities Grouped by County --- */}
            <div className="max-w-6xl mx-auto space-y-16">
                <AnimatePresence mode="wait">
                    {Object.keys(grouped).length === 0 ? (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="text-center py-20 bg-card/50 backdrop-blur-md rounded-[40px] border-2 border-dashed border-border"
                        >
                            <HiSearch className="mx-auto text-secondary/30 mb-4" size={48} />
                            <p className="text-secondary font-bold italic tracking-tight text-lg">
                                No cities found for &quot;{search}&quot;
                            </p>
                            <p className="text-secondary/50 text-sm mt-2">Try a different search term or county name</p>
                        </motion.div>
                    ) : (
                        Object.entries(grouped).map(([county, countyGroup], groupIndex) => (
                            <motion.div
                                key={county}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                            >
                                {/* County Header */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <HiLocationMarker className="text-primary" size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-foreground">
                                            {county}
                                        </h2>
                                        <p className="text-secondary text-xs font-bold">
                                            {countyGroup.length} {countyGroup.length === 1 ? "location" : "locations"}
                                        </p>
                                    </div>
                                    <div className="flex-1 h-px bg-border ml-4" />
                                </div>

                                {/* City Cards Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {countyGroup.map((city, index) => (
                                        <motion.div
                                            key={city._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.04 }}
                                        >
                                            <Link
                                                href={`/pages/locations/${toSlug(city.name)}`}
                                                className="group relative bg-card/70 backdrop-blur-xl rounded-[24px] p-5 transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(15,23,42,0.1)] hover:-translate-y-1.5 flex flex-col ring-1 ring-border/50 hover:ring-primary/40 h-full"
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                                        <HiLocationMarker className="text-primary group-hover:text-white transition-colors duration-300" size={16} />
                                                    </div>
                                                    {city.description && (
                                                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[8px] font-black uppercase tracking-wider">
                                                            Detailed
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-lg font-black uppercase italic tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                                                    {city.name}
                                                </h3>

                                                <p className="text-[10px] font-bold text-secondary/60 uppercase tracking-wider mb-4">
                                                    Virginia
                                                </p>

                                                <div className="mt-auto flex items-center justify-between bg-background border border-border px-3 py-2.5 rounded-xl group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-foreground group-hover:text-orange-600 transition-colors duration-300">
                                                        View Services
                                                    </span>
                                                    <HiArrowNarrowRight className="text-primary group-hover:text-white group-hover:translate-x-1 transition-all duration-300" size={14} />
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
