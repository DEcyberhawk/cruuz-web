"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const rides = [
  {
    name: "CRUUZ GO",
    text: "Affordable everyday rides.",
    image: "/assets/vehicles/cruuz-go-front.webp",
    meta: "4 Seats • City rides",
  },
  {
    name: "CRUUZ XL",
    text: "More space for groups and families.",
    image: "/assets/vehicles/cruuz-xl.webp",
    meta: "6–7 Seats • Groups",
  },
  {
    name: "Executive",
    text: "Premium rides for business and comfort.",
    image: "/assets/vehicles/cruuz-executive.webp",
    meta: "4 Seats • Premium",
  },
  {
    name: "Airport",
    text: "Reliable airport transfers.",
    image: "/assets/vehicles/cruuz-airport.webp",
    meta: "Airport • Luggage",
  },
  {
    name: "Business",
    text: "Smart transport for teams and companies.",
    image: "/assets/vehicles/cruuz-business.webp",
    meta: "Corporate • Teams",
  },
  {
    name: "Delivery",
    text: "Fast movement for packages and essentials.",
    image: "/assets/vehicles/cruuz-delivery.webp",
    meta: "Parcels • Essentials",
  },
];

export default function RideOptions() {
  const sliderRef = useRef<HTMLDivElement>(null);

  function scrollSlider(direction: "left" | "right") {
    sliderRef.current?.scrollBy({
      left: direction === "left" ? -330 : 330,
      behavior: "smooth",
    });
  }

  return (
    <section id="rides" className="px-6 py-14">
      <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-5">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
            Ride Options
          </p>
          <h2 className="mt-3 text-4xl font-black">Choose your CRUUZ.</h2>
        </div>

        <div className="hidden gap-3 md:flex">
          <button
            onClick={() => scrollSlider("left")}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 hover:bg-white/15"
            aria-label="Previous ride"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scrollSlider("right")}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 hover:bg-white/15"
            aria-label="Next ride"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="mx-auto flex max-w-7xl snap-x gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {rides.map((ride) => (
          <article
            key={ride.name}
            className="min-w-[280px] snap-start overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09] md:min-w-[320px]"
          >
            <div className="relative h-44 bg-[#0b1026]">
              <Image
                src={ride.image}
                alt={ride.name}
                fill
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>

            <div className="p-5">
              <div className="mb-3 inline-flex rounded-full bg-violet-500/20 px-3 py-1 text-xs font-black text-violet-200">
                Coming Soon
              </div>

              <h3 className="text-xl font-black">{ride.name}</h3>

              <p className="mt-2 text-sm leading-6 text-white/60">
                {ride.text}
              </p>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                {ride.meta}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}