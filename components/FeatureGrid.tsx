import { Brain, Building2, Shield, Wallet } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Dispatch",
    text: "Smart matching that connects riders with the best driver in real time.",
  },
  {
    icon: Shield,
    title: "Safe Always",
    text: "Verified drivers, ride monitoring and support for every journey.",
  },
  {
    icon: Wallet,
    title: "Rewarding",
    text: "Better value for riders and stronger earning tools for drivers.",
  },
  {
    icon: Building2,
    title: "Business Ready",
    text: "Powerful tools for companies, institutions and organizations.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="text-center text-3xl font-black md:text-4xl">
        Why{" "}
        <span className="bg-gradient-to-r from-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
          CRUUZ?
        </span>
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-4">
        {features.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-[#0d0d18] p-7">
            <item.icon className="mb-6 text-violet-400" size={42} />
            <h3 className="font-black">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/55">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}