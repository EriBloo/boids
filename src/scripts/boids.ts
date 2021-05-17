import { IBoid, Boid } from "./boid";

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
  }

  cycle(): void {
    this.boids.map((boid) => {
      boid.move();
    });
  }
}
