import { NextResponse } from "next/server";
import { Resend } from "resend";
import { professionalDisciplineOptions } from "../../professional-access/professional-data";

type ProfessionalApplication = {
  businessName?: unknown;
  registrationNumber?: unknown;
  primaryContact?: unknown;
  email?: unknown;
  website?: unknown;
  discipline?: unknown;
  qualifications?: unknown;
  insurance?: unknown;
  experience?: unknown;
  referral?: unknown;
  faxNumber?: unknown;
};

const emailPattern = /^\S+@\S+\.\S+$/;
const disciplines = new Set<string>(professionalDisciplineOptions);
const insuranceOptions = new Set(["Yes", "No"]);
const defaultRecipient = "applications@accessvaultier.co";

export async function POST(request: Request) {
  let body: ProfessionalApplication;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.faxNumber, 120)) {
    return NextResponse.json({ received: true });
  }

  const fields = {
    businessName: clean(body.businessName, 160),
    registrationNumber: clean(body.registrationNumber, 100),
    primaryContact: clean(body.primaryContact, 120),
    email: clean(body.email, 254),
    website: clean(body.website, 300),
    discipline: clean(body.discipline, 120),
    qualifications: clean(body.qualifications, 500),
    insurance: clean(body.insurance, 10),
    experience: clean(body.experience, 2000),
    referral: clean(body.referral, 500),
  };

  const requiredFieldsPresent =
    fields.businessName &&
    fields.primaryContact &&
    fields.email &&
    fields.discipline &&
    fields.insurance &&
    fields.experience;
  const valuesAreValid =
    emailPattern.test(fields.email) &&
    disciplines.has(fields.discipline) &&
    insuranceOptions.has(fields.insurance) &&
    (!fields.website || isValidWebsite(fields.website));

  if (!requiredFieldsPresent || !valuesAreValid) {
    return NextResponse.json({ error: "Please complete all required fields with valid information." }, { status: 422 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const submittedAt = new Date().toISOString();
    const recipient =
      process.env.PROFESSIONAL_APPLICATIONS_RECIPIENT_EMAIL ||
      process.env.INVITATION_FORM_RECIPIENT_EMAIL ||
      defaultRecipient;
    const sender =
      process.env.PROFESSIONAL_APPLICATIONS_FROM_EMAIL ||
      process.env.INVITATION_FORM_FROM_EMAIL ||
      defaultRecipient;
    const resend = new Resend(resendApiKey);
    const idempotencyKey = await submissionId(fields);
    const { error } = await resend.emails.send(
      {
        from: `Vaultier Professional Access <${sender}>`,
        to: [recipient],
        replyTo: fields.email,
        subject: `Professional application — ${fields.businessName}`,
        html: applicationHtml(fields, submittedAt),
        text: applicationText(fields, submittedAt),
        tags: [{ name: "email_type", value: "professional_application" }],
      },
      { idempotencyKey: `professional-application/${idempotencyKey}` },
    );

    if (error) {
      console.error("Professional application email delivery failed", {
        name: error.name,
        message: error.message,
      });
      return NextResponse.json({ error: "Submission service unavailable." }, { status: 502 });
    }

    return NextResponse.json({ received: true });
  }

  const webhookUrl = process.env.PROFESSIONAL_APPLICATIONS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ received: true, mode: "preview" }, { status: 202 });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.PROFESSIONAL_APPLICATIONS_API_KEY
        ? { Authorization: `Bearer ${process.env.PROFESSIONAL_APPLICATIONS_API_KEY}` }
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

function isValidWebsite(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return !!url.hostname && url.hostname.includes(".");
  } catch {
    return false;
  }
}

async function submissionId(fields: Record<string, string>) {
  const input = new TextEncoder().encode(JSON.stringify(fields));
  const digest = await crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function applicationText(fields: Record<string, string>, submittedAt: string) {
  return [
    "New Vaultier professional application",
    "",
    `Business or trading name: ${fields.businessName}`,
    `Company registration number: ${fields.registrationNumber || "Not provided"}`,
    `Primary contact: ${fields.primaryContact}`,
    `Email address: ${fields.email}`,
    `Website: ${fields.website || "Not provided"}`,
    `Professional discipline: ${fields.discipline}`,
    `Relevant qualifications or memberships: ${fields.qualifications || "Not provided"}`,
    `Professional insurance: ${fields.insurance}`,
    `Short description of experience: ${fields.experience}`,
    `How they heard about Vaultier: ${fields.referral || "Not provided"}`,
    `Submitted at: ${submittedAt}`,
  ].join("\n");
}

function applicationHtml(fields: Record<string, string>, submittedAt: string) {
  const rows = [
    ["Business or trading name", fields.businessName],
    ["Company registration number", fields.registrationNumber || "Not provided"],
    ["Primary contact", fields.primaryContact],
    ["Email address", fields.email],
    ["Website", fields.website || "Not provided"],
    ["Professional discipline", fields.discipline],
    ["Relevant qualifications or memberships", fields.qualifications || "Not provided"],
    ["Professional insurance", fields.insurance],
    ["Short description of experience", fields.experience],
    ["How they heard about Vaultier", fields.referral || "Not provided"],
    ["Submitted at", submittedAt],
  ];

  return `<!doctype html>
<html lang="en-GB">
  <head><meta charset="utf-8"><title>New Vaultier professional application</title></head>
  <body style="margin:0;background:#f6f4f2;color:#141412;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:680px;margin:0 auto;padding:40px 28px">
      <p style="margin:0 0 28px;color:#6b6f3a;font-size:11px;letter-spacing:.14em;text-transform:uppercase">Vaultier Professional Access</p>
      <h1 style="margin:0 0 32px;color:#0f2a36;font-family:Georgia,serif;font-size:30px;font-weight:400">New professional application</h1>
      <table role="presentation" style="width:100%;border-collapse:collapse">
        ${rows.map(([label, value]) => `<tr><th scope="row" style="width:36%;padding:14px 18px 14px 0;border-top:1px solid #d8d2c7;color:#6b6f3a;font-size:11px;font-weight:400;letter-spacing:.08em;text-align:left;text-transform:uppercase;vertical-align:top">${escapeHtml(label)}</th><td style="padding:14px 0;border-top:1px solid #d8d2c7;color:#141412;font-size:14px;line-height:1.55;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("")}
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
