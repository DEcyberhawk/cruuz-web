import Link from "next/link";
import {
  BadgeCheck,
  CreditCard,
  Headphones,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

const safetyItems = [
  {
    icon: BadgeCheck,
    title: "Verified Drivers",
    text: "Driver identity, licence and required documents are reviewed before activation.",
  },
  {
    icon: MapPinned,
    title: "Live Trip Tracking",
    text: "Trips are designed to remain visible throughout the journey for greater transparency and support.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    text: "Payments are handled through protected CRUUZ payment workflows with clear transaction records.",
  },
  {
    icon: Headphones,
    title: "Safety & Support",
    text: "Riders and drivers can report incidents and contact CRUUZ support when assistance is needed.",
  },
];

export default function RideSafety() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.035] to-violet-500/[0.06] shadow-2xl shadow-black/10">
        <div className="grid gap-12 p-8 md:p-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2">
              <ShieldCheck className="h-4 w-4 text-violet-300" />
              <span className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">
                Safety First
              </span>
            </div>

            <h2 className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
              Built for every journey.
              <span className="block bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                Designed for trust.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/65 md:text-lg">
              From driver verification to secure payments and live trip
              visibility, CRUUZ is designed to help protect riders, drivers
              and every journey across the platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/safety"
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 font-black text-white shadow-lg shadow-violet-950/25 transition hover:scale-[1.02]"
              >
                Explore CRUUZ Safety
              </Link>

              <Link
                href="/contact?type=safety"
                className="rounded-2xl border border-white/15 bg-white/[0.05] px-6 py-3 font-black text-white transition hover:bg-white/[0.09]"
              >
                Contact Safety Support
              </Link>
            </div>
          </div>

          {/* Right cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {safetyItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-[1.5rem] border border-white/10 bg-[#111831]/80 p-5 transition hover:-translate-y-1 hover:border-violet-400/25 hover:bg-[#151d3b]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300 transition group-hover:bg-violet-500/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/55">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/10 px-8 py-5 md:px-12">
          <p className="text-sm leading-6 text-white/45">
  Safety features, support options and service availability may vary
  by operating market and ride type.
</p>
        </div>
      </div>
    </section>
  );
}