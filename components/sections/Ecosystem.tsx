import Image from "next/image";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";

const items = [
  {
    title: "Rider App",
    text: "Book rides, track drivers and move with confidence.",
    image: "/assets/screenshots/rider-dashboard.webp",
  },
  {
    title: "Driver App",
    text: "Accept trips, manage earnings and grow with CRUUZ.",
    image: "/assets/screenshots/driver-dashboard.webp",
  },
  {
    title: "Business Dashboard",
    text: "Manage corporate travel, fleets, invoices and analytics.",
    image: "/assets/screenshots/business-dashboard.webp",
  },
  {
    title: "Nexaro Ops",
    text: "Live operations, safety, dispatch and platform intelligence.",
    image: "/assets/screenshots/ops-console.webp",
  },
];

export default function Ecosystem() {
  return (
    <Section>
      <Heading
        subtitle="CRUUZ ECOSYSTEM"
        title="More than rides. A mobility operating system."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09]"
          >
            <div className="relative h-64 bg-[#0b1026]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-7">
              <h3 className="text-2xl font-black">{item.title}</h3>
              <p className="mt-3 max-w-md leading-7 text-white/65">
                {item.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}