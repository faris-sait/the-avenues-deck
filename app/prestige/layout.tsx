import Link from "next/link";

export default function PrestigeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-ink/70 border-b border-bone/10">
        <div className="mx-auto max-w-[1500px] flex items-center justify-between px-6 md:px-12 py-5 text-bone">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="lozenge group-hover:rotate-90 transition-transform duration-700" />
            <span className="display text-lg tracking-tight">The Avenues</span>
            <span className="mono text-[0.55rem] uppercase tracking-[0.4em] text-bone/40 hidden md:inline">
              · Prestige Module
            </span>
          </Link>
          <Link
            href="/#districts"
            className="group inline-flex items-center gap-3 mono text-[0.6rem] uppercase tracking-[0.4em] text-bone/65 hover:text-gold transition-colors"
          >
            <span aria-hidden>←</span>
            <span>All districts</span>
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}
