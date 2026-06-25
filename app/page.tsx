import Image from "next/image";
import { ArrowRight, Car, Mail, ShieldCheck, Smartphone } from "lucide-react";

const rideTypes = [
  {
    name: "CRUUZ GO",
    text: "Affordable everyday rides.",
    image: "/assets/vehicles/cruuz-go-front.webp",
  },
  {
    name: "CRUUZ XL",
    text: "More space for groups and families.",
    image: "/assets/vehicles/cruuz-xl.webp",
  },
  {
    name: "Executive",
    text: "Premium rides for business and comfort.",
    image: "/assets/vehicles/cruuz-go-night.webp",
  },
  {
    name: "Airport",
    text: "Reliable airport transfers.",
    image: "/assets/vehicles/cruuz-airport.webp",
  },
];

const features = [
  {
    title: "Smart",
    text: "Intelligent dispatch built for modern mobility.",
  },
  {
    title: "Safe",
    text: "Verified drivers, live tracking, and support.",
  },
  {
    title: "Fast",
    text: "Simple booking and reliable pickup experience.",
  },
  {
    title: "Rewarding",
    text: "Better value for riders and earning tools for drivers.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05050d] text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05050d]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-black">
              C
            </div>
            <div>
              <p className="text-xl font-black">CRUUZ</p>
              <p className="text-xs text-white/45">Smart. Secure. Rewarding.</p>
            </div>
          </a>

          <div className="hidden items-center gap-8 text-sm font-semibold text-white/70 md:flex">
            <a href="#ride" className="hover:text-white">Ride</a>
            <a href="#drive" className="hover:text-white">Drive</a>
            <a href="#download" className="hover:text-white">Download</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen overflow-hidden px-6 pt-28">
        <Image
          src="/assets/hero/cruuz-signature-hero.webp"
          alt="CRUUZ hero"
          fill
          priority
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05050d] via-[#05050d]/80 to-[#05050d]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050d] via-transparent to-[#05050d]/80" />

        <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70 backdrop-blur">
              The future of urban mobility
            </div>

            <h1 className="text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Move{" "}
              <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
                Smarter.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
              CRUUZ is a smart mobility platform connecting riders, drivers and
              businesses through safe, reliable and rewarding transport.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-black shadow-xl shadow-violet-700/25"
              >
                Download App <ArrowRight size={18} />
              </a>

              <a
                href="mailto:info@cruuz.org"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 font-black backdrop-blur hover:bg-white/15"
              >
                Contact CRUUZ <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="ride" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-violet-300">
              Ride Types
            </p>
            <h2 className="mt-3 text-4xl font-black">Choose your CRUUZ.</h2>
          </div>
          <p className="max-w-md text-white/55">
            Simple ride options for everyday movement, family trips, business
            travel and airport transfers.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {rideTypes.map((ride) => (
            <article
              key={ride.name}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
            >
              <div className="relative h-48">
                <Image
                  src={ride.image}
                  alt={ride.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black">{ride.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  {ride.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="drive" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[2rem] border border-white/10 bg-[#0d0d18] p-7"
            >
              <h3 className="text-xl font-black">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/55">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] md:grid-cols-2">
          <div className="p-8 md:p-12">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-200">
              <ShieldCheck />
            </div>
            <h2 className="text-4xl font-black">Built around safety.</h2>
            <p className="mt-5 max-w-md leading-8 text-white/60">
              CRUUZ is being designed with driver verification, live trip
              tracking, secure payments and support workflows.
            </p>
          </div>

          <div className="relative min-h-[340px]">
            <Image
              src="/assets/people/family-riding.webp"
              alt="CRUUZ safe family ride"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="download" className="mx-auto max-w-7xl px-6 py-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_70%_20%,rgba(139,92,246,0.35),transparent_35%),#0b0a17] p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-200">
                <Smartphone />
              </div>
              <h2 className="text-4xl font-black">CRUUZ app coming soon.</h2>
              <p className="mt-5 max-w-md leading-8 text-white/60">
                Join the launch list and be among the first to experience CRUUZ
                on iOS and Android.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Image
                  src="/assets/stores/app-store.svg"
                  alt="App Store"
                  width={150}
                  height={44}
                />
                <Image
                  src="/assets/stores/google-play.svg"
                  alt="Google Play"
                  width={170}
                  height={50}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="relative hidden h-[360px] w-[210px] md:block">
                <Image
                  src="/assets/phones/iphone-perspective.webp"
                  alt="CRUUZ phone"
                  fill
                  className="object-contain drop-shadow-[0_30px_80px_rgba(139,92,246,0.35)]"
                />
              </div>

              <div className="rounded-3xl bg-white p-4 text-black">
                <Image
                  src="/assets/qr/app-download.svg"
                  alt="CRUUZ QR code"
                  width={110}
                  height={110}
                />
                <p className="mt-3 text-center text-xs font-black">
                  Join launch list
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} CRUUZ. Powered by Nexaro.</p>
          <div className="flex flex-wrap gap-5">
            <a href="mailto:info@cruuz.org">info@cruuz.org</a>
            <a href="mailto:support@cruuz.org">support@cruuz.org</a>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </main>
  );
}