import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "OZ Connection | Backpackers français en Australie",
  description: "Job, Visa, Logement, Scooter – Tout ce qu'il te faut pour réussir ton expérience en Australie. Bons plans vérifiés et assistance sur place.",
  keywords: "backpacker, Australie, WHV, Working Holiday Visa, job Australie, logement Australie, français Australie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="9103cc46-a4b9-4bf4-81cd-069d8baeb25f"
        />
        {children}
      </body>
    </html>
  );
}
