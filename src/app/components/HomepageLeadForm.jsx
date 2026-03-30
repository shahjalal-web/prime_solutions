"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiPhone, HiClock, HiShieldCheck, HiChevronDown } from "react-icons/hi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function HomepageLeadForm() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "", phone: "", category: "", subCategory: "", address: "", problem: ""
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((d) => setCategories(d.data || []))
      .catch(() => {});
  }, [API_URL]);

  useEffect(() => {
    if (formData.category) {
      fetch(`${API_URL}/sub-categories?category=${formData.category}`)
        .then((res) => res.json())
        .then((d) => setSubCategories(d.data || []))
        .catch(() => {});
    } else {
      setSubCategories([]);
    }
  }, [formData.category, API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Transmitting your request to dispatch...");

    try {
      const res = await fetch(`${API_URL}/inspections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Request Received!", {
          id: toastId,
          description: "Our dispatcher will contact you within 15 minutes.",
          duration: 5000,
        });
        setFormData({ name: "", phone: "", category: "", subCategory: "", address: "", problem: "" });
        router.push("/thank-you");
      } else {
        throw new Error(data.message || "Failed to submit");
      }
    } catch (error) {
      toast.error(error.message || "Network error. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-600/10 blur-[100px] rounded-full -ml-36 -mt-36" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full -mr-48 -mb-48" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Urgency content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-xs font-black uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
              </span>
              Emergency Response Active
            </div>

            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.95]">
              Water Damage? Fire? Mold?<br />
              <span className="text-orange-600">Get Help Now.</span>
            </h2>

            <p className="text-gray-400 text-base leading-relaxed max-w-md">
              Don&apos;t wait — every minute counts. Request a free inspection and our certified team will be at your door within 60 minutes.
            </p>

            {/* Trust points */}
            <div className="space-y-3 pt-2">
              {[
                { icon: HiClock, text: "60-minute emergency response guarantee" },
                { icon: HiShieldCheck, text: "Licensed, insured & IICRC certified" },
                { icon: HiPhone, text: "We handle your insurance claim directly" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="text-orange-600" size={16} />
                  </div>
                  <p className=" text-sm font-bold">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Phone CTA */}
            <a
              href="tel:+15716557207"
              className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 mt-4"
            >
              <HiPhone size={20} className="animate-pulse" />
              Call Now: (571) 655-7207
            </a>
          </motion.div>

          {/* Right: Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className=" border rounded-[30px] p-8 backdrop-blur-sm">
              <div className="mb-6">
                <h3 className="text-2xl font-black uppercase italic tracking-tight">
                  Request Free <span className="text-orange-600">Inspection</span>
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                  We respond within 15 minutes
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Full Name"
                    className="border p-4 rounded-xl focus:border-orange-600 outline-none font-bold  text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    required
                    placeholder="Phone Number"
                    className="border p-4 rounded-xl focus:border-orange-600 outline-none font-bold  text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      required
                      className="w-full border p-4 rounded-xl focus:border-orange-600 outline-none font-bold appearance-none cursor-pointer bg-gray-500 text-sm"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: "" })}
                    >
                      <option value="" className="">What happened?</option>
                      {categories.map(c => <option key={c._id} value={c._id} className="">{c.name}</option>)}
                    </select>
                    <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      required
                      disabled={!formData.category}
                      className="w-full border p-4 rounded-xl focus:border-orange-600 outline-none font-bold appearance-none cursor-pointer bg-gray-500 text-sm disabled:opacity-30"
                      value={formData.subCategory}
                      onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    >
                      <option value="" className="">Select Service</option>
                      {subCategories.map(s => <option key={s._id} value={s._id} className="">{s.name}</option>)}
                      <option value="others" className="">Others</option>
                    </select>
                    <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600 pointer-events-none" />
                  </div>
                </div>

                <textarea
                  required
                  placeholder="Property Address"
                  rows={2}
                  className="w-full border p-4 rounded-xl focus:border-orange-600 outline-none font-bold  text-sm resize-none"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />

                <textarea
                  placeholder="Briefly describe the damage (optional)"
                  rows={2}
                  className="w-full border p-4 rounded-xl focus:border-orange-600 outline-none font-bold  text-sm resize-none"
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                />

                <button
                  disabled={loading}
                  className="w-full py-4 bg-orange-600 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all disabled:opacity-50 text-sm"
                >
                  {loading ? "SENDING..." : "REQUEST FREE INSPECTION"}
                </button>

                <p className="text-center text-white/30 text-[10px] font-bold uppercase tracking-wider">
                  No obligation. Free assessment. Available 24/7.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
