"use client";
import { useCallback, useState } from "react";
import { TopNav } from "@/components/nav/TopNav";
import { ProgressRail } from "@/components/nav/ProgressRail";
import { TearableInvitation } from "@/components/hero/TearableInvitation";

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
