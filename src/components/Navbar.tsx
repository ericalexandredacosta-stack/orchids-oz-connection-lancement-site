"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/lib/translations";

const wa = "https://wa.me/+61494652991";

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: [string, string][] = [
    ["/packages", t.nav.packages],
    ["/services", t.nav.services],
    ["/jobs", t.nav.jobs],
    ["/about", t.nav.about],
    ["/faq", t.nav.faq],
  ];

  const dark = !scrolled && (pathname === "/" || pathname === "/about");

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "py-3"
        : "bg-transparent py-5"
    }`} style={scrolled ? { background: "rgba(244,237,224,0.92)", backdropFilter: "blur(16px)", boxShadow: "0 1px 0 rgba(30,58,74,0.08)" } : {}}>
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: "linear-gradient(135deg, #F5B840, #F29700)", boxShadow: "0 4px 12px rgba(242,151,0,0.3)" }}>
            <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>OZ</span>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            <span style={{ color: "#F29700" }}>OZ</span>{" "}
            <span className={scrolled ? "" : dark ? "text-white" : ""} style={scrolled ? { color: "var(--color-ink)" } : {}}>
              Connection
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map(([href, label]) => (
            <Link key={href} href={href}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                dark
                  ? "text-sand-100/70 hover:text-sand-100"
                  : "hover:text-terra-500"
              }`}
              style={!dark ? { color: "var(--color-ink-soft)" } : {}}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button onClick={toggleLang}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              dark
                ? "border-sand-100/25 text-sand-100/80 hover:bg-sand-100/10"
                : "hover:bg-ocean-600/4"
            }`}
            style={!dark ? { borderColor: "var(--color-line)", color: "var(--color-ink)" } : {}}>
            <span className="text-base leading-none">{lang === "FR" ? "🇬🇧" : "🇫🇷"}</span>
            <span>{lang === "FR" ? "English" : "Français"}</span>
          </button>
          <a href={wa} target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all btn-shine"
            style={{ background: "#F29700", boxShadow: "0 4px 12px rgba(242,151,0,0.3)" }}>
            <MessageCircle className="w-4 h-4" />WhatsApp
          </a>
          <button onClick={() => setMenuOpen(o => !o)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${dark ? "text-sand-100" : ""}`}
            style={!dark ? { color: "var(--color-ink)" } : {}}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t"
          style={{ background: "var(--color-bg)", borderColor: "var(--color-line)" }}>
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-3">
            {links.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider py-2 transition-colors hover:text-terra-500"
                style={{ color: "var(--color-ink)" }}>
                {label}
              </Link>
            ))}
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wide px-5 py-3 rounded-full mt-2"
              style={{ background: "#F29700" }}>
              <MessageCircle className="w-4 h-4" />WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
