import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import SiteChrome from "@/components/SiteChrome";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.oz-connection.com"),
  title: {
    default: "OZ Connection | Melbourne Arrival Support for Backpackers & Students",
    template: "%s | OZ Connection",
  },
  description:
    "Practical arrival setup, local guidance and WhatsApp support for backpackers and students starting their journey in Melbourne — TFN, ABN, banking, SIM, accommodation, in English and French.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "OZ Connection",
    locale: "en_AU",
    url: "https://www.oz-connection.com",
    title: "OZ Connection | Melbourne Arrival Support",
    description:
      "Arrival setup, local guidance and WhatsApp support for backpackers and students settling in Melbourne, in English and French.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "OZ Connection — Melbourne arrival support",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.jpg"] },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OZ Connection",
  url: "https://www.oz-connection.com",
  logo: "https://www.oz-connection.com/icon.svg",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: "+61494652991",
    availableLanguage: ["English", "French"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.oz-connection.com/#localbusiness",
  name: "OZ Connection",
  url: "https://www.oz-connection.com",
  telephone: "+61494652991",
  email: "contact@oz-connection.com",
  priceRange: "$$",
  areaServed: { "@type": "City", name: "Melbourne", addressCountry: "AU" },
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: -37.81361,
      longitude: 144.96305,
    },
    geoRadius: "50000",
  },
  knowsLanguage: ["en", "fr"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify([orgSchema, localBusinessSchema])}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DD2W0T31TL"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-DD2W0T31TL');`}
        </Script>
        <LangProvider>
          <SiteChrome>{children}</SiteChrome>
        </LangProvider>
      </body>
    </html>
  );
}
