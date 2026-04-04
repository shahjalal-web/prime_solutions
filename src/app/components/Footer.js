import Link from "next/link";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// --- ক্যাটাগরি ফেচ করার ফাংশন (ISR) ---
async function getFooterCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 60 }, // ১ ঘণ্টা পর পর রিভ্যালিডেট হবে
    });
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("Footer category fetch error:", err);
    return [];
  }
}

export default async function Footer() {
  const categories = await getFooterCategories();

  return (
    <footer className="bg-background text-foreground border-t border-border pt-16 pb-6 md:pb-6 transition-colors duration-500">
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
                { Icon: FaFacebookF, link: "https://www.facebook.com/primesolutionrestoration", label: "Facebook" },
                { Icon: FaTwitter, link: "https://twitter.com/primesolutionva", label: "Twitter" },
                { Icon: FaLinkedinIn, link: "https://www.linkedin.com/company/prime-solution-restoration", label: "LinkedIn" },
                { Icon: FaInstagram, link: "https://www.instagram.com/primesolutionrestoration", label: "Instagram" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
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
                      prefetch={false}
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

        {/* Trust Badges: BBB & Thumbtack */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
          {/* BBB Badge */}
          <a
            href="https://www.bbb.org/us/va/ashburn/profile/fire-and-water-damage-restoration/prime-solution-llc-0241-236101964/#sealclick"
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="Prime Solution LLC BBB Business Review"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://seal-dc-easternpa.bbb.org/seals/blue-seal-293-61-bbb-236101964.png"
              alt="Prime Solution LLC BBB Business Review"
              width={293}
              height={61}
              style={{ border: 0 }}
            />
          </a>

          {/* Thumbtack Widget */}
          <a
            href="https://www.thumbtack.com/va/ashburn/handyman/prime-solution/service/524368280691703812"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 hover:shadow-lg transition-all"
            aria-label="Prime Solution on Thumbtack - 5 stars, 24 reviews"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.thumbtackstatic.com/fe-assets-web/media/logos/thumbtack/wordmark.svg"
              alt="Thumbtack"
              width={100}
              height={20}
            />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
              <span className="text-sm font-bold text-secondary ml-1">24 reviews</span>
            </div>
          </a>
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
