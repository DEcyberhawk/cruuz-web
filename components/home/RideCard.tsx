import Image from "next/image";
import Link from "next/link";

type RideCardProps = {
  name: string;
  text: string;
  image: string;
  meta: string;
  status: string;
  href: string;
};

export default function RideCard({
  name,
  text,
  image,
  meta,
  status,
  href,
}: RideCardProps) {
  return (
    <Link
      href={href}
      className="block min-w-[280px] snap-start md:min-w-[320px]"
      aria-label={`${status}: ${name}`}
    >
      <article className="h-full overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.09]">
        <div className="relative h-44 bg-[#0b1026]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition duration-500 hover:scale-105"
          />
        </div>

        <div className="p-5">
          <div className="mb-3 inline-flex rounded-full bg-violet-500/20 px-3 py-1 text-xs font-black text-violet-200">
            {status}
          </div>

          <h3 className="text-xl font-black">{name}</h3>

          <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
            {meta}
          </p>
        </div>
      </article>
    </Link>
  );
}