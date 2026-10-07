"use client";

import {
  FormEvent,
  useState,
} from "react";
import { Loader2 } from "lucide-react";

import {
  createBusinessInvitation,
  getBusinessErrorMessage,
} from "@/lib/business/api";
import type {
  BusinessCostCentre,
  BusinessDepartment,
  InvitationInput,
} from "@/lib/business/types";
import { invitationLink } from "@/lib/business/invitation";
import { BusinessManagementDialog } from "../BusinessManagementDialog";

type InvitationRole = InvitationInput["role"];

type BusinessInvitationFormProps = {
  open: boolean;
  departments: BusinessDepartment[];
  costCentres: BusinessCostCentre[];
  allowAdminRole: boolean;
  onClose: () => void;
  onCreated: () => void | Promise<void>;
};

const standardRoles: Array<{
  value: InvitationRole;
  label: string;
}> = [
  {
    value: "RIDER",
    label: "Rider",
  },
  {
    value: "BOOKER",
    label: "Booker",
  },
  {
    value: "MANAGER",
    label: "Manager",
  },
  {
    value: "FINANCE",
    label: "Finance",
  },
];

export function BusinessInvitationForm({
  open,
  departments,
  costCentres,
  allowAdminRole,
  onClose,
  onCreated,
}: BusinessInvitationFormProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] =
    useState<InvitationRole>("RIDER");
  const [departmentId, setDepartmentId] = useState("");
  const [defaultCostCentreId, setDefaultCostCentreId] =
    useState("");
  const [employeeReference, setEmployeeReference] =
    useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [expiresInDays, setExpiresInDays] = useState("7");
  const [canBookForOthers, setCanBookForOthers] =
    useState(false);
  const [canViewBilling, setCanViewBilling] =
    useState(false);
  const [canManageMembers, setCanManageMembers] =
    useState(false);
  const [canManagePolicies, setCanManagePolicies] =
    useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  function handleClose() {
    setCreated(false);
    setShareLink("");
    setCopyMessage("");
    setEmail("");
    setRole("RIDER");
    setDepartmentId("");
    setDefaultCostCentreId("");
    setEmployeeReference("");
    setJobTitle("");
    setExpiresInDays("7");
    setCanBookForOthers(false);
    setCanViewBilling(false);
    setCanManageMembers(false);
    setCanManagePolicies(false);
    setError(null);
    onClose();
    // Refresh only after the link has been copied and the dialog closed.
    // A parent loading state can otherwise unmount this one-time secret.
    if (created) void Promise.resolve().then(onCreated).catch(() => {});
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    if (submitting || created) return;

    const normalizedEmail =
      email.trim().toLowerCase();
    const parsedExpiry = Number(expiresInDays);

    if (!normalizedEmail) {
      setError("Employee email is required.");
      return;
    }

    if (
      !Number.isInteger(parsedExpiry) ||
      parsedExpiry < 1 ||
      parsedExpiry > 30
    ) {
      setError(
        "Invitation expiry must be between 1 and 30 whole days."
      );
      return;
    }

    if (role === "ADMIN" && !allowAdminRole) {
      setError(
        "Only the business account owner can invite an administrator."
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const result = await createBusinessInvitation({
        email: normalizedEmail,
        role,
        departmentId: departmentId || undefined,
        defaultCostCentreId:
          defaultCostCentreId || undefined,
        employeeReference:
          employeeReference.trim() || undefined,
        jobTitle: jobTitle.trim() || undefined,
        canBookForOthers,
        canViewBilling,
        canManageMembers,
        canManagePolicies,
        expiresInDays: parsedExpiry,
      });

      setCreated(true);
      if (result.token) {
        try { setShareLink(invitationLink(window.location.origin, result.token)); }
        catch { setError("Invitation created, but its link could not be prepared. Revoke this invitation before creating a replacement."); }
      } else {
        setError("Invitation created, but the server returned no link token. Revoke this invitation before creating a replacement.");
      }
    } catch (failure) {
      setError(getBusinessErrorMessage(failure));
    } finally {
      setSubmitting(false);
    }
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(shareLink); setCopyMessage("Link copied. Send it privately to the invited employee."); }
    catch { setCopyMessage("Automatic copy is unavailable. Select the link below and copy it manually."); }
  }

  const inputClass =
    "min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/15 disabled:cursor-not-allowed disabled:opacity-60";

  const activeDepartments = departments.filter(
    (department) =>
      String(department.status).toUpperCase() ===
      "ACTIVE"
  );

  const activeCostCentres = costCentres.filter(
    (costCentre) =>
      String(costCentre.status).toUpperCase() ===
      "ACTIVE" &&
      (!departmentId || !costCentre.departmentId || costCentre.departmentId === departmentId)
  );

  return (
    <BusinessManagementDialog
      open={open}
      title="Invite employee"
      description="Create an invitation link and configure company travel access. Send the link privately to the employee."
      busy={submitting}
      onClose={handleClose}
    >
      {created ? <div className="space-y-5">
        <p role="status" className="text-sm text-emerald-200">Invitation created for {email}. No invitation email was sent. Copy this link before closing; it cannot be recovered from the invitation list.</p>
        {shareLink ? <>
          <label className="block text-sm font-bold text-slate-200">Private invitation link
            <textarea aria-label="Private invitation link" readOnly value={shareLink} onFocus={event => event.target.select()} className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white" />
          </label>
          <button type="button" onClick={copyLink} className="rounded-xl bg-violet-600 px-5 py-3 font-bold text-white">Copy invitation link</button>
        </> : null}
        {copyMessage ? <p role="status" className="text-sm text-slate-300">{copyMessage}</p> : null}
        {error ? <p role="alert" className="text-sm text-amber-200">{error}</p> : null}
        <button type="button" onClick={handleClose} className="block rounded-xl border border-white/15 px-5 py-3 font-bold text-white">Done</button>
      </div> : <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              Employee email
            </span>

            <input
              type="email"
              required
              autoFocus
              autoComplete="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              disabled={submitting}
              placeholder="employee@company.com"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              Business role
            </span>

            <select
              value={role}
              onChange={(event) =>
                setRole(
                  event.target.value as InvitationRole
                )
              }
              disabled={submitting}
              className={inputClass}
            >
              {standardRoles.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-slate-950"
                >
                  {option.label}
                </option>
              ))}

              {allowAdminRole ? (
                <option
                  value="ADMIN"
                  className="bg-slate-950"
                >
                  Administrator
                </option>
              ) : null}
            </select>
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              Department
            </span>

            <select
              value={departmentId}
              onChange={(event) =>
                { setDepartmentId(event.target.value); setDefaultCostCentreId(""); }
              }
              disabled={submitting}
              className={inputClass}
            >
              <option value="" className="bg-slate-950">
                No department
              </option>

              {activeDepartments.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                  className="bg-slate-950"
                >
                  {department.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              Default cost centre
            </span>

            <select
              value={defaultCostCentreId}
              onChange={(event) =>
                setDefaultCostCentreId(
                  event.target.value
                )
              }
              disabled={submitting}
              className={inputClass}
            >
              <option value="" className="bg-slate-950">
                No default cost centre
              </option>

              {activeCostCentres.map((costCentre) => (
                <option
                  key={costCentre.id}
                  value={costCentre.id}
                  className="bg-slate-950"
                >
                  {costCentre.name} ({costCentre.code})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              Job title
            </span>

            <input
              type="text"
              value={jobTitle}
              onChange={(event) =>
                setJobTitle(event.target.value)
              }
              disabled={submitting}
              placeholder="Optional"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              Employee reference
            </span>

            <input
              type="text"
              value={employeeReference}
              onChange={(event) =>
                setEmployeeReference(
                  event.target.value
                )
              }
              disabled={submitting}
              placeholder="Optional internal ID"
              className={inputClass}
            />
          </label>
        </div>

        <label className="block max-w-xs">
          <span className="mb-2 block text-sm font-bold text-slate-200">
            Invitation expires after
          </span>

          <div className="flex items-center gap-3">
            <input
              type="number"
              required
              min="1"
              max="30"
              step="1"
              value={expiresInDays}
              onChange={(event) =>
                setExpiresInDays(event.target.value)
              }
              disabled={submitting}
              className={inputClass}
            />

            <span className="shrink-0 text-sm font-semibold text-slate-400">
              days
            </span>
          </div>
        </label>

        <fieldset>
          <legend className="text-sm font-black text-white">
            Access permissions
          </legend>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Grant only the access required for this employee&apos;s responsibilities.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <PermissionToggle
              label="Book for others"
              checked={canBookForOthers}
              disabled={submitting}
              onChange={setCanBookForOthers}
            />

            <PermissionToggle
              label="View billing"
              checked={canViewBilling}
              disabled={submitting}
              onChange={setCanViewBilling}
            />

            <PermissionToggle
              label="Manage members"
              checked={canManageMembers}
              disabled={submitting}
              onChange={setCanManageMembers}
            />

            <PermissionToggle
              label="Manage policies"
              checked={canManagePolicies}
              disabled={submitting}
              onChange={setCanManagePolicies}
            />
          </div>
        </fieldset>

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-200"
          >
            {error}
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="min-h-12 rounded-xl border border-white/10 px-5 font-bold text-slate-300 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 font-extrabold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create invitation link"
            )}
          </button>
        </div>
      </form>}
    </BusinessManagementDialog>
  );
}

function PermissionToggle({
  label,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="h-4 w-4 rounded border-white/20 accent-violet-500"
      />

      <span className="text-sm font-bold text-slate-300">
        {label}
      </span>
    </label>
  );
}