import Image from "next/image";
import { ArrowRight, Car, Clock, CreditCard, Mail, ShieldCheck } from "lucide-react";

const features = [
  { icon: Car, title: "Smart Rides", text: "Reliable mobility made simple." },
  { icon: ShieldCheck, title: "Safe Trips", text: "Verified and trusted rides." },
  { icon: Clock, title: "Fast Pickup", text: "Quick booking and smooth pickup." },
  { icon: CreditCard, title: "Cash & Wallet", text: "Flexible payment options." },
];

const rides = [
  { name: "CRUUZ GO", text: "Affordable everyday rides.", image: "/assets/vehicles/cruuz-go-front.webp" },
  { name: "CRUUZ XL", text: "More space for groups and families.", image: "/assets/vehicles/cruuz-xl.webp" },
  { name: "Executive", text: "Premium rides for business and comfort.", image: "/assets/vehicles/cruuz-executive.webp" },
  { name: "Airport", text: "Reliable airport transfers.", image: "/assets/vehicles/cruuz-airport.webp" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#101936]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#" className="text-2xl font-black">CRUUZ</a>

          <div className="flex items-center gap-6 text-sm font-semibold text-white/75">
            <a href="#rides" className="hover:text-white">Ride</a>
            <a href="#download" className="hover:text-white">Download</a>
            <a href="mailto:info@cruuz.org" className="hover:text-white">Contact</a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen overflow-hidden px-6 pt-24">
        <Image
          src="/assets/hero/hero-background-v1.webp"
          alt="CRUUZ hero"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#101936]/95 via-[#101936]/62 to-[#101936]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101936] via-transparent to-[#101936]/35" />

        <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="z-20 max-w-2xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-violet-200">
              The future of urban mobility
            </p>

            <h1 className="text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Move{" "}
              <span className="block bg-gradient-to-r from-violet-200 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                Smarter.
              </span>
            </h1>

            <div className="relative mt-6 h-[88px] w-full max-w-[410px]">
              <Image
                src="/assets/badges/ghana-badge.webp"
                alt="Proudly Ghanaian"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-white/82">
              CRUUZ connects riders, drivers and businesses through safe,
              reliable and rewarding transport.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-black shadow-xl shadow-violet-700/25"
              >
                App Coming Soon <ArrowRight size={18} />
              </a>

              <a
                href="mailto:info@cruuz.org"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 font-black backdrop-blur hover:bg-white/15"
              >
                Contact CRUUZ <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="relative hidden min-h-[520px] lg:block">
            <div className="absolute bottom-0 right-0 h-[330px] w-[720px]">
              <div className="absolute inset-x-10 bottom-4 h-24 rounded-full bg-violet-500/25 blur-3xl" />
              <Image
                src="/assets/vehicles/cruuz-executive.webp"
                alt="CRUUZ Executive vehicle"
                fill
                priority
                className="object-contain object-bottom drop-shadow-[0_45px_100px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2ff] px-6 py-10 text-[#12172f]">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          {features.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-600 text-white">
                <item.icon size={22} />
              </div>
              <div>
                <h3 className="font-black">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="rides" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
            Ride Options
          </p>
          <h2 className="mt-3 text-4xl font-black">Choose your CRUUZ.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {rides.map((ride) => (
            <article
              key={ride.name}
              className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09]"
            >
              <div className="relative h-44">
                <Image src={ride.image} alt={ride.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-black">{ride.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{ride.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="download" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#1a2554] via-[#2b2f77] to-[#6d28d9] p-8 md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-200">
            Coming Soon
          </p>

          <h2 className="mt-3 text-4xl font-black">The CRUUZ App</h2>

          <p className="mt-4 max-w-2xl leading-8 text-white/78">
            Join the launch list and be among the first to experience CRUUZ on Android and iOS.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a href="mailto:info@cruuz.org" className="rounded-2xl bg-white px-7 py-4 font-black text-[#11172f]">
              Join Launch List
            </a>
            <a href="mailto:info@cruuz.org" className="rounded-2xl border border-white/25 bg-black/25 px-7 py-4 font-black text-white">
              App Store
            </a>
            <a href="mailto:info@cruuz.org" className="rounded-2xl border border-white/25 bg-black/25 px-7 py-4 font-black text-white">
              Google Play
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-white/55 md:flex-row">
          <p>© {new Date().getFullYear()} CRUUZ. Powered by Nexaro.</p>
          <p>info@cruuz.org · support@cruuz.org</p>
        </div>
      </footer>
    </main>
  );
}