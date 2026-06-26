import Image from "next/image";

type LogoProps = {
  size?: number;
  priority?: boolean;
};

export default function Logo({ size = 70, priority = false }: LogoProps) {
  return (
    <Image
      src="/assets/logos/CRUUZ_logo.png"
      alt="CRUUZ"
      width={size}
      height={size}
      priority={priority}
      className="h-auto w-auto object-contain"
    />
  );
}