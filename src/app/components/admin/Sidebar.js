"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChartBar, HiUsers, HiLightningBolt, HiCog, HiLogout } from "react-icons/hi";

const menuItems = [
  { name: "Overview", path: "/admin", icon: HiChartBar },
  { name: "Manage Users", path: "/admin/users", icon: HiUsers },
  { name: "Services", path: "/admin/services", icon: HiLightningBolt },
  { name: "Settings", path: "/admin/settings", icon: HiCog },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-black text--foreground tracking-tighter">
          P<span className="text-orange-600">ADMIN</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                isActive 
                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" 
                : "text--secondary hover:bg-orange-600/10 hover:text-orange-600"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border--secondary/10">
        <button className="flex items-center gap-4 px-4 py-3 w-full text-red-500 font-bold text-sm hover:bg-red-500/10 rounded-xl transition-all">
          <HiLogout size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}