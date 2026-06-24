import { Car } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Car size={24} />
            </div>
            <div>
              <p className="text-xl font-black">CRUUZ</p>
              <p className="text-xs text-white/50">Powered by Nexaro</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
            Smart mobility for riders, drivers, businesses, fleets, and future cities.
          </p>
        </div>

        <div>
          <h3 className="font-black">Platform</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/55">
            <a href="#ride">Ride</a>
            <a href="#drive">Drive</a>
            <a href="#business">Business</a>
            <a href="#fleet">Fleet</a>
          </div>
        </div>

        <div>
          <h3 className="font-black">Company</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/55">
            <a href="mailto:info@cruuz.org">info@cruuz.org</a>
            <a href="mailto:support@cruuz.org">support@cruuz.org</a>
            <a href="mailto:support@cruuz.org">Support</a>
            <a href="#safety">Safety</a>
          </div>
        </div>

        <div>
          <h3 className="font-black">Launch</h3>
          <p className="mt-4 text-sm leading-7 text-white/55">
            CRUUZ public website is live. Rider, driver, and business tools are coming next.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row">
        <p>© {new Date().getFullYear()} CRUUZ. All rights reserved.</p>
        <p>Smart. Secure. Rewarding.</p>
      </div>
    </footer>
  );
}