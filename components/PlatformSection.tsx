import { Building2, Car, Package, Plane, Route, Users } from "lucide-react";

const services = [
  { id: "ride", icon: Car, title: "Ride", text: "Safe, affordable, on-demand rides for everyday transport." },
  { id: "drive", icon: Users, title: "Drive", text: "Driver-partner tools for earnings, safety, and trip management." },
  { id: "business", icon: Building2, title: "Business", text: "Corporate transport, staff movement, events, and institutions." },
  { id: "fleet", icon: Route, title: "Fleet", text: "Fleet owner tools for vehicle operations and driver oversight." },
  { id: "airport", icon: Plane, title: "Airport", text: "Future airport rides, hotel transfers, and scheduled transport." },
  { id: "delivery", icon: Package, title: "Delivery", text: "Future logistics infrastructure for people, goods, and commerce." },
];

export function PlatformSection() {
  return (
    <section id="platform" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-violet-300">One Platform</p>
        <h2 className="text-4xl font-black md:text-6xl">Endless mobility.</h2>
        <p className="mt-5 text-white/60">
          CRUUZ is being built as a mobility operating system for riders, drivers, businesses,
          fleets, logistics, and city operations.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((item) => (
          <div
            id={item.id}
            key={item.title}
            className="group rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-violet-300/40"
          >
            <item.icon className="mb-6 text-fuchsia-300 transition group-hover:scale-110" size={34} />
            <h3 className="text-2xl font-black">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/60">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}