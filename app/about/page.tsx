import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CRUUZ | CRUUZ",
  description:
    "Learn about CRUUZ Logistics Ltd, our mission, mobility platform, logistics services, business solutions, and commitment to safer, smarter transportation.",
};

const pillars = [
  {
    title: "Mobility",
    description:
      "CRUUZ connects riders with transportation services designed around convenience, safety, trip visibility, and a modern digital experience.",
  },
  {
    title: "Logistics",
    description:
      "Our platform is being designed to support delivery, movement of goods, business logistics, and other technology-enabled transportation services.",
  },
  {
    title: "Business Solutions",
    description:
      "CRUUZ supports businesses that need organised mobility, scheduled transportation, employee rides, departmental billing, cost centres, and related services.",
  },
  {
    title: "Technology",
    description:
      "We use software, data, mapping, identity verification, payment infrastructure, and operational systems to make transportation simpler and more accountable.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <section className="px-6 pb-16 pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">
            About CRUUZ
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Smarter mobility and logistics, built for Africa.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            CRUUZ Logistics Ltd is a technology-powered mobility and logistics
            company building digital transportation services for riders,
            drivers, businesses, delivery partners, and communities.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-8"
            >
              <h2 className="text-2xl font-black">{pillar.title}</h2>

              <p className="mt-4 leading-7 text-white/60">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">
                Our Mission
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Make everyday movement safer, simpler, and more connected.
              </h2>

              <p className="mt-5 leading-8 text-white/60">
                Our mission is to use technology to improve how people and
                businesses move. CRUUZ is designed to bring together transport
                discovery, booking, driver and provider verification, payments,
                trip visibility, customer support, and operational tools in one
                connected platform.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">
                Our Vision
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Proudly Ghanaian. Built for Africa. Ready for the world.
              </h2>

              <p className="mt-5 leading-8 text-white/60">
                CRUUZ aims to become a trusted mobility and logistics
                infrastructure platform that can serve individuals,
                organisations, transportation providers, and communities across
                multiple markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">
              CRUUZ Logistics Ltd
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Contact our team
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-white/60">
              For general enquiries, customer support, partnerships, business
              services, or platform-related questions, contact CRUUZ through
              our official channels.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <a
                href="mailto:info@cruuz.org"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.07]"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  General Enquiries
                </p>
                <p className="mt-2 font-bold">info@cruuz.org</p>
              </a>

              <a
                href="mailto:support@cruuz.org"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.07]"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Customer Support
                </p>
                <p className="mt-2 font-bold">support@cruuz.org</p>
              </a>

              <a
                href="tel:+233551550335"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.07]"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  MTN Hotline
                </p>
                <p className="mt-2 font-bold">+233 55 155 0335</p>
              </a>

              <a
                href="tel:+233303983906"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.07]"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Telecel Hotline
                </p>
                <p className="mt-2 font-bold">+233 30 398 3906</p>
              </a>

              <a
                href="tel:+233271128889"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.07]"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  AirtelTigo Hotline
                </p>
                <p className="mt-2 font-bold">+233 27 112 8889</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}