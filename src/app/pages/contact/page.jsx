/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiArrowRight, HiOutlineSparkles } from "react-icons/hi";
import { SlCallIn } from "react-icons/sl";

const contactInfo = [
    {
        icon: HiOutlinePhone,
        label: "24/7 Emergency",
        value: "(888) 123-4567",
        link: "tel:+18881234567",
        color: "bg-orange-600"
    },
    {
        icon: HiOutlineMail,
        label: "Email Support",
        value: "help@restoration.com",
        link: "mailto:help@restoration.com",
        color: "bg-slate-900"
    },
    {
        icon: HiOutlineLocationMarker,
        label: "Main Office",
        value: "123 Recovery Way, NY",
        link: "#",
        color: "bg-slate-900"
    },
];

export default function ContactPage() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        category: "",
        subCategory: "",
        message: ""
    });

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // 1. Fetch Categories on mount
    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then(res => res.json())
            .then(data => setCategories(data.data || []))
            .catch(err => console.error("Category load failed", err));
    }, [API_URL]);

    // 2. Fetch Sub-categories when Category selection changes
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
            subCategory: "" // Reset sub-category on category change
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
                alert("Dispatch Request Sent Successfully!");
                setFormData({ name: "", phone: "", category: "", subCategory: "", message: "" });
            }
        } catch (err) {
            alert("Submission failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500 pt-32 pb-20">
            <div className="container mx-auto px-6">

                {/* --- Header Section --- */}
                <div className="max-w-3xl mb-20">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="text-primary font-black uppercase tracking-[0.3em] text-xs border-l-4 border-primary pl-4"
                    >
                        Immediate Support
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mt-6"
                    >
                        Get In <span className="text-primary">Touch</span>
                    </motion.h1>
                    <p className="mt-8 text-secondary text-lg font-medium max-w-xl italic">
                        Facing a disaster? Don't wait. Our dispatch teams are ready to deploy 24/7. Use the form or call us directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* --- Left Side: Contact Info Cards --- */}
                    <div className="lg:col-span-5 space-y-6">
                        {contactInfo.map((item, i) => (
                            <motion.a
                                href={item.link}
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group flex items-center gap-6 bg-card p-8 rounded-[40px] border border-border hover:border-primary/30 transition-all shadow-sm hover:shadow-xl active:scale-95"
                            >
                                <div className={`${item.color} p-5 rounded-3xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                    <item.icon size={28} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">{item.label}</p>
                                    <h3 className="text-xl font-black uppercase italic tracking-tight">{item.value}</h3>
                                </div>
                            </motion.a>
                        ))}

                        {/* Emergency Floating Box */}
                        <div className="bg-primary p-10 rounded-[50px] text-foreground space-y-4 shadow-2xl shadow-primary/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                            <h4 className="text-2xl font-black uppercase italic leading-none">60 Minute <br /> Response Time</h4>
                            <p className="text-foreground text-xs font-bold uppercase tracking-widest leading-relaxed">
                                We guarantee to be on-site <br /> within one hour.
                            </p>
                            <SlCallIn className="absolute bottom-8 right-8 text-white/20 text-6xl rotate-12" />
                        </div>
                    </div>

                    {/* --- Right Side: Redesigned Modern Form --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 relative group"
                    >
                        <div className="absolute -inset-4 bg-linear-to-tr from-primary/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                        <div className="bg-card border border-border/60 p-8 md:p-14 rounded-[45px] shadow-2xl shadow-slate-200/50 relative overflow-hidden">

                            <div className="flex items-center gap-3 mb-10">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <HiOutlineSparkles size={20} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                                    Secured Dispatch Form
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                                    <div className="relative group/field">
                                        <input
                                            required
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            className="peer w-full bg-transparent border-b-2 border-border focus:border-primary py-3 outline-none transition-all font-bold text-foreground placeholder-transparent"
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute left-0 -top-5 text-[10px] font-black uppercase tracking-widest text-secondary transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-medium peer-focus:-top-5 peer-focus:text-[10px] peer-focus:font-black peer-focus:text-primary pointer-events-none"
                                        >
                                            Full Name
                                        </label>
                                    </div>

                                    <div className="relative group/field">
                                        <input
                                            required
                                            type="tel"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            className="peer w-full bg-transparent border-b-2 border-border focus:border-primary py-3 outline-none transition-all font-bold text-foreground placeholder-transparent"
                                        />
                                        <label
                                            htmlFor="phone"
                                            className="absolute left-0 -top-5 text-[10px] font-black uppercase tracking-widest text-secondary transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-medium peer-focus:-top-5 peer-focus:text-[10px] peer-focus:font-black peer-focus:text-primary pointer-events-none"
                                        >
                                            Phone Number
                                        </label>
                                    </div>
                                </div>

                                {/* Service Category Dropdown */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">
                                        Nature of Emergency
                                    </label>
                                    <div className="relative">
                                        <select
                                            required
                                            id="category"
                                            value={formData.category}
                                            onChange={handleCategoryChange}
                                            className="w-full bg-accent/30 border border-border/40 px-6 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm appearance-none cursor-pointer"
                                        >
                                            <option value="" className="text-secondary">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat._id} value={cat._id} className="text-foreground">{cat.name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                                            ↓
                                        </div>
                                    </div>
                                </div>

                                {/* Dynamic Sub-Category Dropdown */}
                                <AnimatePresence>
                                    {formData.category && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-4 overflow-hidden"
                                        >
                                            <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">
                                                Specific Service Required
                                            </label>
                                            <div className="relative">
                                                <select
                                                    required
                                                    id="subCategory"
                                                    value={formData.subCategory}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-accent/30 border border-border/40 px-6 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm appearance-none cursor-pointer"
                                                >
                                                    <option value="">Select Specific Service</option>
                                                    {subCategories.map((sub) => (
                                                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary font-bold">
                                                    →
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">
                                        Describe Situation
                                    </label>
                                    <textarea
                                        required
                                        id="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows="3"
                                        placeholder="Briefly describe the damage (e.g., flooded basement, kitchen fire)..."
                                        className="w-full bg-accent/30 border border-border/40 px-8 py-6 rounded-[30px] outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm resize-none"
                                    />
                                </div>

                                <motion.button
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group relative flex items-center justify-between w-full bg-foreground text-background p-2 rounded-[25px] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 shadow shadow-green-400 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                                >
                                    <span className="ml-8 font-black uppercase tracking-[0.2em] text-xs">
                                        {loading ? "Sending Request..." : "Dispatch Request"}
                                    </span>
                                    <div className="bg-primary p-5 rounded-[20px] text-foreground group-hover:px-10 transition-all duration-500">
                                        <HiArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.button>

                                <p className="text-center text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">
                                    Secure 256-bit Encrypted Transmission
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>

                {/* --- Map Section --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 h-100 w-full bg-accent rounded-[60px] overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-700 relative group"
                >
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-all pointer-events-none z-10" />
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1676912345678!5m2!1sen!2s"
                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                    ></iframe>
                </motion.div>
            </div>
        </div>
    );
}