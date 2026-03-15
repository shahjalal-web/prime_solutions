import Link from "next/link";
import { HiArrowNarrowRight, HiLocationMarker } from "react-icons/hi";

export const revalidate = 60;

export const metadata = {
    title: "Service Areas | Water Damage Restoration VA, DC & MD | Prime Solution Restoration",
    description:
        "Prime Solution Restoration serves Northern Virginia, Washington DC, and Maryland. Find 24/7 water damage restoration, mold remediation, and fire damage services near you.",
    openGraph: {
        title: "Service Areas | Prime Solution Restoration",
        description: "Find restoration services near you across VA, DC & MD.",
        url: "https://www.psolutionservices.com/pages/locations",
    },
};

async function getCities() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities`, {
            next: { revalidate: 60 },
        });
        const data = await res.json();
        return data.data || [];
    } catch {
        return [];
    }
}

function toSlug(name) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default async function ServiceAreasPage() {
    const cities = await getCities();

    return (
        <div className="min-h-screen bg-background py-24 px-6 selection:bg-primary/10">

            {/* --- Page Header --- */}
            <div className="mb-20 text-center max-w-3xl mx-auto relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

                <div className="flex items-center justify-center gap-2 mb-4">
                    <HiLocationMarker className="text-primary" size={20} />
                    <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">
                        Northern VA, DC & MD
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black uppercase italic text-foreground tracking-tighter leading-none mb-6">
                    Our Service<span className="text-primary underline decoration-border decoration-wavy underline-offset-8"> Areas</span>
                </h1>

                <p className="text-secondary font-medium text-sm max-w-xl mx-auto leading-relaxed">
                    We provide 24/7 emergency restoration services across Northern Virginia, Washington DC, and Maryland. Select your city to learn more.
                </p>
            </div>

            {/* --- Cities Grid --- */}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                    {cities.map((city) => (
                        <Link
                            key={city._id}
                            href={`/pages/locations/${toSlug(city.name)}`}
                            className="group relative bg-card/70 backdrop-blur-xl rounded-[30px] p-6 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] hover:-translate-y-2 flex flex-col ring-1 ring-border/50 hover:ring-primary/30"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                                    <HiLocationMarker className="text-primary group-hover:text-white" size={18} />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-secondary">
                                    Virginia
                                </span>
                            </div>

                            <h2 className="text-xl font-black uppercase italic tracking-tighter text-foreground group-hover:text-primary transition-colors mb-4">
                                {city.name}
                            </h2>

                            <div className="mt-auto flex items-center justify-between bg-background border border-border px-4 py-3 rounded-2xl group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground group-hover:text-orange-600">
                                    View Services
                                </span>
                                <HiArrowNarrowRight className="text-primary group-hover:text-white group-hover:translate-x-1 transition-all" size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* No Data State */}
            {cities.length === 0 && (
                <div className="max-w-xl mx-auto text-center py-20 bg-card/50 backdrop-blur-md rounded-[50px] border-2 border-dashed border-border">
                    <p className="text-secondary font-bold italic tracking-tight">No service areas listed at the moment.</p>
                </div>
            )}
        </div>
    );
}
