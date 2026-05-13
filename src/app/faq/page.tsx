"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/lib/translations";
import ContactCTA from "@/components/ContactCTA";
import { ChevronDown } from "lucide-react";

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-[.2em] text-terra-500 bg-sand-50 border border-sand-200 px-3.5 py-1.5 rounded-full mb-4">
      {text}
    </span>
  );
}

export default function FAQPage() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div className="min-h-screen">
      {/* PAGE HERO */}
      <section
        className="relative pt-36 pb-16 overflow-hidden"
        style={{ background: "linear-gradient(170deg, #ffffff 0%, #fefaf5 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge text={t.faq.badge} />
            <h1
              className="text-5xl sm:text-7xl font-bold text-ocean-600 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.faq.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* FAQ — native <details> so answers are always in the DOM (crawler + LLM citable) */}
      <section
        className="relative py-12 overflow-hidden"
        style={{ background: "linear-gradient(170deg, #ffffff 0%, #fefaf5 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-5">
          <div className="bg-sand-100 rounded-[2rem] px-8 py-2 border border-ocean-400/10 shadow-sm">
            {t.faq.items.map((item, i) => (
              <details
                key={i}
                className="group border-b border-ocean-400/10 last:border-0"
              >
                <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold text-ocean-600 text-[0.95rem] leading-snug group-hover:text-terra-500 transition-colors">
                    {item.q}
                  </span>
                  <ChevronDown className="w-5 h-5 text-ocean-400/50 shrink-0 transition-transform duration-300 group-open:rotate-180 group-open:text-terra-400" />
                </summary>
                <div className="pb-5 pr-6">
                  <p className="text-ocean-400/70 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
