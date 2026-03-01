/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { loginWithEmail } from "../../lib/auth"; // Firebase function
import { useAuth } from "../../context/AuthContext"; // Global Context

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginGlobal } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step 1: Firebase Auth
      const firebaseUser = await loginWithEmail(
        formData.email,
        formData.password,
      );

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      // Step 2: Get User Details from MongoDB (Using UID)
      // Amader ekta API lagbe jeta UID diye user data khuje dibe
      const res = await fetch(`${API_URL}/users/${firebaseUser.uid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const dbData = await res.json();

      if (res.ok) {
        // Step 3: Set Global State & Local Storage
        loginGlobal(dbData.data);

        // Step 4: Role Based Redirection
        if (dbData.data.role === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/my-dashboard");
        }
      } else {
        throw new Error(dbData.message || "User data not found in DB");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg--background px-6 py-12 transition-colors duration-500 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg--accent/30 backdrop-blur-md p-8 md:p-10 rounded-3xl border border--secondary/10 shadow-2xl overflow-hidden"
      >
        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg--background/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-orange-600 font-bold text-xs uppercase tracking-tighter">
              Authenticating...
            </p>
          </div>
        )}

        <div className="text-center mb-10">
          <Link
            href="/"
            className="text-3xl font-black tracking-tighter text--foreground"
          >
            P<span className="text-orange-600">SOLUTION</span>
          </Link>
          <h2 className="text-2xl font-bold mt-6 text--foreground">
            Welcome Back
          </h2>
          <p className="text--secondary text-sm mt-2">
            Login to manage your restoration projects
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-orange-600 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <HiMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text--secondary group-focus-within:text-orange-600 transition-colors"
                size={20}
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full bg--background border border--secondary/20 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 transition-all text--foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Password
              </label>
              <Link
                href="#"
                className="text-[10px] font-bold text--secondary hover:text-orange-600 transition-colors uppercase"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <HiLockClosed
                className="absolute left-4 top-1/2 -translate-y-1/2 text--secondary group-focus-within:text-orange-600 transition-colors"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg--background border border--secondary/20 rounded-xl py-4 pl-12 pr-12 outline-none focus:border-orange-500 transition-all text--foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text--secondary hover:text-orange-600 transition-colors"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all mt-4 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "VERIFYING..." : "SIGN IN"}
          </motion.button>
        </form>

        <p className="text-center mt-8 text-sm text--secondary font-medium">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-orange-600 font-bold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
