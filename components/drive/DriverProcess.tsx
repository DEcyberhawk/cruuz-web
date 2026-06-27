const steps = [
  ["1", "Apply", "Submit your basic driver and vehicle details."],
  ["2", "Verify", "Complete document, identity and vehicle checks."],
  ["3", "Go Online", "Start accepting rides once your account is approved."],
];

export default function DriverProcess() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
        Onboarding process
      </p>

      <h2 className="mt-3 text-4xl font-black">Start driving in 3 steps.</h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map(([number, title, text]) => (
          <div
            key={title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7"
          >
            <div className="grid h-12 w-12 place-items-center rounded-full bg-violet-600 font-black">
              {number}
            </div>

            <h3 className="mt-6 text-xl font-black">{title}</h3>
            <p className="mt-3 leading-7 text-white/60">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}