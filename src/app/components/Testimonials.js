/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar, HiChevronLeft, HiChevronRight, HiExternalLink } from "react-icons/hi";

// Google Review data — replace with real reviews when available
const reviews = [
  {
    id: 1,
    name: "Jacke Manders",
    role: "Fairfax, VA",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "When my basement flooded in Fairfax, I called Prime Solution. They found the leak fast and handled the water restoration efficiently. Highly recommend!",
    stars: 5,
    timeAgo: "2 weeks ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Ashburn, VA",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The fire damage in our Loudoun office was extensive. Their team handled everything from soot removal to reconstruction with expert care.",
    stars: 5,
    timeAgo: "1 month ago",
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Washington, DC",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "Mold remediation is a tricky job, but they did it perfectly in our DC facility. They even provided a full report for our insurance claim.",
    stars: 5,
    timeAgo: "3 weeks ago",
  },
  {
    id: 4,
    name: "David Miller",
    role: "Woodbridge, VA",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    text: "Fast response across Prince William County! They saved my wooden floor after a major pipe burst leak. Very professional team.",
    stars: 5,
    timeAgo: "1 month ago",
  },
  {
    id: 5,
    name: "Emily Chen",
    role: "Reston, VA",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    text: "Excellent drywall repair and interior restoration service. They were on time and explained the whole process clearly. Insurance was handled smoothly.",
    stars: 5,
    timeAgo: "2 months ago",
  },
];

const GOOGLE_REVIEW_URL = "https://g.page/r/prime-solution-restoration/review";

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

        {/* Google Rating Badge + Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">
              Verified Reviews
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mt-2 leading-tight uppercase italic tracking-tighter">
              Restoring Homes, <br />
              <span className="text-orange-600">Rebuilding Trust.</span>
            </h2>

            {/* Google Rating Summary */}
            <div className="flex items-center gap-4 mt-6 flex-wrap">
              <div className="flex items-center gap-3 bg-white dark:bg-card border border-border rounded-2xl px-5 py-3 shadow-sm">
                {/* Google "G" Logo */}
                <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-black text-foreground">5.0</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} className="text-yellow-400" size={16} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Google Reviews</p>
                </div>
              </div>

              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-black text-orange-600 hover:text-orange-700 transition-colors uppercase tracking-wide"
              >
                Leave a Review <HiExternalLink size={16} />
              </a>
            </div>
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

        {/* Review Cards */}
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
                    {/* Google icon watermark */}
                    <div className="absolute top-6 right-6 opacity-20">
                      <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {[...Array(review.stars)].map((_, i) => (
                        <HiStar
                          key={i}
                          className="text-yellow-400 text-lg group-hover:scale-110 transition-transform duration-300"
                        />
                      ))}
                    </div>

                    <p className="text-secondary group-hover:text-foreground italic mb-8 grow leading-relaxed text-base transition-colors font-medium">
                      "{review.text}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto border-t border-border pt-6">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-full border-2 border-orange-600 shadow-lg p-0.5 object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-black text-foreground text-sm uppercase italic tracking-tight group-hover:text-orange-600 transition-colors">
                          {review.name}
                        </h4>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-0.5">
                          {review.role}
                        </p>
                      </div>
                      <span className="text-[9px] font-bold text-secondary/50 uppercase tracking-wider">
                        {review.timeAgo}
                      </span>
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

        {/* See All Reviews CTA */}
        <div className="text-center mt-12">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-card border border-border rounded-2xl font-black text-sm uppercase tracking-widest text-foreground hover:border-orange-600/30 hover:text-orange-600 transition-all shadow-sm hover:shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            See All Reviews on Google
            <HiExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
