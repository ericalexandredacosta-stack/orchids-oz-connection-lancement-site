"use client";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/lib/translations";

const wa = "https://wa.me/+61494652991";

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang] as typeof translations["FR"];

  const links: [string, string][] = [
    ["/packages", t.nav.packages],
    ["/services", t.nav.services],
    ["/about", t.nav.about],
    ["/faq", t.nav.faq],
  ];

  return (
    <footer style={{ background: "var(--color-ocean-900)", borderTop: "1px solid rgba(244,237,224,0.06)" }}>
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #F5B840, #F29700)" }}>
                <span className="text-white font-bold text-xs" style={{ fontFamily: "var(--font-display)" }}>OZ</span>
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#F4EDE0", fontSize: "1rem" }}>
                OZ <span style={{ color: "#F29700" }}>Connection</span>
              </span>
            </Link>
            <p className="text-sand-200/30 text-xs leading-relaxed max-w-xs">
              {lang === "FR"
                ? "Accompagnement pratique à l'arrivée à Melbourne pour backpackers et étudiants internationaux."
                : "Practical arrival support in Melbourne for backpackers and international students."}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sand-100/20 text-xs uppercase tracking-widest mb-4 font-medium">Navigation</p>
            <div className="flex flex-col gap-2">
              {links.map(([href, label]) => (
                <Link key={href} href={href}
                  className="text-sand-100/30 hover:text-terra-400 text-sm transition-colors">
                  {label}
                </Link>
              ))}
              {/* /pro — footer-only, not in top nav */}
              <Link href="/pro" className="text-sand-100/20 hover:text-terra-400 text-sm transition-colors">
                {lang === "FR" ? "Espace Pro (B2B)" : "Pro Space (B2B)"}
              </Link>
              <Link href="/legal" className="text-sand-100/20 hover:text-sand-100/40 text-xs transition-colors mt-2">
                {lang === "FR" ? "Mentions légales" : "Legal"}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sand-100/20 text-xs uppercase tracking-widest mb-4 font-medium">Contact</p>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-sand-100/40 hover:text-terra-400 transition-colors mb-2">
              <MessageCircle className="w-4 h-4" />WhatsApp
            </a>
            <p className="text-sand-100/20 text-xs mt-1">Melbourne · Naarm · Australia</p>
          </div>
        </div>

        {/* Disclaimer — non-négociable */}
        <div className="border-t pt-8" style={{ borderColor: "rgba(244,237,224,0.06)" }}>
          <p className="text-sand-100/20 text-xs leading-relaxed max-w-4xl border-l-2 pl-4"
            style={{ borderColor: "rgba(242,151,0,0.2)" }}>
            {t.footer.disclaimer}
          </p>
          <p className="text-sand-100/15 text-xs mt-4">
            {t.footer.copyright} · Melbourne
          </p>
        </div>
      </div>
    </footer>
  );
}
