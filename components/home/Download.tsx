import Image from "next/image";

export default function Download() {
  return (
    <section id="download" className="mx-auto max-w-7xl px-6 pb-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#16214a] via-[#2830a0] to-[#7c3aed] md:grid md:min-h-[560px] md:grid-cols-[0.85fr_1.15fr]">
        <div className="relative z-10 flex flex-col justify-center p-8 md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-100">
            Coming Soon
          </p>

          <h2 className="mt-3 text-5xl font-black tracking-tight">
            The CRUUZ App
          </h2>

          <p className="mt-5 max-w-md text-lg leading-8 text-white/78">
            Join the launch list and be among the first to experience CRUUZ on Android and iOS.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="mailto:info@cruuz.org" className="rounded-2xl bg-white px-7 py-4 font-black text-[#11172f]">
              Join Launch List
            </a>

            <a href="mailto:info@cruuz.org" className="rounded-2xl border border-white/25 bg-black/25 px-7 py-4 font-black text-white">
              App Store
            </a>

            <a href="mailto:info@cruuz.org" className="rounded-2xl border border-white/25 bg-black/25 px-7 py-4 font-black text-white">
              Google Play
            </a>
          </div>
        </div>

        <div className="relative min-h-[560px]">
          <div className="absolute inset-10 rounded-full bg-violet-400/30 blur-3xl" />
          <div className="absolute bottom-[-40px] right-4 h-[660px] w-[480px] rotate-[-6deg] md:right-16">
            <Image
              src="/assets/phones/cruuz-app-phone-large.webp"
              alt="CRUUZ app phone"
              fill
              className="object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}