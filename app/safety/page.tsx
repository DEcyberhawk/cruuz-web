import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety | CRUUZ",
  description:
    "Learn how CRUUZ promotes safer rides, verified drivers, secure payments, live trip visibility, and customer support.",
};

const safetyFeatures = [
  {
    title: "Verified Drivers",
    description:
      "Drivers and service providers may be required to submit identity, licence, vehicle, and other verification information before providing services through CRUUZ.",
  },
  {
    title: "Trip Visibility",
    description:
      "CRUUZ is designed to provide trip information, driver details, pickup and destination information, and live trip visibility where supported.",
  },
  {
    title: "Secure Payments",
    description:
      "Payments may be processed through authorised payment providers using secure transaction infrastructure.",
  },
  {
    title: "Customer Support",
    description:
      "Customers can contact CRUUZ support to report safety concerns, service issues, complaints, disputes, or suspicious activity.",
  },
  {
    title: "Vehicle Information",
    description:
      "Drivers may be required to provide valid vehicle registration, insurance, roadworthiness, and other applicable operating documents.",
  },
  {
    title: "Fraud Prevention",
    description:
      "CRUUZ may use account, transaction, device, identity, and operational information to detect suspicious activity and protect users.",
  },
];

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <section className="px-6 pb-16 pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">
            CRUUZ Safety
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Your safety matters at every stage of the journey.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            CRUUZ is building safety, verification, secure payments, trip
            visibility, and responsive support into the way riders, drivers,
            businesses, and service providers use the platform.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {safetyFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
            >
              <h2 className="text-xl font-black">{feature.title}</h2>

              <p className="mt-4 leading-7 text-white/60">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-2xl font-black">Report a safety concern</h2>

          <p className="mt-4 max-w-3xl leading-7 text-white/60">
            If you experience an issue during or after a CRUUZ service, contact
            our support team. For situations involving immediate danger, contact
            the appropriate emergency authorities first.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="tel:+233551550335"
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.08]"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                MTN Hotline
              </p>
              <p className="mt-2 font-bold">+233 55 155 0335</p>
            </a>

            <a
              href="tel:+233303983906"
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.08]"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                Telecel Hotline
              </p>
              <p className="mt-2 font-bold">+233 30 398 3906</p>
            </a>

            <a
              href="tel:+233271128889"
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.08]"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                AirtelTigo Hotline
              </p>
              <p className="mt-2 font-bold">+233 27 112 8889</p>
            </a>
          </div>

          <a
            href="mailto:support@cruuz.org"
            className="mt-6 inline-block font-bold text-violet-300 hover:text-violet-200"
          >
            support@cruuz.org
          </a>
        </div>
      </section>
    </main>
  );
}