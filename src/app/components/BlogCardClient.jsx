/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { optimizeCloudinaryUrl } from "../lib/cloudinaryUrl";

export default function BlogCard({ blog, index }) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group shadow-lg rounded-2xl shadow-green-400 hover:shadow-2xl"
        >
            <Link href={`/pages/blogs/${blog.slug}`} prefetch={false}>
                {/* Image Section with Overlay Effect */}
                <div className="relative h-72 overflow-hidden rounded-4xl mb-8 shadow-2xl bg-accent/20">
                    <img
                        src={optimizeCloudinaryUrl(blog.image?.url || blog.image, 500)}
                        alt={`${blog.title} - Prime Solution Restoration Virginia`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-30 group-hover:grayscale-0"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6 bg-orange-600 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                        {blog.category?.name || "RESTORATION"}
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Text Content */}
                <div className="space-y-4 p-4">
                    <h3 className="text-2xl font-black text-foreground leading-tight group-hover:text-orange-600 transition-colors uppercase italic tracking-tighter">
                        {blog.title}
                    </h3>

                    {/* --- Blog Excerpt with 80 character limit --- */}
                    <div
                        className="ql-editor-display prose prose-lg prose-slate max-w-full 
             prose-p:text-secondary prose-p:italic prose-p:leading-relaxed
             md:max-w-none prose-headings:text-foreground prose-headings:font-black 
             prose-strong:text-orange-600 prose-strong:font-black
             prose-ul:list-disc prose-ul:ml-6 prose-li:my-2
             wrap-break-word overflow-hidden line-clamp-2"
                        dangerouslySetInnerHTML={{
                            __html: blog.content?.replace(/<[^>]*>?/gm, "").length > 180
                                ? blog.content.replace(/<[^>]*>?/gm, "").substring(0, 180) + "..."
                                : blog.content.replace(/<[^>]*>?/gm, "")
                        }}
                    />

                    <div className="pt-4 flex items-center gap-3 text-orange-600 font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all duration-300">
                        Read Protocol Analysis <span className="text-lg">→</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}