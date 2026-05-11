"use client";
import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/lib/translations";

const wa = "https://wa.me/+61494652991";
const email = "mailto:contact@ozconnection.com.au";

export default function ContactCTA() {
  const { lang } = useLang();
  const t = translations[lang];
  return (
    <section id="contact" className="relative py-24 overflow-hidden text-center"
      style={{ background: "var(--color-ocean-600)" }}>
      {/* Spotlights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(242,151,0,0.4) 0%, transparent 70%)", transform: "translate(-50%, -50%)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(244,168,123,0.35) 0%, transparent 70%)", transform: "translate(50%, 50%)" }} />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#F4EDE0" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="pill-kicker pill-kicker-orange mb-8 inline-block">{t.contact.badge}</span>
          <h2 className="font-display font-bold text-sand-100 mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", letterSpacing: "-0.025em" }}>
            {t.contact.title}
          </h2>
          <p className="text-sand-200/50 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            {t.contact.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center justify-center gap-3">
              <MessageCircle className="w-5 h-5" />{t.contact.ctaWhatsapp}
            </a>
            <a href={email}
              className="inline-flex items-center justify-center gap-3 border text-sand-100 font-semibold text-sm px-7 py-4 rounded-full hover:bg-sand-100/8 transition-colors"
              style={{ borderColor: "rgba(244,237,224,0.15)" }}>
              <Mail className="w-4 h-4" />{t.contact.ctaEmail}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {t.contact.features.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sand-100/30 text-xs font-medium uppercase tracking-widest">
                <span className="w-1 h-1 rounded-full bg-terra-400" />{f}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
