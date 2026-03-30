/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HiArrowNarrowRight, HiLocationMarker, HiPhone, HiShieldCheck, HiClock, HiExclamation } from "react-icons/hi";
import { notFound } from "next/navigation";
import InspectionTrigger from "../../service-details/[slug]/InspectionTrigger";

export const revalidate = 3600;
export const dynamicParams = true;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function toSlug(name) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

async function getCities() {
    try {
        const res = await fetch(`${API_URL}/cities`, { next: { revalidate: 3600 } });
        const data = await res.json();
        return data.data || [];
    } catch {
        return [];
    }
}

async function getCategories() {
    try {
        const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 3600 } });
        const data = await res.json();
        return data.data || [];
    } catch {
        return [];
    }
}

export async function generateStaticParams() {
    const cities = await getCities();
    return cities.map((city) => ({ slug: toSlug(city.name) }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const cities = await getCities();
    const city = cities.find((c) => toSlug(c.name) === slug);

    if (!city) return {};

    // Determine region for metadata
    const metaRegion = city.county === "Washington DC" ? "DC" : city.county === "Maryland" ? "MD" : "VA";

    // Use custom meta if available, fallback to default
    const title = city.metaTitle || `Water Damage Restoration ${city.name} ${metaRegion} | 24/7 Emergency | Prime Solution Restoration`;
    const description = city.metaDescription || `Need water damage restoration in ${city.name}, ${metaRegion}? Prime Solution Restoration provides 24/7 emergency water, fire & mold restoration services in ${city.name} and surrounding areas.`;

    return {
        title,
        description,
        alternates: {
            canonical: `https://www.psolutionservices.com/pages/locations/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://www.psolutionservices.com/pages/locations/${slug}`,
        },
    };
}

export default async function CityPage({ params }) {
    const { slug } = await params;

    const [cities, categories] = await Promise.all([getCities(), getCategories()]);
    const city = cities.find((c) => toSlug(c.name) === slug);

    if (!city) notFound();

    const hasUniqueContent = city.description && city.description.trim() && city.description !== "<p><br></p>";
    const hasNeighborhoods = city.neighborhoods && city.neighborhoods.length > 0;
    const hasLocalRisks = city.localRisks && city.localRisks.length > 0;
    const hasFaqs = city.faqs && city.faqs.length > 0;
    const isCountyHub = city.name.includes("County") || city.county === "County Hub";

    // For county hubs, get cities that belong to this county
    const countyCities = isCountyHub
        ? cities.filter((c) => c.county === city.name && c._id !== city._id)
        : [];

    // Determine region based on county
    const isDC = city.county === "Washington DC";
    const isMD = city.county === "Maryland";
    const regionShort = isDC ? "DC" : isMD ? "MD" : "VA";
    const regionFull = isDC ? "Washington DC" : isMD ? "Maryland" : "Virginia";

    const citySchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Prime Solution Restoration",
        description: `24/7 water damage restoration, mold remediation, and fire damage cleanup services in ${city.name}, ${regionFull}.`,
        url: `https://www.psolutionservices.com/pages/locations/${slug}`,
        telephone: "+1-571-655-7207",
        email: "office@psolutionservices.com",
        address: {
            "@type": "PostalAddress",
            addressLocality: city.name,
            addressRegion: regionShort,
            addressCountry: "US",
        },
        areaServed: {
            "@type": "City",
            name: city.name,
        },
        openingHours: "Mo-Su 00:00-23:59",
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-10">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
            />

            {/* --- Hero Section --- */}
            <section className="py-24 px-6">
                <div className="container mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <HiLocationMarker className="text-primary" size={20} />
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">
                            Serving {city.name}{city.county && city.county !== "County Hub" ? `, ${city.county}` : ""}{!isDC ? `, ${regionFull}` : ""}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
                        Water Damage Restoration <br />
                        <span className="text-primary">{city.name}{isDC ? "" : `, ${regionShort}`}</span>
                    </h1>

                    <p className="text-secondary text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                        Prime Solution Restoration provides 24/7 emergency water damage, fire damage, and mold remediation services in {city.name} and surrounding areas. Fast response, certified technicians.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="tel:+15716557207"
                            className="flex items-center gap-3 bg-primary text-forground px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-orange-500 transition-all shadow-lg shadow-primary/30"
                        >
                            <HiPhone className="animate-pulse" size={20} /> Call Now 24/7
                        </a>
                        <InspectionTrigger />
                    </div>
                </div>
            </section>

            {/* --- Trust Badges --- */}
            <section className="py-10 px-6 border-y border-border bg-card/50">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        {[
                            { icon: HiClock, title: "60 Min Response", desc: `Fast arrival in ${city.name}` },
                            { icon: HiShieldCheck, title: "Licensed & Insured", desc: "IICRC Certified Technicians" },
                            { icon: HiPhone, title: "24/7 Available", desc: "Always ready for emergencies" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 p-6 bg-card rounded-[30px] border border-border">
                                <item.icon className="text-primary" size={30} />
                                <h3 className="font-black uppercase italic tracking-tight">{item.title}</h3>
                                <p className="text-secondary text-xs">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Unique City Description (if available) --- */}
            {hasUniqueContent && (
                <section className="py-20 px-6">
                    <div className="container mx-auto max-w-4xl">
                        <div className="bg-card p-10 md:p-14 rounded-[50px] border border-border shadow-sm">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground mb-10 border-l-8 border-primary pl-6 italic leading-none">
                                Restoration Services in <span className="text-primary">{city.name}</span>
                            </h2>
                            <div
                                className="ql-editor-display prose prose-lg prose-slate max-w-none
                                prose-headings:text-foreground prose-headings:font-black
                                prose-p:text-secondary prose-p:italic
                                prose-strong:text-primary
                                wrap-break-word"
                                style={{ color: 'var(--foreground)' }}
                                dangerouslySetInnerHTML={{ __html: city.description }}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* --- County Hub: Cities in this County --- */}
            {isCountyHub && countyCities.length > 0 && (
                <section className="py-20 px-6 border-t border-border">
                    <div className="container mx-auto max-w-5xl">
                        <div className="text-center mb-12">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">
                                Full Coverage
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mt-3">
                                Cities & Communities in <span className="text-primary">{city.name}</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {countyCities.map((c) => (
                                <Link
                                    key={c._id}
                                    href={`/pages/locations/${toSlug(c.name)}`}
                                    className="flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-2xl text-sm font-bold hover:border-primary hover:text-primary transition-all group"
                                >
                                    <HiLocationMarker className="text-primary/50 group-hover:text-primary shrink-0" size={14} />
                                    {c.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- Neighborhoods (if available, for non-county pages) --- */}
            {hasNeighborhoods && !isCountyHub && (
                <section className="py-16 px-6 border-t border-border">
                    <div className="container mx-auto max-w-5xl">
                        <div className="text-center mb-10">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">
                                Local Coverage
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mt-3">
                                Neighborhoods in <span className="text-primary">{city.name}</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {city.neighborhoods.map((n, i) => (
                                <span
                                    key={i}
                                    className="px-5 py-2.5 bg-card border border-border rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-all"
                                >
                                    {n}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- Local Risks (if available) --- */}
            {hasLocalRisks && (
                <section className="py-16 px-6 border-t border-border">
                    <div className="container mx-auto max-w-4xl">
                        <div className="text-center mb-10">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">
                                Local Awareness
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mt-3">
                                Common Risks in <span className="text-primary">{city.name}</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {city.localRisks.map((risk, i) => (
                                <div key={i} className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                                        <HiExclamation className="text-red-500" size={20} />
                                    </div>
                                    <p className="text-secondary font-medium text-sm leading-relaxed">{risk}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- Services Available in This City --- */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">
                            What We Do in {city.name}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mt-4">
                            Our <span className="text-primary">Services</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat) => (
                            <Link
                                key={cat._id}
                                href={`/pages/services/${cat._id}`}
                                className="group bg-card border border-border rounded-[35px] p-3 hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col"
                            >
                                <div className="h-52 rounded-[28px] overflow-hidden mb-5">
                                    <img
                                        src={cat.image?.url}
                                        alt={`${cat.name} in ${city.name}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="px-4 pb-4 flex-1 flex flex-col">
                                    <h3 className="text-xl font-black uppercase italic tracking-tight text-foreground group-hover:text-primary transition-colors mb-4">
                                        {cat.name}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between bg-background border border-border px-4 py-3 rounded-2xl group-hover:bg-primary group-hover:border-primary transition-all">
                                        <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-orange-600">
                                            Learn More
                                        </span>
                                        <HiArrowNarrowRight className="text-primary group-hover:text-white group-hover:translate-x-1 transition-all" size={16} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Local FAQs (if available) --- */}
            {hasFaqs && (
                <section className="py-20 px-6 border-t border-border">
                    <div className="container mx-auto max-w-4xl">
                        <div className="text-center mb-12">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">
                                Common Questions
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mt-3">
                                FAQs
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {city.faqs.map((faq, index) => (
                                <details key={index} className="group bg-card border border-border rounded-2xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-foreground hover:text-primary transition-colors list-none">
                                        <span>{faq.question}</span>
                                        <span className="ml-4 text-primary text-xl font-black group-open:rotate-45 transition-transform duration-300">+</span>
                                    </summary>
                                    <div className="px-6 pb-6 text-secondary font-medium italic leading-relaxed border-t border-border/50 pt-4">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- CTA --- */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-foreground text-background rounded-[50px] p-10 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full -mr-32 -mt-32" />
                        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 relative z-10">
                            Emergency in {city.name}? <br />
                            <span className="text-primary">Call Us Now</span>
                        </h2>
                        <p className="text-background/60 mb-10 max-w-md mx-auto relative z-10">
                            Our certified restoration team is ready to respond in {city.name} within 60 minutes.
                        </p>
                        <a
                            href="tel:+15716557207"
                            className="inline-flex items-center gap-3 bg-primary px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-primary/30 relative z-10"
                        >
                            <HiPhone className="animate-pulse" size={22} /> +1 (571) 655-7207
                        </a>
                    </div>
                </div>
            </section>

            {/* --- Other Service Areas --- */}
            <section className="py-16 px-6 border-t border-border">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8 text-center">
                        Other Areas We <span className="text-primary">Serve</span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {cities
                            .filter((c) => toSlug(c.name) !== slug)
                            .map((c) => (
                                <Link
                                    key={c._id}
                                    href={`/pages/locations/${toSlug(c.name)}`}
                                    className="px-5 py-2.5 bg-card border border-border rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-all"
                                >
                                    {c.name}
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
