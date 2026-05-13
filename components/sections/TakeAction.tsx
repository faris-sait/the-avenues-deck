"use client";
import { useState } from "react";
import { SectionShell } from "./SectionShell";

type Intent = "lease" | "sponsor" | "book";

const INTENTS: { id: Intent; title: string; copy: string }[] = [
  {
    id: "lease",
    title: "Lease",
    copy: "From luxury flagships to pop-up activations across 12 districts.",
  },
  {
    id: "sponsor",
    title: "Sponsor",
    copy: "Activate your brand in front of 30M+ annual visitors.",
  },
  {
    id: "book",
    title: "Book Grand Plaza",
    copy: "Concerts, launches, fashion shows, brand experiences.",
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
    <SectionShell id="action" eyebrow="Take Action" title="Three paths forward.">
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {INTENTS.map((i) => (
          <button
            key={i.id}
            type="button"
            onClick={() => setIntent(i.id)}
            className={`text-left p-8 border transition-colors ${
              intent === i.id
                ? "border-gold bg-gold/5"
                : "border-bone/15 hover:border-bone/40"
            }`}
            aria-pressed={intent === i.id}
          >
            <h3 className="display text-3xl mb-3">{i.title}</h3>
            <p className="text-bone/70 text-sm">{i.copy}</p>
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4 max-w-2xl">
        <input
          name="name"
          required
          placeholder="Name"
          className="bg-transparent border border-bone/20 px-4 py-3 focus:outline-none focus:border-gold"
        />
        <input
          name="company"
          placeholder="Company (optional)"
          className="bg-transparent border border-bone/20 px-4 py-3 focus:outline-none focus:border-gold"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="bg-transparent border border-bone/20 px-4 py-3 md:col-span-2 focus:outline-none focus:border-gold"
        />
        <textarea
          name="message"
          required
          placeholder="Tell us what you have in mind."
          rows={5}
          className="bg-transparent border border-bone/20 px-4 py-3 md:col-span-2 focus:outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="md:col-span-2 bg-gold text-ink py-3 uppercase tracking-[0.3em] text-xs hover:bg-gold/90 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        {status === "ok" && (
          <p className="md:col-span-2 text-gold text-sm">
            Thank you. We&apos;ll be in touch.
          </p>
        )}
        {status === "error" && (
          <p className="md:col-span-2 text-red-400 text-sm">
            Something went wrong. Please try again or email directly.
          </p>
        )}
      </form>
    </SectionShell>
  );
}
