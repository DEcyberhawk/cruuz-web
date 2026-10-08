import { handleContact } from "@/lib/contact/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleContact(request, {
    key: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_EMAIL_FROM || process.env.AUTH_EMAIL_FROM,
    to: process.env.CONTACT_EMAIL_TO,
  });
}
