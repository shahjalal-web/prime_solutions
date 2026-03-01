/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Users", value: "1,240", change: "+12%" },
  { label: "New Leads", value: "45", change: "+5%" },
  { label: "Revenue", value: "$12,450", change: "+18%" },
  { label: "Tasks Done", value: "89%", change: "+2%" },
];

export default function AdminOverview() {
  return (
    <div className="space-y-8 mt-10">
      <div>
        <h2 className="text-3xl font-black text--foreground">Admin Overview</h2>
        <p className="text--secondary text-sm">Welcome back! Here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg--accent/30 border border--secondary/10 shadow-sm"
          >
            <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-black text--foreground">{stat.value}</h3>
              <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Table Place-holder */}
      <div className="bg--accent/30 rounded-3xl border border--secondary/10 p-8 h-96 flex items-center justify-center">
        <p className="text--secondary italic">Chart or Table will be here...</p>
      </div>
    </div>
  );
}