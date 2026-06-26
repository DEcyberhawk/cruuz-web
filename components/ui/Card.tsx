import { ReactNode } from "react";

export default function Card({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.06] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]">
      {children}
    </div>
  );
}