/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import { HiCheckCircle, HiPhone, HiArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";
import { useEffect } from "react";

export default function ThankYouPage() {

  useEffect(() => {
    // Google Ads Conversion Tracking
    // Replace 'AW-XXXXXXXXX' and 'CONVERSION_LABEL' with your actual values
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-XXXXXXXXX/CONVERSION_LABEL",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">

        {/* Green Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <HiCheckCircle className="text-green-500 text-[120px]" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6"
        >
          Thank <span className="text-primary">You!</span>
        </motion.h1>

        {/* Confirmation Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-secondary text-lg md:text-xl font-medium mb-4"
        >
          Your request has been received successfully. Our restoration dispatcher will contact you within{" "}
          <span className="text-primary font-black">15 minutes</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-secondary/60 mb-10"
        >
          We appreciate your trust in Prime Solution Restoration. Our certified team is ready to help.
        </motion.p>

        {/* Phone Number */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          href="tel:+15716557207"
          className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-lg hover:bg-orange-500 transition-all shadow-xl shadow-primary/30 mb-6"
        >
          <HiPhone className="animate-pulse" size={24} />
          +1 (571) 655-7207
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-secondary/40 text-sm mb-10"
        >
          For immediate assistance, call us anytime — we're available 24/7.
        </motion.p>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            <HiArrowNarrowLeft size={18} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
