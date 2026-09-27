"use client";

import {
  Building2,
  CarFront,
  CircleDollarSign,
  LayoutDashboard,
  Loader2,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import {
  clearBusinessSession,
} from "@/lib/business/api";
import {
  useBusinessWorkspace,
} from "@/lib/business/useBusinessWorkspace";
import {
  canManageBusinessMembers,
  isBusinessAccountOperational,
  type BusinessSection,
} from "@/lib/business/types";

const navigation: Array<{
  id: BusinessSection;
  label: string;
  icon: LucideIcon;
  available: boolean;
}> = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    available: true,
  },
  {
    id: "members",
    label: "Employees",
    icon: Users,
    available: true,
  },
  {
    id: "departments",
    label: "Departments",
    icon: Building2,
    available: true,
  },
  {
    id: "cost-centres",
    label: "Cost centres",
    icon: WalletCards,
    available: true,
  },
  {
    id: "travel",
    label: "Company travel",
    icon: CarFront,
    available: false,
  },
  {
    id: "billing",
    label: "Billing",
    icon: CircleDollarSign,
    available: false,
  },
  {
    id: "policies",
    label: "Ride policies",
    icon: ShieldCheck,
    available: false,
  },
];

export function BusinessDashboardWorkspace() {
  const router = useRouter();
  const workspace = useBusinessWorkspace();

  const [section, setSection] =
    useState<BusinessSection>("overview");

  function signOut() {
    clearBusinessSession();
    router.replace("/business/login");
  }

  if (workspace.loading) {
    return (
      <PortalFrame>
        <div className="flex min-h-[55vh] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-400" />
            <p className="mt-4 text-sm font-bold text-slate-400">
              Loading CRUUZ Business...
            </p>
          </div>
        </div>
      </PortalFrame>
    );
  }

  if (
    workspace.authenticationRequired ||
    workspace.error ||
    !workspace.context
  ) {
    return (
      <PortalFrame>
        <section className="mx-auto max-w-2xl rounded-[28px] border border-red-400/20 bg-red-400/10 p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
            Business portal
          </p>

          <h1 className="mt-3 text-3xl font-black">
            We could not load your workspace
          </h1>

          <p className="mt-4 leading-7 text-red-100/80">
            {workspace.error ||
              "Your session is no longer available."}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                router.replace("/business/login")
              }
              className="rounded-xl bg-white px-5 py-3 font-extrabold text-[#061326]"
            >
              Sign in again
            </button>

            <button
              type="button"
              onClick={() => void workspace.reload()}
              className="rounded-xl border border-white/15 px-5 py-3 font-extrabold"
            >
              Retry
            </button>
          </div>
        </section>
      </PortalFrame>
    );
  }

  const { account, membership } =
    workspace.context;

  const operational =
    isBusinessAccountOperational(account);

  const canManage =
    canManageBusinessMembers(membership);

  return (
    <PortalFrame>
      <header className="flex flex-col gap-5 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-400">
            CRUUZ Business Portal
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {account.tradingName ||
              account.legalName}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <StatusBadge value={account.status} />

            <StatusBadge
              value={account.verificationStatus}
            />

            <span className="rounded-full border border-white/10 px-3 py-1 text-slate-400">
              {membership.role}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void workspace.reload()}
            disabled={workspace.refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-extrabold transition hover:bg-white/[0.08] disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                workspace.refreshing
                  ? "animate-spin"
                  : ""
              }`}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-extrabold text-red-200 transition hover:bg-red-400/15"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </header>

      {!operational && (
        <section className="mt-7 rounded-[24px] border border-amber-400/20 bg-amber-400/10 p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
            Verification in progress
          </p>

          <h2 className="mt-2 text-xl font-black">
            Your company is awaiting CRUUZ approval.
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-amber-100/75">
            Company management tools will activate
            automatically after the account is verified
            and marked active.
          </p>
        </section>
      )}

      {workspace.warning && (
        <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm leading-6 text-amber-200">
          {workspace.warning}
        </div>
      )}

      <div className="mt-7 grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside>
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:flex-col lg:overflow-visible">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = item.id === section;
              const disabled =
                !operational || !item.available;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => setSection(item.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold transition lg:w-full ${
                    active
                      ? "border-violet-400/30 bg-violet-400/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.07] hover:text-white"
                  } disabled:cursor-not-allowed disabled:opacity-45`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>

                  {!item.available && (
                    <span className="ml-auto text-[9px] font-black uppercase tracking-wider">
                      Soon
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0">
          {section === "overview" && (
            <Overview
              accountName={
                account.tradingName ||
                account.legalName
              }
              members={workspace.members.length}
              departments={
                workspace.departments.length
              }
              costCentres={
                workspace.costCentres.length
              }
              invitations={
                workspace.invitations.filter(
                  (item) =>
                    item.status === "PENDING"
                ).length
              }
              canManage={canManage}
            />
          )}

          {section === "members" && (
            <MembersPanel
              members={workspace.members}
              invitations={workspace.invitations}
              canManage={canManage}
            />
          )}

          {section === "departments" && (
            <CollectionPanel
              eyebrow="Company structure"
              title="Departments"
              description="Organise employees and travel activity by business department."
              emptyText="No departments have been created."
              items={workspace.departments.map(
                (department) => ({
                  id: department.id,
                  title: department.name,
                  detail:
                    department.code ||
                    "No department code",
                  status: department.status,
                })
              )}
              canManage={canManage}
              actionLabel="Add department"
            />
          )}

          {section === "cost-centres" && (
            <CollectionPanel
              eyebrow="Financial controls"
              title="Cost centres"
              description="Allocate company travel activity and monthly budgets."
              emptyText="No cost centres have been created."
              items={workspace.costCentres.map(
                (costCentre) => ({
                  id: costCentre.id,
                  title: costCentre.name,
                  detail: `${costCentre.code} · ${
                    costCentre.currency || "GHS"
                  } ${
                    costCentre.monthlyBudget ??
                    "No budget"
                  }`,
                  status: costCentre.status,
                })
              )}
              canManage={canManage}
              actionLabel="Add cost centre"
            />
          )}
        </section>
      </div>
    </PortalFrame>
  );
}

function PortalFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#061326] text-white">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.12),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(14,165,233,0.08),transparent_28%)]" />

      <section className="relative mx-auto max-w-[1440px] px-4 pb-20 pt-28 sm:px-6 lg:px-10 lg:pt-32">
        {children}
      </section>
    </main>
  );
}

function Overview({
  accountName,
  members,
  departments,
  costCentres,
  invitations,
  canManage,
}: {
  accountName: string;
  members: number;
  departments: number;
  costCentres: number;
  invitations: number;
  canManage: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-400">
        Workspace overview
      </p>

      <h2 className="mt-2 text-2xl font-black">
        {accountName}
      </h2>

      <p className="mt-3 max-w-2xl leading-7 text-slate-400">
        Monitor your company structure and manage the
        people authorised to use CRUUZ Business.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Employees" value={members} />
        <Metric
          label="Departments"
          value={departments}
        />
        <Metric
          label="Cost centres"
          value={costCentres}
        />
        <Metric
          label="Pending invitations"
          value={invitations}
        />
      </div>

      <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.035] p-6">
        <h3 className="font-black">
          Access and permissions
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {canManage
            ? "You can manage company members, invitations, departments and cost centres."
            : "You have read-only access. An account owner or administrator controls company settings."}
        </p>
      </div>
    </div>
  );
}

function MembersPanel({
  members,
  invitations,
  canManage,
}: {
  members: Array<{
    id: string;
    userId: string;
    role: string;
    jobTitle?: string | null;
    status: string;
  }>;
  invitations: Array<{
    id: string;
    email: string;
    role: string;
    status: string;
  }>;
  canManage: boolean;
}) {
  return (
    <div className="space-y-7">
      <CollectionPanel
        eyebrow="People"
        title="Employees"
        description="People currently connected to this CRUUZ Business account."
        emptyText="No employees were returned."
        items={members.map((member) => ({
          id: member.id,
          title:
            member.jobTitle ||
            member.userId,
          detail: `${member.role} · ${member.userId}`,
          status: member.status,
        }))}
        canManage={canManage}
        actionLabel="Invite employee"
      />

      <CollectionPanel
        eyebrow="Access"
        title="Invitations"
        description="Track pending and completed business invitations."
        emptyText="No invitations were returned."
        items={invitations.map((invitation) => ({
          id: invitation.id,
          title: invitation.email,
          detail: invitation.role,
          status: invitation.status,
        }))}
        canManage={false}
      />
    </div>
  );
}

function CollectionPanel({
  eyebrow,
  title,
  description,
  emptyText,
  items,
  canManage,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  emptyText: string;
  items: Array<{
    id: string;
    title: string;
    detail: string;
    status: string;
  }>;
  canManage: boolean;
  actionLabel?: string;
}) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-400">
            {eyebrow}
          </p>

          <h2 className="mt-2 text-2xl font-black">
            {title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {description}
          </p>
        </div>

        {canManage && actionLabel && (
          <button
            type="button"
            className="self-start rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-extrabold shadow-[0_12px_30px_rgba(139,92,246,0.2)]"
          >
            {actionLabel}
          </button>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035]">
        {items.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm font-semibold text-slate-500">
            {emptyText}
          </p>
        ) : (
          <div className="divide-y divide-white/10">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-black text-slate-100">
                    {item.title}
                  </h3>

                  <p className="mt-1 break-all text-sm text-slate-500">
                    {item.detail}
                  </p>
                </div>

                <StatusBadge value={item.status} />
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-black">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  value,
}: {
  value: string;
}) {
  const normalized =
    String(value || "UNKNOWN").toUpperCase();

  const positive = [
    "ACTIVE",
    "VERIFIED",
    "ACCEPTED",
  ].includes(normalized);

  const warning = [
    "PENDING",
    "INVITED",
  ].includes(normalized);

  return (
    <span
      className={`w-fit rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
        positive
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
          : warning
            ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
            : "border-white/10 bg-white/[0.05] text-slate-400"
      }`}
    >
      {normalized}
    </span>
  );
}