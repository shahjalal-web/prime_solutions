/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "SOS: How to Spot and Solve Water Leaks Like a Pro",
    excerpt: "Learn how to safeguard your home against sneaky water leaks. Top tricks to prevent significant damage.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
    category: "Water Damage"
  },
  {
    id: 2,
    title: "Stop Water Damage Before it Starts: Secrets to Finding Hidden Leaks!",
    excerpt: "How to find a water leak inside a wall? Detecting hidden leaks is crucial to prevent costly repairs.",
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800",
    category: "Prevention"
  },
  {
    id: 3,
    title: "Mold Unveiled: What You Need to Know for a Mold-Free Home",
    excerpt: "Discover the hidden dangers and practical solutions for a mold-free living environment. Act today for cleaner living!",
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800",
    category: "Mold Remediation"
  }
];

export default function BlogGrid() {
  return (
    <section className="py-24 bg-[var(--background)] transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-[var(--foreground)] mb-6">
            Read Our Content
          </h2>
          <p className="text-[var(--secondary)] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Explore our blog for expert insights, tips, and updates on restoration services, 
            including water damage prevention, mold remediation, and property reconstruction.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative h-64 overflow-hidden rounded-sm mb-6 shadow-md">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  {blog.category}
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-extrabold text-orange-600 leading-tight group-hover:underline transition-all">
                  {blog.title}
                </h3>
                <p className="text-(--secondary) text-sm leading-relaxed">
                  {blog.excerpt}
                </p>
                <button className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <span>»</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}