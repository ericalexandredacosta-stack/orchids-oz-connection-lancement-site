import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Arrival Questions for Backpackers in Melbourne",
  description:
    "Answers to the most common questions about arriving in Melbourne as a backpacker, WHV holder or international student — TFN, ABN, bank account, accommodation, what OZ Connection does and does not do.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | OZ Connection Melbourne",
    description:
      "Common questions about arriving in Melbourne and what OZ Connection helps with.",
    url: "https://www.oz-connection.com/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
