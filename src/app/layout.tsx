import type { Metadata } from "next";
import "./globals.css";
import Navber from "./components/Navbar";
import Footer from "./components/Footer";
import {AuthProvider} from "./context/AuthContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Prime Solution Restoration | 24/7 Water, Fire & Mold Restoration in VA, DC & MD",
  description:
    "Expert property restoration in Loudoun, Fairfax & Prince William County. 24/7 Emergency response for water, fire, and mold damage. Serving VA, DC, and MD.",
  metadataBase: new URL("https://psolutionservices.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Prime Solution Restoration",
  url: "https://psolutionservices.com",
  logo: "https://psolutionservices.com/logo.png",
  description:
    "24/7 emergency property restoration services including water damage, fire damage, mold remediation, and drywall repair serving Northern Virginia, Washington DC, and Maryland.",
  telephone: "",
  email: "",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Virginia",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Loudoun County, Virginia",
    },
    {
      "@type": "AdministrativeArea",
      name: "Fairfax County, Virginia",
    },
    {
      "@type": "AdministrativeArea",
      name: "Prince William County, Virginia",
    },
    {
      "@type": "City",
      name: "Washington, DC",
    },
    {
      "@type": "State",
      name: "Maryland",
    },
  ],
  openingHours: "Mo-Su 00:00-23:59",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Restoration Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Water Damage Restoration" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fire Damage Cleanup" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mold Remediation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drywall Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Restoration" } },
    ],
  },
  sameAs: [
    "https://www.linkedin.com/company/prime-solution-restoration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <AuthProvider>
          <Navber />
          {children}
          <Toaster position="top-right" richColors />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
