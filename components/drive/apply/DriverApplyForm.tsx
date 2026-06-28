"use client";

import Link from "next/link";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

type Step = "phone" | "otp" | "driver" | "review" | "done";

type DriverForm = {
  fullName: string;
  licenseNumber: string;
  vehicleType: string;
  vehiclePlate: string;
  vehicleColor: string;
};

export default function DriverApplyForm() {
  const [step, setStep] = useState<Step>("phone");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState<DriverForm>({
    fullName: "",
    licenseNumber: "",
    vehicleType: "",
    vehiclePlate: "",
    vehicleColor: "",
  });

  const steps: Step[] = ["phone", "otp", "driver", "review"];
  const currentStep = step === "done" ? 4 : steps.indexOf(step) + 1;

  function updateForm(key: keyof DriverForm, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function validateDriverForm() {
    if (form.fullName.trim().length < 3) return "Full name is required.";
    if (form.licenseNumber.trim().length < 4)
      return "Valid driver license number is required.";
    if (form.vehicleType.trim().length < 2) return "Vehicle type is required.";
    if (form.vehiclePlate.trim().length < 4)
      return "Valid vehicle plate number is required.";
    if (form.vehicleColor.trim().length < 2)
      return "Vehicle color is required.";

    return "";
  }

  async function sendOtp() {
    if (phone.trim().length < 8) {
      setMessage("Enter a valid phone number.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await apiFetch("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone: phone.trim() }),
      });

      setStep("otp");
      setMessage("OTP sent. Use 1234 for development.");
  } catch (error: any) {
  const errorMessage =
    error?.message ||
    error?.response?.data?.message ||
    "Application submission failed.";

  if (
    errorMessage.toLowerCase().includes("already has a driver profile")
  ) {
    setStep("done");
    setMessage(
      "This phone number already has a CRUUZ driver profile. Track your application to continue onboarding."
    );
    return;
  }

  setMessage(errorMessage);
} finally {
  setLoading(false);
}
  }

  async function verifyOtp() {
    if (otp.trim().length < 4) {
      setMessage("Enter the OTP code.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await apiFetch("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          phone: phone.trim(),
          otp: otp.trim(),
        }),
      });

      localStorage.setItem("cruuz_web_token", response.token);
      localStorage.setItem("cruuz_web_user", JSON.stringify(response.user));

      setStep("driver");
    } catch (error: any) {
      setMessage(error.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  }

  function goToReview() {
    const error = validateDriverForm();

    if (error) {
      setMessage(error);
      return;
    }

    setMessage("");
    setStep("review");
  }

  async function submitApplication() {
    const error = validateDriverForm();

    if (error) {
      setMessage(error);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("cruuz_web_token");

      if (!token) {
        setStep("phone");
        throw new Error("Session expired. Please verify your phone again.");
      }

      await apiFetch("/drivers/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          licenseNumber: form.licenseNumber.trim(),
          vehicleType: form.vehicleType.trim(),
          vehiclePlate: form.vehiclePlate.trim(),
          vehicleColor: form.vehicleColor.trim(),
        }),
      });

      setStep("done");
    } catch (error: any) {
      setMessage(error.message || "Application submission failed.");
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

      <p className="mt-3 max-w-2xl leading-7 text-white/65">
        Start your driver onboarding from cruuz.org. Your application will be
        sent directly to CRUUZ Operations for review.
      </p>

      {step !== "done" && (
        <div className="mt-8">
          <div className="mb-3 flex justify-between text-xs font-bold text-white/50">
            <span>Step {currentStep} of 4</span>
            <span>{Math.round((currentStep / 4) * 100)}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {step === "phone" && (
        <div className="mt-8 space-y-4">
          <Input
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            placeholder="+233..."
          />

          <Button onClick={sendOtp} loading={loading}>
            Send OTP
          </Button>
        </div>
      )}

      {step === "otp" && (
        <div className="mt-8 space-y-4">
          <Input
            label="OTP Code"
            value={otp}
            onChange={setOtp}
            placeholder="1234"
          />

          <div className="flex flex-wrap gap-3">
            <Button onClick={verifyOtp} loading={loading}>
              Verify OTP
            </Button>

            <Button variant="secondary" onClick={() => setStep("phone")}>
              Change Phone
            </Button>
          </div>
        </div>
      )}

      {step === "driver" && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Input
            label="Full Name"
            value={form.fullName}
            onChange={(value) => updateForm("fullName", value)}
            placeholder="Driver full name"
          />

          <Input
            label="Driver License Number"
            value={form.licenseNumber}
            onChange={(value) => updateForm("licenseNumber", value)}
            placeholder="License number"
          />

          <Input
            label="Vehicle Type"
            value={form.vehicleType}
            onChange={(value) => updateForm("vehicleType", value)}
            placeholder="Toyota Corolla"
          />

          <Input
            label="Vehicle Plate"
            value={form.vehiclePlate}
            onChange={(value) => updateForm("vehiclePlate", value)}
            placeholder="GE-1234-24"
          />

          <Input
            label="Vehicle Color"
            value={form.vehicleColor}
            onChange={(value) => updateForm("vehicleColor", value)}
            placeholder="Black"
          />

          <div className="md:col-span-2">
            <Button onClick={goToReview}>Review Application</Button>
          </div>
        </div>
      )}

      {step === "review" && (
        <div className="mt-8 space-y-5">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <ReviewRow label="Phone" value={phone} />
            <ReviewRow label="Full Name" value={form.fullName} />
            <ReviewRow label="License" value={form.licenseNumber} />
            <ReviewRow label="Vehicle Type" value={form.vehicleType} />
            <ReviewRow label="Vehicle Plate" value={form.vehiclePlate} />
            <ReviewRow label="Vehicle Color" value={form.vehicleColor} />
          </div>

          <div className="rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-4">
            <p className="font-black text-yellow-300">Next after submission</p>

            <p className="mt-2 text-sm leading-6 text-yellow-100/90">
              Your profile will enter Nexaro Ops as PENDING. You will still need
              to complete compliance documents such as Driver License,
              Insurance, Roadworthy, Vehicle Photo, Profile Photo, Selfie
              Verification and Ghana Card before approval.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={submitApplication} loading={loading}>
              Submit Application
            </Button>

            <Button variant="secondary" onClick={() => setStep("driver")}>
              Edit Details
            </Button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6">
          <h2 className="text-2xl font-black text-emerald-300">
            Application submitted
          </h2>

          <p className="mt-2 leading-7 text-white/70">
            Your driver application has been sent to CRUUZ Operations. Your
            status is now pending review.
          </p>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-black text-white">What happens next?</p>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-white/65">
              <li>1. CRUUZ Operations reviews your driver profile.</li>
              <li>2. You complete required compliance documents.</li>
              <li>3. Ops approves your profile when compliance is ready.</li>
              <li>4. You top up at least GHS 20 before going online.</li>
              <li>5. You can then receive ride requests.</li>
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">
            <p className="text-lg font-black text-violet-300">
              Continue Your Onboarding
            </p>

            <p className="mt-2 leading-7 text-white/70">
              Track your application status or return to the driver page to
              learn more about the next onboarding steps.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/drive/status"
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-violet-700/25 transition duration-300 hover:-translate-y-0.5"
              >
                Track My Application →
              </Link>

              <Link
                href="/drive"
                className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white transition duration-300 hover:bg-white/15"
              >
                Back to Driver Page
              </Link>

              <Link
                href="/"
                className="rounded-2xl border border-white/15 bg-transparent px-6 py-3 text-sm font-black text-white/80 transition duration-300 hover:bg-white/10 hover:text-white"
              >
                Return Home
              </Link>
            </div>
          </div>
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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white/70">
        {label}
      </span>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/25"
      />
    </label>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 py-3 text-sm last:border-b-0">
      <span className="text-white/45">{label}</span>
      <span className="font-bold text-white">{value || "—"}</span>
    </div>
  );
}

function Button({
  children,
  onClick,
  loading,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "secondary"
      ? "rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15 disabled:opacity-60"
      : "rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-700/25 transition hover:-translate-y-0.5 disabled:opacity-60";

  return (
    <button
      type="button"
      disabled={loading}
      onClick={onClick}
      className={className}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}