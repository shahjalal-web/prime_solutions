"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Water Damage",
    subtitle: "Flood & Leak Recovery",
    image:
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800",
    description:
      "Expert water extraction and drying services for homes and businesses.",
  },
  {
    id: 2,
    title: "Fire Damage",
    subtitle: "Soot & Smoke Removal",
    image:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800",
    description:
      "Complete restoration and deodorization after fire or smoke disasters.",
  },
  {
    id: 3,
    title: "Mold Remediation",
    subtitle: "Safe & Permanent Removal",
    image:
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800",
    description:
      "Professional mold testing and remediation to protect your health.",
  },
];

export default function Services() {
  // Center card default active thakbe
  const [activeCard, setActiveCard] = useState(1);

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Expertise</h2>
          <p className="text-(--secondary) max-w-xl mx-auto">
            Professional disaster recovery solutions available 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isActive = activeCard === index;

            return (
              <motion.div
                key={service.id}
                onClick={() => setActiveCard(index)} // Mobile tap support
                onMouseEnter={() => setActiveCard(index)} // Desktop hover support
                className="group relative h-112.5 md:h-125 rounded-4xl overflow-hidden cursor-pointer transition-all duration-500 bg-[#1a1f2e] border border-white/5 shadow-2xl"
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 
                    ${isActive ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
                  style={{ backgroundImage: `url(${service.image})` }}
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent transition-opacity duration-500
                   ${isActive ? "opacity-100" : "opacity-0"}`}
                />

                {/* Content Area */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <p className="text-blue-400 font-bold text-xs mb-2 uppercase tracking-widest">
                    {service.subtitle}
                  </p>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {service.title}
                  </h3>

                  {/* Expandable Content */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden
                    ${isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30">
                      Get a Quote
                    </button>
                  </div>
                </div>

                {/* Floating Plus Icon */}
                {!isActive && (
                  <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-sm text-white text-xl">
                    +
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
