/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiLockClosed } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Loading state thakle wait korbe
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg--background">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Jodi user na thake ba user admin na hoy
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg--background px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center p-10 bg--accent/20 backdrop-blur-md rounded-3xl border border-red-500/20 shadow-2xl"
        >
          <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiLockClosed size={40} />
          </div>
          <h2 className="text-3xl font-black text--foreground mb-4 italic">ACCESS DENIED</h2>
          <p className="text--secondary text-sm mb-8">
            You do not have permission to view this page. This area is reserved for administrators only.
          </p>
          <div className="flex flex-col gap-4">
            <Link 
              href="/" 
              className="py-4 bg-orange-600 text-white font-black rounded-xl hover:bg-orange-700 transition-all uppercase text-xs tracking-widest"
            >
              Back to Home
            </Link>
            <Link 
              href="/auth/login" 
              className="py-4 border border--secondary/20 text--foreground font-black rounded-xl hover:bg--accent transition-all uppercase text-xs tracking-widest"
            >
              Login as Admin
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Jodi shob thik thake, tobe children (dashboard) dekhabe
  return <>{children}</>;
}