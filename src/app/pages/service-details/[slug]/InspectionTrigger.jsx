"use client";
import { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion import করুন
import { HiShieldCheck } from "react-icons/hi";
import InspectionModal from "../../../components/InspectionModal";

export default function InspectionTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  // বাটন অ্যানিমেশনের ভেরিয়েন্ট
  const buttonVariants = {
    // ডিফল্ট অবস্থা: হালকা পালস বা ব্রিদিং এফেক্ট
    default: {
      scale: 1,
      boxShadow: "0px 0px 0px rgba(234, 88, 12, 0)", // Orange glow off
    },
    // হোভার অবস্থা: স্কেল আপ এবং গ্লো এফেক্ট
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 30px rgba(234, 88, 12, 0.3)", // Subtle Orange glow
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    // ক্লিক করার অবস্থা: সামান্য স্কেল ডাউন
    tap: {
      scale: 0.97,
    },
    // অটোমেটিক পালস অ্যানিমেশন (দৃষ্টি আকর্ষণের জন্য)
    pulse: {
        scale: [1, 1.01, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* motion.button ব্যবহার করুন */}
      <motion.button
        onClick={() => setIsOpen(true)}
        variants={buttonVariants}
        initial="pulse" // শুরুতে পালস অ্যানিমেশন চলবে
        whileHover="hover" // হোভার করলে 'hover' ভেরিয়েন্ট চলবে
        whileTap="tap" // ক্লিক করলে 'tap' ভেরিয়েন্ট চলবে
        className="group relative flex items-center justify-center gap-3 w-full py-5 bg-black text-orange-600 font-black rounded-2xl border border-white/10 overflow-hidden"
        style={{ originX: 0.5, originY: 0.5 }} // স্কেলিং কেন্দ্রবিন্দু ঠিক রাখার জন্য
      >
        {/* Background animation on hover (CSS transition - already exists) */}
        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />

        {/* Icon with hover scale (CSS transition - already exists) */}
        <HiShieldCheck 
            size={24} 
            className="text-orange-600 group-hover:scale-110 transition-transform duration-300 relative z-10" 
        />
        
        {/* Text with hover color change (CSS transition) */}
        <span className="relative z-10 uppercase tracking-widest text-xs group-hover:text-black transition-colors duration-300">
            Request Free Inspection
        </span>

        {/* Subtle border shine effect on hover (CSS) */}
        <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
      </motion.button>

      <InspectionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}