/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { HiPhone, HiShieldCheck } from "react-icons/hi";
import InspectionTrigger from "../../pages/service-details/[slug]/InspectionTrigger";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg--background pt-20 overflow-hidden">
      
      {/* --- SEO Hidden Section (Hidden from users, visible to Google) --- */}
      <div className="sr-only">
        <h2>Water Damage Restoration in Loudoun County & Fairfax County</h2>
        <h2>Fire Disaster Recovery and Mold Remediation Virginia</h2>
        <p>Prime Solution Restoration serves Prince William County, Washington DC, Montgomery County MD, and Frederick County. Experts in drywall repair and structural drying.</p>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Emergency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Available 24/7 for Emergencies
          </div>

          {/* Main H1 - SEO Focused */}
          <h1 className="text-4xl md:text-6xl font-black text--foreground leading-tight mb-6 uppercase italic tracking-tighter">
            Property Restoration <br />
            <span className="text-orange-600">Like It Never Happened.</span>
          </h1>

          {/* P tag with Location Keywords for Local SEO */}
          <p className="text-lg text--secondary mb-8 leading-relaxed max-w-lg italic">
            Certified restoration experts serving **Loudoun, Fairfax, and Prince William County**. 
            From water damage to fire disasters, we provide fast, insurance-approved 
            recovery across **VA, DC, and MD**.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mt-8">
            <a
              href="tel:+157165572079"
              className="relative group flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 text-white font-black rounded-xl overflow-hidden shadow-xl shadow-orange-600/20 transition-all active:scale-95 min-w-60"
            >
              <div className="absolute inset-0 bg-orange-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-3 group-hover:opacity-0 group-hover:-translate-y-4 transition-all duration-300">
                <HiPhone size={22} className="animate-pulse" />
                <span>CALL NOW (24/7)</span>
              </span>
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-mono text-lg tracking-wider">
                <HiPhone size={20} />
                +1 (571)-655-7207
              </span>
            </a>

            <InspectionTrigger />
          </div>
        </motion.div>

        {/* Visual / Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main Image with SEO Alt Text */}
          <img
            src="hero.jfif"
            alt="Prime Solution Restoration - Emergency Fire and Water Damage Service Virginia"
            className="rounded-[40px] shadow-2xl relative z-10 border-8 border-card/50"
          />

          {/* Trust Badge */}
          <div className="absolute -bottom-10 -left-10 z-20 flex items-center justify-center group">
            <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all duration-500" />
            <div className="relative bg--background p-1.5 rounded-full shadow-2xl border border--secondary/10 backdrop-blur-sm">
              <div className="w-28 h-28 rounded-full bg-linear-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center text-center shadow-inner border-4 border--background">
                <HiShieldCheck className="text-white/90 mb-0.5" size={26} />
                <p className="font-black text-3xl text-white leading-none tracking-tighter">15+</p>
                <p className="text-[9px] font-bold text-blue-100 uppercase tracking-widest mt-1 px-2 leading-tight">YEARS EXPERT</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Background SEO Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/5 blur-[120px] -z-10" />
    </section>
  );
}