"use client";
import { HiBell, HiSearch, HiUserCircle } from "react-icons/hi";
import {useAuth} from "../../context/AuthContext"


export default function AdminNav() {
  const { user } = useAuth();

  return (
    <div className="w-full flex items-center justify-between">
      {/* Search Bar - Optional */}
      <div className="relative hidden md:block">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text--secondary" size={18} />
        <input 
          type="text" 
          placeholder="Search for users, tasks..."
          className="bg--accent/20 border border--secondary/10 rounded-xl py-2 pl-12 pr-4 text-sm outline-none focus:border-orange-500 transition-all w-64 text--foreground"
        />
      </div>

      {/* Right Side Icons & Profile */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-orange-600/10 text--secondary hover:text-orange-600 transition-all">
          <HiBell size={24} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-600 rounded-full border-2 border--background"></span>
        </button>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 pl-6 border-l border--secondary/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text--foreground uppercase tracking-wider">
              {user?.name || "Admin User"}
            </p>
            <p className="text-[10px] font-bold text-orange-600 uppercase">
              {user?.role || "Administrator"}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-600 border border-orange-600/20">
            <HiUserCircle size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}