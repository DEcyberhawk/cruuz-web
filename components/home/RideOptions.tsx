"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { rides } from "@/lib/rides";
import RideCard from "./RideCard";

export default function RideOptions() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  function scrollToIndex(index: number) {
    const slider = sliderRef.current;
    if (!slider) return;

    const cardWidth = 340;
    slider.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });

    setActive(index);
  }

  function scrollSlider(direction: "left" | "right") {
    const nextIndex =
      direction === "left"
        ? active === 0
          ? rides.length - 1
          : active - 1
        : active === rides.length - 1
          ? 0
          : active + 1;

    scrollToIndex(nextIndex);
  }

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((current) => {
        const nextIndex = current === rides.length - 1 ? 0 : current + 1;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [paused]);

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
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="mx-auto flex max-w-7xl snap-x gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {rides.map((ride) => (
          <RideCard key={ride.name} {...ride} />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {rides.map((ride, index) => (
          <button
            key={ride.name}
            onClick={() => scrollToIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              active === index ? "w-8 bg-violet-400" : "w-2.5 bg-white/25"
            }`}
            aria-label={`Go to ${ride.name}`}
          />
        ))}
      </div>
    </section>
  );
}