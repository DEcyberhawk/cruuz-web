"use client";

import { useMemo, useState } from "react";

const cities = [
  "Accra",
  "Kumasi",
  "Takoradi",
  "Tamale",
  "Cape Coast",
];

const rideTypes = [
  "CRUUZ GO",
  "CRUUZ XL",
  "Business",
  "Airport",
];

export default function EarningsCalculator() {
  const [city, setCity] = useState("Accra");
  const [rideType, setRideType] = useState("CRUUZ GO");
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(6);

  const estimate = useMemo(() => {
    let hourlyRate = 55;

    switch (rideType) {
      case "CRUUZ XL":
        hourlyRate = 75;
        break;
      case "Business":
        hourlyRate = 70;
        break;
      case "Airport":
        hourlyRate = 65;
        break;
      default:
        hourlyRate = 55;
    }

    const gross = hourlyRate * hours * days;
    const fuel = gross * 0.22;
    const platformFee = gross * 0.08;
    const net = gross - fuel - platformFee;
    const trips = Math.round(hours * days * 2.7);

    return {
      trips,
      gross,
      fuel,
      platformFee,
      net,
    };
  }, [rideType, hours, days]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8">

        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
          Earnings Calculator
        </p>

        <h2 className="mt-3 text-4xl font-black">
          Estimate your weekly earnings
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-white/65">
          These estimates are illustrative and may vary depending on
          demand, pricing, promotions and completed trips.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* Left */}

          <div className="space-y-6">

            <Field label="City">

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#161d3a] p-3"
              >
                {cities.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

            </Field>

            <Field label="Ride Type">

              <select
                value={rideType}
                onChange={(e) => setRideType(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#161d3a] p-3"
              >
                {rideTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

            </Field>

            <Field label={`Hours Per Day (${hours})`}>

              <input
                type="range"
                min={2}
                max={12}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full"
              />

            </Field>

            <Field label={`Days Per Week (${days})`}>

              <input
                type="range"
                min={1}
                max={7}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full"
              />

            </Field>

          </div>

          {/* Right */}

          <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8">

            <h3 className="text-3xl font-black">
              Weekly Estimate
            </h3>

            <div className="mt-8 space-y-5">

              <Stat
                label="Estimated Trips"
                value={estimate.trips.toString()}
              />

              <Stat
                label="Gross Earnings"
                value={`GHS ${estimate.gross.toFixed(0)}`}
              />

              <Stat
                label="Estimated Fuel"
                value={`GHS ${estimate.fuel.toFixed(0)}`}
              />

              <Stat
                label="Platform Fee"
                value={`GHS ${estimate.platformFee.toFixed(0)}`}
              />

              <div className="border-t border-white/20 pt-5">

                <Stat
                  label="Estimated Net Income"
                  value={`GHS ${estimate.net.toFixed(0)}`}
                  large
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block font-bold text-white">
        {label}
      </label>

      {children}
    </div>
  );
}

function Stat({
  label,
  value,
  large = false,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-white/80">
        {label}
      </span>

      <span
        className={
          large
            ? "text-3xl font-black"
            : "text-xl font-black"
        }
      >
        {value}
      </span>

    </div>
  );
}