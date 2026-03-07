/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HiArrowNarrowRight, HiOutlineCalendar, HiOutlineTag } from "react-icons/hi";

export const revalidate = 60;

async function getAllBlogs() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: 60 } });
        const data = await res.json();
        return data.data || [];
    } catch (err) {
        return [];
    }
}

export default async function BlogsPage() {
    const blogs = await getAllBlogs();

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20 font-sans">
            <div className="container mx-auto px-6">

                {/* --- Hero Section --- */}
                <div className="mb-24 w-full text-center">
                    <span className="text-primary font-black uppercase tracking-[0.4em] text-xs border-primary pl-4 mb-4 block">
                        Restoration Insights
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
                        The Recovery <span className="text-primary">Chronicles</span>
                    </h1>
                    <p className="text-secondary text-lg md:text-xl font-medium italic leading-relaxed">
                        Expert guides, safety protocols, and industry news to help you protect and restore your property from disaster.
                    </p>
                </div>

                {/* --- Blog Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogs.map((blog) => (
                        <Link
                            key={blog._id}
                            href={`/pages/blogs/${blog.slug}`}
                            className="group flex flex-col bg-card border border-border rounded-[45px] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="h-72 overflow-hidden relative">
                                <img
                                    src={blog.image?.url || blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                />
                                <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-white uppercase tracking-widest">
                                    {blog.category?.name}
                                </div>
                            </div>

                            <div className="p-10 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 mb-6 text-secondary/60 text-[10px] font-black uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><HiOutlineCalendar /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1"><HiOutlineTag /> {blog.subCategory?.name}</span>
                                </div>

                                <h2 className="text-2xl font-black uppercase italic tracking-tight leading-none mb-6 group-hover:text-primary transition-colors">
                                    {blog.title}
                                </h2>

                                <div
                                    className="text-secondary text-sm font-medium line-clamp-3 mb-10 italic flex-1"
                                    dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 160).replace(/<[^>]*>?/gm, '') + "..." }}
                                />

                                <div className="flex items-center justify-between pt-6 border-t border-border">
                                    <span className="text-xs font-black uppercase tracking-widest text-primary group-hover:pl-2 transition-all">Read Protocol</span>
                                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                        <HiArrowNarrowRight size={22} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}