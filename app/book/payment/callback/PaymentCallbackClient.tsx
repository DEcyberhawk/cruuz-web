"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, LoaderCircle, RotateCcw, TriangleAlert } from "lucide-react";

import {
  clearPendingWebPaidBooking,
  getCompletedWebPayment,
  getPendingWebPaidBooking,
  recordCompletedWebPayment,
  WEB_AUTH_TOKEN_KEY,
} from "@/lib/web-paid-booking";

const CRUUZ_API_URL = (
  process.env.NEXT_PUBLIC_CRUUZ_API_URL || ""
).replace(/\/$/, "");

type CallbackState = "VERIFYING" | "CREATING" | "SUCCESS" | "FAILED";

type CreatedTrip = {
  id: string;
  tripVerificationCode?: string;
};

export default function PaymentCallbackClient() {
  const searchParams = useSearchParams();
  const reference = (
    searchParams.get("reference") || searchParams.get("trxref") || ""
  ).trim();

  const processingRef = useRef(false);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<CallbackState>("VERIFYING");
  const [message, setMessage] = useState("Confirming your Paystack payment…");
  const [trip, setTrip] = useState<CreatedTrip | null>(null);

  useEffect(() => {
    if (processingRef.current) return;
    processingRef.current = true;

    async function apiRequest<T>(path: string, options: RequestInit, token: string) {
      if (!CRUUZ_API_URL) {
        throw new Error("The CRUUZ API URL is not configured.");
      }

      const response = await fetch(`${CRUUZ_API_URL}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.success === false) {
        throw new Error(result?.message || "CRUUZ could not complete this request.");
      }

      return result as T;
    }

    async function completePaidBooking() {
      try {
        if (!reference) {
          throw new Error("The Paystack payment reference is missing.");
        }

        const completed = getCompletedWebPayment(reference);
        if (completed) {
          setTrip({ id: completed.tripId });
          setState("SUCCESS");
          setMessage("This payment has already been completed and your ride was requested.");
          return;
        }

        const pending = getPendingWebPaidBooking();
        if (!pending) {
          throw new Error(
            "Your payment may be complete, but the saved booking could not be recovered. Do not pay again. Contact CRUUZ support with this reference."
          );
        }

        if (pending.reference !== reference) {
          throw new Error(
            "This Paystack reference does not match the saved booking. Do not pay again."
          );
        }

        const token = window.localStorage.getItem(WEB_AUTH_TOKEN_KEY) || "";
        if (!token) {
          throw new Error(
            "Your CRUUZ session expired after payment. Do not pay again. Sign in with the same phone number and contact support with this reference."
          );
        }

        setState("VERIFYING");
        setMessage("Confirming your Paystack payment…");

        const verification = await apiRequest<{
          transaction?: { status?: string };
        }>(
          "/payment-gateway/verify",
          {
            method: "POST",
            body: JSON.stringify({ reference }),
          },
          token
        );

        if (verification.transaction?.status !== "SUCCESS") {
          throw new Error("Paystack has not confirmed this payment yet.");
        }

        setState("CREATING");
        setMessage("Payment verified. Requesting your CRUUZ…");

        const created = await apiRequest<{ trip: CreatedTrip }>(
          "/trips/request",
          {
            method: "POST",
            body: JSON.stringify({
              ...pending.tripRequest,
              paymentReference: reference,
            }),
          },
          token
        );

        if (!created.trip?.id) {
          throw new Error("Payment succeeded, but CRUUZ returned no trip confirmation.");
        }

        recordCompletedWebPayment({
          reference,
          tripId: created.trip.id,
          completedAt: new Date().toISOString(),
        });
        clearPendingWebPaidBooking();
        setTrip(created.trip);
        setState("SUCCESS");
        setMessage("Payment verified and your CRUUZ has been requested.");
      } catch (error: any) {
        setState("FAILED");
        setMessage(error?.message || "CRUUZ could not complete this paid booking.");
      }
    }

    void completePaidBooking();
  }, [attempt, reference]);

  const busy = state === "VERIFYING" || state === "CREATING";

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-6 py-28">
      <section className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center shadow-2xl backdrop-blur sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
          {busy ? (
            <LoaderCircle className="h-8 w-8 animate-spin text-violet-300" />
          ) : state === "SUCCESS" ? (
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          ) : (
            <TriangleAlert className="h-8 w-8 text-amber-300" />
          )}
        </div>

        <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-violet-300">
          Paystack payment
        </p>

        <h1 className="mt-3 text-3xl font-black text-white">
          {state === "VERIFYING"
            ? "Verifying payment"
            : state === "CREATING"
              ? "Requesting your ride"
              : state === "SUCCESS"
                ? "Ride requested"
                : "Booking needs attention"}
        </h1>

        <p className="mx-auto mt-4 max-w-lg leading-7 text-white/65">{message}</p>

        {reference && (
          <div className="mt-6 rounded-2xl bg-black/20 p-4 text-left">
            <p className="text-xs font-bold uppercase tracking-wide text-white/35">
              Payment reference
            </p>
            <p className="mt-2 break-all text-sm font-semibold text-white/75">
              {reference}
            </p>
          </div>
        )}

        {trip?.id && (
          <div className="mt-4 rounded-2xl border border-emerald-400/15 bg-emerald-500/10 p-4 text-left">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-200/60">
              Trip confirmation
            </p>
            <p className="mt-2 break-all text-sm font-bold text-emerald-100">
              {trip.id}
            </p>
            {trip.tripVerificationCode && (
              <p className="mt-2 text-sm text-emerald-100/75">
                Pickup PIN: <strong>{trip.tripVerificationCode}</strong>
              </p>
            )}
          </div>
        )}

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          {state === "FAILED" && (
            <button
              type="button"
              onClick={() => {
                processingRef.current = false;
                setAttempt((value) => value + 1);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3.5 font-black text-white"
            >
              <RotateCcw className="h-4 w-4" />
              Retry verification
            </button>
          )}

          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-black text-white transition hover:bg-white/10"
          >
            {state === "SUCCESS" ? "Back to booking" : "Return to CRUUZ"}
          </Link>
        </div>
      </section>
    </main>
  );
}
