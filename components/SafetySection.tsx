import { AlertTriangle, BadgeCheck, Eye, Lock, ShieldCheck } from "lucide-react";

const safety = [
  { icon: BadgeCheck, title: "Driver verification", text: "Identity, document, and vehicle checks before access." },
  { icon: Eye, title: "Trip visibility", text: "Live trip tracking and operational oversight for safer rides." },
  { icon: AlertTriangle, title: "Incident workflows", text: "Structured reporting for disputes, safety, and support cases." },
  { icon: Lock, title: "Secure payments", text: "Built for wallet, card, and local payment methods." },
];

export function SafetySection() {
  return (
    <section id="safety" className="mx-auto max-w-7xl px-6 py-20">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-violet-300">Safety First</p>
            <h2 className="text-4xl font-black">Trust is the foundation of CRUUZ.</h2>
            <p className="mt-5 leading-8 text-white/60">
              CRUUZ is being built with safety controls, driver verification, rider protection,
              trip monitoring, emergency support, payment visibility, and Nexaro-powered operations.
            </p>
          </div>

          <div className="grid gap-4">
            {safety.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-500/15 text-violet-200">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-black">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/55">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5">
              <div className="flex gap-4">
                <ShieldCheck className="shrink-0 text-emerald-300" />
                <p className="text-sm leading-6 text-emerald-100">
                  Safety systems will continue expanding as CRUUZ moves from launch website to production transport operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}