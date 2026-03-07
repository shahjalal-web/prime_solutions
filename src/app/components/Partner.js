/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiPlus, HiArrowRight } from "react-icons/hi";
import Link from "next/link";

const categoryUIConfig = {
  "Water Damage Restoration": {
    color: "blue",
    gradient: "from-blue-950/90 via-blue-900/40 to-transparent",
    iconColor: "text-blue-600",
  },
  "Fire & Smoke Damage": {
    color: "red",
    gradient: "from-red-950/90 via-red-900/40 to-transparent",
    iconColor: "text-red-600",
  },
  "Mold Remediation": {
    color: "emerald",
    gradient: "from-emerald-950/90 via-emerald-900/40 to-transparent",
    iconColor: "text-emerald-600",
  },
};

const defaultUI = {
  color: "slate",
  gradient: "from-slate-950/90 via-slate-900/40 to-transparent",
  iconColor: "text-slate-600",
};

export default function ClientPartner() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        const data = await res.json();
        setCategories(data.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, [API_URL]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setSubCategories([]);
    try {
      const res = await fetch(
        `${API_URL}/sub-categories?category=${category._id}`,
      );
      const data = await res.json();
      setSubCategories(data.data || []);
    } catch (err) {
      console.error("Error fetching sub-categories:", err);
    }
  };

  if (loading)
    return (
      <div className="py-20 text-center font-black uppercase italic tracking-widest opacity-50">
        Initializing expertise...
      </div>
    );

  return (
    <section className="bg-(--background) text-(--foreground) transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6 py-20 md:py-32 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-orange-600 font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
            Expert Restoration
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight uppercase italic tracking-tighter">
            Our Recovery Services
          </h1>
          <p className="text-lg md:text-xl text-(--secondary) max-w-2xl mx-auto font-medium">
            Licensed specialists available 24/7 to restore your property.
          </p>
        </motion.div>

        {/* --- Interactive Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative">
          {categories.map((cat, index) => {
            const ui = categoryUIConfig[cat.name] || defaultUI;

            return (
              <motion.div
                key={cat._id}
                layoutId={`card-${cat._id}`}
                onClick={() => handleCategoryClick(cat)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-96 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg shadow-green-400 hover:shadow-2xl border border-(--secondary)/10 bg-(--accent)/30 backdrop-blur-sm transition-all duration-300"
              >
                {/* 1. Image logic: Mobile-e full visible, Desktop-e grayscale logic */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 
                             grayscale-0 md:grayscale-30 md:group-hover:grayscale-0 
                             opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  style={{ backgroundImage: `url(${cat.image?.url})` }}
                />

                {/* 2. Gradient Overlay: Mobile-e default light overlay, Desktop-e hover effects */}
                <div
                  className={`absolute inset-0 bg-linear-to-t transition-opacity duration-500 
                             opacity-40 md:opacity-0 md:group-hover:opacity-100 ${ui.gradient} 
                             bg-black/20 md:bg-transparent`}
                />

                {/* --- Content --- */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end z-10 transition-transform md:group-hover:-translate-y-2">
                  <div className="mb-6">
                    <h3 className="text-3xl font-black text-white md:text-(--foreground) md:group-hover:text-white transition-colors uppercase italic tracking-tighter leading-none">
                      {cat.name}
                    </h3>
                    <p className="text-sm font-semibold text-white/80 md:text-(--secondary) md:group-hover:text-white transition-all uppercase tracking-widest mt-2">
                      View Specialized Services
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-orange-400 md:text-primary font-black uppercase text-[10px] tracking-[0.2em] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                    Analyze Solutions <HiArrowRight size={14} />
                  </div>
                </div>

                {/* 3. Plus Icon Styling */}
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-orange-500/30 bg-orange-600/10 flex items-center justify-center text-orange-600 md:group-hover:bg-orange-600 md:group-hover:text-white transition-all duration-500 shadow-lg z-20">
                  <HiPlus size={24} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- Modal / Expanded Category Logic --- */}
        <AnimatePresence>
          {selectedCategory && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCategory(null)}
                className="fixed inset-0 bg-black z-60"
              />

              <motion.div
                layoutId={`card-${selectedCategory._id}`}
                className="fixed inset-2 md:inset-10 lg:inset-20 z-70 p-6 md:p-14 overflow-y-auto bg-(--background) border border-(--secondary)/10 rounded-[2.5rem] shadow-2xl flex flex-col"
              >
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-(--accent) text-(--foreground) hover:bg-orange-600 hover:text-white transition-colors z-20 shadow-md"
                >
                  <HiX size={26} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mt-8">
                  <div className="space-y-8">
                    <div>
                      <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs">
                        Dynamic Analysis
                      </span>
                      <h2 className="text-4xl md:text-6xl font-black text-(--foreground) uppercase italic tracking-tighter leading-none mt-4">
                        {selectedCategory.name}{" "}
                        <span className="text-orange-600">Solutions</span>
                      </h2>
                    </div>

                    <p className="text-md md:text-lg text-(--secondary) leading-relaxed font-medium italic">
                      Select your sub Category to view detailed restoration
                      protocols.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {subCategories.length > 0 ? (
                        subCategories.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/pages/service-details/${sub.slug}`}
                            className="group/item p-5 rounded-4xl flex items-center justify-between bg-(--accent)/50 border border-(--secondary)/10 hover:border-orange-600/30 hover:shadow-xl transition-all duration-500"
                          >
                            <div className="flex flex-col">
                              <span className="text-[9px] font-black text-orange-600 uppercase mb-1 tracking-widest">
                                {sub.serviceType}
                              </span>
                              <span className="text-md font-black text-(--foreground) uppercase italic tracking-tight group-hover/item:text-orange-600 transition-colors">
                                {sub.name}
                              </span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-(--background) flex items-center justify-center text-orange-600 group-hover/item:bg-orange-600 group-hover/item:text-white transition-all">
                              <HiArrowRight size={16} />
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-(--secondary) italic font-bold py-10">
                          Loading solutions...
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative h-64 lg:h-full rounded-[2.5rem] overflow-hidden border border-(--secondary)/10 shadow-2xl order-first lg:order-last">
                    <img
                      src={selectedCategory.image?.url}
                      alt={selectedCategory.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
