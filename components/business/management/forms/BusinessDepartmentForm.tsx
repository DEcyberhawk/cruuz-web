"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  createBusinessDepartment,
  getBusinessErrorMessage,
} from "@/lib/business/api";
import { BusinessManagementDialog } from "../BusinessManagementDialog";

type BusinessDepartmentFormProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void | Promise<void>;
};

export function BusinessDepartmentForm({
  open,
  onClose,
  onCreated,
}: BusinessDepartmentFormProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleClose() {
    setName("");
    setCode("");
    setError(null);
    onClose();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedCode = code.trim();

    if (!normalizedName) {
      setError("Department name is required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createBusinessDepartment({
        name: normalizedName,
        code: normalizedCode || undefined,
      });

      await onCreated();

      setName("");
      setCode("");
      handleClose();
    } catch (failure) {
      setError(
        getBusinessErrorMessage(failure)
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BusinessManagementDialog
      open={open}
      title="Add department"
      description="Create a department for organising employees, travel access, and company reporting."
      busy={submitting}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-200">
            Department name
          </span>

          <input
            type="text"
            required
            maxLength={150}
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={submitting}
            placeholder="For example: Operations"
            className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/15 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-200">
            Department code
          </span>

          <input
            type="text"
            maxLength={100}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            disabled={submitting}
            placeholder="Optional, for example: OPS"
            className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/15 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <span className="mt-2 block text-xs text-slate-500">
            Use a short internal code that your finance or operations team recognises.
          </span>
        </label>

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
              "Create department"
            )}
          </button>
        </div>
      </form>
    </BusinessManagementDialog>
  );
}