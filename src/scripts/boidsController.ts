import { Boid } from "./boid";
import { Obstacle, Square, Polygon, Line } from "./obstacles";
import { Vector2 } from "./utils/vector";
import { settings } from "./settings";

const { numBoids, breakFactor, viewRadius, avoidRadius } = settings;

export interface IBoidsController {
  boids: Boid[];
  obstacles: Obstacle[];
  domainWidth: number;
  domainHeight: number;
  update(): void;
}

export class BoidsController implements IBoidsController {
  boids: Boid[];
  obstacles: Obstacle[];
  domainWidth: number;
  domainHeight: number;

  constructor(count: number, domainWidth: number, domainHeight: number) {
    this.boids = new Array(count).fill({}).map((_, index) => {
      let boid;
      do {
        boid = new Boid(
          index,
          Math.random() * (domainWidth + 400) - 200,
          Math.random() * (domainHeight + 400) - 200,
          Math.random() * 360
        );
      } while (
        boid.position.x > 0 &&
        boid.position.x < domainWidth &&
        boid.position.y > 0 &&
        boid.position.y < domainHeight
      );
      return boid;
    });
    this.obstacles = [
      new Polygon(
        new Vector2(domainWidth / 2 - 50, 200),
        new Vector2(domainWidth / 2 - 50, domainHeight - 200),
        new Vector2(domainWidth / 2 + 50, domainHeight - 200),
        new Vector2(domainWidth / 2 + 50, 200)
      ),
    ];
    this.domainWidth = domainWidth;
    this.domainHeight = domainHeight;
  }

  private computeAvoidWalls(boid: Boid): void {
    if (boid.position.x < viewRadius) {
      boid.avoidWalls.x = 100;
    } else if (boid.position.x > this.domainWidth - viewRadius) {
      boid.avoidWalls.x = -100;
    }
    if (boid.position.y < viewRadius) {
      boid.avoidWalls.y = 100;
    } else if (boid.position.y > this.domainHeight - viewRadius) {
      boid.avoidWalls.y = -100;
    }
  }

  private computeInterractionWithOther(boid: Boid): void {
    for (const other of this.boids) {
      if (boid.flockmates > numBoids * breakFactor) {
        // naive way to improve performance at the cost of accuracy
        break;
      }
      if (boid.id !== other.id) {
        const dstVector = other.position.sub(boid.position);
        const sqrDst = dstVector.x * dstVector.x + dstVector.y * dstVector.y;

        if (sqrDst < viewRadius * viewRadius) {
          boid.flockmates += 1;
          boid.flockHeading = boid.flockHeading.add(other.velocity);
          boid.flockCenter = boid.flockCenter.add(other.position);

          if (sqrDst < avoidRadius * avoidRadius) {
            boid.avoidHeading = boid.avoidHeading.sub(dstVector);
          }
        }
      }
    }
  }

  private compute(boid: Boid): void {
    this.computeAvoidWalls(boid);

    this.computeInterractionWithOther(boid);
  }

  update(): void {
    for (const boid of this.boids) {
      boid.reset();

      this.compute(boid);

      boid.update();
    }
  }
}
