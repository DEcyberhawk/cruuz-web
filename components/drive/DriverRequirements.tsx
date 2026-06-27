const requirements = [
  "Valid driver license",
  "Verified identity document",
  "Vehicle document verification",
  "Roadworthy vehicle condition",
  "Active phone with internet access",
  "Agreement to CRUUZ safety standards",
];

export default function DriverRequirements() {
  return (
    <section id="requirements" className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
          Driver requirements
        </p>

        <h2 className="mt-3 text-4xl font-black">
          What you need to join.
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {requirements.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-black/20 p-5 font-bold text-white/75"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}