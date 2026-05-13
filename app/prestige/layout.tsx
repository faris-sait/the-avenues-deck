import Link from "next/link";

export default function PrestigeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-40 bg-ink/60 backdrop-blur-md border-b border-white/5">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-12 py-5">
          <Link href="/" className="display text-lg tracking-wider">
            The Avenues
          </Link>
          <Link
            href="/#districts"
            className="text-xs uppercase tracking-[0.3em] opacity-60 hover:opacity-100"
          >
            ← All districts
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}
