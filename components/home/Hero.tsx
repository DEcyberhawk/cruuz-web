"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Navigation,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "@/lib/assets";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#101936] px-6 pt-24">
      {/* Background */}
      <Image
        src={assets.hero.background}
        alt="CRUUZ urban mobility"
        fill
        priority
        className="object-cover"
      />

      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#101936]/95 via-[#101936]/65 to-[#101936]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101936] via-transparent to-[#101936]/35" />

      {/* Ambient animated glow */}
      <motion.div
        className="absolute right-[4%] top-[20%] h-[380px] w-[380px] rounded-full bg-violet-600/20 blur-[120px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[8%] right-[20%] h-[280px] w-[280px] rounded-full bg-fuchsia-500/10 blur-[110px]"
        animate={{
          x: [-20, 30, -20],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left content */}
        <div className="z-20 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-violet-200"
          >
            The future of urban mobility
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-6xl font-black leading-[0.95] tracking-tight md:text-8xl"
          >
            Move{" "}
            <span className="block bg-gradient-to-r from-violet-200 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
              Smarter.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="relative mt-6 h-[88px] w-full max-w-[410px]"
          >
            <Image
              src={assets.badges.ghana}
              alt="Proudly Ghanaian"
              fill
              className="object-contain object-left"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg font-medium leading-8 text-white/82"
          >
            CRUUZ connects riders, drivers and businesses through safe,
            reliable and rewarding transport.
          </motion.p>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white/70 backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-violet-300" />
              Safety First
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white/70 backdrop-blur">
              <Navigation className="h-4 w-4 text-violet-300" />
              Smart Routing
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white/70 backdrop-blur">
              <Clock3 className="h-4 w-4 text-violet-300" />
              Ride Anytime
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-black shadow-xl shadow-violet-700/25 transition hover:scale-[1.025]"
            >
              Book a Ride
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <a
              href="mailto:info@cruuz.org"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 font-black backdrop-blur transition hover:bg-white/15"
            >
              Contact CRUUZ
              <Mail size={18} />
            </a>
          </motion.div>

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-white/35">
            CRUUZ mobile app launching soon
          </p>
        </div>

        {/* Right visual */}
        <div className="relative hidden min-h-[590px] lg:block">
          {/* Launch badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute right-8 top-12 z-20 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-black backdrop-blur-xl"
          >
            Built for Africa. Ready for the World.
          </motion.div>

          {/* Floating live ride card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -7, 0],
            }}
            transition={{
              opacity: { duration: 0.7, delay: 0.9 },
              x: { duration: 0.7, delay: 0.9 },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute right-2 top-[125px] z-30 w-[235px] rounded-[1.6rem] border border-white/10 bg-[#121b3d]/80 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  Your ride
                </p>
                <p className="mt-1 text-sm font-black text-white">
                  Driver arriving
                </p>
              </div>

              <div className="rounded-xl bg-violet-500/15 p-2">
                <Navigation className="h-5 w-5 text-violet-300" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <Clock3 className="h-4 w-4 text-white/70" />
              </div>

              <div>
                <p className="text-xs text-white/40">Estimated arrival</p>
                <p className="text-lg font-black text-white">2 min</p>
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
                animate={{ width: ["15%", "85%", "15%"] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Pickup card */}
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute left-5 top-[230px] z-30 rounded-2xl border border-white/10 bg-[#121b3d]/75 px-4 py-3 shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-400/15 p-2">
                <MapPin className="h-4 w-4 text-green-300" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Pickup
                </p>
                <p className="text-sm font-black text-white">Accra</p>
              </div>
            </div>
          </motion.div>

          {/* Safe ride card */}
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-[215px] right-[40px] z-30 rounded-2xl border border-white/10 bg-[#121b3d]/75 px-4 py-3 shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-300" />

              <div>
                <p className="text-xs text-white/40">CRUUZ Safety</p>
                <p className="text-sm font-black text-white">
                  Ride protected
                </p>
              </div>
            </div>
          </motion.div>

          {/* Moving road glow */}
          <motion.div
            className="absolute bottom-8 right-0 h-[190px] w-[680px] overflow-hidden rounded-[3rem] opacity-60"
            animate={{
              x: [0, -18, 0],
              opacity: [0.45, 0.7, 0.45],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={assets.hero.roadGlow}
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Road streak */}
          <motion.div
            className="absolute bottom-[118px] right-0 h-[2px] w-[560px] bg-gradient-to-r from-transparent via-violet-300/70 to-transparent blur-[1px]"
            animate={{
              x: [160, -220],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Animated vehicle */}
<motion.div
  className="absolute bottom-4 right-0 h-[380px] w-[760px]"
  initial={{ x: 120, y: 0, opacity: 0 }}
  animate={{
    x: [120, 0, -55, -20, 0],
    y: [0, 0, -6, -2, 0],
    rotate: [0, 0, -0.35, 0.2, 0],
    opacity: 1,
  }}
  transition={{
    x: {
      duration: 7,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
    y: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
    rotate: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
    opacity: {
      duration: 0.8,
    },
  }}
>
            {/* Moving ground shadow */}
            <motion.div
              className="absolute inset-x-20 bottom-4 h-28 rounded-full bg-violet-500/30 blur-3xl"
              animate={{
                scaleX: [1, 1.1, 0.96, 1],
                opacity: [0.25, 0.45, 0.28, 0.25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Light sweep across car */}
            <motion.div
              className="pointer-events-none absolute bottom-[90px] left-[80px] z-20 h-[120px] w-[100px] rotate-12 bg-white/10 blur-3xl"
              animate={{
                x: [0, 420],
                opacity: [0, 0.55, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />

            <Image
              src={assets.vehicles.executive}
              alt="CRUUZ Executive vehicle"
              fill
              priority
              className="object-contain object-bottom drop-shadow-[0_45px_100px_rgba(0,0,0,0.85)]"
            />
          </motion.div>
        </div>
      </div>

      {/* Explore indicator */}
      <a
        href="#rides"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-white/55 transition hover:text-white md:flex"
      >
        <span>Explore CRUUZ</span>

        <motion.span
          className="h-8 w-px bg-violet-300"
          animate={{
            scaleY: [0.4, 1, 0.4],
            opacity: [0.35, 1, 0.35],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </a>
    </section>
  );
}