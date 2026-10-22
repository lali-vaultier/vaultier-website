"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type Errors = Partial<Record<"name" | "email" | "applicantType" | "collectionValue" | "country" | "form", string>>;

const applicantTypeOptions = [
  "Private collector",
  "Family office representative",
  "Personal assistant / Collection manager",
  "Other",
];

const collectionValueOptions = [
  "Under US$500,000",
  "US$500,000–US$2 million",
  "US$2 million–US$5 million",
  "US$5 million–US$10 million",
  "US$10 million+",
  "Prefer not to disclose",
];

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
        <BrandSelect
          id="applicantType"
          name="applicantType"
          options={applicantTypeOptions}
          invalid={!!errors.applicantType}
          describedBy="applicantType-error"
        />
      </Field>
      <Field id="collectionValue" label="Approximate collection value" error={errors.collectionValue}>
        <BrandSelect
          id="collectionValue"
          name="collectionValue"
          options={collectionValueOptions}
          invalid={!!errors.collectionValue}
          describedBy="collectionValue-error"
        />
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

function BrandSelect({
  id,
  name,
  options,
  invalid,
  describedBy,
}: {
  id: string;
  name: string;
  options: string[];
  invalid: boolean;
  describedBy: string;
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = `${id}-listbox`;

  useEffect(() => {
    const root = rootRef.current;
    const form = root?.closest("form");

    function closeOnOutsidePress(event: PointerEvent) {
      if (root && !root.contains(event.target as Node)) setOpen(false);
    }

    function clearOnReset() {
      setValue("");
      setOpen(false);
      setActiveIndex(0);
    }

    document.addEventListener("pointerdown", closeOnOutsidePress);
    form?.addEventListener("reset", clearOnReset);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      form?.removeEventListener("reset", clearOnReset);
    };
  }, []);

  function showMenu(direction: 1 | -1 = 1) {
    const selectedIndex = options.indexOf(value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : direction === 1 ? 0 : options.length - 1);
    setOpen(true);
  }

  function choose(option: string) {
    setValue(option);
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      if (!open) showMenu(direction);
      else setActiveIndex((current) => (current + direction + options.length) % options.length);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(options[activeIndex]);
      else showMenu();
      return;
    }

    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className={`brand-select${open ? " is-open" : ""}`} ref={rootRef}>
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        className={`brand-select-trigger${value ? "" : " is-placeholder"}`}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-required="true"
        onClick={() => (open ? setOpen(false) : showMenu())}
        onKeyDown={handleKeyDown}
      >
        <span>{value || "Select one"}</span>
      </button>
      {open ? (
        <div className="brand-select-menu" id={listboxId} role="listbox" aria-label={`${name} options`}>
          {options.map((option, index) => (
            <button
              key={option}
              id={`${id}-option-${index}`}
              className={`brand-select-option${index === activeIndex ? " is-active" : ""}`}
              type="button"
              role="option"
              aria-selected={value === option}
              tabIndex={-1}
              onPointerMove={() => setActiveIndex(index)}
              onClick={() => choose(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
