import { Apple, QrCode } from "lucide-react";

export function DownloadSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_70%_20%,rgba(139,92,246,0.35),transparent_35%),#0b0a17] p-8 md:p-10">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <h2 className="text-3xl font-black">Download the CRUUZ App</h2>
            <p className="mt-4 max-w-md leading-7 text-white/60">
              Coming soon to iOS and Android. Be the first to experience smarter mobility.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-black/30 px-5 py-3">
                <Apple />
                <div>
                  <p className="text-xs text-white/45">Coming soon to</p>
                  <p className="font-black">App Store</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-black/30 px-5 py-3">
                <span className="text-xl">▶</span>
                <div>
                  <p className="text-xs text-white/45">Coming soon to</p>
                  <p className="font-black">Google Play</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <div className="hidden h-72 w-44 rotate-[-10deg] rounded-[2.5rem] border border-white/15 bg-black p-4 shadow-2xl shadow-violet-900/30 md:block">
              <div className="grid h-full place-items-center rounded-[2rem] bg-gradient-to-br from-violet-950 to-black">
                <div className="text-center">
                  <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-black">
                    C
                  </div>
                  <p className="font-black">CRUUZ</p>
                  <p className="mt-1 text-xs text-white/45">Move Smarter.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white p-4 text-black">
              <QrCode size={90} />
              <p className="mt-3 text-center text-xs font-black">Join launch list</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}