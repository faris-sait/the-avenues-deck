import { describe, it, expect } from "vitest";
import { DISTRICTS } from "./districts";

describe("DISTRICTS", () => {
  it("has all 12 official districts", () => {
    expect(DISTRICTS).toHaveLength(12);
  });
  it("every district has id, name, tagline, source", () => {
    for (const d of DISTRICTS) {
      expect(d.id).toMatch(/^[a-z0-9-]+$/);
      expect(d.name.length).toBeGreaterThan(0);
      expect(d.tagline.length).toBeGreaterThan(0);
      expect(d.source.url).toMatch(/^https?:\/\//);
    }
  });
  it("ids are unique", () => {
    const ids = DISTRICTS.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
