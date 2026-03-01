"use client";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Assessment",
    description: "We start with an inspection and damage estimate to determine the scope of work."
  },
  {
    number: "02",
    title: "Mitigation",
    description: "We focus on preventing further damage from affecting your property and belongings."
  },
  {
    number: "03",
    title: "Restoration",
    description: "We help you recover from the damage, returning your property to pre-loss conditions."
  }
];

export default function Process() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--secondary)] opacity-70">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mt-2 mb-4">
            How We Work
          </h2>
          <p className="text-[var(--secondary)] max-w-2xl mx-auto text-sm md:text-base">
            Our process is designed to provide comprehensive restoration services, 
            ensuring your property is returned to its pre-damage condition.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center w-full lg:w-auto">
              {/* Card Container */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative flex-1 lg:w-[350px]"
              >
                {/* Number Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-orange-500 flex items-center justify-center text-white text-2xl font-black z-20 rounded-sm">
                  {step.number}
                </div>

                {/* Content Box */}
                <div className="bg-[#1e2235] pt-16 pb-12 px-8 text-center rounded-sm border border-white/5 shadow-xl">
                  <h3 className="text-2xl font-bold text-orange-500 mb-4 uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Arrow/Indicator for Desktop (Except last item) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center px-4">
                   <motion.span 
                     animate={{ x: [0, 5, 0] }}
                     transition={{ repeat: Infinity, duration: 1.5 }}
                     className="text-orange-500 text-3xl"
                   >
                     👉
                   </motion.span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}