import Logo from "@/components/branding/Logo";
export default function Footer() {
  return (
   <footer className="border-t border-white/10 px-6 py-10">
  <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-center text-white/60">

    <Logo size={46} />

    <p className="text-lg font-bold text-white">
      Move Smarter.
    </p>

    <p>
      🇬🇭 Proudly Ghanaian
    </p>

    <p>
      Built for Africa. Ready for the World.
    </p>

    <p className="text-sm text-white/45">
      © {new Date().getFullYear()} CRUUZ • Powered by Nexaro
    </p>

  </div>
</footer>
  );
}