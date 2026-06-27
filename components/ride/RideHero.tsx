import Image from "next/image";
import { assets } from "@/lib/assets";

export default function RideHero() {
  return (
    <section className="relative min-h-[82vh] overflow-hidden px-6 pt-32">
      <Image
        src={assets.hero.background}
        alt="CRUUZ ride"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#101936]/95 via-[#101936]/70 to-[#101936]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101936] via-transparent to-[#101936]/30" />

      <div className="relative mx-auto grid min-h-[70vh] max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-violet-200">
            Ride with CRUUZ
          </p>
           <div className="relative mt-5 h-[72px] w-[320px]">
  <Image
    src={assets.badges.ghana}
    alt="Proudly Ghanaian"
    fill
    priority
    className="object-contain object-left"
  />
</div>


          <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">
            Book safer, smarter rides.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
            CRUUZ helps passengers move around the city with trusted drivers,
            simple booking, flexible payments and live trip tracking.
          </p>

        <div className="mt-8 flex flex-wrap gap-4">
  <a
    href="#ride-types"
    className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 font-black text-white shadow-lg shadow-violet-700/25"
  >
    Explore Ride Types
  </a>

  <a
    href="mailto:info@cruuz.org"
    className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-black text-white"
  >
    Join Launch List
  </a>
</div>
        </div>

        <div className="relative hidden h-[420px] lg:block">
          <Image
            src={assets.vehicles.executive}
            alt="CRUUZ vehicle"
            fill
            className="object-contain drop-shadow-[0_45px_100px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>
    </section>
  );
}