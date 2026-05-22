import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  jobId?: string;
  jobSlug?: string;
  jobTitleEN?: string;
  jobTitleFR?: string;
  language?: "FR" | "EN";
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  age?: number | null;
  visa?: string;
  englishLevel?: "none" | "basic" | "intermediate" | "fluent" | "native" | "";
  hasABN?: "yes" | "no" | "";
  abnNumber?: string;
  hasWhiteCard?: "yes" | "no" | "";
  ppe?: ("hardhat" | "steelcap" | "highvis")[];
  hasVehicle?: "yes" | "no" | "";
  availableFrom?: string;
  availableDays?: string[];
  hoursPerDay?: string;
  notes?: string;
};

const REQUIRED_FIELDS: (keyof Payload)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "age",
  "visa",
  "englishLevel",
  "hasABN",
  "hasWhiteCard",
  "hasVehicle",
  "availableFrom",
  "hoursPerDay",
];

function validate(body: Payload): string | null {
  for (const f of REQUIRED_FIELDS) {
    const v = body[f];
    if (v === undefined || v === null || v === "") return `Missing field: ${String(f)}`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email || "")) return "Invalid email";
  if (!body.availableDays || body.availableDays.length === 0) return "Pick at least one available day";
  return null;
}

function normaliseE164(input: string | undefined | null): string | undefined {
  if (!input) return undefined;
  const cleaned = input.trim().replace(/[^\d+]/g, "");
  if (/^\+\d{8,15}$/.test(cleaned)) return cleaned;
  if (/^0\d{9}$/.test(cleaned)) return "+61" + cleaned.slice(1);
  if (/^61\d{9}$/.test(cleaned)) return "+" + cleaned;
  return undefined;
}

function summariseForAttribute(body: Payload, rawPhone: string): Record<string, string | number | boolean> {
  const ppeJoined = (body.ppe || []).join(",");
  const daysJoined = (body.availableDays || []).join(",");
  const baseNotes = (body.notes || "").trim();
  const notes = [rawPhone ? `Phone: ${rawPhone}` : "", baseNotes].filter(Boolean).join("\n\n");
  return {
    JOB_LAST_APPLIED: body.jobTitleEN || body.jobSlug || "",
    JOB_LAST_SLUG: body.jobSlug || "",
    AGE: body.age ?? 0,
    VISA: body.visa || "",
    ENGLISH_LEVEL: body.englishLevel || "",
    HAS_ABN: body.hasABN === "yes",
    ABN_NUMBER: body.abnNumber || "",
    HAS_WHITECARD: body.hasWhiteCard === "yes",
    PPE_OWNED: ppeJoined,
    HAS_VEHICLE: body.hasVehicle === "yes",
    AVAILABLE_FROM: body.availableFrom || "",
    AVAILABLE_DAYS: daysJoined,
    HOURS_PER_DAY: body.hoursPerDay || "",
    APPLICANT_NOTES: notes,
    LANGUAGE: body.language || "",
  };
}

async function brevoUpsertContact(body: Payload) {
  const apiKey = process.env.BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_APPLICANTS_LIST_ID;
  if (!apiKey) {
    console.warn("[brevo] BREVO_API_KEY missing - skipping Brevo sync (mock mode).");
    return { mock: true };
  }
  const rawPhone = (body.phone || "").trim();
  const smsE164 = normaliseE164(rawPhone);
  const attributes: Record<string, string | number | boolean> = {
    FIRSTNAME: body.firstName || "",
    LASTNAME: body.lastName || "",
    ...summariseForAttribute(body, rawPhone),
  };
  if (smsE164) attributes.SMS = smsE164;
  const listIds = listIdRaw ? [Number(listIdRaw)].filter((n) => Number.isFinite(n)) : undefined;

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email: body.email,
      attributes,
      updateEnabled: true,
      listIds,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo error ${res.status}: ${text}`);
  }
  return { mock: false };
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const err = validate(body);
  if (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }

  try {
    const result = await brevoUpsertContact(body);
    console.log("[job-application]", {
      job: body.jobSlug,
      email: body.email,
      brevo: result.mock ? "mock" : "live",
    });
    return NextResponse.json({ ok: true, brevo: result.mock ? "mock" : "live" });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("[job-application] Brevo sync failed:", message);
    return NextResponse.json({ error: "Brevo sync failed", detail: message }, { status: 502 });
  }
}
