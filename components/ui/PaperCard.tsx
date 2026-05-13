export function PaperCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-cream text-ink p-8 md:p-10 rounded-sm shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] ${className}`}
      style={{ backgroundImage: "linear-gradient(180deg, #f4ede4 0%, #ece4d6 100%)" }}
    >
      {children}
    </div>
  );
}
