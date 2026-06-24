"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck, Smartphone, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen px-6 pb-20 pt-32">
      <div className="absolute left-1/2 top-16 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[130px]" />
      <div className="absolute right-0 top-56 h-[340px] w-[340px] rounded-full bg-fuchsia-500/20 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-violet-100 backdrop-blur">
            <Sparkles size={16} />
            CRUUZ is now live online
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Africa&apos;s next-generation{" "}
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-white bg-clip-text text-transparent">
              mobility platform.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            CRUUZ connects riders, drivers, businesses, fleets, and cities through safe,
            reliable, intelligent, and rewarding transport technology.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:info@cruuz.org"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-bold shadow-xl shadow-violet-600/25"
            >
              Join Launch List <ArrowRight className="transition group-hover:translate-x-1" size={18} />
            </a>
            <a
              href="#platform"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 font-bold backdrop-blur hover:bg-white/10"
            >
              <Smartphone size={18} /> Explore CRUUZ
            </a>
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
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/45">Live Preview</p>
                  <h2 className="text-2xl font-black">CRUUZ Ride</h2>
                </div>
                <ShieldCheck className="text-emerald-300" />
              </div>

              <div className="space-y-4">
                {[
                  ["Pickup", "Current location", "text-violet-300"],
                  ["Destination", "Where are you going?", "text-fuchsia-300"],
                ].map(([label, value, color]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-2 text-xs text-white/40">{label}</p>
                    <div className="flex items-center gap-3">
                      <MapPin className={color} size={20} />
                      <p className="font-semibold">{value}</p>
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-3 gap-3">
                  {["GO", "XL", "EXEC"].map((type) => (
                    <div key={type} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                      <p className="text-sm font-black">{type}</p>
                      <p className="mt-1 text-xs text-white/45">Coming soon</p>
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
  );
}