"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import { Loader2 } from "lucide-react";

import {
  createBusinessCostCentre,
  getBusinessErrorMessage,
} from "@/lib/business/api";
import type {
  BusinessDepartment,
} from "@/lib/business/types";
import { BusinessManagementDialog } from "../BusinessManagementDialog";

type BusinessCostCentreFormProps = {
  open: boolean;
  departments: BusinessDepartment[];
  onClose: () => void;
  onCreated: () => void | Promise<void>;
};

export function BusinessCostCentreForm({
  open,
  departments,
  onClose,
  onCreated,
}: BusinessCostCentreFormProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [currency, setCurrency] = useState("GHS");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setName("");
      setCode("");
      setDepartmentId("");
      setMonthlyBudget("");
      setCurrency("GHS");
      setError(null);
    }
  }, [open]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedCode = code.trim();
    const normalizedCurrency =
      currency.trim().toUpperCase();

    if (!normalizedName) {
      setError("Cost centre name is required.");
      return;
    }

    if (!normalizedCode) {
      setError("Cost centre code is required.");
      return;
    }

    if (!/^[A-Z]{3}$/.test(normalizedCurrency)) {
      setError(
        "Currency must be a valid three-letter code, such as GHS, EUR, or USD."
      );
      return;
    }

    const parsedBudget =
      monthlyBudget.trim() === ""
        ? undefined
        : Number(monthlyBudget);

    if (
      parsedBudget !== undefined &&
      (!Number.isFinite(parsedBudget) ||
        parsedBudget < 0)
    ) {
      setError(
        "Monthly budget must be zero or a positive amount."
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createBusinessCostCentre({
        name: normalizedName,
        code: normalizedCode,
        departmentId: departmentId || undefined,
        monthlyBudget: parsedBudget,
        currency: normalizedCurrency,
      });

      await onCreated();

      setName("");
      setCode("");
      setDepartmentId("");
      setMonthlyBudget("");
      setCurrency("GHS");
      onClose();
    } catch (failure) {
      setError(getBusinessErrorMessage(failure));
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/15 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <BusinessManagementDialog
      open={open}
      title="Add cost centre"
      description="Create a financial allocation for company travel and optionally connect it to a department."
      busy={submitting}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              Cost centre name
            </span>

            <input
              type="text"
              required
              maxLength={150}
              autoFocus
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              disabled={submitting}
              placeholder="For example: Executive Travel"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              Cost centre code
            </span>

            <input
              type="text"
              required
              maxLength={100}
              value={code}
              onChange={(event) =>
                setCode(event.target.value)
              }
              disabled={submitting}
              placeholder="For example: EXEC-TRAVEL"
              className={inputClass}
            />
          </label>
        </div>

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
              No department assignment
            </option>

            {departments
              .filter(
                (department) =>
                  String(
                    department.status
                  ).toUpperCase() === "ACTIVE"
              )
              .map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                  className="bg-slate-950"
                >
                  {department.name}
                  {department.code
                    ? ` (${department.code})`
                    : ""}
                </option>
              ))}
          </select>
        </label>

        <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              Monthly budget
            </span>

            <input
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={monthlyBudget}
              onChange={(event) =>
                setMonthlyBudget(event.target.value)
              }
              disabled={submitting}
              placeholder="Optional"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">
              Currency
            </span>

            <input
              type="text"
              required
              minLength={3}
              maxLength={3}
              value={currency}
              onChange={(event) =>
                setCurrency(
                  event.target.value.toUpperCase()
                )
              }
              disabled={submitting}
              placeholder="GHS"
              className={inputClass}
            />
          </label>
        </div>

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
                Creating...
              </>
            ) : (
              "Create cost centre"
            )}
          </button>
        </div>
      </form>
    </BusinessManagementDialog>
  );
}