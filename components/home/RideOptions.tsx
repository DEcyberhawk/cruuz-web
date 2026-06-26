import Image from "next/image";

const rides = [
  {
    name: "CRUUZ GO",
    text: "Affordable everyday rides.",
    image: "/assets/vehicles/cruuz-go-front.webp",
  },
  {
    name: "CRUUZ XL",
    text: "More space for groups and families.",
    image: "/assets/vehicles/cruuz-xl.webp",
  },
  {
    name: "Executive",
    text: "Premium rides for business and comfort.",
    image: "/assets/vehicles/cruuz-executive.webp",
  },
  {
    name: "Airport",
    text: "Reliable airport transfers.",
    image: "/assets/vehicles/cruuz-airport.webp",
  },
  {
    name: "Business",
    text: "Smart transport for teams and companies.",
    image: "/assets/vehicles/cruuz-business.webp",
  },
  {
    name: "Delivery",
    text: "Fast movement for packages and essentials.",
    image: "/assets/vehicles/cruuz-delivery.webp",
  },
];

export default function RideOptions() {
  return (
    <section id="rides" className="px-6 py-14">
      <div className="mx-auto mb-8 max-w-7xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
          Ride Options
        </p>
        <h2 className="mt-3 text-4xl font-black">Choose your CRUUZ.</h2>
      </div>

      <div className="mx-auto max-w-7xl overflow-x-auto pb-4">
        <div className="flex gap-5">
          {rides.map((ride) => (
            <article
              key={ride.name}
              className="min-w-[270px] max-w-[270px] overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09] md:min-w-[300px] md:max-w-[300px]"
            >
              <div className="relative h-44">
                <Image
                  src={ride.image}
                  alt={ride.name}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="font-black">{ride.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  {ride.text}
                </p>
                <p className="mt-4 inline-flex rounded-full bg-violet-500/20 px-3 py-1 text-xs font-black text-violet-200">
                  Coming Soon
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}