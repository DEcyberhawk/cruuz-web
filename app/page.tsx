import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0d18] text-white">
      <nav className="fixed inset-x-0 top-0 z-50 bg-[#0b0d18]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#" className="text-2xl font-black tracking-tight">
            CRUUZ
          </a>

          <div className="flex items-center gap-5 text-sm font-semibold text-white/70">
            <a href="#download" className="hover:text-white">Download</a>
            <a href="mailto:info@cruuz.org" className="hover:text-white">Contact</a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen overflow-hidden px-6 pt-24">
        <Image
          src="/assets/hero/cruuz-signature-hero.webp"
          alt="CRUUZ"
          fill
          priority
          className="object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d18] via-[#0b0d18]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d18] via-transparent to-[#0b0d18]/40" />

        <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-violet-300">
              Smart. Secure. Rewarding.
            </p>

            <h1 className="text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Move{" "}
              <span className="block bg-gradient-to-r from-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                Smarter.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
              CRUUZ is a smart mobility platform connecting riders, drivers and
              businesses through safe and reliable transport.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-black"
              >
                App Coming Soon <ArrowRight size={18} />
              </a>

              <a
                href="mailto:info@cruuz.org"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 font-black backdrop-blur"
              >
                Contact CRUUZ <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="download" className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 text-center md:p-12">
          <h2 className="text-4xl font-black">CRUUZ app coming soon.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-white/60">
            Join our launch list and be among the first to experience CRUUZ on
            Android and iOS.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@cruuz.org"
              className="rounded-2xl bg-white px-7 py-4 font-black text-black"
            >
              Join Launch List
            </a>

            <a
              href="mailto:support@cruuz.org"
              className="rounded-2xl border border-white/20 px-7 py-4 font-black"
            >
              support@cruuz.org
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} CRUUZ. Powered by Nexaro.</p>
          <p>info@cruuz.org · support@cruuz.org</p>
        </div>
      </footer>
    </main>
  );
}