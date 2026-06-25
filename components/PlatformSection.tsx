import { Briefcase, Car, Package, Plane, Route, Users } from "lucide-react";

const platform = [
  { id: "ride", icon: Car, title: "Ride", text: "Comfortable rides anytime, anywhere." },
  { id: "drive", icon: Users, title: "Drive", text: "Flexible earning on your schedule." },
  { id: "business", icon: Briefcase, title: "Business", text: "Corporate mobility made simple." },
  { id: "fleet", icon: Route, title: "Fleet", text: "Manage your fleet with ease." },
  { id: "airport", icon: Plane, title: "Airport", text: "Reliable airport transfers." },
  { id: "delivery", icon: Package, title: "Delivery", text: "Fast and secure deliveries." },
];

export function PlatformSection() {
  return (
    <section id="platform" className="mx-auto max-w-7xl px-6 py-14">
      <div className="text-center">
        <h2 className="text-3xl font-black md:text-4xl">
          One Platform. Many{" "}
          <span className="bg-gradient-to-r from-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
            Solutions.
          </span>
        </h2>
        <p className="mt-3 text-white/55">Everything you need, in one intelligent platform.</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {platform.map((item) => (
          <div
            id={item.id}
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-center shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-violet-400/40"
          >
            <item.icon className="mx-auto mb-5 text-violet-400" size={36} />
            <h3 className="font-black">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/55">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}