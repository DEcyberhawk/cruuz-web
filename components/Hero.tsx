"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pb-16 pt-28">
      <Image
        src="/assets/hero/cruuz-signature-hero.webp"
        alt="CRUUZ premium vehicle in Accra"
        fill
        priority
        className="object-cover opacity-75"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#05050d] via-[#05050d]/75 to-[#05050d]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05050d] via-transparent to-[#05050d]/80" />

      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="mb-7 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur">
            ✨ Smart. Secure. Rewarding.
          </div>

          <h1 className="text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
            Move{" "}
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              Smarter.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">
            CRUUZ is the intelligent mobility platform built for riders, drivers,
            businesses and modern African cities.
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative hidden min-h-[640px] lg:block"
        >
          <div className="absolute right-8 top-4 w-[300px] rotate-[7deg]">
            <Image
              src="/assets/phones/iphone-perspective.webp"
              alt="CRUUZ app phone mockup"
              width={520}
              height={760}
              className="drop-shadow-[0_30px_80px_rgba(139,92,246,0.45)]"
              priority
            />
          </div>

          <div className="absolute right-16 top-24 w-[210px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-black shadow-2xl">
            <Image
              src="/assets/app/tracking-screen.webp"
              alt="CRUUZ ride tracking screen"
              width={420}
              height={760}
              className="h-[455px] w-full object-cover"
            />
          </div>

          <div className="absolute bottom-12 right-0 w-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0a17]/90 p-4 shadow-2xl backdrop-blur-2xl">
            <div className="relative h-56 overflow-hidden rounded-[1.5rem]">
              <Image
                src="/assets/maps/purple-route.webp"
                alt="CRUUZ purple route map"
                fill
                className="object-cover"
              />
              <div className="absolute left-8 top-10 h-4 w-4 rounded-full bg-violet-400 shadow-[0_0_25px_rgba(168,85,247,0.9)]" />
              <div className="absolute bottom-8 right-10 h-4 w-4 rounded-full bg-white shadow-[0_0_25px_rgba(255,255,255,0.9)]" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-white/45">Your ride is arriving</p>
                <p className="text-xl font-black">2 min away</p>
              </div>
              <div className="rounded-full bg-emerald-400/15 px-3 py-2 text-xs font-black text-emerald-200">
                Live
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-[430px]">
            <Image
              src="/assets/vehicles/cruuz-go-night.webp"
              alt="CRUUZ vehicle"
              width={760}
              height={420}
              className="drop-shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
            />
          </div>

          <div className="absolute left-8 top-16 rounded-3xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-emerald-300" />
              <div>
                <p className="font-black">Verified mobility</p>
                <p className="text-xs text-white/50">Built for trust and safety</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}