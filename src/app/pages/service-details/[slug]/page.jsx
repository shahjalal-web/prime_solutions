/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { HiPhone, HiShieldCheck, HiArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";
import InspectionTrigger from "./InspectionTrigger"; // Import the client component

export const revalidate = 60;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 1. Fetch Service Details
async function getServiceDetails(slug) {
    try {
        const res = await fetch(`${API_URL}/sub-categories/details/${slug}`, {
            next: { revalidate: 60 }
        });
        const data = await res.json();
        return data.data;
    } catch (err) {
        return null;
    }
}

// 2. Fetch Related Blogs
async function getRelatedBlogs(categoryId) {
    try {
        const res = await fetch(`${API_URL}/blogs?category=${categoryId}`, {
            next: { revalidate: 60 }
        });
        const data = await res.json();
        return data.data || [];
    } catch (err) {
        return [];
    }
}

export default async function ServiceDetailsPage({ params }) {
    const { slug } = await params;
    const service = await getServiceDetails(slug);

    if (!service) {
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="font-black text-4xl opacity-20 italic">SERVICE NOT FOUND</h2>
                <Link href="/pages/services" className="text-orange-600 font-bold hover:underline">Return to Services</Link>
            </div>
        );
    }

    const relatedBlogs = await getRelatedBlogs(service.category?._id || service.category);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-600/20 pt-10">

            {/* --- Hero Section --- */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <span className="inline-block bg-orange-600/10 text-orange-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-orange-600/20">
                            {service.serviceType || "Restoration"} CERTIFIED
                        </span>
                        <h1 className="text-2xl md:text-5xl font-black text-foreground uppercase leading-[0.9] tracking-tighter italic">
                            {service.name}
                        </h1>
                        <p className="text-secondary text-lg font-medium max-w-xl italic">
                            Professional restoration and recovery services tailored for residential and commercial properties in your area. Available 24/7.
                        </p>

                        <InspectionTrigger />
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="relative h-112.5 w-full rounded-[50px] overflow-hidden shadow-2xl border-8 border-card">
                            <img src={service.image?.url || service.image} alt={service.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-orange-600 p-6 rounded-[30px] shadow-xl border border-white/10 flex items-center gap-4">
                            <div className="bg-white p-3 rounded-2xl text-green-600 shadow-inner">
                                <HiShieldCheck size={30} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white/80 uppercase tracking-widest leading-none mb-1">Response Time</p>
                                <p className="text-xl font-black text-white leading-none uppercase italic">60 Minutes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Content Area --- */}
            <div className="container mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left Side: Description & FAQ */}
                <div className="lg:col-span-8 space-y-16">
                    <section className="bg-card p-10 md:p-14 rounded-[50px] border border-border shadow-sm overflow-hidden">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-foreground mb-10 border-l-8 border-orange-600 pl-6 italic leading-none">
                            Technical <span className="text-orange-600">Protocol</span>
                        </h2>
                        <div
                            className="ql-editor-display prose prose-lg prose-slate max-w-none 
                            prose-headings:text-foreground prose-headings:font-black 
                            prose-p:text-secondary prose-p:italic
                            prose-strong:text-orange-600
                            wrap-break-word"
                            style={{ color: 'var(--foreground)' }}
                            dangerouslySetInnerHTML={{ __html: service.description }}
                        />
                    </section>

                    {/* FAQ Accordion */}
                    {service.faqs?.length > 0 && (
                        <div className="space-y-8">
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-foreground ml-4 italic">
                                Common <span className="text-orange-600">Questions</span>
                            </h2>
                            <div className="grid gap-4">
                                {service.faqs.map((faq, i) => (
                                    <details key={i} className="group bg-card border border-border rounded-[35px] p-8 hover:border-orange-600/30 transition-all cursor-pointer">
                                        <summary className="list-none flex justify-between items-center font-black text-xl text-foreground tracking-tight uppercase italic">
                                            {faq.question}
                                            <span className="text-orange-600 text-2xl group-open:rotate-180 transition-transform duration-500">↓</span>
                                        </summary>
                                        <div className="mt-6 pt-6 border-t border-border text-secondary leading-relaxed font-medium italic">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Sticky Sidebar */}
                <div className="lg:col-span-4">
                    <div className="sticky top-10 space-y-8">
                        <div className="bg-slate-900 p-10 rounded-[50px] text-white space-y-8 relative overflow-hidden group shadow-2xl">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black uppercase italic leading-[0.9] mb-4">Start Your <br /> Recovery <span className="text-orange-600 text-4xl">Now</span></h3>
                                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-8">Certified 24/7 Emergency Dispatch</p>

                                <div className="space-y-4">
                                    <a href="tel:+157165572079" className="flex items-center justify-center gap-3 bg-orange-600 text-white w-full py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-black transition-all shadow-xl shadow-orange-600/20">
                                        <HiPhone size={24} className="animate-pulse" /> +1 (571) 655-7207
                                    </a>

                                    {/* Client Component Trigger */}
                                    <InspectionTrigger />
                                </div>
                            </div>

                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-3xl rounded-full translate-x-10 -translate-y-10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Related Blogs --- */}
            {relatedBlogs.length > 0 && (
                <section className="container mx-auto px-6 py-24 border-t border-border">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-xl">
                            <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">Expert Insights</span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                                Restoration <span className="text-orange-600">Guides</span>
                            </h2>
                        </div>
                        <Link href="/pages/blogs" className="text-sm font-black uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors flex items-center gap-2">
                            View All News <HiArrowNarrowRight />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedBlogs.slice(0, 3).map((blog) => (
                            <Link key={blog._id} href={`/pages/blogs/${blog.slug}`} className="group flex flex-col bg-card border border-border rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-500">
                                <div className="h-64 overflow-hidden relative">
                                    <img src={blog.image?.url || blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-white uppercase tracking-widest">
                                        {blog.category?.name}
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-black uppercase italic tracking-tight leading-none mb-6 group-hover:text-orange-600 transition-colors">
                                        {blog.title}
                                    </h3>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest">
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                            <HiArrowNarrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}