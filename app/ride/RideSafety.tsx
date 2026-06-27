import Image from "next/image";
import { assets } from "@/lib/assets";

export default function RideSafety() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] md:grid-cols-2">
        <div className="p-8 md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
            Safety first
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Built for trusted journeys.
          </h2>

          <p className="mt-5 max-w-md leading-8 text-white/65">
            CRUUZ is designed around verified drivers, secure payments, live
            tracking and support workflows that protect riders and drivers.
          </p>
        </div>

        <div className="grid gap-5 p-8 md:p-12">
          <Image
            src={assets.badges.verifiedDriver}
            alt="Verified Driver"
            width={220}
            height={90}
          />
          <Image
            src={assets.badges.securePayments}
            alt="Secure Payments"
            width={220}
            height={90}
          />
        </div>
      </div>
    </section>
  );
}