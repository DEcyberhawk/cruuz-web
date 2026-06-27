import Image from "next/image";

type LogoProps = {
  size?: number;
  priority?: boolean;
};

export default function Logo({
  size = 70,
  priority = false,
}: LogoProps) {
  return (
    <Image
      src="/assets/logos/CRUUZ_logo.png"
      alt="CRUUZ Logo"
      width={size}
      height={size}
      priority={priority}
      style={{
        width: "auto",
        height: "auto",
      }}
      className="object-contain select-none"
    />
  );
}