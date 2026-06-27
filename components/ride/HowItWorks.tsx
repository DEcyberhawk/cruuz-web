const steps = [
  ["1", "Choose your destination", "Enter where you want to go."],
  ["2", "Select your CRUUZ", "Pick GO, XL, Executive or Airport."],
  ["3", "Track your driver", "Follow your trip in real time."],
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
        How it works
      </p>

      <h2 className="mt-3 text-4xl font-black">
        Simple from start to arrival.
      </h2>

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