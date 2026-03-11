/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { HiOutlineCalendar, HiOutlineUser, HiOutlineTag, HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";
import { notFound } from "next/navigation";
import InspectionTrigger from "../../service-details/[slug]/InspectionTrigger";

// ১. ISR কনফিগারেশন: প্রতি ১ ঘণ্টা পর পর ডেটা আপডেট হবে
export const revalidate = 60; 

// ২. dynamicParams true রাখা: বিল্ডের বাইরের স্লাগগুলো যেন অন-ডিমান্ড জেনারেট হয়
export const dynamicParams = true;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ৩. generateStaticParams: বিল্ড টাইমে শুধু প্রথম ১০টি ব্লগ জেনারেট হবে
export async function generateStaticParams() {
    try {
        const res = await fetch(`${API_URL}/blogs`);
        const data = await res.json();
        const blogs = data.data || [];
        
        // শুধু লেটেস্ট ১০টি ব্লগ রিটার্ন করা হচ্ছে
        return blogs.slice(0, 10).map((blog) => ({
            slug: blog.slug,
        }));
    } catch (err) {
        return [];
    }
}

async function getBlogDetails(slug) {
    try {
        const res = await fetch(`${API_URL}/blogs/details/${slug}`, { 
            next: { revalidate: 60 } 
        });
        const data = await res.json();
        return data.data;
    } catch (err) {
        return null;
    }
}

async function getRelatedBlogs(categoryId, currentBlogId) {
    try {
        const res = await fetch(`${API_URL}/blogs?category=${categoryId}`, { 
            next: { revalidate: 60 } 
        });
        const data = await res.json();
        return (data.data || []).filter(blog => blog._id !== currentBlogId).slice(0, 3);
    } catch (err) {
        return [];
    }
}

export default async function BlogDetailsPage({ params }) {
    const { slug } = await params;
    const blog = await getBlogDetails(slug);

    // ৪. যদি ব্লগ না পাওয়া যায় তবে ৪-০-৪ পেজ শো করবে
    if (!blog) {
        notFound();
    }

    const relatedBlogs = await getRelatedBlogs(blog.category?._id, blog._id);

    return (
        <article className="min-h-screen bg-background text-foreground pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* --- Back Button --- */}
                <Link href="/pages/blogs" className="inline-flex items-center gap-2 text-secondary hover:text-primary font-black uppercase text-[10px] tracking-widest mb-12 transition-all group">
                    <HiArrowNarrowLeft className="group-hover:-translate-x-2 transition-transform" /> Back to Newsroom
                </Link>

                {/* --- Meta Data --- */}
                <div className="space-y-6 mb-12">
                    <span className="bg-primary/10 text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-primary/20 italic">
                        {blog.category?.name} Protocol Analysis
                    </span>
                    
                    <h1 className="text-4xl md:text-6xl mt-2 font-black uppercase italic tracking-tighter leading-[0.95]">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-border text-secondary/60 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                           <HiOutlineUser className="text-primary text-sm" /> 
                           By {blog.author || "Restoration Expert"}
                        </div>
                        <div className="flex items-center gap-2">
                           <HiOutlineCalendar className="text-primary text-sm" /> 
                           {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                           <HiOutlineTag className="text-primary text-sm" /> 
                           {blog.subCategory?.name}
                        </div>
                    </div>
                </div>

                {/* --- Feature Image --- */}
                <div className="relative h-72 md:h-125 w-full rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl mb-16 border-4 md:border-8 border-card">
                    <img 
                        src={blog.image?.url || blog.image} 
                        alt={`${blog.title} - Prime Solution Restoration Virginia`} 
                        className="w-full h-full object-cover" 
                    />
                </div>
                
                <div className="mb-12">
                    <InspectionTrigger />
                </div>

                {/* --- Main Content with High-End Prose Styling --- */}
                <div
                    className="ql-editor-display prose prose-lg prose-slate max-w-none 
                    prose-p:text-secondary prose-p:leading-relaxed prose-p:italic prose-p:font-medium
                    prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter
                    prose-strong:text-primary prose-strong:font-black
                    prose-img:rounded-[40px] prose-img:shadow-xl
                    wrap-break-word"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* --- Action CTA --- */}
                <div className="mt-20 p-8 md:p-12 bg-card border border-border rounded-[40px] md:rounded-[50px] text-center shadow-xl">
                    <h3 className="text-2xl font-black uppercase italic mb-6">Found this recovery protocol helpful?</h3>
                    <p className="text-secondary font-medium italic mb-10 max-w-md mx-auto">
                        Speak with our licensed specialists for emergency restoration in Virginia, Maryland, or DC.
                    </p>
                    <InspectionTrigger />
                </div>

                {/* --- Related Articles --- */}
                {relatedBlogs.length > 0 && (
                    <div className="mt-32 pt-20 border-t border-border">
                        <div className="mb-12">
                             <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-2 block">Knowledge Base</span>
                             <h2 className="text-4xl font-black uppercase italic tracking-tighter">
                                Related <span className="text-primary">Insights</span>
                             </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedBlogs.map((rBlog) => (
                                <Link
                                    key={rBlog._id}
                                    href={`/pages/blogs/${rBlog.slug}`}
                                    className="group flex flex-col bg-card border border-border rounded-[35px] overflow-hidden hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={rBlog.image?.url || rBlog.image}
                                            className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                            alt={rBlog.title}
                                        />
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-lg font-black uppercase italic tracking-tight leading-tight mb-6 group-hover:text-primary transition-colors">
                                            {rBlog.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-secondary opacity-60">
                                                {new Date(rBlog.createdAt).toLocaleDateString()}
                                            </span>
                                            <HiArrowNarrowRight className="text-primary group-hover:translate-x-2 transition-transform" size={18} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}