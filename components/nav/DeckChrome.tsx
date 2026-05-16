"use client";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { TopNav } from "@/components/nav/TopNav";
import { ProgressRail } from "@/components/nav/ProgressRail";

// The invitation runs a Verlet cloth simulation on a <canvas> and touches
// `window`/`requestAnimationFrame`, so it is client-only — never server-rendered.
const TearableInvitation = dynamic(
  () =>
    import("@/components/hero/TearableInvitation").then(
      (m) => m.TearableInvitation,
    ),
  { ssr: false },
);

/**
 * Persistent deck chrome: the tearable-paper invitation that gates the deck on
 * first load, plus the top nav and progress rail. The nav stays hidden behind
 * the invitation and fades in only once the viewer tears — or skips — the
 * paper away.
 */
export function DeckChrome() {
  const [revealed, setRevealed] = useState(false);
  const reveal = useCallback(() => setRevealed(true), []);

  return (
    <>
      {!revealed && <TearableInvitation onRevealed={reveal} />}
      <TopNav visible={revealed} />
      <ProgressRail visible={revealed} />
    </>
  );
}
