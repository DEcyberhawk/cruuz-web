import Logo from "@/components/branding/Logo";
import { company } from "@/lib/company";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center text-white/60">
        <Logo size={54} />

        <p className="text-lg font-black text-white">{company.slogan}</p>

        <p>🇬🇭 {company.origin}</p>

        <p>{company.vision}</p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/45">
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <span>•</span>
          <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>
        </div>

        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} {company.name} • Powered by{" "}
          {company.poweredBy}
        </p>
      </div>
    </footer>
  );
}