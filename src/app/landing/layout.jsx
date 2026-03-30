export default function LandingLayout({ children }) {
  return (
    <>
      {/* Hide navbar, footer, and sticky button on landing pages */}
      <style>{`
        nav, footer, .sticky-call-btn { display: none !important; }
      `}</style>
      {children}
    </>
  );
}
