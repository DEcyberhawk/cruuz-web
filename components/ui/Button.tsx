import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  className = "",
}: ButtonProps) {
  let classes =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-black transition-all duration-300 ";

  if (variant === "primary") {
    classes +=
      "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:scale-105 shadow-lg ";
  }

  if (variant === "secondary") {
    classes +=
      "border border-white/20 bg-white/10 backdrop-blur hover:bg-white/15 ";
  }

  if (variant === "ghost") {
    classes += "bg-transparent hover:bg-white/10 ";
  }

  classes += className;

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}