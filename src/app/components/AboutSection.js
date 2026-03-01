/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Image with Orange Border Effect */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            {/* The Orange Decorative Box */}
            <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 border-[15px] border-orange-500 -z-10 hidden md:block" />
            
            <div className="relative rounded-sm overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800" 
                alt="Restoration Team"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="text-orange-600 font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
              Lets Know Us
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-6">
              Best Solution Team <br />
              Restoration Services
            </h2>
            
            <p className="text-sm md:text-base text-[var(--secondary)] leading-relaxed mb-8">
              At Prime Solution, we specialize in Water Damage, Fire Damage and Mold Restoration Services for 
              both Residential and Commercial Properties in Virginia State, primarily serving the counties of 
              Fairfax, Loudoun, Prince William etc.
            </p>

            {/* Testimonial Quote Section */}
            <div className="relative pl-6 border-l-4 border-orange-500 mb-10 bg-[var(--accent)]/30 py-4 pr-4">
              <p className="italic text-sm text-[var(--foreground)] mb-3">
                "When my basement flooded, I called these guys for help. They found the leak fast and fixed it 
                efficiently. Dealing with a flooded basement can be stressful, but they made it easy. I highly 
                recommend their services to anyone."
              </p>
              <h4 className="font-bold text-orange-600 text-sm italic">— Jacke Manders</h4>
            </div>

            {/* Bottom Stats/Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center rounded-md">
                   <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
                </div>
                <h3 className="font-extrabold text-lg text-foreground">Fast Response and Quality Results</h3>
                <p className="text-xs text-[var(--secondary)]">Our team ensures a rapid response to emergencies, delivering top-quality results to restore your property efficiently.</p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center rounded-md">
                   <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>
                </div>
                <h3 className="font-extrabold text-lg text-foreground">Have More Than 10+ Branch</h3>
                <p className="text-xs text-[var(--secondary)]">With over 10 branches, we are equipped to handle restoration projects of any scale.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}