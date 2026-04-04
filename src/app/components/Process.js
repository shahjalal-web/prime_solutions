"use client";
import { motion } from "framer-motion";
import { HiArrowNarrowRight } from "react-icons/hi";

const steps = [
  {
    number: "01",
    title: "You Call, We Arrive",
    description: "Call us 24/7 — our certified team arrives within 60 minutes. Free on-site inspection, no obligation. We assess the damage and create an action plan."
  },
  {
    number: "02",
    title: "We Handle Everything",
    description: "Emergency mitigation starts immediately — water extraction, structural drying, board-up, content protection. We also file your insurance claim directly so you don't have to."
  },
  {
    number: "03",
    title: "Property Restored",
    description: "Full restoration from drywall repair to final paint. We return your home or business to its pre-loss condition — like it never happened. Guaranteed."
  }
];

export default function Process() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
            Our Certified Protocol
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mt-4 mb-6 uppercase italic tracking-tighter">
            The Prime Solution <span className="text-orange-600">Workflow</span>
          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-sm md:text-base italic font-medium">
            Our systematic approach ensures rapid response and high-quality results for water, 
            fire, and mold restoration across Loudoun, Fairfax, and Montgomery counties.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center w-full lg:w-auto relative group">
              
              {/* Card Container */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative flex-1 lg:w-95"
              >
                {/* Number Badge with Glow */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-orange-600 flex items-center justify-center text-white text-2xl font-black z-20 rounded-xl shadow-lg shadow-orange-600/30 group-hover:scale-110 transition-transform">
                  {step.number}
                </div>

                {/* Content Box */}
                <div className="bg-card pt-16 pb-12 px-8 text-center rounded-4xl border border-border shadow-2xl group-hover:border-orange-600/30 transition-all duration-500">
                  <h3 className="text-2xl font-black text-foreground mb-4 uppercase italic tracking-tight group-hover:text-orange-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Arrow Indicator for Desktop (Except last item) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center px-2 opacity-50">
                   <motion.div 
                     animate={{ x: [0, 8, 0] }}
                     transition={{ repeat: Infinity, duration: 2 }}
                   >
                     <HiArrowNarrowRight size={32} className="text-orange-600" />
                   </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}