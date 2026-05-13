export interface Kpi {
  value: string;
  label: string;
  source: { label: string; url: string };
}

const WIKI = {
  label: "The Avenues (Kuwait) — Wikipedia",
  url: "https://en.wikipedia.org/wiki/The_Avenues_(Kuwait)",
};
const OFFICIAL = {
  label: "The Avenues — Official site",
  url: "https://www.the-avenues.com/kuwait/en/about",
};

export const HEADLINE_KPIS: Kpi[] = [
  { value: "1.2M m²", label: "Total area", source: WIKI },
  { value: "13M sq ft", label: "Gross leasable area", source: WIKI },
  { value: "1,100+", label: "Stores", source: OFFICIAL },
  { value: "12", label: "Themed districts", source: WIKI },
  { value: "17,000", label: "Parking spaces", source: WIKI },
  { value: "30M+", label: "Annual visitors", source: OFFICIAL },
];

export const PROPERTY_FACTS: Kpi[] = [
  {
    value: "#2",
    label: "Largest mall in the world by GLA",
    source: {
      label: "List of largest shopping malls — Wikipedia",
      url: "https://en.wikipedia.org/wiki/List_of_largest_shopping_malls",
    },
  },
  { value: "2007", label: "Inaugurated by the Emir of Kuwait", source: WIKI },
  {
    value: "Gensler",
    label: "Master architect",
    source: { label: "Gensler — The Avenues", url: "https://www.gensler.com/projects/the-avenues" },
  },
  { value: "LEED Silver", label: "Sustainability certification (2025)", source: OFFICIAL },
];
