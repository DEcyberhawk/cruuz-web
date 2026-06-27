"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

type Step = "phone" | "otp" | "profile" | "vehicle" | "submit" | "done";

export default function DriverApplyForm() {
  const [step, setStep] = useState<Step>("phone");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    licenseNumber: "",
    vehicleType: "",
    vehiclePlate: "",
    vehicleColor: "",
  });

  const steps: Step[] = ["phone", "otp", "profile", "vehicle", "submit"];
  const currentStep = Math.max(1, steps.indexOf(step) + 1);

  async function sendOtp() {
    setLoading(true);
    setMessage("");

    try {
      await apiFetch("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
      });

      setStep("otp");
      setMessage("OTP sent. Use 1234 for development.");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    setLoading(true);
    setMessage("");

    try {
      const response = await apiFetch("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ phone, otp }),
      });

      localStorage.setItem("cruuz_web_token", response.token);
      localStorage.setItem("cruuz_web_user", JSON.stringify(response.user));

      setStep("profile");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitApplication() {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("cruuz_web_token");

      await apiFetch("/drivers/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      setStep("done");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
        CRUUZ Driver Application
      </p>

      <h1 className="mt-3 text-4xl font-black">Apply to drive with CRUUZ</h1>

      {step !== "done" && (
        <div className="mt-8">
          <div className="mb-3 flex justify-between text-xs font-bold text-white/50">
            <span>Step {currentStep} of 5</span>
            <span>{Math.round((currentStep / 5) * 100)}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {step === "phone" && (
        <div className="mt-8 space-y-4">
          <Input label="Phone Number" value={phone} onChange={setPhone} />
          <Button onClick={sendOtp} loading={loading}>
            Send OTP
          </Button>
        </div>
      )}

      {step === "otp" && (
        <div className="mt-8 space-y-4">
          <Input label="OTP Code" value={otp} onChange={setOtp} />
          <Button onClick={verifyOtp} loading={loading}>
            Verify OTP
          </Button>
        </div>
      )}

      {step === "profile" && (
        <div className="mt-8 space-y-4">
          <Input
            label="Full Name"
            value={form.fullName}
            onChange={(v) => setForm({ ...form, fullName: v })}
          />

          <Input
            label="Driver License Number"
            value={form.licenseNumber}
            onChange={(v) => setForm({ ...form, licenseNumber: v })}
          />

          <Button onClick={() => setStep("vehicle")}>Continue</Button>
        </div>
      )}

      {step === "vehicle" && (
        <div className="mt-8 space-y-4">
          <Input
            label="Vehicle Type"
            value={form.vehicleType}
            onChange={(v) => setForm({ ...form, vehicleType: v })}
          />

          <Input
            label="Vehicle Plate"
            value={form.vehiclePlate}
            onChange={(v) => setForm({ ...form, vehiclePlate: v })}
          />

          <Input
            label="Vehicle Color"
            value={form.vehicleColor}
            onChange={(v) => setForm({ ...form, vehicleColor: v })}
          />

          <Button onClick={() => setStep("submit")}>Review Application</Button>
        </div>
      )}

      {step === "submit" && (
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/70">
            <p><b>Name:</b> {form.fullName}</p>
            <p><b>License:</b> {form.licenseNumber}</p>
            <p><b>Vehicle:</b> {form.vehicleType}</p>
            <p><b>Plate:</b> {form.vehiclePlate}</p>
            <p><b>Color:</b> {form.vehicleColor}</p>
          </div>

          <Button onClick={submitApplication} loading={loading}>
            Submit Application
          </Button>
        </div>
      )}

      {step === "done" && (
        <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6">
          <h2 className="text-2xl font-black text-emerald-300">
            Application submitted
          </h2>

          <p className="mt-2 text-white/70">
            Your driver application has been sent to CRUUZ Operations for review.
          </p>
        </div>
      )}

      {message && <p className="mt-5 text-sm text-yellow-300">{message}</p>}
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white/70">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none"
      />
    </label>
  );
}

function Button({
  children,
  onClick,
  loading,
}: {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={loading}
      onClick={onClick}
      className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-700/25 disabled:opacity-60"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}