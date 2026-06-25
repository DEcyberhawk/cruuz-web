import { Bell, Check, Headphones, ShieldCheck, UserCheck } from "lucide-react";

const steps = [
  { icon: UserCheck, title: "Verified Drivers", text: "Rigorous verification and background checks." },
  { icon: ShieldCheck, title: "Ride Monitoring", text: "Real-time monitoring and live location sharing." },
  { icon: Bell, title: "Emergency", text: "One-tap emergency alerts and priority response." },
  { icon: Headphones, title: "24/7 Support", text: "Always here for you, anytime, anywhere." },
  { icon: Check, title: "Trip Complete", text: "Your safety is our commitment, every trip." },
];

export function SafetySection() {
  return (
    <section id="safety" className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-black md:text-3xl">Safety at Every Step</h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
              We&apos;ve built multiple layers of safety to protect you before, during and after every trip.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-600/25">
                  <item.icon size={24} />
                </div>
                <h3 className="mt-4 text-sm font-black">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-white/55">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}