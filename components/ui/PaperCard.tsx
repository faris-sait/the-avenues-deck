export function PaperCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative bg-cream text-ink p-8 md:p-10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(160deg, #f1e8d5 0%, #e2d6b8 100%)",
      }}
    >
      {/* Corner ticks */}
      <span className="absolute top-3 left-3 block h-3 w-3 border-t border-l border-ink/30" />
      <span className="absolute top-3 right-3 block h-3 w-3 border-t border-r border-ink/30" />
      <span className="absolute bottom-3 left-3 block h-3 w-3 border-b border-l border-ink/30" />
      <span className="absolute bottom-3 right-3 block h-3 w-3 border-b border-r border-ink/30" />

      {/* Subtle inner stroke */}
      <span className="pointer-events-none absolute inset-2 border border-ink/10" />

      <div className="relative">{children}</div>
    </div>
  );
}
