"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, CheckCircle2, Users, Hammer, Clock, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";

const wa = "https://wa.me/+61494652991";

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GridPattern() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="pro-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#345266" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pro-grid)" opacity={0.05} />
    </svg>
  );
}

export default function ProPage() {
  const { lang } = useLang();
  const isFR = lang === "FR";

  const howSteps = isFR ? [
    { num: "01", title: "Tu contactes OZ Connection", desc: "Via WhatsApp ou email. Tu décris ton projet, les dates et le type de travail." },
    { num: "02", title: "On te présente un backpacker", desc: "On sélectionne un profil disponible, motivé et vérifié parmi notre réseau Melbourne." },
    { num: "03", title: "La mission démarre", desc: "Tu travailles directement avec le backpacker. On reste disponibles si besoin." },
    { num: "04", title: "Tarif simple", desc: "330 AUD au total. Tu sais exactement ce que tu paies." },
  ] : [
    { num: "01", title: "You contact OZ Connection", desc: "Via WhatsApp or email. Tell us about your project, dates and type of work." },
    { num: "02", title: "We introduce a backpacker", desc: "We match an available, motivated and verified profile from our Melbourne network." },
    { num: "03", title: "The job starts", desc: "You work directly with the backpacker. We remain available if needed." },
    { num: "04", title: "Simple pricing", desc: "$330 AUD total. You know exactly what you're paying." },
  ];

  const benefits = isFR ? [
    { icon: Zap, title: "Disponible rapidement", desc: "Les backpackers sont flexibles et disponibles à court terme — idéal pour les chantiers qui ne peuvent pas attendre." },
    { icon: Users, title: "Main-d'œuvre motivée", desc: "Des travailleurs qui cherchent une vraie expérience terrain, pas juste un chèque." },
    { icon: ShieldCheck, title: "Vérifiés par OZ Connection", desc: "On connaît les profils qu'on envoie. Pas de surprise côté fiabilité." },
    { icon: Hammer, title: "Tous types de chantiers", desc: "Construction, jardinage, déménagement, nettoyage de chantier, manutention — on s'adapte." },
    { icon: Clock, title: "Journée ou mission longue", desc: "Disponible à la journée ou sur des missions de plusieurs semaines selon tes besoins." },
    { icon: CheckCircle2, title: "Transparent & simple", desc: "Un tarif clair, pas de frais cachés, pas de marge récurrente sur le journalier." },
  ] : [
    { icon: Zap, title: "Available fast", desc: "Backpackers are flexible and available at short notice — ideal for jobs that can't wait." },
    { icon: Users, title: "Motivated workers", desc: "People looking for real hands-on experience, not just a pay cheque." },
    { icon: ShieldCheck, title: "Vetted by OZ Connection", desc: "We know the profiles we send. No surprises on reliability." },
    { icon: Hammer, title: "All types of jobs", desc: "Construction, gardening, removals, site cleanup, labouring — we adapt." },
    { icon: Clock, title: "Day rate or longer", desc: "Available per day or for multi-week assignments depending on your needs." },
    { icon: CheckCircle2, title: "Transparent & simple", desc: "One clear rate, no hidden fees, no ongoing margin on the worker." },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-28 overflow-hidden" style={{ background: "var(--color-ocean-600)" }}>
        <GridPattern />
        {/* Orange glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 55% at 80% 20%, rgba(242,151,0,0.22), transparent 70%)" }} />

        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <Reveal>
            <span className="inline-block mb-6 text-xs font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full"
              style={{ background: "rgba(242,151,0,0.18)", border: "1px solid rgba(242,151,0,0.35)", color: "#F5C158" }}>
              {isFR ? "Espace Pro · B2B" : "Pro Space · B2B"}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-display font-bold text-sand-100 mb-5 leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
              {isFR
                ? "Des backpackers motivés pour vos chantiers à Melbourne."
                : "Motivated backpackers for your jobs in Melbourne."}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-sand-200/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              {isFR
                ? "OZ Connection met en relation les builders et tradies avec des backpackers disponibles, motivés et vérifiés. Une journée, une mission, un tarif clair."
                : "OZ Connection connects builders and tradies with available, motivated and vetted backpackers. One day, one job, one clear rate."}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-bold text-sm px-7 py-4 rounded-full transition-all"
                style={{ background: "#F29700", color: "#fff", boxShadow: "0 4px 20px rgba(242,151,0,0.4)" }}>
                <MessageCircle className="w-5 h-5" />
                {isFR ? "Contacter OZ Connection" : "Contact OZ Connection"}
              </a>
              <a href="#how"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-full transition-colors"
                style={{ border: "1.5px solid rgba(244,237,224,0.25)", color: "#F4EDE0", background: "rgba(244,237,224,0.06)" }}>
                {isFR ? "Comment ça marche" : "How it works"}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MATH SECTION ── */}
      <section className="relative py-24 overflow-hidden border-b" style={{ background: "var(--color-bg-alt)", borderColor: "var(--color-line)" }}>
        <div className="max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <span className="pill-kicker">
              {isFR ? "Le tarif" : "The rate"}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display font-bold text-ocean-600 mb-3"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em" }}>
              {isFR ? "La math, claire." : "The math, simple."}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ocean-400/65 text-base mb-12 max-w-lg mx-auto leading-relaxed">
              {isFR
                ? "Un tarif clair pour la mission, sans frais cachés ni marge récurrente."
                : "A clear all-in rate for the placement, no hidden fees or ongoing margin."}
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            {/* Worker rate */}
            <Reveal delay={0.12}>
              <div className="rounded-[22px] p-8 border text-left"
                style={{ background: "var(--color-bg)", borderColor: "rgba(30,58,74,0.1)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "var(--color-ink-soft)" }}>
                  {isFR ? "Tarif journalier backpacker" : "Backpacker day rate"}
                </p>
                <p className="font-display font-bold leading-none mb-1"
                  style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", color: "#1E3A4A" }}>
                  $250
                </p>
                <p className="text-ocean-400/50 text-sm font-medium">AUD</p>
              </div>
            </Reveal>

            {/* OZ fee */}
            <Reveal delay={0.18}>
              <div className="rounded-[22px] p-8 text-left"
                style={{ background: "#F29700" }}>
                <p className="text-xs font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {isFR ? "Frais de mise en relation" : "Placement fee"}
                </p>
                <p className="font-display font-bold leading-none mb-1 text-white"
                  style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>
                  $80
                </p>
                <p className="text-white/60 text-sm font-medium">AUD</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.22}>
            <p className="text-ocean-400/40 text-xs mt-8 max-w-md mx-auto leading-relaxed">
              {isFR
                ? "330 AUD au total pour la mission. Tu sais exactement ce que tu paies, à la confirmation."
                : "$330 AUD total for the placement. You know exactly what you're paying, on confirmation."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="relative py-24 overflow-hidden" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-16">
            <Reveal>
              <span className="pill-kicker">{isFR ? "Comment ça marche" : "How it works"}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display font-bold text-ocean-600"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em" }}>
                {isFR ? "Quatre étapes, zéro complexité." : "Four steps, zero complexity."}
              </h2>
            </Reveal>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 gap-5">
            {howSteps.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.08 }}
                className="rounded-[18px] p-7 border flex gap-5 items-start"
                style={{ background: "var(--color-bg-alt)", borderColor: "rgba(30,58,74,0.08)" }}>
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                  style={{ fontFamily: "var(--font-display)", background: "linear-gradient(135deg, #F5C158, #F29700)", boxShadow: "0 4px 16px rgba(242,151,0,0.3)" }}>
                  {step.num}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-ocean-600 text-base mb-1">{step.title}</h3>
                  <p className="text-ocean-400/65 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY OZ CONNECTION FOR TRADIES ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "var(--color-bg-alt)" }}>
        <div className="relative max-w-5xl mx-auto px-5">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: sticky heading */}
            <div className="lg:col-span-4">
              <Reveal>
                <span className="pill-kicker">{isFR ? "Pourquoi OZ Connection" : "Why OZ Connection"}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-display font-bold text-ocean-600 mt-1"
                  style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", letterSpacing: "-0.02em" }}>
                  {isFR ? "Conçu pour les pros du bâtiment." : "Built for the trades."}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-ocean-400/60 text-sm leading-relaxed mt-4">
                  {isFR
                    ? "Six raisons pour lesquelles les builders et tradies font appel à OZ Connection."
                    : "Six reasons builders and tradies use OZ Connection."}
                </p>
              </Reveal>
            </div>

            {/* Right: two-column list */}
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-0">
                {benefits.map((b, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.06 }}
                    className="flex items-start gap-3 py-5 border-b"
                    style={{ borderColor: "rgba(30,58,74,0.08)" }}>
                    <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(242,151,0,0.15)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F29700" }} />
                    </span>
                    <div>
                      <p className="font-display font-semibold text-ocean-600 text-sm mb-0.5">{b.title}</p>
                      <p className="text-ocean-400/60 text-xs leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <section className="py-10" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-ocean-400/40 text-xs leading-relaxed border-l-2 pl-4"
            style={{ borderColor: "rgba(242,151,0,0.2)" }}>
            {isFR
              ? "OZ Connection est un service de mise en relation uniquement. Nous ne sommes pas employeurs, agence de placement ni agence de travail intérimaire. Le backpacker et le tradie sont responsables de leurs obligations légales respectives (visa, droits au travail, assurances, déclarations fiscales). OZ Connection ne garantit pas les résultats ni la disponibilité."
              : "OZ Connection is an introduction service only. We are not an employer, recruitment agency or labour hire company. The backpacker and tradie are each responsible for their respective legal obligations (visa, work rights, insurance, tax). OZ Connection does not guarantee outcomes or availability."}
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-24 overflow-hidden text-center" style={{ background: "var(--color-ocean-600)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(242,151,0,0.15), transparent 70%)" }} />
        <div className="relative max-w-2xl mx-auto px-5">
          <Reveal>
            <span className="inline-block mb-6 text-xs font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full"
              style={{ background: "rgba(242,151,0,0.18)", border: "1px solid rgba(242,151,0,0.35)", color: "#F5C158" }}>
              {isFR ? "Vous avez un chantier ?" : "Got a job on?"}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display font-bold text-sand-100 mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", letterSpacing: "-0.025em" }}>
              {isFR
                ? "Besoin d'un renfort demain ?"
                : "Need an extra pair of hands tomorrow?"}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sand-200/55 text-lg leading-relaxed mb-10">
              {isFR
                ? "Contactez OZ Connection sur WhatsApp. On vous présente un profil disponible sous 24h."
                : "Message OZ Connection on WhatsApp. We'll introduce an available profile within 24 hours."}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-bold text-sm px-7 py-4 rounded-full transition-all"
                style={{ background: "#F29700", color: "#fff", boxShadow: "0 4px 20px rgba(242,151,0,0.4)" }}>
                <MessageCircle className="w-5 h-5" />
                {isFR ? "Envoyer un message" : "Send a message"}
              </a>
              <Link href="/"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-full transition-colors"
                style={{ border: "1.5px solid rgba(244,237,224,0.25)", color: "#F4EDE0", background: "rgba(244,237,224,0.06)" }}>
                {isFR ? "Retour à l'accueil" : "Back to home"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
