/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";

// SEO ও লোকেশন ভিত্তিক রিভিউ ডাটা
const reviews = [
  {
    id: 1,
    name: "Jacke Manders",
    role: "Home Owner in Fairfax",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "When my basement flooded in Fairfax, I called Prime Solution. They found the leak fast and handled the water restoration efficiently. Highly recommend!",
    stars: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Business Manager, Loudoun",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The fire damage in our Loudoun office was extensive. Their team handled everything from soot removal to reconstruction with expert care.",
    stars: 5,
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Property Manager, DC",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "Mold remediation is a tricky job, but they did it perfectly in our DC facility. They even provided a full report for our insurance claim.",
    stars: 5,
  },
  {
    id: 4,
    name: "David Miller",
    role: "Home Owner, Prince William",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    text: "Fast response across Prince William County! They saved my wooden floor after a major pipe burst leak. Very professional team.",
    stars: 5,
  },
  {
    id: 5,
    name: "Emily Blunt",
    role: "Store Owner, Montgomery",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    text: "Excellent drywall repair and interior restoration service in Montgomery County. They were on time and explained the whole process clearly.",
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
    <section className="py-24 bg-background transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">
              Real Client Success
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mt-2 leading-tight uppercase italic tracking-tighter">
              Restoring Homes, <br /> 
              <span className="text-orange-600">Rebuilding Trust.</span>
            </h2>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="p-4 rounded-2xl border border-border bg-accent/20 text-foreground hover:bg-orange-600 hover:text-white transition-all active:scale-90 shadow-xl"
            >
              <HiChevronLeft size={28} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="p-4 rounded-2xl border border-border bg-accent/20 text-foreground hover:bg-orange-600 hover:text-white transition-all active:scale-90 shadow-xl"
            >
              <HiChevronRight size={28} />
            </button>
          </div>
        </div>

        {/* Testimonials Display */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {reviews
                .slice(startIndex, startIndex + visibleCards)
                .map((review) => (
                  <motion.div
                    key={review.id}
                    layout
                    whileHover={{ y: -12 }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="group bg-accent/20 hover:bg-accent/40 p-10 rounded-[2.5rem] border border-border hover:border-orange-600/30 shadow-2xl transition-all duration-500 flex flex-col h-full backdrop-blur-md relative overflow-hidden"
                  >
                    {/* Decorative Background Quote Icon */}
                    <div className="absolute -top-4 -right-2 text-9xl text-orange-600 opacity-[0.03] font-serif pointer-events-none">
                       "
                    </div>

                    <div className="flex gap-1 mb-8">
                      {[...Array(review.stars)].map((_, i) => (
                        <HiStar
                          key={i}
                          className="text-orange-500 text-xl group-hover:scale-125 transition-transform duration-300"
                        />
                      ))}
                    </div>

                    <p className="text-secondary group-hover:text-foreground italic mb-10 grow leading-relaxed text-lg transition-colors font-medium">
                      "{review.text}"
                    </p>

                    <div className="flex items-center gap-5 mt-auto border-t border-border pt-8">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-14 h-14 rounded-full border-2 border-orange-600 shadow-lg p-0.5 object-cover"
                      />
                      <div>
                        <h4 className="font-black text-foreground text-base uppercase italic tracking-tight group-hover:text-orange-600 transition-colors">
                          {review.name}
                        </h4>
                        <p className="text-[10px] font-black text-orange-600/70 uppercase tracking-widest mt-1">
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
        <div className="flex justify-center gap-4 mt-16">
          {[...Array(reviews.length - visibleCards + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                startIndex === i
                  ? "w-12 bg-orange-600 shadow-lg shadow-orange-600/40"
                  : "w-3 bg-border hover:bg-orange-500/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}