/**
 * Verlet cloth simulation, ported to TypeScript from
 * https://github.com/dissimulate/Tearable-Cloth (original by dissimulate).
 *
 * Used as a headless physics module; rendering is handled by the consumer.
 */

export class Point {
  x: number;
  y: number;
  px: number;
  py: number;
  pinned = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
  }

  pin() {
    this.pinned = true;
  }

  update(gravity: number, friction: number) {
    if (this.pinned) return;
    const vx = (this.x - this.px) * friction;
    const vy = (this.y - this.py) * friction;
    this.px = this.x;
    this.py = this.y;
    this.x += vx;
    this.y += vy + gravity;
  }
}

export interface ConstraintOptions {
  tearDistance?: number;
}

export class Constraint {
  a: Point;
  b: Point;
  length: number;
  tearDistance: number;
  torn = false;

  constructor(a: Point, b: Point, length: number, opts: ConstraintOptions = {}) {
    this.a = a;
    this.b = b;
    this.length = length;
    this.tearDistance = opts.tearDistance ?? Infinity;
  }

  solve() {
    const dx = this.a.x - this.b.x;
    const dy = this.a.y - this.b.y;
    const dist = Math.hypot(dx, dy);
    if (dist > this.tearDistance) {
      this.torn = true;
      return;
    }
    const diff = dist === 0 ? 0 : (this.length - dist) / dist;
    const ax = this.a.pinned ? 0 : 0.5;
    const bx = this.b.pinned ? 0 : 0.5;
    const ox = dx * diff;
    const oy = dy * diff;
    this.a.x += ox * ax;
    this.a.y += oy * ax;
    this.b.x -= ox * bx;
    this.b.y -= oy * bx;
  }
}

export interface ClothOptions {
  width: number;
  height: number;
  spacing: number;
  originX: number;
  originY: number;
  tearDistance: number;
}

export interface StepOptions {
  gravity: number;
  friction: number;
  iterations: number;
}

export class Cloth {
  points: Point[] = [];
  constraints: Constraint[] = [];
  width: number;
  height: number;

  constructor(opts: ClothOptions) {
    this.width = opts.width;
    this.height = opts.height;
    for (let y = 0; y < opts.height; y++) {
      for (let x = 0; x < opts.width; x++) {
        const p = new Point(
          opts.originX + x * opts.spacing,
          opts.originY + y * opts.spacing
        );
        if (y === 0) p.pin();
        this.points.push(p);
        if (x > 0) {
          this.constraints.push(
            new Constraint(this.points[this.points.length - 2], p, opts.spacing, {
              tearDistance: opts.tearDistance,
            })
          );
        }
        if (y > 0) {
          this.constraints.push(
            new Constraint(this.points[x + (y - 1) * opts.width], p, opts.spacing, {
              tearDistance: opts.tearDistance,
            })
          );
        }
      }
    }
  }

  step(opts: StepOptions) {
    for (const p of this.points) p.update(opts.gravity, opts.friction);
    for (let i = 0; i < opts.iterations; i++) {
      for (const c of this.constraints) c.solve();
    }
    this.constraints = this.constraints.filter((c) => !c.torn);
  }

  /** Tear any constraint within `radius` of (x,y). Returns number torn. */
  tearAt(x: number, y: number, radius: number) {
    let count = 0;
    for (const c of this.constraints) {
      const mx = (c.a.x + c.b.x) / 2;
      const my = (c.a.y + c.b.y) / 2;
      if (Math.hypot(mx - x, my - y) < radius) {
        c.torn = true;
        count++;
      }
    }
    this.constraints = this.constraints.filter((c) => !c.torn);
    return count;
  }

  /** Fraction of original constraints remaining (1.0 = intact, 0.0 = fully torn). */
  integrity() {
    const original =
      (this.width - 1) * this.height + this.width * (this.height - 1);
    return this.constraints.length / original;
  }
}
