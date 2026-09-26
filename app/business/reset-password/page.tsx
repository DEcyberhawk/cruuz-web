"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

const API_URL = process.env.NEXT_PUBLIC_CRUUZ_API_URL;
const inputClass =
  "w-full rounded-xl border border-[#29415f] bg-[#071629] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10 disabled:opacity-60";

async function readJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function BusinessPasswordResetContent() {
  const searchParams = useSearchParams();
  const token = useMemo(
    () => searchParams.get("token")?.trim() || "",
    [searchParams]
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function requestReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (!API_URL) return setError("CRUUZ authentication is not configured.");
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/auth/password-reset/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await readJson(response);
      if (!response.ok) throw new Error(data?.message || "Unable to request password reset.");
      setMessage(data?.message || "If the account exists, a reset link has been sent.");
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Unable to request password reset.");
    } finally {
      setSubmitting(false);
    }
  }

  async function completeReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (!API_URL) return setError("CRUUZ authentication is not configured.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/auth/password-reset/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password, confirmPassword }),
      });
      const data = await readJson(response);
      if (!response.ok) throw new Error(data?.message || "Unable to reset password.");
      setMessage("Password reset successfully. You can now sign in.");
      setPassword("");
      setConfirmPassword("");
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Unable to reset password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#061326] text-white">
      <Navbar />
      <section className="relative mx-auto flex min-h-[calc(100vh-84px)] max-w-xl items-center px-6 py-14">
        <div className="w-full rounded-[28px] border border-[#29415f] bg-[#0a1b32]/95 p-7 shadow-2xl md:p-9">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-400">CRUUZ Business</p>
          <h1 className="mt-3 text-3xl font-black">{token ? "Choose a new password" : "Reset your password"}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {token
              ? "Use a strong password that you do not use on another service."
              : "Enter the authorised business email. If an account exists, we will send a secure reset link."}
          </p>

          <form onSubmit={token ? completeReset : requestReset} className="mt-8 space-y-5">
            {!token ? (
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-200">Business email</span>
                <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} placeholder="you@company.com" disabled={submitting} />
              </label>
            ) : (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-200">New password</span>
                  <input type="password" required minLength={12} maxLength={128} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} placeholder="At least 12 characters" disabled={submitting} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-200">Confirm password</span>
                  <input type="password" required minLength={12} maxLength={128} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className={inputClass} placeholder="Repeat your password" disabled={submitting} />
                </label>
              </>
            )}

            {message && <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{message}</div>}
            {error && <div className="rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</div>}

            <button type="submit" disabled={submitting} className="inline-flex min-h-[54px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 font-extrabold disabled:opacity-60">
              {submitting ? "Please wait..." : token ? "Save new password" : "Send reset link"}
            </button>
          </form>

          <Link href="/business/login" className="mt-6 inline-flex text-sm font-bold text-violet-300 hover:text-white">â† Back to Business Login</Link>
        </div>
      </section>
    </main>
  );
}

export default function BusinessPasswordResetPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#070611] text-white">
          <Navbar />
          <div className="flex min-h-[70vh] items-center justify-center px-6">
            <p className="text-sm font-semibold text-slate-400">
              Loading password recovery...
            </p>
          </div>
        </main>
      }
    >
      <BusinessPasswordResetContent />
    </Suspense>
  );
}