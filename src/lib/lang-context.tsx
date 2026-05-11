"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Language } from "./translations";

interface LangCtx { lang: Language; toggleLang: () => void; }
const Ctx = createContext<LangCtx>({ lang: "EN", toggleLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("EN");
  useEffect(() => {
    const s = localStorage.getItem("language") as Language;
    if (s === "FR" || s === "EN") setLang(s);
  }, []);
  const toggleLang = () => {
    const n: Language = lang === "FR" ? "EN" : "FR";
    setLang(n);
    localStorage.setItem("language", n);
  };
  return <Ctx.Provider value={{ lang, toggleLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
