"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

type FormState = {
  legalName: string;
  tradingName: string;
  registrationNumber: string;
  taxId: string;
  industry: string;
  website: string;
  primaryEmail: string;
  primaryPhone: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
};

type RegistrationResponse = {
  success?: boolean;
  data?: {
    account?: {
      id: string;
      legalName: string;
      tradingName?: string;
      registrationNumber?: string;
      primaryEmail: string;
      primaryPhone?: string;
      country: string;
      city?: string;
      status: string;
      verificationStatus: string;
    };
  };
  error?: {
    code?: string;
    message?: string;
  };
};

const initialForm: FormState = {
  legalName: "",
  tradingName: "",
  registrationNumber: "",
  taxId: "",
  industry: "",
  website: "",
  primaryEmail: "",
  primaryPhone: "",
  country: "GH",
  city: "",
  addressLine1: "",
  addressLine2: "",
};

const API_URL =
  process.env.NEXT_PUBLIC_CRUUZ_API_URL ?? "http://localhost:3002";

const inputClass =
  "w-full rounded-xl border border-[#29415f] bg-[#091a31] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10";

export default function BusinessRegisterPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] =
    useState<RegistrationResponse["data"] | null>(null);

  function updateField(key: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setResult(null);

    if (!form.legalName.trim()) {
      setError("Please enter the legal business name.");
      return;
    }

    if (!form.primaryEmail.trim()) {
      setError("Please enter the primary business email.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/business-accounts/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            legalName: form.legalName.trim(),
            tradingName: form.tradingName.trim() || undefined,
            registrationNumber:
              form.registrationNumber.trim() || undefined,
            taxId: form.taxId.trim() || undefined,
            industry: form.industry.trim() || undefined,
            website: form.website.trim() || undefined,
            primaryEmail: form.primaryEmail.trim(),
            primaryPhone: form.primaryPhone.trim() || undefined,
            country: form.country.trim() || "GH",
            city: form.city.trim() || undefined,
            addressLine1: form.addressLine1.trim() || undefined,
            addressLine2: form.addressLine2.trim() || undefined,
          }),
        }
      );

      const data: RegistrationResponse = await response.json();

      if (
        !response.ok ||
        !data.success ||
        !data.data?.account
      ) {
        throw new Error(
          data.error?.message || "Business registration failed."
        );
      }

      setResult(data.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Business registration failed."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.account) {
    return (
      <main className="min-h-screen bg-[#061326] text-white">
        <Navbar />

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.13),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.10),transparent_35%)]" />

          <div className="relative mx-auto flex min-h-[calc(100vh-84px)] max-w-4xl items-center px-6 py-14">
            <div className="w-full rounded-[28px] border border-[#29415f] bg-[#0a1b32]/95 p-7 shadow-2xl md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
                <span>✓</span>
                Registration submitted
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight md:text-5xl">
                Your CRUUZ Business
                <span className="block bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  account has been created.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Your company registration has been received and is currently
                pending review.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#071629]">
                <Detail
                  label="Business"
                  value={result.account.legalName}
                />

                <Detail
                  label="Account ID"
                  value={result.account.id}
                />

                <Detail
                  label="Email"
                  value={result.account.primaryEmail}
                />

                <Detail
                  label="Account status"
                  value={result.account.status}
                  highlight
                />

                <Detail
                  label="Verification"
                  value={result.account.verificationStatus}
                  highlight
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/business"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 font-bold text-white transition hover:-translate-y-0.5"
                >
                  ← Back to Business
                </Link>

                <Link
                  href="/business/login"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 font-bold text-white transition hover:border-violet-400/50 hover:bg-white/10"
                >
                  Business Login →
                </Link>

                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 px-6 font-semibold text-slate-300 transition hover:text-white"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#061326] text-white">
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(139,92,246,0.13),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.09),transparent_30%)]" />

        <div className="relative mx-auto max-w-[1250px] px-6 py-12 sm:px-10 lg:px-14">
          <Link
            href="/business"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
          >
            ← Back to Business
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-violet-400">
              CRUUZ Business
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Register your business
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-300">
              Create your company account for employee mobility, scheduled
              journeys, airport transfers, cost centres, ride policies and
              consolidated billing.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1250px] px-6 py-10 sm:px-10 lg:px-14">
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-[28px] border border-[#29415f] bg-[#0a1b32] shadow-2xl"
        >
          <div className="border-b border-white/10 px-6 py-5 md:px-8">
            <h2 className="text-xl font-black">
              Company information
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Tell us about the organisation that will use CRUUZ Business.
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
            <Field label="Legal business name" required>
              <input
                value={form.legalName}
                onChange={(event) =>
                  updateField("legalName", event.target.value)
                }
                placeholder="Example Company Ltd"
                className={inputClass}
              />
            </Field>

            <Field label="Trading name">
              <input
                value={form.tradingName}
                onChange={(event) =>
                  updateField("tradingName", event.target.value)
                }
                placeholder="Example"
                className={inputClass}
              />
            </Field>

            <Field label="Registration number">
              <input
                value={form.registrationNumber}
                onChange={(event) =>
                  updateField(
                    "registrationNumber",
                    event.target.value
                  )
                }
                placeholder="Company registration number"
                className={inputClass}
              />
            </Field>

            <Field label="Tax ID / TIN">
              <input
                value={form.taxId}
                onChange={(event) =>
                  updateField("taxId", event.target.value)
                }
                placeholder="Tax identification number"
                className={inputClass}
              />
            </Field>

            <Field label="Industry">
              <input
                value={form.industry}
                onChange={(event) =>
                  updateField("industry", event.target.value)
                }
                placeholder="Technology, Finance, Logistics..."
                className={inputClass}
              />
            </Field>

            <Field label="Website">
              <input
                type="url"
                value={form.website}
                onChange={(event) =>
                  updateField("website", event.target.value)
                }
                placeholder="https://example.com"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="border-y border-white/10 bg-white/[0.015] px-6 py-5 md:px-8">
            <h2 className="text-xl font-black">
              Business contact
            </h2>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
            <Field label="Primary business email" required>
              <input
                type="email"
                value={form.primaryEmail}
                onChange={(event) =>
                  updateField("primaryEmail", event.target.value)
                }
                placeholder="business@example.com"
                className={inputClass}
              />
            </Field>

            <Field label="Primary phone">
              <input
                type="tel"
                value={form.primaryPhone}
                onChange={(event) =>
                  updateField("primaryPhone", event.target.value)
                }
                placeholder="+233..."
                className={inputClass}
              />
            </Field>

            <Field label="Country code">
              <input
                value={form.country}
                onChange={(event) =>
                  updateField(
                    "country",
                    event.target.value.toUpperCase()
                  )
                }
                maxLength={2}
                placeholder="GH"
                className={inputClass}
              />
            </Field>

            <Field label="City">
              <input
                value={form.city}
                onChange={(event) =>
                  updateField("city", event.target.value)
                }
                placeholder="Accra"
                className={inputClass}
              />
            </Field>

            <Field label="Address line 1">
              <input
                value={form.addressLine1}
                onChange={(event) =>
                  updateField("addressLine1", event.target.value)
                }
                placeholder="Business address"
                className={inputClass}
              />
            </Field>

            <Field label="Address line 2">
              <input
                value={form.addressLine2}
                onChange={(event) =>
                  updateField("addressLine2", event.target.value)
                }
                placeholder="Suite, floor, building..."
                className={inputClass}
              />
            </Field>
          </div>

          {error && (
            <div className="mx-6 mb-6 rounded-xl border border-red-400/25 bg-red-400/10 px-5 py-4 text-sm font-medium text-red-200 md:mx-8">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-5 border-t border-white/10 bg-[#071629] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Your CRUUZ Business account will be created in pending status
              while company verification and account activation are completed.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[52px] items-center justify-center whitespace-nowrap rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-7 font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Creating account..."
                : "Create Business Account →"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already registered?{" "}
          <Link
            href="/business/login"
            className="font-bold text-violet-300 hover:text-white"
          >
            Business Login
          </Link>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-200">
        {label}
        {required && (
          <span className="ml-1 text-violet-400">*</span>
        )}
      </span>

      {children}
    </label>
  );
}

function Detail({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <div className="grid gap-2 border-b border-white/10 px-5 py-4 last:border-b-0 sm:grid-cols-[180px_1fr] sm:items-center">
      <span className="text-sm text-slate-400">{label}</span>

      <span
        className={`break-all font-bold sm:text-right ${
          highlight ? "text-amber-300" : "text-white"
        }`}
      >
        {value || "—"}
      </span>
    </div>
  );
}