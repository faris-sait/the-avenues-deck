"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

interface Props {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  tone?: "dark" | "cream";
}

export function SectionShell({ id, eyebrow, title, children, tone = "dark" }: Props) {
  const bg = tone === "cream" ? "bg-cream text-ink" : "bg-ink text-bone";
  return (
    <motion.section
      id={id}
      className={`${bg} relative min-h-screen px-6 md:px-16 py-24 scroll-mt-20`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="max-w-7xl mx-auto">
        {eyebrow && (
          <motion.p
            variants={fadeUp}
            className="uppercase tracking-[0.3em] text-xs opacity-60 mb-6"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          variants={fadeUp}
          className="display text-5xl md:text-7xl leading-[0.95] mb-12 max-w-4xl"
        >
          {title}
        </motion.h2>
        <motion.div variants={fadeUp}>{children}</motion.div>
      </div>
    </motion.section>
  );
}
