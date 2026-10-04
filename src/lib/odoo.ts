// src/lib/odoo.ts
// Cliente mínimo de Odoo (JSON-RPC) para crear leads del CRM desde el sitio.

const ODOO_URL = process.env.ODOO_URL!;
const ODOO_DB = process.env.ODOO_DB!;
const ODOO_USER = process.env.ODOO_USER!;
const ODOO_KEY = process.env.ODOO_KEY!;

// Mismo equipo y vendedora que usa hoy Jimena para cargar leads a mano en Odoo
// (confirmado leyendo los últimos leads reales del pipeline).
const WEB_TEAM_ID = 4; // "Ventas NOA"
const WEB_SALESPERSON_ID = 5; // Jimena García Pinto
const WEBSITE_MEDIUM_ID = 1; // "Website", ya existe en Odoo

async function jsonrpc(params: Record<string, unknown>) {
  const res = await fetch(`${ODOO_URL}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "call", params, id: Date.now() }),
  });
  const json = await res.json();
  if (json.error) {
    throw new Error(json.error.data?.message || JSON.stringify(json.error));
  }
  return json.result;
}

async function authenticate(): Promise<number> {
  const uid = await jsonrpc({
    service: "common",
    method: "authenticate",
    args: [ODOO_DB, ODOO_USER, ODOO_KEY, {}],
  });
  if (!uid) throw new Error("No se pudo autenticar con Odoo (revisar ODOO_USER/ODOO_KEY).");
  return uid;
}

async function executeKw(model: string, method: string, args: unknown[], kwargs: Record<string, unknown> = {}) {
  const uid = await authenticate();
  return jsonrpc({
    service: "object",
    method: "execute_kw",
    args: [ODOO_DB, uid, ODOO_KEY, model, method, args, kwargs],
  });
}

async function findOrCreateUtmSource(name: string): Promise<number> {
  const existing = await executeKw("utm.source", "search_read", [[["name", "=", name]]], { fields: ["id"], limit: 1 });
  if (existing.length > 0) return existing[0].id;
  return executeKw("utm.source", "create", [{ name }]);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function createLead(fields: Record<string, unknown>): Promise<{ id: number; url: string }> {
  const id: number = await executeKw("crm.lead", "create", [
    { team_id: WEB_TEAM_ID, user_id: WEB_SALESPERSON_ID, medium_id: WEBSITE_MEDIUM_ID, ...fields },
  ]);
  return { id, url: `${ODOO_URL}/web#model=crm.lead&id=${id}&view_type=form` };
}

export interface WebLeadInput {
  nombre: string;
  empresa: string;
  contacto: string; // email o teléfono, texto libre tal como lo escribió la persona
  tarea: string;
  sourceLabel: string; // "Formulario web", "Calendly", etc. — para distinguir el canal en Odoo
}

export async function createCrmLead(lead: WebLeadInput): Promise<{ id: number; url: string }> {
  const isEmail = /\S+@\S+\.\S+/.test(lead.contacto);
  const sourceId = await findOrCreateUtmSource(lead.sourceLabel);

  return createLead({
    name: `[Web] ${lead.empresa}`,
    partner_name: lead.empresa,
    contact_name: lead.nombre,
    email_from: isEmail ? lead.contacto : false,
    phone: isEmail ? false : lead.contacto,
    description: `<p><strong>Tarea a automatizar:</strong> ${escapeHtml(lead.tarea)}</p><p><strong>Contacto (tal cual lo escribió):</strong> ${escapeHtml(lead.contacto)}</p>`,
    source_id: sourceId,
  });
}

export interface CalendlyLeadInput {
  inviteeUri: string; // identificador único del invitado en Calendly, para no duplicar
  nombre: string;
  email: string;
  tituloEvento: string; // nombre del tipo de evento agendado
  horaInicio: string; // ISO
  preguntasYRespuestas: { question: string; answer: string }[];
}

// El marcador queda en la descripción del lead; buscarlo es cómo sabemos
// si un invitee de Calendly ya se cargó, sin necesitar una base de datos aparte.
function calendlyMarker(inviteeUri: string): string {
  return `<!-- calendly:${inviteeUri} -->`;
}

export async function calendlyLeadExists(inviteeUri: string): Promise<boolean> {
  const marker = calendlyMarker(inviteeUri);
  const existing = await executeKw("crm.lead", "search_read", [[["description", "like", marker]]], { fields: ["id"], limit: 1 });
  return existing.length > 0;
}

export async function createCalendlyLead(lead: CalendlyLeadInput): Promise<{ id: number; url: string }> {
  const sourceId = await findOrCreateUtmSource("Calendly");
  const fecha = new Date(lead.horaInicio).toLocaleString("es-AR", { dateStyle: "full", timeStyle: "short", timeZone: "America/Argentina/Buenos_Aires" });

  const qa = lead.preguntasYRespuestas
    .map((q) => `<p><strong>${escapeHtml(q.question)}:</strong> ${escapeHtml(q.answer)}</p>`)
    .join("");

  return createLead({
    name: `[Calendly] ${lead.nombre}`,
    contact_name: lead.nombre,
    email_from: lead.email,
    description: `<p><strong>Agendó:</strong> ${escapeHtml(lead.tituloEvento)} — ${fecha}</p>${qa}${calendlyMarker(lead.inviteeUri)}`,
    source_id: sourceId,
  });
}
