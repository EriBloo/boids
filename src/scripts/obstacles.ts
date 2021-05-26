import { Vector2 } from "./utils/vector";

export class Obstacle {
  boundries: Line[];

  constructor() {
    this.boundries = [];
  }

  get points(): number[] {
    const points = [];

    for (let i = 0; i < this.boundries.length; i += 1) {
      if (i === 0) {
        points.push(this.boundries[i].p0.x);
        points.push(this.boundries[i].p0.y);
      }
      points.push(this.boundries[i].p1.x);
      points.push(this.boundries[i].p1.y);
    }

    return points;
  }
}

export class Line extends Obstacle {
  p0;
  p1;

  constructor(p0: Vector2, p1: Vector2) {
    super();
    this.p0 = p0;
    this.p1 = p1;
    this.boundries.push(this);
  }
}

export class Polygon extends Obstacle {
  // construct polygon from any number of points
  constructor(...points: Vector2[]) {
    if (points.length < 3) {
      throw new Error("Polygon needs minimum of 3 points");
    }

    super();

    for (let i = 1; i <= points.length; i += 1) {
      this.boundries.push(new Line(points[i - 1], points[i % points.length]));
    }
  }
}

export class Square extends Polygon {
  // construct square from 2 diagonal points
  constructor(p1: Vector2, p3: Vector2) {
    const c = new Vector2((p1.x + p3.x) / 2, (p1.y + p3.y) / 2);
    const d = new Vector2((p1.x - p3.x) / 2, (p1.y - p3.y) / 2);
    const p2 = new Vector2(c.x - d.y, c.y + d.y);
    const p4 = new Vector2(c.x + d.y, c.y - d.y);

    super(p1, p2, p3, p4);
  }
}
