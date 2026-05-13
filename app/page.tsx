"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
const TearableInvitation = dynamic(
  () => import("@/components/hero/TearableInvitation").then((m) => m.TearableInvitation),
  { ssr: false }
);
import { HeroVideo } from "@/components/hero/HeroVideo";
import { TopNav } from "@/components/nav/TopNav";
import { ProgressRail } from "@/components/nav/ProgressRail";
import { WhyTheProperty } from "@/components/sections/WhyTheProperty";
import { DistrictMap } from "@/components/sections/DistrictMap";
import { PrestigeLuxury } from "@/components/sections/PrestigeLuxury";
import { GrandAvenue } from "@/components/sections/GrandAvenue";
import { SoKuYouth } from "@/components/sections/SoKuYouth";
import { EventsPlatform } from "@/components/sections/EventsPlatform";
import { Recognition } from "@/components/sections/Recognition";
import { TakeAction } from "@/components/sections/TakeAction";

const SECTIONS = [
  { id: "reveal", label: "Welcome" },
  { id: "property", label: "The Property" },
  { id: "districts", label: "12 Districts" },
  { id: "prestige", label: "Prestige" },
  { id: "grand-avenue", label: "Grand Avenue" },
  { id: "soku", label: "SoKu" },
  { id: "events", label: "Events" },
  { id: "recognition", label: "Recognition" },
  { id: "action", label: "Take Action" },
] as const;

export default function Page() {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      {!revealed && <TearableInvitation onRevealed={() => setRevealed(true)} />}
      <TopNav visible={revealed} />
      <ProgressRail visible={revealed} />
      <main>
        <section
          id="reveal"
          className="relative min-h-screen overflow-hidden flex items-end p-12"
        >
          <HeroVideo poster="/img/hero-poster.jpg" srcMp4="/video/hero.mp4" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <h1 className="relative display text-6xl md:text-8xl text-bone max-w-4xl leading-[0.95]">
            13 million square feet.
            <br />
            12 districts.
            <br />
            One destination.
          </h1>
        </section>

        {SECTIONS.slice(1).map((s) => {
          if (s.id === "property") return <WhyTheProperty key={s.id} />;
          if (s.id === "districts") return <DistrictMap key={s.id} />;
          if (s.id === "prestige") return <PrestigeLuxury key={s.id} />;
          if (s.id === "grand-avenue") return <GrandAvenue key={s.id} />;
          if (s.id === "soku") return <SoKuYouth key={s.id} />;
          if (s.id === "events") return <EventsPlatform key={s.id} />;
          if (s.id === "recognition") return <Recognition key={s.id} />;
          if (s.id === "action") return <TakeAction key={s.id} />;
          return (
            <section
              key={s.id}
              id={s.id}
              className="min-h-screen flex items-center justify-center border-b border-white/5"
            >
              <h2 className="display text-4xl text-bone/80">{s.label}</h2>
            </section>
          );
        })}
      </main>
    </>
  );
}
