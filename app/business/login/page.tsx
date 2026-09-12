"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

const API_URL = process.env.NEXT_PUBLIC_CRUUZ_API_URL;

type LoginResponse = {
  success?: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  mfaRequired?: boolean;
  mustChangePassword?: boolean;
  user?: {
    id?: string;
    email?: string | null;
    role?: string;
    status?: string;
  };
};

type BusinessContextResponse = {
  success?: boolean;
  message?: string;
  data?: {
    account?: {
      id: string;
      legalName: string;
      tradingName?: string | null;
      status: string;
      verificationStatus: string;
    };
    membership?: {
      id: string;
      businessAccountId: string;
      userId: string;
      role: string;
      status: string;
      canBookForOthers: boolean;
      canViewBilling: boolean;
      canManageMembers: boolean;
      canManagePolicies: boolean;
    };
  };
};

async function readJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export default function BusinessLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Enter your business email address.");
      return;
    }

    if (!password) {
      setError("Enter your password.");
      return;
    }

    if (!API_URL) {
      setError(
        "CRUUZ Business authentication is not configured. The API URL is missing."
      );
      return;
    }

    setSubmitting(true);

    try {
      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: normalizedEmail,
          password,
        }),
      });

      const loginData =
        await readJson<LoginResponse>(loginResponse);

      if (!loginResponse.ok) {
        setError(
          loginData?.message ||
            "We could not sign you in. Check your email and password."
        );
        return;
      }

      if (loginData?.mfaRequired) {
        setError(
          "Multi-factor authentication is required for this account. The Business MFA step will be connected next."
        );
        return;
      }

      const accessToken = loginData?.accessToken;

      if (!accessToken) {
        setError(
          "CRUUZ authentication succeeded but no access token was returned."
        );
        return;
      }

      const businessResponse = await fetch(
        `${API_URL}/business-accounts/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const businessData =
        await readJson<BusinessContextResponse>(
          businessResponse
        );

      if (!businessResponse.ok) {
        setError(
          businessData?.message ||
            "This CRUUZ account is not connected to an active Business membership."
        );
        return;
      }

      if (
        !businessData?.data?.account ||
        !businessData?.data?.membership
      ) {
        setError(
          "Your Business account information could not be loaded."
        );
        return;
      }

      const storage = rememberMe
        ? window.localStorage
        : window.sessionStorage;

      const alternateStorage = rememberMe
        ? window.sessionStorage
        : window.localStorage;

      alternateStorage.removeItem(
        "cruuz_business_access_token"
      );

      storage.setItem(
        "cruuz_business_access_token",
        accessToken
      );

      storage.setItem(
        "cruuz_business_account",
        JSON.stringify(businessData.data.account)
      );

      storage.setItem(
        "cruuz_business_membership",
        JSON.stringify(businessData.data.membership)
      );

      router.push("/business/dashboard");
    } catch (requestError) {
      console.error(
        "CRUUZ Business login failed:",
        requestError
      );

      setError(
        "CRUUZ Business could not connect to the account service. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#061326] text-white">
      <Navbar />

      <section className="relative min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(139,92,246,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(14,165,233,0.10),transparent_30%)]" />

        <div className="relative mx-auto grid w-full max-w-[1320px] items-start gap-12 px-6 pb-16 pt-[126px] md:px-8 md:pt-[136px] lg:grid-cols-[1fr_480px] lg:px-12 lg:pb-20 lg:pt-[142px] xl:px-16">
          {/* LEFT CONTENT */}
          <div className="hidden lg:block">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-violet-400">
              CRUUZ Business
            </p>

            <h1 className="mt-5 max-w-2xl text-6xl font-black leading-[0.96] tracking-[-0.04em]">
              Your company.

              <span className="mt-2 block bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Your transport.
              </span>

              <span className="mt-2 block">
                One place.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Sign in to manage employees, authorised riders,
              scheduled journeys, airport transfers, cost centres,
              billing and company travel policies.
            </p>

            <div className="mt-9 grid max-w-xl grid-cols-2 gap-3">
              <BusinessPoint
                number="01"
                title="Employees"
                text="Manage authorised riders"
              />

              <BusinessPoint
                number="02"
                title="Scheduled rides"
                text="Plan company journeys"
              />

              <BusinessPoint
                number="03"
                title="Cost control"
                text="Departments and cost centres"
              />

              <BusinessPoint
                number="04"
                title="Billing"
                text="Company travel records"
              />
            </div>
          </div>

          {/* LOGIN PANEL */}
          <div className="w-full">
            <div className="rounded-[28px] border border-[#29415f] bg-[#0a1b32]/95 p-7 shadow-2xl backdrop-blur-xl md:p-9">
              <Link
                href="/business"
                className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-bold text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                <span aria-hidden="true">←</span>
                Back to Business
              </Link>

              <div className="mt-7">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-400">
                  Business Portal
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  Business Login
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Sign in with the authorised credentials connected
                  to your CRUUZ Business account.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-200">
                    Business email
                  </span>

                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@company.com"
                    disabled={submitting}
                    className="w-full rounded-xl border border-[#29415f] bg-[#071629] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-200">
                    Password
                  </span>

                  <div className="relative">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Enter your password"
                      disabled={submitting}
                      className="w-full rounded-xl border border-[#29415f] bg-[#071629] px-4 py-3.5 pr-20 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current
                        )
                      }
                      disabled={submitting}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-xs font-bold text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(
                          event.target.checked
                        )
                      }
                      disabled={submitting}
                      className="h-4 w-4 rounded border-slate-600 bg-[#071629]"
                    />

                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm font-bold text-violet-300 transition hover:text-white"
                  >
                    Forgot password?
                  </button>
                </div>

                {error && (
                  <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[54px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 font-extrabold text-white shadow-[0_14px_35px_rgba(139,92,246,0.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Signing in..."
                    : "Sign in to CRUUZ Business →"}
                </button>
              </form>

              <div className="mt-7 border-t border-white/10 pt-6 text-center">
                <p className="text-sm text-slate-400">
                  Your company does not have an account?
                </p>

                <Link
                  href="/business/register"
                  className="mt-3 inline-flex font-bold text-violet-300 transition hover:text-white"
                >
                  Register your business →
                </Link>
              </div>
            </div>

            <div className="mt-5 text-center">
              <Link
                href="/"
                className="text-sm font-semibold text-slate-500 transition hover:text-white"
              >
                ← Back to CRUUZ Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function BusinessPoint({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="text-xs font-black text-violet-400">
        {number}
      </div>

      <div className="mt-2 font-extrabold text-white">
        {title}
      </div>

      <div className="mt-1 text-xs leading-5 text-slate-400">
        {text}
      </div>
    </div>
  );
}