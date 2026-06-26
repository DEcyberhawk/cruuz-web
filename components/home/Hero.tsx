import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { assets } from "@/lib/assets";
export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-24">
      <Image
        src="assets.hero.background"
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
              src={assets.badges.ghana}
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

       <div className="relative hidden min-h-[560px] lg:block">
  <div className="absolute right-8 top-16 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-black backdrop-blur-xl">
    Launching Soon
  </div>

  <div className="absolute bottom-8 right-0 h-[190px] w-[680px] overflow-hidden rounded-[3rem] opacity-55">
    <Image
      src={assets.hero.roadGlow}
      alt=""
      fill
      className="object-cover"
    />
  </div>

<div className="absolute bottom-4 right-0 h-[380px] w-[760px] animate-[floatCar_8s_ease-in-out_infinite]">
    <div className="absolute inset-x-20 bottom-4 h-28 rounded-full bg-violet-500/30 blur-3xl" />

    <Image
      src={assets.vehicles.executive}
      alt="CRUUZ Executive vehicle"
      fill
      priority
      className="object-contain object-bottom drop-shadow-[0_45px_100px_rgba(0,0,0,0.85)]"
    />
  </div>
</div>
      </div>
    <a
  href="#rides"
  className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-white/55 transition hover:text-white md:flex"
>
  <span>Explore CRUUZ</span>
  <span className="h-8 w-px animate-pulse bg-violet-300" />
</a>
    </section>
  );
}