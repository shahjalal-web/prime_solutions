/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { HiOutlineCalendar, HiOutlineUser, HiOutlineTag, HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";
import InspectionTrigger from "../../service-details/[slug]/InspectionTrigger";

export const revalidate = 60;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 1. Fetch Main Blog Details
async function getBlogDetails(slug) {
    try {
        const res = await fetch(`${API_URL}/blogs/details/${slug}`, { next: { revalidate: 60 } });
        const data = await res.json();
        return data.data;
    } catch (err) {
        return null;
    }
}

// 2. Fetch Related Blogs by Category
async function getRelatedBlogs(categoryId, currentBlogId) {
    try {
        const res = await fetch(`${API_URL}/blogs?category=${categoryId}`, { next: { revalidate: 60 } });
        const data = await res.json();
        // Current blog-ti list theke remove kore prothom 3-ti show korbo
        return (data.data || []).filter(blog => blog._id !== currentBlogId).slice(0, 3);
    } catch (err) {
        return [];
    }
}

export default async function BlogDetailsPage({ params }) {
    const { slug } = await params;
    const blog = await getBlogDetails(slug);

    if (!blog) return <div className="h-screen flex items-center justify-center font-black uppercase">Article Not Found</div>;

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
                    <span className="bg-primary/10 text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-primary/20">
                        {blog.category?.name} Protocol
                    </span>
                    
                    <h1 className="text-5xl md:text-5xl mt-2 font-black uppercase italic tracking-tighter leading-[0.9]">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-border text-secondary/60 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2"><HiOutlineUser className="text-primary text-sm" /> By {blog.author || "Restoration Expert"}</div>
                        <div className="flex items-center gap-2"><HiOutlineCalendar className="text-primary text-sm" /> {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                        <div className="flex items-center gap-2"><HiOutlineTag className="text-primary text-sm" /> {blog.subCategory?.name}</div>
                    </div>
                </div>

                {/* --- Feature Image --- */}
                <div className="relative h-125 w-full rounded-[60px] overflow-hidden shadow-2xl mb-16 border-8 border-card">
                    <img src={blog.image?.url || blog.image} alt={blog.title} className="w-full h-full object-cover" />
                </div>
                
                        <InspectionTrigger />

                {/* --- Main Content --- */}
                <div
                    className="ql-editor-display prose prose-lg prose-slate max-w-none 
                    prose-p:text-secondary prose-p:leading-relaxed prose-p:italic prose-p:font-medium
                    prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter
                    prose-strong:text-primary prose-strong:font-black
                    prose-img:rounded-[40px] prose-img:shadow-xl
                    all:bg-transparent **:bg-transparent"
                    style={{
                        color: 'var(--foreground)',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* --- Share/CTA --- */}
                <div className="mt-20 p-12 bg-card border border-border rounded-[50px] text-center">
                    <h3 className="text-2xl font-black uppercase italic mb-6">Found this guide helpful?</h3>
                    <p className="text-secondary font-medium italic mb-8 max-w-md mx-auto">Share it with someone who needs help or speak to us directly.</p>
                    {/* <a href="tel:+15716557207" className="inline-block bg-primary text-forground font-black px-12 py-5 rounded-2xl hover:bg-foreground transition-all uppercase tracking-widest text-sm shadow-lg shadow-green-400 hover:shadow-2xl mb-4">
                        Immediate Consultation
                    </a> */}
                        <InspectionTrigger />
                </div>

                {/* --- Related Articles Grid --- */}
                {relatedBlogs.length > 0 && (
                    <div className="mt-32 pt-20 border-t border-border">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-2 block">Keep Reading</span>
                                <h2 className="text-4xl font-black uppercase italic tracking-tighter">More from <span className="text-primary">{blog.category?.name}</span></h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedBlogs.map((rBlog) => (
                                <Link
                                    key={rBlog._id}
                                    href={`/pages/blogs/${rBlog.slug}`}
                                    className="group flex flex-col bg-card border border-border rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="h-56 overflow-hidden relative">
                                        <img
                                            src={rBlog.image?.url || rBlog.image}
                                            className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                            alt={rBlog.title}
                                        />
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-xl font-black uppercase italic tracking-tight leading-tight mb-4 group-hover:text-primary transition-colors">
                                            {rBlog.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">
                                                {new Date(rBlog.createdAt).toLocaleDateString()}
                                            </span>
                                            <HiArrowNarrowRight className="text-primary group-hover:translate-x-2 transition-transform" size={20} />
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