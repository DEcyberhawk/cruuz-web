import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

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
  className,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-black transition-all duration-300",
    {
      "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-700/25 hover:-translate-y-0.5":
        variant === "primary",

      "border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/15":
        variant === "secondary",

      "bg-transparent text-white hover:bg-white/10":
        variant === "ghost",
    },
    className
  );

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}