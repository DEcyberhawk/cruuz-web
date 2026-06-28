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

export default function DriverStatusPanel() {
  const [driver, setDriver] = useState<any>(null);
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