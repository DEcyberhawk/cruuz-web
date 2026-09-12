"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/branding/Logo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Ride", href: "/ride" },
  { label: "Drive", href: "/drive" },
  { label: "Business", href: "/business" },
  { label: "Safety", href: "/safety" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#101936]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label="CRUUZ Home"
        >
          <Logo size={78} />

          <div className="hidden sm:block">
            <p className="text-lg font-black tracking-tight text-white">
              CRUUZ
            </p>

            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
              Move Smarter
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-xl px-3 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-violet-500/15 text-white"
                    : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {item.label}

                {active && (
                  <span className="absolute inset-x-3 -bottom-[9px] h-[3px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/book"
            aria-current={pathname.startsWith("/book") ? "page" : undefined}
            className={`rounded-2xl px-5 py-3 text-sm font-black text-white transition ${
              pathname.startsWith("/book")
                ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 ring-2 ring-fuchsia-400/40 shadow-lg shadow-fuchsia-900/30"
                : "bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-900/25 hover:scale-[1.02]"
            }`}
          >
            Book a Ride
          </Link>

          <Link
            href="/#download"
            className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[0.09]"
          >
            Get App
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white lg:hidden"
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <div className="border-t border-white/10 bg-[#101936] px-6 pb-6 pt-4 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 font-bold transition ${
                    active
                      ? "border border-violet-400/25 bg-violet-500/15 text-white"
                      : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>

                    {active && (
                      <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                    )}
                  </div>
                </Link>
              );
            })}

            <div className="my-2 border-t border-white/10" />

            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className={`rounded-2xl px-5 py-4 text-center font-black text-white ${
                pathname.startsWith("/book")
                  ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 ring-2 ring-fuchsia-400/30"
                  : "bg-gradient-to-r from-violet-600 to-fuchsia-500"
              }`}
            >
              Book a Ride
            </Link>

            <Link
              href="/#download"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-4 text-center font-black text-white"
            >
              Get CRUUZ App
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}