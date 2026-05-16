"use client";

import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { useLang } from "@/lib/lang-context";
import {
  MessageCircle, ArrowRight, CheckCircle2,
  FileText, Briefcase, Building2, Smartphone, Bike, Home,
  MapPin, ShieldCheck, Languages, GraduationCap, AlertCircle, PiggyBank, FileSignature,
} from "lucide-react";

const heroImages = [
  { url: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?q=80&w=1920&auto=format&fit=crop" },
  { url: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?q=80&w=1920&auto=format&fit=crop" },
  { url: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=1920&auto=format&fit=crop" },
  { url: "https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=1920&auto=format&fit=crop" },
];

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

// ── Sparkles ──
function Sparkles({ children, count = 8, color = "#F29700", className = "" }: {
  children: React.ReactNode; count?: number; color?: string; className?: string;
}) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number; gap: number; }[]>([]);
  useEffect(() => {
    setSparkles(Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 1.4 + 1.2,
      gap: Math.random() * 2 + 1.5,
    })));
  }, [count]);
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="pointer-events-none absolute inset-0 -m-2 overflow-visible" aria-hidden>
        {sparkles.map(s => (
          <motion.svg key={s.id} viewBox="0 0 24 24" width={s.size} height={s.size}
            style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, color }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 0.85, 0], rotate: [0, 90, 180] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, repeatDelay: s.gap, ease: "easeInOut" }}>
            <path d="M12 2 L13.5 9.5 L21 11 L13.5 12.5 L12 22 L10.5 12.5 L3 11 L10.5 9.5 Z" fill="currentColor" />
          </motion.svg>
        ))}
      </span>
      <span className="relative">{children}</span>
    </span>
  );
}

// ── ShimmerButton wrapper ──
function ShimmerFrame() {
  return (
    <>
      <span className="shimmer-frame" aria-hidden />
      <style jsx>{`
        .shimmer-frame {
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: conic-gradient(from var(--shimmer-angle, 0deg), transparent 0%, rgba(255,255,255,0.85) 8%, transparent 22%, transparent 100%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: shimmer-spin 3.6s linear infinite;
          opacity: 0.85;
          pointer-events: none;
        }
        @property --shimmer-angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
        @keyframes shimmer-spin {
          0% { --shimmer-angle: 0deg; transform: rotate(0deg); }
          100% { --shimmer-angle: 360deg; transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .shimmer-frame { animation: none; opacity: 0.4; }
        }
      `}</style>
    </>
  );
}

// ── TracingBeam ──
function TracingBeam({ children, accentColor = "#F29700" }: {
  children: React.ReactNode; accentColor?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const [svgHeight, setSvgHeight] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const update = () => setSvgHeight(ref.current?.offsetHeight ?? 0);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.85], [50, svgHeight]), { stiffness: 500, damping: 90 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), { stiffness: 500, damping: 90 });
  return (
    <div ref={ref} className="relative">
      <div className="absolute -left-4 md:-left-12 top-3 hidden md:block">
        <div className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border bg-white shadow-sm"
          style={{ borderColor: "var(--color-line)" }}>
          <div className="h-2 w-2 rounded-full border" style={{ borderColor: accentColor, background: accentColor }} />
        </div>
        <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="ml-4 block" aria-hidden>
          <path d={`M 1 0 V ${svgHeight}`} fill="none" stroke={accentColor} strokeOpacity="0.16" strokeWidth="1.25" />
          <path d={`M 1 0 V ${svgHeight}`} fill="none" stroke="url(#tb-grad)" strokeWidth="1.6" />
          <defs>
            <motion.linearGradient id="tb-grad" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stopColor={accentColor} stopOpacity="0" />
              <stop stopColor={accentColor} />
              <stop offset="0.325" stopColor={accentColor} />
              <stop offset="1" stopColor="#1E3A4A" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div>{children}</div>
    </div>
  );
}

// ── AuroraBackground ──
function AuroraBackground({ children, className = "" }: {
  children?: React.ReactNode; className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70 mix-blend-multiply">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </div>
      <div className="relative">{children}</div>
      <style jsx>{`
        .aurora { position: absolute; inset: -20%; filter: blur(80px); opacity: 0.5; will-change: transform; }
        .aurora-1 { background: radial-gradient(ellipse 60% 50% at 30% 30%, rgba(242,151,0,0.45), transparent 70%); animation: drift1 22s ease-in-out infinite alternate; }
        .aurora-2 { background: radial-gradient(ellipse 50% 40% at 70% 60%, rgba(30,58,74,0.35), transparent 70%); animation: drift2 28s ease-in-out infinite alternate; }
        .aurora-3 { background: radial-gradient(ellipse 45% 35% at 50% 80%, rgba(245,193,88,0.3), transparent 70%); animation: drift3 34s ease-in-out infinite alternate; }
        @keyframes drift1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-6%,4%) scale(1.1); } }
        @keyframes drift2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(8%,-3%) scale(1.05); } }
        @keyframes drift3 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-4%,-6%) scale(1.08); } }
        @media (prefers-reduced-motion: reduce) { .aurora { animation: none; } }
      `}</style>
    </div>
  );
}

// ── GridPattern SVG ──
function GridPattern({ opacity = 0.06, light = false }: { opacity?: number; light?: boolean }) {
  return (
    <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`grid-${light}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={light ? "#F4EDE0" : "#345266"} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${light})`} opacity={opacity} />
    </svg>
  );
}

// ── Spotlight SVG ──
function Spotlight({ color = "#F29700", x = "25%", y = "25%", size = "45%", opacity = 0.45 }: {
  color?: string; x?: string; y?: string; size?: string; opacity?: number;
}) {
  return (
    <svg aria-hidden="true" className="absolute pointer-events-none spotlight-pulse"
      style={{ left: x, top: y, width: size, height: size, transform: "translate(-50%, -50%)" }}
      viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`sp-${color.replace('#','')}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="100" rx="100" ry="100" fill={`url(#sp-${color.replace('#','')})`} />
    </svg>
  );
}

// ── MagicCard ──
function MagicCard({ children, highlight = false, className = "" }: {
  children: React.ReactNode; highlight?: boolean; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    card.style.setProperty("--mx", `${mx}px`);
    card.style.setProperty("--my", `${my}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`magic-card relative flex flex-col h-full rounded-[18px] p-6 border transition-transform duration-300 hover:-translate-y-1 ${
        highlight
          ? "border-transparent text-white"
          : "border-ocean-400/20 text-sand-100"
      } ${className}`}
      style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
    >
      <div
        className="magic-card-border absolute inset-0 rounded-[18px] pointer-events-none"
        style={{
          background: highlight
            ? "radial-gradient(280px circle at var(--mx) var(--my), rgba(255,255,255,0.5), transparent 70%)"
            : "radial-gradient(280px circle at var(--mx) var(--my), rgba(226,154,120,0.55), transparent 70%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div
        className="magic-card-spotlight absolute inset-0 rounded-[18px] pointer-events-none"
        style={{
          background: `radial-gradient(360px circle at var(--mx) var(--my), ${highlight ? "rgba(255,255,255,0.08)" : "rgba(242,151,0,0.08)"}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

// ── TextGenerateEffect ──
function TextGenerateEffect({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

// ── HoverEffect FAQ ──
function HoverEffectFAQ({ items }: { items: { q: string; a: string }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative space-y-1">
      {items.map((item, i) => (
        <div
          key={i}
          className="relative group rounded-2xl px-6 py-5 cursor-pointer"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === i && (
            <motion.div
              layoutId="faq-highlight"
              className="absolute inset-0 rounded-2xl" style={{ background: "rgba(30,58,74,0.06)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div className="relative z-10">
            <p className="font-semibold text-[0.95rem] mb-2 transition-colors" style={{ color: "#1E3A4A" }}>
              {item.q}
            </p>
            <p className="text-ocean-400/70 text-sm leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── WorldMap SVG ──
function WorldMap() {
  const cities = [
    { label: "Paris", x: 47.5, y: 23 },
    { label: "London", x: 45.5, y: 20 },
    { label: "Berlin", x: 50, y: 21 },
    { label: "Madrid", x: 44, y: 27 },
    { label: "Montréal", x: 22, y: 22 },
    { label: "Sydney", x: 83, y: 72 },
  ];
  const naarm = { x: 81.5, y: 74 };

  return (
    <svg viewBox="0 0 100 65" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Dot grid world map */}
      <defs>
        <pattern id="wm-dots" width="1.4" height="1.1" patternUnits="userSpaceOnUse">
          <circle cx="0.7" cy="0.55" r="0.25" fill="#345266" />
        </pattern>
        <mask id="wm-land">
          <rect width="100" height="65" fill="url(#wm-dots)" />
        </mask>
      </defs>

      {/* Rough continental shapes */}
      {[
        /* N America */ "M 10 15 L 25 10 L 30 14 L 35 12 L 37 18 L 34 25 L 28 28 L 20 26 L 12 22 Z",
        /* S America */ "M 22 30 L 30 28 L 32 35 L 30 45 L 26 50 L 21 48 L 18 40 Z",
        /* Europe    */ "M 44 16 L 56 14 L 58 20 L 54 24 L 46 24 L 43 20 Z",
        /* Africa    */ "M 46 26 L 55 24 L 58 32 L 55 44 L 50 48 L 44 44 L 43 35 Z",
        /* Asia      */ "M 58 14 L 82 10 L 85 20 L 78 28 L 68 30 L 58 24 Z",
        /* Oceania   */ "M 78 60 L 88 56 L 92 62 L 86 67 L 78 66 Z",
      ].map((d, i) => (
        <path key={i} d={d} fill="#1E3A4A" opacity="0.12" />
      ))}

      {/* Animated arcs from cities to Naarm */}
      {cities.map((city, i) => (
        <g key={i}>
          <path
            d={`M ${city.x} ${city.y} Q ${(city.x + naarm.x) / 2 - 5} ${Math.min(city.y, naarm.y) - 12} ${naarm.x} ${naarm.y}`}
            fill="none"
            stroke="#F29700"
            strokeWidth="0.35"
            strokeDasharray="0 1000"
            opacity="0.7"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0 1000"
              to="1000 0"
              dur="2s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
          </path>
          {/* City dot */}
          <circle cx={city.x} cy={city.y} r="0.8" fill="#F29700" opacity="0.5" />
          <circle cx={city.x} cy={city.y} r="0.3" fill="#F29700" />
        </g>
      ))}

      {/* Naarm / Melbourne */}
      <circle cx={naarm.x} cy={naarm.y} r="1.8" fill="#F29700" opacity="0.25" />
      <circle cx={naarm.x} cy={naarm.y} r="1" fill="#F29700" opacity="0.6" />
      <circle cx={naarm.x} cy={naarm.y} r="0.4" fill="#F29700" />
    </svg>
  );
}

// ── Icon helper ──
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  FileText, Briefcase, Building2, Smartphone, Bike, Home, MapPin, ShieldCheck, Languages, PiggyBank, FileSignature,
};

export default function HomePage() {
  const { lang } = useLang();
  const t = translations[lang] as typeof translations["FR"];

  const [slide, setSlide] = useState(0);
  const [autoplay, setAuto] = useState(true);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => setSlide(p => (p + 1) % heroImages.length), []);
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(nextSlide, 5500);
    return () => clearInterval(id);
  }, [autoplay, nextSlide]);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trust = [
    lang === "FR" ? "Basé à Melbourne" : "Melbourne-based",
    lang === "FR" ? "Support FR & EN" : "FR & EN support",
    lang === "FR" ? "8+ ans d'expérience" : "8+ years experience",
    lang === "FR" ? "Prix de lancement" : "Launch price",
  ];

  // FAQ — 4 items for home
  const homeFaq = t.faq.items.filter((_, i) => [0, 3, 4, 7].includes(i));

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <div id="progress-bar" style={{ width: `${progress}%` }} />

      {/* ── 01. HERO ── */}
      <section id="hero" className="relative h-screen min-h-[620px] flex items-center overflow-hidden"
        style={{ background: "#0A1820" }}>
        {heroImages.map((img, i) => (
          <div key={i}
            className={`hero-slide${i === slide ? " active" : ""}`}
            style={{ backgroundImage: `url(${img.url})` }}
          />
        ))}
        {/* Multi-layer overlay per brief */}
        <div className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(10,24,32,0.38) 0%, rgba(10,24,32,0.12) 45%, rgba(10,24,32,0.42) 100%)",
          }} />
        {/* Radial orange glow */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 75% 25%, rgba(242,151,0,0.18), transparent 70%)" }} />

        {/* Hero content */}
        <div className="relative z-20 max-w-7xl mx-auto px-5 w-full pt-28 pb-32 lg:pt-36 lg:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {/* Pill kicker */}
            <Sparkles count={10} color="#F5C158" className="mb-6">
              <span className="inline-block text-xs font-medium uppercase tracking-[0.06em] px-4 py-1.5 rounded-full backdrop-blur-sm"
                style={{
                  background: "rgba(242,151,0,0.18)",
                  border: "1px solid rgba(242,151,0,0.35)",
                  color: "#F5C158",
                }}>
                {lang === "FR" ? "Melbourne · Australie" : "Melbourne · Australia"}
              </span>
            </Sparkles>
            <div className="h-6" />

            {/* H1 */}
            <h1 className="font-display font-bold mb-4 leading-[1.05]"
              style={{
                color: "#F29700",
                fontSize: "clamp(2.75rem, 7.2vw, 6.25rem)",
                letterSpacing: "-0.03em",
                textShadow: "0 2px 32px rgba(242,151,0,0.45)",
              }}>
              {lang === "FR" ? "Parce qu'on est\naussi passé par là." : "Because we've\nbeen through it too."}
            </h1>

            {/* Body */}
            <p className="text-base sm:text-lg mb-10 max-w-2xl leading-relaxed"
              style={{ color: "rgba(244,237,224,0.85)", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
              {lang === "FR"
                ? "Démarches, conseils et accompagnement à Melbourne pour backpackers et étudiants internationaux."
                : "Setup, guidance and Melbourne arrival support for backpackers and international students."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="btn-shine relative inline-flex items-center gap-2.5 font-bold text-sm px-7 py-4 rounded-full transition-all overflow-hidden"
                style={{
                  background: "#F29700",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(242,151,0,0.4)",
                }}>
                <ShimmerFrame />
                <MessageCircle className="w-5 h-5 relative z-10" />
                <span className="relative z-10">
                  {lang === "FR" ? "Commencer sur WhatsApp" : "Start on WhatsApp"}
                </span>
              </a>
              <Link href="/packages"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-full transition-colors backdrop-blur-sm"
                style={{
                  border: "1.5px solid rgba(244,237,224,0.35)",
                  color: "#F4EDE0",
                  background: "rgba(244,237,224,0.06)",
                }}>
                {lang === "FR" ? "Voir les packs" : "View packs"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust bullets */}
            <div className="flex flex-wrap gap-4">
              {trust.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(244,237,224,0.6)" }}>
                  <span className="w-1 h-1 rounded-full" style={{ background: "#F29700" }} />{item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Carousel dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => { setSlide(i); setAuto(false); }}
              className={`rounded-full transition-all duration-500 ${i === slide ? "w-8 h-1.5" : "w-1.5 h-1.5"}`} />
          ))}
        </div>
      </section>

      {/* ── 02. TOPICS MARQUEE ── */}
      <div className="overflow-hidden relative py-3"
        style={{
          background: "var(--color-bg-alt)",
          borderTop: "1px solid var(--color-line)",
          borderBottom: "1px solid var(--color-line)",
        }}>
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--color-bg-alt), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--color-bg-alt), transparent)" }} />

        {/* Row 1 — orange (only row) */}
        <div>
          <div className="marquee-row" style={{ "--marquee-speed": "48s" } as React.CSSProperties}>
            {[...t.topics, ...t.topics].map((chip, i) => (
              <span key={i}
                className="inline-flex items-center gap-1.5 mx-2 px-4 py-2 rounded-full border text-xs font-medium whitespace-nowrap"
                style={{ background: "var(--color-bg)", borderColor: "var(--color-line)", color: "var(--color-ink-soft)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F29700" }} />{chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 03. PROBLEM ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "var(--color-bg-alt)" }}>
        <GridPattern opacity={0.07} />
        <div className="relative max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: kicker + H2 + blockquote */}
            <div className="lg:col-span-4">
              <motion.span
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0 }}
                className="pill-kicker">{t.problem.kicker}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.05 }}
                className="font-display font-bold text-ocean-600 leading-tight mb-6"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em" }}>
                {t.problem.h2}
              </motion.h2>
              <motion.blockquote
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
                className="hidden lg:block italic font-display text-ocean-400/70 text-lg border-l-2 pl-4 leading-snug"
                style={{ borderColor: "var(--color-accent)" }}>
                {t.problem.quote}
              </motion.blockquote>
            </div>

            {/* Right: lead text + pull quote */}
            <div className="lg:col-span-8">
              <TextGenerateEffect
                text={t.problem.lead}
                className="text-ocean-600/80 text-lg lg:text-xl leading-relaxed mb-8"
              />
              <motion.div
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.15 }}
                className="border-l-2 pl-5 py-1"
                style={{ borderColor: "#F29700" }}>
                <p className="font-display italic font-medium text-ocean-600 text-xl">{t.problem.pullQuote}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04. PROCESS ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0 }}
              className="pill-kicker">{t.process.kicker}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.05 }}
              className="font-display font-bold text-ocean-600"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em" }}>
              {t.process.h2}
            </motion.h2>
          </div>

          {/* Steps — horizontal desktop, vertical mobile */}
          <div className="relative">
            {/* Dashed connector line — desktop only */}
            <svg aria-hidden="true"
              className="hidden lg:block absolute top-12 pointer-events-none"
              style={{ left: "14%", right: "14%", width: "72%", height: "2px" }}
              viewBox="0 0 100 2" preserveAspectRatio="none">
              <line x1="0" y1="1" x2="100" y2="1" stroke="#F29700" strokeWidth="0.4" strokeDasharray="2 2" strokeOpacity="0.5" />
            </svg>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {t.process.steps.map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.1 }}
                  className="flex flex-col items-center text-center">
                  {/* Circle */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: "#F29700" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2.25rem", color: "#F29700" }}>{step.num}</span>
                    </div>
                    {/* Badge tag */}
                    <span className="absolute -bottom-2 -right-1 text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-sand-100"
                      style={{ background: "var(--color-ocean-600)", letterSpacing: "0.12em" }}>
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-ocean-600 text-xl mb-2">{step.title}</h3>
                  <p className="text-ocean-400/70 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 05. PILLARS BENTO ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "var(--color-bg-alt)" }}>
        <GridPattern opacity={0.05} />
        <div className="relative max-w-7xl mx-auto px-5">
          {/* Header */}
          <div className="grid lg:grid-cols-12 gap-8 mb-14 items-end">
            <div className="lg:col-span-7">
              <motion.span
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0 }}
                className="pill-kicker">{t.pillars.kicker}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.05 }}
                className="font-display font-bold text-ocean-600"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em" }}>
                {t.pillars.h2}
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
              className="lg:col-span-5 text-ocean-400/70 text-base leading-relaxed">
              {t.pillars.intro}
            </motion.p>
          </div>

          {/* Items list — alternating layout */}
          <TracingBeam>
          <div className="space-y-3">
            {t.pillars.items.map((item, i) => {
              const Icon = iconMap[item.icon] || ShieldCheck;
              const isFeature = i === 2; // item du milieu = feature ocean dark
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.07 }}
                  className="rounded-[18px] px-7 py-6 border flex items-start gap-5 group transition-all duration-300 hover:-translate-y-0.5"
                  style={isFeature
                    ? { background: "var(--color-ocean-600)", borderColor: "transparent" }
                    : { background: "var(--color-bg)", borderColor: "rgba(30,58,74,0.08)" }}>
                  {/* Icon pill */}
                  <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: isFeature ? "rgba(244,237,224,0.12)" : "rgba(242,151,0,0.1)" }}>
                    <Icon className="w-5 h-5" style={{ color: isFeature ? "#F5C158" : "#F29700" }} />
                  </div>
                  {/* Number */}
                  <div className="hidden sm:block shrink-0 pt-0.5">
                    <span className="text-xs font-bold uppercase tracking-[0.18em]"
                      style={{ color: isFeature ? "rgba(244,237,224,0.25)" : "var(--color-ink-soft)", opacity: 0.5 }}>
                      {item.num}
                    </span>
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-display font-semibold text-lg mb-1 ${isFeature ? "text-sand-100" : "text-ocean-600"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isFeature ? "text-sand-200/65" : "text-ocean-400/70"}`}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          </TracingBeam>
        </div>
      </section>

      {/* ── 05b. FONDATEUR — Paul ── */}
      <section className="relative py-20 overflow-hidden" style={{ background: "var(--color-bg)" }}>
        <AuroraBackground className="absolute inset-0">
          <div />
        </AuroraBackground>
        <div className="relative max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Photo Paul */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}>
              <div className="relative rounded-[22px] overflow-hidden aspect-[4/5] shadow-[0_32px_64px_-12px_rgba(30,58,74,0.15)]">
                <img
                  src="/paul.jpg"
                  alt="Paul — fondateur d'OZ Connection, Melbourne"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 65%" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-sand-100 font-display font-semibold text-sm">
                    Paul · {lang === "FR" ? "Fondateur" : "Founder"}, OZ Connection
                  </p>
                  <p className="text-sand-100/50 text-xs mt-0.5">Melbourne · Naarm</p>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <div className="lg:col-span-8">
              <motion.span
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0 }}
                className="pill-kicker">
                {lang === "FR" ? "Le fondateur" : "The founder"}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.05 }}
                className="font-display font-bold text-ocean-600 mb-5"
                style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", letterSpacing: "-0.02em" }}>
                {lang === "FR"
                  ? "Une vraie expérience. Un accompagnement pratique."
                  : "Real experience. Practical support."}
              </motion.h2>
              <div className="space-y-4 text-ocean-400/75 text-base leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}>
                  {lang === "FR"
                    ? "Paul, le fondateur d'OZ Connection, est basé à Melbourne avec plus de 8 ans d'expérience réelle de vie et de travail en Australie."
                    : "Paul, the founder of OZ Connection, is based in Melbourne with over 8 years of real experience living and working in Australia."}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.13 }}>
                  {lang === "FR"
                    ? "Il est arrivé en Australie sans parler un mot d'anglais. Aujourd'hui, il est citoyen australien."
                    : "He arrived in Australia without speaking a word of English. Today, he is an Australian citizen."}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.15 }}>
                  {lang === "FR"
                    ? "Après être lui-même passé par les galères de l'arrivée, Paul a créé OZ Connection pour aider les nouveaux arrivants à éviter les erreurs classiques, gagner du temps et commencer avec des étapes plus claires."
                    : "After going through the same arrival challenges himself, Paul built OZ Connection to help newcomers avoid common mistakes, save time and start with clearer steps."}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
                  className="border-l-2 pl-4 italic font-display text-ocean-600/80 text-base"
                  style={{ borderColor: "var(--color-accent)" }}>
                  {lang === "FR"
                    ? "OZ Connection est construit autour d'un accompagnement pratique, pas de conseils génériques trouvés en ligne."
                    : "OZ Connection is built around practical support, not generic advice found online."}
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.25 }}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium"
                style={{ background: "var(--color-bg-alt)", border: "1px solid var(--color-line)", color: "var(--color-ink-soft)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-terra-400" />
                {lang === "FR" ? "Support disponible en français et en anglais" : "Support available in French and English"}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06. FOR WHOM / NOT FOR WHOM ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0 }}
              className="pill-kicker">{t.forWhom.kicker}
            </motion.span>
          </div>
          <div className="max-w-2xl mx-auto">
            {/* Pour toi */}
            <motion.div
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.05 }}
              className="rounded-[18px] p-8 border border-ocean-400/10"
              style={{ background: "var(--color-bg-alt)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(242,151,0,0.12)" }}>
                  <CheckCircle2 className="w-5 h-5" style={{ color: "#F29700" }} />
                </div>
                <h3 className="font-display font-semibold text-ocean-600 text-xl">{t.forWhom.forTitle}</h3>
              </div>
              <ul className="space-y-3">
                {t.forWhom.forItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-ocean-600/80 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: "#F29700" }} />{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 07. PACKS TEASER (dark section) ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "var(--color-ocean-600)" }}>
        <GridPattern opacity={0.04} light />
        <Spotlight color="#F29700" x="10%" y="15%" size="40%" opacity={0.35} />
        <Spotlight color="#F5C158" x="90%" y="85%" size="35%" opacity={0.25} />

        <div className="relative max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: text */}
            <div className="lg:col-span-7">
              <motion.span
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0 }}
                className="pill-kicker pill-kicker-orange mb-6 inline-block">
                {lang === "FR" ? "05 · Nos packs" : "05 · Our packs"}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.05 }}
                className="font-display font-bold text-sand-100 mb-4"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em" }}>
                {lang === "FR" ? "Choisis le bon niveau d'accompagnement." : "Choose the right level of support."}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
                className="text-sand-200/60 text-lg mb-8 max-w-xl">
                {lang === "FR"
                  ? "Trois packs pensés pour trois moments différents de ton aventure."
                  : "Three packs designed for three different moments of your journey."}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.15 }}>
                <Link href="/packages" className="btn-primary btn-shine">
                  {lang === "FR" ? "Voir tous les packs" : "View all packs"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Right: 3 MagicCards */}
            <div className="lg:col-span-5">
              <div className="flex flex-col gap-4">
                {[
                  { name: lang === "FR" ? "Australia Starter" : "Australia Starter", price: "$99", tagline: lang === "FR" ? "Les essentiels de l'arrivée" : "Arrival essentials", highlight: false },
                  { name: lang === "FR" ? "Melbourne Ready" : "Melbourne Ready", price: "$299", tagline: lang === "FR" ? "Tes 2 premières semaines préparées" : "Your first 2 weeks prepared", highlight: true },
                  { name: lang === "FR" ? "Melbourne Arrival" : "Melbourne Arrival", price: "$899", tagline: lang === "FR" ? "Tout organisé avant d'atterrir" : "Everything organised before landing", highlight: false },
                ].map((pack, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 + i * 0.08 }}>
                    <MagicCard highlight={pack.highlight}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-display font-semibold text-lg ${pack.highlight ? "text-white" : "text-sand-100"}`}>
                            {pack.name}
                          </p>
                          <p className={`text-xs mt-0.5 ${pack.highlight ? "text-white/70" : "text-sand-200/50"}`}>
                            {pack.tagline}
                          </p>
                        </div>
                        <span className="font-display font-bold text-2xl" style={{ color: pack.highlight ? "#fff" : "#F5C158" }}>
                          {pack.price}
                        </span>
                      </div>
                    </MagicCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08. SERVICES À LA CARTE TEASER ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "var(--color-bg-alt)" }}>
        <GridPattern opacity={0.05} />
        <div className="relative max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: text */}
            <div className="lg:col-span-5">
              <motion.span
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0 }}
                className="pill-kicker">{t.servicesTeaser.kicker}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.05 }}
                className="font-display font-bold text-ocean-600 mb-4"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em" }}>
                {t.servicesTeaser.h2}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
                className="text-ocean-400/70 text-base leading-relaxed mb-6 max-w-sm">
                {t.servicesTeaser.body}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.12 }}>
                <Link href="/services"
                  className="font-semibold text-sm underline decoration-dashed underline-offset-4 transition-colors" style={{ color: "#F29700" }}>
                  {t.servicesTeaser.cta}
                </Link>
              </motion.div>
            </div>

            {/* Right: 6 mini-cards grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {t.servicesTeaser.items.map((svc, i) => {
                  const Icon = iconMap[svc.icon] || FileText;
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.08 + i * 0.06 }}>
                      <Link href={`/services`}
                        className="flex flex-col gap-2 p-4 rounded-[18px] border group transition-colors"
                        style={{ borderColor: "rgba(30,58,74,0.1)", background: "var(--color-bg)" }}>
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(242,151,0,0.1)" }}>
                            <Icon className="w-4 h-4" style={{ color: "#F29700" }} />
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 transition-colors" style={{ color: "rgba(52,82,102,0.4)" }} />
                        </div>
                        <p className="font-display font-medium text-ocean-600 text-sm leading-tight">{svc.name}</p>
                        <p className="text-xs text-ocean-400/50">{svc.priceAUD}</p>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08b. STUDENT VISA ── */}
      <section className="relative py-20 overflow-hidden" style={{ background: "var(--color-ocean-600)" }}>
        {/* Subtle orange glow top-right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 50% at 90% 10%, rgba(242,151,0,0.18), transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-5">
          {/* Top: kicker + headline + body in a row */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-block mb-5 text-xs font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(242,151,0,0.18)", border: "1px solid rgba(242,151,0,0.35)", color: "#F5C158" }}>
                  {t.studentVisa.kicker}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-display font-bold text-sand-100 leading-[1.05]"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.025em" }}>
                  {t.studentVisa.h2}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-sand-200/55 text-base leading-relaxed mb-6">
                  {t.studentVisa.body}
                </p>
                <a href={wa} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-bold text-sm px-7 py-4 rounded-full transition-all btn-shine"
                  style={{ background: "#F29700", color: "#fff", boxShadow: "0 4px 20px rgba(242,151,0,0.4)" }}>
                  <MessageCircle className="w-4 h-4" />
                  {t.studentVisa.cta}
                </a>
              </Reveal>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-10" style={{ background: "rgba(244,237,224,0.08)" }} />

          {/* 4 points as horizontal numbered list */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {t.studentVisa.points.map((pt, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.07 }}
                className="pr-8 lg:border-r last:border-r-0 lg:pl-8 first:pl-0 py-2"
                style={{ borderColor: "rgba(244,237,224,0.08)" }}>
                <p className="font-display font-bold text-3xl mb-3" style={{ color: "rgba(242,151,0,0.25)" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display font-semibold text-sand-100 text-sm mb-1.5 leading-snug">{pt.title}</p>
                <p className="text-sand-200/45 text-xs leading-relaxed">{pt.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer strip */}
          <div className="mt-10 flex items-start gap-2.5 border-t pt-6"
            style={{ borderColor: "rgba(244,237,224,0.07)" }}>
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "rgba(242,151,0,0.5)" }} />
            <p className="text-sand-100/25 text-xs leading-relaxed">{t.studentVisa.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* ── WHY MELBOURNE ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "var(--color-bg-alt)" }}>
        <GridPattern opacity={0.05} />
        <div className="relative max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="pill-kicker">{t.whyMelbourne.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.05 }}
              className="font-display font-bold text-ocean-600 mb-4"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em" }}>
              {t.whyMelbourne.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.12 }}
              className="italic font-display text-ocean-400/60 text-sm border-l-2 pl-4 max-w-xl mx-auto leading-relaxed text-left"
              style={{ borderColor: "var(--color-terra-300)" }}>
              {t.whyMelbourne.proof}
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-0">
              {t.whyMelbourne.points.map((pt, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.09 }}
                  className="group flex items-start gap-5 py-6 border-b"
                  style={{ borderColor: "var(--color-line)" }}>
                  <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm text-white group-hover:scale-105 transition-transform duration-200"
                    style={{ fontFamily: "var(--font-display)", background: "linear-gradient(135deg, var(--color-terra-400), var(--color-terra-500))", boxShadow: "0 4px 16px rgba(242,151,0,0.25)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-display font-semibold text-base mb-1 transition-colors duration-200" style={{ color: "#1E3A4A" }}>{pt.title}</p>
                    <p className="text-ocean-400/65 text-sm leading-relaxed">{pt.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}>
              <div className="relative rounded-[22px] overflow-hidden aspect-[4/3] shadow-[0_32px_64px_-12px_rgba(30,58,74,0.15)]">
                <img
                  src="https://images.unsplash.com/photo-1573639571368-065819727a52?q=80&w=1920&auto=format&fit=crop"
                  alt="Melbourne CBD skyline from the Yarra River"
                  loading="lazy"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                  style={{ filter: "contrast(1.06) saturate(1.15) brightness(1.03)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 via-ocean-900/10 to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute bottom-5 left-5 right-5 rounded-[14px] px-5 py-4"
                  style={{ background: "rgba(244,237,224,0.92)", backdropFilter: "blur(12px)" }}>
                  <p className="text-ocean-600 font-display font-semibold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Melbourne · Australie
                  </p>
                  <p className="text-ocean-400/60 text-xs mt-0.5">
                    {lang === "FR" ? "Meilleure ville du monde — Time Out 2026" : "World's best city — Time Out 2026"}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 09. FAQ ── */}
      <section className="relative py-24 overflow-hidden border-y"
        style={{ background: "var(--color-bg-alt)", borderColor: "var(--color-line)" }}>
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0 }}
              className="pill-kicker">{t.faq.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.05 }}
              className="font-display font-bold text-ocean-600"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em" }}>
              {t.faq.title}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
            className="rounded-[18px] p-4"
            style={{ background: "var(--color-bg)" }}>
            <HoverEffectFAQ items={homeFaq} />
          </motion.div>

          <div className="text-center mt-8">
            <Link href="/faq" className="btn-ghost text-sm font-semibold">
              {lang === "FR" ? "Voir toutes les questions" : "See all questions"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA + WORLD MAP ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: CTA text */}
            <div className="lg:col-span-7">
              <motion.h2
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0 }}
                className="font-display font-bold text-ocean-600 mb-4"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em" }}>
                {lang === "FR"
                  ? "Prêt à démarrer ton aventure australienne ?"
                  : "Ready to start your Australian journey?"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.05 }}
                className="text-ocean-400/70 text-lg leading-relaxed mb-8 max-w-lg">
                {lang === "FR"
                  ? "Dis-nous quand tu arrives, où tu atterris et ce dont tu as besoin. On choisit le bon pack ensemble."
                  : "Tell us when you land, where you're arriving and what you need. We'll pick the right pack together."}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
                className="flex flex-wrap gap-4">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-shimmer">
                  <MessageCircle className="w-5 h-5" />
                  {lang === "FR" ? "Commencer sur WhatsApp" : "Start on WhatsApp"}
                </a>
                <Link href="/packages" className="btn-secondary">
                  {lang === "FR" ? "Voir les packs" : "View packs"}
                </Link>
              </motion.div>
            </div>

            {/* Right: contact photo + WorldMap overlay */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.15 }}
              style={{ aspectRatio: "5/4" }}>
              <div className="relative w-full h-full rounded-[22px] overflow-hidden shadow-[0_32px_64px_-12px_rgba(30,58,74,0.2)]">
                <img
                  src="/contact-bg.png"
                  alt="Paul avec un backpacker à Melbourne"
                  className="w-full h-full object-cover"
                  style={{ filter: "contrast(1.05) saturate(1.1)" }}
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/65 via-ocean-900/15 to-transparent" />
                {/* WorldMap décoratif en bas */}
                <div className="absolute bottom-0 left-0 right-0 h-28 opacity-20 mix-blend-screen">
                  <WorldMap />
                </div>
                {/* Caption */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-sand-100 font-display font-semibold text-sm">
                    {lang === "FR" ? "Ton contact local à Melbourne" : "Your local contact in Melbourne"}
                  </p>
                  <p className="text-sand-100/50 text-xs mt-0.5">Melbourne · Naarm · Australia</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
