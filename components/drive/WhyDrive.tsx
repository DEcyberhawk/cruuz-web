const benefits = [
  {
    title: "Smart Earnings",
    text: "Receive ride opportunities designed around demand, availability and fair driver growth.",
  },
  {
    title: "Secure Payments",
    text: "Track trips, payouts and balances through a clear driver wallet experience.",
  },
  {
    title: "Driver Support",
    text: "Get support for onboarding, safety, documents, trips and account issues.",
  },
];

export default function WhyDrive() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
        Why drive with CRUUZ
      </p>

      <h2 className="mt-3 text-4xl font-black">
        Built to support drivers, not just trips.
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {benefits.map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7"
          >
            <h3 className="text-xl font-black">{item.title}</h3>
            <p className="mt-3 leading-7 text-white/60">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}