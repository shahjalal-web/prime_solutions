/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogGrid() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs`);
        const data = await res.json();
        // Landing page-er grid-er jonno amra prothom 3-ti blog nicchi
        setBlogs(data.data?.slice(0, 3) || []);
      } catch (err) {
        console.error("Blog fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [API_URL]);

  // Content theke HTML tags remove kore plain text extract korar utility
  const getExcerpt = (html, limit = 120) => {
    const plainText = html?.replace(/<[^>]*>?/gm, "") || "";
    return plainText.length > limit
      ? plainText.substring(0, limit) + "..."
      : plainText;
  };

  if (loading) {
    return (
      <div className="py-24 text-center font-black uppercase italic tracking-widest opacity-30">
        Loading Expert Insights...
      </div>
    );
  }

  return (
    <section className="py-24 bg-(--background) transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-(--foreground) mb-6 uppercase italic tracking-tighter">
            Read Our <span className="text-orange-600">Content</span>
          </h2>
          <p className="text-(--secondary) max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Explore our blog for expert insights, tips, and updates on
            restoration services, including water damage prevention, mold
            remediation, and property reconstruction.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <Link href={`/pages/blogs/${blog.slug}`}>
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden rounded-sm mb-6 shadow-md bg-accent/20">
                  <img
                    src={blog.image?.url || blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-20 group-hover:grayscale-0"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest">
                    {blog.category?.name || "RESTORATION"}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-black text-orange-600 leading-tight group-hover:underline decoration-2 underline-offset-4 transition-all uppercase italic">
                    {blog.title}
                  </h3>
                  <div
                    className="text-secondary text-sm font-medium line-clamp-3 mb-10 italic flex-1"
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.content
                          .substring(0, 160)
                          .replace(/<[^>]*>?/gm, "") + "...",
                    }}
                  />
                  <div className="text-orange-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read Full Article <span className="text-lg">»</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button (Optional but recommended) */}
        <div className="mt-16 text-center">
          <Link
            href="/pages/blogs"
            className="inline-block border-b-2 border-orange-600 pb-1 text-sm font-black uppercase tracking-[0.2em] text-(--foreground) hover:text-orange-600 transition-colors"
          >
            Browse All Insights
          </Link>
        </div>
      </div>
    </section>
  );
}
