"use client";

import { FormEvent, useState } from "react";

type Errors = Partial<Record<"name" | "email" | "applicantType" | "collectionValue" | "country" | "form", string>>;

export default function InvitationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "preview" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Errors = {};

    if (!String(data.get("name") || "").trim()) nextErrors.name = "Please enter your full name.";
    const email = String(data.get("email") || "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!String(data.get("applicantType") || "")) nextErrors.applicantType = "Please select an applicant type.";
    if (!String(data.get("collectionValue") || "")) nextErrors.collectionValue = "Please select an approximate collection value.";
    if (!String(data.get("country") || "").trim()) nextErrors.country = "Please enter your country of residence.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/request-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });

      if (!response.ok) throw new Error("Submission failed");
      const result = (await response.json()) as { mode?: string };
      setStatus(result.mode === "preview" ? "preview" : "success");
      form.reset();
    } catch {
      setStatus("error");
      setErrors({ form: "We could not send your request. Please try again shortly." });
    }
  }

  return (
    <form className="request-form" onSubmit={handleSubmit} noValidate>
      <Field id="name" label="Full name" error={errors.name}><input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby="name-error" /></Field>
      <Field id="email" label="Email address" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby="email-error" /></Field>
      <Field id="applicantType" label="Applicant type" error={errors.applicantType} wide>
        <select id="applicantType" name="applicantType" defaultValue="" required aria-invalid={!!errors.applicantType} aria-describedby="applicantType-error">
          <option value="" disabled>Select one</option>
          <option>Private collector</option>
          <option>Family office representative</option>
          <option>Personal assistant / Collection manager</option>
          <option>Other</option>
        </select>
      </Field>
      <Field id="collectionValue" label="Approximate collection value" error={errors.collectionValue}>
        <select id="collectionValue" name="collectionValue" defaultValue="" required aria-invalid={!!errors.collectionValue} aria-describedby="collectionValue-error">
          <option value="" disabled>Select one</option>
          <option>Under US$500,000</option>
          <option>US$500,000–US$2 million</option>
          <option>US$2 million–US$5 million</option>
          <option>US$5 million–US$10 million</option>
          <option>US$10 million+</option>
          <option>Prefer not to disclose</option>
        </select>
      </Field>
      <Field id="country" label="Country of residence" error={errors.country}><input id="country" name="country" autoComplete="country-name" required aria-invalid={!!errors.country} aria-describedby="country-error" /></Field>
      <button className="submit-button" type="submit" disabled={status === "submitting" || status === "success" || status === "preview"}>
        <span>{status === "submitting" ? "Sending request…" : status === "success" ? "Request received" : status === "preview" ? "Preview complete" : "Submit Request"}</span>
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status === "success"
          ? "Thank you. Your request has been received for consideration. This acknowledgement does not constitute approval."
          : status === "preview"
            ? "Preview mode: validation succeeded, but no information was sent or stored because a form integration has not yet been configured."
            : status === "error" ? errors.form : ""}
      </p>
    </form>
  );
}

function Field({ id, label, error, wide = false, children }: { id: string; label: string; error?: string; wide?: boolean; children: React.ReactNode }) {
  return <div className={`field${wide ? " field-wide" : ""}`}><label htmlFor={id}>{label}</label>{children}<p className="field-error" id={`${id}-error`}>{error || ""}</p></div>;
}
