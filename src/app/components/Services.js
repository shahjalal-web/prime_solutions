"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiArrowRight, HiOutlineShieldCheck } from "react-icons/hi";

const servicesData = {
  residential: [
    {
      id: "r1",
      title: "Water Damage",
      subtitle: "Flood & Leak Recovery",
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800",
      description: "Expert water extraction and drying services for your home.",
    },
    {
      id: "r2",
      title: "Fire Damage",
      subtitle: "Soot & Smoke Removal",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800",
      description: "Complete residential restoration and deodorization after fire disasters.",
    },
    {
      id: "r3",
      title: "Trauma Cleanup",
      subtitle: "Biohazard & Crime Scene",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
      description: "Discreet and professional biohazard remediation services.",
    },
  ],
  commercial: [
    {
      id: "c1",
      title: "Commercial Water",
      subtitle: "Large Scale Drying",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
      description: "Minimizing business downtime with rapid industrial drying solutions.",
    },
    {
      id: "c2",
      title: "Vandalism Removal",
      subtitle: "Graffiti & Board-Up",
      image: "https://images.unsplash.com/photo-1517520287167-4bda64282b54?q=80&w=800",
      description: "Restoring your business facade from graffiti and broken windows.",
    },
    {
      id: "c3",
      title: "Mold Remediation",
      subtitle: "Industrial Standards",
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800",
      description: "OSHA-compliant mold removal for commercial properties.",
    },
  ]
};

export default function Services() {
  const [viewType, setViewType] = useState("residential");
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="py-24 bg--background overflow-hidden transition-colors">
      <div className="container mx-auto px-6">
        
        {/* Header with Commercial/Residential Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="text-left max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text--foreground tracking-tighter mb-4 uppercase italic">
              Our <span className="text-orange-600">Expertise</span>
            </h2>
            <p className="text--secondary font-medium border-l-4 border-orange-600 pl-4">
              Professional disaster recovery solutions available 24/7.
            </p>
          </div>

          {/* SERVPRO Style Switcher */}
          <div className="flex bg--accent/20 p-1.5 rounded-2xl border border--secondary/10 backdrop-blur-sm">
            {["residential", "commercial"].map((type) => (
              <button
                key={type}
                onClick={() => { setViewType(type); setActiveCard(0); }}
                className={`px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                  viewType === type 
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" 
                  : "text--secondary hover:text--foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {servicesData[viewType].map((service, index) => {
              const isActive = activeCard === index;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onMouseEnter={() => setActiveCard(index)}
                  className={`group relative h-[500px] rounded-[40px] overflow-hidden cursor-pointer transition-all duration-700 border-2 ${
                    isActive ? "border-orange-600 scale-[1.02] shadow-2xl" : "border-transparent opacity-80"
                  }`}
                >
                  {/* Background Image with Zoom */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />

                  {/* Darker Overlay for Text Readability */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive ? "bg-gradient-to-t from-black via-black/60 to-transparent" : "bg-black/40"
                  }`} />

                  {/* Content Area */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-[2px] bg-orange-600"></div>
                      <p className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em]">
                        {service.subtitle}
                      </p>
                    </div>
                    
                    <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">
                      {service.title}
                    </h3>

                    {/* Expandable Action Section */}
                    <div className={`transition-all duration-500 ease-in-out ${
                      isActive ? "max-h-60 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-10"
                    }`}>
                      <p className="text-gray-300 text-sm font-medium leading-relaxed mb-8">
                        {service.description}
                      </p>
                      
                      <button className="group/btn flex items-center justify-between w-full p-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-orange-600 hover:text-white transition-all">
                        Get Estimate
                        <HiArrowRight className="group-hover/btn:translate-x-2 transition-transform" size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Trust Icon */}
                  <div className="absolute top-8 left-8 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <HiOutlineShieldCheck className="text-white" size={24} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-20 p-8 rounded-[35px] bg--accent/10 border border--secondary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text--foreground font-bold text-xl">
            Not sure what you need? <span className="text-orange-600">We offer free onsite inspections.</span>
          </p>
          <a href="tel:+12345678" className="px-10 py-4 bg-orange-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all">
            24/7 EMERGENCY HELP
          </a>
        </div>
      </div>
    </section>
  );
}