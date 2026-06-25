import { ChevronDown } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05050d]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-black">
            C
          </div>
          <span className="text-xl font-black tracking-tight">CRUUZ</span>
        </a>

        <div className="hidden items-center gap-9 text-sm font-semibold text-white/75 md:flex">
          <a href="#ride" className="hover:text-white">Ride</a>
          <a href="#drive" className="hover:text-white">Drive</a>
          <a href="#business" className="hover:text-white">Business</a>
          <a href="#safety" className="hover:text-white">Safety</a>
          <a href="#more" className="inline-flex items-center gap-1 hover:text-white">
            More <ChevronDown size={15} />
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="mailto:info@cruuz.org"
            className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-black shadow-lg shadow-violet-600/20"
          >
            Join Launch List
          </a>
          <a
            href="mailto:support@cruuz.org"
            className="rounded-xl border border-white/20 px-5 py-3 text-sm font-black hover:bg-white/10"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}