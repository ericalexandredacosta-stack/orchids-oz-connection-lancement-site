"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { translations, type Language } from "@/lib/translations";
import { GridPattern } from "@/components/grid-pattern";
import { MagicCard } from "@/components/magic-card";
import { Spotlight } from "@/components/spotlight";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import {
  MessageCircle, Mail, Globe, Sun,
  MapPin, Star, Quote, CheckCircle2, ShieldCheck,
  Briefcase, Home, Car, GraduationCap, FileCheck, Compass,
  Check, X, ArrowDown, Users, Clock, Zap,
} from "lucide-react";

/* ─── Hero images ─── */
const heroImages = [
  { url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1920&auto=format&fit=crop", loc: "Sydney" },
  { url: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?q=80&w=1920&auto=format&fit=crop", loc: "Victoria" },
  { url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1920&auto=format&fit=crop", loc: "Northern Territory" },
  { url: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?q=80&w=1920&auto=format&fit=crop", loc: "Bondi Beach" },
];

/* ─── Chapter config ─── */
type Chapter = { id: string; labelFR: string; labelEN: string; orb: string; accent: string };
const CHAPTERS: Chapter[] = [
  { id: "hero",    labelFR: "Accueil",     labelEN: "Home",      orb: "rgba(245,158,11,0.13)",  accent: "#f59e0b" },
  { id: "arrive",  labelFR: "Arrivée",     labelEN: "Arrival",   orb: "rgba(245,158,11,0.10)",  accent: "#f59e0b" },
  { id: "jobs",    labelFR: "Jobs",        labelEN: "Jobs",      orb: "rgba(16,185,129,0.10)",   accent: "#10b981" },
  { id: "install", labelFR: "S'installer", labelEN: "Settle in", orb: "rgba(249,115,22,0.10)",   accent: "#f97316" },
  { id: "visa",    labelFR: "Visa",        labelEN: "Visa",      orb: "rgba(99,102,241,0.10)",   accent: "#6366f1" },
  { id: "about",   labelFR: "À propos",    labelEN: "About",     orb: "rgba(245,158,11,0.08)",   accent: "#f59e0b" },
  { id: "contact", labelFR: "Contact",     labelEN: "Contact",   orb: "rgba(245,158,11,0.12)",   accent: "#f59e0b" },
];

/* ─── Reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ─── Main ─── */
export default function OZConnectionPage() {
  const wa    = "https://wa.me/+61494652991";
  const email = "mailto:contact@ozconnection.com";

  const [lang, setLang]       = useState<Language>("EN");
  const [slide, setSlide]     = useState(0);
  const [autoplay, setAuto]   = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const t = translations[lang];
  const serviceIcons = [FileCheck, GraduationCap, Briefcase, Home, Car, Compass];

  /* lang */
  useEffect(() => {
    const s = localStorage.getItem("language") as Language;
    if (s === "FR" || s === "EN") setLang(s);
  }, []);
  const toggleLang = () => {
    const n = lang === "FR" ? "EN" : "FR";
    setLang(n); localStorage.setItem("language", n);
  };

  /* hero */
  const nextSlide = useCallback(() => setSlide(p => (p + 1) % heroImages.length), []);
  const prevSlide = useCallback(() => setSlide(p => (p - 1 + heroImages.length) % heroImages.length), []);
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(nextSlide, 5500);
    return () => clearInterval(id);
  }, [autoplay, nextSlide]);

  /* scroll → orb + progress + active chapter */
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? window.scrollY / total : 0;
      setProgress(ratio * 100);
      setScrolled(window.scrollY > 60);

      /* active chapter */
      let found = 0;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) { found = i; break; }
      }
      setActiveIdx(found);

      /* update CSS custom props for orb (no re-render) */
      const root = document.documentElement;
      root.style.setProperty("--orb-y", `${10 + ratio * 80}%`);
      root.style.setProperty("--orb-color", CHAPTERS[found].orb);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* story copy */
  const story = {
    FR: {
      ch1: { eyebrow: "01 — Tu arrives", h: "Perdu dès le premier jour ?", sub: "C'est normal. C'est là qu'on intervient.", body: "Décalage horaire, paperasse, logement à trouver... Arriver sans réseau peut vite devenir un cauchemar. OZ Connection, c'est le contact qu'on aurait voulu avoir à notre arrivée." },
      ch2: { eyebrow: "02 — Tu veux travailler", h: "On te connecte au bon réseau.", sub: "Pas un CV dans le vide. De vraies connexions locales.", body: "Trouver un job en Australie ça ne marche pas comme en France. Il faut le bon réseau et la bonne approche. On te partage ce qu'on sait, les contacts qui comptent, et on t'aide à éviter les erreurs classiques." },
      ch3: { eyebrow: "03 — Tu t'installes", h: "Melbourne devient ta ville.", sub: "Logement, transport, quotidien — pour poser vraiment les valises.", body: "Un appartement sans arnaque, un scooter pour explorer, les bonnes adresses... S'installer pour de vrai c'est plus qu'un visa. On te guide sur le terrain qu'on connaît." },
      ch4: { eyebrow: "04 — Tu veux rester", h: "Ton visa se termine. Et alors ?", sub: "Ce n'est pas une fin. Ça peut être un nouveau départ.", body: "Visa étudiant, travailleur qualifié, partenariat... Des solutions existent. On ne fait pas les visas nous-mêmes, mais on te connecte à notre agent partenaire MARA." },
    },
    EN: {
      ch1: { eyebrow: "01 — You arrive", h: "Lost from day one?", sub: "That's normal. That's exactly where we come in.", body: "Jet lag, paperwork, finding housing... Arriving without a network can quickly turn into a nightmare. OZ Connection is the contact we wish we'd had when we first landed." },
      ch2: { eyebrow: "02 — You want to work", h: "We connect you to the right network.", sub: "Not a CV thrown into the void. Real local connections.", body: "Finding a job in Australia doesn't work the same as back home. You need the right network and approach. We share what we know, the contacts that matter, and help you avoid classic mistakes." },
      ch3: { eyebrow: "03 — You settle in", h: "Melbourne becomes your city.", sub: "Housing, transport, daily life — everything to truly settle.", body: "An apartment without scams, a scooter to explore, the best local spots... Truly settling in is more than a visa. We guide you on terrain we know well." },
      ch4: { eyebrow: "04 — You want to stay", h: "Your visa ends. So what?", sub: "It's not the end. It could be a new beginning.", body: "Student visa, skilled worker, partner visa... Solutions exist. We don't do visas ourselves, but we connect you with our MARA partner agent." },
    }
  };
  const S = story[lang];

  /* reveal refs */
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(),
        r4 = useReveal(), r5 = useReveal(), r6 = useReveal(), r7 = useReveal();

  const accent = CHAPTERS[activeIdx].accent;

  return (
    <div className="min-h-screen bg-white relative">

      {/* ── Ambient orb (position driven by CSS vars, zero re-render) ── */}
      <div id="ambient-orb" aria-hidden="true" />

      {/* ── Scroll progress ── */}
      <div id="progress-bar" style={{ width: `${progress}%` }} />

      {/* ── Chapter timeline (desktop left) ── */}
      <div id="chapter-timeline" aria-hidden="true">
        {CHAPTERS.map((ch, i) => (
          <div key={ch.id}>
            <div className={`stop ${activeIdx === i ? "active" : ""}`} onClick={() => scrollTo(ch.id)}>
              <div className="dot" style={activeIdx === i ? { borderColor: ch.accent, background: ch.accent } : {}} />
              <span className="label" style={activeIdx === i ? { color: ch.accent } : {}}>
                {lang === "FR" ? ch.labelFR : ch.labelEN}
              </span>
            </div>
            {i < CHAPTERS.length - 1 && (
              <div className="line">
                <div style={{ height: activeIdx > i ? "100%" : "0%", background: ch.accent, width: "100%", transition: "height .5s ease" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          NAV
      ══════════════════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)] py-3" : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <span className={`font-black text-lg tracking-tight transition-colors duration-300 ${scrolled ? "text-slate-900" : "text-white"}`} style={{ fontFamily: "Outfit, sans-serif" }}>
              OZ <span className="text-amber-500">Connection</span>
            </span>
          </button>

          <div className="flex items-center gap-3">
            <button onClick={toggleLang} className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black border transition-all ${
              scrolled ? "border-slate-200 text-slate-700 hover:bg-slate-50" : "border-white/25 text-white/80 hover:bg-white/10"
            }`}>
              <Globe className="w-3.5 h-3.5" />{lang === "FR" ? "EN" : "FR"}
            </button>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md shadow-amber-500/20 btn-shine">
              <MessageCircle className="w-4 h-4" />
              {lang === "FR" ? "Nous contacter" : "Contact us"}
            </a>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO — dark, images CSS-crossfade
      ══════════════════════════════════════════ */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-[#080c16]">
        {heroImages.map((img, i) => (
          <div key={i} className={`hero-slide${i === slide ? " active" : ""}`}
            style={{ backgroundImage: `url(${img.url})` }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c16]/55 via-[#080c16]/25 to-[#080c16]/85 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-5 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [.22, 1, .36, 1], delay: .2 }}
          >
            <h1 className="text-6xl sm:text-8xl lg:text-[7rem] font-black text-white leading-[.9] tracking-tight mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>
              {lang === "FR"
                ? <><span className="shimmer">Parce qu'on est</span><br />déjà passé par là.</>
                : <><span className="shimmer">Because we've</span><br />been there too.</>}
            </h1>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-slate-900 font-black text-sm uppercase tracking-wide px-8 py-4 rounded-2xl shadow-xl shadow-black/20 hover:bg-amber-50 transition-colors btn-shine">
              <MessageCircle className="w-5 h-5 text-emerald-500" />
              {lang === "FR" ? "Nous contacter" : "Get in touch"}
            </a>
          </motion.div>
        </div>

        {/* Slide dots only */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => { setSlide(i); setAuto(false); }}
              className={`rounded-full transition-all duration-500 ${i === slide ? "w-8 h-1.5 bg-amber-500" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`} />
          ))}
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 right-6 z-30">
          <button onClick={() => scrollTo("arrive")} className="flex flex-col items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="bg-amber-500 py-4 overflow-hidden relative z-10">
        <div className="flex marquee whitespace-nowrap">
          {[...Array(4)].map((_, ri) => (
            <div key={ri} className="flex items-center gap-8 mr-8 shrink-0">
              {(lang === "FR"
                ? ["Arrivée & Orientation", "Jobs & Réseau", "Logement", "Transport & Scooter", "Visa & Migration", "Installation longue durée"]
                : ["Arrival & Orientation", "Jobs & Network", "Housing", "Transport & Scooter", "Visa & Migration", "Long-term Settlement"]
              ).map((item, i) => (
                <span key={i} className="flex items-center gap-3 text-slate-900 font-black text-sm uppercase tracking-widest">
                  <span className="w-1 h-1 rounded-full bg-slate-900/40" />{item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CHAPTER 1 — ARRIVÉE
      ══════════════════════════════════════════ */}
      <section id="arrive" className="relative py-28 overflow-hidden bg-white">
        <span className="watermark text-amber-500">01</span>
        <div className="max-w-7xl mx-auto px-5 relative z-10" ref={r1}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="reveal text-xs font-black uppercase tracking-[.25em] text-amber-500 mb-4">{S.ch1.eyebrow}</p>
              <h2 className="reveal reveal-delay-1 text-4xl sm:text-6xl font-black text-slate-900 leading-[.96] tracking-tight mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                {S.ch1.h}
              </h2>
              <p className="reveal reveal-delay-2 text-lg text-amber-600 font-semibold mb-5 chapter-accent-left" style={{ borderColor: "#f59e0b" }}>{S.ch1.sub}</p>
              <p className="reveal reveal-delay-2 text-slate-500 text-lg leading-relaxed mb-10">
                <TextGenerateEffect text={S.ch1.body} />
              </p>
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="reveal reveal-delay-3 inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-sm uppercase tracking-wide px-8 py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20 btn-shine">
                <MessageCircle className="w-5 h-5" />
                {lang === "FR" ? "On discute ?" : "Let's talk"}
              </a>
            </div>
            <div className="reveal reveal-delay-2 grid grid-cols-2 gap-4">
              {[
                { icon: Clock, title: lang === "FR" ? "Réponse sous 24h" : "Reply within 24h",      sub: lang === "FR" ? "On est là"            : "We're here" },
                { icon: MapPin, title: lang === "FR" ? "À Melbourne"      : "In Melbourne",          sub: lang === "FR" ? "Sur le terrain"        : "On the ground" },
                { icon: Users, title: lang === "FR" ? "Équipe locale"     : "Local team",            sub: lang === "FR" ? "8 ans d'expérience"    : "8 years experience" },
                { icon: Zap,   title: lang === "FR" ? "1er échange gratuit" : "Free first chat",     sub: lang === "FR" ? "Sans engagement"       : "No commitment" },
              ].map(({ icon: Icon, title, sub }, i) => (
                <div key={i} className="card-lift bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-black text-slate-900 text-sm leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>{title}</p>
                  <p className="text-slate-400 text-xs mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── thin divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mx-5" />

      {/* ══════════════════════════════════════════
          CHAPTER 2 — JOBS
      ══════════════════════════════════════════ */}
      <section id="jobs" className="relative py-28 overflow-hidden section-alt">
        <GridPattern className="text-emerald-600" opacity={0.06} width={56} height={56} />
        <span className="watermark text-emerald-500">02</span>
        <div className="max-w-7xl mx-auto px-5 relative z-10" ref={r2}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal order-last lg:order-first">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)]">
                <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop"
                  alt="Team at work" loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute bottom-6 left-6 glass-white rounded-2xl px-4 py-3">
                  <p className="text-slate-900 font-black text-sm">🌿 Melbourne CBD</p>
                  <p className="text-slate-500 text-xs">{lang === "FR" ? "Réseau local actif" : "Active local network"}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="reveal text-xs font-black uppercase tracking-[.25em] text-emerald-600 mb-4">{S.ch2.eyebrow}</p>
              <h2 className="reveal reveal-delay-1 text-4xl sm:text-6xl font-black text-slate-900 leading-[.96] tracking-tight mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                {S.ch2.h}
              </h2>
              <p className="reveal reveal-delay-2 text-lg text-emerald-600 font-semibold mb-5 chapter-accent-left" style={{ borderColor: "#10b981" }}>{S.ch2.sub}</p>
              <p className="reveal reveal-delay-2 text-slate-500 text-lg leading-relaxed mb-8">
                <TextGenerateEffect text={S.ch2.body} />
              </p>
              <div className="reveal reveal-delay-3 space-y-3 mb-10">
                {(lang === "FR"
                  ? ["Conseils personnalisés pour ta recherche d'emploi", "Mise en relation avec notre réseau local à Melbourne", "Infos sur les secteurs qui recrutent en ce moment"]
                  : ["Personalised job search advice", "Introductions to our local Melbourne network", "Info on sectors currently hiring"]
                ).map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />{item}
                  </div>
                ))}
              </div>
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="reveal reveal-delay-4 inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wide px-8 py-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 btn-shine">
                <MessageCircle className="w-5 h-5" />
                {lang === "FR" ? "Trouver un job" : "Find a job"}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mx-5" />

      {/* ══════════════════════════════════════════
          CHAPTER 3 — S'INSTALLER
      ══════════════════════════════════════════ */}
      <section id="install" className="relative py-28 overflow-hidden bg-white">
        <span className="watermark text-orange-400">03</span>
        <div className="max-w-7xl mx-auto px-5 relative z-10" ref={r3}>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="reveal text-xs font-black uppercase tracking-[.25em] text-orange-500 mb-4">{S.ch3.eyebrow}</p>
            <h2 className="reveal reveal-delay-1 text-4xl sm:text-6xl font-black text-slate-900 leading-[.96] tracking-tight mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
              {S.ch3.h}
            </h2>
            <p className="reveal reveal-delay-2 text-lg text-orange-600 font-semibold mb-5">{S.ch3.sub}</p>
            <p className="reveal reveal-delay-2 text-slate-500 text-lg leading-relaxed">
              <TextGenerateEffect text={S.ch3.body} />
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.services.items.map((item, i) => {
              const Icon = serviceIcons[i];
              return (
                <MagicCard
                  key={i}
                  spotlightColor="rgba(249, 115, 22, 0.18)"
                  borderGradient="rgba(249, 115, 22, 0.55)"
                  className={`reveal card-lift bg-white rounded-[2rem] border border-slate-100 shadow-sm reveal-delay-${Math.min(i + 1, 4)}`}
                >
                  <div className="p-8">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-black text-slate-900 text-xl mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </MagicCard>
              );
            })}
          </div>
          <div className="reveal reveal-delay-4 text-center mt-12">
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-400 text-white font-black text-sm uppercase tracking-wide px-8 py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/20 btn-shine">
              <MessageCircle className="w-5 h-5" />
              {lang === "FR" ? "S'installer" : "Settle in"}
            </a>
          </div>
          <div className="reveal mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-100 flex gap-3 items-start max-w-3xl mx-auto">
            <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <p className="text-slate-400 text-sm leading-relaxed">{t.services.disclaimer}</p>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mx-5" />

      {/* ══════════════════════════════════════════
          CHAPTER 4 — VISA
      ══════════════════════════════════════════ */}
      <section id="visa" className="relative py-28 overflow-hidden section-alt">
        <GridPattern className="text-indigo-500" opacity={0.05} width={48} height={48} />
        <span className="watermark text-indigo-400">04</span>
        <div className="max-w-7xl mx-auto px-5 relative z-10" ref={r4}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="reveal text-xs font-black uppercase tracking-[.25em] text-indigo-500 mb-4">{S.ch4.eyebrow}</p>
              <h2 className="reveal reveal-delay-1 text-4xl sm:text-6xl font-black text-slate-900 leading-[.96] tracking-tight mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                {S.ch4.h}
              </h2>
              <p className="reveal reveal-delay-2 text-lg text-indigo-600 font-semibold mb-5 chapter-accent-left" style={{ borderColor: "#6366f1" }}>{S.ch4.sub}</p>
              <p className="reveal reveal-delay-2 text-slate-500 text-lg leading-relaxed mb-8">
                <TextGenerateEffect text={S.ch4.body} />
              </p>
              <div className="reveal reveal-delay-3 flex flex-wrap gap-2.5 mb-10">
                {(lang === "FR"
                  ? ["Visa étudiant", "Travailleur qualifié", "Visa partenaire", "Working Holiday", "Visa tourisme"]
                  : ["Student visa", "Skilled worker", "Partner visa", "Working Holiday", "Tourist visa"]
                ).map((v, i) => (
                  <span key={i} className="bg-indigo-50 text-indigo-700 text-xs font-bold px-4 py-2 rounded-full border border-indigo-100">{v}</span>
                ))}
              </div>
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="reveal reveal-delay-4 inline-flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm uppercase tracking-wide px-8 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 btn-shine">
                <MessageCircle className="w-5 h-5" />
                {lang === "FR" ? "Explorer mes options" : "Explore my options"}
              </a>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-square shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)]">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
                  alt="Visa documents" loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 glass-white rounded-2xl px-5 py-4">
                  <p className="text-slate-900 font-black text-sm mb-0.5">{lang === "FR" ? "Agent partenaire MARA" : "MARA Partner Agent"}</p>
                  <p className="text-slate-500 text-xs">{lang === "FR" ? "Enregistré officiellement · Melbourne" : "Officially registered · Melbourne"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mx-5" />

      {/* ══════════════════════════════════════════
          ABOUT — PAUL
      ══════════════════════════════════════════ */}
      <section id="about" className="relative py-28 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-5 relative z-10" ref={r5}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop"
                  alt="Paul and team" loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl border-2 border-amber-400 overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" alt="Paul" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Paul</p>
                    <p className="text-amber-400 text-xs uppercase tracking-widest font-bold">Founder · 8 years in Oz</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="reveal text-xs font-black uppercase tracking-[.25em] text-amber-500 mb-4">{t.paul.badge}</p>
              <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
                {t.paul.title} <span className="shimmer">{t.paul.titleAccent}</span>
              </h2>
              <div className="space-y-4 text-slate-500 text-lg leading-relaxed mb-8">
                <p className="reveal reveal-delay-1 font-bold text-slate-900 text-xl">{t.paul.greeting}</p>
                <p className="reveal reveal-delay-2">{t.paul.p1}</p>
                <p className="reveal reveal-delay-2">{t.paul.p2}</p>
                <div className="reveal reveal-delay-3 border-l-4 border-amber-400 pl-5 py-1">
                  <p className="italic text-slate-600">{t.paul.p3}</p>
                </div>
              </div>
              <div className="reveal reveal-delay-4 grid sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-800 font-black text-xs uppercase tracking-wider">{t.paul.whatWeDo}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{t.paul.whatWeDoDesc}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <X className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 font-black text-xs uppercase tracking-wider">{t.paul.whatWeDontDo}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{t.paul.whatWeDontDoDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mx-5" />

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section id="temoignages" className="relative py-24 overflow-hidden section-alt">
        <div className="max-w-7xl mx-auto px-5 relative z-10" ref={r6}>
          <div className="text-center mb-14">
            <p className="reveal text-xs font-black uppercase tracking-[.25em] text-amber-500 mb-4">{t.testimonials.badge}</p>
            <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
              {t.testimonials.title} <span className="shimmer">{t.testimonials.titleAccent}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => (
              <MagicCard
                key={i}
                spotlightColor="rgba(245, 158, 11, 0.16)"
                borderGradient="rgba(245, 158, 11, 0.55)"
                className={`reveal card-lift bg-white rounded-[2rem] border border-slate-100 shadow-sm reveal-delay-${i + 1}`}
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <Quote className="w-8 h-8 text-amber-100 mb-3" />
                  <p className="text-slate-500 italic text-base leading-relaxed flex-grow mb-6">&ldquo;{item.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-50">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-black text-sm">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">{item.name}</p>
                      <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-400" />{item.origin ?? "Australia"}
                      </p>
                    </div>
                  </div>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mx-5" />

      {/* ══════════════════════════════════════════
          PARENTS
      ══════════════════════════════════════════ */}
      <section id="parents" className="relative py-24 overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto px-5 relative z-10" ref={r7}>
          <div className="reveal bg-gradient-to-br from-amber-50 to-orange-50 rounded-[3rem] p-12 sm:p-16 text-center border border-amber-100 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-amber-200/20 pointer-events-none" />
            <p className="text-xs font-black uppercase tracking-[.25em] text-amber-600 mb-5">{t.parents.badge}</p>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5 relative z-10" style={{ fontFamily: "Outfit, sans-serif" }}>
              {t.parents.title} <span className="shimmer">{t.parents.titleAccent}</span>
            </h2>
            <p className="text-slate-900 font-bold text-xl mb-4 max-w-xl mx-auto">{t.parents.p1}</p>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">{t.parents.p2}</p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {t.parents.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/70 px-4 py-2.5 rounded-full border border-amber-100 text-slate-700 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />{f}
                </div>
              ))}
            </div>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-amber-500 text-white font-black text-sm uppercase tracking-wide px-8 py-4 rounded-2xl transition-all shadow-lg btn-shine">
              <MessageCircle className="w-5 h-5" />{t.parents.cta}
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="relative bg-slate-950 py-36 overflow-hidden text-center">
        <Spotlight className="-top-40 left-0 md:-left-32 md:-top-20 h-[140%] w-[140%]" fill="#f59e0b" />
        <Spotlight className="bottom-0 right-0 h-[80%] w-[80%]" fill="#f97316" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1)_0%,transparent_65%)]" />
        <div className="max-w-3xl mx-auto px-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8, ease: [.22, 1, .36, 1] }}
          >
            <p className="text-amber-400 text-xs font-black uppercase tracking-[.25em] mb-8">
              {lang === "FR" ? "On est là pour toi" : "We're here for you"}
            </p>
            <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tighter leading-[.9] mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>
              {t.contact.title}<br /><span className="shimmer">{t.contact.titleAccent}</span>
            </h2>
            <p className="text-white/40 text-xl mb-12 leading-relaxed">{t.contact.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 font-black text-sm uppercase tracking-wide px-10 py-5 rounded-2xl hover:bg-amber-50 transition-colors btn-shine shadow-[0_0_40px_rgba(255,255,255,.06)]">
                <MessageCircle className="w-5 h-5 text-emerald-500" />
                {lang === "FR" ? "Parler à Paul" : "Talk to Paul"}
              </a>
              <a href={email}
                className="inline-flex items-center justify-center gap-3 border border-white/10 text-white font-black text-sm uppercase tracking-wide px-10 py-5 rounded-2xl hover:bg-white/5 transition-colors">
                <Mail className="w-5 h-5" />Email
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-8 opacity-35">
              {t.contact.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                  <span className="w-1 h-1 rounded-full bg-amber-500" />{f}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#060810] py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Sun className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-black text-base" style={{ fontFamily: "Outfit, sans-serif" }}>
              OZ <span className="text-amber-500">Connection</span>
            </span>
          </div>
          <p className="text-white/25 text-xs uppercase tracking-widest">{t.footer.copyright} · Melbourne</p>
          <div className="flex gap-5 flex-wrap justify-center">
            {[["arrive", lang === "FR" ? "Arrivée" : "Arrival"], ["jobs", "Jobs"], ["install", lang === "FR" ? "Installer" : "Settle"], ["visa", "Visa"], ["about", lang === "FR" ? "À propos" : "About"], ["contact", "Contact"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-white/25 hover:text-amber-400 text-xs uppercase tracking-wider font-bold transition-colors">
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
