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

function summariseForAttribute(body: Payload): Record<string, string | number | boolean> {
  const ppeJoined = (body.ppe || []).join(",");
  const daysJoined = (body.availableDays || []).join(",");
  return {
    JOB_LAST_APPLIED: body.jobTitleEN || body.jobSlug || "",
    JOB_LAST_SLUG: body.jobSlug || "",
    AGE: body.age ?? 0,
    VISA: body.visa || "",
    HAS_ABN: body.hasABN === "yes",
    ABN_NUMBER: body.abnNumber || "",
    HAS_WHITECARD: body.hasWhiteCard === "yes",
    PPE_OWNED: ppeJoined,
    HAS_VEHICLE: body.hasVehicle === "yes",
    AVAILABLE_FROM: body.availableFrom || "",
    AVAILABLE_DAYS: daysJoined,
    HOURS_PER_DAY: body.hoursPerDay || "",
    APPLICANT_NOTES: body.notes || "",
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
  const attributes = {
    FIRSTNAME: body.firstName,
    LASTNAME: body.lastName,
    SMS: body.phone,
    ...summariseForAttribute(body),
  };
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
