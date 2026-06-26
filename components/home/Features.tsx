import { Car, Clock, CreditCard, ShieldCheck } from "lucide-react";

const features = [
  { icon: Car, title: "Smart Rides", text: "Reliable mobility made simple." },
  { icon: ShieldCheck, title: "Safe Trips", text: "Verified and trusted rides." },
  { icon: Clock, title: "Fast Pickup", text: "Quick booking and smooth pickup." },
  { icon: CreditCard, title: "Cash & Wallet", text: "Flexible payment options." },
];

export default function Features() {
  return (
    <section className="bg-[#f5f2ff] px-6 py-10 text-[#12172f]">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
        {features.map((item) => (
          <div key={item.title} className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-600 text-white">
              <item.icon size={22} />
            </div>
            <div>
              <h3 className="font-black">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}