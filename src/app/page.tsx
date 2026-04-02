"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { translations, type Language } from "@/lib/translations";
import {
  Briefcase,
  FileCheck,
  Home,
  Shield,
  Heart,
  CheckCircle2,
  MapPin,
  Mail,
  ChevronRight,
  ChevronLeft,
  Star,
  MessageCircle,
  Quote,
  Globe,
  Sun,
  GraduationCap,
  Car,
  Compass,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
  Coffee,
  Phone,
} from "lucide-react";

const heroImages = [
  { url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop", title: { FR: "Opéra de Sydney", EN: "Sydney Opera House" }, location: "Sydney" },
  { url: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?q=80&w=2070&auto=format&fit=crop", title: { FR: "Great Ocean Road", EN: "Great Ocean Road" }, location: "Victoria" },
  { url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2130&auto=format&fit=crop", title: { FR: "Uluru au coucher du soleil", EN: "Uluru at sunset" }, location: "Northern Territory" },
  { url: "https://images.unsplash.com/photo-1494233892892-84542a694e72?q=80&w=2070&auto=format&fit=crop", title: { FR: "Grande Barrière de Corail", EN: "Great Barrier Reef" }, location: "Queensland" },
  { url: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?q=80&w=2074&auto=format&fit=crop", title: { FR: "Plage de Bondi", EN: "Bondi Beach" }, location: "Sydney" },
];

const navLinks = [
  { href: "#accueil", key: "accueil" },
  { href: "#paul", key: "paul" },
  { href: "#comment", key: "comment" },
  { href: "#services", key: "services" },
  { href: "#temoignages", key: "temoignages" },
  { href: "#parents", key: "parents" },
  { href: "#contact", key: "contact" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

/* ─── Magnetic Card Hook ─── */
function useMagneticCard() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  };
  return { ref, handleMouseMove, handleMouseLeave };
}

export default function OZConnectionPage() {
  const whatsappLink = "https://wa.me/+61494652991";
  const emailLink = "mailto:contact@ozconnection.com";

  const [activeSection, setActiveSection] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [language, setLanguage] = useState<Language>("EN");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorRingPos, setCursorRingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  const t = translations[language];
  const serviceIcons = [FileCheck, GraduationCap, Briefcase, Home, Car, Compass];

  // Cursor — both dot and ring use the same lerped position so dot stays centered in ring
  useEffect(() => {
    let lerpX = -100, lerpY = -100;
    let targetX = -100, targetY = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const loop = () => {
      lerpX += (targetX - lerpX) * 0.18;
      lerpY += (targetY - lerpY) * 0.18;
      setCursorRingPos({ x: lerpX, y: lerpY });
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const interactives = document.querySelectorAll("a, button, [data-hover]");
    const on = () => setIsHovering(true);
    const off = () => setIsHovering(false);
    interactives.forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    return () => interactives.forEach(el => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); });
  });

  // Language
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved === "FR" || saved === "EN") setLanguage(saved);
  }, []);

  const toggleLanguage = () => {
    const next = language === "FR" ? "EN" : "FR";
    setLanguage(next);
    localStorage.setItem("language", next);
  };

  // Hero carousel
  const nextImage = useCallback(() => setCurrentImageIndex(p => (p + 1) % heroImages.length), []);
  const prevImage = useCallback(() => setCurrentImageIndex(p => (p - 1 + heroImages.length) % heroImages.length), []);
  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(nextImage, 6000);
    return () => clearInterval(id);
  }, [isAutoPlaying, nextImage]);

  // Scroll
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
      setScrolled(window.scrollY > 50);
      const sections = [...navLinks].map(l => l.href.substring(1)).reverse();
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.substring(1));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ── Custom Cursor ── */}
      <div
        id="oz-cursor"
        className={isHovering ? "hovering" : ""}
        style={{ left: cursorRingPos.x, top: cursorRingPos.y }}
      />
      <div
        id="oz-cursor-ring"
        className={isHovering ? "hovering" : ""}
        style={{ left: cursorRingPos.x, top: cursorRingPos.y }}
      />

      {/* ── Scroll Progress Bar ── */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* ══════════════════════════════ NAV ══════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 bg-white/85 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.05)]" : "py-6 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#accueil" onClick={e => scrollToSection(e, "#accueil")} className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/50 transition-all duration-500 group-hover:rotate-6 animate-pulse-glow">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className={`font-black text-xl tracking-tight transition-colors duration-500 ${scrolled ? "text-slate-900" : "text-white"}`} style={{ fontFamily: "Outfit, sans-serif" }}>
                  OZ <span className="text-amber-500">Connection</span>
                </span>
                <p className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${scrolled ? "text-slate-400" : "text-white/60"}`}>
                  {t.footer.tagline}
                </p>
              </div>
            </a>

            {/* Nav links */}
            <div className={`hidden lg:flex items-center gap-1 p-1 rounded-full transition-all duration-500 ${scrolled ? "bg-slate-100/70" : "bg-white/10 backdrop-blur-md"}`}>
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => scrollToSection(e, link.href)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 reveal-line ${
                    activeSection === link.href.substring(1)
                      ? "bg-white text-slate-900 shadow-sm active"
                      : scrolled ? "text-slate-600 hover:text-amber-600 hover:bg-white/50" : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all duration-500 border ${
                  scrolled ? "border-slate-200 text-slate-900 hover:bg-slate-50" : "border-white/20 text-white hover:bg-white/10 backdrop-blur-md"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === "FR" ? "EN" : "FR"}</span>
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-all duration-500 shadow-lg btn-shine"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Carousel */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 scale-110 transition-transform duration-[12000ms] ease-linear hover:scale-105"
                style={{ backgroundImage: `url('${heroImages[currentImageIndex].url}')`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/75 via-slate-950/40 to-slate-950/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating orbs */}
        <div className="orb w-[500px] h-[500px] bg-amber-500/15 top-1/4 -left-32 animate-float" style={{ animationDelay: "0s" }} />
        <div className="orb w-[400px] h-[400px] bg-orange-500/10 bottom-1/4 -right-32 animate-float" style={{ animationDelay: "3s" }} />
        <div className="orb w-[300px] h-[300px] bg-amber-400/10 top-1/2 left-1/2 animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-10 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase tracking-[0.25em] mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                On-the-ground support since 2016
              </motion.span>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter" style={{ fontFamily: "Outfit, sans-serif" }}>
                {t.hero.title}
                <br />
                <span className="text-shimmer">{t.hero.titleAccent}</span>
              </h1>

              <p className="text-xl sm:text-2xl text-white/85 font-medium mb-12 leading-relaxed max-w-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
                {t.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-20">
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.25)] transition-all btn-shine"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <MessageCircle className="w-5 h-5 text-emerald-500" />
                  {t.hero.ctaWhatsapp}
                </motion.a>
                <motion.a
                  href="#comment"
                  onClick={e => scrollToSection(e, "#comment")}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl text-white border border-white/25 px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all hover:bg-white/20"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t.hero.ctaPacks}
                  <ChevronRight className="w-5 h-5" />
                </motion.a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-8 sm:gap-16">
                {[
                  { value: "8+", label: language === "FR" ? "Ans en Australie" : "Years in Oz" },
                  { value: "100%", label: language === "FR" ? "Conseil humain" : "Human advice" },
                  { value: "24h", label: language === "FR" ? "Temps de réponse" : "Response time" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex flex-col"
                  >
                    <span className="text-white font-black text-3xl leading-none" style={{ fontFamily: "Outfit, sans-serif" }}>{stat.value}</span>
                    <span className="text-white/50 text-[10px] uppercase font-bold tracking-widest mt-1">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-10 right-4 sm:right-10 z-20 flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentImageIndex(i); setIsAutoPlaying(false); }}
                className={`transition-all duration-500 rounded-full ${i === currentImageIndex ? "w-10 h-2 bg-amber-500" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => { prevImage(); setIsAutoPlaying(false); }} className="w-11 h-11 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-500">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => { nextImage(); setIsAutoPlaying(false); }} className="w-11 h-11 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-500">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Location tag */}
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-10 left-4 sm:left-10 z-20 flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          {heroImages[currentImageIndex].title[language]} — {heroImages[currentImageIndex].location}
        </motion.div>
      </section>

      {/* ── Marquee Band ── */}
      <div className="py-5 bg-amber-500 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, ri) => (
            <div key={ri} className="flex items-center gap-8 mr-8">
              {(language === "FR"
                ? ["Visa & Migration", "Jobs & Connexions", "Logement", "Études & Écoles", "Transport & Scooter", "Installation longue durée", "Support humain 24h"]
                : ["Visa & Migration", "Jobs & Connections", "Housing", "Schools & Studies", "Transport & Scooter", "Long-term Settlement", "Human Support 24h"]
              ).map((item, i) => (
                <span key={i} className="flex items-center gap-4 text-slate-900 font-black text-sm uppercase tracking-[0.2em]" style={{ fontFamily: "Inter, sans-serif" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900/40" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════ PAUL / ABOUT ══════════════════════════════ */}
      <section id="paul" className="py-28 sm:py-36 bg-white relative overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="orb w-96 h-96 bg-amber-400/8 top-0 right-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Visual */}
            <motion.div {...fadeInLeft} className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.12)] group card-tilt">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                  alt="Paul and backpackers"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl border-2 border-amber-400 overflow-hidden shadow-xl">
                      <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" alt="Paul" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xl" style={{ fontFamily: "Outfit, sans-serif" }}>Paul</h4>
                      <p className="text-amber-400 text-[10px] uppercase font-bold tracking-widest">Founder · 8 years in Oz</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] hidden sm:flex items-center gap-4 border border-slate-50"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                  <Zap className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-slate-900 font-black text-2xl leading-none" style={{ fontFamily: "Outfit, sans-serif" }}>24h</div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">First Response</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div {...fadeInRight} className="lg:col-span-7">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                {t.paul.badge}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                {t.paul.title} <span className="text-shimmer">{t.paul.titleAccent}</span>
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed mb-10" style={{ fontFamily: "Inter, sans-serif" }}>
                <p className="text-slate-900 font-bold text-xl leading-snug">{t.paul.greeting}</p>
                <p>{t.paul.p1}</p>
                <p>{t.paul.p2}</p>
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500 rounded-l-3xl" />
                  <Quote className="w-10 h-10 text-amber-100 mb-3" />
                  <p className="text-slate-700 italic font-medium leading-relaxed">{t.paul.p3}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-3xl border border-emerald-100 group transition-all duration-500 shadow-sm hover:shadow-lg hover:shadow-emerald-500/10"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest">{t.paul.whatWeDo}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.paul.whatWeDoDesc}</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-3xl border border-slate-200 group transition-all duration-500 shadow-sm hover:shadow-lg hover:shadow-slate-500/10"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-400 flex items-center justify-center text-white mb-4 shadow-lg shadow-slate-400/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <X className="w-6 h-6" />
                  </div>
                  <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest">{t.paul.whatWeDontDo}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.paul.whatWeDontDoDesc}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ HOW IT WORKS ══════════════════════════════ */}
      <section id="comment" className="py-28 sm:py-36 bg-slate-950 relative overflow-hidden">
        <div className="orb w-[600px] h-[600px] bg-amber-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="bg-dots absolute inset-0 opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              {t.howItWorks.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
              {t.howItWorks.title} <span className="text-shimmer">{t.howItWorks.titleAccent}</span>
            </h2>
            <p className="text-white/50 text-lg" style={{ fontFamily: "Inter, sans-serif" }}>
              {t.howItWorks.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

            {t.howItWorks.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative z-10 group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-[2rem] p-8 border border-white/10 hover:border-amber-500/30 hover:bg-white/8 transition-all duration-500 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 text-amber-400 flex items-center justify-center font-black text-xl mb-6 shadow-xl group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 group-hover:scale-110 transition-all duration-500">
                    {step.number}
                  </div>
                  <h3 className="text-white font-black text-xl mb-4 leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-500" style={{ fontFamily: "Inter, sans-serif" }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-16 text-center">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-4 bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-500/30 hover:bg-emerald-400 transition-all btn-shine"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <MessageCircle className="w-6 h-6" />
              {t.howItWorks.cta}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════ SERVICES ══════════════════════════════ */}
      <section id="services" className="py-28 sm:py-36 bg-white relative overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="orb w-80 h-80 bg-orange-400/8 top-20 right-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div {...fadeInUp} className="mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              {t.services.badge}
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.05]" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {t.services.title} <span className="text-shimmer">{t.services.titleAccent}</span>
                </h2>
                <p className="text-slate-500 text-lg" style={{ fontFamily: "Inter, sans-serif" }}>{t.services.subtitle}</p>
              </div>
              <div className="hidden lg:flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="pr-4">
                  <div className="text-slate-900 font-bold text-xs uppercase tracking-widest">Verified Support</div>
                  <p className="text-slate-400 text-[10px] font-medium">Official Partners Only</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((item, i) => {
              const Icon = serviceIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.10)] transition-all duration-600 flex flex-col overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/3 group-hover:to-orange-500/3 transition-all duration-700 rounded-[2.5rem]" />

                  <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 flex items-center justify-center text-slate-800 mb-8 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-orange-500 group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm group-hover:shadow-xl group-hover:shadow-amber-500/25 relative z-10">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight relative z-10" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow relative z-10" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item.desc}
                  </p>
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between group-hover:border-amber-100 transition-colors relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-amber-500 transition-colors">{language === "FR" ? "En savoir plus" : "Learn More"}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-2 transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeInUp} className="mt-12 p-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-white/70 text-sm font-medium text-center sm:text-left leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              <span className="text-amber-400 font-bold block mb-1 uppercase tracking-widest text-[10px]">Important Notice</span>
              {t.services.disclaimer}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════ GALLERY ══════════════════════════════ */}
      <section className="py-28 sm:py-36 bg-slate-50 relative overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-amber-500/8 bottom-0 left-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              {t.gallery.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
              {t.gallery.title} <span className="text-shimmer">{t.gallery.titleAccent}</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
              {t.gallery.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { url: "https://images.unsplash.com/photo-1546268060-2592ff93ee24?q=80&w=2070&auto=format&fit=crop", label: t.gallery.items.roadTrips },
              { url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=2071&auto=format&fit=crop", label: t.gallery.items.surf },
              { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop", label: t.gallery.items.diving },
              { url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop", label: t.gallery.items.nature },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, transition: { duration: 0.35 } }}
                className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] cursor-pointer"
              >
                <img src={item.url} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1200 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-600/0 group-hover:from-amber-500/20 group-hover:to-orange-600/20 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-white font-black text-xl tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>{item.label}</h4>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Australia</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ TESTIMONIALS ══════════════════════════════ */}
      <section id="temoignages" className="py-28 sm:py-36 bg-white relative overflow-hidden">
        <div className="bg-dots absolute inset-0 opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              {t.testimonials.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
              {t.testimonials.title} <span className="text-shimmer">{t.testimonials.titleAccent}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-7">
            {t.testimonials.items.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col group hover:shadow-[0_40px_80px_-20px_rgba(245,158,11,0.12)] hover:border-amber-100 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-[2.5rem]" />

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-10 h-10 text-amber-100 mb-5 group-hover:text-amber-200 transition-colors duration-500" />
                <p className="text-slate-600 mb-10 leading-relaxed italic text-lg flex-grow" style={{ fontFamily: "Inter, sans-serif" }}>
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-8 border-t border-slate-50 group-hover:border-amber-50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-lg shadow-amber-500/20">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-slate-900 font-black tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>{testimonial.name}</div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {(testimonial as any).origin ?? "Australia"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ PARENTS ══════════════════════════════ */}
      <section id="parents" className="py-28 sm:py-36 bg-slate-50 relative overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-amber-500/8 top-1/2 -translate-y-1/2 -right-32" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInLeft} className="relative">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] group card-tilt">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop"
                  alt="Happy young travelers"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.10)] border border-slate-50 hidden sm:flex items-center gap-5"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-slate-900 font-black text-xl leading-none mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{t.parents.secure}</div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{t.parents.fieldSupport}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div {...fadeInRight}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                {t.parents.badge}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                {t.parents.title} <br />
                <span className="text-shimmer">{t.parents.titleAccent}</span>
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed mb-10" style={{ fontFamily: "Inter, sans-serif" }}>
                <p className="text-slate-900 font-bold text-xl">{t.parents.p1}</p>
                <p>{t.parents.p2}</p>
                <p className="italic text-slate-400">{t.parents.p3}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {t.parents.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>{feature}</span>
                  </motion.div>
                ))}
              </div>
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/15 hover:bg-amber-500 hover:shadow-amber-500/25 transition-all duration-500 btn-shine"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <MessageCircle className="w-6 h-6" />
                {t.parents.cta}
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ CONTACT ══════════════════════════════ */}
      <section id="contact" className="py-28 sm:py-40 bg-slate-950 relative overflow-hidden text-center">
        <div className="orb w-[700px] h-[700px] bg-amber-500/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="orb w-[400px] h-[400px] bg-orange-600/10 top-0 right-0" />
        <div className="orb w-[300px] h-[300px] bg-amber-400/10 bottom-0 left-0" />
        <div className="bg-dots absolute inset-0 opacity-20" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div {...fadeInUp}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 mx-auto mb-12 rounded-[2rem] bg-white/8 backdrop-blur-xl flex items-center justify-center text-white shadow-2xl border border-white/10"
            >
              <Coffee className="w-12 h-12 text-amber-400" />
            </motion.div>

            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.88]" style={{ fontFamily: "Outfit, sans-serif" }}>
              {t.contact.title} <br />
              <span className="text-shimmer">{t.contact.titleAccent}</span>
            </h2>

            <p className="text-white/50 text-xl mb-14 max-w-xl mx-auto font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
              {t.contact.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-4 bg-white text-slate-900 px-12 py-6 rounded-3xl text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_60px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] transition-all btn-shine"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <MessageCircle className="w-6 h-6 text-emerald-500" />
                {language === "FR" ? "Parler à Paul" : "Talk to Paul"}
              </motion.a>
              <motion.a
                href={emailLink}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-4 bg-white/8 backdrop-blur-xl text-white border border-white/15 px-12 py-6 rounded-3xl text-sm font-black uppercase tracking-[0.2em] hover:bg-white/15 hover:border-white/30 transition-all"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Mail className="w-6 h-6" />
                Email
              </motion.a>
            </div>

            <div className="flex flex-wrap justify-center gap-10 opacity-40">
              {t.contact.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════ FOOTER ══════════════════════════════ */}
      <footer className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                  <Sun className="w-5 h-5" />
                </div>
                <span className="text-slate-900 font-black text-xl tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                  OZ <span className="text-amber-500">Connection</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest max-w-xs text-center lg:text-left">
                {t.footer.tagline}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {navLinks.slice(0, 5).map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => scrollToSection(e, link.href)}
                  className="text-slate-500 hover:text-amber-500 text-xs font-black uppercase tracking-[0.2em] transition-colors reveal-line"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </a>
              ))}
            </div>

            <div className="flex flex-col items-center lg:items-end gap-2">
              <p className="text-slate-900 font-black text-xs uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
                {t.footer.copyright}
              </p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                Melbourne · Sydney · Brisbane
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
