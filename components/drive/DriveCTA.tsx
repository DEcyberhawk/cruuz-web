export default function DriveCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="rounded-[2rem] bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8 text-center md:p-12">
        <h2 className="text-4xl font-black">Ready to drive with CRUUZ?</h2>

        <p className="mx-auto mt-4 max-w-xl leading-8 text-white/80">
          Join the driver launch list and prepare to earn with the next
          generation of African mobility.
        </p>

        <a
          href="mailto:info@cruuz.org"
          className="mt-8 inline-flex rounded-2xl bg-[#101936] px-7 py-3 font-black text-white shadow-lg"
        >
          Apply to Drive
        </a>
      </div>
    </section>
  );
}