import LandingPageTemplate from "../LandingPageTemplate";

export const metadata = {
  title: "Emergency Water Damage Restoration | 60 Min Response | PSR",
  description: "24/7 emergency water damage restoration in Virginia, DC & Maryland. 60-minute response guarantee. Free inspection. Call (571) 655-7207 now.",
};

export default function WaterDamageLanding() {
  return (
    <LandingPageTemplate
      headline="Emergency Water Damage?"
      subHeadline="We're There in 60 Minutes."
      heroDescription="Burst pipes, flooding, sewage backup — every minute of standing water causes more damage. Our certified water damage restoration team extracts water, dries your property, and prevents mold — fast."
      urgencyText="Water damage gets worse every hour — Call Now: (571) 655-7207"
      servicePoints={[
        "Emergency water extraction with commercial-grade equipment",
        "Complete structural drying and dehumidification",
        "Mold prevention treatment included with every job",
        "Sewage and contaminated water cleanup (Category 2 & 3)",
        "Direct insurance billing — we handle your claim",
        "Furniture and content restoration services",
        "Full reconstruction if needed — drywall, flooring, paint",
      ]}
      processSteps={[
        { title: "Call Us", desc: "Call (571) 655-7207 anytime. We dispatch a certified team to your property within 60 minutes." },
        { title: "We Extract & Dry", desc: "Commercial pumps remove standing water. Industrial dehumidifiers and air movers dry your structure completely." },
        { title: "Fully Restored", desc: "From drywall to flooring — we restore your property to pre-loss condition. Insurance handled." },
      ]}
      faqs={[
        { q: "How fast can you respond to water damage?", a: "We guarantee arrival within 60 minutes of your call, 24 hours a day, 7 days a week, including holidays." },
        { q: "How much does water damage restoration cost?", a: "Cost depends on the extent of damage. We provide a free on-site assessment and work directly with your insurance company to minimize your out-of-pocket costs." },
        { q: "Do I need to file an insurance claim?", a: "We handle the entire insurance process for you — documentation, photos, moisture readings, and direct communication with your adjuster." },
        { q: "Can water damage cause mold?", a: "Yes, mold can begin growing within 24-48 hours of water damage. That's why our water damage restoration always includes antimicrobial treatment to prevent mold growth." },
        { q: "What areas do you serve?", a: "We serve all of Northern Virginia (Loudoun, Fairfax, Prince William, Arlington, Alexandria), Washington DC, and Maryland." },
      ]}
    />
  );
}
