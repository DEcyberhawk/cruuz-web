import { Car, Menu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070611]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
            <Car size={24} />
          </div>
          <div>
            <p className="text-xl font-black tracking-tight">CRUUZ</p>
            <p className="text-xs text-white/50">Smart. Secure. Rewarding.</p>
          </div>
        </a>

        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#ride" className="hover:text-white">Ride</a>
          <a href="#drive" className="hover:text-white">Drive</a>
          <a href="#business" className="hover:text-white">Business</a>
          <a href="#safety" className="hover:text-white">Safety</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>

        <a
          href="mailto:info@cruuz.org"
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-violet-100 md:block"
        >
          Contact
        </a>

        <button className="md:hidden">
          <Menu />
        </button>
      </div>
    </nav>
  );
}