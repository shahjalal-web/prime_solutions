"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronDown, HiCheckCircle } from "react-icons/hi";
import { toast } from "sonner";

export default function InspectionModal({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "", phone: "", category: "", subCategory: "", address: "", problem: ""
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  // Fetch Categories
  useEffect(() => {
    if (isOpen) {
      fetch(`${API_URL}/categories`)
        .then((res) => res.json())
        .then((d) => setCategories(d.data || []));
    }
  }, [isOpen, API_URL]);

  // Fetch Sub-categories
  useEffect(() => {
    if (formData.category) {
      fetch(`${API_URL}/sub-categories?category=${formData.category}`)
        .then((res) => res.json())
        .then((d) => setSubCategories(d.data || []));
    }
  }, [formData.category, API_URL]);

// handleSubmit function inside InspectionModal
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Transmitting your request to dispatch...");

    try {
      const res = await fetch(`${API_URL}/inspections`, { // Endpoint updated
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
        setSubmitted(true);
      } else {
        throw new Error(data.message || "Failed to submit");
      }
    } catch (error) {
      toast.error(error.message || "Network error. Please try again.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {submitted ? (
              /* Thank You Screen */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <HiCheckCircle className="text-green-500 text-8xl mb-6" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl text-white font-black uppercase italic tracking-tighter"
                >
                  Thank <span className="text-orange-600">You!</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/60 font-bold mt-4 max-w-md"
                >
                  Your inspection request has been received successfully. Our dispatcher will contact you within <span className="text-orange-500 font-black">15 minutes</span>.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/40 text-sm mt-2"
                >
                  For immediate assistance, call us at <a href="tel:+15716557207" className="text-orange-500 hover:underline font-bold">+1 (571) 655-7207</a>
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={handleClose}
                  className="mt-8 px-10 py-4 bg-orange-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-black transition-all"
                >
                  CLOSE
                </motion.button>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="p-8 pb-0 flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-3xl text-white font-black uppercase italic tracking-tighter">
                      Request <span className="text-orange-600">Dispatch</span>
                    </h2>
                    <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">
                      Certified Response Protocol
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-3 bg-white/5 text-white rounded-full hover:bg-red-500 transition-all"
                  >
                    <HiX size={20} />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      required
                      name="name"
                      placeholder="Full Name"
                      className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-orange-600 outline-none font-bold text-white placeholder:text-white/30"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />

                    <input
                      required
                      name="phone"
                      placeholder="Phone Number"
                      className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-orange-600 outline-none font-bold text-white placeholder:text-white/30"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <select
                        required
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-orange-600 outline-none font-bold appearance-none cursor-pointer text-white"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value, subCategory: ""})}
                      >
                        <option value="" className="bg-[#0f0f0f]">Select Service</option>
                        {categories.map(c => <option key={c._id} value={c._id} className="bg-[#0f0f0f]">{c.name}</option>)}
                      </select>
                      <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        required
                        disabled={!formData.category}
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-orange-600 outline-none font-bold appearance-none cursor-pointer text-white disabled:opacity-30"
                        value={formData.subCategory}
                        onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                      >
                        <option value="" className="bg-[#0f0f0f]">Select Protocol</option>
                        {subCategories.map(s => <option key={s._id} value={s._id} className="bg-[#0f0f0f]">{s.name}</option>)}
                        <option className="bg-black" value="others">Others</option>
                      </select>
                      <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600 pointer-events-none" />
                    </div>
                  </div>

                  <textarea
                    required
                    placeholder="Property Address"
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-orange-600 outline-none font-bold h-24 text-white placeholder:text-white/30"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />

                  <textarea
                    required
                    placeholder="Describe the damage..."
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-orange-600 outline-none font-bold h-24 text-white placeholder:text-white/30"
                    value={formData.problem}
                    onChange={(e) => setFormData({...formData, problem: e.target.value})}
                  />

                  <button
                    disabled={loading}
                    className="w-full py-5 bg-orange-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-black transition-all"
                  >
                    {loading ? "TRANSMITTING..." : "SEND INSPECTION REQUEST"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}