import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { LangProvider } from "@/lib/lang-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "OZ Connection | Melbourne Arrival Support for Backpackers & Students",
  description: "OZ Connection helps backpackers and international students prepare their arrival in Melbourne with setup guidance, local support, starter guides, CV help, accommodation direction and WhatsApp support.",
  keywords: "Australia arrival support, Melbourne arrival support, backpacker Australia help, French backpackers Australia, international student support Melbourne, TFN ABN help Australia, moving to Melbourne, backpacker Melbourne setup, Australia working holiday support, student support Melbourne",
  openGraph: {
    title: "OZ Connection | Melbourne Arrival Support for Backpackers & Students",
    description: "Practical arrival setup, local guidance and WhatsApp support for backpackers and students starting their journey in Australia.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="9103cc46-a4b9-4bf4-81cd-069d8baeb25f"
        />
        <LangProvider>
          <Navbar />
          {children}
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
