import { Vector } from "./utils/vector";

export interface IBoid {
  readonly id: number;
  position: Vector;
  velocity: Vector;
  move(): void;
  visible(boid: Boid): boolean;
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

  get position(): Vector {
    return new Vector(this.x, this.y);
  }

  set position(vector: Vector) {
    this.x = vector.x;
    this.y = vector.y;
  }

  get velocity(): Vector {
    return Vector.fromPolar(this.speed, this.rotation);
  }

  set velocity(vector: Vector) {
    this.speed = vector.magnitude;
    this.rotation = vector.angle;
  }

  move(): void {
    // move boid
    this.position = this.position.add(this.velocity);
  }

  visible(boid: Boid): boolean {
    // check if other boid is visible by this boid
    const angle = boid.position.sub(this.position);
    const angleDiff = Math.abs(angle.magnitude - this.rotation);

    if (angleDiff < this.viewAngle || angleDiff > 360 - this.viewAngle) {
      return true;
    }
    return false;
  }
}
