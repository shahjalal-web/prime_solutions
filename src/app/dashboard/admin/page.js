/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlinePhoneOutgoing,
  HiOutlineNewspaper,
  HiOutlineLocationMarker,
  HiOutlineCollection,
  HiOutlineTag,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineArrowRight,
} from "react-icons/hi";
import Link from "next/link";

export default function AdminOverview() {
  const { user } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [inspections, setInspections] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const headers = user?.firebaseUid ? { "x-user-uid": user.firebaseUid } : {};
        const [insRes, blogRes, cityRes, catRes, subRes] = await Promise.all([
          fetch(`${API_URL}/inspections`, { headers }),
          fetch(`${API_URL}/blogs`),
          fetch(`${API_URL}/cities`),
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/sub-categories`),
        ]);

        const [insData, blogData, cityData, catData, subData] = await Promise.all([
          insRes.json(),
          blogRes.json(),
          cityRes.json(),
          catRes.json(),
          subRes.json(),
        ]);

        setInspections(insData.data || []);
        setBlogs(blogData.data || []);
        setCities(cityData.data || []);
        setCategories(catData.data || []);
        setSubCategories(subData.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (API_URL) fetchAll();
  }, [API_URL, user]);

  // Inspection stats
  const pendingCount = inspections.filter((i) => i.status === "Pending").length;
  const contactedCount = inspections.filter((i) => i.status === "Contacted").length;
  const completedCount = inspections.filter((i) => i.status === "Completed").length;

  // Recent inspections (last 5)
  const recentInspections = inspections.slice(0, 5);

  // Cities with unique content
  const citiesWithContent = cities.filter((c) => c.description && c.description.trim() && c.description !== "<p><br></p>").length;

  // Stats cards data
  const stats = [
    {
      label: "Total Inspections",
      value: inspections.length,
      icon: HiOutlineClipboardList,
      color: "text-blue-600",
      bg: "bg-blue-600/10",
      link: "/dashboard/admin/all-inspection",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: HiOutlineClock,
      color: "text-yellow-600",
      bg: "bg-yellow-600/10",
      link: "/dashboard/admin/all-inspection",
    },
    {
      label: "Contacted",
      value: contactedCount,
      icon: HiOutlinePhoneOutgoing,
      color: "text-orange-600",
      bg: "bg-orange-600/10",
      link: "/dashboard/admin/all-inspection",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: HiOutlineCheckCircle,
      color: "text-green-600",
      bg: "bg-green-600/10",
      link: "/dashboard/admin/all-inspection",
    },
  ];

  const contentStats = [
    {
      label: "Blog Posts",
      value: blogs.length,
      icon: HiOutlineNewspaper,
      color: "text-purple-600",
      bg: "bg-purple-600/10",
      link: "/dashboard/admin/add-blogs",
    },
    {
      label: "Service Areas",
      value: cities.length,
      icon: HiOutlineLocationMarker,
      color: "text-teal-600",
      bg: "bg-teal-600/10",
      link: "/dashboard/admin/add-city",
      sub: `${citiesWithContent} with unique content`,
    },
    {
      label: "Categories",
      value: categories.length,
      icon: HiOutlineCollection,
      color: "text-indigo-600",
      bg: "bg-indigo-600/10",
      link: "/dashboard/admin/add-category",
    },
    {
      label: "Services",
      value: subCategories.length,
      icon: HiOutlineTag,
      color: "text-rose-600",
      bg: "bg-rose-600/10",
      link: "/dashboard/admin/add-sub-category",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8 mt-10">
        <div className="h-8 w-64 bg--accent/30 animate-pulse rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg--accent/30 animate-pulse rounded-3xl" />
          ))}
        </div>
        <div className="h-96 bg--accent/30 animate-pulse rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-10 mt-6">

      {/* --- Header --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-1">Dashboard</p>
        <h2 className="text-3xl font-black text--foreground uppercase italic tracking-tight">
          Welcome back, <span className="text-orange-600">{user?.name || "Admin"}</span>
        </h2>
        <p className="text--secondary text-sm mt-1">Here's what's happening with your business today.</p>
      </motion.div>

      {/* --- Inspection Stats --- */}
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text--secondary mb-4 ml-1">Inspection Requests</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                href={stat.link}
                className="group block p-6 rounded-[28px] bg--accent/20 border border--secondary/10 hover:border-orange-600/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                    <stat.icon className={stat.color} size={22} />
                  </div>
                  <HiOutlineArrowRight className="text--secondary/30 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" size={16} />
                </div>
                <p className="text-3xl font-black text--foreground tracking-tight">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text--secondary mt-1">{stat.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Content Stats --- */}
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text--secondary mb-4 ml-1">Content & Coverage</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
            >
              <Link
                href={stat.link}
                className="group block p-6 rounded-[28px] bg--accent/20 border border--secondary/10 hover:border-orange-600/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                    <stat.icon className={stat.color} size={22} />
                  </div>
                  <HiOutlineArrowRight className="text--secondary/30 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" size={16} />
                </div>
                <p className="text-3xl font-black text--foreground tracking-tight">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text--secondary mt-1">{stat.label}</p>
                {stat.sub && (
                  <p className="text-[10px] font-bold text-orange-600 mt-1">{stat.sub}</p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Recent Inspections Table --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text--secondary ml-1">Recent Inspection Requests</p>
          <Link
            href="/dashboard/admin/all-inspection"
            className="text-[10px] font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
          >
            View All <HiOutlineArrowRight size={12} />
          </Link>
        </div>

        <div className="bg--accent/20 rounded-[30px] border border--secondary/10 overflow-hidden">
          {recentInspections.length === 0 ? (
            <div className="p-16 text-center">
              <HiOutlineClipboardList className="mx-auto text--secondary/30 mb-3" size={40} />
              <p className="text--secondary italic font-medium">No inspection requests yet.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg--secondary/5 text--secondary text-[9px] uppercase tracking-[0.2em]">
                  <th className="p-5 font-black">Client</th>
                  <th className="p-5 font-black">Service</th>
                  <th className="p-5 font-black text-center">Status</th>
                  <th className="p-5 font-black text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide--secondary/10">
                {recentInspections.map((ins) => (
                  <tr key={ins._id} className="hover:bg-orange-600/5 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-orange-600/10 rounded-xl flex items-center justify-center">
                          <HiOutlineUser className="text-orange-600" size={16} />
                        </div>
                        <div>
                          <p className="font-bold text--foreground text-sm">{ins.name}</p>
                          <p className="text-[10px] text--secondary flex items-center gap-1">
                            <HiOutlinePhone size={10} /> {ins.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <p className="text-xs font-bold text--foreground">{ins.category?.name || "N/A"}</p>
                      <p className="text-[10px] text--secondary">{ins.subCategory?.name || ""}</p>
                    </td>
                    <td className="p-5 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          ins.status === "Pending"
                            ? "bg-yellow-500/10 text-yellow-600"
                            : ins.status === "Contacted"
                            ? "bg-orange-500/10 text-orange-600"
                            : "bg-green-500/10 text-green-600"
                        }`}
                      >
                        {ins.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <p className="text-[10px] font-bold text--secondary flex items-center justify-end gap-1">
                        <HiOutlineCalendar size={12} />
                        {new Date(ins.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* --- Quick Links --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <p className="text-xs font-black uppercase tracking-[0.2em] text--secondary mb-4 ml-1">Quick Actions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Add Blog Post", href: "/dashboard/admin/add-blogs", icon: HiOutlineNewspaper },
            { label: "Add City", href: "/dashboard/admin/add-city", icon: HiOutlineLocationMarker },
            { label: "Add Category", href: "/dashboard/admin/add-category", icon: HiOutlineCollection },
            { label: "Add Service", href: "/dashboard/admin/add-sub-category", icon: HiOutlineTag },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="group flex items-center gap-4 p-5 rounded-2xl border border--secondary/10 bg--accent/10 hover:border-orange-600/30 hover:bg-orange-600/5 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-orange-600/10 rounded-xl flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <action.icon className="text-orange-600 group-hover:text-white transition-colors" size={20} />
              </div>
              <span className="text-sm font-black text--foreground uppercase tracking-tight">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
