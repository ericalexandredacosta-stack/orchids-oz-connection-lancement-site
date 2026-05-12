"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { FileText, Briefcase, PiggyBank, Languages, FileSignature, MapPin } from "lucide-react";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { useLang } from "@/lib/lang-context";
import type { ComponentType } from "react";

const wa = "https://wa.me/+61494652991";

const iconMap: Record<string, ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  FileText, Briefcase, PiggyBank, Languages, FileSignature, MapPin,
};

export default function ServicesPage() {
  const { lang } = useLang();
  const t = translations[lang].servicesTeaser;

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* ── HERO ── */}
      <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: "var(--color-ocean-600)" }}>
        {/* Orange glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 55% at 80% 20%, rgba(242,151,0,0.22), transparent 70%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 text-xs font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full"
            style={{ background: "rgba(242,151,0,0.18)", border: "1px solid rgba(242,151,0,0.35)", color: "#F5C158" }}
          >
            {t.pageKicker}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            className="font-display font-bold text-sand-100 mb-5 leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}
          >
            {t.pageH2}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="text-sand-200/65 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {t.pageSubtitle}
          </motion.p>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="relative py-20 overflow-hidden" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.items.map((svc, i) => {
              const Icon = iconMap[svc.icon] || FileText;
              return (
                <motion.div
                  key={svc.slug}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.06 }}
                  className="group relative flex flex-col rounded-[22px] border p-7 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-15px_rgba(30,58,74,0.18)]"
                  style={{ background: "var(--color-bg-alt)", borderColor: "rgba(30,58,74,0.08)" }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "rgba(242,151,0,0.12)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#F29700" }} />
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-semibold text-ocean-600 text-xl mb-2 leading-tight">
                    {svc.name}
                  </h3>

                  {/* Desc */}
                  <p className="text-ocean-400/70 text-sm leading-relaxed mb-6 flex-grow">
                    {svc.desc}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-5 flex-wrap">
                    <span className="font-display font-bold text-2xl text-ocean-600">{svc.priceAUD}</span>
                    <span className="text-ocean-400/50 text-sm">· {svc.priceEUR}</span>
                  </div>

                  {/* CTA */}
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wide px-5 py-3 rounded-full transition-all btn-shine"
                    style={{ background: "#F29700", color: "#fff", boxShadow: "0 4px 14px rgba(242,151,0,0.25)" }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.ctaWhatsapp}
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 max-w-3xl mx-auto p-5 rounded-2xl border flex gap-3 items-start"
            style={{ background: "var(--color-bg-alt)", borderColor: "rgba(30,58,74,0.08)" }}
          >
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#F29700" }} />
            <p className="text-ocean-400/70 text-sm leading-relaxed">{t.disclaimer}</p>
          </motion.div>
        </div>
      </section>

      {/* ── BACK TO PACKS ── */}
      <section className="relative py-16 overflow-hidden" style={{ background: "var(--color-bg-alt)" }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-ocean-600 mb-3"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em" }}
          >
            {lang === "FR" ? "Plusieurs services en une fois ?" : "Several services together?"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="text-ocean-400/70 mb-7 max-w-lg mx-auto"
          >
            {lang === "FR"
              ? "Les packs Starter, Ready et Arrival regroupent plusieurs services à prix réduit."
              : "Starter, Ready and Arrival packs bundle several services at a reduced price."}
          </motion.p>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full transition-colors"
            style={{ border: "1.5px solid rgba(30,58,74,0.2)", color: "var(--color-ink)" }}
          >
            {lang === "FR" ? "Voir les packs" : "View the packs"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
