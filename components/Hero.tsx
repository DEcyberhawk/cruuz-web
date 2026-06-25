"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Car,
  MapPin,
  PlayCircle,
  ShieldCheck,
  Users,
  Building2,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen px-6 pb-16 pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.35),transparent_35%),radial-gradient(circle_at_90%_40%,rgba(168,85,247,0.22),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,13,0.1),#05050d_92%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="pt-10"
        >
          <div className="mb-7 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/65 backdrop-blur">
            ✨ The future of urban mobility
          </div>

          <h1 className="max-w-3xl text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
            Move{" "}
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              Smarter.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/68">
            CRUUZ connects riders, drivers and businesses through intelligent
            technology that makes every journey safer, faster and more rewarding.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:info@cruuz.org"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-black shadow-xl shadow-violet-700/25"
            >
              Join Launch List <ArrowRight size={18} />
            </a>
            <a
              href="#platform"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-black backdrop-blur hover:bg-white/10"
            >
              Watch Demo <PlayCircle size={18} />
            </a>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-2 gap-5 sm:grid-cols-4">
            {[
              [Users, "100K+", "Future Riders"],
              [Car, "10K+", "Future Drivers"],
              [Building2, "500+", "Business Partners"],
              [ShieldCheck, "Safe", "Always Priority"],
            ].map(([Icon, value, label]) => (
              <div key={String(label)} className="border-l border-white/10 pl-4">
               
                <Icon className="mb-2 text-white/75" size={20} />
                <p className="font-black">{String(value)}</p>
                <p className="text-xs text-white/45">{String(label)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative min-h-[640px]"
        >
          <div className="absolute right-0 top-12 hidden w-[350px] rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl lg:block">
            <div className="space-y-6">
              <MiniFeature icon={Brain} title="AI Dispatch" text="Finding the best driver for your ride." />
              <MiniFeature icon={MapPin} title="Live Tracking" text="Real-time updates on your journey." />
              <MiniFeature icon={ShieldCheck} title="Secure Payments" text="Pay safely with cash or wallet." />
            </div>
          </div>

          <div className="absolute left-1/2 top-4 w-[330px] -translate-x-1/2 rotate-[7deg] rounded-[3rem] border border-white/15 bg-black p-4 shadow-2xl shadow-violet-900/40">
            <div className="rounded-[2.4rem] bg-[#0c0c18] p-5">
              <div className="mb-6 flex justify-between text-xs text-white/70">
                <span>13:41</span>
                <span>5G • 82%</span>
              </div>

              <h3 className="text-xl font-black">Your ride is arriving</h3>
              <p className="mt-1 font-bold text-white/70">2 min away</p>

              <div className="relative mt-7 h-60 rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.35),transparent_60%)]">
                <div className="absolute left-14 top-12 h-32 w-32 rounded-full border border-violet-400/30" />
                <div className="absolute left-24 top-16 h-24 w-1 rotate-45 rounded-full bg-violet-400" />
                <div className="absolute left-36 top-28 grid h-10 w-10 place-items-center rounded-full bg-white text-black">
                  <Car size={18} />
                </div>
                <MapPin className="absolute right-16 top-16 text-violet-300" />
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-black">John Mensah ⭐ 4.9</p>
                <p className="mt-1 text-xs text-white/50">Toyota Camry • GE 123-21</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-4 w-[270px] rounded-[2rem] border border-white/10 bg-[#111024]/90 p-5 shadow-xl backdrop-blur-xl">
            <div className="space-y-4">
              <RouteRow label="Pickup" value="Kwame Nkrumah Ave" />
              <RouteRow label="Destination" value="Airport City" />
              <RouteRow label="ETA" value="2 min" />
              <div className="rounded-2xl bg-black/45 p-4">
                <p className="text-xs text-white/45">Estimated fare</p>
                <p className="text-xl font-black">GHS 45.00</p>
              </div>
              <button className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 font-black">
                Confirm Ride
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MiniFeature({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-500/15 text-violet-300">
        <Icon size={22} />
      </div>
      <div>
        <p className="font-black">{title}</p>
        <p className="mt-1 text-sm leading-6 text-white/55">{text}</p>
      </div>
    </div>
  );
}

function RouteRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-violet-400/40 pl-4">
      <p className="text-xs text-white/45">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}