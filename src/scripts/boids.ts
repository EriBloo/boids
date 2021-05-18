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
  private maxSpeed = 4;
  private viewAngle = 80;
  private separationDistance = 20;
  private separationFactor = 1;

  constructor(count: number, domainWidth: number, domainHeight: number) {
    let id = 0;
    this.boids = new Array(count).fill({}).map(() => {
      id += 1;
      return new Boid(
        id,
        Math.random() * domainWidth,
        Math.random() * domainHeight,
        Math.random() * 2 + 2,
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
      velocity[0] > this.maxSpeed ? this.maxSpeed : velocity[0],
      modulo(velocity[1], 360),
    ];
  }

  separation(boid: Boid): Vector2d {
    return this.boids.reduce((vector: Vector2d, other: Boid) => {
      if (boid.id !== other.id) {
        const distanceVector = vectorOperations.subtract(
          other.position,
          boid.position
        );

        if (vectorOperations.length(distanceVector) < this.separationDistance) {
          return vectorOperations.subtract(vector, distanceVector);
        }
      }

      return vector;
    }, vectorOperations.zeroVector());
  }

  cycle(): void {
    this.boids.map((boid) => {
      const separation = this.separation(boid);

      boid.velocity = vectorOperations.add(
        boid.velocity,
        vectorOperations.cartesianToPolar(separation)
      );

      boid.velocity = this.normalizeVelocity(boid.velocity);
    });
    this.boids.map((boid) => {
      boid.move();

      boid.position = this.normalizePosition(boid.position);
    });
  }
}
