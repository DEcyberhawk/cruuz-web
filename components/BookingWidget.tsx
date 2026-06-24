import { Car, Clock3, CreditCard, MapPin, Navigation } from "lucide-react";

export function BookingWidget() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-violet-300">Ride Preview</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Plan your first CRUUZ ride.</h2>
          </div>
          <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-200">
            Launching soon
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {[
            { icon: MapPin, title: "Pickup", value: "Current location" },
            { icon: Navigation, title: "Drop-off", value: "Choose destination" },
            { icon: Car, title: "Vehicle", value: "CRUUZ GO" },
            { icon: CreditCard, title: "Payment", value: "Wallet / Card" },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-[#0d0b1c] p-5">
              <item.icon className="mb-4 text-violet-300" />
              <p className="text-sm text-white/45">{item.title}</p>
              <p className="mt-1 font-black">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/20 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Clock3 className="text-fuchsia-300" />
            <div>
              <p className="font-black">Smart dispatch engine</p>
              <p className="text-sm text-white/50">AI-ready matching, pricing, safety alerts, and live operations.</p>
            </div>
          </div>
          <a href="mailto:support@cruuz.org" className="rounded-full bg-white px-6 py-3 text-center font-black text-black">
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}