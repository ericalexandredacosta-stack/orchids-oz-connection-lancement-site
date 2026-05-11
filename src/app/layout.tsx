import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OZ Connection | Backpackers français en Australie",
  description: "Job, Visa, Logement, Scooter – Tout ce qu'il te faut pour réussir ton expérience en Australie. Bons plans vérifiés et assistance sur place.",
  keywords: "backpacker, Australie, WHV, Working Holiday Visa, job Australie, logement Australie, français Australie",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
