"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiMinus } from "react-icons/hi";

const faqs = [
  {
    question: "How quickly can you respond to a water damage emergency?",
    answer:
      "We provide 24/7 emergency response and typically arrive on-site within 60 minutes of your call. Fast response is critical to minimize structural damage and prevent mold growth.",
  },
  {
    question: "Do you work with insurance companies for restoration claims?",
    answer:
      "Yes. We work directly with all major insurance providers and help you navigate the claims process from start to finish — including documentation, estimates, and direct billing when possible.",
  },
  {
    question: "What areas do you serve in Virginia, DC, and Maryland?",
    answer:
      "We serve Loudoun County, Fairfax County, and Prince William County in Northern Virginia, Washington DC, and the greater Maryland area. Contact us to confirm coverage for your specific location.",
  },
  {
    question: "How long does water damage restoration typically take?",
    answer:
      "Minor water damage can be restored in 3–5 days. More extensive damage involving structural drying or mold remediation may take 1–2 weeks. We provide a detailed timeline after the initial assessment.",
  },
  {
    question: "Is mold dangerous, and how do you safely remove it?",
    answer:
      "Yes, mold can cause serious health risks including respiratory issues. Our certified technicians use containment barriers, HEPA filtration, and EPA-approved antimicrobial treatments to safely remove mold and prevent regrowth.",
  },
  {
    question: "What certifications do your restoration technicians hold?",
    answer:
      "Our team holds IICRC (Institute of Inspection Cleaning and Restoration Certification) certifications in water damage restoration, fire & smoke damage, and mold remediation. We are fully licensed and insured.",
  },
  {
    question: "Can you handle both residential and commercial restoration?",
    answer:
      "Absolutely. We restore residential homes, apartment complexes, office buildings, retail spaces, and other commercial properties throughout the VA, DC, and MD region.",
  },
  {
    question: "What should I do immediately after discovering water damage?",
    answer:
      "First, ensure safety — turn off electricity in affected areas if safe to do so. Then call us immediately. Avoid using fans or heaters without professional guidance, as improper drying can cause further damage and mold.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-black uppercase tracking-[0.3em] text-xs"
          >
            Got Questions?
          </motion.span>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter mt-4 mb-6"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary text-lg max-w-xl mx-auto"
          >
            Everything you need to know about our restoration services in VA, DC & MD.
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-8 py-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-bold text-base md:text-lg leading-snug">
                  {faq.question}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {openIndex === i ? <HiMinus /> : <HiPlus />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <p className="px-8 pb-6 text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
