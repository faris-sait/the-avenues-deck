import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const InquirySchema = z.object({
  intent: z.enum(["lease", "sponsor", "book"]),
  category: z.string().max(50).optional(),
  name: z.string().min(1).max(120),
  company: z.string().max(120).optional(),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = InquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { intent, category, name, company, email, message } = parsed.data;

  // Placeholder recipient — overridable via env var when Faris provides a real address.
  const to = process.env.INQUIRY_RECIPIENT ?? "leasing@example.com";
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "The Avenues Deck <deck@noreply.invalid>",
      to,
      subject: `[${intent.toUpperCase()}${category ? ` · ${category}` : ""}] Inquiry from ${name}`,
      replyTo: email,
      text: `From: ${name}${company ? ` (${company})` : ""} <${email}>\nIntent: ${intent}\nCategory: ${category ?? "—"}\n\n${message}`,
    });
  } else {
    console.warn(
      "[contact] RESEND_API_KEY not set — inquiry not sent. Payload:",
      parsed.data
    );
  }

  return NextResponse.json({ ok: true });
}
