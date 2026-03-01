/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutService() {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-left"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Rapid Response for <br />
              <span className="text-[var(--primary)] text-blue-600">Property Restoration</span>
            </h2>
            
            <p className="text-lg text-[var(--secondary)] mb-6 leading-relaxed">
              Disaster strikes without warning. Whether it's a burst pipe, a kitchen fire, or persistent mold growth, our certified experts are available 24/7 to secure your property. We don't just clean up; we restore your peace of mind.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Instant Damage Assessment",
                "Advanced Drying & Cleaning Tech",
                "Insurance Claim Assistance"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium text-foreground">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Link 
              href="/about" 
              className="inline-block px-8 py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Learn More About Us
            </Link>
          </motion.div>

          {/* Right Side: Image with Decorative Elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" 
                alt="Restoration Process"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Stats Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 hidden sm:block"
            >
              <p className="text-3xl font-bold text-blue-600">15+</p>
              <p className="text-sm font-medium text-gray-500">Years of Experience</p>
            </motion.div>

            {/* Background Shape */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-0" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}