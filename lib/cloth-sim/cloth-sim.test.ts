import { describe, it, expect } from "vitest";
import { Point, Constraint, Cloth } from "./cloth-sim";

describe("Point (Verlet integration)", () => {
  it("applies gravity over a fixed step", () => {
    const p = new Point(0, 0);
    p.update(0.4, 0.99);
    expect(p.y).toBeCloseTo(0.4, 5);
    expect(p.x).toBeCloseTo(0, 5);
  });

  it("preserves inertia (Verlet velocity = current - previous)", () => {
    const p = new Point(10, 0);
    p.px = 9;
    p.py = 0;
    p.update(0, 1);
    expect(p.x).toBeCloseTo(11, 5);
  });

  it("pinned points do not move", () => {
    const p = new Point(5, 5);
    p.pin();
    p.update(10, 1);
    expect(p.x).toBe(5);
    expect(p.y).toBe(5);
  });
});

describe("Constraint", () => {
  it("pulls points toward target distance", () => {
    const a = new Point(0, 0);
    const b = new Point(10, 0);
    const c = new Constraint(a, b, 5);
    c.solve();
    expect(b.x - a.x).toBeCloseTo(5, 5);
  });

  it("flags itself for tearing when stretched past tearDistance", () => {
    const a = new Point(0, 0);
    const b = new Point(100, 0);
    const c = new Constraint(a, b, 5, { tearDistance: 50 });
    c.solve();
    expect(c.torn).toBe(true);
  });
});

describe("Cloth", () => {
  it("creates a grid of points with top row pinned", () => {
    const cloth = new Cloth({
      width: 4,
      height: 3,
      spacing: 10,
      originX: 0,
      originY: 0,
      tearDistance: 60,
    });
    expect(cloth.points).toHaveLength(12);
    expect(cloth.points.slice(0, 4).every((p) => p.pinned)).toBe(true);
    expect(cloth.constraints).toHaveLength(17);
  });

  it("drops constraints flagged as torn during step()", () => {
    const cloth = new Cloth({
      width: 2,
      height: 2,
      spacing: 10,
      originX: 0,
      originY: 0,
      tearDistance: 5,
    });
    cloth.step({ gravity: 50, friction: 1, iterations: 1 });
    expect(cloth.constraints.length).toBeLessThan(4);
  });
});
