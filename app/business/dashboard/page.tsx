"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

const API_URL = process.env.NEXT_PUBLIC_CRUUZ_API_URL;

type BusinessAccount = {
  id: string;
  legalName: string;
  tradingName?: string | null;
  status: string;
  verificationStatus: string;
  primaryEmail?: string | null;
  primaryPhone?: string | null;
  country?: string | null;
  city?: string | null;
};

type BusinessMembership = {
  id: string;
  businessAccountId: string;
  userId: string;
  role: string;
  status: string;
  canBookForOthers: boolean;
  canViewBilling: boolean;
  canManageMembers: boolean;
  canManagePolicies: boolean;
};

type BusinessContextResponse = {
  success?: boolean;
  message?: string;
  data?: {
    account?: BusinessAccount;
    membership?: BusinessMembership;
  };
};

function getStoredAccessToken() {
  if (typeof window === "undefined") return null;

  return (
    window.sessionStorage.getItem(
      "cruuz_business_access_token"
    ) ||
    window.localStorage.getItem(
      "cruuz_business_access_token"
    )
  );
}

function clearBusinessSession() {
  if (typeof window === "undefined") return;

  const keys = [
    "cruuz_business_access_token",
    "cruuz_business_account",
    "cruuz_business_membership",
  ];

  for (const key of keys) {
    window.sessionStorage.removeItem(key);
    window.localStorage.removeItem(key);
  }
}

export default function BusinessDashboardPage() {
  const router = useRouter();

  const [account, setAccount] =
    useState<BusinessAccount | null>(null);

  const [membership, setMembership] =
    useState<BusinessMembership | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadBusinessContext() {
      const accessToken = getStoredAccessToken();

      if (!accessToken) {
        router.replace("/business/login");
        return;
      }

      if (!API_URL) {
        setError(
          "CRUUZ Business API configuration is missing."
        );
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/business-accounts/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
          }
        );

        const data =
          (await response.json()) as BusinessContextResponse;

        if (!response.ok) {
          clearBusinessSession();

          setError(
            data?.message ||
              "Your CRUUZ Business session is no longer valid."
          );

          setLoading(false);
          return;
        }

        if (
          !data?.data?.account ||
          !data?.data?.membership
        ) {
          setError(
            "Your CRUUZ Business account information could not be loaded."
          );
          setLoading(false);
          return;
        }

        setAccount(data.data.account);
        setMembership(data.data.membership);
      } catch (requestError) {
        console.error(
          "CRUUZ Business dashboard failed to load:",
          requestError
        );

        setError(
          "CRUUZ Business could not connect to the account service."
        );
      } finally {
        setLoading(false);
      }
    }

    loadBusinessContext();
  }, [router]);

  function handleLogout() {
    clearBusinessSession();
    router.replace("/business/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#061326] text-white">
        <Navbar />

        <section className="mx-auto max-w-7xl px-6 pb-20 pt-32">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-sm font-bold text-slate-400">
              Loading CRUUZ Business...
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (error || !account || !membership) {
    return (
      <main className="min-h-screen bg-[#061326] text-white">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 pb-20 pt-32">
          <div className="rounded-[28px] border border-red-400/20 bg-red-400/10 p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-300">
              Business Portal
            </p>

            <h1 className="mt-3 text-3xl font-black">
              We could not load your account
            </h1>

            <p className="mt-4 leading-7 text-red-100/80">
              {error}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  router.replace("/business/login")
                }
                className="rounded-xl bg-white px-5 py-3 font-extrabold text-[#061326]"
              >
                Back to login
              </button>

              <Link
                href="/business"
                className="rounded-xl border border-white/15 px-5 py-3 font-extrabold text-white"
              >
                Business home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const isPending =
    account.status === "PENDING" ||
    account.verificationStatus === "PENDING";

  const isActive =
    account.status === "ACTIVE" &&
    account.verificationStatus === "VERIFIED";

  return (
    <main className="min-h-screen bg-[#061326] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-violet-400">
              CRUUZ Business Portal
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              {account.tradingName ||
                account.legalName}
            </h1>

            <p className="mt-3 text-slate-400">
              Business Account ID: {account.id}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="self-start rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-extrabold transition hover:bg-white/[0.08]"
          >
            Sign out
          </button>
        </div>

        {isPending && (
          <section className="mt-8 rounded-[28px] border border-amber-400/20 bg-amber-400/10 p-7 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">
              Verification in progress
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Your CRUUZ Business account is awaiting approval.
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-amber-100/75">
              Your company registration has been received.
              CRUUZ staff will review the business details
              through the Employee Portal before full Business
              Portal access is enabled.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatusCard
                label="Account status"
                value={account.status}
              />

              <StatusCard
                label="Verification"
                value={account.verificationStatus}
              />

              <StatusCard
                label="Your role"
                value={membership.role}
              />

              <StatusCard
                label="Membership"
                value={membership.status}
              />
            </div>
          </section>
        )}

        {isActive && (
          <section className="mt-8 rounded-[28px] border border-emerald-400/20 bg-emerald-400/10 p-7 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              Business account active
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Your company has full CRUUZ Business access.
            </h2>

            <p className="mt-4 text-emerald-100/75">
              Business modules can now be enabled for this
              account.
            </p>
          </section>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-400">
              Company details
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InfoRow
                label="Legal name"
                value={account.legalName}
              />

              <InfoRow
                label="Trading name"
                value={
                  account.tradingName || "Not provided"
                }
              />

              <InfoRow
                label="Business email"
                value={
                  account.primaryEmail ||
                  "Not provided"
                }
              />

              <InfoRow
                label="Business phone"
                value={
                  account.primaryPhone ||
                  "Not provided"
                }
              />

              <InfoRow
                label="Country"
                value={account.country || "Not provided"}
              />

              <InfoRow
                label="City"
                value={account.city || "Not provided"}
              />
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-400">
              Your permissions
            </p>

            <div className="mt-6 space-y-3">
              <PermissionRow
                label="Book rides for others"
                enabled={membership.canBookForOthers}
              />

              <PermissionRow
                label="View billing"
                enabled={membership.canViewBilling}
              />

              <PermissionRow
                label="Manage members"
                enabled={membership.canManageMembers}
              />

              <PermissionRow
                label="Manage travel policies"
                enabled={membership.canManagePolicies}
              />
            </div>
          </section>
        </div>

        <section className="mt-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-400">
                Business modules
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Company travel management
              </h2>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ModuleCard
              title="Employees"
              description="Manage authorised riders."
              locked={!isActive}
            />

            <ModuleCard
              title="Departments"
              description="Organise business travel."
              locked={!isActive}
            />

            <ModuleCard
              title="Cost Centres"
              description="Control travel allocation."
              locked={!isActive}
            />

            <ModuleCard
              title="Book a Ride"
              description="Create company journeys."
              locked={!isActive}
            />

            <ModuleCard
              title="Scheduled Rides"
              description="Plan future transport."
              locked={!isActive}
            />

            <ModuleCard
              title="Airport Transfers"
              description="Manage airport journeys."
              locked={!isActive}
            />

            <ModuleCard
              title="Billing & Invoices"
              description="View company billing."
              locked={!isActive}
            />

            <ModuleCard
              title="Ride Policies"
              description="Set company travel rules."
              locked={!isActive}
            />
          </div>
        </section>

        <div className="mt-10">
          <Link
            href="/business"
            className="text-sm font-bold text-slate-400 transition hover:text-white"
          >
            ← Back to Business
          </Link>
        </div>
      </section>
    </main>
  );
}

function StatusCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
        {label}
      </p>

      <p className="mt-2 font-black text-white">
        {value}
      </p>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 break-words font-bold text-slate-100">
        {value}
      </p>
    </div>
  );
}

function PermissionRow({
  label,
  enabled,
}: {
  label: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
      <span className="text-sm font-semibold text-slate-300">
        {label}
      </span>

      <span
        className={
          enabled
            ? "rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300"
            : "rounded-full bg-slate-400/10 px-3 py-1 text-xs font-black text-slate-400"
        }
      >
        {enabled ? "Allowed" : "Not allowed"}
      </span>
    </div>
  );
}

function ModuleCard({
  title,
  description,
  locked,
}: {
  title: string;
  description: string;
  locked: boolean;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-black text-white">
          {title}
        </h3>

        {locked && (
          <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-300">
            Locked
          </span>
        )}
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}