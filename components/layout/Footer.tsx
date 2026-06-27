import Logo from "@/components/branding/Logo";
import { company } from "@/lib/company";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-white/60 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Logo size={48} />

          <div>
            <p className="font-black text-white">{company.slogan}</p>
            <p className="mt-1 text-sm">
              🇬🇭 {company.origin} • {company.vision}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm md:items-end">
          <div className="flex flex-wrap gap-3 text-white/50">
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <span>•</span>
            <a href={`mailto:${company.supportEmail}`}>
              {company.supportEmail}
            </a>
          </div>

          <p className="text-white/35">
            © {new Date().getFullYear()} {company.name} • Powered by{" "}
            {company.poweredBy}
          </p>
        </div>
      </div>
    </footer>
  );
}