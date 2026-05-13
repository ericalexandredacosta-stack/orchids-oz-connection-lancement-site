import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Melbourne Labour for Tradies & Builders — OZ Connection Pro",
  description:
    "For Melbourne tradies and builders looking for reliable backpacker labour. We introduce motivated workers from our local network — straightforward placement, no recruiter overhead.",
  alternates: { canonical: "/pro" },
  openGraph: {
    title: "Melbourne Labour for Tradies | OZ Connection Pro",
    description:
      "Reliable backpacker labour for Melbourne construction and trade businesses.",
    url: "https://www.oz-connection.com/pro",
  },
};

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
