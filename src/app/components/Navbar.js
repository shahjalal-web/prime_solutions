/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiMenuAlt3, HiX, HiSun, HiMoon, HiLogout } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../lib/auth"; // Firebase logout helper
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logoutGlobal } = useAuth(); // Context theke function nilam
  const router = useRouter();

  // Theme Initialization
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sign Out Handler
  const handleSignOut = async () => {
    try {
      await logoutUser(); // Step 1: Firebase Signout
      logoutGlobal(); // Step 2: Global State & Storage Clear
      router.push("/"); // Step 3: Redirect to home
      setIsOpen(false);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

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
    { name: "Services", href: "/pages/services" },
    { name: "About", href: "/pages/about" },
    { name: "Portfolio", href: "/pages/portfolio" },
    { name: "Contact", href: "/pages/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg--background/80 backdrop-blur-md border-b border--secondary/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text--foreground"
        >
          P<span className="text-orange-600">SOLUTION</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text--foreground hover:text-orange-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* Conditional Dashboard/Login/Logout Links */}
          {user ? (
            <>
              <Link
                href={user.role === "admin" ? "/dashboard/admin" : "/dashboard"}
                className="text-orange-600 font-bold uppercase text-xs"
              >
                {user.role === "admin" ? "Admin Panel" : "Dashboard"}
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 text-red-500 font-bold uppercase text-xs hover:text-red-600 transition-colors"
              >
                <HiLogout size={16} /> Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="text-orange-600 font-bold uppercase text-xs"
            >
              Login
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg--accent text--foreground hover:ring-2 ring-orange-600/20 transition-all"
          >
            {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>

          {/* Emergency Call */}
          <a
            href="tel:+157165572079"
            className="px-5 py-2.5 bg-red-600 text-white text-sm font-bold rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
          >
            Emergency 24/7
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-xl text--foreground"
          >
            {isDark ? <HiSun /> : <HiMoon />}
          </button>
          <button
            className="text-3xl text-orange-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg--background border-b border--secondary/10 shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-6 text-center font-bold">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl text--foreground hover:text-orange-600"
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <button
                  onClick={handleSignOut}
                  className="text-xl text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              )}

              {!user && (
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-orange-600"
                >
                  Login
                </Link>
              )}

              <a
                href="tel:+157165572079"
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
