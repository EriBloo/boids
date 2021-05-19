import { IBoid, Boid } from "./boid";

import { modulo, clamp } from "./utils/functions";

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
  private maxSpeed = 6;
  private minSpeed = 4;
  private viewRadius = 50;

  constructor(count: number, domainWidth: number, domainHeight: number) {
    this.boids = new Array(count).fill({}).map((_, index) => {
      return new Boid(
        index,
        Math.random() * domainWidth,
        Math.random() * domainHeight,
        Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed,
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
  private normalizeVelocity(velocity: Vector): Vector {
    // locks boids between min and max speed and within 0-359 angle
    return Vector.fromPolar(
      clamp(velocity.magnitude, this.minSpeed, this.maxSpeed),
      modulo(velocity.angle, 360)
    );
  }

  private separation(boid: Boid): Vector {
    // calculates separation between boid and nearby boids
    const viewRadius = this.viewRadius;
    return this.boids.reduce((vector: Vector, other: Boid) => {
      if (boid.id !== other.id) {
        const distanceVector = other.position.sub(boid.position);
        const sqrDst = Math.pow(distanceVector.magnitude, 2);

        if (sqrDst < Math.pow(viewRadius, 2) && boid.visible(other)) {
          return vector.sub(distanceVector.div(sqrDst));
        }
      }

      return vector;
    }, Vector.zero());
  }

  private alignment(boid: Boid): Vector {
    const viewRadius = this.viewRadius;
    return this.boids
      .reduce((vector: Vector, other: Boid) => {
        if (boid.id !== other.id) {
          const distanceVector = other.position.sub(boid.position);
          const sqrDst = Math.pow(distanceVector.magnitude, 2);
          if (sqrDst < Math.pow(viewRadius, 2) && boid.visible(other)) {
            return vector.add(other.velocity);
          }
        }
        return vector;
      }, Vector.zero())
      .div(this.boids.length); // fix
  }

  update(): void {
    this.boids.map((boid) => {
      const separation = this.separation(boid);
      const alignment = this.alignment(boid);

      boid.velocity = boid.velocity.add(separation).add(alignment);

      boid.velocity = this.normalizeVelocity(boid.velocity);
    });
    this.boids.map((boid) => {
      boid.move();
      boid.position = this.normalizePosition(boid.position);
    });
  }
}
