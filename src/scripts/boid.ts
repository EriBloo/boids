import { clamp } from "./utils/functions";
import { Vector } from "./utils/vector";

export interface IBoid {
  readonly id: number;
  flockmates: number;
  flockHeading: Vector;
  flockCenter: Vector;
  avoidHeading: Vector;
  position: Vector;
  velocity: Vector;
  copy(): Boid;
  move(): void;
  inSight(boid: Boid): boolean;
  update(): void;
  reset(): void;
}

export class Boid implements IBoid {
  readonly id;
  private x;
  private y;
  private rotation;
  private speed;
  private viewAngle = 120;
  private minSpeed = 4;
  private maxSpeed = 6;
  private maxSteer = 0.5;
  flockmates;
  flockHeading;
  flockCenter;
  avoidHeading;

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
    this.flockmates = 0;
    this.flockHeading = Vector.zero;
    this.flockCenter = Vector.zero;
    this.avoidHeading = Vector.zero;
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

  copy(): Boid {
    return new Boid(this.id, this.x, this.y, this.speed, this.rotation);
  }

  move(): void {
    // move boid
    this.position = this.position.add(this.velocity);
  }

  inSight(boid: Boid): boolean {
    // FIX
    // check if other boid is visible by this boid
    const angle = boid.position.sub(this.position);
    const angleDiff = Math.abs(angle.magnitude - this.rotation);

    if (angleDiff < this.viewAngle || angleDiff > 360 - this.viewAngle) {
      return true;
    }
    return false;
  }

  private steer(vector: Vector): Vector {
    const v = vector.normalized().mult(this.maxSpeed).sub(this.velocity);
    return Vector.clampMagnitude(v, this.maxSteer);
  }

  update(): void {
    let acceleration = Vector.zero;

    if (this.flockmates > 0) {
      this.flockCenter = this.flockCenter
        .div(this.flockmates)
        .sub(this.position);

      this.flockHeading = this.flockHeading.div(this.flockmates);

      const separation = this.steer(this.avoidHeading).mult(1);
      const alignment = this.steer(this.flockHeading).mult(1);
      const cohesion = this.steer(this.flockCenter).mult(1);

      acceleration = acceleration.add(separation).add(alignment).add(cohesion);
    }

    this.velocity = this.velocity.add(acceleration);

    this.velocity = Vector.fromPolar(
      clamp(this.velocity.magnitude, this.minSpeed, this.maxSpeed),
      this.velocity.angle
    );

    this.move();
  }

  reset(): void {
    this.flockmates = 0;
    this.flockHeading = Vector.zero;
    this.flockCenter = Vector.zero;
    this.avoidHeading = Vector.zero;
  }
}
