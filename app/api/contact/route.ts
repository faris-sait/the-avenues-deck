import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { buildInquiryEmail } from "../../../lib/inquiry-email";

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
  const deckUrl = new URL("/#action", req.url).toString();
  const emailContent = buildInquiryEmail({
    intent,
    category,
    name,
    company,
    email,
    message,
    deckUrl,
  });

  const recipients = (process.env.INQUIRY_RECIPIENT ?? "leasing@example.com")
    .split(/[,;]/)
    .map((value) => value.trim())
    .filter(Boolean);
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? "deck@noreply.invalid";

  if (apiKey) {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `The Avenues Deck <${fromAddress}>`,
      to: recipients.length === 1 ? recipients[0] : recipients,
      subject: emailContent.subject,
      replyTo: email,
      html: emailContent.html,
      text: emailContent.text,
    });
  } else {
    console.warn(
      "[contact] RESEND_API_KEY not set — inquiry not sent. Payload:",
      parsed.data
    );
  }

  return NextResponse.json({ ok: true });
}
