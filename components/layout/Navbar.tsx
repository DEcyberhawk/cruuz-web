"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/branding/Logo";

const navItems = [
  { label: "Ride", href: "/ride" },
  { label: "Drive", href: "/drive" },
  { label: "Business", href: "/business" },
  { label: "Safety", href: "/safety" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
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
        <Link
          href="/"
          className="flex items-center transition-transform duration-300 hover:scale-105"
          aria-label="CRUUZ Home"
        >
          <Logo size={58} priority />
        </Link>

        <div className="hidden items-center gap-7 text-sm font-semibold text-white/75 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition ${
                  active
                    ? "text-violet-300"
                    : "hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/#download"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#101936] transition hover:scale-105"
        >
          Get App
        </Link>
      </div>
    </nav>
  );
}