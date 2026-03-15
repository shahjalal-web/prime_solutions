/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import { HiShieldCheck, HiClock, HiLightningBolt, HiUsers } from "react-icons/hi";
import { SlCallIn } from "react-icons/sl";
import { HiOutlineShieldCheck, HiOutlineClock } from "react-icons/hi";
import InspectionTrigger from "../service-details/[slug]/InspectionTrigger";

const features = [
    { icon: HiShieldCheck, title: "Licensed & Insured", desc: "Fully certified professionals ensuring safety and compliance." },
    { icon: HiClock, title: "24/7 Availability", desc: "Emergency response teams ready at a moment's notice." },
    { icon: HiLightningBolt, title: "Rapid Recovery", desc: "Cutting-edge technology to minimize downtime and damage." },
    { icon: HiUsers, title: "Community Focused", desc: "Serving our local neighbors with care and integrity." },
];

const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Prime Solution Restoration",
    url: "https://psolutionservices.com/pages/about",
    description:
        "Prime Solution Restoration has been serving Northern Virginia, Washington DC, and Maryland since 2010 with certified water, fire, and mold restoration services.",
    mainEntity: {
        "@type": "Organization",
        name: "Prime Solution Restoration",
        foundingDate: "2010",
        url: "https://psolutionservices.com",
        description:
            "Licensed and insured property restoration company providing 24/7 emergency water damage, fire damage, and mold remediation services in VA, DC, and MD.",
        areaServed: ["Loudoun County, VA", "Fairfax County, VA", "Prince William County, VA", "Washington, DC", "Maryland"],
        hasCredential: [
            {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "certification",
                name: "IICRC Water Damage Restoration Technician",
            },
            {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "certification",
                name: "IICRC Applied Microbial Remediation Technician",
            },
        ],
        knowsAbout: [
            "Water Damage Restoration",
            "Fire Damage Cleanup",
            "Mold Remediation",
            "Drywall Repair",
            "Emergency Property Restoration",
        ],
    },
};

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
            />

            {/* --- Hero Section --- */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-5xl text-center">
                    <motion.span
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-primary font-black uppercase tracking-[0.3em] text-xs"
                    >
                        Since 2010
                    </motion.span>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mt-6 mb-8"
                    >
                        We Restore <span className="text-primary">Lives</span>
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                        className="text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Disasters don't wait for business hours. We provide expert restoration services with a human touch, ensuring your property gets back to normal—faster.
                    </motion.p>
                </div>
            </section>

            {/* --- Trust Stats / Values Grid --- */}
            <section className="py-20 px-6">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card p-10 rounded-[40px] border border-border hover:border-primary/30 transition-all shadow-sm hover:shadow-xl"
                        >
                            <item.icon className="text-primary text-4xl mb-6" />
                            <h3 className="text-xl font-black uppercase italic mb-3">{item.title}</h3>
                            <p className="text-secondary text-sm font-medium">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
            <div className="max-w-5xl mx-auto">
                <InspectionTrigger />
            </div>

            {/* --- Story Section --- */}
            <section className="py-20 px-6 bg-accent/30">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="relative h-125 rounded-[50px] overflow-hidden"
                    >
                        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" alt="Restoration" className="w-full h-full object-cover" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                            A Legacy of <span className="text-primary">Excellence</span>
                        </h2>
                        <p className="text-secondary leading-relaxed text-lg">
                            What started as a small local team has grown into a regional leader in restoration. We bridge the gap between technical precision and empathetic service.
                        </p>
                        <ul className="space-y-4 text-sm font-bold">
                            {["Licensed IICRC Technicians", "Advanced Drying Technology", "Environmental Safety Protocols"].map(list => (
                                <li key={list} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary" /> {list}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>



            {/* --- CTA Section --- */}
            <section className="py-24 px-6 relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative">
                    <div className="bg-foreground text-background p-8 md:p-20 rounded-[40px] md:rounded-[80px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden border border-white/5">

                        {/* Inner Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full -mr-32 -mt-32" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                            {/* Text Content */}
                            <div className="text-left space-y-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-primary/20 text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary/30">
                                        Emergency Response 24/7
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-[0.9] tracking-tighter">
                                    Need Immediate <br />
                                    <span className="text-primary underline decoration-gray-500 underline-offset-8 decoration-wavy">Assistance?</span>
                                </h2>

                                <p className="text-background/60 font-medium text-lg max-w-md italic">
                                    Our rapid deployment teams are standing by. We guarantee a response within 60 minutes for all emergency calls.
                                </p>

                                <div className="flex flex-wrap gap-6 pt-4">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-background/80">
                                        <HiOutlineShieldCheck className="text-primary text-xl" /> Licensed & Insured
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-background/80">
                                        <HiOutlineClock className="text-primary text-xl" /> 60m Response
                                    </div>
                                </div>
                            </div>

                            {/* Button Area */}
                            <div className="flex flex-col items-center lg:items-end justify-center">
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="tel:+157165572079"
                                    className="group w-full md:w-fit bg-primary text-froground border-none font-black px-12 py-8 rounded-[30px] hover:bg-orange-500 transition-all shadow-[0_20px_50px_rgba(234,88,12,0.3)] flex items-center justify-center gap-4 text-xl uppercase tracking-tighter italic"
                                >
                                    <div className="bg-white/20 p-3 rounded-2xl group-hover:bg-white/40 transition-colors">
                                        <SlCallIn className="animate-pulse" />
                                    </div>
                                    <div className="text-left">
                                        <span className="block text-[10px] opacity-70 font-bold tracking-widest leading-none mb-1 uppercase">Dispatch Team</span>
                                        Call Now (24/7)
                                    </div>
                                </motion.a>

                                <p className="mt-6 text-background/40 text-[9px] font-black uppercase tracking-[0.3em]">
                                    Speak directly to a restoration specialist
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}