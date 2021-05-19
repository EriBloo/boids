import { IBoid, Boid } from "./boid";

import { Vector2d, modulo, vectorOperations } from "./utils";

export interface IBoids {
  boids: IBoid[];
  domainWidth: number;
  domainHeight: number;
}

export class Boids implements IBoids {
  boids: Boid[];
  private count: number;
  domainWidth: number;
  domainHeight: number;
  private maxSpeed = 6;
  private minSpeed = 4;
  private separationDistance = 50;

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

  private normalizePosition(position: [number, number]): [number, number] {
    return [
      modulo(position[0], this.domainWidth),
      modulo(position[1], this.domainHeight),
    ];
  }
  private normalizeVelocity(velocity: [number, number]): [number, number] {
    return [
      velocity[0] > this.maxSpeed
        ? this.maxSpeed
        : velocity[0] < this.minSpeed
        ? this.minSpeed
        : velocity[0],
      modulo(velocity[1], 360),
    ];
  }

  separation(boid: Boid): Vector2d {
    const separationDistance = this.separationDistance;
    return this.boids.reduce((vector: Vector2d, other: Boid) => {
      if (boid.id !== other.id) {
        const separationVector = vectorOperations.subtract(
          other.position,
          boid.position
        );
        const sqrDst = Math.pow(vectorOperations.length(separationVector), 2);

        if (sqrDst < Math.pow(separationDistance, 2) && boid.visible(other)) {
          return vectorOperations.subtract(
            vector,
            vectorOperations.multByScalar(separationVector, 1 / sqrDst)
          );
        }
      }

      return vector;
    }, vectorOperations.zeroVector());
  }

  cycle(): void {
    this.boids.map((boid) => {
      const separation = this.separation(boid);

      boid.velocity = vectorOperations.cartesianToPolar(
        vectorOperations.add(
          vectorOperations.polarToCartesian(boid.velocity),
          separation
        )
      );

      boid.velocity = this.normalizeVelocity(boid.velocity);
    });
    this.boids.map((boid) => {
      boid.move();

      boid.position = this.normalizePosition(boid.position);
    });
  }
}
