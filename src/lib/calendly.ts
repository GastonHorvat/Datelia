// src/lib/calendly.ts
// Verificación de firma y tipos mínimos para el webhook de Calendly (invitee.created).

import crypto from "crypto";

const SIGNATURE_TOLERANCE_SECONDS = 180;

export function verifyCalendlySignature(rawBody: string, signatureHeader: string | null, signingKey: string): boolean {
  if (!signatureHeader) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((pair) => {
      const [key, value] = pair.split("=");
      return [key, value];
    })
  );
  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > SIGNATURE_TOLERANCE_SECONDS) return false;

  const expected = crypto
    .createHmac("sha256", signingKey)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export interface CalendlyInviteeCreatedPayload {
  event: "invitee.created";
  payload: {
    uri: string;
    name: string;
    email: string;
    questions_and_answers: { question: string; answer: string }[];
    scheduled_event: {
      name: string;
      start_time: string;
      location?: { type?: string; location?: string };
    };
  };
}

// --- Polling (plan free, sin webhooks) ---

const PAT = process.env.CALENDLY_PAT!;
const API = "https://api.calendly.com";

async function calendlyApi(path: string) {
  const res = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${PAT}` } });
  if (!res.ok) throw new Error(`Calendly API ${res.status}: ${await res.text()}`);
  return res.json();
}

export interface CalendlyInvitee {
  uri: string;
  name: string;
  email: string;
  questions_and_answers: { question: string; answer: string }[];
}

export interface CalendlyEventWithInvitees {
  name: string;
  start_time: string;
  invitees: CalendlyInvitee[];
}

export async function listRecentBookings(organizationUri: string, lookbackDays: number): Promise<CalendlyEventWithInvitees[]> {
  const minStartTime = new Date(Date.now() - lookbackDays * 24 * 60 * 60 * 1000).toISOString();
  const maxStartTime = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();

  const events: { uri: string; name: string; start_time: string }[] = [];
  let nextPageToken: string | null = null;

  do {
    const qs = new URLSearchParams({
      organization: organizationUri,
      status: "active",
      min_start_time: minStartTime,
      max_start_time: maxStartTime,
      sort: "start_time:asc",
      count: "100",
      ...(nextPageToken ? { page_token: nextPageToken } : {}),
    });
    const page = await calendlyApi(`/scheduled_events?${qs}`);
    events.push(...page.collection);
    nextPageToken = page.pagination?.next_page_token || null;
  } while (nextPageToken);

  const results: CalendlyEventWithInvitees[] = [];
  for (const event of events) {
    const eventUuid = event.uri.split("/").pop();
    const inviteesPage = await calendlyApi(`/scheduled_events/${eventUuid}/invitees?count=100`);
    const invitees: CalendlyInvitee[] = inviteesPage.collection.map((i: { uri: string; name: string; email: string; questions_and_answers: { question: string; answer: string }[] }) => ({
      uri: i.uri,
      name: i.name,
      email: i.email,
      questions_and_answers: i.questions_and_answers || [],
    }));
    if (invitees.length > 0) {
      results.push({ name: event.name, start_time: event.start_time, invitees });
    }
  }

  return results;
}
