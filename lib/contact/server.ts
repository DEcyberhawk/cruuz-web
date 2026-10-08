type ContactConfig = { key?: string; from?: string; to?: string };
const subjects = new Set([
  "General Enquiry", "Join CRUUZ Launch List", "Customer Support",
  "Business Enquiry", "Driver Enquiry", "Safety Concern",
]);
const attempts = new Map<string, { count: number; until: number }>();

function reply(status: number, message: string, ok = false) {
  return Response.json({ ok, message }, { status, headers: { "Cache-Control": "no-store" } });
}

async function readBody(request: Request) {
  if (!request.body) throw new Error("Invalid body");
  const reader = request.body.getReader();
  const parts: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 16384) { await reader.cancel(); throw new Error("Body too large"); }
      parts.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) { bytes.set(part, offset); offset += part.length; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

/** Provider acceptance only. Does not assert delivery to the CRUUZ mailbox. */
export async function handleContact(request: Request, config: ContactConfig, send: typeof fetch = fetch) {
  if (request.method !== "POST") return reply(405, "Use the contact form to submit a message.");
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return reply(403, "Please submit from the CRUUZ website.");
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return reply(415, "Invalid message format.");
  }
  const id = request.headers.get("idempotency-key") || "";
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(id)) {
    return reply(400, "Reload the contact form and try again.");
  }
  // Best-effort per-instance throttling. The deployment firewall must also limit
  // this public endpoint: instances do not share this map.
  const now = Date.now();
  for (const [ip, state] of attempts) if (state.until <= now) attempts.delete(ip);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const state = attempts.get(ip) || { count: 0, until: now + 10 * 60_000 };
  if (state.count >= 5 || (!attempts.has(ip) && attempts.size >= 5000)) return reply(429, "Please wait before sending another message.");
  state.count++; attempts.set(ip, state);

  let body;
  try { body = await readBody(request); } catch { return reply(400, "Check the form and shorten your message if necessary."); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply(400, "Invalid message.");
  const limits: Record<string, number> = { name: 120, email: 254, phone: 40, subject: 60, message: 5000, website: 200 };
  for (const [field, limit] of Object.entries(limits)) {
    if (typeof body[field] !== "string" || body[field].length > limit) return reply(400, "Check the form fields and message length.");
  }
  if (body.website.trim()) return reply(400, "The message could not be submitted.");
  const name = body.name.trim(), email = body.email.trim(), phone = body.phone.trim();
  const subject = body.subject.trim(), message = body.message.trim();
  if (!name || !message || !subjects.has(subject) || /[\r\n\x00]/.test(name + email + phone) ||
      !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) return reply(400, "Enter a valid name, email, subject and message.");

  const key = config.key?.trim(), from = config.from?.trim(), to = config.to?.trim();
  if (!key || !from || !to || /[\r\n]/.test(from + to) || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(to)) {
    return reply(503, "The contact form is temporarily unavailable. Please use the email or phone contacts shown on this page.");
  }
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `cruuz-web-contact/${id}` },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `CRUUZ website: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nSubject: ${subject}\n\n${message}` }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return reply(502, "Your message was not confirmed. Please contact CRUUZ by email or phone before trying again.");
    const result = await response.json();
    if (typeof result?.id !== "string" || !result.id.trim()) return reply(502, "We could not confirm your submission. Please contact CRUUZ by email or phone before trying again.");
    return reply(200, "Your message has been submitted to CRUUZ.", true);
  } catch {
    // No blind retry: a timeout can occur after the provider accepts the email.
    return reply(502, "We could not confirm your submission. Please contact CRUUZ by email or phone before trying again.");
  }
}
