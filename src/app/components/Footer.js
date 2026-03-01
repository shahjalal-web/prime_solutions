/* eslint-disable @next/next/no-img-element */
"use client";
import Link from 'next/link';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--secondary)]/10 pt-16 pb-8 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-black tracking-tighter">
              P<span className="text-orange-600">SOLUTION</span>
            </Link>
            <p className="text-[var(--secondary)] text-sm leading-relaxed">
              Leading restoration specialists in Virginia. We provide 24/7 emergency recovery for Water, Fire, and Mold damage to restore your peace of mind.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: FaFacebookF, link: "#" },
                { Icon: FaTwitter, link: "#" },
                { Icon: FaLinkedinIn, link: "#" },
                { Icon: FaInstagram, link: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-orange-600">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              {['Home', 'Services', 'About Us', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '')}`} className="text-[var(--secondary)] hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-[2px] bg-orange-600 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-orange-600">Our Services</h4>
            <ul className="space-y-4 text-sm font-medium text-[var(--secondary)]">
              <li className="hover:text-orange-600 cursor-pointer transition-colors">Water Damage Restoration</li>
              <li className="hover:text-orange-600 cursor-pointer transition-colors">Fire & Smoke Recovery</li>
              <li className="hover:text-orange-600 cursor-pointer transition-colors">Mold Remediation</li>
              <li className="hover:text-orange-600 cursor-pointer transition-colors">Storm Damage Repair</li>
              <li className="hover:text-orange-600 cursor-pointer transition-colors">Emergency Cleanup</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-orange-600">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-orange-600/10 text-orange-600">
                  <HiPhone size={20} />
                </div>
                <div>
                  <p className="text-xs text-[var(--secondary)] uppercase font-bold">Emergency 24/7</p>
                  <p className="text-lg font-black">+1 (123) 456-7890</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-orange-600/10 text-orange-600">
                  <HiMail size={20} />
                </div>
                <div>
                  <p className="text-xs text-[var(--secondary)] uppercase font-bold">Email Address</p>
                  <p className="font-bold">info@psolutions.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-orange-600/10 text-orange-600">
                  <HiLocationMarker size={20} />
                </div>
                <div>
                  <p className="text-xs text-[var(--secondary)] uppercase font-bold">Office Location</p>
                  <p className="font-bold leading-tight text-sm">123 Restoration Way, Fairfax, VA</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--secondary)]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-[var(--secondary)] uppercase tracking-widest">
          <p>© 2026 P Solution Services. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-orange-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}