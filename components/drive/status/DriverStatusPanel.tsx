"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { joinDriverRoom } from "@/lib/socket";
import DriverDocumentUpload from "./DriverDocumentUpload";

type DriverDocument = {
  id?: string;
  documentType: string;
  status: string;
  expiresAt?: string;
  rejectionReason?: string;
  reviewNotes?: string;
};

type WalletTransaction = {
  id: string;
  type: string;
  amount: number;
  currency: string;
  reference?: string;
  description?: string;
  createdAt: string;
};

const MINIMUM_DRIVER_BALANCE = 20;

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

function getToken() {
  return localStorage.getItem("cruuz_web_token");
}

export default function DriverStatusPanel() {
  const [driver, setDriver] = useState<any>(null);
  const [documents, setDocuments] = useState<DriverDocument[]>([]);
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [user, setUser] = useState<any>(null);
  const [topUpAmount, setTopUpAmount] = useState("20");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [message, setMessage] = useState("");
  const [lastUpdatedAt, setLastUpdatedAt] = useState("");

  async function loadStatus() {
    try {
      setLoading(true);
      setMessage("");

      const token = getToken();
      const rawUser = localStorage.getItem("cruuz_web_user");

      if (rawUser) {
        try {
          setUser(JSON.parse(rawUser));
        } catch {
          setUser(null);
        }
      }

      if (!token) {
        setDriver(null);
        setDocuments([]);
        setWallet(null);
        setTransactions([]);
        setMessage("Please apply or verify your phone first.");
        return;
      }

      const response = await apiFetch("/drivers/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const currentDriver = response?.driver || null;
      setDriver(currentDriver);

      if (currentDriver?.id) {
        const docsResponse = await apiFetch(
          `/driver-documents/driver/${currentDriver.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setDocuments(
          Array.isArray(docsResponse)
            ? docsResponse
            : docsResponse?.documents || []
        );
      } else {
        setDocuments([]);
      }

      try {
        const walletResponse = await apiFetch("/earnings/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWallet(walletResponse?.summary || null);
      } catch {
        setWallet(null);
      }

      try {
        const txResponse = await apiFetch("/wallet/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTransactions(txResponse?.transactions || []);
      } catch {
        setTransactions([]);
      }

      setLastUpdatedAt(new Date().toLocaleTimeString());
    } catch (error: any) {
      setMessage(error?.message || "Could not load driver command center.");
    } finally {
      setLoading(false);
    }
  }

  async function updateAvailability(availability: "ONLINE" | "OFFLINE") {
    const token = getToken();

    if (!token) {
      setMessage("Please verify your phone again.");
      return;
    }

    try {
      setActionLoading(availability);
      setMessage("");

      const response = await apiFetch("/drivers/availability", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ availability }),
      });

      setDriver(response?.driver || null);
      setMessage(
        availability === "ONLINE"
          ? "You are now online."
          : "You are now offline."
      );

      await loadStatus();
    } catch (error: any) {
      setMessage(error?.message || "Could not update availability.");
    } finally {
      setActionLoading("");
    }
  }

  async function topUpWallet() {
    const token = getToken();
    const amount = Number(topUpAmount);

    if (!token) {
      setMessage("Please verify your phone again.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setMessage("Enter a valid top-up amount.");
      return;
    }

    try {
      setActionLoading("TOP_UP");
      setMessage("");

      await apiFetch("/wallet/top-up", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount }),
      });

      setMessage(`Wallet topped up with GHS ${amount.toFixed(2)}.`);
      await loadStatus();
    } catch (error: any) {
      setMessage(error?.message || "Wallet top-up failed.");
    } finally {
      setActionLoading("");
    }
  }

  useEffect(() => {
    loadStatus();

    const interval = window.setInterval(loadStatus, 15000);

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
      loadStatus();
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

  const documentMap = useMemo(() => {
    const map = new Map<string, DriverDocument>();

    for (const document of documents) {
      if (document?.documentType && !map.has(document.documentType)) {
        map.set(document.documentType, document);
      }
    }

    return map;
  }, [documents]);

  const complianceStats = useMemo(() => {
    const approved = requiredDocuments.filter(
      (item) => documentMap.get(item.type)?.status === "APPROVED"
    ).length;

    const total = requiredDocuments.length;
    const percent = Math.round((approved / total) * 100);

    const missing = requiredDocuments.filter(
      (item) => !documentMap.get(item.type)
    ).length;

    const attention = requiredDocuments.filter((item) => {
      const status = documentMap.get(item.type)?.status;
      return status === "REJECTED" || status === "EXPIRED" || status === "FLAGGED";
    }).length;

    return { approved, total, percent, missing, attention };
  }, [documentMap]);

  const walletBalance = Number(wallet?.walletBalance || 0);
  const walletReady = walletBalance >= MINIMUM_DRIVER_BALANCE;
  const approved = driver?.status === "APPROVED";
  const online = driver?.availability === "ONLINE";
  const readinessScore = Math.round(
    (complianceStats.percent * 0.55) +
      (walletReady ? 25 : Math.min((walletBalance / MINIMUM_DRIVER_BALANCE) * 25, 25)) +
      (approved ? 20 : 0)
  );

  const activeIndex = useMemo(() => {
    if (!driver) return 0;
    if (driver.status === "APPROVED" && walletReady) return 6;
    if (driver.status === "APPROVED") return 5;
    if (driver.status === "UNDER_REVIEW") return 2;
    if (driver.status === "REJECTED") return 2;
    if (driver.status === "SUSPENDED") return 2;
    return 1;
  }, [driver, walletReady]);

  if (loading && !driver) {
    return (
      <section className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
        <p className="text-white/60">Loading Driver Command Center...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
              CRUUZ Driver Command Center
            </p>

            <h1 className="mt-3 text-4xl font-black text-white">
              Welcome back{driver?.fullName ? `, ${driver.fullName}` : ""}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
              Manage your application, compliance documents, wallet readiness,
              driver availability, and live operational status from one place.
            </p>

            {lastUpdatedAt && (
              <p className="mt-3 text-xs font-bold text-white/35">
                Last updated: {lastUpdatedAt}
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-violet-500/25 bg-violet-500/10 p-5 text-right">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
              Readiness Score
            </p>
            <p className="mt-2 text-5xl font-black text-violet-300">
              {readinessScore}%
            </p>
            <p className="mt-1 text-xs font-bold text-white/45">
              Compliance + Wallet + Approval
            </p>
          </div>
        </div>

        {message && (
          <div className="mt-6 rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-4 text-sm font-bold text-yellow-100">
            {message}
          </div>
        )}

        {!driver && (
          <div className="mt-8 rounded-3xl border border-yellow-500/25 bg-yellow-500/10 p-6">
            <p className="text-xl font-black text-yellow-200">
              No driver profile found
            </p>
            <p className="mt-2 text-sm leading-6 text-yellow-100/80">
              Please start your driver application first, then return here to
              track your status.
            </p>
          </div>
        )}

        {driver && (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <MetricCard title="Status" value={driver.status} tone={approved ? "green" : "yellow"} />
              <MetricCard title="Availability" value={driver.availability} tone={online ? "green" : "neutral"} />
              <MetricCard title="Wallet" value={`GHS ${walletBalance.toFixed(2)}`} tone={walletReady ? "green" : "red"} />
              <MetricCard title="Compliance" value={`${complianceStats.percent}%`} tone={complianceStats.percent === 100 ? "green" : "yellow"} />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Panel title="Driver Operations">
                <div className="grid gap-4 md:grid-cols-2">
                  <InfoRow label="Driver ID" value={driver.id} />
                  <InfoRow label="Name" value={driver.fullName} />
                  <InfoRow label="Vehicle" value={driver.vehicleType} />
                  <InfoRow label="Plate" value={driver.vehiclePlate} />
                  <InfoRow label="Color" value={driver.vehicleColor || "—"} />
                  <InfoRow label="Capabilities" value={Array.isArray(driver.capabilities) ? driver.capabilities.join(", ") : "GO"} />
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="font-black text-white">Quick Actions</p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => updateAvailability("ONLINE")}
                      disabled={!approved || actionLoading === "ONLINE" || online}
                      className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionLoading === "ONLINE" ? "Going Online..." : "Go Online"}
                    </button>

                    <button
                      type="button"
                      onClick={() => updateAvailability("OFFLINE")}
                      disabled={actionLoading === "OFFLINE" || !online}
                      className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionLoading === "OFFLINE" ? "Going Offline..." : "Go Offline"}
                    </button>

                    <button
                      type="button"
                      onClick={loadStatus}
                      disabled={loading}
                      className="rounded-2xl border border-violet-400/30 bg-violet-500/10 px-5 py-3 text-sm font-black text-violet-200 disabled:opacity-50"
                    >
                      {loading ? "Refreshing..." : "Refresh"}
                    </button>
                  </div>

                  {!approved && (
                    <p className="mt-3 text-xs leading-5 text-yellow-200/80">
                      Go Online is locked until Nexaro Ops approves your driver
                      profile.
                    </p>
                  )}
                </div>
              </Panel>

              <Panel title="Readiness Breakdown">
                <div className="space-y-4">
                  <ProgressRow label="Compliance" value={complianceStats.percent} />
                  <ProgressRow label="Wallet readiness" value={walletReady ? 100 : Math.round((walletBalance / MINIMUM_DRIVER_BALANCE) * 100)} />
                  <ProgressRow label="Ops approval" value={approved ? 100 : 0} />
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="font-black text-white">Operational Decision</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {approved && walletReady && complianceStats.percent === 100
                      ? "You are fully ready to operate on CRUUZ."
                      : "Complete the pending requirements below before full operational readiness."}
                  </p>
                </div>
              </Panel>
            </div>

            <Panel title="Application Progress">
              <div className="grid gap-4 md:grid-cols-2">
                {timeline.map((item, index) => {
                  const completed = index <= activeIndex;

                  return (
                    <div key={item} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
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
                        <p className={`font-black ${completed ? "text-white" : "text-white/40"}`}>
                          {item}
                        </p>

                        {item === "Wallet Top-up Required" && (
                          <p className="mt-1 text-xs leading-5 text-white/55">
                            Driver must maintain at least GHS 20 before going online.
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            <Panel title="Driver Compliance Center">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm leading-6 text-white/60">
                    Documents are connected to the same backend used by the
                    Driver App and Nexaro Ops.
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-500/25 bg-violet-500/10 px-4 py-3 text-right">
                  <p className="text-2xl font-black text-violet-300">
                    {complianceStats.approved}/{complianceStats.total}
                  </p>
                  <p className="text-xs font-bold text-white/50">
                    Approved documents
                  </p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all"
                  style={{ width: `${complianceStats.percent}%` }}
                />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {requiredDocuments.map((item) => {
                  const document = documentMap.get(item.type);
                  const status = document?.status || "MISSING";

                  return (
                    <div key={item.type}>
                      <DocumentCard
                        label={item.label}
                        status={status}
                        expiresAt={document?.expiresAt}
                        rejectionReason={document?.rejectionReason}
                        reviewNotes={document?.reviewNotes}
                      />

                      {(status === "MISSING" ||
                        status === "REJECTED" ||
                        status === "EXPIRED" ||
                        status === "FLAGGED") &&
                        driver?.id && (
                          <DriverDocumentUpload
                            driverId={driver.id}
                            documentType={item.type}
                            label={item.label}
                            onUploaded={loadStatus}
                          />
                        )}
                    </div>
                  );
                })}
              </div>
            </Panel>

            <Panel title="Driver Wallet Center">
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <div className="rounded-3xl border border-violet-500/25 bg-violet-500/10 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                      Current Balance
                    </p>
                    <p className="mt-2 text-4xl font-black text-violet-300">
                      GHS {walletBalance.toFixed(2)}
                    </p>
                    <p className="mt-2 text-sm text-white/55">
                      Minimum required: GHS {MINIMUM_DRIVER_BALANCE.toFixed(2)}
                    </p>
                  </div>

                  <div className={`mt-4 rounded-2xl border p-4 ${
                    walletReady
                      ? "border-emerald-400/20 bg-emerald-400/10"
                      : "border-red-400/20 bg-red-400/10"
                  }`}>
                    <p className={`font-black ${walletReady ? "text-emerald-300" : "text-red-300"}`}>
                      {walletReady
                        ? "Wallet Ready"
                        : "Top-up required before full readiness"}
                    </p>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="font-black text-white">Top up wallet</p>

                    <div className="mt-3 flex gap-3">
                      <input
                        value={topUpAmount}
                        onChange={(event) => setTopUpAmount(event.target.value)}
                        inputMode="decimal"
                        className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
                        placeholder="20"
                      />

                      <button
                        type="button"
                        onClick={topUpWallet}
                        disabled={actionLoading === "TOP_UP"}
                        className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-black text-white disabled:opacity-50"
                      >
                        {actionLoading === "TOP_UP" ? "Adding..." : "Top Up"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                  <p className="font-black text-white">Recent Transactions</p>

                  <div className="mt-4 space-y-3">
                    {transactions.length === 0 && (
                      <p className="text-sm text-white/50">
                        No wallet transactions found yet.
                      </p>
                    )}

                    {transactions.slice(0, 6).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                      >
                        <div>
                          <p className="text-sm font-black text-white">
                            {transaction.type.replace(/_/g, " ")}
                          </p>
                          <p className="mt-1 text-xs text-white/45">
                            {transaction.description || transaction.reference || "Wallet activity"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className={`text-sm font-black ${
                            Number(transaction.amount) >= 0
                              ? "text-emerald-300"
                              : "text-red-300"
                          }`}>
                            {Number(transaction.amount) >= 0 ? "+" : ""}
                            GHS {Number(transaction.amount || 0).toFixed(2)}
                          </p>
                          <p className="mt-1 text-xs text-white/35">
                            {transaction.createdAt
                              ? new Date(transaction.createdAt).toLocaleDateString()
                              : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>

            <div className="mt-8 rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-5">
              <p className="font-black text-yellow-300">Next steps</p>
              <p className="mt-2 text-sm leading-6 text-yellow-100/90">
                Complete all required documents, wait for Nexaro Ops approval,
                keep at least GHS 20 in your wallet, then go online when ready.
              </p>
            </div>
          </>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
      <p className="mb-6 text-xl font-black text-white">{title}</p>
      {children}
    </div>
  );
}

function MetricCard({
  title,
  value,
  tone,
}: {
  title: string;
  value: string;
  tone: "green" | "yellow" | "red" | "neutral";
}) {
  const toneClass =
    tone === "green"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : tone === "yellow"
      ? "border-yellow-400/20 bg-yellow-400/10 text-yellow-300"
      : tone === "red"
      ? "border-red-400/20 bg-red-400/10 text-red-300"
      : "border-white/10 bg-white/[0.04] text-white";

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <p className="text-xs font-black uppercase tracking-[0.2em] opacity-70">
        {title}
      </p>
      <p className="mt-2 text-lg font-black">{value || "—"}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">
        {label}
      </p>
      <p className="mt-2 font-black text-white">{value || "—"}</p>
    </div>
  );
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value || 0)));

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-white/70">{label}</p>
        <p className="text-sm font-black text-white">{safeValue}%</p>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

function DocumentCard({
  label,
  status,
  expiresAt,
  rejectionReason,
  reviewNotes,
}: {
  label: string;
  status: string;
  expiresAt?: string;
  rejectionReason?: string;
  reviewNotes?: string;
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

          {rejectionReason && (
            <p className="mt-2 text-xs leading-5 opacity-90">
              Reason: {rejectionReason}
            </p>
          )}

          {reviewNotes && (
            <p className="mt-1 text-xs leading-5 opacity-80">
              Notes: {reviewNotes}
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