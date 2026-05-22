"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Briefcase, HardHat } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import type { Job } from "@/lib/sanity";

const tradeLabels: Record<string, { fr: string; en: string }> = {
  construction: { fr: "Construction", en: "Construction" },
  landscaping: { fr: "Jardinage", en: "Landscaping" },
  removals: { fr: "Déménagement", en: "Removals" },
  cleanup: { fr: "Nettoyage chantier", en: "Site cleanup" },
  labouring: { fr: "Manutention", en: "Labouring" },
  painting: { fr: "Peinture", en: "Painting" },
  other: { fr: "Autre", en: "Other" },
};

function formatStart(dateISO: string | undefined, isFR: boolean): string | null {
  if (!dateISO) return null;
  const d = new Date(dateISO);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(isFR ? "fr-FR" : "en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function JobsListClient({ jobs }: { jobs: Job[] }) {
  const { lang } = useLang();
  const isFR = lang === "FR";

  const copy = isFR
    ? {
        kicker: "Offres en cours",
        title: "Des jobs à Melbourne pour backpackers.",
        subtitle:
          "Des builders, tradies et petites entreprises de Melbourne cherchent des renforts motivés. Postule en quelques minutes, on transmet ton profil directement.",
        empty:
          "Aucun job ouvert pour le moment. Reviens dans quelques jours, ou contacte-nous sur WhatsApp pour qu'on t'ajoute à la liste de profils dispos.",
        emptyCta: "Nous écrire",
        apply: "Voir et postuler",
        from: "À partir du",
        durationDays: "jours",
        dailyRate: "par jour",
        whiteCard: "White Card",
        ppe: "EPI",
        vehicle: "Véhicule",
        suburb: "Lieu",
        feeNotice:
          "OZ Connection est un service de mise en relation. Le builder te paie directement à ton tarif journalier convenu.",
      }
    : {
        kicker: "Open positions",
        title: "Jobs in Melbourne for backpackers.",
        subtitle:
          "Builders, tradies and small businesses in Melbourne are looking for motivated extra hands. Apply in a few minutes, we pass your profile straight on.",
        empty:
          "No open jobs right now. Check back in a few days, or message us on WhatsApp so we add you to the available profiles list.",
        emptyCta: "Message us",
        apply: "View and apply",
        from: "From",
        durationDays: "days",
        dailyRate: "per day",
        whiteCard: "White Card",
        ppe: "PPE",
        vehicle: "Vehicle",
        suburb: "Location",
        feeNotice:
          "OZ Connection is an introduction service. The builder pays you directly at your agreed day rate.",
      };

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* ── HERO ── */}
      <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: "var(--color-ocean-600)" }}>
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
            {copy.kicker}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            className="font-display font-bold text-sand-100 mb-5 leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}
          >
            {copy.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="text-sand-200/65 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {copy.subtitle}
          </motion.p>
        </div>
      </section>

      {/* ── JOBS GRID ── */}
      <section className="relative py-20 overflow-hidden" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-6xl mx-auto px-5">
          {jobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[22px] border p-10 text-center max-w-xl mx-auto"
              style={{ background: "var(--color-bg-alt)", borderColor: "rgba(30,58,74,0.08)" }}
            >
              <Briefcase className="w-8 h-8 mx-auto mb-4" style={{ color: "#F29700" }} />
              <p className="text-ocean-400/75 text-base leading-relaxed mb-6">{copy.empty}</p>
              <a
                href="https://wa.me/+61494652991"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full text-white transition-all"
                style={{ background: "#F29700", boxShadow: "0 4px 16px rgba(242,151,0,0.3)" }}
              >
                {copy.emptyCta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job, i) => {
                const title = isFR ? job.titleFR : job.titleEN;
                const tradeKey = job.trade && tradeLabels[job.trade] ? job.trade : null;
                const tradeLabel = tradeKey
                  ? isFR
                    ? tradeLabels[tradeKey].fr
                    : tradeLabels[tradeKey].en
                  : null;
                const start = formatStart(job.startDate, isFR);
                return (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.06 }}
                    className="group relative flex flex-col rounded-[22px] border p-7 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-15px_rgba(30,58,74,0.18)]"
                    style={{ background: "var(--color-bg-alt)", borderColor: "rgba(30,58,74,0.08)" }}
                  >
                    {tradeLabel && (
                      <span
                        className="inline-block self-start mb-4 text-[11px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(242,151,0,0.12)",
                          color: "#A65F00",
                        }}
                      >
                        {tradeLabel}
                      </span>
                    )}

                    <h2 className="font-display font-semibold text-ocean-600 text-xl mb-3 leading-tight">
                      {title}
                    </h2>

                    <div className="flex flex-col gap-2 text-sm text-ocean-400/70 mb-5">
                      {job.suburb && (
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="w-4 h-4" style={{ color: "#F29700" }} />
                          {job.suburb}
                        </span>
                      )}
                      {start && (
                        <span className="inline-flex items-center gap-2">
                          <Calendar className="w-4 h-4" style={{ color: "#F29700" }} />
                          {copy.from} {start}
                          {job.durationDays ? ` (${job.durationDays} ${copy.durationDays})` : ""}
                        </span>
                      )}
                      {job.requiresWhiteCard && (
                        <span className="inline-flex items-center gap-2">
                          <HardHat className="w-4 h-4" style={{ color: "#F29700" }} />
                          {copy.whiteCard}
                        </span>
                      )}
                    </div>

                    {job.dailyRate ? (
                      <p className="mb-6">
                        <span className="font-display font-bold text-2xl text-ocean-600">
                          ${job.dailyRate}
                        </span>
                        <span className="text-ocean-400/50 text-sm"> AUD · {copy.dailyRate}</span>
                      </p>
                    ) : null}

                    <Link
                      href={`/jobs/${job.slug}`}
                      className="mt-auto inline-flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-full text-white transition-all"
                      style={{
                        background: "#F29700",
                        boxShadow: "0 4px 14px rgba(242,151,0,0.28)",
                      }}
                    >
                      {copy.apply}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          <p className="text-ocean-400/50 text-xs leading-relaxed mt-10 max-w-2xl mx-auto text-center border-t pt-6" style={{ borderColor: "rgba(30,58,74,0.08)" }}>
            {copy.feeNotice}
          </p>
        </div>
      </section>
    </div>
  );
}
