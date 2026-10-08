import Image from "next/image";

type LogoProps = {
  width?: number;
  priority?: boolean;
};

/** The approved full CRUUZ wordmark and tagline, preserved without cropping. */
export default function Logo({ width = 204, priority = false }: LogoProps) {
  return (
    <Image
      src="/assets/brand/cruuz-full-logo.png"
      alt="CRUUZ — A better way to get there."
      width={2048}
      height={682}
      priority={priority}
      sizes={`${width}px`}
      style={{ width, maxWidth: "100%", height: "auto" }}
      className="block object-contain select-none"
    />
  );
}
