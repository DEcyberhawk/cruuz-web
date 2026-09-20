import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { assets } from "@/lib/assets";

export default function RideHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-6 pb-14 pt-28 md:pt-32">
      <Image
        src={assets.hero.background}
        alt="CRUUZ transportation"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#081329]/95 via-[#101936]/82 to-[#101936]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101936] via-transparent to-[#081329]/45" />

      <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT */}
        <div className="py-8 lg:py-10">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
            Ride with CRUUZ
          </p>

          <div className="relative mt-4 h-[58px] w-full max-w-[310px] sm:h-[66px] sm:max-w-[360px]">
            <Image
              src={assets.badges.ghana}
              alt="Proudly Ghanaian"
              fill
              priority
              className="object-contain object-left"
            />
          </div>

          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight md:text-6xl xl:text-7xl">
            Move around the city
            <span className="block bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              the smarter way.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
            Choose your pickup and destination, compare CRUUZ ride options and
            get a live estimated fare before continuing your booking.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3.5 font-black text-white shadow-lg shadow-violet-900/30 transition hover:-translate-y-0.5"
            >
              Book a Ride
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#ride-types"
              className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.07] px-6 py-3.5 font-black text-white transition hover:bg-white/[0.12]"
            >
              Explore Ride Types
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/65">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />
              Live route estimate
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-sky-400" />
              Ride now or schedule
            </span>

            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-violet-400" />
              Safety-focused
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative hidden min-h-[420px] items-end justify-center lg:flex">
          <div className="absolute right-0 top-8 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative h-[390px] w-full">
            <Image
              src={assets.vehicles.executive}
              alt="CRUUZ executive vehicle"
              fill
              priority
              className="object-contain object-center drop-shadow-[0_45px_85px_rgba(0,0,0,0.75)]"
            />
          </div>

          <div className="absolute bottom-8 left-4 rounded-2xl border border-white/10 bg-[#09152b]/85 px-5 py-4 shadow-xl backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
              CRUUZ
            </p>

            <p className="mt-1 font-extrabold text-white">
              A better way to get there.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}