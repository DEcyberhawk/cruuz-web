const tools = [
  ["Earnings Simulator", "Estimate weekly income based on hours, trips and city demand."],
  ["Vehicle Checker", "See which CRUUZ ride types your vehicle may qualify for."],
  ["Wallet Activation", "Track the required GHS 20 minimum balance before going online."],
  ["Driver Readiness", "Follow your approval progress from documents to activation."],
];

export default function DriverSuccessCenter() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
          Driver Success Center
        </p>

        <h2 className="mt-3 text-4xl font-black">
          Tools to help drivers grow.
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {tools.map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <h3 className="font-black text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}