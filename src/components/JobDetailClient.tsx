"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, CheckCircle2, HardHat, Car, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import type { Job } from "@/lib/sanity";
import JobApplicationForm from "@/components/JobApplicationForm";

const ppeLabels: Record<string, { fr: string; en: string }> = {
  hardhat: { fr: "Casque de chantier", en: "Hard hat" },
  steelcap: { fr: "Chaussures à coque", en: "Steel cap boots" },
  highvis: { fr: "Gilet haute visibilité", en: "High-vis vest" },
};

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
    month: "long",
    year: "numeric",
  });
}

export default function JobDetailClient({ job }: { job: Job }) {
  const { lang } = useLang();
  const isFR = lang === "FR";

  const title = isFR ? job.titleFR : job.titleEN;
  const description = isFR ? job.descriptionFR : job.descriptionEN;
  const requirements = (isFR ? job.requirementsFR : job.requirementsEN) || [];
  const tradeLabel = job.trade && tradeLabels[job.trade]
    ? isFR
      ? tradeLabels[job.trade].fr
      : tradeLabels[job.trade].en
    : null;
  const start = formatStart(job.startDate, isFR);

  const copy = isFR
    ? {
        back: "Tous les jobs",
        descriptionTitle: "Le job",
        requirementsTitle: "Ce qu'on attend",
        ppeTitle: "EPI à fournir",
        vehicleNeeded: "Véhicule personnel demandé",
        whiteCardNeeded: "White Card obligatoire",
        formKicker: "Postuler à ce job",
        formTitle: "Envoie-nous ton profil.",
        formIntro:
          "Remplis ce formulaire. On transmet tes infos au builder, et on revient vers toi si ton profil correspond.",
        durationDays: "jours",
        from: "À partir du",
        dailyRate: "par jour",
      }
    : {
        back: "All jobs",
        descriptionTitle: "The job",
        requirementsTitle: "What we expect",
        ppeTitle: "PPE you need to bring",
        vehicleNeeded: "Own vehicle required",
        whiteCardNeeded: "White Card mandatory",
        formKicker: "Apply for this job",
        formTitle: "Send us your profile.",
        formIntro:
          "Fill this form. We pass your details to the builder and come back to you if your profile is a match.",
        durationDays: "days",
        from: "From",
        dailyRate: "per day",
      };

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* ── HERO ── */}
      <section className="relative pt-36 pb-16 overflow-hidden" style={{ background: "var(--color-ocean-600)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 55% at 80% 20%, rgba(242,151,0,0.22), transparent 70%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-5">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sand-200/70 hover:text-sand-100 text-sm font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {copy.back}
          </Link>

          {tradeLabel && (
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mb-5 text-xs font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full"
              style={{ background: "rgba(242,151,0,0.18)", border: "1px solid rgba(242,151,0,0.35)", color: "#F5C158" }}
            >
              {tradeLabel}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            className="font-display font-bold text-sand-100 mb-6 leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.025em" }}
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="flex flex-wrap gap-4 text-sand-200/80 text-sm"
          >
            {job.suburb && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: "#F5C158" }} />
                {job.suburb}
              </span>
            )}
            {start && (
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: "#F5C158" }} />
                {copy.from} {start}
                {job.durationDays ? ` (${job.durationDays} ${copy.durationDays})` : ""}
              </span>
            )}
            {job.dailyRate ? (
              <span className="inline-flex items-center gap-2 font-semibold text-sand-100">
                ${job.dailyRate} AUD · {copy.dailyRate}
              </span>
            ) : null}
          </motion.div>
        </div>
      </section>

      {/* ── DETAILS ── */}
      <section className="relative py-16" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-4xl mx-auto px-5 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display font-semibold text-ocean-600 text-xl mb-3">
                {copy.descriptionTitle}
              </h2>
              <p className="text-ocean-400/80 text-base leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {requirements.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-ocean-600 text-xl mb-3">
                  {copy.requirementsTitle}
                </h2>
                <ul className="space-y-2.5">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-ocean-400/80 text-base leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#F29700" }} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            {job.requiresWhiteCard && (
              <div
                className="rounded-2xl border p-5 flex items-start gap-3"
                style={{ background: "var(--color-bg-alt)", borderColor: "rgba(30,58,74,0.08)" }}
              >
                <ShieldCheck className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#F29700" }} />
                <div>
                  <p className="font-display font-semibold text-ocean-600 text-sm">
                    {copy.whiteCardNeeded}
                  </p>
                </div>
              </div>
            )}

            {job.requiredPPE && job.requiredPPE.length > 0 && (
              <div
                className="rounded-2xl border p-5"
                style={{ background: "var(--color-bg-alt)", borderColor: "rgba(30,58,74,0.08)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="w-5 h-5" style={{ color: "#F29700" }} />
                  <p className="font-display font-semibold text-ocean-600 text-sm">
                    {copy.ppeTitle}
                  </p>
                </div>
                <ul className="space-y-1.5 text-ocean-400/75 text-sm">
                  {job.requiredPPE.map((item) => (
                    <li key={item}>{isFR ? ppeLabels[item]?.fr : ppeLabels[item]?.en}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.requiresVehicle && (
              <div
                className="rounded-2xl border p-5 flex items-start gap-3"
                style={{ background: "var(--color-bg-alt)", borderColor: "rgba(30,58,74,0.08)" }}
              >
                <Car className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#F29700" }} />
                <p className="font-display font-semibold text-ocean-600 text-sm">
                  {copy.vehicleNeeded}
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" className="relative py-20 border-t" style={{ background: "var(--color-bg-alt)", borderColor: "var(--color-line)" }}>
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10">
            <span
              className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full"
              style={{ background: "rgba(242,151,0,0.12)", color: "#A65F00" }}
            >
              {copy.formKicker}
            </span>
            <h2
              className="font-display font-bold text-ocean-600 mb-3"
              style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)", letterSpacing: "-0.02em" }}
            >
              {copy.formTitle}
            </h2>
            <p className="text-ocean-400/65 text-base leading-relaxed max-w-xl mx-auto">
              {copy.formIntro}
            </p>
          </div>

          <JobApplicationForm
            jobId={job._id}
            jobSlug={job.slug}
            jobTitleEN={job.titleEN}
            jobTitleFR={job.titleFR}
          />
        </div>
      </section>
    </div>
  );
}
