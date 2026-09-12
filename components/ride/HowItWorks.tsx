import {
  CarFront,
  MapPinned,
  Route,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPinned,
    title: "Choose your route",
    text: "Enter your pickup and destination and let CRUUZ calculate the journey.",
  },
  {
    number: "02",
    icon: CarFront,
    title: "Choose your CRUUZ",
    text: "Compare available ride types and view the estimated fare for your route.",
  },
  {
    number: "03",
    icon: Route,
    title: "Continue your booking",
    text: "Confirm your ride details and continue through the CRUUZ booking flow.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:py-16">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.26em] text-violet-300">
            How CRUUZ works
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            From pickup to destination,
            <span className="text-violet-300"> simplified.</span>
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-white/50">
          Plan your journey, compare available services and see
          your route information before continuing.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <article
              key={step.number}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.065]"
            >
              <div className="absolute right-5 top-4 text-4xl font-black text-white/[0.045]">
                {step.number}
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-black">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/55">
                {step.text}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}