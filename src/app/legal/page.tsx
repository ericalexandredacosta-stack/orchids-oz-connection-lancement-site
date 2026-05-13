"use client";

import { useLang } from "@/lib/lang-context";

export default function LegalPage() {
  const { lang } = useLang();
  const isFR = lang === "FR";

  return (
    <main className="min-h-screen bg-[var(--color-sand-100)] py-24 px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        <header>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight text-ocean-600 mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isFR ? "Mentions légales" : "Legal"}
          </h1>
          <p className="text-neutral-600">
            {isFR
              ? "Cette page sera complétée prochainement avec les Conditions Générales et la Politique de Confidentialité d'OZ Connection."
              : "This page will be completed shortly with OZ Connection's Terms of Service and Privacy Policy."}
          </p>
        </header>

        <section className="space-y-4">
          <h2
            className="text-2xl font-bold text-ocean-600"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isFR ? "Éditeur du site" : "Site operator"}
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            OZ Connection — Melbourne, Victoria, Australia.<br />
            Contact :{" "}
            <a
              href="mailto:contact@oz-connection.com"
              className="text-terra-500 underline hover:text-terra-600"
            >
              contact@oz-connection.com
            </a>
            {" · "}
            <a
              href="https://wa.me/+61494652991"
              className="text-terra-500 underline hover:text-terra-600"
            >
              WhatsApp +61 494 652 991
            </a>
          </p>
        </section>

        <section className="space-y-4">
          <h2
            className="text-2xl font-bold text-ocean-600"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isFR ? "Hébergement" : "Hosting"}
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
          </p>
        </section>

        <section className="space-y-4">
          <h2
            className="text-2xl font-bold text-ocean-600"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isFR
              ? "Conditions générales & confidentialité"
              : "Terms & privacy policy"}
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            {isFR
              ? "Les Conditions Générales de Service et la Politique de Confidentialité (conformes à l'Australian Privacy Act 1988 et au RGPD pour les données européennes) sont en cours de rédaction. Pour toute question liée à la gestion des données ou à un service, contactez-nous via WhatsApp ou email."
              : "Our Terms of Service and Privacy Policy (compliant with the Australian Privacy Act 1988 and GDPR for European data) are being drafted. For any data or service question, reach us via WhatsApp or email."}
          </p>
        </section>
      </div>
    </main>
  );
}
