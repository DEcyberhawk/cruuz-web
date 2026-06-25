export function Footer() {
  return (
    <footer id="more" className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-black">
              C
            </div>
            <p className="text-xl font-black">CRUUZ</p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-7 text-white/55">
            Move Smarter. Live Better.
          </p>
        </div>

        <FooterCol title="Platform" items={["Ride", "Drive", "Business", "Fleet", "Airport", "Delivery"]} />
        <FooterCol title="Company" items={["About Us", "Careers", "News", "Contact"]} />
        <FooterCol title="Support" items={["Help Center", "Safety", "Terms of Service", "Privacy Policy"]} />
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-white/40">
        © {new Date().getFullYear()} CRUUZ. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-black">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm text-white/55">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}