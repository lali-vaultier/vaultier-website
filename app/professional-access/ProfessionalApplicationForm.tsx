"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { professionalDisciplineOptions } from "./professional-data";

type FieldName =
  | "businessName"
  | "primaryContact"
  | "email"
  | "website"
  | "discipline"
  | "insurance"
  | "experience"
  | "form";

type Errors = Partial<Record<FieldName, string>>;

const emailPattern = /^\S+@\S+\.\S+$/;

export default function ProfessionalApplicationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "preview" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Errors = {};
    const email = String(data.get("email") || "").trim();
    const website = String(data.get("website") || "").trim();

    if (!String(data.get("businessName") || "").trim()) {
      nextErrors.businessName = "Please enter the business or trading name.";
    }
    if (!String(data.get("primaryContact") || "").trim()) {
      nextErrors.primaryContact = "Please enter the primary contact.";
    }
    if (!emailPattern.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (website && !isValidWebsite(website)) nextErrors.website = "Please enter a valid website address.";
    if (!String(data.get("discipline") || "")) {
      nextErrors.discipline = "Please select a professional discipline.";
    }
    if (!String(data.get("insurance") || "")) {
      nextErrors.insurance = "Please confirm whether you hold professional insurance.";
    }
    if (!String(data.get("experience") || "").trim()) {
      nextErrors.experience = "Please provide a short description of your experience.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/professional-applications", {
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
      setErrors({ form: "We could not send your application. Please try again shortly." });
    }
  }

  const formLocked = status === "submitting" || status === "success" || status === "preview";

  return (
    <form className="professional-form" onSubmit={handleSubmit} noValidate>
      <div className="professional-honeypot" aria-hidden="true">
        <label htmlFor="faxNumber">Fax number</label>
        <input id="faxNumber" name="faxNumber" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="businessName" label="Business or trading name" error={errors.businessName}>
        <input
          id="businessName"
          name="businessName"
          autoComplete="organization"
          maxLength={160}
          required
          aria-invalid={!!errors.businessName}
          aria-describedby="businessName-error"
        />
      </Field>

      <Field id="registrationNumber" label="Company registration number">
        <input id="registrationNumber" name="registrationNumber" maxLength={100} />
      </Field>

      <Field id="primaryContact" label="Primary contact" error={errors.primaryContact}>
        <input
          id="primaryContact"
          name="primaryContact"
          autoComplete="name"
          maxLength={120}
          required
          aria-invalid={!!errors.primaryContact}
          aria-describedby="primaryContact-error"
        />
      </Field>

      <Field id="email" label="Email address" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
      </Field>

      <Field id="website" label="Website" error={errors.website}>
        <input
          id="website"
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          maxLength={300}
          aria-invalid={!!errors.website}
          aria-describedby="website-error"
        />
      </Field>

      <Field id="discipline" label="Professional discipline" error={errors.discipline}>
        <ProfessionalSelect
          id="discipline"
          name="discipline"
          options={professionalDisciplineOptions}
          invalid={!!errors.discipline}
          describedBy="discipline-error"
        />
      </Field>

      <Field id="qualifications" label="Relevant qualifications or memberships">
        <input id="qualifications" name="qualifications" maxLength={500} />
      </Field>

      <fieldset className="professional-field professional-insurance-field" aria-describedby="insurance-error">
        <legend>Professional insurance</legend>
        <div className="professional-radio-group">
          <label><input type="radio" name="insurance" value="Yes" required /> <span>Yes</span></label>
          <label><input type="radio" name="insurance" value="No" required /> <span>No</span></label>
        </div>
        <p className="professional-field-error" id="insurance-error">{errors.insurance || ""}</p>
      </fieldset>

      <Field id="experience" label="Short description of experience" error={errors.experience} wide>
        <textarea
          id="experience"
          name="experience"
          rows={5}
          maxLength={2000}
          required
          aria-invalid={!!errors.experience}
          aria-describedby="experience-error"
        />
      </Field>

      <Field id="referral" label="How did you hear about Vaultier" wide>
        <input id="referral" name="referral" maxLength={500} />
      </Field>

      <button className="professional-submit" type="submit" disabled={formLocked}>
        <span>
          {status === "submitting"
            ? "Sending application…"
            : status === "success"
              ? "Application received"
              : status === "preview"
                ? "Preview complete"
                : "Submit Application"}
        </span>
      </button>

      <p className="professional-form-status" role="status" aria-live="polite">
        {status === "success"
          ? "Thank you. Your application has been received for consideration."
          : status === "preview"
            ? "Preview mode: validation succeeded, but no information was sent or stored because an email integration has not yet been configured."
            : status === "error"
              ? errors.form
              : ""}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  wide = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`professional-field${wide ? " professional-field-wide" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      <p className="professional-field-error" id={`${id}-error`}>{error || ""}</p>
    </div>
  );
}

function ProfessionalSelect({
  id,
  name,
  options,
  invalid,
  describedBy,
}: {
  id: string;
  name: string;
  options: readonly string[];
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
    <div className={`professional-select${open ? " is-open" : ""}`} ref={rootRef}>
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        className={`professional-select-trigger${value ? "" : " is-placeholder"}`}
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
        <span>{value || "Select below"}</span>
      </button>
      {open ? (
        <div className="professional-select-menu" id={listboxId} role="listbox" aria-label="Professional disciplines">
          {options.map((option, index) => (
            <button
              key={option}
              id={`${id}-option-${index}`}
              className={`professional-select-option${index === activeIndex ? " is-active" : ""}`}
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

function isValidWebsite(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return !!url.hostname && url.hostname.includes(".");
  } catch {
    return false;
  }
}
