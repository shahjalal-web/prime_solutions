"use client";
import { motion } from "framer-motion";

const badges = [
  {
    id: 1,
    label: "Top Pro",
    visual: (
      <div className="flex flex-col items-center justify-center w-24 h-24 bg-[#1a6faf] clip-hexagon relative">
        {/* Hexagon shape */}
        <svg viewBox="0 0 100 115" className="w-24 h-28" fill="none">
          <polygon
            points="50,5 95,27.5 95,87.5 50,110 5,87.5 5,27.5"
            fill="#1a6faf"
          />
          <polygon
            points="50,10 90,30 90,85 50,105 10,85 10,30"
            fill="#1d7ec4"
          />
          {/* Star */}
          <text x="50" y="52" textAnchor="middle" fontSize="22" fill="#f5c518">
            ★
          </text>
          <text
            x="50"
            y="70"
            textAnchor="middle"
            fontSize="11"
            fill="white"
            fontWeight="bold"
            letterSpacing="1"
          >
            TOP
          </text>
          <text
            x="50"
            y="83"
            textAnchor="middle"
            fontSize="11"
            fill="white"
            fontWeight="bold"
            letterSpacing="1"
          >
            PRO
          </text>
        </svg>
      </div>
    ),
    name: "Top Pro",
    platform: "Thumbtack",
    href: "https://www.thumbtack.com/va/manassas/water-damage-restoration/prime-solution-restoration/service/524telerium",
  },
  {
    id: 2,
    label: "Bark.com",
    visual: (
      <div className="w-24 h-24 rounded-full bg-[#3a3a3a] flex items-center justify-center shadow-lg">
        <span
          className="text-white font-bold text-3xl"
          style={{ fontFamily: "Georgia, serif", letterSpacing: "-1px" }}
        >
          Bb
        </span>
      </div>
    ),
    name: "Bark.com",
    platform: "Bark",
    href: "https://www.bark.com/en/us/company/prime-solution-restoration/gw9Ke/",
  },
  {
    id: 3,
    label: "Hotfrog",
    visual: (
      <div className="flex items-center gap-2">
        {/* Hotfrog paw/frog icon approximation */}
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
          <circle cx="12" cy="8" r="5" fill="#ea580c" />
          <circle cx="28" cy="8" r="5" fill="#ea580c" />
          <circle cx="6" cy="20" r="5" fill="#ea580c" />
          <circle cx="34" cy="20" r="5" fill="#ea580c" />
          <ellipse cx="20" cy="28" rx="13" ry="10" fill="#ea580c" />
        </svg>
        <span className="text-[#ea580c] text-3xl font-black tracking-tight">
          Hot<span className="text-foreground">frog</span>
        </span>
      </div>
    ),
    name: "Hotfrog",
    platform: "Hotfrog",
    href: "https://www.hotfrog.com/company/va/manassas/prime-solution-restoration",
  },
  {
    id: 4,
    label: "BBB Accredited",
    visual: (
      <div className="flex items-center border-2 border-[#003f87] rounded-sm overflow-hidden shadow-md">
        {/* Blue left bar */}
        <div className="bg-[#003f87] text-white px-3 py-4 flex items-center justify-center">
          <span
            className="text-2xl font-black text-white"
            style={{ letterSpacing: "-1px" }}
          >
            BBB
          </span>
        </div>
        {/* Right text */}
        <div className="bg-white px-3 py-2 flex flex-col items-center justify-center">
          <span className="text-[#003f87] text-[10px] font-black uppercase tracking-wider leading-tight">
            ACCREDITED
          </span>
          <span className="text-[#003f87] text-[10px] font-black uppercase tracking-wider leading-tight">
            BUSINESS
          </span>
        </div>
      </div>
    ),
    name: "BBB Accredited Business",
    platform: "Better Business Bureau",
    href: "https://www.bbb.org/us/va/manassas/profile/restoration/prime-solution-restoration",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-accent/40 dark:bg-accent/10 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-orange-600 font-bold text-xs uppercase tracking-[0.2em] mb-3 block italic">
            Verified & Trusted
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase italic tracking-tighter mb-4">
            Prime Solution on{" "}
            <span className="text-orange-600">Trusted Platforms</span>
          </h2>
          <p className="text-sm text-secondary max-w-xl mx-auto leading-relaxed italic font-medium">
            You can also request information or view our business profile on
            trusted third-party platforms.
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {badges.map((badge, index) => (
            <motion.a
              key={badge.id}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              {/* Badge Visual */}
              <div className="transition-transform duration-300 group-hover:scale-105">
                {badge.visual}
              </div>

              {/* Badge Name */}
              <div className="text-center">
                <p className="text-xs font-black text-foreground uppercase tracking-wider">
                  {badge.name}
                </p>
                <p className="text-[10px] text-secondary italic">
                  {badge.platform}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
