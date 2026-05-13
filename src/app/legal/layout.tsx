import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Privacy",
  description:
    "Legal information, Terms of Service and Privacy Policy for OZ Connection — Melbourne-based arrival support for backpackers and international students.",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: true },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
