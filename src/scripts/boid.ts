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
  private precision = 2;
  private viewAngle = 120;

  constructor(
    id: number,
    x: number,
    y: number,
    speed: number,
    rotation: number
  ) {
    this.id = id;
    this.x = parseFloat(x.toFixed(this.precision));
    this.y = parseFloat(y.toFixed(this.precision));
    this.speed = speed;
    this.rotation = rotation;
  }

  get position(): [number, number] {
    return [this.x, this.y];
  }

  set position(pos: [number, number]) {
    this.x = parseFloat(pos[0].toFixed(this.precision));
    this.y = parseFloat(pos[1].toFixed(this.precision));
  }

  get velocity(): [number, number] {
    return [this.speed, this.rotation];
  }

  set velocity(vel: [number, number]) {
    this.speed = vel[0];
    this.rotation = vel[1];
  }

  move(): void {
    this.position = vectorOperations.add(
      this.position,
      vectorOperations.polarToCartesian(this.velocity)
    );
  }

  visible(boid: Boid): boolean {
    const angle = vectorOperations.subtract(boid.position, this.position);
    const polarAngle = vectorOperations.cartesianToPolar(angle);
    const angleDiff = Math.abs(polarAngle[1] - this.rotation);

    if (angleDiff < this.viewAngle || angleDiff > 360 - this.viewAngle) {
      return true;
    }
    return false;
  }
}
