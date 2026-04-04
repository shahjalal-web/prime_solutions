import Hero from "./pages/home/page";
import HomepageLeadForm from "./components/HomepageLeadForm";
import StatsCounter from "./components/StatsCounter";
import AboutSection from "./components/AboutSection";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import BlogGrid from "./components/BlogGrid";
import Faq from "./components/Faq";
import TrustBadges from "./components/TrustBadges";
import FinalCTA from "./components/FinalCTA";
// import Services from "./components/service"
import ServicesPage from "./pages/services/page"

export const metadata = {
  title:
    "Prime Solution Restoration | 24/7 Water, Fire & Mold Restoration in VA, DC & MD",
  description:
    "Expert property restoration in Loudoun, Fairfax & Prince William County. 24/7 Emergency response for water, fire, and mold damage. Serving VA, DC, and MD.",
  keywords: [
    "Water Damage Restoration Fairfax",
    "Fire Damage Cleanup Virginia",
    "Mold Remediation Loudoun County",
    "Drywall Repair MD",
    "Emergency Restoration DC",
  ],
  openGraph: {
    title: "Prime Solution Restoration",
    description: "24/7 Emergency Property Restoration Services",
    url: "https://psolutionservices.vercel.app",
    siteName: "Prime Solution Restoration",
    images: [
      {
        url: "/Trauma & Biohazard Cleanup.jpg",
        width: 1200,
        height: 630,
        alt: "Prime Solution Restoration - Professional Property Restoration Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function Home() {
  return (
    <div>
      {/* 1. Hero + CTA badges */}
      <Hero />
      {/* 2. Urgency + Lead Form */}
      <HomepageLeadForm />
      {/* 3. Services */}
      <ServicesPage />
      {/* 4. Stats / Trust counters */}
      <StatsCounter />
      {/* 5. How We Work (Process) */}
      <Process />
      {/* 6. About */}
      <AboutSection />
      {/* 7. Google Reviews / Testimonials */}
      <Testimonials />
      {/* 8. Trust Badges (Thumbtack, BBB, etc) */}
      <TrustBadges />
      {/* 9. FAQ */}
      <Faq />
      {/* 10. Blog */}
      <BlogGrid />
      {/* 11. Final CTA */}
      <FinalCTA />
    </div>
  );
}
