import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export default function RideCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-violet-400/20 bg-[linear-gradient(115deg,#101d3c_0%,#293271_52%,#61138a_100%)] px-7 py-8 shadow-2xl md:px-10 md:py-9">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr_auto]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">
              Ready to move?
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Your next CRUUZ starts here.
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-white/65">
              Choose your route, select a service and see your
              estimated fare before continuing.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Benefit
              icon={<MapPin className="h-5 w-5" />}
              title="Route"
            />

            <Benefit
              icon={<CalendarDays className="h-5 w-5" />}
              title="Schedule"
            />

            <Benefit
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Safety"
            />
          </div>

          <Link
  href="/book"
  className="inline-flex min-h-14 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white px-7 py-4 font-black !text-[#171330] shadow-xl transition hover:-translate-y-0.5 hover:bg-violet-50 hover:!text-[#171330]"
>
  <span className="!text-[#171330]">
    Book a Ride
  </span>

  <ArrowRight className="h-4 w-4 !text-[#171330]" />
</Link>
        </div>
      </div>
    </section>
  );
}

function Benefit({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-violet-100">
        {icon}
      </div>

      <p className="mt-2 text-xs font-bold text-white/65">
        {title}
      </p>
    </div>
  );
}