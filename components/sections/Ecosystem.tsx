"use client";

import Image from "next/image";
import { useState } from "react";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import GalleryModal from "@/components/ui/GalleryModal";
import { assets } from "@/lib/assets";

const items = [
  {
    title: "Rider App",
    text: "Book rides, track drivers and move with confidence.",
    image: assets.screenshots.rider,
  },
  {
    title: "Driver App",
    text: "Accept trips, manage earnings and grow with CRUUZ.",
    image: assets.screenshots.driver,
  },
  {
    title: "Business Dashboard",
    text: "Manage corporate travel, fleets, invoices and analytics.",
    image: assets.screenshots.business,
  },
  {
    title: "Nexaro Ops",
    text: "Live operations, safety, dispatch and platform intelligence.",
    image: assets.screenshots.ops,
  },
];

export default function Ecosystem() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="ecosystem">
      <Section>
        <Heading
          subtitle="CRUUZ ECOSYSTEM"
          title="More than rides. A mobility operating system."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09]"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block h-56 w-full overflow-hidden bg-[#0b1026] text-left"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute right-4 top-4 rounded-full bg-violet-600 px-3 py-2 text-xs font-black text-white">
                  View
                </span>
              </button>

              <div className="p-7">
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-3 max-w-md leading-7 text-white/65">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        {activeIndex !== null && (
          <GalleryModal
            items={items}
            startIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </Section>
    </section>
  );
}