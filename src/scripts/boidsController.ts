import { IBoid, Boid } from "./boid";

import { modulo } from "./utils/functions";

import { Vector } from "./utils/vector";

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
  private viewRadius = 50;
  private avoidRadius = 20;

  constructor(count: number, domainWidth: number, domainHeight: number) {
    this.boids = new Array(count).fill({}).map((_, index) => {
      return new Boid(
        index,
        Math.random() * domainWidth,
        Math.random() * domainHeight,
        3,
        Math.random() * 360
      );
    });
    this.count = count;
    this.domainWidth = domainWidth;
    this.domainHeight = domainHeight;
  }

  private normalizePosition(position: Vector): Vector {
    // prevents boids from going out of bounds
    return new Vector(
      modulo(position.x, this.domainWidth),
      modulo(position.y, this.domainHeight)
    );
  }

  private compute(boid: Boid): void {
    for (const other of this.boids) {
      if (boid.id !== other.id) {
        const dstVector = other.position.sub(boid.position);

        if (dstVector.magnitude < this.viewRadius) {
          boid.flockmates += 1;
          boid.flockHeading = boid.flockHeading.add(other.velocity);
          boid.flockCenter = boid.flockCenter.add(other.position);

          if (dstVector.magnitude < this.avoidRadius) {
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
