"use client";
import { useState } from "react";
import { SectionShell } from "./SectionShell";

type Intent = "lease" | "sponsor" | "book";

const INTENTS: { id: Intent; title: string; copy: string; sub: string }[] = [
  {
    id: "lease",
    title: "Lease",
    sub: "Retail · Luxury · Pop-up",
    copy: "From maison flagships to pop-up activations.",
  },
  {
    id: "sponsor",
    title: "Sponsor",
    sub: "Brand · Partnership",
    copy: "Activate in front of 30M annual visitors.",
  },
  {
    id: "book",
    title: "Book",
    sub: "Concert · Launch",
    copy: "Grand Plaza for concerts and brand takeovers.",
  },
];

export function TakeAction() {
  const [intent, setIntent] = useState<Intent>("lease");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent, ...payload }),
    });
    setStatus(res.ok ? "ok" : "error");
    if (res.ok) form.reset();
  }

  return (
    <SectionShell
      id="action"
      eyebrow="Take Action · Inquire"
      index="ix / ix"
      title={
        <>
          Three paths <span className="italic-display text-gold">forward.</span>
        </>
      }
      subtitle={
        <>
          A member of the commercial team replies within one business day,
          Kuwait time.
        </>
      }
    >
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 flex-1 min-h-0">
        {/* Left: 3 intent cards stacked */}
        <div className="flex flex-col gap-3">
          {INTENTS.map((i, idx) => (
            <button
              key={i.id}
              type="button"
              onClick={() => setIntent(i.id)}
              className={`group relative text-left p-5 border transition-all duration-300 ${
                intent === i.id
                  ? "border-gold bg-gold/[0.06]"
                  : "border-bone/15 hover:border-bone/40"
              }`}
              aria-pressed={intent === i.id}
            >
              <span className="absolute top-3 right-3 mono text-[0.55rem] uppercase tracking-[0.4em] opacity-40">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <p className="mono text-[0.55rem] uppercase tracking-[0.3em] text-gold mb-2">
                {i.sub}
              </p>
              <div className="flex items-baseline gap-4">
                <h3 className="display text-2xl md:text-3xl">{i.title}</h3>
                <p className="text-bone/65 text-xs leading-relaxed">{i.copy}</p>
              </div>
              <span
                className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-500 ${
                  intent === i.id ? "w-full" : "w-0 group-hover:w-1/2"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Right: form */}
        <form
          onSubmit={onSubmit}
          className="grid md:grid-cols-2 gap-x-5 gap-y-4 self-start w-full"
        >
          <Field name="name" required label="Full name" />
          <Field name="company" label="Company" />
          <Field name="email" type="email" required label="Email" className="md:col-span-2" />
          <FieldArea name="message" required label="Tell us what you have in mind" />

          <div className="md:col-span-2 flex flex-col md:flex-row items-stretch md:items-center gap-4 mt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center justify-between gap-6 bg-gold text-ink px-7 py-4 mono text-[0.65rem] uppercase tracking-[0.4em] hover:bg-bone transition-colors disabled:opacity-60"
            >
              <span>
                {status === "sending"
                  ? "Sending…"
                  : status === "ok"
                  ? "Sent — thank you"
                  : "Send inquiry"}
              </span>
              <span className="text-lg" aria-hidden>
                →
              </span>
            </button>
            <p className="mono text-[0.55rem] uppercase tracking-[0.35em] text-bone/40">
              Reply in 1 business day · Kuwait time
            </p>
          </div>
          {status === "error" && (
            <p className="md:col-span-2 text-red-300/80 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>

      <footer className="mt-6 pt-5 border-t border-bone/10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 text-bone/50 text-xs">
        <div>
          <p className="display text-xl text-bone">The Avenues, Kuwait</p>
          <p className="mono text-[0.55rem] uppercase tracking-[0.3em]">
            5th ring road · al-rai · kuwait city
          </p>
        </div>
        <div className="mono text-[0.55rem] uppercase tracking-[0.3em] flex flex-col md:items-end gap-0.5">
          <p>Mabanee · Owner & operator</p>
          <p>Gensler · Master architect</p>
        </div>
      </footer>
    </SectionShell>
  );
}

function Field({
  name,
  label,
  required,
  type = "text",
  className = "",
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mono text-[0.55rem] uppercase tracking-[0.35em] text-bone/55 block mb-2">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-bone/25 py-2 text-bone focus:outline-none focus:border-gold transition-colors placeholder:text-bone/30"
      />
    </label>
  );
}

function FieldArea({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="block md:col-span-2">
      <span className="mono text-[0.55rem] uppercase tracking-[0.35em] text-bone/55 block mb-2">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={3}
        className="w-full bg-transparent border-b border-bone/25 py-2 text-bone focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-bone/30"
      />
    </label>
  );
}
