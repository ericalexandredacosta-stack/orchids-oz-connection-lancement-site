import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Arrival Packages — From $99 AUD",
  description:
    "Three arrival support packages for backpackers and students settling in Melbourne. Australia Starter ($99), Melbourne Ready ($299), Melbourne Arrival ($899). English and French support, hands-on or guided.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Arrival Packages | OZ Connection Melbourne",
    description:
      "Three arrival support tiers for Melbourne — from guided self-setup to fully hands-on arrival assistance.",
    url: "https://www.oz-connection.com/packages",
  },
};

const offersSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "OZ Connection Arrival Packages",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Offer",
        name: "Australia Starter",
        description:
          "Guided self-setup pack for backpackers arriving anywhere in Australia.",
        price: "99",
        priceCurrency: "AUD",
        url: "https://www.oz-connection.com/packages",
        seller: { "@type": "Organization", name: "OZ Connection" },
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Offer",
        name: "Melbourne Ready",
        description:
          "Human-assisted arrival pack for Melbourne with WhatsApp support during the first weeks.",
        price: "299",
        priceCurrency: "AUD",
        url: "https://www.oz-connection.com/packages",
        seller: { "@type": "Organization", name: "OZ Connection" },
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Offer",
        name: "Melbourne Arrival",
        description:
          "Full hands-on arrival pack including airport transfer and complete admin setup.",
        price: "899",
        priceCurrency: "AUD",
        url: "https://www.oz-connection.com/packages",
        seller: { "@type": "Organization", name: "OZ Connection" },
        availability: "https://schema.org/LimitedAvailability",
      },
    },
  ],
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="schema-packages"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(offersSchema)}
      </Script>
      {children}
    </>
  );
}
