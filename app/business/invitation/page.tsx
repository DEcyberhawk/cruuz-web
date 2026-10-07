"use client";

import {useEffect, useRef, useState, type FormEvent} from "react";
import Link from "next/link";
import {acceptInvitationWithPassword, tokenFromFragment} from "@/lib/business/invitation";

export default function BusinessInvitationPage() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    try { setToken(tokenFromFragment(window.location.hash)); }
    catch (failure) { setError(failure instanceof Error ? failure.message : "Invalid invitation link."); }
    finally {
      window.history.replaceState(window.history.state, "", window.location.pathname);
      setReady(true);
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || accepted) return;
    setBusy(true); setError("");
    try {
      const accessToken = await acceptInvitationWithPassword({
        apiUrl: process.env.NEXT_PUBLIC_CRUUZ_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "",
        token, email, password,
      });
      setAccepted(true); setToken("");
      try {
        for (const key of ["cruuz_business_access_token", "cruuz_business_account", "cruuz_business_membership"]) {
          window.localStorage.removeItem(key); window.sessionStorage.removeItem(key);
        }
        window.sessionStorage.setItem("cruuz_business_access_token", accessToken);
      } catch { setError("Your membership was created, but this browser could not save the session. Sign in to CRUUZ Business to continue."); }
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Invitation acceptance failed."); }
    finally { setPassword(""); setBusy(false); }
  }

  const field = "mt-2 w-full rounded-xl border border-white/15 bg-white/5 p-3 text-white";
  return <main className="min-h-screen bg-slate-950 px-5 py-16 text-slate-200">
    <div className="mx-auto max-w-lg rounded-3xl border border-white/10 bg-white/[0.025] p-7">
      <Link href="/business" className="font-black text-violet-300">CRUUZ Business</Link>
      <h1 className="mt-6 text-3xl font-black text-white">{accepted ? "Invitation accepted" : "Join your company"}</h1>
      {accepted ? <div className="mt-5 space-y-4">
        <p>Your company membership is active. Your administrator controls your role, department and cost centre.</p>
        <Link href={error ? "/business/login" : "/business/dashboard"} className="inline-flex rounded-xl bg-violet-600 px-5 py-3 font-bold text-white">{error ? "Sign in" : "Open Business dashboard"}</Link>
      </div> : <>
        <p className="mt-4 text-sm leading-6">Use the email address your company invited and your existing CRUUZ password. The server checks this invitation before granting membership.</p>
        <p className="mt-3 text-sm text-slate-400">If you do not yet have a CRUUZ account with that email, ask your company administrator for help setting it up. This page does not create a new personal account.</p>
        {!ready ? <p className="mt-5">Loading invitation…</p> : token ? <form onSubmit={submit} className="mt-6 space-y-5">
          <label className="block">Invited email<input className={field} type="email" autoComplete="username" value={email} onChange={event => setEmail(event.target.value)} disabled={busy} required /></label>
          <label className="block">CRUUZ password<input className={field} type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} disabled={busy} required /></label>
          <button className="w-full rounded-xl bg-violet-600 p-3 font-bold text-white disabled:opacity-50" disabled={busy}>{busy ? "Checking invitation…" : "Sign in and accept invitation"}</button>
        </form> : null}
      </>}
      {error ? <p role="alert" className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">{error}</p> : null}
      {!accepted ? <p className="mt-6 text-sm"><Link href="/business/login" className="text-violet-300">Already joined? Sign in to Business</Link></p> : null}
    </div>
  </main>;
}
