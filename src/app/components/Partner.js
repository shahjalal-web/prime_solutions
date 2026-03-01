/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiFire, HiX } from "react-icons/hi";
import { FaHandHoldingDroplet } from "react-icons/fa6";
import { HiMiniExclamationTriangle } from "react-icons/hi2";

const serviceData = [
  {
    id: "water",
    title: "Water Damage Restoration",
    subtitle: "Flood, Leak & Structural Drying",
    icon: FaHandHoldingDroplet,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000",
    color: "blue",
    features: ["Rapid Extraction", "Dehumidification", "Burst Pipe Repair", "Flood Cleanup"],
    description: "Expert water extraction and drying services for homes and businesses."
  },
  {
    id: "fire",
    title: "Fire & Smoke Damage",
    subtitle: "Soot Removal & Deodorization",
    icon: HiFire,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
    color: "red",
    features: ["Soot Cleaning", "Odor Neutralization", "Structural Repair", "Content Cleaning"],
    description: "Complete restoration and deodorization after fire or smoke disasters."
  },
  {
    id: "mold",
    title: "Mold Remediation",
    subtitle: "Safe Removal & Prevention",
    icon: HiMiniExclamationTriangle,
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1000",
    color: "emerald",
    features: ["Mold Testing", "Containment", "Air Filtration", "Permanent Removal"],
    description: "Professional mold testing and remediation to protect your health."
  }
];

export default function ClientPartner() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    // bg-slate-950 soriye bg-[var(--background)] deya holo
    <section className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500 overflow-hidden">
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
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Our Recovery Services
          </h1>
          <p className="text-lg md:text-xl text-[var(--secondary)] max-w-2xl mx-auto">
            Licensed specialists available 24/7 to restore your property after Water, Fire, or Mold damage.
          </p>
        </motion.div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {serviceData.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.id}
                layoutId={`card-${service.id}`}
                onClick={() => setSelectedId(service.id)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                // bg-white soriye bg-[var(--accent)]/30 babohar kora hoyeche
                className="group relative h-[550px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl border border-[var(--secondary)]/10 bg-[var(--accent)]/30 backdrop-blur-sm transition-all duration-300"
              >
                {/* Image Reveal */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-0 group-hover:opacity-100"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                
                {/* Overlay Colors */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 opacity-0 group-hover:opacity-100
                  ${service.color === "blue" ? "from-blue-950/90 via-blue-900/40" : ""}
                  ${service.color === "red" ? "from-red-950/90 via-red-900/40" : ""}
                  ${service.color === "emerald" ? "from-emerald-950/90 via-emerald-900/40" : ""}
                  to-transparent`} 
                />

                <div className="absolute inset-0 p-10 flex flex-col justify-end z-10 transition-transform group-hover:-translate-y-4">
                  <div className="mb-6 flex items-center gap-4">
                    <Icon className={`text-5xl group-hover:text-white transition-colors
                      ${service.color === "blue" ? "text-blue-600" : ""}
                      ${service.color === "red" ? "text-red-600" : ""}
                      ${service.color === "emerald" ? "text-emerald-600" : ""}
                    `} />
                    <div>
                      <h3 className="text-3xl font-black text-[var(--foreground)] group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm font-semibold text-[var(--secondary)] group-hover:text-white transition-all">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <div className="max-h-0 overflow-hidden group-hover:max-h-64 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                    <p className="text-white text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map(f => (
                        <span key={f} className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/20 text-white border border-white/10">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-orange-500/30 bg-orange-600/10 flex items-center justify-center text-orange-600 group-hover:opacity-0 transition-opacity">
                  <span className="text-2xl">+</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Logic */}
        <AnimatePresence>
          {selectedId && (
            <motion.div 
              layoutId={`card-${selectedId}`}
              className="fixed inset-0 md:inset-x-12 md:inset-y-12 z-50 p-8 md:p-12 overflow-y-auto bg-[var(--background)] border border-[var(--secondary)]/20 rounded-[2rem] shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[var(--accent)] text-[var(--foreground)] hover:bg-orange-600 hover:text-white transition-colors z-20"
              >
                <HiX size={24} />
              </button>

              {serviceData.filter(s => s.id === selectedId).map(service => {
                const Icon = service.icon;
                
                return (
                  <div key={service.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <Icon className={`text-6xl ${service.color === "blue" ? "text-blue-600" : ""} ${service.color === "red" ? "text-red-600" : ""} ${service.color === "emerald" ? "text-emerald-600" : ""}`} />
                        <div>
                          <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)]">{service.title}</h2>
                          <p className="text-lg text-orange-600 font-bold">{service.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-lg text-[var(--secondary)] leading-relaxed mb-12">
                        Comprehensive restoration services for your home or business.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.features.map(f => (
                          <div key={f} className="p-4 rounded-xl flex items-center gap-3 bg-[var(--accent)] border border-[var(--secondary)]/10">
                            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">✓</div>
                            <span className="text-sm font-semibold text-[var(--foreground)]">{f}</span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-12 w-full sm:w-auto px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-xl shadow-lg transition-transform hover:scale-105">
                         Emergency Call (24/7)
                      </button>
                    </div>
                    <div className="relative h-[400px] lg:h-full rounded-2xl overflow-hidden shadow-2xl border border-[var(--secondary)]/10">
                       <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        
        {selectedId && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="fixed inset-0 bg-black z-40" />}
      </div>
    </section>
  );
}