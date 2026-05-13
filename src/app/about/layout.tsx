import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — The Founder Behind OZ Connection",
  description:
    "Meet the person behind OZ Connection — based in Melbourne, helping French and English-speaking backpackers and international students get set up locally without the usual newcomer mistakes.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About OZ Connection",
    description:
      "The Melbourne-based founder helping backpackers and students settle in their first weeks in Australia.",
    url: "https://www.oz-connection.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
