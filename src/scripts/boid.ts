import { vectorOperations } from "./utils";

export interface IBoid {
  readonly id: number;
  position: [number, number];
  velocity: [number, number];
  move(): void;
}

export class Boid implements IBoid {
  readonly id;
  private x;
  private y;
  private rotation;
  private speed;
  private viewAngle = 120;

  constructor(
    id: number,
    x: number,
    y: number,
    speed: number,
    rotation: number
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.rotation = rotation;
  }

  get position(): [number, number] {
    return [this.x, this.y];
  }

  set position(pos: [number, number]) {
    [this.x, this.y] = pos;
  }

  get velocity(): [number, number] {
    return [this.speed, this.rotation];
  }

  set velocity(vel: [number, number]) {
    [this.speed, this.rotation] = vel;
  }

  move(): void {
    // move boid
    this.position = vectorOperations.add(
      this.position,
      vectorOperations.polarToCartesian(this.velocity)
    );
  }

  visible(boid: Boid): boolean {
    // check if other boid is visible by this boid
    const angle = vectorOperations.subtract(boid.position, this.position);
    const polarAngle = vectorOperations.cartesianToPolar(angle);
    const angleDiff = Math.abs(polarAngle[1] - this.rotation);

    if (angleDiff < this.viewAngle || angleDiff > 360 - this.viewAngle) {
      return true;
    }
    return false;
  }
}
