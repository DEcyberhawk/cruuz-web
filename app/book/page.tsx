import type { Metadata } from "next";
import WebBookingForm from "@/components/booking/WebBookingForm";

export const metadata: Metadata = {
  title: "Book a Ride | CRUUZ",
  description:
    "Book a CRUUZ ride now or schedule your journey in advance.",
};

export default function BookRidePage() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <section className="border-b border-white/10 px-6 pb-10 pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
            CRUUZ Booking
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Where are you going?
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
            Request a ride now or schedule your journey in advance.
          </p>
        </div>
      </section>

      <WebBookingForm />
    </main>
  );
}