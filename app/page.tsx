"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Car,
  Clock3,
  CreditCard,
  Headphones,
  MapPin,
  Menu,
  Package,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Wallet,
} from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Safe & Secure", text: "Verified drivers, trip tracking, safety alerts, and trusted support." },
  { icon: Wallet, title: "Rewarding", text: "Built for driver earnings, rider rewards, wallets, and smarter mobility." },
  { icon: Clock3, title: "Fast Dispatch", text: "Intelligent matching between riders and available nearby drivers." },
  { icon: Headphones, title: "24/7 Support", text: "Support for riders, drivers, businesses, incidents, and payments." },
];

const services = [
  { icon: Car, title: "Ride", text: "Book safe, affordable rides across your city with real-time tracking." },
  { icon: Users, title: "Drive", text: "Join CRUUZ as a driver-partner and grow your income with smart tools." },
  { icon: Building2, title: "Business", text: "Corporate transport, staff rides, airport movement, and fleet solutions." },
  { icon: Package, title: "Delivery", text: "Future-ready logistics and delivery infrastructure for people and goods." },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080713] text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080713]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
              <Car size={24} />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight">CRUUZ</p>
              <p className="text-xs text-white/50">Smart. Secure. Rewarding.</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#ride" className="hover:text-white">Ride</a>
            <a href="#drive" className="hover:text-white">Drive</a>
            <a href="#business" className="hover:text-white">Business</a>
            <a href="#safety" className="hover:text-white">Safety</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>

          <button className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-violet-100 md:block">
            Coming Soon
          </button>

          <button className="md:hidden">
            <Menu />
          </button>
        </div>
      </nav>

      <section className="relative min-h-screen px-6 pt-32">
        <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[120px]" />
        <div className="absolute right-0 top-48 h-[350px] w-[350px] rounded-full bg-fuchsia-500/20 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-violet-100 backdrop-blur">
              <Sparkles size={16} />
              CRUUZ official website launching soon
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Move Smarter With{" "}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-white bg-clip-text text-transparent">
                CRUUZ
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              CRUUZ is a technology-powered mobility platform connecting riders, drivers, businesses, and cities through safe, reliable, and intelligent transportation services.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-bold shadow-xl shadow-violet-600/25">
                Join Launch List <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 font-bold backdrop-blur hover:bg-white/10">
                <Smartphone size={18} /> App Coming Soon
              </button>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
              {[
                ["Ghana", "Launch Market"],
                ["24/7", "Support Vision"],
                ["Nexaro", "Powered Ops"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                  <p className="text-2xl font-black">{value}</p>
                  <p className="mt-1 text-xs text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-2xl">
              <div className="rounded-[1.5rem] bg-[#111024] p-5">
                <div className="mb-5 flex rounded-2xl bg-white/5 p-1 text-sm">
                  {["Ride", "Delivery", "Schedule"].map((item, index) => (
                    <button key={item} className={`flex-1 rounded-xl px-4 py-3 font-bold ${index === 0 ? "bg-violet-500 text-white" : "text-white/50"}`}>
                      {item}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-2 text-xs text-white/40">Pickup</p>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-violet-300" size={20} />
                      <p className="font-semibold">Current location</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-2 text-xs text-white/40">Destination</p>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-fuchsia-300" size={20} />
                      <p className="font-semibold">Where are you going?</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["GO", "XL", "EXEC"].map((type) => (
                      <div key={type} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                        <Car className="mx-auto mb-2 text-violet-200" size={22} />
                        <p className="text-sm font-black">{type}</p>
                      </div>
                    ))}
                  </div>

                  <button className="w-full rounded-2xl bg-white py-4 font-black text-black">
                    Request CRUUZ
                  </button>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 rounded-3xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="text-emerald-300" />
                  <div>
                    <p className="font-bold">Verified mobility</p>
                    <p className="text-xs text-white/50">Built for trust and safety</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.07]">
              <item.icon className="mb-5 text-violet-300" size={30} />
              <h3 className="text-lg font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ride" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-violet-300">Mobility Platform</p>
          <h2 className="text-4xl font-black md:text-6xl">Built for riders, drivers, and businesses.</h2>
          <p className="mt-5 text-white/60">
            CRUUZ is designed as a full mobility operating system, not just a simple taxi app.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {services.map((item) => (
            <div id={item.title.toLowerCase()} key={item.title} className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-7">
              <item.icon className="mb-6 text-fuchsia-300" size={34} />
              <h3 className="text-2xl font-black">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/60">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="safety" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-violet-300">Safety First</p>
              <h2 className="text-4xl font-black">A smarter transport experience with trust at the center.</h2>
            </div>
            <div className="space-y-4 text-white/65">
              <p>CRUUZ is being built with driver verification, rider protection, trip monitoring, emergency support, payment visibility, and operational controls through Nexaro Ops.</p>
              <p>Our goal is to create a transport platform that is safe, reliable, transparent, and rewarding for everyone in the mobility ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-violet-300/20 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 p-10 text-center shadow-2xl shadow-violet-900/40">
          <Star className="mx-auto mb-5 text-yellow-200" size={34} />
          <h2 className="text-4xl font-black md:text-6xl">CRUUZ is coming soon.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            We are preparing the official launch website, rider app, driver app, business tools, and Nexaro-powered operations.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="mailto:support@cruuz.org" className="rounded-full bg-white px-7 py-4 font-black text-black">
              Contact CRUUZ
            </a>
            <a href="mailto:drivers@cruuz.org" className="rounded-full border border-white/20 px-7 py-4 font-black text-white">
              Become a Driver
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} CRUUZ. Powered by Nexaro.</p>
          <div className="flex gap-5">
            <span>Riders</span>
            <span>Drivers</span>
            <span>Business</span>
            <span>Safety</span>
          </div>
        </div>
      </footer>
    </main>
  );
}