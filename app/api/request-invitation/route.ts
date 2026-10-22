import { NextResponse } from "next/server";
import { Resend } from "resend";

type InvitationRequest = {
  name?: unknown;
  email?: unknown;
  country?: unknown;
  applicantType?: unknown;
  collectionValue?: unknown;
};

const emailPattern = /^\S+@\S+\.\S+$/;
const defaultRecipient = "applications@accessvaultier.co";

export async function POST(request: Request) {
  let body: InvitationRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fields = {
    name: clean(body.name, 120),
    email: clean(body.email, 254),
    country: clean(body.country, 120),
    applicantType: clean(body.applicantType, 120),
    collectionValue: clean(body.collectionValue, 120),
  };

  if (!fields.name || !emailPattern.test(fields.email) || !fields.applicantType || !fields.collectionValue || !fields.country) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 422 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const submittedAt = new Date().toISOString();
    const recipient = process.env.INVITATION_FORM_RECIPIENT_EMAIL || defaultRecipient;
    const sender = process.env.INVITATION_FORM_FROM_EMAIL || defaultRecipient;
    const resend = new Resend(resendApiKey);
    const idempotencyKey = await submissionId(fields);
    const { error } = await resend.emails.send(
      {
        from: `Vaultier Private Enquiry <${sender}>`,
        to: [recipient],
        replyTo: fields.email,
        subject: `Private enquiry — ${fields.name}`,
        html: enquiryHtml(fields, submittedAt),
        text: enquiryText(fields, submittedAt),
        tags: [{ name: "email_type", value: "private_enquiry" }],
      },
      { idempotencyKey: `private-enquiry/${idempotencyKey}` },
    );

    if (error) {
      console.error("Private enquiry email delivery failed", {
        name: error.name,
        message: error.message,
      });
      return NextResponse.json({ error: "Submission service unavailable." }, { status: 502 });
    }

    return NextResponse.json({ received: true });
  }

  const webhookUrl = process.env.INVITATION_FORM_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ received: true, mode: "preview" }, { status: 202 });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.INVITATION_FORM_API_KEY
        ? { Authorization: `Bearer ${process.env.INVITATION_FORM_API_KEY}` }
        : {}),
    },
    body: JSON.stringify({ ...fields, submittedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Submission service unavailable." }, { status: 502 });
  }

  return NextResponse.json({ received: true });
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function submissionId(fields: Record<string, string>) {
  const input = new TextEncoder().encode(JSON.stringify(fields));
  const digest = await crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function enquiryText(fields: Record<string, string>, submittedAt: string) {
  return [
    "New Vaultier private enquiry",
    "",
    `Full name: ${fields.name}`,
    `Email address: ${fields.email}`,
    `Applicant type: ${fields.applicantType}`,
    `Approximate collection value: ${fields.collectionValue}`,
    `Country of residence: ${fields.country}`,
    `Submitted at: ${submittedAt}`,
  ].join("\n");
}

function enquiryHtml(fields: Record<string, string>, submittedAt: string) {
  const rows = [
    ["Full name", fields.name],
    ["Email address", fields.email],
    ["Applicant type", fields.applicantType],
    ["Approximate collection value", fields.collectionValue],
    ["Country of residence", fields.country],
    ["Submitted at", submittedAt],
  ];

  return `<!doctype html>
<html lang="en-GB">
  <head><meta charset="utf-8"><title>New Vaultier private enquiry</title></head>
  <body style="margin:0;background:#f6f4f2;color:#141412;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:640px;margin:0 auto;padding:40px 28px">
      <p style="margin:0 0 28px;color:#6b6f3a;font-size:11px;letter-spacing:.14em;text-transform:uppercase">Vaultier Private Enquiry</p>
      <h1 style="margin:0 0 32px;color:#0f2a36;font-family:Georgia,serif;font-size:30px;font-weight:400">New application received</h1>
      <table role="presentation" style="width:100%;border-collapse:collapse">
        ${rows.map(([label, value]) => `<tr><th scope="row" style="padding:14px 16px 14px 0;border-top:1px solid #d8d2c7;color:#6b6f3a;font-size:11px;font-weight:400;letter-spacing:.08em;text-align:left;text-transform:uppercase;vertical-align:top">${escapeHtml(label)}</th><td style="padding:14px 0;border-top:1px solid #d8d2c7;color:#141412;font-size:14px;line-height:1.5">${escapeHtml(value)}</td></tr>`).join("")}
      </table>
    </div>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);
}
