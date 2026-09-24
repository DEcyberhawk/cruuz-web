import { Suspense } from "react";

import PaymentCallbackClient from "./PaymentCallbackClient";

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-6 py-28 text-white/65">
          Loading payment confirmation…
        </main>
      }
    >
      <PaymentCallbackClient />
    </Suspense>
  );
}
