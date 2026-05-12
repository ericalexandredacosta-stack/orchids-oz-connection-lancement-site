"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/lib/translations";
import ContactCTA from "@/components/ContactCTA";
import {
  MessageCircle, Check, Star, ShieldCheck, CheckCircle2,
} from "lucide-react";

const wa = "https://wa.me/+61494652991";

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-[.2em] text-terra-500 bg-sand-50 border border-sand-200 px-3.5 py-1.5 rounded-full mb-4">
      {text}
    </span>
  );
}

export default function PackagesPage() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div className="min-h-screen">

      {/* PAGE HERO */}
      <section className="relative pt-36 pb-20 overflow-hidden packages-bg">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.8,ease:[.22,1,.36,1] }}>
            <Badge text={t.packages.badge} />
            <h1 className="text-4xl sm:text-6xl font-bold text-ocean-600 tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {t.packages.title}
            </h1>
            <p className="text-ocean-400/70 text-xl max-w-2xl mx-auto">{t.packages.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* FULL PRICING CARDS */}
      <section className="relative py-24 packages-bg overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="blob-a absolute top-[-6rem] left-[-4rem] w-[32rem] h-[32rem] rounded-full opacity-50" style={{ background:"radial-gradient(circle, rgba(254,154,0,0.13) 0%, transparent 70%)" }} />
          <div className="blob-b absolute bottom-[-4rem] right-[-6rem] w-[28rem] h-[28rem] rounded-full opacity-40" style={{ background:"radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">

            {/* Pack 1 */}
            <motion.div initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true,amount:0.1 }} transition={{ duration:0.65,ease:[.22,1,.36,1],delay:0.05 }}
              className="card-lift bg-sand-100 rounded-[2rem] p-8 border border-ocean-400/10 shadow-sm flex flex-col">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">Pack 1</p>
                <h3 className="text-2xl font-bold text-ocean-600 mb-1" style={{ fontFamily: "var(--font-display)" }}>{t.packages.starter.name}</h3>
                <p className="text-ocean-400/70 text-sm mb-5 leading-relaxed">{t.packages.starter.description}</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-ocean-400/50 text-lg line-through">{t.packages.starter.oldPriceAUD}</span>
                  <span className="text-3xl font-bold text-ocean-600">{t.packages.starter.priceAUD}</span>
                  <span className="text-xs font-bold text-terra-500 bg-sand-50 border border-sand-200 px-2 py-0.5 rounded-full">{t.packages.starter.label}</span>
                </div>
                <p className="text-ocean-400/50 text-sm mb-4">{t.packages.starter.priceEUR}</p>
                <p className="text-sm text-ocean-400 leading-relaxed italic border-l-2 border-sand-200 pl-3">{t.packages.starter.promise}</p>
              </div>
              <ul className="space-y-2 mb-5 flex-grow">
                {t.packages.starter.includes.map((item,i) => (
                  <li key={i} className="flex items-start gap-2.5 text-ocean-400 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
              <div className="bg-sand-50/70 rounded-2xl p-4 mb-4 border border-sand-200/80">
                <p className="text-xs font-bold text-ocean-400 mb-2">{t.packages.starter.guidesTitle}</p>
                {t.packages.starter.guides.map((g,i) => (
                  <p key={i} className="text-xs text-ocean-400/70 flex items-start gap-1.5 mb-0.5">
                    <span className="text-terra-400 font-bold mt-0.5 shrink-0">›</span>{g}
                  </p>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl p-3 mb-4 text-xs text-ocean-400/70 border border-ocean-400/10">
                <span className="font-semibold text-ocean-400">{t.packages.starter.addOnLabel} </span>
                {t.packages.starter.addOnMailHolding}
              </div>
              <div className="text-xs text-ocean-400/50 leading-relaxed mb-5 flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-300" />
                <span>{t.packages.starter.note}</span>
              </div>
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-ocean-600 hover:bg-terra-500 text-white font-bold text-sm uppercase tracking-wide px-6 py-3.5 rounded-2xl transition-all btn-shine">
                <MessageCircle className="w-4 h-4" />{t.packages.starter.cta}
              </a>
            </motion.div>

            {/* Pack 2 */}
            <motion.div initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true,amount:0.1 }} transition={{ duration:0.65,ease:[.22,1,.36,1],delay:0.15 }}
              className="relative card-lift bg-ocean-600 rounded-[2rem] p-8 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-terra-500 text-ocean-600 text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-1.5 whitespace-nowrap">
                <Star className="w-3.5 h-3.5 fill-slate-900" />{t.packages.ready.badge}
              </div>
              <div className="mb-6 mt-3">
                <p className="text-xs font-bold uppercase tracking-widest text-white/25 mb-2">Pack 2</p>
                <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>{t.packages.ready.name}</h3>
                <p className="text-white/50 text-sm mb-5 leading-relaxed">{t.packages.ready.description}</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-white/35 text-lg line-through">{t.packages.ready.oldPriceAUD}</span>
                  <span className="text-3xl font-bold text-white">{t.packages.ready.priceAUD}</span>
                  <span className="text-xs font-bold text-terra-300 bg-terra-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">{t.packages.ready.label}</span>
                </div>
                <p className="text-white/40 text-sm">{t.packages.ready.priceEUR}</p>
              </div>
              <ul className="space-y-2 mb-5 flex-grow">
                {t.packages.ready.includes.map((item,i) => (
                  <li key={i} className="flex items-start gap-2.5 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-terra-300 shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
              <div className="bg-sand-100/5 rounded-xl p-3 mb-4 border border-white/10 text-xs text-white/40">
                <span className="font-semibold text-white/60">{t.packages.ready.addOnsLabel} </span>
                {t.packages.ready.addOns.map((a,i) => <p key={i} className="mt-0.5">{a}</p>)}
              </div>
              <div className="text-xs text-white/30 leading-relaxed mb-5 flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-white/20" />
                <span>{t.packages.ready.note}</span>
              </div>
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-terra-500 hover:bg-terra-400 text-ocean-600 font-bold text-sm uppercase tracking-wide px-6 py-3.5 rounded-2xl transition-all btn-shine">
                <MessageCircle className="w-4 h-4" />{t.packages.ready.cta}
              </a>
            </motion.div>

            {/* Pack 3 */}
            <motion.div initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true,amount:0.1 }} transition={{ duration:0.65,ease:[.22,1,.36,1],delay:0.25 }}
              className="card-lift bg-sand-100 rounded-[2rem] p-8 border-2 border-sand-200 shadow-[0_8px_40px_rgba(245,158,11,0.1)] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-amber-100/50 to-orange-100/30 rounded-bl-[3rem] pointer-events-none" />
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Pack 3</p>
                  <span className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs font-bold uppercase tracking-wide px-3 py-0.5 rounded-full border border-sand-200">{t.packages.arrival.badge}</span>
                </div>
                <h3 className="text-2xl font-bold text-ocean-600 mb-1" style={{ fontFamily: "var(--font-display)" }}>{t.packages.arrival.name}</h3>
                <p className="text-ocean-400/70 text-sm mb-5 leading-relaxed">{t.packages.arrival.description}</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-ocean-400/50 text-lg line-through">{t.packages.arrival.oldPriceAUD}</span>
                  <span className="text-3xl font-bold text-ocean-600">{t.packages.arrival.priceAUD}</span>
                  <span className="text-xs font-bold text-terra-500 bg-sand-50 border border-sand-200 px-2 py-0.5 rounded-full">{t.packages.arrival.label}</span>
                </div>
                <p className="text-ocean-400/50 text-sm">{t.packages.arrival.priceEUR}</p>
              </div>
              <ul className="space-y-2 mb-5 flex-grow">
                {t.packages.arrival.includes.map((item,i) => (
                  <li key={i} className="flex items-start gap-2.5 text-ocean-400 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
              <div className="bg-sand-50 rounded-2xl p-4 mb-4 border border-sand-200 text-xs text-ocean-400/70">
                <p className="font-semibold text-ocean-400 mb-1">{t.packages.arrival.accomNote}</p>
                <p className="text-ocean-400/50 mb-1">{t.packages.arrival.accomUpgrades}</p>
                {t.packages.arrival.upgrades.map((u,i) => (
                  <p key={i} className="flex items-center gap-1.5"><span className="text-terra-400 font-bold">›</span>{u}</p>
                ))}
              </div>
              <div className="text-xs text-ocean-400/50 leading-relaxed mb-5 flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-300" />
                <span>{t.packages.arrival.limitedNote}</span>
              </div>
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm uppercase tracking-wide px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-amber-500/20 btn-shine">
                <MessageCircle className="w-4 h-4" />{t.packages.arrival.cta}
              </a>
            </motion.div>
          </div>
          <p className="text-center text-ocean-400/50 text-xs mt-6">{t.packages.eurNote}</p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-amber-100/50 to-transparent mx-5" />

      {/* PARENTS PEACE OF MIND (add-on, directly under 3 main packs) */}
      <section className="relative py-20 overflow-hidden" style={{ background:"linear-gradient(135deg, #fffbf4 0%, #fff7ed 50%, #fef9f0 100%)" }}>
        <div className="max-w-5xl mx-auto px-5 relative z-10">
          <div className="bg-sand-100/70 backdrop-blur-sm rounded-[3rem] p-10 sm:p-14 border border-sand-200/80 shadow-[0_8px_40px_rgba(254,154,0,0.08)] relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-10 items-start relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <Badge text={t.parents.badge} />
                  <span className="text-xs text-terra-500 font-bold bg-sand-50 border border-sand-200 px-3 py-1 rounded-full">{t.parents.addLabel}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-ocean-600">{t.parents.priceAUD}</span>
                </div>
                <p className="text-ocean-400/50 text-sm mb-5">{t.parents.priceEUR}</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-ocean-600 tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  {t.parents.title}
                </h2>
                <p className="text-ocean-400 text-base leading-relaxed mb-6">{t.parents.body}</p>
                <p className="text-xs text-ocean-400/50 flex items-start gap-2 mb-6 leading-relaxed">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-300" />{t.parents.note}
                </p>
                <a href={wa} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-ocean-600 hover:bg-terra-500 text-white font-bold text-sm uppercase tracking-wide px-7 py-4 rounded-2xl transition-all shadow-lg btn-shine">
                  <MessageCircle className="w-5 h-5" />{t.parents.cta}
                </a>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ocean-400/50 mb-4">
                  {lang==="FR"?"Inclus :":"Included:"}
                </p>
                <ul className="space-y-3">
                  {t.parents.includes.map((item,i) => (
                    <li key={i} className="flex items-start gap-3 text-ocean-400 text-sm leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mx-5" />

      {/* COMPARISON TABLE */}
      <section id="compare" className="relative py-24 section-warm overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <Badge text={t.comparison.badge} />
            <h2 className="text-4xl sm:text-5xl font-bold text-ocean-600 tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {t.comparison.title}
            </h2>
            <p className="text-ocean-400/70 text-lg max-w-xl mx-auto">{t.comparison.subtitle}</p>
            <div className="inline-flex items-center gap-2 mt-4 bg-sand-50 border border-sand-200 px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-terra-500" />
              <span className="text-amber-700 text-xs font-bold">{t.comparison.saveLine}</span>
            </div>
          </div>

          <div className="overflow-x-auto -mx-5 px-5 pt-6">
            <table className="w-full min-w-[640px] border-collapse" style={{ borderSpacing:0 }}>
              <thead>
                <tr>
                  <th className="text-left pb-4 pt-2 pr-6 text-ocean-400/50 text-xs font-bold uppercase tracking-widest w-2/5" />
                  <th className="pb-4 pt-2 px-4 text-center w-1/5">
                    <p className="text-xs font-bold uppercase tracking-widest text-ocean-400/50 mb-1">Pack 1</p>
                    <p className="font-bold text-ocean-600 text-base" style={{ fontFamily: "var(--font-display)" }}>Australia Starter</p>
                    <p className="text-terra-500 font-bold text-lg mt-1">99 AUD</p>
                  </th>
                  <th className="pb-4 pt-8 px-4 text-center w-1/5 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-terra-500 text-ocean-600 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap shadow-lg shadow-amber-500/30 z-10">
                      <Star className="w-3 h-3 fill-slate-900" />{t.packages.ready.badge}
                    </div>
                    <div className="bg-ocean-600 rounded-2xl py-3 px-2 inline-block w-full">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">Pack 2</p>
                      <p className="font-bold text-white text-base" style={{ fontFamily: "var(--font-display)" }}>Melbourne Ready</p>
                      <p className="text-terra-300 font-bold text-lg mt-1">299 AUD</p>
                    </div>
                  </th>
                  <th className="pb-4 pt-2 px-4 text-center w-1/5">
                    <p className="text-xs font-bold uppercase tracking-widest text-ocean-400/50 mb-1">Pack 3</p>
                    <p className="font-bold text-ocean-600 text-base" style={{ fontFamily: "var(--font-display)" }}>Melbourne Arrival</p>
                    <p className="text-terra-500 font-bold text-lg mt-1">899 AUD</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.comparison.rows.map((row,i) => (
                  <tr key={i} className={i%2===0?"bg-slate-50/60":"bg-sand-100"}>
                    <td className="py-3 pr-6 text-ocean-400 text-sm font-medium pl-2 rounded-l-xl">{row.label}</td>
                    <td className="py-3 px-4 text-center">
                      {row.starter===true?<Check className="w-5 h-5 text-emerald-500 mx-auto" />:
                       row.starter===false?<span className="block w-4 h-0.5 bg-slate-200 mx-auto rounded" />:
                       <span className="text-xs font-bold text-terra-500 bg-sand-50 px-2 py-0.5 rounded-full border border-sand-200">{row.starter}</span>}
                    </td>
                    <td className="py-3 px-4 text-center bg-ocean-600/5 border-x border-slate-900/5">
                      {row.ready===true?<Check className="w-5 h-5 text-terra-400 mx-auto" />:
                       row.ready===false?<span className="block w-4 h-0.5 bg-slate-300 mx-auto rounded" />:
                       <span className="text-xs font-bold text-terra-400 bg-sand-50 px-2 py-0.5 rounded-full border border-sand-200">{row.ready}</span>}
                    </td>
                    <td className="py-3 px-4 text-center rounded-r-xl">
                      {row.arrival===true?<Check className="w-5 h-5 text-emerald-500 mx-auto" />:
                       row.arrival===false?<span className="block w-4 h-0.5 bg-slate-200 mx-auto rounded" />:
                       <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">{row.arrival}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-ocean-400/15 text-ocean-400 font-bold text-xs uppercase tracking-wide px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all text-center">
              <MessageCircle className="w-4 h-4 text-terra-400 shrink-0" />{t.comparison.ctaStarter}
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-terra-500 hover:bg-terra-400 text-ocean-600 font-bold text-xs uppercase tracking-wide px-4 py-3 rounded-2xl transition-all shadow-lg shadow-amber-500/20 btn-shine text-center">
              <MessageCircle className="w-4 h-4 shrink-0" />{t.comparison.ctaReady}
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-ocean-400/15 text-ocean-400 font-bold text-xs uppercase tracking-wide px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all text-center">
              <MessageCircle className="w-4 h-4 text-terra-400 shrink-0" />{t.comparison.ctaArrival}
            </a>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mx-5" />

      {/* MELBOURNE ARRIVAL HIGHLIGHT */}
      <section className="relative py-24 overflow-hidden bg-ocean-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.08)_0%,transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[.2em] text-terra-300 bg-terra-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full mb-4">
                {t.arrivalHighlight.badge}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                {t.arrivalHighlight.title}
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-4">{t.arrivalHighlight.body}</p>
              <p className="text-amber-300 font-semibold text-lg mb-8 italic">{t.arrivalHighlight.tagline}</p>
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-terra-500 hover:bg-terra-400 text-ocean-600 font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20 btn-shine">
                <MessageCircle className="w-5 h-5" />{t.arrivalHighlight.cta}
              </a>
            </div>
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)]">
              <img src="https://images.unsplash.com/photo-1545044846-351ba102b6d5?q=80&w=1200&auto=format&fit=crop"
                alt="Melbourne CBD skyline" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass-white rounded-2xl px-5 py-4">
                <p className="text-ocean-600 font-bold text-sm mb-0.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />Melbourne Arrival
                </p>
                <p className="text-ocean-400/70 text-xs">{lang==="FR"?"7 nuits hostel incluses · Transfert aéroport · Carte SIM":"7 nights hostel included · Airport transfer · SIM card"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
