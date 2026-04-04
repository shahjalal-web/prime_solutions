"use client";
import { useState, useEffect } from "react";
import { HiPhone } from "react-icons/hi";
import { usePathname } from "next/navigation";

export default function StickyCallButton() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // Hide on admin/dashboard pages
  const isAdmin = pathname?.startsWith("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) return null;

  return (
    <>
      {/* Mobile sticky bottom bar */}
      <div className="sticky-call-btn fixed bottom-0 left-0 right-0 z-40 md:hidden bg-foreground/95 backdrop-blur-md border-t border-border/20 px-3 py-2.5 flex items-center gap-2">
        <a
          href="tel:+15716557207"
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wide shadow-lg shadow-red-600/30 active:scale-95 transition-transform whitespace-nowrap"
        >
          <HiPhone size={16} className="animate-pulse shrink-0" />
          Call 24/7
        </a>
        <a
          href="tel:+15716557207"
          className="flex-1 flex items-center justify-center gap-2 bg-orange-600 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wide shadow-lg shadow-orange-600/30 active:scale-95 transition-transform whitespace-nowrap"
        >
          Free Inspection
        </a>
      </div>

      {/* Desktop floating call button (appears on scroll) */}
      {visible && (
        <a
          href="tel:+15716557207"
          className="sticky-call-btn hidden md:flex fixed bottom-8 right-8 z-40 items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-2xl shadow-red-600/30 hover:bg-red-700 hover:scale-105 transition-all animate-bounce-slow"
        >
          <HiPhone size={20} className="animate-pulse" />
          Emergency? Call Now
        </a>
      )}
    </>
  );
}
