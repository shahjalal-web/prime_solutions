"use client";
import { useState, useEffect } from "react";
import { HiPhone, HiClock, HiShieldCheck, HiChevronDown, HiCheck, HiStar, HiLocationMarker } from "react-icons/hi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LandingPageTemplate({
  headline,
  subHeadline,
  heroDescription,
  servicePoints,
  processSteps,
  faqs,
  urgencyText,
}) {
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
    const toastId = toast.loading("Sending your request...");
    try {
      const res = await fetch(`${API_URL}/inspections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Request Received!", { id: toastId, description: "We'll contact you within 15 minutes." });
        setFormData({ name: "", phone: "", category: "", subCategory: "", address: "", problem: "" });
        router.push("/thank-you");
      } else {
        throw new Error(data.message || "Failed");
      }
    } catch (error) {
      toast.error(error.message || "Network error.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      {/* --- Top Bar --- */}
      <div className="bg-red-600 text-white text-center py-3 px-4">
        <p className="text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          {urgencyText || "24/7 Emergency Response — Call Now: (571) 655-7207"}
        </p>
      </div>

      {/* --- Hero + Form --- */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left: Content */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="PSR" className="w-10 h-10 rounded-xl" />
                <span className="text-white/60 font-black text-sm uppercase tracking-wider">Prime Solution Restoration</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.95]">
                {headline}
                <br />
                <span className="text-orange-600">{subHeadline}</span>
              </h1>

              <p className="text-white/60 text-base leading-relaxed max-w-lg">
                {heroDescription}
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: HiClock, text: "60 Min Response" },
                  { icon: HiShieldCheck, text: "Licensed & Insured" },
                  { icon: HiStar, text: "5.0 Google Rating" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
                    <item.icon className="text-orange-600" size={16} />
                    <span className="text-xs font-black text-white/80 uppercase tracking-wider">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Phone CTA */}
              <a
                href="tel:+15716557207"
                className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-600/30"
              >
                <HiPhone size={20} className="animate-pulse" />
                Call Now: (571) 655-7207
              </a>

              {/* Service points */}
              <div className="space-y-3 pt-4">
                {servicePoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <HiCheck className="text-green-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-white/70 text-sm font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-[24px] p-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-black uppercase italic tracking-tight text-gray-900">
                  Get a Free <span className="text-orange-600">Inspection</span>
                </h2>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                  We respond within 15 minutes
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  required
                  placeholder="Full Name"
                  className="w-full border border-gray-200 bg-gray-50 p-4 rounded-xl outline-none font-bold text-gray-900 placeholder:text-gray-400 text-sm focus:border-orange-600 focus:ring-2 focus:ring-orange-600/10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  required
                  placeholder="Phone Number"
                  className="w-full border border-gray-200 bg-gray-50 p-4 rounded-xl outline-none font-bold text-gray-900 placeholder:text-gray-400 text-sm focus:border-orange-600 focus:ring-2 focus:ring-orange-600/10"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <select
                      required
                      className="w-full border border-gray-200 bg-gray-50 p-4 rounded-xl outline-none font-bold text-gray-900 text-sm appearance-none cursor-pointer focus:border-orange-600"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: "" })}
                    >
                      <option value="">Service Type</option>
                      {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                    <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select
                      required
                      disabled={!formData.category}
                      className="w-full border border-gray-200 bg-gray-50 p-4 rounded-xl outline-none font-bold text-gray-900 text-sm appearance-none cursor-pointer focus:border-orange-600 disabled:opacity-40"
                      value={formData.subCategory}
                      onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    >
                      <option value="">Specific Issue</option>
                      {subCategories.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                      <option value="others">Others</option>
                    </select>
                    <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <input
                  required
                  placeholder="Property Address"
                  className="w-full border border-gray-200 bg-gray-50 p-4 rounded-xl outline-none font-bold text-gray-900 placeholder:text-gray-400 text-sm focus:border-orange-600 focus:ring-2 focus:ring-orange-600/10"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />

                <textarea
                  placeholder="Describe the damage (optional)"
                  rows={2}
                  className="w-full border border-gray-200 bg-gray-50 p-4 rounded-xl outline-none font-bold text-gray-900 placeholder:text-gray-400 text-sm resize-none focus:border-orange-600"
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                />

                <button
                  disabled={loading}
                  className="w-full py-4 bg-orange-600 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all disabled:opacity-50 text-sm"
                >
                  {loading ? "SENDING..." : "REQUEST FREE INSPECTION"}
                </button>

                <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                  No obligation. Free assessment. Available 24/7.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Process --- */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter text-center mb-12">
            How It <span className="text-orange-600">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white font-black text-lg">
                  {i + 1}
                </div>
                <h3 className="font-black uppercase italic tracking-tight mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter text-center mb-10">
            Common <span className="text-orange-600">Questions</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-white hover:text-orange-600 transition-colors list-none text-sm">
                  <span>{faq.q}</span>
                  <span className="ml-4 text-orange-600 font-black group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- Service Areas --- */}
      <section className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 flex items-center justify-center gap-2">
            <HiLocationMarker className="text-orange-600" size={14} /> Service Areas
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Loudoun County", "Fairfax County", "Prince William County", "Arlington", "Alexandria", "Washington DC", "Maryland"].map((area, i) => (
              <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/60 uppercase tracking-wider">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- Bottom CTA --- */}
      <section className="py-12 px-6 bg-orange-600 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">
            Don&apos;t Wait. Call Now.
          </h2>
          <a
            href="tel:+15716557207"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-100 transition-all shadow-xl"
          >
            <HiPhone size={22} />
            (571) 655-7207
          </a>
        </div>
      </section>
    </div>
  );
}
