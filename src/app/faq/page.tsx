"use client";

import { useState } from "react";
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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ocean-400/10 last:border-0">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group">
        <span className="font-semibold text-ocean-600 text-[0.95rem] leading-snug group-hover:text-terra-500 transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-ocean-400/50 shrink-0 transition-transform duration-300 ${open?"rotate-180 text-terra-400":""}`} />
      </button>
      {open && (
        <div className="pb-5 pr-6">
          <p className="text-ocean-400/70 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div className="min-h-screen">

      {/* PAGE HERO */}
      <section className="relative pt-36 pb-16 overflow-hidden" style={{ background:"linear-gradient(170deg, #ffffff 0%, #fefaf5 100%)" }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.8,ease:[.22,1,.36,1] }}>
            <Badge text={t.faq.badge} />
            <h1 className="text-5xl sm:text-7xl font-bold text-ocean-600 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              {t.faq.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* FULL ACCORDION */}
      <section className="relative py-12 overflow-hidden" style={{ background:"linear-gradient(170deg, #ffffff 0%, #fefaf5 100%)" }}>
        <div className="max-w-3xl mx-auto px-5">
          <motion.div
            initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7,ease:[.22,1,.36,1] }}
            className="bg-sand-100 rounded-[2rem] px-8 py-2 border border-ocean-400/10 shadow-sm"
          >
            {t.faq.items.map((item,i) => <FAQItem key={i} q={item.q} a={item.a} />)}
          </motion.div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
