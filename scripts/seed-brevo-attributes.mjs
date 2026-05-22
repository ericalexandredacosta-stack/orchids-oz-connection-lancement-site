#!/usr/bin/env node
// One-shot: create the custom contact attributes used by /api/jobs/apply in Brevo.
// Usage:
//   node scripts/seed-brevo-attributes.mjs <BREVO_API_KEY>
// or:
//   BREVO_API_KEY=xkeysib-... node scripts/seed-brevo-attributes.mjs

const apiKey = process.argv[2] || process.env.BREVO_API_KEY;
if (!apiKey) {
  console.error("Pass the Brevo v3 API key as first arg or set BREVO_API_KEY in env.");
  console.error("Get it from Brevo dashboard: Settings -> SMTP & API -> API keys.");
  process.exit(1);
}

const attributes = [
  { name: "JOB_LAST_APPLIED", type: "text" },
  { name: "JOB_LAST_SLUG", type: "text" },
  { name: "AGE", type: "float" },
  { name: "VISA", type: "text" },
  { name: "ENGLISH_LEVEL", type: "text" },
  { name: "HAS_ABN", type: "boolean" },
  { name: "ABN_NUMBER", type: "text" },
  { name: "HAS_WHITECARD", type: "boolean" },
  { name: "PPE_OWNED", type: "text" },
  { name: "HAS_VEHICLE", type: "boolean" },
  { name: "AVAILABLE_FROM", type: "date" },
  { name: "AVAILABLE_DAYS", type: "text" },
  { name: "HOURS_PER_DAY", type: "text" },
  { name: "APPLICANT_NOTES", type: "text" },
  { name: "LANGUAGE", type: "text" },
];

const results = [];

for (const attr of attributes) {
  const url = `https://api.brevo.com/v3/contacts/attributes/normal/${attr.name}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ type: attr.type }),
    });
    const body = await res.text();
    if (res.ok || res.status === 204) {
      results.push({ attribute: attr.name, type: attr.type, result: "CREATED" });
    } else if (res.status === 400 && /already exists|duplicate/i.test(body)) {
      results.push({ attribute: attr.name, type: attr.type, result: "exists" });
    } else {
      results.push({ attribute: attr.name, type: attr.type, result: `ERROR ${res.status}`, detail: body.slice(0, 200) });
    }
  } catch (e) {
    results.push({ attribute: attr.name, type: attr.type, result: "EXCEPTION", detail: e?.message });
  }
}

console.table(results);

const errors = results.filter((r) => /ERROR|EXCEPTION/.test(r.result));
process.exit(errors.length > 0 ? 1 : 0);
