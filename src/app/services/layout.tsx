import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À la carte Arrival Services in Melbourne",
  description:
    "Individual arrival services for backpackers and students in Melbourne — TFN, ABN, bank account setup, SIM card, scooter rental guidance, accommodation direction. Pay only for what you need.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "À la carte arrival services | OZ Connection Melbourne",
    description:
      "TFN, ABN, bank, SIM, accommodation — individual services to set up your life in Melbourne.",
    url: "https://www.oz-connection.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
