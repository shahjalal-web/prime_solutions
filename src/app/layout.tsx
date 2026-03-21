import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navber from "./components/Navbar";
import Footer from "./components/Footer";
import {AuthProvider} from "./context/AuthContext";
import { Toaster } from "sonner";

const GTM_ID = "GTM-N8RW4PG5";

export const metadata: Metadata = {
    title: "Prime Solution Restoration | 24/7 Water, Fire & Mold Restoration in VA, DC & MD",
    description:
          "Expert property restoration in Loudoun, Fairfax & Prince William County. 24/7 Emergency response for water, fire, and mold damage. Serving VA, DC, and MD.",
    metadataBase: new URL("https://www.psolutionservices.com"),
    alternates: {
          canonical: "/",
    },
    icons: {
          icon: "/logo.png",
          shortcut: "/logo.png",
          apple: "/logo.png",
    },
    openGraph: {
          title: "Prime Solution Restoration | 24/7 Water, Fire & Mold Restoration",
          description:
                  "Expert property restoration in Loudoun, Fairfax & Prince William County. 24/7 Emergency response for water, fire, and mold damage.",
          url: "https://www.psolutionservices.com",
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
    twitter: {
          card: "summary_large_image",
          title: "Prime Solution Restoration | 24/7 Restoration Services",
          description: "24/7 Emergency Property Restoration in VA, DC & MD.",
          images: ["/Trauma & Biohazard Cleanup.jpg"],
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
    alternateName: "PSR",
    url: "https://www.psolutionservices.com",
    logo: "https://www.psolutionservices.com/logo.png",
    description:
          "24/7 emergency property restoration services including water damage, fire damage, mold remediation, and drywall repair serving Northern Virginia, Washington DC, and Maryland.",
    telephone: "+1-571-655-7207",
    email: "office@psolutionservices.com",
    address: {
          "@type": "PostalAddress",
          streetAddress: "42785 Generation Dr.",
          addressLocality: "Ashburn",
          addressRegion: "VA",
          postalCode: "20147",
          addressCountry: "US",
    },
    location: [
      {
              "@type": "Place",
              name: "Prime Solution Restoration – Ashburn",
              address: {
                        "@type": "PostalAddress",
                        streetAddress: "42785 Generation Dr.",
                        addressLocality: "Ashburn",
                        addressRegion: "VA",
                        postalCode: "20147",
                        addressCountry: "US",
              },
              hasMap: "https://maps.google.com/?q=42785+Generation+Dr,+Ashburn,+VA+20147",
      },
      {
              "@type": "Place",
              name: "Prime Solution Restoration – Manassas",
              address: {
                        "@type": "PostalAddress",
                        streetAddress: "8735 Quarry Rd Unit 102",
                        addressLocality: "Manassas",
                        addressRegion: "VA",
                        postalCode: "20110",
                        addressCountry: "US",
              },
              hasMap: "https://maps.google.com/?q=8735+Quarry+Rd+Unit+102,+Manassas,+VA+20110",
      },
        ],
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
                </head>head>
                <Script
                          id="gtm-script"
                          strategy="afterInteractive"
                          dangerouslySetInnerHTML={{
                                      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                      })(window,document,'script','dataLayer','${GTM_ID}');`,
                          }}
                        />
                <body>
                        <noscript>
                                  <iframe
                                                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                                                height="0"
                                                width="0"
                                                style={{ display: "none", visibility: "hidden" }}
                                              />
                        </noscript>noscript>
                        <AuthProvider>
                                  <Navber />
                          {children}
                                  <Toaster position="top-right" richColors />
                                  <Footer />
                        </AuthProvider>AuthProvider>
                </body>body>
          </html>html>
        );
}</html>
