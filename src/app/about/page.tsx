"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/lib/translations";
import ContactCTA from "@/components/ContactCTA";
import { Clock } from "lucide-react";

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-[.2em] text-terra-500 bg-sand-50 border border-sand-200 px-3.5 py-1.5 rounded-full mb-4">
      {text}
    </span>
  );
}

export default function AboutPage() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div className="min-h-screen">

      {/* PAGE HERO */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background:"linear-gradient(170deg, #ffffff 0%, #fefaf5 60%, #fff8f0 100%)" }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.8,ease:[.22,1,.36,1] }}>
            <Badge text={t.why.badge} />
            <h1 className="text-4xl sm:text-6xl font-bold text-ocean-600 tracking-tight mb-3" style={{ fontFamily: "var(--font-display)" }}>
              {lang==="FR"?"Une vraie expérience. Un accompagnement pratique.":"Real experience. Practical support."}
            </h1>
            <p className="font-display italic font-medium mb-5" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", color: "#F29700" }}>
              {lang==="FR" ? "Créé par un backpacker, pour les backpackers." : "Built by a backpacker, for backpackers."}
            </p>
            <p className="text-ocean-400/70 text-lg max-w-2xl mx-auto">
              {lang==="FR"
                ?"OZ Connection a été construit par quelqu'un qui a vécu exactement ce que tu t'apprêtes à vivre."
                :"OZ Connection was built by someone who lived exactly what you're about to go through."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* PAUL FULL STORY */}
      <section className="relative py-24 overflow-hidden" style={{ background:"linear-gradient(170deg, #ffffff 0%, #fefaf5 60%, #fff8f0 100%)" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity:0,x:-32 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true,amount:0.2 }} transition={{ duration:0.8,ease:[.22,1,.36,1] }}>
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]">
                <img src="/paul.jpg"
                  alt="Paul — Fondateur OZ Connection" loading="lazy" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white font-bold text-sm mb-1">{lang==="FR"?"Fondateur · OZ Connection":"Founder · OZ Connection"}</p>
                  <p className="text-white/60 text-xs">{lang==="FR"?"Basé à Melbourne · 8 ans d'expérience locale":"Melbourne-based · 8 years local experience"}</p>
                </div>
              </div>

              {/* trust signals */}
              <div className="mt-6 space-y-3">
                {[
                  lang==="FR"?"8 ans à Melbourne":"8 years in Melbourne",
                  lang==="FR"?"Support disponible en français et en anglais":"English and French-speaking support",
                  lang==="FR"?"Phase de lancement — construit avec les retours réels":"Launch stage — built with real feedback",
                ].map((s,i) => (
                  <div key={i} className="flex items-center gap-3 text-ocean-400 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-terra-400 shrink-0" />{s}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0,x:32 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true,amount:0.2 }} transition={{ duration:0.8,ease:[.22,1,.36,1] }}>
              <Badge text={t.why.badge} />
              <h2 className="text-3xl sm:text-4xl font-bold text-ocean-600 leading-tight tracking-tight mb-8" style={{ fontFamily: "var(--font-display)" }}>
                {t.why.title}
              </h2>
              <div className="space-y-5 text-ocean-400/70 text-lg leading-relaxed">
                <p>{t.why.p1}</p>
                <p>{t.why.p2}</p>
                <blockquote className="border-l-4 border-amber-400 pl-5 italic text-ocean-400 text-base py-2">
                  {t.why.p3}
                </blockquote>
                <p>
                  {lang==="FR"
                    ?"OZ Connection est en phase de lancement. Les premières missions sont en cours. Le service est construit avec de vrais retours de backpackers et d'étudiants pour s'améliorer continuellement."
                    :"OZ Connection is at launch stage. First engagements are underway. The service is built with real feedback from backpackers and students to improve continuously."}
                </p>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 bg-sand-50 border border-sand-200 px-4 py-2.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-terra-500" />
                <span className="text-amber-700 text-xs font-bold">{t.why.langNote}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mx-5" />

      {/* WHY MELBOURNE FULL */}
      <section className="relative py-28 overflow-hidden" style={{ background:"linear-gradient(155deg, #ffffff 0%, #fefcf7 40%, #fff9f0 100%)" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity:0,y:12 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
              <Badge text={t.whyMelbourne.badge} />
            </motion.div>
            <motion.h2 initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.75,delay:0.1,ease:[.22,1,.36,1] }}
              className="text-3xl sm:text-5xl font-bold text-ocean-600 leading-tight tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
              {t.whyMelbourne.title}
            </motion.h2>
            <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6,delay:0.25 }}
              className="text-ocean-400/70 text-sm italic border-l-2 border-amber-300 pl-4 max-w-xl mx-auto leading-relaxed text-left">
              {t.whyMelbourne.proof}
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-0">
              {t.whyMelbourne.points.map((pt,i) => (
                <motion.div key={i}
                  initial={{ opacity:0,x:-28 }} whileInView={{ opacity:1,x:0 }}
                  viewport={{ once:true,amount:0.35 }} transition={{ duration:0.6,delay:i*0.1,ease:[.22,1,.36,1] }}
                  className="group flex items-start gap-5 py-6 border-b border-ocean-400/10 last:border-0">
                  <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm text-white group-hover:scale-105 transition-transform"
                    style={{ fontFamily: "var(--font-display)",background:"linear-gradient(135deg,#FE9A00,#f97316)",boxShadow:"0 4px 16px rgba(254,154,0,0.28)" }}>
                    {String(i+1).padStart(2,"0")}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-bold text-ocean-600 text-base mb-1.5 group-hover:text-terra-500 transition-colors" style={{ fontFamily: "var(--font-display)" }}>{pt.title}</p>
                    <p className="text-ocean-400/70 text-sm leading-relaxed">{pt.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity:0,scale:0.96 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true,amount:0.2 }} transition={{ duration:0.9,ease:[.22,1,.36,1] }}>
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)]">
                <img src="https://images.unsplash.com/photo-1707288190500-bef63bc30356?q=80&w=1920&auto=format&fit=crop" alt="St Kilda Luna Park Melbourne" loading="lazy"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                  style={{ filter:"contrast(1.08) saturate(1.18) brightness(1.04)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 glass-white rounded-2xl px-5 py-4">
                  <p className="text-ocean-600 font-bold text-sm mb-0.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />St Kilda · Melbourne
                  </p>
                  <p className="text-ocean-400/70 text-xs">{lang==="FR"?"Meilleure ville du monde — Time Out 2026":"World's best city — Time Out 2026"}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mx-5" />

      {/* LAUNCH STAGE */}
      <section className="py-14" style={{ background:"linear-gradient(160deg, #fefaf4 0%, #fdf7ee 100%)" }}>
        <div className="max-w-3xl mx-auto px-5 text-center">
          <div className="bg-sand-100 rounded-[2rem] p-8 sm:p-10 border border-ocean-400/10 shadow-sm">
            <Badge text={t.launch.badge} />
            <p className="text-ocean-400/70 text-base leading-relaxed">{t.launch.text}</p>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mx-5" />

      {/* PARTNER BENEFITS (minimal) */}
      <section className="relative py-16 bg-sand-100">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <Badge text={t.partners.badge} />
          <h2 className="text-2xl sm:text-3xl font-bold text-ocean-600 tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {t.partners.title}
          </h2>
          <p className="text-ocean-400/70 text-base leading-relaxed max-w-2xl mx-auto mb-6">{t.partners.body}</p>
          <div className="inline-flex items-center gap-3 bg-sand-50 border border-sand-200 px-6 py-3.5 rounded-2xl">
            <Clock className="w-4 h-4 text-terra-400" />
            <span className="text-amber-700 font-semibold text-sm">{t.partners.insuranceLabel}</span>
            <span className="bg-terra-500 text-white text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
              {t.partners.comingSoon}
            </span>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
