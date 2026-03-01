/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const reviews = [
  {
    id: 1,
    name: "Jacke Manders",
    role: "Home Owner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "When my basement flooded, I called these guys for help. They found the leak fast and fixed it efficiently.",
    stars: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Business Manager",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The fire damage in our office was extensive. P Solution Services handled everything from soot removal to reconstruction.",
    stars: 5,
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Property Manager",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "Mold remediation is a tricky job, but they did it perfectly. They even provided a full report for my insurance.",
    stars: 5,
  },
  {
    id: 4,
    name: "David Miller",
    role: "Home Owner",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    text: "Fast response and very professional team. They saved my wooden floor after a major leak.",
    stars: 4,
  },
  {
    id: 5,
    name: "Emily Blunt",
    role: "Store Owner",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    text: "Excellent service! They were on time and explained the whole process clearly.",
    stars: 5,
  },
];

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setVisibleCards(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % (reviews.length - visibleCards + 1));
  };

  const prevSlide = () => {
    setStartIndex((prev) =>
      prev === 0 ? reviews.length - visibleCards : prev - 1,
    );
  };

  if (!mounted) return null;

  return (
    <section className="py-24 bg--background transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">
              Client Feedbacks
            </span>
            <h2 className="text-4xl md:text-5xl font-black text--foreground mt-2 leading-tight">
              What Our Customers Say
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-xl border border--secondary/20 bg--background text--foreground hover:bg-orange-600 hover:text-white hover:shadow-orange-500/30 hover:shadow-xl transition-all active:scale-95"
            >
              <HiChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-xl border border--secondary/20 bg--background text--foreground hover:bg-orange-600 hover:text-white hover:shadow-orange-500/30 hover:shadow-xl transition-all active:scale-95"
            >
              <HiChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Testimonials Display */}
        <div className="relative min-h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {reviews
                .slice(startIndex, startIndex + visibleCards)
                .map((review) => (
                  <motion.div
                    key={review.id}
                    layout
                    // Framer Motion Hover Animation (Scale & Shift up)
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    // Tailwind Hover Classes (Background & Border)
                    // `group` use kora hoyeche future child effects er jonno
                    className="group cursor-pointer bg--accent/30 hover:bg--accent p-8 rounded-3xl border border--secondary/10 hover:border-orange-500/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full backdrop-blur-sm"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.stars)].map((_, i) => (
                        <HiStar
                          key={i}
                          className="text-orange-500 text-lg group-hover:scale-110 transition-transform"
                        />
                      ))}
                    </div>

                    <p className="text--secondary group-hover:text--foreground italic mb-8 grow leading-relaxed transition-colors">
                      "{review.text}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                      <img
                        src={review.image}
                        alt={review.name}
                        // image p0.5 border-orange use kore premium dekhte hobe
                        className="w-12 h-12 rounded-full border-2 border-orange-500 shadow-sm p-0.5"
                      />
                      <div>
                        <h4 className="font-bold text--foreground text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {review.name}
                        </h4>
                        <p className="text-xs text--secondary group-hover:text--foreground transition-colors">
                          {review.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {[...Array(reviews.length - visibleCards + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                startIndex === i
                  ? "w-10 bg-orange-600"
                  : "w-2.5 bg--secondary/30 hover:bg-orange-500/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
