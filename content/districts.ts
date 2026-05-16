export interface District {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  /** SVG coordinates within a 1000x600 viewBox for the district map. */
  shape: { x: number; y: number; w: number; h: number };
  source: { label: string; url: string };
}

const WIKI = {
  label: "The Avenues (Kuwait) — Wikipedia",
  url: "https://en.wikipedia.org/wiki/The_Avenues_(Kuwait)",
};

/**
 * District positions are arranged on a clean two-tier grid:
 *
 *   Tier 1 (anchor districts, y=80, h=120):
 *     1st Ave · 2nd Ave · Prestige · Grand Ave · Electra · [Forum east]
 *
 *   Tier 2 (lifestyle districts, y=240, h=120):
 *     SoKu · The Mall · The Souk · The Arcades · Grand Plaza · [Gardens east]
 *
 *   Each tier has five 150-wide cells (x=50, 220, 390, 560, 730) plus a
 *   narrower eastern services cell (x=910, w=90). All boxes share the same y
 *   and h within a tier so the plan reads as a deliberate composition, not a
 *   scatter.
 */
export const DISTRICTS: District[] = [
  {
    id: "first-avenue",
    name: "1st Avenue",
    tagline: "Where it began.",
    description: "The original concourse that opened in 2007. High-traffic mid-tier retail and gateway storefronts.",
    features: ["Founding district", "Direct main entrance", "Anchor footfall"],
    shape: { x: 50, y: 80, w: 150, h: 120 },
    source: WIKI,
  },
  {
    id: "second-avenue",
    name: "2nd Avenue",
    tagline: "Everyday luxury.",
    description: "Opened 2008. Mid-to-premium retail, lifestyle, and accessible fashion.",
    features: ["Premium mid-tier", "Strong foot traffic"],
    shape: { x: 220, y: 80, w: 150, h: 120 },
    source: WIKI,
  },
  {
    id: "prestige",
    name: "Prestige",
    tagline: "The largest luxury destination in Kuwait.",
    description: "Home to global maisons and luxury flagships. A dedicated luxury concourse with concierge service.",
    features: ["Top luxury maisons", "Concierge experience", "Highest dwell time"],
    shape: { x: 390, y: 80, w: 150, h: 120 },
    source: WIKI,
  },
  {
    id: "grand-avenue",
    name: "Grand Avenue",
    tagline: "A European boulevard, climate-controlled.",
    description: "A 70-meter ETFE Circus dome anchors this stone-paved, tree-lined boulevard of dining, cafés, and signature retail.",
    features: ["70m ETFE Circus dome", "Tree-lined boulevard", "Premier F&B"],
    shape: { x: 560, y: 80, w: 150, h: 120 },
    source: WIKI,
  },
  {
    id: "soku",
    name: "SoKu",
    tagline: "Kuwait's SoHo.",
    description: "Young, trend-led brands, lifestyle technology, and youth culture, inspired by New York's SoHo district.",
    features: ["Youth lifestyle", "Tech & streetwear"],
    shape: { x: 50, y: 240, w: 150, h: 120 },
    source: WIKI,
  },
  {
    id: "the-mall",
    name: "The Mall",
    tagline: "The everyday destination.",
    description: "Family-oriented retail, services, and everyday essentials.",
    features: ["Family retail", "Essential services"],
    shape: { x: 220, y: 240, w: 150, h: 120 },
    source: WIKI,
  },
  {
    id: "the-souk",
    name: "The Souk",
    tagline: "Tradition, reimagined.",
    description: "A contemporary take on the traditional Kuwaiti marketplace — perfumeries, jewelers, and heritage.",
    features: ["Heritage retail", "Perfumery & jewelry"],
    shape: { x: 390, y: 240, w: 150, h: 120 },
    source: WIKI,
  },
  {
    id: "the-arcades",
    name: "The Arcades",
    tagline: "Connected luxury.",
    description: "Opened 2018. Premium passageways linking the broader complex.",
    features: ["2018 expansion", "Premium connector"],
    shape: { x: 560, y: 240, w: 150, h: 120 },
    source: WIKI,
  },
  {
    id: "grand-plaza",
    name: "Grand Plaza",
    tagline: "The stage.",
    description: "A grand events space hosting concerts, brand activations, cultural festivals, and seasonal programming.",
    features: ["Event venue", "Concert capacity", "Brand activation space"],
    shape: { x: 730, y: 240, w: 150, h: 120 },
    source: WIKI,
  },
  {
    id: "electra",
    name: "Electra",
    tagline: "Lit up.",
    description: "Opened 2018. Hospitality, dining, and evening entertainment.",
    features: ["Evening entertainment", "Hospitality"],
    shape: { x: 730, y: 80, w: 150, h: 120 },
    source: WIKI,
  },
  {
    id: "the-forum",
    name: "The Forum",
    tagline: "Where business meets retail.",
    description: "Opened 2018. Office and commercial integration with the retail platform.",
    features: ["Office & commercial", "Mixed-use"],
    shape: { x: 900, y: 80, w: 90, h: 120 },
    source: WIKI,
  },
  {
    id: "the-gardens",
    name: "The Gardens",
    tagline: "Open air, all year.",
    description: "Opened 2018. Outdoor-feel dining and leisure with planted landscapes.",
    features: ["Landscaped leisure", "Outdoor dining feel"],
    shape: { x: 900, y: 240, w: 90, h: 120 },
    source: WIKI,
  },
];
