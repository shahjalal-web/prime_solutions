/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { HiArrowNarrowRight, HiHome, HiOfficeBuilding, HiX } from "react-icons/hi";

export default function ServiceListClient({ initialServices }) {
  const [activeType, setActiveType] = useState(null);

  const toggleFilter = (type) => {
    setActiveType(activeType === type ? null : type);
  };

  const filteredServices = initialServices.filter((sub) => {
    if (!activeType) return true;
    if (activeType === "residential") return sub.serviceType === "Residential" || sub.serviceType === "Both";
    if (activeType === "commercial") return sub.serviceType === "Commercial" || sub.serviceType === "Both";
    return true;
  });

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-col items-center mb-16 gap-4">
        <div className="flex bg-accent/40 p-1.5 rounded-3xl w-fit border border-border shadow-inner backdrop-blur-md">
          <button
            onClick={() => toggleFilter("residential")}
            className={`flex items-center gap-2 px-8 py-4 rounded-[20px] font-black uppercase text-xs tracking-widest transition-all duration-500 ${activeType === "residential" ? "bg-card shadow-xl text-orange-500 scale-105 ring-1 ring-orange-500/20" : "text-secondary hover:text-orange-500"}`}
          >
            <HiHome size={18} /> Residential
          </button>
          <button
            onClick={() => toggleFilter("commercial")}
            className={`flex items-center gap-2 px-8 py-4 rounded-[20px] font-black uppercase text-xs tracking-widest transition-all duration-500 ${activeType === "commercial" ? "bg-card shadow-xl text-orange-500 scale-105 ring-1 ring-orange-500/20" : "text-secondary hover:text-orange-500"}`}
          >
            <HiOfficeBuilding size={18} /> Commercial
          </button>
        </div>
        {activeType && (
          <button onClick={() => setActiveType(null)} className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-1 hover:underline">
            <HiX size={12} /> Clear Filter
          </button>
        )}
      </div>

      {/* Grid Display */}
      {filteredServices.length === 0 ? (
        <div className="max-w-xl mx-auto text-center py-20 bg-card/50 backdrop-blur-md rounded-[50px] border-2 border-dashed border-border">
          <p className="text-secondary font-bold italic tracking-tight uppercase text-xs">No {activeType} services found.</p>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-fit">
            {filteredServices.map((sub) => (
              <div key={sub._id} className="group relative bg-card border border-border rounded-[40px] p-4 transition-all duration-700 hover:-translate-y-3 flex flex-col w-64 hover:shadow-2xl hover:border-primary/20">
                <div className="relative h-56 w-full overflow-hidden rounded-4xl mb-6 shadow-inner bg-accent">
                  <img src={sub.image?.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-30 group-hover:grayscale-0" alt={sub.name} />
                  <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-md border border-border text-orange-500 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {sub.serviceType}
                  </div>
                </div>
                <div className="px-3 flex-1 flex flex-col">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter leading-[1.1] mb-3 text-foreground group-hover:text-primary transition-colors min-h-12">{sub.name}</h3>
                  <div className="text-secondary text-[11px] leading-relaxed line-clamp-2 mb-8 font-medium" dangerouslySetInnerHTML={{ __html: sub.description }} />
                  <div className="mt-auto pb-3">
                    <a href={`/pages/service-details/${sub.slug}`} className="flex items-center justify-between bg-foreground text-card px-6 py-4 rounded-[22px] font-black uppercase text-[10px] tracking-widest transition-all duration-500 hover:bg-primary hover:shadow-xl active:scale-95">
                      View Details
                      <div className="bg-card/10 p-1 rounded-lg group-hover:translate-x-1 transition-transform">
                        <HiArrowNarrowRight size={14} />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}