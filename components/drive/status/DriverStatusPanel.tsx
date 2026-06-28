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

      const driverResponse = await apiFetch("/drivers/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const currentDriver = driverResponse?.driver || null;
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
          prev ? { ...prev, status: payload.status } : prev
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

    const attention = requiredDocuments.filter((item) => {
      const status = documentMap.get(item.type)?.status;
      return status === "REJECTED" || status === "EXPIRED" || status === "FLAGGED";
    }).length;

    return { approved, total, percent, attention };
  }, [documentMap]);

  const walletBalance = Number(wallet?.walletBalance || 0);
  const walletReady = walletBalance >= MINIMUM_DRIVER_BALANCE;
  const approved = driver?.status === "APPROVED";
  const online = driver?.availability === "ONLINE";

  const readinessScore = Math.round(
    complianceStats.percent * 0.55 +
      (walletReady
        ? 25
        : Math.min((walletBalance / MINIMUM_DRIVER_BALANCE) * 25, 25)) +
      (approved ? 20 : 0)
  );

  if (loading && !driver) {
    return (
      <section className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.05] p-5">
        <p className="text-sm text-white/60">Loading Driver Command Center...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl">
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-violet-300">
              CRUUZ Driver Command Center
            </p>

            <h1 className="mt-2 text-2xl font-black text-white md:text-3xl">
              {driver?.fullName || "Driver Portal"}
            </h1>

            {lastUpdatedAt && (
              <p className="mt-1 text-xs text-white/40">
                Last updated: {lastUpdatedAt}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={loadStatus}
              disabled={loading}
              className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-white hover:bg-white/15 disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>

            <Link
              href="/drive/apply"
              className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-white hover:bg-white/15"
            >
              Application
            </Link>

            <Link
              href="/drive"
              className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-xs font-black text-white/70 hover:bg-white/10"
            >
              Driver Page
            </Link>
          </div>
        </div>

        {message && (
          <div className="mt-4 rounded-2xl border border-yellow-500/25 bg-yellow-500/10 px-4 py-3 text-xs font-bold text-yellow-100">
            {message}
          </div>
        )}

        {!driver && (
          <CompactPanel title="No driver profile found">
            <p className="text-sm leading-6 text-white/60">
              Please start your driver application first, then return here to
              track your status.
            </p>
          </CompactPanel>
        )}

        {driver && (
          <>
            <div className="mt-4 grid gap-3 md:grid-cols-5">
              <MetricCard title="Readiness" value={`${readinessScore}%`} tone={readinessScore >= 90 ? "green" : "yellow"} />
              <MetricCard title="Status" value={driver.status} tone={approved ? "green" : "yellow"} />
              <MetricCard title="Availability" value={driver.availability} tone={online ? "green" : "neutral"} />
              <MetricCard title="Wallet" value={`GHS ${walletBalance.toFixed(2)}`} tone={walletReady ? "green" : "red"} />
              <MetricCard title="Compliance" value={`${complianceStats.percent}%`} tone={complianceStats.percent === 100 ? "green" : "yellow"} />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
              <CompactPanel title="Driver & Vehicle">
                <div className="grid gap-2 md:grid-cols-2">
                  <InfoRow label="Driver ID" value={driver.id} />
                  <InfoRow label="Vehicle" value={driver.vehicleType} />
                  <InfoRow label="Plate" value={driver.vehiclePlate} />
                  <InfoRow label="Color" value={driver.vehicleColor || "—"} />
                </div>

                <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-white">Quick Actions</p>
                      <p className="mt-1 text-xs text-white/45">
                        Go online only after approval and readiness checks.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => updateAvailability("ONLINE")}
                        disabled={!approved || actionLoading === "ONLINE" || online}
                        className="rounded-xl bg-emerald-500 px-3 py-2 text-xs font-black text-white disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        {actionLoading === "ONLINE" ? "Going..." : "Go Online"}
                      </button>

                      <button
                        type="button"
                        onClick={() => updateAvailability("OFFLINE")}
                        disabled={actionLoading === "OFFLINE" || !online}
                        className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-white disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        {actionLoading === "OFFLINE" ? "Going..." : "Go Offline"}
                      </button>
                    </div>
                  </div>
                </div>
              </CompactPanel>

              <CompactPanel title="Readiness">
                <div className="space-y-3">
                  <ProgressRow label="Compliance" value={complianceStats.percent} />
                  <ProgressRow
                    label="Wallet"
                    value={
                      walletReady
                        ? 100
                        : Math.round((walletBalance / MINIMUM_DRIVER_BALANCE) * 100)
                    }
                  />
                  <ProgressRow label="Ops Approval" value={approved ? 100 : 0} />
                </div>
              </CompactPanel>
            </div>

            <CompactPanel title="Compliance Center">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs leading-5 text-white/50">
                  {complianceStats.approved}/{complianceStats.total} approved.
                  {complianceStats.attention > 0
                    ? ` ${complianceStats.attention} needs attention.`
                    : ""}
                </p>

                <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-black text-violet-200">
                  {complianceStats.percent}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                  style={{ width: `${complianceStats.percent}%` }}
                />
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
            </CompactPanel>

            <CompactPanel title="Wallet Center">
              <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">
                    Balance
                  </p>
                  <p className="mt-2 text-3xl font-black text-violet-300">
                    GHS {walletBalance.toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    Minimum required: GHS {MINIMUM_DRIVER_BALANCE.toFixed(2)}
                  </p>

                  <div
                    className={`mt-3 rounded-xl border px-3 py-2 text-xs font-black ${
                      walletReady
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                        : "border-red-400/20 bg-red-400/10 text-red-300"
                    }`}
                  >
                    {walletReady ? "Wallet Ready" : "Top-up Required"}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <input
                      value={topUpAmount}
                      onChange={(event) => setTopUpAmount(event.target.value)}
                      inputMode="decimal"
                      className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white outline-none placeholder:text-white/30"
                      placeholder="20"
                    />

                    <button
                      type="button"
                      onClick={topUpWallet}
                      disabled={actionLoading === "TOP_UP"}
                      className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 py-2 text-xs font-black text-white disabled:opacity-50"
                    >
                      {actionLoading === "TOP_UP" ? "Adding..." : "Top Up"}
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <p className="text-sm font-black text-white">
                    Recent Transactions
                  </p>

                  <div className="mt-3 space-y-2">
                    {transactions.length === 0 && (
                      <p className="text-xs text-white/45">
                        No wallet transactions found yet.
                      </p>
                    )}

                    {transactions.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
                      >
                        <div>
                          <p className="text-xs font-black text-white">
                            {transaction.type.replace(/_/g, " ")}
                          </p>
                          <p className="mt-0.5 text-[11px] text-white/35">
                            {transaction.description ||
                              transaction.reference ||
                              "Wallet activity"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p
                            className={`text-xs font-black ${
                              Number(transaction.amount) >= 0
                                ? "text-emerald-300"
                                : "text-red-300"
                            }`}
                          >
                            {Number(transaction.amount) >= 0 ? "+" : ""}
                            GHS {Number(transaction.amount || 0).toFixed(2)}
                          </p>
                          <p className="mt-0.5 text-[11px] text-white/35">
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
            </CompactPanel>
          </>
        )}
      </div>
    </section>
  );
}

function CompactPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="mb-3 text-base font-black text-white">{title}</p>
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
    <div className={`rounded-2xl border p-3 ${toneClass}`}>
      <p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-70">
        {title}
      </p>
      <p className="mt-1.5 text-sm font-black">{value || "—"}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>
      <p className="mt-1 text-xs font-black text-white">{value || "—"}</p>
    </div>
  );
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value || 0)));

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold text-white/60">{label}</p>
        <p className="text-xs font-black text-white">{safeValue}%</p>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
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
    <div className={`rounded-2xl border p-3 ${tone}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black">{label}</p>
          <p className="mt-0.5 text-[11px] font-bold opacity-80">{status}</p>

          {expiresAt && (
            <p className="mt-1 text-[11px] opacity-70">
              Expires: {new Date(expiresAt).toLocaleDateString()}
            </p>
          )}

          {rejectionReason && (
            <p className="mt-1 text-[11px] leading-4 opacity-90">
              Reason: {rejectionReason}
            </p>
          )}

          {reviewNotes && (
            <p className="mt-1 text-[11px] leading-4 opacity-80">
              Notes: {reviewNotes}
            </p>
          )}
        </div>

        <div className="grid h-7 w-7 place-items-center rounded-full bg-black/20 text-xs font-black">
          {icon}
        </div>
      </div>
    </div>
  );
}