"use client";

import {
  FormEvent,
  useEffect,
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

  useEffect(() => {
    if (!open) {
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
    }
  }, [open]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

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
      await createBusinessInvitation({
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

      await onCreated();
      onClose();
    } catch (failure) {
      setError(getBusinessErrorMessage(failure));
    } finally {
      setSubmitting(false);
    }
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
      "ACTIVE"
  );

  return (
    <BusinessManagementDialog
      open={open}
      title="Invite employee"
      description="Invite an employee and configure their company travel access."
      busy={submitting}
      onClose={onClose}
    >
      <form
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
                setDepartmentId(event.target.value)
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
            Grant only the access required for this employee's responsibilities.
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
            onClick={onClose}
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
                Sending...
              </>
            ) : (
              "Send invitation"
            )}
          </button>
        </div>
      </form>
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