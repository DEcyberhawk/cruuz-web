export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#101936]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#" className="text-2xl font-black">
          CRUUZ
        </a>

        <div className="flex items-center gap-6 text-sm font-semibold text-white/75">
          <a href="#rides" className="hover:text-white">Ride</a>
          <a href="#download" className="hover:text-white">Download</a>
          <a href="mailto:info@cruuz.org" className="hover:text-white">Contact</a>
        </div>
      </div>
    </nav>
  );
}