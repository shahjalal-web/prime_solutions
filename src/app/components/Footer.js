/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaExternalLinkAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { SiFiverr } from "react-icons/si";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// --- ক্যাটাগরি ফেচ করার ফাংশন (ISR) ---
async function getFooterCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 60 }, // ১ ঘণ্টা পর পর রিভ্যালিডেট হবে
    });
    const data = await res.json();
    return data.data?.slice(0, 5) || []; // ফুটারে আমরা ৫টি ক্যাটাগরি দেখাবো
  } catch (err) {
    console.error("Footer category fetch error:", err);
    return [];
  }
}

export default async function Footer() {
  const categories = await getFooterCategories();

  return (
    <footer className="bg-background text-foreground border-t border-border pt-16 pb-6 md:pb-6 pb-24 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Local SEO Focus */}
          <div className="space-y-6">
            <Link
              href="/"
              className="text-3xl font-black tracking-tighter uppercase italic"
            >
              P<span className="text-orange-600">S</span>R
            </Link>
            <p className="text-secondary text-sm font-medium italic leading-relaxed">
              Virginia&apos;s 24/7 Experts in <strong className="text-foreground">Water Damage Restoration</strong>, <strong className="text-foreground">Fire
              Recovery</strong>, and <strong className="text-foreground">Mold Remediation</strong>. Serving Loudoun, Fairfax,
              and the DMV area.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FaFacebookF, link: "#" },
                { Icon: FaTwitter, link: "#" },
                { Icon: FaLinkedinIn, link: "#" },
                { Icon: FaInstagram, link: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-lg"
                >
                  <social.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-black mb-8 uppercase tracking-[0.2em] text-orange-600 italic">
              Explore
            </h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
              {/* Home */}
              <li>
                <Link
                  href="/"
                  className="text-secondary hover:text-orange-600 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-0.5 bg-orange-600 transition-all" />
                  Home
                </Link>
              </li>

              {/* Services */}
              <li>
                <Link
                  href="/pages/services"
                  className="text-secondary hover:text-orange-600 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-0.5 bg-orange-600 transition-all" />
                  Services
                </Link>
              </li>

              {/* About */}
              <li>
                <Link
                  href="/pages/about"
                  className="text-secondary hover:text-orange-600 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-0.5 bg-orange-600 transition-all" />
                  About
                </Link>
              </li>

              {/* Blogs */}
              <li>
                <Link
                  href="/pages/blogs"
                  className="text-secondary hover:text-orange-600 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-0.5 bg-orange-600 transition-all" />
                  Blogs
                </Link>
              </li>

              {/* Contact */}
              <li>
                <Link
                  href="/pages/contact"
                  className="text-secondary hover:text-orange-600 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-0.5 bg-orange-600 transition-all" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Dynamic Services Keywords (Fetched) */}
          <div>
            <h4 className="text-sm font-black mb-8 uppercase tracking-[0.2em] text-orange-600 italic">
              Restoration
            </h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-secondary">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      href={`/pages/services/${cat._id}`}
                      className="hover:text-orange-600 cursor-pointer transition-colors italic flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary/30 rounded-full group-hover:bg-primary" />
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="opacity-50 italic">Loading Services...</li>
              )}
            </ul>
          </div>

          {/* Column 4: Local Contact */}
          <div>
            <h4 className="text-sm font-black mb-8 uppercase tracking-[0.2em] text-orange-600 italic">
              Headquarters
            </h4>
            <div className="space-y-5">
              <div className="flex items-center gap-4 group">
                <HiPhone className="text-orange-600 shrink-0" size={18} />
                <p className="text-sm font-black group-hover:text-orange-600 transition-colors">
                  +1 (571) 655-7207
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <HiMail className="text-orange-600 shrink-0" size={18} />
                <p className="text-sm font-black lowercase group-hover:text-orange-600 transition-colors">
                  office@psolutionservices.com
                </p>
              </div>
              <div className="flex items-start gap-4">
                <HiLocationMarker
                  className="text-orange-600 shrink-0 mt-1"
                  size={18}
                />
                <p className="text-[11px] font-bold leading-relaxed text-secondary uppercase">
                  42785 Generation Dr. <br /> Ashburn, VA 20147
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Developer Info */}
        <div className="pt-8 border-t border-border text-[10px] font-black text-secondary uppercase tracking-[0.15em]">
          <div className="flex flex-col items-center gap-3">
            <p>© 2026 Prime Solution Restoration. Licensed & Insured.</p>
            {/* <div className="flex items-center gap-4 mt-1">
              <p className="opacity-50 font-medium lowercase italic">
                Developed by
              </p>
              <div className="flex items-center gap-3 bg-accent/30 px-4 py-2 rounded-full border border-border/50 shadow-inner">
                <a
                  href="https://wa.me/+8801832822560"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-500 hover:text-emerald-400 transition-colors"
                  title="Chat on WhatsApp"
                >
                  <FaWhatsapp size={14} />
                  <span>WhatsApp</span>
                </a>
                <span className="w-1 h-1 bg-secondary/30 rounded-full" />
                <a
                  href="https://www.fiverr.com/shah_jalal_web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-green-500 hover:text-green-400 transition-colors"
                  title="Order on Fiverr"
                >
                  <SiFiverr size={28} className="translate-y-0.5" />
                  <FaExternalLinkAlt size={8} />
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
