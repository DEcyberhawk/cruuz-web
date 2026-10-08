"use client";

import Link from "next/link";
import { FormEvent, Suspense, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0b1022] px-6 pb-20 pt-32 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="text-sm font-bold text-white/60">
              Loading CRUUZ contact...
            </div>
          </div>
        </main>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}

function ContactPageContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const initialSubject = useMemo(() => {
    if (type === "launch") return "Join CRUUZ Launch List";
    if (type === "support") return "Customer Support";
    return "General Enquiry";
  }, [type]);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: initialSubject,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState("");
  const inFlight = useRef(false);
  const submissionId = useRef<string | null>(null);

  function updateField(field: keyof FormState, value: string) {
    submissionId.current = null;
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setBusy(true); setError("");
    try {
      submissionId.current ||= window.crypto.randomUUID();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": submissionId.current },
        body: JSON.stringify({ ...form, website }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok || data?.ok !== true) {
        throw new Error(typeof data?.message === "string" ? data.message : "Your message was not confirmed. Please use the email or phone contacts before trying again.");
      }
      setSubmitted(true);
    } catch (failure) {
      setError(failure instanceof Error && failure.name === "Error" ? failure.message : "We could not confirm your submission. Please use the email or phone contacts before trying again.");
    } finally { inFlight.current = false; setBusy(false); }
  }

  return (
    <main className="min-h-screen bg-[#0b1022] px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <section>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
              Contact CRUUZ
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              How can we help?
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">
              Contact CRUUZ for general enquiries, rider support,
              business enquiries, launch-list registration and
              platform-related assistance.
            </p>

            <div className="mt-10 space-y-4">
              <ContactCard
                icon={<Mail className="h-5 w-5" />}
                title="General enquiries"
                value="info@cruuz.org"
              />

              <ContactCard
                icon={<MessageSquare className="h-5 w-5" />}
                title="Customer support"
                value="support@cruuz.org"
              />

              <ContactCard
                icon={<Phone className="h-5 w-5" />}
                title="MTN"
                value="+233 55 155 0335"
              />

              <ContactCard
                icon={<Phone className="h-5 w-5" />}
                title="Telecel"
                value="+233 30 398 3906"
              />

              <ContactCard
                icon={<Phone className="h-5 w-5" />}
                title="AirtelTigo"
                value="+233 27 112 8889"
              />

              <ContactCard
                icon={<MapPin className="h-5 w-5" />}
                title="Company"
                value="CRUUZ Logistics Ltd · Ghana"
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 sm:p-8">
            {submitted ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h2 className="mt-6 text-2xl font-black">
                  Message submitted
                </h2>

                <p className="mt-3 max-w-md text-white/60">
                  Your message has been submitted to CRUUZ. Our team can
                  reply using the email address you provided.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    submissionId.current = null;
                    setForm({ name: "", email: "", phone: "", subject: initialSubject, message: "" });
                    setSubmitted(false); setError("");
                  }}
                  className="mt-8 rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 font-bold transition hover:bg-white/[0.1]"
                >
                  Write another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black">
                  Send CRUUZ a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  Complete the form below to contact our team. For urgent
                  assistance, use the phone contacts shown on this page.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
                  <fieldset disabled={busy} className="space-y-5">
                  <div hidden aria-hidden="true">
                    <label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></label>
                  </div>
                  {error ? <p role="alert" className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">{error}</p> : null}
                  <Field label="Full name">
                    <input
                      required
                      maxLength={120}
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email address">
                      <input
                        required
                        type="email"
                        maxLength={254}
                        autoComplete="email"
                        value={form.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Phone number">
                      <input
                        type="tel"
                        maxLength={40}
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(event) =>
                          updateField("phone", event.target.value)
                        }
                        placeholder="+233..."
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label="Subject">
                    <select
                      value={form.subject}
                      onChange={(event) =>
                        updateField("subject", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option className="bg-[#111831]">
                        General Enquiry
                      </option>
                      <option className="bg-[#111831]">
                        Join CRUUZ Launch List
                      </option>
                      <option className="bg-[#111831]">
                        Customer Support
                      </option>
                      <option className="bg-[#111831]">
                        Business Enquiry
                      </option>
                      <option className="bg-[#111831]">
                        Driver Enquiry
                      </option>
                      <option className="bg-[#111831]">
                        Safety Concern
                      </option>
                    </select>
                  </Field>

                  <Field label="Message">
                    <textarea
                      required
                      rows={7}
                      maxLength={5000}
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      placeholder="Tell us how we can help..."
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-4 font-black text-white shadow-lg shadow-violet-950/30 transition hover:scale-[1.01]"
                  >
                    <Send className="h-5 w-5" />
                    {busy ? "Submitting..." : "Send Message"}
                  </button>
                  </fieldset>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
        {icon}
      </div>

      <div>
        <p className="text-xs font-black uppercase tracking-[0.15em] text-white/35">
          {title}
        </p>
        <p className="mt-1 font-bold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white/70">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-[#111831] px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/15";
