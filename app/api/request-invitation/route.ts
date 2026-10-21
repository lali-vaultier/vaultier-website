import { NextResponse } from "next/server";

type InvitationRequest = {
  name?: unknown;
  email?: unknown;
  country?: unknown;
  applicantType?: unknown;
  collectionValue?: unknown;
};

const emailPattern = /^\S+@\S+\.\S+$/;

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
