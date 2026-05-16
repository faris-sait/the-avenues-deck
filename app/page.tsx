import { DeckChrome } from "@/components/nav/DeckChrome";
import { Hero } from "@/components/hero/Hero";
import { WhyTheProperty } from "@/components/sections/WhyTheProperty";
import { DistrictMap } from "@/components/sections/DistrictMap";
import { PrestigeLuxury } from "@/components/sections/PrestigeLuxury";
import { GrandAvenue } from "@/components/sections/GrandAvenue";
import { SoKuYouth } from "@/components/sections/SoKuYouth";
import { EventsPlatform } from "@/components/sections/EventsPlatform";
import { Recognition } from "@/components/sections/Recognition";
import { TakeAction } from "@/components/sections/TakeAction";

// Single-page deck — every section is server-rendered and scrollable from load.
// DeckChrome layers the tearable-paper invitation over the deck on first load,
// then fades in the nav + progress rail once the paper is torn (or skipped) away.
export default function Page() {
  return (
    <>
      <DeckChrome />
      <main>
        <Hero />
        <WhyTheProperty />
        <DistrictMap />
        <PrestigeLuxury />
        <GrandAvenue />
        <SoKuYouth />
        <EventsPlatform />
        <Recognition />
        <TakeAction />
      </main>
    </>
  );
}
