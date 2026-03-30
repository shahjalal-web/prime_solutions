"use client";
import { motion } from "framer-motion";
import { HiPhone, HiShieldCheck, HiClock, HiCash } from "react-icons/hi";
import InspectionTrigger from "../pages/service-details/[slug]/InspectionTrigger";

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-foreground text-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-600/10 blur-[100px] rounded-full -ml-36 -mb-36" />

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <p className="text-orange-600 font-black text-xs uppercase tracking-[0.3em]">
            Ready to Restore Your Property?
          </p>

          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">
            Don&apos;t Wait. <br />
            <span className="text-orange-600">Every Minute Counts.</span>
          </h2>

          <p className="text-background/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Water damage gets worse every hour. Mold starts growing in 24 hours. Call us now and we&apos;ll be at your door within 60 minutes.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {[
              { icon: HiClock, text: "60 Min Response" },
              { icon: HiShieldCheck, text: "Licensed & Insured" },
              { icon: HiCash, text: "Insurance Handled" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <item.icon className="text-orange-600" size={16} />
                <span className="text-xs font-black text-white/80 uppercase tracking-wider">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="tel:+15716557207"
              className="flex items-center gap-3 bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-all shadow-2xl shadow-red-600/30"
            >
              <HiPhone size={22} className="animate-pulse" />
              Call (571) 655-7207
            </a>
            <InspectionTrigger />
          </div>

          <p className="text-background/30 text-[10px] font-bold uppercase tracking-widest pt-2">
            Free inspection. No obligation. Available 24/7/365.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
