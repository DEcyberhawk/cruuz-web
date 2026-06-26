import Image from "next/image";

const rides = [
  { name: "CRUUZ GO", text: "Affordable everyday rides.", image: "/assets/vehicles/cruuz-go-front.webp" },
  { name: "CRUUZ XL", text: "More space for groups and families.", image: "/assets/vehicles/cruuz-xl.webp" },
  { name: "Executive", text: "Premium rides for business and comfort.", image: "/assets/vehicles/cruuz-executive.webp" },
  { name: "Airport", text: "Reliable airport transfers.", image: "/assets/vehicles/cruuz-airport.webp" },
];

export default function RideOptions() {
  return (
    <section id="rides" className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
          Ride Options
        </p>
        <h2 className="mt-3 text-4xl font-black">Choose your CRUUZ.</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {rides.map((ride) => (
          <article
            key={ride.name}
            className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09]"
          >
            <div className="relative h-44">
              <Image src={ride.image} alt={ride.name} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-black">{ride.name}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{ride.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}