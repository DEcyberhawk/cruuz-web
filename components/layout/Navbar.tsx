"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/branding/Logo";
import { navigation } from "@/lib/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#101936]/90 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        <a
          href="/"
          className="flex items-center transition-transform duration-300 hover:scale-105"
          aria-label="CRUUZ Home"
        >
          <Logo size={58} priority />
        </a>

        <div className="hidden items-center gap-7 text-sm font-semibold text-white/75 md:flex">
          {navigation.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#download"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#101936] transition hover:scale-105"
        >
          Get App
        </a>
      </div>
    </nav>
  );
}