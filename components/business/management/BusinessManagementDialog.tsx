"use client";

import { X } from "lucide-react";
import {
  type ReactNode,
  useEffect,
} from "react";

type Props = {
  open: boolean;
  title: string;
  description: string;
  busy?: boolean;
  children: ReactNode;
  onClose: () => void;
};

export function BusinessManagementDialog({
  open,
  title,
  description,
  busy = false,
  children,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key === "Escape" &&
        !busy
      ) {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [busy, onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !busy
        ) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="business-dialog-title"
        aria-describedby="business-dialog-description"
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] border border-white/10 bg-[#0a1830] shadow-2xl sm:max-w-2xl sm:rounded-[28px]"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-white/10 bg-[#0a1830]/95 px-5 py-5 backdrop-blur sm:px-7">
          <div>
            <h2
              id="business-dialog-title"
              className="text-xl font-black text-white sm:text-2xl"
            >
              {title}
            </h2>

            <p
              id="business-dialog-description"
              className="mt-2 max-w-xl text-sm leading-6 text-slate-400"
            >
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="Close dialog"
            className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-400 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="px-5 py-6 sm:px-7">
          {children}
        </div>
      </section>
    </div>
  );
}