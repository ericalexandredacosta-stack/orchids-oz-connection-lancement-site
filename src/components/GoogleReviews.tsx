"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";
import {
  googleReviews,
  GOOGLE_REVIEWS_URL,
  formatReviewDate,
  type Review,
} from "@/lib/reviews";
import { Star, ArrowUpRight } from "lucide-react";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          style={{
            color: i <= rating ? "#F29700" : "rgba(30,58,74,0.18)",
            fill: i <= rating ? "#F29700" : "transparent",
          }}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-4 h-4"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#34A853"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#FBBC05"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#EA4335"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

function ReviewCard({ r, lang }: { r: Review; lang: "FR" | "EN" }) {
  return (
    <article
      className="shrink-0 rounded-[18px] border p-6 flex flex-col"
      style={{
        width: "340px",
        minHeight: "240px",
        background: "var(--color-bg)",
        borderColor: "var(--color-line)",
        boxShadow: "0 4px 14px rgba(30,58,74,0.05)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <Stars rating={r.rating} />
        <GoogleGlyph />
      </div>
      <p
        className="font-display text-ocean-600/90 text-[0.95rem] leading-relaxed mb-5 flex-1"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 6,
          overflow: "hidden",
        }}
      >
        &ldquo;{r.text}&rdquo;
      </p>
      <div className="flex items-baseline justify-between pt-3" style={{ borderTop: "1px solid var(--color-line)" }}>
        <p className="font-semibold text-sm text-ocean-600">{r.author}</p>
        <p className="text-xs text-ocean-400/60 capitalize">{formatReviewDate(r.date, lang)}</p>
      </div>
    </article>
  );
}

export function GoogleReviews() {
  const { lang } = useLang();
  const baseX = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startBaseX = useRef(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const speed = 28; // px/sec

  useAnimationFrame((_, delta) => {
    if (paused || dragging || !trackRef.current) return;
    const half = trackRef.current.scrollWidth / 2;
    if (!half) return;
    let next = baseX.get() - (speed * delta) / 1000;
    if (next <= -half) next += half;
    baseX.set(next);
  });

  if (googleReviews.length === 0) return null;
  const items = [...googleReviews, ...googleReviews];

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    startX.current = e.clientX;
    startBaseX.current = baseX.get();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    const half = trackRef.current.scrollWidth / 2;
    let next = startBaseX.current + dx;
    if (half) {
      while (next <= -half) next += half;
      while (next > 0) next -= half;
    }
    baseX.set(next);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  const avgRating = (googleReviews.reduce((s, r) => s + r.rating, 0) / googleReviews.length).toFixed(1);

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div className="relative max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-10">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0 }}
              className="pill-kicker"
            >
              {lang === "FR" ? "Avis Google" : "Google reviews"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.05 }}
              className="font-display font-bold text-ocean-600"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              {lang === "FR" ? "Ce qu'ils pensent d'OZ Connection." : "What they think about OZ Connection."}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
              className="flex items-center gap-3 mt-4"
            >
              <Stars rating={5} />
              <span className="text-sm font-semibold text-ocean-600">{avgRating}</span>
              <span className="text-sm text-ocean-400/70">
                {lang === "FR"
                  ? `· ${googleReviews.length} avis sur Google`
                  : `· ${googleReviews.length} reviews on Google`}
              </span>
            </motion.div>
          </div>
          <motion.a
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.15 }}
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-5 inline-flex items-center justify-start lg:justify-end gap-1.5 text-sm font-semibold transition-colors group"
            style={{ color: "#F29700" }}
          >
            <span className="underline decoration-dashed underline-offset-4">
              {lang === "FR" ? "Lire tous les avis sur Google" : "Read all reviews on Google"}
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="relative cursor-grab active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setDragging(false); }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--color-bg), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--color-bg), transparent)" }}
        />

        <motion.div
          ref={trackRef}
          className="flex gap-4 py-2 px-5"
          style={{ x: baseX, width: "max-content" }}
        >
          {items.map((r, i) => (
            <ReviewCard key={`${r.author}-${i}`} r={r} lang={lang} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
