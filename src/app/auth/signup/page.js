"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Redirect korar jonno
import {
  HiUser,
  HiMail,
  HiLockClosed,
  HiPhone,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";
import { signUpWithEmail } from "../../lib/auth";
import { useAuth } from "../../context/AuthContext"; // Global Context

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginGlobal } = useAuth(); // Context function
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true); // Loading Start

    const { email, password, name, phone } = formData;

    try {
      // Step 1: Firebase Sign Up
      const userCredential = await signUpWithEmail(email, password);
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      // Step 2: MongoDB Data Store request
      const res = await fetch(`${API_URL}/users/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          phone,
          firebaseUid: userCredential?.uid,
        }),
      });

      const dbData = await res.json();

      if (res.ok) {
        // Step 3: Global State Set (Data from MongoDB result)
        // dbData.data e jodi role: 'admin' thake, Navbar e auto change hobe
        loginGlobal(dbData.data);

        alert("Account Created Successfully!");

        // Step 4: Role onujayi redirect
        if (dbData.data.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        throw new Error(dbData.message || "Database storage failed");
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
      alert(error.message);
    } finally {
      setIsSubmitting(false); // Loading Stop
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg--background px-6 py-12 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg--accent/30 backdrop-blur-md p-8 md:p-12 rounded-3xl border border--secondary/10 shadow-2xl relative overflow-hidden"
      >
        {/* Simple Loading Overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg--background/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-4 shadow-lg"></div>
            <p className="text-orange-600 font-black text-xs uppercase tracking-widest animate-pulse">
              Creating Account...
            </p>
          </div>
        )}

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text--foreground">
            Create Account
          </h2>
          <p className="text--secondary text-sm mt-2 font-medium">
            Join our restoration network today
          </p>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSignUp}
        >
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-widest text-orange-600 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <HiUser
                className="absolute left-4 top-1/2 -translate-y-1/2 text--secondary group-focus-within:text-orange-600 transition-colors"
                size={20}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full bg--background border border--secondary/20 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 transition-all text--foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-orange-600 ml-1">
              Email
            </label>
            <div className="relative group">
              <HiMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text--secondary group-focus-within:text-orange-600 transition-colors"
                size={20}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
                className="w-full bg--background border border--secondary/20 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 transition-all text--foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-orange-600 ml-1">
              Phone
            </label>
            <div className="relative group">
              <HiPhone
                className="absolute left-4 top-1/2 -translate-y-1/2 text--secondary group-focus-within:text-orange-600 transition-colors"
                size={20}
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234..."
                required
                className="w-full bg--background border border--secondary/20 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 transition-all text--foreground"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-widest text-orange-600 ml-1">
              Password
            </label>
            <div className="relative group">
              <HiLockClosed
                className="absolute left-4 top-1/2 -translate-y-1/2 text--secondary group-focus-within:text-orange-600 transition-colors"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
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

          <div className="md:col-span-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all mt-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "PROCESSING..." : "CREATE ACCOUNT"}
            </motion.button>
          </div>
        </form>

        <p className="text-center mt-8 text-sm text--secondary font-medium">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-orange-600 font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
