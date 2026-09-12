import Link from "next/link";

const companyLinks = [
  { label: "About CRUUZ", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const policyLinks = [
  { label: "Acceptable Use", href: "/acceptable-use" },
  { label: "Refunds & Cancellations", href: "/refunds-cancellations" },
  { label: "Provider Terms", href: "/provider-terms" },
  { label: "Verification", href: "/verification" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Ride", href: "/ride" },
  { label: "Drive", href: "/drive" },
  { label: "Business", href: "/business" },
  { label: "Safety", href: "/safety" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#061225] text-white">
      <div className="mx-auto max-w-[1500px] px-6 py-9 sm:px-10 lg:px-14">
        {/* MAIN FOOTER */}
        <div className="grid gap-8 xl:grid-cols-[1.05fr_1fr_1.05fr_1.65fr] xl:items-start">
          {/* BRAND */}
          <div className="xl:border-r xl:border-white/10 xl:pr-8">
            <div className="text-2xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                CRUUZ
              </span>
            </div>

            <div className="mt-1 text-[10px] font-black uppercase tracking-[0.32em] text-slate-500">
              Move Smarter
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-extrabold text-white">
                Move Smarter.
              </span>

              <span className="text-sm font-semibold text-slate-300">
                🇬🇭 Proudly Ghanaian
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Built for Africa. Ready for the World.
            </p>
          </div>

          {/* CONTACT */}
          <div className="xl:border-r xl:border-white/10 xl:pr-8">
            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-white">
              Contact CRUUZ
            </h3>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-sm">
                  ✉
                </span>

                <span className="text-sm text-slate-300">
                  info@cruuz.org
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-sm">
                  ✉
                </span>

                <span className="text-sm text-slate-300">
                  support@cruuz.org
                </span>
              </div>
            </div>
          </div>

          {/* HOTLINES */}
          <div className="xl:border-r xl:border-white/10 xl:pr-8">
            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-white">
              Customer Hotlines
            </h3>

            <div className="mt-4 space-y-3">
              <Hotline
                network="MTN"
                number="+233 55 155 0335"
                href="tel:+233551550335"
              />

              <Hotline
                network="Telecel"
                number="+233 30 398 3906"
                href="tel:+233303983906"
              />

              <Hotline
                network="AirtelTigo"
                number="+233 27 112 8889"
                href="tel:+233271128889"
              />
            </div>
          </div>

          {/* COMPANY + LEGAL */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-white">
              Company & Legal
            </h3>

            <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              <div className="space-y-3">
                {companyLinks.map((item) => (
                  <FooterLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                  />
                ))}
              </div>

              <div className="space-y-3">
                {policyLinks.map((item) => (
                  <FooterLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LOWER BAR */}
        <div className="mt-8 border-t border-white/10 pt-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xs text-slate-500">
              © 2026 CRUUZ Logistics Ltd. All rights reserved.
            </p>

            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs font-semibold text-slate-400 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="text-xs text-slate-500">
              Powered by{" "}
              <span className="font-bold text-violet-400">
                Nexaro
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Hotline({
  network,
  number,
  href,
}: {
  network: string;
  number: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between gap-4 rounded-lg py-1"
    >
      <span className="text-xs font-black uppercase tracking-wide text-slate-500">
        {network}
      </span>

      <span className="text-sm font-semibold text-slate-300 transition group-hover:text-white">
        {number}
      </span>
    </a>
  );
}

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 text-sm text-slate-400 transition hover:text-white"
    >
      <span>{label}</span>

      <span className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-violet-400">
        →
      </span>
    </Link>
  );
}