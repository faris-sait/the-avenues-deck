type InquiryIntent = "lease" | "sponsor" | "book";

interface InquiryEmailData {
  intent: InquiryIntent;
  category?: string;
  name: string;
  company?: string;
  email: string;
  message: string;
  deckUrl: string;
}

const INTENT_META: Record<
  InquiryIntent,
  { label: string; eyebrow: string; summary: string }
> = {
  lease: {
    label: "Lease",
    eyebrow: "Retail · Luxury · Pop-up",
    summary: "A commercial leasing lead submitted through the deck's inquiry form.",
  },
  sponsor: {
    label: "Sponsor",
    eyebrow: "Brand · Partnership",
    summary: "A brand partnership lead submitted through the deck's inquiry form.",
  },
  book: {
    label: "Book",
    eyebrow: "Concert · Launch",
    summary: "A venue and activation lead submitted through the deck's inquiry form.",
  },
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMessageHtml(message: string) {
  return escapeHtml(message).replace(/\n/g, "<br />");
}

function formatIntentSubject(intent: InquiryIntent, category?: string) {
  const label = INTENT_META[intent].label.toUpperCase();
  return `[${label}${category ? ` · ${category}` : ""}]`;
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:0 0 14px;vertical-align:top;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:#c9a96e;opacity:0.88;">${escapeHtml(label)}</div>
        <div style="padding-top:5px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#f5ecd9;">${escapeHtml(value)}</div>
      </td>
    </tr>`;
}

export function buildInquiryEmail({
  intent,
  category,
  name,
  company,
  email,
  message,
  deckUrl,
}: InquiryEmailData) {
  const meta = INTENT_META[intent];
  const subject = `${formatIntentSubject(intent, category)} Inquiry from ${name}`;
  const preview = `${meta.label} inquiry from ${name}${company ? ` at ${company}` : ""}`;
  const receivedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kuwait",
  }).format(new Date());
  const safeDeckUrl = escapeHtml(deckUrl);
  const replyMailto = `mailto:${encodeURIComponent(email)}`;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#08080c;color:#f5ecd9;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;visibility:hidden;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#08080c;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:720px;background:#0f0f16;border:1px solid rgba(201,169,110,0.18);">
            <tr>
              <td style="padding:22px 28px;border-bottom:1px solid rgba(201,169,110,0.14);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:3.2px;text-transform:uppercase;color:#c9a96e;">
                      ◆ The Avenues · Kuwait
                    </td>
                    <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2.2px;text-transform:uppercase;color:#f5ecd9;opacity:0.46;">
                      Interactive Sales Deck
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 28px 30px;background:linear-gradient(180deg,#11111a 0%,#0a0a0f 100%);border-bottom:1px solid rgba(201,169,110,0.12);">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;">${escapeHtml(meta.eyebrow)}</div>
                <h1 style="margin:18px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:42px;line-height:1.02;font-weight:400;color:#f5ecd9;">
                  New ${escapeHtml(meta.label).toLowerCase()} inquiry.
                </h1>
                <p style="margin:16px 0 0;max-width:540px;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.7;color:rgba(245,236,217,0.78);">
                  ${escapeHtml(meta.summary)}
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;">
                  <tr>
                    <td style="border:1px solid rgba(201,169,110,0.22);padding:12px 16px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2.4px;text-transform:uppercase;color:#f5ecd9;background:rgba(201,169,110,0.08);">
                      ${escapeHtml(meta.label)}${category ? ` · ${escapeHtml(category)}` : ""}
                    </td>
                    <td style="padding-left:12px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2.4px;text-transform:uppercase;color:#f5ecd9;opacity:0.52;">
                      ${escapeHtml(receivedAt)} · Kuwait time
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td valign="top" style="padding:0 24px 24px 0;width:42%;min-width:220px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;padding-bottom:14px;">Contact</div>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid rgba(201,169,110,0.14);padding-top:16px;">
                        ${detailRow("Name", name)}
                        ${company ? detailRow("Company", company) : ""}
                        ${detailRow("Email", email)}
                        ${detailRow("Intent", meta.label)}
                        ${detailRow("Category", category ?? "—")}
                      </table>
                    </td>
                    <td valign="top" style="padding:0 0 24px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;padding-bottom:14px;">Message</div>
                      <div style="border:1px solid rgba(201,169,110,0.14);background:#08080c;padding:22px;">
                        <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.8;color:#ece1c9;">${formatMessageHtml(message)}</div>
                      </div>
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;">
                        <tr>
                          <td style="padding:0 12px 12px 0;">
                            <a href="${escapeHtml(replyMailto)}" style="display:inline-block;padding:14px 18px;border:1px solid #c9a96e;background:#c9a96e;color:#08080c;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2.4px;text-transform:uppercase;font-weight:700;">
                              Reply to sender
                            </a>
                          </td>
                          <td style="padding:0 0 12px;">
                            <a href="${safeDeckUrl}" style="display:inline-block;padding:14px 18px;border:1px solid rgba(245,236,217,0.18);color:#f5ecd9;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2.4px;text-transform:uppercase;">
                              Open the deck
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;border-top:1px solid rgba(201,169,110,0.12);background:#09090d;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.2;color:#f5ecd9;">
                      Thirteen million square feet of ambition.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:10px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:rgba(245,236,217,0.54);">
                      The Avenues, Kuwait. Twelve districts. One destination.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "THE AVENUES · KUWAIT",
    "Interactive Sales Deck",
    "",
    `${meta.label.toUpperCase()} INQUIRY`,
    meta.eyebrow,
    `${receivedAt} · Kuwait time`,
    "",
    `Name: ${name}`,
    `Company: ${company ?? "—"}`,
    `Email: ${email}`,
    `Intent: ${meta.label}`,
    `Category: ${category ?? "—"}`,
    "",
    "Message",
    message,
    "",
    `Open the deck: ${deckUrl}`,
    `Reply to sender: ${email}`,
  ].join("\n");

  return { subject, html, text };
}
