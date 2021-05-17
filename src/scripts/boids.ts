import { IBoid, Boid } from "./boid";

import { modulo } from "./utils";

export interface IBoids {
  boids: IBoid[];
}

export class Boids implements IBoids {
  boids: Boid[];
  private count: number;
  private domainWidth: number;
  private domainHeight: number;

  constructor(count: number, domainWidth: number, domainHeight: number) {
    this.boids = new Array(count).fill({}).map(() => {
      return new Boid(
        Math.random() * domainWidth,
        Math.random() * domainHeight,
        Math.random() * 360
      );
    });
    this.count = count;
    this.domainWidth = domainWidth;
    this.domainHeight = domainHeight;

    this.boids.map((boid) => (boid.velocity = Math.random() * 4 + 2));
  }

  normalizePosition(position: [number, number]): [number, number] {
    return [
      modulo(position[0], this.domainWidth),
      modulo(position[1], this.domainHeight),
    ];
  }
  normalizeRotation(rotation: number): number {
    return modulo(rotation, 360);
  }

  cycle(): void {
    this.boids.map((boid) => {
      boid.move();
      boid.rotate(2);
      boid.position = this.normalizePosition(boid.position);
      boid.rotation = this.normalizeRotation(boid.rotation);
    });
  }
}
