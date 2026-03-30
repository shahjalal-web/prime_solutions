import LandingPageTemplate from "../LandingPageTemplate";

export const metadata = {
  title: "Professional Mold Remediation | Certified Removal | PSR",
  description: "Certified mold remediation in Virginia, DC & Maryland. Professional inspection, testing & removal. Prevent health risks. Call (571) 655-7207.",
};

export default function MoldRemediationLanding() {
  return (
    <LandingPageTemplate
      headline="Mold in Your Property?"
      subHeadline="We Remove It. Permanently."
      heroDescription="Mold isn't just ugly — it's a health hazard. Our IICRC-certified mold remediation team identifies the source, contains the spread, removes all mold, and treats your property to prevent it from coming back."
      urgencyText="Mold spreads fast and causes health issues — Call Now: (571) 655-7207"
      servicePoints={[
        "Professional mold inspection and air quality testing",
        "Full containment to prevent cross-contamination",
        "HEPA filtration and negative air pressure during removal",
        "Complete mold removal from all affected surfaces",
        "Source identification and moisture problem resolution",
        "Antimicrobial treatment to prevent future growth",
        "Post-remediation testing to verify safe air quality",
      ]}
      processSteps={[
        { title: "Inspect & Test", desc: "Thorough inspection with professional air quality testing. We identify all mold and the moisture source causing it." },
        { title: "Contain & Remove", desc: "Full containment of affected areas. HEPA-filtered removal of all mold with antimicrobial treatment." },
        { title: "Verify & Prevent", desc: "Post-remediation testing confirms clean air. We fix the moisture source so mold doesn't return." },
      ]}
      faqs={[
        { q: "How do I know if I have mold?", a: "Signs include musty odors, visible discoloration on walls or ceilings, unexplained allergic symptoms, and recent water damage. We provide professional inspection and air quality testing to confirm." },
        { q: "Is mold dangerous?", a: "Yes. Mold can cause respiratory problems, allergic reactions, headaches, and other health issues — especially for children, elderly, and those with immune conditions. Professional removal is important." },
        { q: "How long does mold remediation take?", a: "Most residential mold jobs take 1-5 days depending on the extent. We provide a detailed timeline during the initial assessment. Post-testing adds 1-2 days." },
        { q: "Will mold come back after remediation?", a: "Not if the moisture source is fixed. We identify and address the root cause (leak, humidity, drainage) in addition to removing the mold, so it doesn't return." },
        { q: "Does insurance cover mold remediation?", a: "Many policies cover mold if it resulted from a covered event (like a burst pipe). We help you navigate your insurance claim and provide all required documentation." },
      ]}
    />
  );
}
