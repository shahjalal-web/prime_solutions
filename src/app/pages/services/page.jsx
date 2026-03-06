/* eslint-disable @next/next/no-img-element */
import { HiArrowNarrowRight, HiSparkles } from "react-icons/hi";

export const revalidate = 60;

async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        next: { revalidate: 60 }
    });
    const data = await res.json();
    return data.data || [];
}

export default async function ServicesPage() {
    const categories = await getCategories();

    return (
        <div className="min-h-screen bg-background py-24 px-6 selection:bg-primary/10">

            {/* --- Page Header --- */}
            <div className="mb-20 text-center max-w-3xl mx-auto relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

                <div className="flex items-center justify-center gap-2 mb-4 animate-pulse">
                    <HiSparkles className="text-primary" size={20} />
                    <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">
                        Comprehensive Restoration
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black uppercase italic text-foreground tracking-tighter leading-none mb-6">
                    <span className="text-primary underline decoration-border decoration-wavy underline-offset-8"> Our Expertise</span>
                </h1>

                <p className="text-secondary font-medium text-sm max-w-xl mx-auto leading-relaxed">
                    From water damage to emergency cleanup, we provide high-standard specialized restoration solutions for every challenge.
                </p>
            </div>

            {/* --- Categories Grid (5 Columns with Centering) --- */}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-fit">
                    {categories.map((cat) => (
                        <a
                            key={cat._id}
                            href={`/pages/services/${cat._id}`}
                            className="group relative bg-card/70 backdrop-blur-xl border border-border rounded-[40px] p-3 transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] hover:-translate-y-3 flex flex-col w-64 ring-1 ring-border/50 hover:ring-primary/30 shadow shadow-green-500"
                        >
                            {/* Image Section */}
                            <div className="relative h-64 w-full overflow-hidden rounded-4xl mb-6">
                                <img
                                    src={cat.image?.url}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-20 group-hover:grayscale-0"
                                />

                                {/* Visual Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Service Count Placeholder (Optional) */}
                                <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/50 shadow-lg">
                                    <p className="text-[9px] font-black text-primary uppercase tracking-widest">Expert Solution</p>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="px-4 pb-4 flex-1 flex flex-col">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none mb-4 text-foreground group-hover:text-primary transition-colors">
                                    {cat.name}
                                </h3>

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between bg-background border border-border px-5 py-4 rounded-[22px] transition-all duration-500 group-hover:bg-primary group-hover:border-primary">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground group-hover:text-orange-600">
                                            Explore
                                        </span>
                                        <HiArrowNarrowRight className="text-primary group-hover:text-white group-hover:translate-x-1 transition-all" size={18} />
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* No Data State */}
            {categories.length === 0 && (
                <div className="max-w-xl mx-auto text-center py-20 bg-card/50 backdrop-blur-md rounded-[50px] border-2 border-dashed border-border">
                    <p className="text-secondary font-bold italic tracking-tight">No expertise categories listed at the moment.</p>
                </div>
            )}
        </div>
    );
}