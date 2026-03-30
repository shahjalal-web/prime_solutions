import LandingPageTemplate from "../LandingPageTemplate";

export const metadata = {
  title: "Fire & Smoke Damage Restoration | 24/7 Emergency | PSR",
  description: "Professional fire damage restoration in Virginia, DC & Maryland. Smoke cleanup, odor removal, full reconstruction. Call (571) 655-7207.",
};

export default function FireDamageLanding() {
  return (
    <LandingPageTemplate
      headline="Fire & Smoke Damage?"
      subHeadline="We Restore What Fire Takes."
      heroDescription="Fire damage is devastating — but it doesn't have to be permanent. Our certified fire restoration team handles everything from emergency board-up to complete reconstruction, so you can focus on your family."
      urgencyText="Smoke and soot cause permanent damage if not treated quickly — Call Now: (571) 655-7207"
      servicePoints={[
        "Emergency board-up and property securing",
        "Complete smoke and soot cleanup from all surfaces",
        "Professional odor elimination (not masking — removal)",
        "Water damage from firefighting efforts treated simultaneously",
        "Content cleaning and restoration of personal belongings",
        "Full structural reconstruction — framing to final paint",
        "Direct insurance claim management — we handle everything",
      ]}
      processSteps={[
        { title: "Emergency Response", desc: "We secure your property with board-up services and begin damage assessment within 60 minutes of your call." },
        { title: "Cleanup & Treatment", desc: "Soot removal, smoke damage cleanup, odor elimination, and water extraction from firefighting runoff." },
        { title: "Full Reconstruction", desc: "From structural repairs to cosmetic finishes, we rebuild your property to its pre-fire condition." },
      ]}
      faqs={[
        { q: "What should I do immediately after a fire?", a: "Ensure everyone is safe, call the fire department, then call us at (571) 655-7207. Don't enter the property until it's been cleared. We'll handle everything from there." },
        { q: "How long does fire damage restoration take?", a: "Timeline depends on the extent of damage. Minor smoke damage may take days, while full structural restoration can take weeks. We provide a detailed timeline during our free assessment." },
        { q: "Will my insurance cover fire damage restoration?", a: "Most homeowner policies cover fire damage. We work directly with your insurance company, handle all documentation, and fight for maximum coverage on your behalf." },
        { q: "Can you remove smoke odor completely?", a: "Yes. We use professional-grade thermal fogging, ozone treatment, and hydroxyl generators to completely eliminate smoke odor — not just mask it." },
        { q: "Do you handle the water damage from firefighting too?", a: "Absolutely. Fire damage often comes with significant water damage from firefighting efforts. We address both simultaneously to prevent mold and further structural damage." },
      ]}
    />
  );
}
