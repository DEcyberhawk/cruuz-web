export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-white/55 md:flex-row">
        <p>© {new Date().getFullYear()} CRUUZ. Powered by Nexaro.</p>
        <p>info@cruuz.org · support@cruuz.org</p>
      </div>
    </footer>
  );
}