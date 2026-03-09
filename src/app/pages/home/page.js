/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import InspectionModal from "../../components/InspectionModal";
import { HiPhone, HiShieldCheck } from "react-icons/hi";
import { useState } from "react";
import InspectionTrigger from "../../pages/service-details/[slug]/InspectionTrigger";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="relative min-h-[90vh] flex items-center bg--background pt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

          <h1 className="text-4xl md:text-6xl font-black text--foreground leading-tight mb-6">
            Property Restoration <br />
            <span className="text-orange-600">Like It Never Happened.</span>
          </h1>

          <p className="text-lg text--secondary mb-8 leading-relaxed max-w-lg">
            From water damage to fire disasters, our certified technicians are
            ready to restore your home or business. Fast response, expert care,
            and insurance-approved results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mt-8">
            {/* Call Now Button with Hover Transition */}
            <a
              href="tel:+157165572079"
              className="relative group flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 text-white font-black rounded-xl overflow-hidden shadow-xl shadow-orange-600/20 transition-all active:scale-95 min-w-60"
            >
              {/* Background Animation on Hover */}
              <div className="absolute inset-0 bg-orange-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

              {/* Default State: Icon + Call Now */}
              <span className="relative z-10 flex items-center gap-3 group-hover:opacity-0 group-hover:-translate-y-4 transition-all duration-300">
                <HiPhone size={22} className="animate-pulse" />
                <span>CALL NOW (24/7)</span>
              </span>

              {/* Hover State: The Phone Number */}
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-mono text-lg tracking-wider">
                <HiPhone size={20} />
                +1 (571)-655-7207
              </span>
            </a>

            {/* Request Inspection Button */}

            <InspectionTrigger />

            {/* View Services Button - Modern Minimalist */}
            {/* <Link
              href="/pages/services"
              className="group relative flex items-center justify-center gap-2 px-8 py-4 bg--accent/30 text--foreground font-bold rounded-xl border border--secondary/10 hover:bg--accent transition-all text-center overflow-hidden"
            >
              <span className="relative z-10">Explore Services</span>
              <motion.span
                initial={{ x: -5 }}
                whileHover={{ x: 2 }}
                className="relative z-10 text-orange-600"
              >
                →
              </motion.span>
              <div className="absolute inset-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700" />
            </Link> */}
          </div>
        </motion.div>

        {/* Visual / Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800"
            alt="Restoration"
            className="rounded-3xl shadow-2xl relative z-10"
          />

          {/* Trust Badge */}
          <div className="absolute -bottom-10 -left-10 z-20 flex items-center justify-center group">
            {/* Rotating Background Circle (Decorative) */}
            <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all duration-500" />

            <div className="relative bg--background p-1.5 rounded-full shadow-2xl border border--secondary/10 backdrop-blur-sm">
              <div className="w-28 h-28 rounded-full bg-linear-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center text-center shadow-inner border-4 border--background">
                {/* Icon & Year */}
                <HiShieldCheck className="text-white/90 mb-0.5" size={26} />
                <p className="font-black text-3xl text-white leading-none tracking-tighter">
                  15+
                </p>

                {/* Circular Text Effect (Simple approximation) */}
                <p className="text-[9px] font-bold text-blue-100 uppercase tracking-widest mt-1 px-2 leading-tight">
                  YEARS EXPERT
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
