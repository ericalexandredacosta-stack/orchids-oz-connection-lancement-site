"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useLang } from "@/lib/lang-context";

type Status = "idle" | "submitting" | "success" | "error";

type PPE = "hardhat" | "steelcap" | "highvis";

const PPE_VALUES: PPE[] = ["hardhat", "steelcap", "highvis"];

const VISA_OPTIONS = [
  "WHV 417",
  "WHV 462",
  "Student 500",
  "Bridging",
  "Permanent / Citizen",
  "Other",
];

const ENGLISH_LEVELS = ["none", "basic", "intermediate", "fluent", "native"] as const;
type EnglishLevel = (typeof ENGLISH_LEVELS)[number];

const AVAILABILITY_DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
type Day = (typeof AVAILABILITY_DAYS)[number];

export default function JobApplicationForm({
  jobId,
  jobSlug,
  jobTitleEN,
  jobTitleFR,
}: {
  jobId: string;
  jobSlug: string;
  jobTitleEN: string;
  jobTitleFR: string;
}) {
  const { lang } = useLang();
  const isFR = lang === "FR";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [visa, setVisa] = useState("");
  const [englishLevel, setEnglishLevel] = useState<EnglishLevel | "">("");
  const [hasABN, setHasABN] = useState<"yes" | "no" | "">("");
  const [abnNumber, setAbnNumber] = useState("");
  const [hasWhiteCard, setHasWhiteCard] = useState<"yes" | "no" | "">("");
  const [ppe, setPpe] = useState<PPE[]>([]);
  const [hasVehicle, setHasVehicle] = useState<"yes" | "no" | "">("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableDays, setAvailableDays] = useState<Day[]>([]);
  const [hoursPerDay, setHoursPerDay] = useState<"full" | "morning" | "afternoon" | "flex" | "">("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const togglePPE = (item: PPE) => {
    setPpe((prev) => (prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]));
  };

  const toggleDay = (item: Day) => {
    setAvailableDays((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const t = isFR
    ? {
        sections: {
          identity: "1. Toi",
          eligibility: "2. Éligibilité",
          site: "3. Prêt pour le chantier",
          logistics: "4. Logistique et dispos",
        },
        firstName: "Prénom",
        lastName: "Nom",
        email: "Email",
        phone: "Téléphone (format AU ou international)",
        phonePlaceholder: "+61 4XX XXX XXX",
        age: "Âge",
        visa: "Visa actuel",
        visaPick: "Choisis ton visa",
        englishLevel: "Niveau d'anglais",
        englishPick: "Choisis ton niveau",
        englishLevels: {
          none: "Aucun ou très basique",
          basic: "Basique (mots simples)",
          intermediate: "Intermédiaire (conversation OK)",
          fluent: "Courant",
          native: "Langue maternelle",
        } as Record<EnglishLevel, string>,
        abn: "As-tu un ABN ?",
        abnNumber: "Numéro d'ABN (optionnel)",
        whiteCard: "As-tu la White Card ?",
        ppe: "EPI dont tu disposes (coche ce que tu as déjà)",
        ppeHardhat: "Casque de chantier",
        ppeSteelcap: "Chaussures à coque",
        ppeHighvis: "Gilet haute visibilité",
        vehicle: "As-tu un véhicule à Melbourne ?",
        availableFrom: "Disponible à partir du",
        days: "Jours où tu peux travailler",
        dayLabels: {
          mon: "Lun",
          tue: "Mar",
          wed: "Mer",
          thu: "Jeu",
          fri: "Ven",
          sat: "Sam",
          sun: "Dim",
        } as Record<Day, string>,
        hours: "Horaires préférés",
        hoursFull: "Journée complète",
        hoursMorning: "Matin seulement",
        hoursAfternoon: "Après-midi seulement",
        hoursFlex: "Flexible",
        notes: "Un mot pour le builder (expérience, motivation, infos utiles)",
        notesPlaceholder: "Ex : j'ai déjà fait 2 mois sur un chantier en France, je commence dès demain si besoin.",
        yes: "Oui",
        no: "Non",
        submit: "Envoyer ma candidature",
        submitting: "Envoi…",
        successTitle: "Candidature envoyée.",
        successBody:
          "On a bien reçu ton profil. Si tu corresponds, on te recontacte sur WhatsApp ou par email sous 24 à 48h ouvrées.",
        errorTitle: "Oups, l'envoi a échoué.",
        errorRetry: "Réessaye dans un instant, ou contacte-nous directement sur WhatsApp.",
        required: "Champ obligatoire",
        pick: "Choisis",
      }
    : {
        sections: {
          identity: "1. About you",
          eligibility: "2. Eligibility",
          site: "3. Site-ready",
          logistics: "4. Logistics and availability",
        },
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Phone (AU or international format)",
        phonePlaceholder: "+61 4XX XXX XXX",
        age: "Age",
        visa: "Current visa",
        visaPick: "Pick your visa",
        englishLevel: "English level",
        englishPick: "Pick your level",
        englishLevels: {
          none: "None or very basic",
          basic: "Basic (simple words)",
          intermediate: "Intermediate (can hold a conversation)",
          fluent: "Fluent",
          native: "Native speaker",
        } as Record<EnglishLevel, string>,
        abn: "Do you have an ABN?",
        abnNumber: "ABN number (optional)",
        whiteCard: "Do you have a White Card?",
        ppe: "PPE you own (tick what you already have)",
        ppeHardhat: "Hard hat",
        ppeSteelcap: "Steel cap boots",
        ppeHighvis: "High-vis vest",
        vehicle: "Do you have a vehicle in Melbourne?",
        availableFrom: "Available from",
        days: "Days you can work",
        dayLabels: {
          mon: "Mon",
          tue: "Tue",
          wed: "Wed",
          thu: "Thu",
          fri: "Fri",
          sat: "Sat",
          sun: "Sun",
        } as Record<Day, string>,
        hours: "Preferred hours",
        hoursFull: "Full day",
        hoursMorning: "Mornings only",
        hoursAfternoon: "Afternoons only",
        hoursFlex: "Flexible",
        notes: "A word to the builder (experience, motivation, useful info)",
        notesPlaceholder: "e.g. I did 2 months on a building site in the UK, I can start tomorrow if needed.",
        yes: "Yes",
        no: "No",
        submit: "Send my application",
        submitting: "Sending…",
        successTitle: "Application sent.",
        successBody:
          "We received your profile. If you're a match, we'll come back to you on WhatsApp or by email within 24 to 48 business hours.",
        errorTitle: "Sorry, sending failed.",
        errorRetry: "Try again in a moment, or message us directly on WhatsApp.",
        required: "Required",
        pick: "Pick one",
      };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          jobSlug,
          jobTitleEN,
          jobTitleFR,
          language: lang,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          age: age ? Number(age) : null,
          visa,
          englishLevel,
          hasABN,
          abnNumber: abnNumber.trim(),
          hasWhiteCard,
          ppe,
          hasVehicle,
          availableFrom,
          availableDays,
          hoursPerDay,
          notes: notes.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Request failed with status ${res.status}`);
      }
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMsg(message);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-[22px] border p-8 text-center"
        style={{ background: "var(--color-bg)", borderColor: "rgba(30,58,74,0.08)" }}
      >
        <CheckCircle2 className="w-10 h-10 mx-auto mb-4" style={{ color: "#0F8A4F" }} />
        <h3 className="font-display font-semibold text-ocean-600 text-xl mb-2">{t.successTitle}</h3>
        <p className="text-ocean-400/75 text-base leading-relaxed max-w-md mx-auto">{t.successBody}</p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border bg-white px-4 py-3 text-base text-ocean-600 placeholder:text-ocean-400/40 focus:outline-none focus:ring-2 focus:ring-[#F29700]/30 focus:border-[#F29700] transition";
  const labelCls = "block text-sm font-semibold text-ocean-600 mb-1.5";
  const sectionCls = "rounded-[22px] border p-6 sm:p-7 space-y-5";
  const sectionStyle = { background: "var(--color-bg)", borderColor: "rgba(30,58,74,0.08)" };
  const sectionTitleCls = "font-display font-semibold text-ocean-600 text-base mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* SECTION 1 — IDENTITY */}
      <div className={sectionCls} style={sectionStyle}>
        <h3 className={sectionTitleCls}>{t.sections.identity}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="firstName">{t.firstName}<span className="text-[#C8643D]"> *</span></label>
            <input id="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
              className={inputCls} style={{ borderColor: "rgba(30,58,74,0.15)" }} autoComplete="given-name" />
          </div>
          <div>
            <label className={labelCls} htmlFor="lastName">{t.lastName}<span className="text-[#C8643D]"> *</span></label>
            <input id="lastName" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)}
              className={inputCls} style={{ borderColor: "rgba(30,58,74,0.15)" }} autoComplete="family-name" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="email">{t.email}<span className="text-[#C8643D]"> *</span></label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className={inputCls} style={{ borderColor: "rgba(30,58,74,0.15)" }} autoComplete="email" />
          </div>
          <div>
            <label className={labelCls} htmlFor="phone">{t.phone}<span className="text-[#C8643D]"> *</span></label>
            <input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder={t.phonePlaceholder}
              className={inputCls} style={{ borderColor: "rgba(30,58,74,0.15)" }} autoComplete="tel" />
          </div>
        </div>
        <div className="sm:max-w-[180px]">
          <label className={labelCls} htmlFor="age">{t.age}<span className="text-[#C8643D]"> *</span></label>
          <input id="age" type="number" min={16} max={80} required value={age} onChange={(e) => setAge(e.target.value)}
            className={inputCls} style={{ borderColor: "rgba(30,58,74,0.15)" }} />
        </div>
      </div>

      {/* SECTION 2 — ELIGIBILITY */}
      <div className={sectionCls} style={sectionStyle}>
        <h3 className={sectionTitleCls}>{t.sections.eligibility}</h3>
        <div>
          <label className={labelCls} htmlFor="visa">{t.visa}<span className="text-[#C8643D]"> *</span></label>
          <select id="visa" required value={visa} onChange={(e) => setVisa(e.target.value)}
            className={inputCls} style={{ borderColor: "rgba(30,58,74,0.15)" }}>
            <option value="">{t.visaPick}</option>
            {VISA_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="englishLevel">{t.englishLevel}<span className="text-[#C8643D]"> *</span></label>
          <select
            id="englishLevel"
            required
            value={englishLevel}
            onChange={(e) => setEnglishLevel(e.target.value as EnglishLevel)}
            className={inputCls}
            style={{ borderColor: "rgba(30,58,74,0.15)" }}
          >
            <option value="">{t.englishPick}</option>
            {ENGLISH_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>{t.englishLevels[lvl]}</option>
            ))}
          </select>
        </div>

        <div>
          <span className={labelCls}>{t.abn}<span className="text-[#C8643D]"> *</span></span>
          <YesNo value={hasABN} onChange={setHasABN} t={t} />
        </div>
        {hasABN === "yes" && (
          <div>
            <label className={labelCls} htmlFor="abnNumber">{t.abnNumber}</label>
            <input id="abnNumber" type="text" value={abnNumber} onChange={(e) => setAbnNumber(e.target.value)}
              inputMode="numeric" pattern="[0-9 ]*" maxLength={14}
              className={inputCls} style={{ borderColor: "rgba(30,58,74,0.15)" }} />
          </div>
        )}
      </div>

      {/* SECTION 3 — SITE READY */}
      <div className={sectionCls} style={sectionStyle}>
        <h3 className={sectionTitleCls}>{t.sections.site}</h3>
        <div>
          <span className={labelCls}>{t.whiteCard}<span className="text-[#C8643D]"> *</span></span>
          <YesNo value={hasWhiteCard} onChange={setHasWhiteCard} t={t} />
        </div>

        <div>
          <span className={labelCls}>{t.ppe}</span>
          <div className="grid sm:grid-cols-3 gap-2.5 mt-2">
            {PPE_VALUES.map((item) => {
              const checked = ppe.includes(item);
              const label =
                item === "hardhat"
                  ? t.ppeHardhat
                  : item === "steelcap"
                  ? t.ppeSteelcap
                  : t.ppeHighvis;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => togglePPE(item)}
                  className="rounded-xl border px-4 py-3 text-sm font-semibold text-left transition-all"
                  style={{
                    background: checked ? "#F29700" : "white",
                    color: checked ? "white" : "var(--color-ink)",
                    borderColor: checked ? "#F29700" : "rgba(30,58,74,0.15)",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 4 — LOGISTICS & AVAILABILITY */}
      <div className={sectionCls} style={sectionStyle}>
        <h3 className={sectionTitleCls}>{t.sections.logistics}</h3>

        <div>
          <span className={labelCls}>{t.vehicle}<span className="text-[#C8643D]"> *</span></span>
          <YesNo value={hasVehicle} onChange={setHasVehicle} t={t} />
        </div>

        <div>
          <label className={labelCls} htmlFor="availableFrom">{t.availableFrom}<span className="text-[#C8643D]"> *</span></label>
          <input
            id="availableFrom"
            type="date"
            required
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
            className={inputCls}
            style={{ borderColor: "rgba(30,58,74,0.15)", maxWidth: 220 }}
          />
        </div>

        <div>
          <span className={labelCls}>{t.days}<span className="text-[#C8643D]"> *</span></span>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-2">
            {AVAILABILITY_DAYS.map((d) => {
              const checked = availableDays.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className="rounded-xl border px-2 py-3 text-sm font-semibold transition-all"
                  style={{
                    background: checked ? "#F29700" : "white",
                    color: checked ? "white" : "var(--color-ink)",
                    borderColor: checked ? "#F29700" : "rgba(30,58,74,0.15)",
                  }}
                >
                  {t.dayLabels[d]}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="hoursPerDay">{t.hours}<span className="text-[#C8643D]"> *</span></label>
          <select
            id="hoursPerDay"
            required
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value as typeof hoursPerDay)}
            className={inputCls}
            style={{ borderColor: "rgba(30,58,74,0.15)" }}
          >
            <option value="">{t.pick}</option>
            <option value="full">{t.hoursFull}</option>
            <option value="morning">{t.hoursMorning}</option>
            <option value="afternoon">{t.hoursAfternoon}</option>
            <option value="flex">{t.hoursFlex}</option>
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="notes">{t.notes}</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder={t.notesPlaceholder}
            className={inputCls}
            style={{ borderColor: "rgba(30,58,74,0.15)", resize: "vertical" }}
          />
        </div>
      </div>

      {status === "error" && (
        <div
          className="rounded-2xl border p-4 flex items-start gap-3"
          style={{ background: "rgba(200,100,61,0.08)", borderColor: "rgba(200,100,61,0.25)" }}
        >
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#C8643D" }} />
          <div>
            <p className="font-semibold text-sm" style={{ color: "#7A3917" }}>{t.errorTitle}</p>
            <p className="text-xs leading-relaxed mt-0.5" style={{ color: "#7A3917" }}>
              {t.errorRetry}
            </p>
            {errorMsg && (
              <p className="text-[11px] mt-1 opacity-70" style={{ color: "#7A3917" }}>
                {errorMsg}
              </p>
            )}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full text-white transition-all disabled:opacity-60"
        style={{ background: "#F29700", boxShadow: "0 4px 20px rgba(242,151,0,0.35)" }}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t.submitting}
          </>
        ) : (
          t.submit
        )}
      </button>
    </form>
  );
}

function YesNo({
  value,
  onChange,
  t,
}: {
  value: "yes" | "no" | "";
  onChange: (v: "yes" | "no") => void;
  t: { yes: string; no: string };
}) {
  return (
    <div className="flex gap-2.5 mt-2">
      {(["yes", "no"] as const).map((v) => {
        const active = value === v;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className="px-6 py-2.5 rounded-full border text-sm font-semibold transition-all"
            style={{
              background: active ? "#F29700" : "white",
              color: active ? "white" : "var(--color-ink)",
              borderColor: active ? "#F29700" : "rgba(30,58,74,0.15)",
            }}
          >
            {v === "yes" ? t.yes : t.no}
          </button>
        );
      })}
    </div>
  );
}
