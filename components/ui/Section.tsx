import { ReactNode } from "react";

export default function Section({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {children}
    </section>
  );
}