import { Vector2 } from "./vector";
import { Line, Obstacle } from "../obstacles";

export class Ray {
  pos;
  dir;

  constructor(pos: Vector2, dir: Vector2) {
    this.pos = pos;
    this.dir = dir;
  }

  cast(line: Line): boolean {
    // casts ray on the line and returns true if they cross
    const x1 = line.p0.x;
    const y1 = line.p0.y;
    const x2 = line.p1.x;
    const y2 = line.p1.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denominator === 0) {
      return false;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return true;
    }

    return false;
  }

  obstacleCollision(obstacle: Obstacle): boolean {
    for (const wall of obstacle.boundries) {
      if (this.cast(wall)) {
        return true;
      }
    }
    return false;
  }
}
