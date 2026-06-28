import DriverStatusPanel from "@/components/drive/status/DriverStatusPanel";

export default function DriverStatusPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#101936] px-4 py-24 text-white md:px-6 md:py-32">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      </div>

      <div className="relative">
        <DriverStatusPanel />
      </div>
    </main>
  );
}