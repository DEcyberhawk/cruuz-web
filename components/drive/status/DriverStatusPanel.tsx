"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { joinDriverRoom } from "@/lib/socket";

const timeline = [
  "Phone Verified",
  "Application Submitted",
  "Operations Review",
  "Documents Required",
  "Wallet Top-up Required",
  "Approved",
  "Ready to Go Online",
];

const requiredDocuments = [
  { type: "DRIVER_LICENSE", label: "Driver License" },
  { type: "INSURANCE", label: "Insurance" },
  { type: "ROADWORTHY", label: "Roadworthy" },
  { type: "VEHICLE_PHOTO", label: "Vehicle Photo" },
  { type: "PROFILE_PHOTO", label: "Profile Photo" },
  { type: "SELFIE_VERIFICATION", label: "Selfie Verification" },
  { type: "GHANA_CARD", label: "Ghana Card" },
];

export default function DriverStatusPanel() {
  const [driver, setDriver] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [lastUpdatedAt, setLastUpdatedAt] = useState("");

  async function loadStatus() {
    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("cruuz_web_token");
      const rawUser = localStorage.getItem("cruuz_web_user");

      if (rawUser) {
        setUser(JSON.parse(rawUser));
      }

      if (!token) {
        setMessage("Please apply or verify your phone first.");
        return;
      }

      const response = await apiFetch("/drivers/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDriver(response.driver);

      if (response.driver?.id) {
        const docsResponse = await apiFetch(
          `/driver-documents/driver/${response.driver.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDocuments(docsResponse.documents || []);
      }

      setLastUpdatedAt(new Date().toLocaleTimeString());
    } catch (error: any) {
      setMessage(error.message || "Could not load driver status.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStatus();

    const interval = window.setInterval(() => {
      loadStatus();
    }, 15000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const socket = joinDriverRoom(user.id);

    function handleStatusUpdate(payload: any) {
      if (payload?.driver) {
        setDriver(payload.driver);
      }

      if (payload?.status) {
        setDriver((prev: any) =>
          prev
            ? {
                ...prev,
                status: payload.status,
              }
            : prev
        );
      }

      setLastUpdatedAt(new Date().toLocaleTimeString());
    }

    socket.off("driver:status:update", handleStatusUpdate);
    socket.off("driver:approved", handleStatusUpdate);
    socket.off("driver:rejected", handleStatusUpdate);
    socket.off("driver:suspended", handleStatusUpdate);

    socket.on("driver:status:update", handleStatusUpdate);
    socket.on("driver:approved", handleStatusUpdate);
    socket.on("driver:rejected", handleStatusUpdate);
    socket.on("driver:suspended", handleStatusUpdate);

    return () => {
      socket.off("driver:status:update", handleStatusUpdate);
      socket.off("driver:approved", handleStatusUpdate);
      socket.off("driver:rejected", handleStatusUpdate);
      socket.off("driver:suspended", handleStatusUpdate);
    };
  }, [user?.id]);

  const activeIndex = useMemo(() => {
    if (!driver) return 0;

    if (driver.status === "APPROVED") return 5;
    if (driver.status === "UNDER_REVIEW") return 2;
    if (driver.status === "REJECTED") return 2;
    if (driver.status === "SUSPENDED") return 2;

    return 1;
  }, [driver]);

  const documentMap = useMemo(() => {
    const map = new Map<string, any>();

    for (const document of documents) {
      if (!map.has(document.documentType)) {
        map.set(document.documentType, document);
      }
    }

    return map;
  }, [documents]);

  const complianceStats = useMemo(() => {
    const approved = requiredDocuments.filter(
      (item) => documentMap.get(item.type)?.status === "APPROVED"
    ).length;

    const submitted = requiredDocuments.filter((item) =>
      documentMap.has(item.type)
    ).length;

    const total = requiredDocuments.length;
    const percent = Math.round((approved / total) * 100);

    return {
      approved,
      submitted,
      total,
      percent,
    };
  }, [documentMap]);

  if (loading && !driver) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
        <p className="text-white/60">Loading application status...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
        Driver Application Status
      </p>

      <h1 className="mt-3 text-4xl font-black">
        Track your CRUUZ application
      </h1>

      {lastUpdatedAt && (
        <p className="mt-3 text-sm text-white/45">
          Last updated: {lastUpdatedAt}
        </p>
      )}

      {message && (
        <div className="mt-6 rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-4 text-yellow-200">
          {message}
        </div>
      )}

      {driver && (
        <>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <StatusCard label="Driver ID" value={driver.id} />
            <StatusCard label="Name" value={driver.fullName} />
            <StatusCard label="Vehicle" value={driver.vehicleType} />
            <StatusCard label="Plate" value={driver.vehiclePlate} />
            <StatusCard label="Status" value={driver.status} />
            <StatusCard label="Availability" value={driver.availability} />
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
            <p className="text-xl font-black text-white">
              Application Progress
            </p>

            <div className="mt-6 space-y-4">
              {timeline.map((item, index) => {
                const completed = index <= activeIndex;

                return (
                  <div key={item} className="flex items-start gap-4">
                    <div
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                        completed
                          ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {completed ? "✓" : index + 1}
                    </div>

                    <div>
                      <p
                        className={`font-black ${
                          completed ? "text-white" : "text-white/40"
                        }`}
                      >
                        {item}
                      </p>

                      {item === "Wallet Top-up Required" && (
                        <p className="mt-1 text-sm text-white/55">
                          Driver must top up at least GHS 20 before going
                          online.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xl font-black text-white">
                  Driver Compliance Center
                </p>

                <p className="mt-2 text-sm leading-6 text-white/60">
                  Track required documents connected to the same CRUUZ
                  compliance system used by the Driver App and Nexaro Ops.
                </p>
              </div>

              <div className="rounded-2xl border border-violet-500/25 bg-violet-500/10 px-4 py-3 text-right">
                <p className="text-2xl font-black text-violet-300">
                  {complianceStats.percent}%
                </p>
                <p className="text-xs font-bold text-white/50">
                  {complianceStats.approved}/{complianceStats.total} approved
                </p>
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all"
                style={{ width: `${complianceStats.percent}%` }}
              />
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {requiredDocuments.map((item) => {
                const document = documentMap.get(item.type);
                const status = document?.status || "MISSING";

                return (
                  <DocumentCard
                    key={item.type}
                    label={item.label}
                    status={status}
                    expiresAt={document?.expiresAt}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-5">
            <p className="font-black text-yellow-300">Next steps</p>

            <p className="mt-2 text-sm leading-6 text-yellow-100/90">
              Complete your compliance documents in the CRUUZ Driver App or with
              CRUUZ Operations. After approval, top up at least GHS 20 before
              going online.
            </p>
          </div>
        </>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={loadStatus}
          disabled={loading}
          className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-black text-white disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Refresh Status"}
        </button>

        <Link
          href="/drive/apply"
          className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white"
        >
          Back to Application
        </Link>

        <Link
          href="/drive"
          className="rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-black text-white/80"
        >
          Back to Driver Page
        </Link>
      </div>
    </section>
  );
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">
        {label}
      </p>

      <p className="mt-2 font-black text-white">{value || "—"}</p>
    </div>
  );
}

function DocumentCard({
  label,
  status,
  expiresAt,
}: {
  label: string;
  status: string;
  expiresAt?: string;
}) {
  const approved = status === "APPROVED";
  const pending = status === "PENDING" || status === "UNDER_REVIEW";
  const rejected = status === "REJECTED" || status === "FLAGGED";
  const expired = status === "EXPIRED";

  const tone = approved
    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
    : rejected || expired
    ? "border-red-400/20 bg-red-400/10 text-red-300"
    : pending
    ? "border-yellow-400/20 bg-yellow-400/10 text-yellow-300"
    : "border-white/10 bg-white/[0.04] text-white/45";

  const icon = approved ? "✓" : pending ? "…" : rejected || expired ? "!" : "—";

  return (
    <div className={`rounded-2xl border p-4 ${tone}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-black">{label}</p>
          <p className="mt-1 text-xs font-bold opacity-80">{status}</p>

          {expiresAt && (
            <p className="mt-1 text-xs opacity-70">
              Expires: {new Date(expiresAt).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="grid h-8 w-8 place-items-center rounded-full bg-black/20 text-sm font-black">
          {icon}
        </div>
      </div>
    </div>
  );
}