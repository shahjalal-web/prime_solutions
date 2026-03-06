/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { HiPhone, HiBadgeCheck, HiShieldCheck } from "react-icons/hi";

export const revalidate = 60;

async function getServiceDetails(slug) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
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

export default async function ServiceDetailsPage({ params }) {
    const { slug } = await params;
    const service = await getServiceDetails(slug);

    if (!service) {
        return <div className="h-screen flex items-center justify-center font-bold text--text-muted">SERVICE NOT FOUND</div>;
    }

    return (
        <div className="min-h-screen bg--bg-primary text--text-main selection:bg--brand-soft pt-10">

            {/* --- Hero Section --- */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <span className="inline-block bg--brand-soft text--brand-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border--brand-primary/10">
                            {service.serviceType} CERTIFIED
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text--text-main uppercase leading-[0.9] tracking-tighter italic">
                            {service.name}
                        </h1>
                        <p className="text--text-muted text-lg font-medium max-w-xl italic">
                            Professional restoration and recovery services tailored for residential and commercial properties. Available 24/7.
                        </p>
                    </div>
                    <div className="lg:col-span-5 relative">
                        {/* 112.5px height h-112.5 Tailwind-e default thake na, tai inline style ba custom class bhalo */}
                        <div className="relative h-112.5 w-full rounded-[50px] overflow-hidden shadow-2xl border-8 border--bg-card">
                            <img src={service.image?.url} alt={service.name} className="w-full h-full object-cover" />
                        </div>
                        {/* Floating Response Card */}
                        <div className="absolute -bottom-6 -left-6 bg-orange-400 p-6 rounded-[30px] shadow-xl border border--border-subtle flex items-center gap-4">
                            <div className="bg-green-50 p-3 rounded-2xl text-green-600 shadow-inner">
                                <HiShieldCheck size={30} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text--text-muted uppercase tracking-widest">Response Time</p>
                                <p className="text-lg font-black text--text-main leading-none uppercase">60 Minutes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Content Area --- */}
            <div className="container mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left Side: Description & FAQ */}
                <div className="lg:col-span-8 space-y-16">

                    <section className="bg-card p-10 md:p-14 rounded-[50px] border border-border shadow-sm">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-foreground mb-10 border-l-8 border-primary pl-6 italic">
                            Service <span className="text-primary">Details</span>
                        </h2>

                        <div
                            className="ql-editor-display prose prose-slate max-w-none leading-relaxed overflow-hidden 
               prose-p:text-inherit prose-headings:text-inherit prose-strong:text-inherit"
                            style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                color: 'var(--foreground)' // Base color variables theke ashbe
                            }}
                            dangerouslySetInnerHTML={{ __html: service.description }}
                        />
                    </section>

                    {/* FAQ Accordion */}
                    {service.faqs?.length > 0 && (
                        <div className="space-y-8">
                            <h2 className="text-3xl font-black uppercase tracking-tighter text--text-main ml-4 italic">
                                Common <span className="text--brand-primary">Questions</span>
                            </h2>
                            <div className="grid gap-4">
                                {service.faqs.map((faq, i) => (
                                    <details key={i} className="group bg--bg-card border border--border-subtle rounded-[35px] p-8 hover:border--brand-primary/30 transition-all cursor-pointer">
                                        <summary className="list-none flex justify-between items-center font-black text-xl text--text-main tracking-tight uppercase italic">
                                            {faq.question}
                                            <span className="text--brand-primary text-2xl group-open:rotate-180 transition-transform duration-500">↓</span>
                                        </summary>
                                        <div className="mt-6 pt-6 border-t border--border-subtle text--text-muted leading-relaxed font-medium">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Sidebar */}
                <div className="lg:col-span-4">
                    <div className="sticky top-10 space-y-8">
                        {/* Emergency CTA */}
                        <div className="bg-slate-900 p-10 rounded-[40px] text-white space-y-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-orange-600/40 transition-all duration-700" />
                            <h3 className="text-3xl font-black uppercase italic leading-none relative z-10">Start Your <br /> Recovery <span className="text-orange-600">Now</span></h3>
                            <p className="text-slate-400 text-sm font-medium relative z-10">Don't wait. Damage worsens by the hour. Speak to a specialist instantly.</p>
                            <a href="tel:+123456789" className="flex items-center justify-center gap-3 bg-orange-600 text-white w-full py-5 rounded-2xl font-black text-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30">
                                <HiPhone size={24} />
                                (888) 123-4567
                            </a>
                        </div>

                        {/* Trust Panel */}
                        <div className="bg-white border border-slate-100 p-10 rounded-[40px] space-y-6">
                            <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Industry Standards</p>
                            <div className="space-y-5">
                                {["IICRC Certified Clean", "Direct Insurance Claims", "EPA Lead-Safe Certified", "100% Satisfaction Guarantee"].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                        <HiBadgeCheck size={22} className="text-orange-600" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}