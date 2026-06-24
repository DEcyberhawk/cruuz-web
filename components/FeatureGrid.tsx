import { Clock3, Headphones, ShieldCheck, Wallet } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    text: "Verified drivers, trip tracking, safety alerts, support workflows, and operational monitoring.",
  },
  {
    icon: Wallet,
    title: "Rewarding",
    text: "Designed for driver earnings, rider rewards, wallets, payments, and future loyalty programs.",
  },
  {
    icon: Clock3,
    title: "Fast Dispatch",
    text: "Intelligent matching between riders and nearby drivers with future real-time marketplace balancing.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "Support flows for riders, drivers, businesses, safety incidents, payments, and disputes.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-5 md:grid-cols-4">
        {features.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.07]"
          >
            <item.icon className="mb-5 text-violet-300" size={30} />
            <h3 className="text-lg font-black">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/60">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}