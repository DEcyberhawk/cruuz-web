import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const businessFeatures = [
  {
    icon: "01",
    title: "Employee Transport",
    description: "Add employees and manage authorised riders.",
  },
  {
    icon: "02",
    title: "Scheduled Rides",
    description: "Plan meetings, shifts and recurring journeys.",
  },
  {
    icon: "03",
    title: "Airport Transfers",
    description: "Arrange pickups and drop-offs for staff and guests.",
  },
  {
    icon: "04",
    title: "Departments",
    description: "Organise transportation by department or business unit.",
  },
  {
    icon: "05",
    title: "Cost Centres",
    description: "Allocate and track eligible company travel costs.",
  },
  {
    icon: "06",
    title: "Company Billing",
    description: "Manage company travel activity and monthly invoicing.",
  },
  {
    icon: "07",
    title: "Business Records",
    description: "Review transportation records and reconciliation.",
  },
  {
    icon: "08",
    title: "Ride Policies",
    description: "Control how authorised employees use company travel.",
  },
];

const benefits = [
  { number: "01", label: "On-time" },
  { number: "02", label: "Safe" },
  { number: "03", label: "Cost control" },
  { number: "04", label: "For teams" },
];

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-[#061326] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(98,99,255,0.16),transparent_34%),radial-gradient(circle_at_75%_20%,rgba(37,126,255,0.12),transparent_32%)]" />

        <div className="relative mx-auto grid max-w-[1600px] lg:min-h-[520px] lg:grid-cols-[46%_54%]">
          {/* LEFT */}
          <div className="relative z-20 flex items-center px-6 py-14 sm:px-10 lg:px-14 xl:px-20">
            <div className="max-w-[660px]">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-violet-400">
                CRUUZ Business
              </p>

              <h1 className="text-[46px] font-black leading-[0.95] tracking-[-0.04em] sm:text-[58px] xl:text-[68px]">
                Company travel,
                <span className="mt-2 block bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  made simple.
                </span>
              </h1>

              <p className="mt-6 max-w-[610px] text-lg leading-8 text-slate-300">
                One platform to manage employee rides, airport transfers,
                departments, cost centres and billing — all in one place.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/business/register"
                  className="inline-flex min-h-[58px] items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-8 font-extrabold text-white shadow-[0_14px_40px_rgba(168,85,247,0.30)] transition hover:-translate-y-0.5"
                >
                  Register Your Business
                  <span className="ml-3 text-xl">→</span>
                </Link>

                <Link
                  href="/business/login"
                  className="inline-flex min-h-[58px] items-center justify-center rounded-2xl border border-slate-600 bg-[#0b1b34]/80 px-8 font-extrabold text-white transition hover:border-violet-400 hover:bg-[#11233e]"
                >
                  Business Login
                  <span className="ml-3 text-xl">→</span>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {["Save time", "Control costs", "Keep your team moving"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-200"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-[12px] font-black text-[#04111f]">
                        ✓
                      </span>
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* RIGHT HERO IMAGE */}
          <div className="relative min-h-[430px] overflow-hidden lg:min-h-full">
            <Image
              src="/assets/business/business-hero.png"
              alt="CRUUZ Business executive transportation at an airport"
              fill
              priority
              className="object-cover object-[62%_center]"
              sizes="(max-width: 1024px) 100vw, 54vw"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#061326] via-[#061326]/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="mx-auto max-w-[1500px] px-6 py-10 sm:px-10 lg:px-14">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {businessFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group flex min-h-[132px] items-start gap-4 rounded-2xl border border-[#27405f] bg-[#0b1c34] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-[#102440]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-sm font-black tracking-wider text-white shadow-lg">
                {feature.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-extrabold">{feature.title}</h2>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg transition group-hover:border-violet-400/40 group-hover:bg-violet-500/10">
                    →
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BUSINESS STRIP */}
      <section className="mx-auto max-w-[1500px] px-6 pb-14 sm:px-10 lg:px-14">
        <div className="overflow-hidden rounded-[24px] border border-violet-400/35 bg-[linear-gradient(115deg,#09192f_0%,#0b2950_48%,#36115e_100%)]">
          <div className="grid items-center gap-7 px-7 py-7 lg:grid-cols-[1.45fr_1fr_auto] lg:px-9">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">
                Business Transportation
              </p>

              <h2 className="mt-2 text-[22px] font-black leading-tight md:text-[27px]">
                From daily travel to{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  executive airport transfers.
                </span>
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                CRUUZ Business keeps your team moving efficiently, safely and
                with greater visibility over company transport.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {benefits.map((item) => (
                <div
                  key={item.label}
                  className="border-l border-white/10 px-3 text-center"
                >
                  <div className="text-sm font-black text-violet-300">
                    {item.number}
                  </div>

                  <div className="mt-2 text-xs font-semibold text-slate-300">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/business/register"
              className="inline-flex min-h-[56px] items-center justify-center whitespace-nowrap rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-8 font-extrabold text-white shadow-xl transition hover:-translate-y-0.5"
            >
              Get Started
              <span className="ml-3">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/*
        Footer intentionally NOT rendered here.
        It should only come from the global layout.
      */}
    </main>
  );
}