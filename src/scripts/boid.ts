import { clamp } from "./utils/functions";
import { Vector2 } from "./utils/vector";
import { settings } from "./settings";

const {
  minSpeed,
  maxSpeed,
  maxSteer,
  separationWeight,
  alignmentWeight,
  cohesionWeight,
  collisionWeight,
} = settings;

export interface IBoid {
  readonly id: number;
  flockmates: number;
  flockHeading: Vector2;
  flockCenter: Vector2;
  avoidHeading: Vector2;
  avoidWalls: Vector2;
  avoidObstacles: Vector2;
  position: Vector2;
  velocity: Vector2;
  copy(): Boid;
  move(): void;
  update(): void;
  reset(): void;
}

export class Boid implements IBoid {
  readonly id;
  private x;
  private y;
  private rotation;
  private speed;
  flockmates;
  flockHeading;
  flockCenter;
  avoidHeading;
  avoidWalls;
  avoidObstacles;

  constructor(id: number, x: number, y: number, rotation: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    this.rotation = rotation;
    this.flockmates = 0;
    this.flockHeading = Vector2.zero;
    this.flockCenter = Vector2.zero;
    this.avoidHeading = Vector2.zero;
    this.avoidWalls = Vector2.zero;
    this.avoidObstacles = Vector2.zero;
  }

  get position(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  set position(vector: Vector2) {
    this.x = vector.x;
    this.y = vector.y;
  }

  get velocity(): Vector2 {
    return Vector2.fromPolar(this.speed, this.rotation);
  }

  set velocity(vector: Vector2) {
    this.speed = vector.magnitude;
    this.rotation = vector.angle;
  }

  copy(): Boid {
    return new Boid(this.id, this.x, this.y, this.rotation);
  }

  move(): void {
    // move boid
    this.position = this.position.add(this.velocity);
  }

  private steer(vector: Vector2): Vector2 {
    const v = vector.normalized().mult(maxSpeed).sub(this.velocity);
    return Vector2.clampMagnitude(v, maxSteer);
  }

  update(): void {
    let acceleration = Vector2.zero;

    if (!Vector2.isZero(this.avoidWalls)) {
      const contain = this.steer(this.avoidWalls);
      acceleration = acceleration.add(contain);
    }

    if (this.flockmates > 0) {
      this.flockCenter = this.flockCenter
        .div(this.flockmates)
        .sub(this.position);

      this.flockHeading = this.flockHeading.div(this.flockmates);

      const separation = this.steer(this.avoidHeading).mult(separationWeight);
      const alignment = this.steer(this.flockHeading).mult(alignmentWeight);
      const cohesion = this.steer(this.flockCenter).mult(cohesionWeight);

      acceleration = acceleration.add(separation).add(alignment).add(cohesion);
    }

    if (!Vector2.isZero(this.avoidObstacles)) {
      const collision = this.steer(this.avoidObstacles).mult(collisionWeight);
      acceleration = acceleration.add(collision);
    }

    this.velocity = this.velocity.add(acceleration);

    this.velocity = Vector2.fromPolar(
      clamp(this.velocity.magnitude, minSpeed, maxSpeed),
      this.velocity.angle
    );

    this.move();
  }

  reset(): void {
    this.flockmates = 0;
    this.flockHeading = Vector2.zero;
    this.flockCenter = Vector2.zero;
    this.avoidHeading = Vector2.zero;
    this.avoidWalls = Vector2.zero;
    this.avoidObstacles = Vector2.zero;
  }
}
