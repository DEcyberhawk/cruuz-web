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
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(6);
  const [rideType, setRideType] = useState("CRUUZ GO");

  const estimate = useMemo(() => {
    let hourlyRate = 55;

    if (rideType === "Business") hourlyRate = 72;
    if (rideType === "Airport") hourlyRate = 68;
    if (rideType === "CRUUZ XL") hourlyRate = 78;

    const gross = hourlyRate * hours * days;

    const fuel = gross * 0.22;

    const platform = gross * 0.08;

    const net = gross - fuel - platform;

    const trips = Math.round(hours * days * 2.7);

    return {
      gross,
      fuel,
      platform,
      net,
      trips,
    };
  }, [hours, days, rideType]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 md:p-10">

        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
          Earnings Calculator
        </p>

        <h2 className="mt-3 text-4xl font-black">
          Estimate your weekly earnings.
        </h2>

        <p className="mt-4 max-w-2xl text-white/65 leading-7">
          See an estimated income based on your driving schedule.
          Actual earnings depend on demand, pricing,
          promotions and completed trips.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          <div className="space-y-5">

            <div>
              <label className="mb-2 block font-semibold">
                City
              </label>

              <select
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#161d3a] p-3"
              >
                {cities.map((item)=>(
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Ride Type
              </label>

              <select
                value={rideType}
                onChange={(e)=>setRideType(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#161d3a] p-3"
              >
                {rideTypes.map((item)=>(
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Hours Per Day
              </label>

              <input
                type="range"
                min={2}
                max={12}
                value={hours}
                onChange={(e)=>setHours(Number(e.target.value))}
                className="w-full"
              />

              <p className="mt-2 text-white/70">
                {hours} Hours
              </p>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Days Per Week
              </label>

              <input
                type="range"
                min={1}
                max={7}
                value={days}
                onChange={(e)=>setDays(Number(e.target.value))}
                className="w-full"
              />

              <p className="mt-2 text-white/70">
                {days} Days
              </p>
            </div>

          </div>

          <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8">

            <h3 className="text-3xl font-black">
              Weekly Estimate
            </h3>

            <div className="mt-8 space-y-4">

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
                value={`GHS ${estimate.platform.toFixed(0)}`}
              />

              <div className="mt-6 border-t border-white/20 pt-6">

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

function Stat({
  label,
  value,
  large=false,
}:{
  label:string;
  value:string;
  large?:boolean;
}){

  return(

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