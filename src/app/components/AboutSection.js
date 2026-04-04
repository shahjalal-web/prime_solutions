/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import InspectionTrigger from "../pages/service-details/[slug]/InspectionTrigger";

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
            <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 border-15 border-orange-500 -z-10 hidden md:block" />

            <div className="relative rounded-sm overflow-hidden shadow-2xl">
              <img
                src="/about.jpg"
                alt="Professional Restoration Team in Virginia"
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
            <span className="text-orange-600 font-bold text-xs uppercase tracking-[0.2em] mb-4 block italic">
              Experience the Prime Difference
            </span>
            
            {/* H2 with Local Keywords */}
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-6 uppercase italic tracking-tighter">
              Virginia's Expert <br />
              <span className="text-orange-600">Property Restoration</span> Team
            </h2>

            {/* Content with County Keywords (SEO Optimized) */}
            <p className="text-sm md:text-base text-secondary leading-relaxed mb-8 italic font-medium">
              Prime Solution Restoration is your trusted partner for <strong className="text-foreground">Water Damage, Fire Damage, and Mold Remediation</strong>.
              We proudly serve residential and commercial properties throughout <strong className="text-foreground">Virginia</strong>, specialized in{" "}
              <strong className="text-foreground">Loudoun, Fairfax, and Prince William County</strong>. Our reach extends to <strong className="text-foreground">Washington DC, Montgomery County (MD),
              Frederick County (MD), and Jefferson County (WV)</strong>.
            </p>

            {/* Testimonial Quote Section */}
            <div className="relative pl-6 border-l-4 border-orange-500 mb-10 bg-card py-6 pr-4 rounded-r-2xl shadow-inner">
              <p className="italic text-sm text-foreground mb-3 leading-relaxed">
                "When my basement flooded in Fairfax, I called Prime Solution. They arrived fast, 
                handled the structural drying, and made a stressful situation easy. 
                I highly recommend their emergency restoration services to anyone in Virginia!"
              </p>
              <h4 className="font-black text-orange-600 text-xs uppercase tracking-widest">
                — Jack Manders, Virginia Resident
              </h4>
            </div>

            <div className="mb-10">
               <InspectionTrigger />
            </div>

            {/* Bottom Stats/Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-2">
              {/* Feature 1: Quality & Fast Response */}
              <div className="flex flex-col gap-3 group">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center rounded-xl group-hover:bg-orange-600 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                  </svg>
                </div>
                <h3 className="font-black text-lg text-foreground uppercase italic tracking-tight">
                  24/7 Rapid Response
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Emergencies don't wait. Our certified technicians provide immediate 
                  on-site inspection and quality restoration results across the DMV area.
                </p>
              </div>

              {/* Feature 2: Wide Coverage Area */}
              <div className="flex flex-col gap-3 group">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center rounded-xl group-hover:bg-orange-600 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
                  </svg>
                </div>
                <h3 className="font-black text-lg text-foreground uppercase italic tracking-tight">
                   Multi-County Service
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  From Northern Virginia to Montgomery County MD, our regional branches 
                  are equipped to handle restoration projects of any scale.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}