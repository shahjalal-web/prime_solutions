/* eslint-disable @typescript-eslint/no-unused-vars */
import { HiArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";
import ProjectGallery from "./ProjectGallery"; // Path thik kore niben
import InspectionTrigger from "../../service-details/[slug]/InspectionTrigger";

export const revalidate = 60;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getProjectDetails(id) {
    try {
        const res = await fetch(`${API_URL}/portfolios/${id}`, { next: { revalidate: 60 } });
        const data = await res.json();
        return data.data;
    } catch (err) { return null; }
}

export default async function PortfolioDetailsPage({ params }) {
    const { id } = await params;
    const project = await getProjectDetails(id);

    if (!project) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest opacity-30">Project Not Found</div>;

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* --- Navigation --- */}
                <Link href="/pages/portfolio" className="inline-flex items-center gap-2 text-secondary hover:text-orange-600 font-black uppercase text-[10px] tracking-widest mb-12 transition-all group">
                    <HiArrowNarrowLeft className="group-hover:-translate-x-2 transition-transform" /> Back to Case Studies
                </Link>

                {/* --- Header & Meta (Design Thik ache) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
                    <div className="lg:col-span-8 space-y-6">
                        <span className="bg-orange-600/10 text-orange-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-orange-600/20">
                            {project.type} Restoration Case
                        </span>
                        <h1 className="text-5xl md:text-7xl mt-2 font-black uppercase italic tracking-tighter leading-[0.9]">
                            {project.title}
                        </h1>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-4 border-l-4 border-orange-600 pl-8 italic">
                        <div className="text-xs font-bold text-secondary uppercase tracking-widest">
                            <span className="text-foreground">Client:</span> {project.clientName || "Confidential"}
                        </div>
                        <div className="text-xs font-bold text-secondary uppercase tracking-widest">
                            <span className="text-foreground">Year:</span> {project.projectYear || "2024"}
                        </div>
                    </div>
                </div>

                {/* --- Dynamic Gallery Section --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    {/* Before Gallery */}
                    <ProjectGallery images={project.images?.before} type="before" />
                    
                    {/* After Gallery */}
                    <ProjectGallery images={project.images?.after} type="after" />
                </div>

                                <InspectionTrigger />
                {/* --- Technical Details Section --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-10">
                    <div className="lg:col-span-8">
                        <section className="bg-card p-10 md:p-14 rounded-[50px] border border-border shadow-sm">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground mb-10 border-l-8 border-orange-600 pl-6 italic">
                                Scope of <span className="text-orange-600">Work</span>
                            </h2>
                            <div
                                className="ql-editor-display prose prose-lg prose-slate max-w-full 
                                prose-p:text-secondary prose-p:italic prose-p:leading-relaxed
                                md:max-w-none prose-headings:text-foreground prose-headings:font-black 
                                prose-strong:text-orange-600 prose-strong:font-black
                                prose-ul:list-disc prose-ul:ml-6 prose-li:my-2
                                wrap-break-word overflow-hidden"
                                dangerouslySetInnerHTML={{ __html: project.description }}
                            />
                        </section>
                    </div>

                    {/* Sidebar Protocol */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-900 p-10 rounded-[40px] text-white">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-6">Service Protocol</h4>
                            <div className="space-y-4">
                                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-[9px] font-black text-orange-600 uppercase mb-1">Category</p>
                                    <p className="font-black uppercase italic text-sm">{project.category?.name}</p>
                                </div>
                                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-[9px] font-black text-orange-600 uppercase mb-1">Sub Category</p>
                                    <p className="font-black uppercase italic text-sm">{project.subCategory?.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}