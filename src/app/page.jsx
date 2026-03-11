import Hero from "./pages/home/page";
import AboutSection from "./components/AboutSection";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import BlogGrid from "./components/BlogGrid";
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
    url: "https://psolutionservices.com",
    siteName: "Prime Solution Restoration",
    images: [
      {
        url: "/hero.jfif", // একটি সুন্দর থাম্বনেইল ইমেজ দিন
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function Home() {
  return (
    <div>
      <Hero />
      {/* <Services /> */}
      <ServicesPage />
      <AboutSection />
      <Process />
      <Testimonials />
      <BlogGrid />
    </div>
  );
}
