"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiShieldCheck, HiClock, HiUserGroup, HiHome } from "react-icons/hi";

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

const stats = [
  { icon: HiHome, value: 500, suffix: "+", label: "Projects Completed", color: "text-orange-600", bg: "bg-orange-600/10" },
  { icon: HiClock, value: 60, suffix: " Min", label: "Response Time", color: "text-blue-600", bg: "bg-blue-600/10" },
  { icon: HiShieldCheck, value: 15, suffix: "+", label: "Years Experience", color: "text-green-600", bg: "bg-green-600/10" },
  { icon: HiUserGroup, value: 100, suffix: "%", label: "Satisfaction Rate", color: "text-purple-600", bg: "bg-purple-600/10" },
];

export default function StatsCounter() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 bg-card border-y border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const count = useCountUp(stat.value, 2000, inView);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center space-y-3"
              >
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto`}>
                  <stat.icon className={stat.color} size={26} />
                </div>
                <p className="text-3xl md:text-4xl font-black text-foreground tracking-tighter">
                  {count}{stat.suffix}
                </p>
                <p className="text-[10px] font-black text-secondary uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
