import { IBoid, Boid } from "./boid";
import { modulo } from "./utils/functions";
import { Vector2 } from "./utils/vector";
import { settings } from "./settings";

const { numBoids, breakFactor, viewRadius, avoidRadius } = settings;

export interface IBoidsController {
  boids: IBoid[];
  domainWidth: number;
  domainHeight: number;
  update(): void;
}

export class BoidsController implements IBoidsController {
  boids: Boid[];
  private count: number;
  domainWidth: number;
  domainHeight: number;

  constructor(count: number, domainWidth: number, domainHeight: number) {
    this.boids = new Array(count).fill({}).map((_, index) => {
      return new Boid(
        index,
        Math.random() * domainWidth,
        Math.random() * domainHeight,
        Math.random() * 360
      );
    });
    this.count = count;
    this.domainWidth = domainWidth;
    this.domainHeight = domainHeight;
  }

  private normalizePosition(position: Vector2): Vector2 {
    // prevents boids from going out of bounds
    return new Vector2(
      modulo(position.x, this.domainWidth),
      modulo(position.y, this.domainHeight)
    );
  }

  private compute(boid: Boid): void {
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

  update(): void {
    for (const boid of this.boids) {
      boid.reset();

      this.compute(boid);

      boid.update();
      boid.position = this.normalizePosition(boid.position);
    }
  }
}
