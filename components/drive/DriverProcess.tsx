const steps = [
  [
    "1",
    "Apply",
    "Submit your basic driver and vehicle details.",
  ],
  [
    "2",
    "Verify",
    "Complete document, identity and vehicle verification.",
  ],
  [
    "3",
    "Top Up Wallet",
    "Deposit a minimum of GHS 20 into your CRUUZ Driver Wallet. This minimum balance is required before your account can go online and start receiving ride requests.",
  ],
  [
    "4",
    "Go Online",
    "Once approved and your minimum wallet balance is available, switch online and begin accepting rides.",
  ],
];

export default function DriverProcess() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-sm font-black uppercase tracking-[0.35em] text-violet-300">
          Onboarding Process
        </p>

        <h2 className="mt-4 text-center text-4xl font-black">
          Start driving in 4 simple steps
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center leading-7 text-white/65">
          Join thousands of professional drivers on CRUUZ through a secure,
          transparent and fully verified onboarding process.
        </p>

        <div className="mt-14 space-y-6">
          {steps.map(([number, title, text], index) => (
            <div key={title} className="relative flex gap-6">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xl font-black text-white shadow-lg shadow-violet-700/30">
                  {number}
                </div>

                {index < steps.length - 1 && (
                  <div className="mt-3 h-16 w-[2px] bg-white/15" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.05] p-6 transition duration-300 hover:border-violet-500/40 hover:bg-white/[0.08]">
                <h3 className="text-2xl font-black text-white">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-white/65">
                  {text}
                </p>

                {title === "Top Up Wallet" && (
                  <div className="mt-5 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4">
                    <p className="font-bold text-yellow-300">
                      Minimum Wallet Balance Required
                    </p>

                    <p className="mt-2 text-sm leading-6 text-yellow-100/90">
                      Drivers must maintain a minimum balance of{" "}
                      <span className="font-black">GHS 20</span> before they can
                      go online and receive ride requests.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}