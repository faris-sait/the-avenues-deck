"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

interface Props {
  id: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  tone?: "dark" | "cream" | "vault" | "oxblood";
  index?: string;
}

const toneStyles: Record<NonNullable<Props["tone"]>, string> = {
  dark: "bg-ink text-bone",
  vault: "bg-vault text-bone",
  cream: "bg-cream text-ink",
  oxblood: "bg-[#1a0d0d] text-bone",
};

/**
 * Desktop sections behave like full-screen slides, but mobile sections need to
 * expand naturally so dense content can flow vertically instead of clipping.
 */
export function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  tone = "dark",
  index,
}: Props) {
  return (
    <motion.section
      id={id}
      className={`${toneStyles[tone]} relative flex min-h-screen flex-col overflow-visible px-6 py-12 scroll-mt-20 md:h-screen md:min-h-[640px] md:overflow-hidden md:px-16 md:py-16`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      {index && (
        <div className="absolute top-8 right-6 md:right-16 mono text-[0.55rem] uppercase tracking-[0.4em] opacity-30">
          {index}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto w-full flex flex-col flex-1">
        <header className="mb-8 md:mb-10 max-w-5xl">
          {eyebrow && (
            <motion.p
              variants={fadeUp}
              className="eyebrow mb-4 flex items-center gap-3"
            >
              <span className="lozenge" />
              {eyebrow}
            </motion.p>
          )}
          <motion.h2
            variants={fadeUp}
            className="display text-[clamp(2rem,5vw,4.75rem)] leading-[0.95]"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.div
              variants={fadeUp}
              className={`mt-5 max-w-2xl text-base md:text-lg leading-relaxed ${
                tone === "cream" ? "text-ink/80" : "text-bone/75"
              }`}
            >
              {subtitle}
            </motion.div>
          )}
        </header>
        <motion.div variants={fadeUp} className="flex-1 flex flex-col min-h-0">
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
