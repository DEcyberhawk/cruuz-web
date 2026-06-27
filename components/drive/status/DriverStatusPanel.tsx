"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function DriverStatusPanel() {
  const [driver, setDriver] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadStatus() {
    try {
      const token = localStorage.getItem("cruuz_web_token");

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
    } catch (error: any) {
      setMessage(error.message || "Could not load driver status.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStatus();
  }, []);

  if (loading) {
    return <p className="text-white/60">Loading application status...</p>;
  }

  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
        Driver Application Status
      </p>

      <h1 className="mt-3 text-4xl font-black">
        Track your CRUUZ application
      </h1>

      {message && <p className="mt-6 text-yellow-300">{message}</p>}

      {driver && (
        <div className="mt-8 space-y-4">
          <StatusRow label="Driver ID" value={driver.id} />
          <StatusRow label="Name" value={driver.fullName} />
          <StatusRow label="Vehicle" value={driver.vehicleType} />
          <StatusRow label="Plate" value={driver.vehiclePlate} />
          <StatusRow label="Status" value={driver.status} />
          <StatusRow label="Availability" value={driver.availability} />

          <div className="mt-6 rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-4">
            <p className="font-black text-yellow-300">Next steps</p>
            <p className="mt-2 text-sm leading-6 text-yellow-100/90">
              Complete your compliance documents in the CRUUZ Driver App or
              with CRUUZ Operations. After approval, top up at least GHS 20
              before going online.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 py-3 text-sm last:border-b-0">
      <span className="text-white/45">{label}</span>
      <span className="font-bold text-white">{value || "—"}</span>
    </div>
  );
}