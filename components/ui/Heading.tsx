export default function Heading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      {subtitle && (
        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
          {subtitle}
        </p>
      )}

      <h2 className="mt-3 text-4xl font-black">{title}</h2>
    </div>
  );
}