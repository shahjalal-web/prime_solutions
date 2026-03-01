import Hero from "./pages/home/page";
import Services from "./components/Services";
import AboutSection from "./components/AboutSection";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import ClientPartner from "./components/Partner";
import BlogGrid from "./components/BlogGrid";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <AboutSection />
      <Process />
      <Testimonials />
      <ClientPartner />
      <BlogGrid />
    </div>
  );
}
