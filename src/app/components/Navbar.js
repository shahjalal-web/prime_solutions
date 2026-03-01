/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiMenuAlt3, HiX, HiSun, HiMoon } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  // --- EIKHANE USE EFFECT BOSHABEN ---
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  // Scroll effect handling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme toggle handling
const toggleTheme = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    setIsDark(false);
  } else {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    setIsDark(true);
  }
};

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b border--secondary)/10 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter">
          P<span className="text--primary)">SOLUTION</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold hover:text--primary) transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-(--accent) text--foreground) hover:ring-2 ring--primary)/20 transition-all"
          >
            {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>

          {/* Emergency Call Button */}
          <a
            href="tel:+123456789"
            className="px-5 py-2.5 bg-red-600 text-white text-sm font-bold rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
          >
            Emergency 24/7
          </a>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-xl">
            {isDark ? <HiSun /> : <HiMoon />}
          </button>
          <button 
            className="text-3xl text--primary)"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border--secondary)/10 shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-6 text-center font-bold">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl hover:text--primary)"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:+123456789"
                className="py-4 bg-red-600 text-white rounded-xl shadow-lg shadow-red-600/20"
              >
                Emergency Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}