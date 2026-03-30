/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import { HiShieldCheck, HiClock, HiLightningBolt, HiUsers, HiPhone, HiCheckCircle } from "react-icons/hi";
import InspectionTrigger from "../service-details/[slug]/InspectionTrigger";

const values = [
    { icon: HiClock, title: "60-Minute Response", desc: "When disaster strikes, every minute matters. We guarantee arrival within 60 minutes — day or night, weekends and holidays included." },
    { icon: HiShieldCheck, title: "Licensed & IICRC Certified", desc: "Our technicians hold IICRC certifications in water damage restoration, applied microbial remediation, and fire & smoke restoration." },
    { icon: HiLightningBolt, title: "We Handle Insurance", desc: "Dealing with insurance is stressful. We file your claim directly, provide all documentation, and work with your adjuster so you don't have to." },
    { icon: HiUsers, title: "Local to Your Community", desc: "Based in Ashburn, VA — we serve Loudoun, Fairfax, Prince William County, Arlington, Alexandria, Washington DC, and Maryland." },
];

const milestones = [
    { number: "500+", label: "Projects Completed" },
    { number: "15+", label: "Years Experience" },
    { number: "60", label: "Minute Response" },
    { number: "24/7", label: "Always Available" },
];

const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Prime Solution Restoration",
    url: "https://www.psolutionservices.com/pages/about",
    description: "Prime Solution Restoration has been serving Northern Virginia, Washington DC, and Maryland with certified water, fire, and mold restoration services.",
    mainEntity: {
        "@type": "Organization",
        name: "Prime Solution Restoration",
        url: "https://www.psolutionservices.com",
        description: "Licensed and insured property restoration company providing 24/7 emergency water damage, fire damage, and mold remediation services in VA, DC, and MD.",
        areaServed: ["Loudoun County, VA", "Fairfax County, VA", "Prince William County, VA", "Washington, DC", "Maryland"],
        hasCredential: [
            { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "IICRC Water Damage Restoration Technician" },
            { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "IICRC Applied Microbial Remediation Technician" },
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
                        Your Neighbors in Restoration
                    </motion.span>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mt-6 mb-8"
                    >
                        We Don&apos;t Just Restore Properties. <br />
                        <span className="text-primary">We Restore Peace of Mind.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                        className="text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        When water floods your basement at 2 AM, or fire damages your family home, you need someone who answers the phone, shows up fast, and knows exactly what to do. That&apos;s us.
                    </motion.p>
                </div>
            </section>

            {/* --- Milestones --- */}
            <section className="py-12 px-6 border-y border-border bg-card/50">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {milestones.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <p className="text-3xl md:text-4xl font-black text-primary tracking-tighter">{item.number}</p>
                                <p className="text-[10px] font-black text-secondary uppercase tracking-widest mt-1">{item.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Our Story --- */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Our Story</span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
                                Built on <span className="text-primary">Trust</span>, Driven by <span className="text-primary">Urgency</span>
                            </h2>
                            <div className="space-y-4 text-secondary leading-relaxed">
                                <p>
                                    Prime Solution Restoration was founded with one simple belief: when disaster hits, people deserve fast, honest, expert help — not sales pitches.
                                </p>
                                <p>
                                    Based in Ashburn, Virginia, we&apos;ve spent over 15 years helping families and businesses across Northern Virginia, Washington DC, and Maryland recover from water damage, fire, mold, and storms. We&apos;ve seen it all — flooded basements at midnight, kitchen fires on holidays, mold behind walls that nobody knew about.
                                </p>
                                <p>
                                    What sets us apart isn&apos;t just our IICRC certifications or equipment — it&apos;s the fact that we treat every property like it&apos;s our own. We answer the phone 24/7. We show up within 60 minutes. We handle your insurance paperwork. And we don&apos;t leave until the job is done right.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-black uppercase italic tracking-tight">
                                Why Families Choose <span className="text-primary">Us</span>
                            </h3>
                            <div className="space-y-4">
                                {[
                                    "We answer the phone — always. No voicemail, no callbacks.",
                                    "60-minute arrival guarantee, not a marketing promise.",
                                    "We file and manage your insurance claim directly.",
                                    "IICRC certified technicians on every project.",
                                    "Transparent pricing — no surprise bills.",
                                    "We restore, not just repair. Your property comes back better.",
                                    "Local team — we live and work in your community.",
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-start gap-3"
                                    >
                                        <HiCheckCircle className="text-primary shrink-0 mt-0.5" size={18} />
                                        <p className="text-sm font-bold text-foreground">{item}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Inspection CTA --- */}
            <div className="max-w-5xl mx-auto px-6 py-6">
                <InspectionTrigger />
            </div>

            {/* --- What We Do --- */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">What We Stand For</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mt-4">
                            Our <span className="text-primary">Commitments</span> to You
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-card p-8 rounded-[30px] border border-border hover:border-primary/30 transition-all shadow-sm hover:shadow-xl group"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                                    <item.icon className="text-primary group-hover:text-white transition-colors" size={24} />
                                </div>
                                <h3 className="text-lg font-black uppercase italic tracking-tight mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-secondary text-sm font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Service Areas --- */}
            <section className="py-16 px-6 bg-accent/30">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-6">
                        Proudly Serving the <span className="text-primary">DMV Region</span>
                    </h2>
                    <p className="text-secondary text-sm leading-relaxed max-w-2xl mx-auto mb-8">
                        From our headquarters in Ashburn, VA, we provide 24/7 emergency restoration services across three states and the District of Columbia.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            "Loudoun County", "Fairfax County", "Prince William County",
                            "Arlington", "Alexandria", "Falls Church", "Manassas",
                            "Reston", "McLean", "Ashburn", "Sterling", "Tysons",
                            "Washington DC", "Montgomery County MD"
                        ].map((area, i) => (
                            <span key={i} className="px-4 py-2 bg-card border border-border rounded-full text-xs font-black uppercase tracking-wider">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto max-w-4xl relative">
                    <div className="bg-[#0f0f0f] text-white p-10 md:p-16 rounded-[40px] md:rounded-[60px] shadow-2xl text-center relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[80px] rounded-full -mr-32 -mt-32" />

                        <div className="relative z-10 space-y-6">
                            <span className="bg-red-500/20 text-red-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-red-500/30">
                                Emergency Response 24/7
                            </span>

                            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.9]">
                                Need Help <span className="text-orange-600">Right Now?</span>
                            </h2>

                            <p className="text-white/50 max-w-md mx-auto leading-relaxed">
                                Our restoration specialists are standing by. We guarantee a response within 60 minutes for all emergency calls across Virginia, DC, and Maryland.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                <a
                                    href="tel:+15716557207"
                                    className="flex items-center gap-3 bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-all shadow-xl shadow-red-600/30"
                                >
                                    <HiPhone size={22} className="animate-pulse" />
                                    Call (571) 655-7207
                                </a>
                                <InspectionTrigger />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
