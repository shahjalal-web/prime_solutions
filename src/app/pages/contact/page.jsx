/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiArrowRight, HiOutlineSparkles } from "react-icons/hi";
import { SlCallIn } from "react-icons/sl";
import { useRouter } from "next/navigation";

const contactInfo = [
    {
        icon: HiOutlinePhone,
        label: "24/7 Emergency Dispatch",
        value: "+1 (571) 655-7207",
        link: "tel:+15716557207",
        color: "bg-orange-600"
    },
    {
        icon: HiOutlineMail,
        label: "Claims & Support",
        value: "office@psolutionservices.com",
        link: "mailto:office@psolutionservices.com",
        color: "bg-slate-900"
    },
    {
        icon: HiOutlineLocationMarker,
        label: "Virginia Headquarters",
        value: "42785 Generation Dr., Ashburn, VA 20147",
        link: "https://maps.google.com/?q=42785+Generation+Dr,+Ashburn,+VA+20147",
        color: "bg-slate-900"
    },
];

export default function ContactPage() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        category: "",
        subCategory: "",
        message: ""
    });

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then(res => res.json())
            .then(data => setCategories(data.data || []))
            .catch(err => console.error("Category load failed", err));
    }, [API_URL]);

    useEffect(() => {
        if (formData.category) {
            fetch(`${API_URL}/sub-categories?category=${formData.category}`)
                .then(res => res.json())
                .then(data => setSubCategories(data.data || []))
                .catch(err => console.error("Sub-category load failed", err));
        } else {
            setSubCategories([]);
        }
    }, [formData.category, API_URL]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCategoryChange = (e) => {
        setFormData(prev => ({
            ...prev,
            category: e.target.value,
            subCategory: ""
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/contacts/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setFormData({ name: "", phone: "", category: "", subCategory: "", message: "" });
                router.push("/pages/thank-you");
            }
        } catch (err) {
            alert("Submission failed. Please call our emergency line.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20 selection:bg-primary/20">
            {/* --- JSON-LD Structured Data for Local SEO --- */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "EmergencyService",
                        "name": "Prime Solution Restoration",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "42785 Generation Dr.",
                            "addressLocality": "Ashburn",
                            "addressRegion": "VA",
                            "postalCode": "20147",
                            "addressCountry": "US"
                        },
                        "telephone": "+1-571-655-7207",
                        "areaServed": ["Virginia", "Maryland", "Washington DC"],
                        "openingHours": "Mo-Su 00:00-23:59"
                    })
                }}
            />

            <div className="container mx-auto px-6">
                {/* --- Header Section --- */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="text-primary font-black uppercase tracking-[0.3em] text-[10px] border-l-4 border-primary pl-4 mb-6 block w-full md:w-1/4 mx-auto"
                    >
                        Emergency Response DMV Area
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] mt-6"
                    >
                        Immediate <span className="text-primary">Dispatch</span>
                    </motion.h1>
                    <p className="mt-8 text-secondary text-lg font-medium italic leading-relaxed">
                        Facing <strong className="text-foreground">Water Damage</strong>, <strong className="text-foreground">Fire</strong>, or <strong className="text-foreground">Mold</strong> issues in Virginia? Our local restoration experts in Ashburn, Fairfax, and Loudoun are ready to deploy 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* --- Left Side: Info --- */}
                    <div className="lg:col-span-5 space-y-6">
                        {contactInfo.map((item, i) => (
                            <motion.a
                                href={item.link} key={i}
                                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                className="group flex items-center gap-6 bg-accent/20 p-8 rounded-[40px] border border-border hover:border-primary/30 transition-all shadow-xl hover:shadow-primary/5"
                            >
                                <div className={`${item.color} p-5 rounded-3xl text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                                    <item.icon size={28} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">{item.label}</p>
                                    <h3 className="text-xl font-black uppercase italic tracking-tight break-all md:break-normal">
                                        {item.value}
                                    </h3>
                                </div>
                            </motion.a>
                        ))}

                        <div className="bg-primary p-10 rounded-[50px] text-foreground space-y-4 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700" />
                            <h4 className="text-2xl font-black uppercase italic leading-none">60 Minute <br /> Arrival Guarantee</h4>
                            <p className="text-foreground text-[10px] font-black uppercase tracking-widest leading-relaxed opacity-80">
                                Serving Loudoun, Fairfax, & Prince William County with rapid emergency deployment.
                            </p>
                            <SlCallIn className="absolute bottom-8 right-8 text-white/20 text-6xl rotate-12" />
                        </div>
                    </div>

                    {/* --- Right Side: Form --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-card border border-border p-8 md:p-14 rounded-[50px] shadow-2xl relative">
                            <div className="flex items-center gap-3 mb-12">
                                <HiOutlineSparkles className="text-primary" size={24} />
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Service Request Protocol</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="relative">
                                        <input required type="text" id="name" value={formData.name} onChange={handleInputChange} placeholder=" " className="peer w-full bg-transparent border-b-2 border-border focus:border-primary py-3 outline-none transition-all font-bold text-foreground" />
                                        <label htmlFor="name" className="absolute left-0 -top-5 text-[10px] font-black uppercase tracking-widest text-secondary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-primary transition-all">Full Name</label>
                                    </div>
                                    <div className="relative">
                                        <input required type="tel" id="phone" value={formData.phone} onChange={handleInputChange} placeholder=" " className="peer w-full bg-transparent border-b-2 border-border focus:border-primary py-3 outline-none transition-all font-bold text-foreground" />
                                        <label htmlFor="phone" className="absolute left-0 -top-5 text-[10px] font-black uppercase tracking-widest text-secondary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-primary transition-all">Emergency Contact</label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Restoration Category</label>
                                        <select required id="category" value={formData.category} onChange={handleCategoryChange} className="w-full bg-accent/40 border border-border/50 px-6 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-xs appearance-none bg-gray-600 text-white">
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                                        </select>
                                    </div>
                                    <AnimatePresence>
                                        {formData.category && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Specific Problem</label>
                                                <select required id="subCategory" value={formData.subCategory} onChange={handleInputChange} className="w-full bg-accent/40 border border-border/50 px-6 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-xs appearance-none bg-gray-600 text-white">
                                                    <option value="">Specific Issue</option>
                                                    {subCategories.map((sub) => (<option key={sub._id} value={sub._id}>{sub.name}</option>))}
                                                    <option value="other's">Others</option>
                                                </select>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-primary ml-1">Situation Description</label>
                                    <textarea required id="message" value={formData.message} onChange={handleInputChange} rows="3" placeholder="Explain the damage (e.g. water leak, fire soot)..." className="w-full bg-accent/40 border border-border/50 px-8 py-6 rounded-[30px] outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm resize-none" />
                                </div>

                                <motion.button
                                    disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    className="group relative flex items-center justify-between w-full bg-foreground text-background p-2 rounded-full overflow-hidden transition-all duration-500 shadow-lg shadow-green-500 hover:shadow-2xl"
                                >
                                    <span className="ml-10 font-black uppercase tracking-widest text-[10px]">{loading ? "Dispatching..." : "Send Request"}</span>
                                    <div className="bg-primary p-5 rounded-full text-foreground group-hover:px-12 transition-all">
                                        <HiArrowRight size={22} />
                                    </div>
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>

                {/* --- Map Section --- */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 pl-2">
                            Location 1 — Ashburn, VA
                        </p>
                        <div className="h-80 w-full bg-accent rounded-[40px] overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-1000">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.3789327823526!2d-77.4912239!3d39.014238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64bf2e4db82ad%3A0x1234567890abcdef!2s42785%20Generation%20Dr%2C%20Ashburn%2C%20VA%2020147!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 pl-2">
                            Location 2 — Manassas, VA
                        </p>
                        <div className="h-80 w-full bg-accent rounded-[40px] overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-1000">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.3789327823526!2d-77.4755!3d38.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b6730b6b6b6b6b%3A0xabcdef1234567890!2s8735%20Quarry%20Rd%20Unit%20102%2C%20Manassas%2C%20VA%2020110!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}