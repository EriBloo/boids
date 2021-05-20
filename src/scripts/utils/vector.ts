import { degreeToRadian, radianToDegree } from "./functions";

interface IVector {
  x: number;
  y: number;
  magnitude: number;
  angle: number;
  add(vector: Vector2): Vector2;
  sub(vector: Vector2): Vector2;
  mult(scalar: number): Vector2;
  div(scalar: number): Vector2;
  invert(): Vector2;
  normalize(): Vector2;
  copy(): Vector2;
}

export class Vector2 implements IVector {
  x;
  y;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get angle(): number {
    if (this.x === 0) {
      if (this.y > 0) {
        return 90;
      } else if (this.y < 0) {
        return 270;
      }
    }

    let angle = Math.atan(this.y / this.x);

    if (this.x < 0) {
      angle += Math.PI;
    }

    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    return radianToDegree(angle);
  }

  add(vector: Vector2): Vector2 {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  sub(vector: Vector2): Vector2 {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  mult(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  div(scalar: number): Vector2 {
    return new Vector2(this.x / scalar, this.y / scalar);
  }

  invert(): Vector2 {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  normalize(): Vector2 {
    const mag = this.magnitude;
    if (mag > 0) {
      this.div(mag);
    }
    return this;
  }

  normalized(): Vector2 {
    const vector = new Vector2(this.x, this.y);
    const mag = vector.magnitude;
    if (mag > 0) {
      vector.div(mag);
    }
    return vector;
  }

  copy(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  static get zero(): Vector2 {
    return new Vector2(0, 0);
  }

  static fromPolar(magnitude: number, angle: number): Vector2 {
    const x = magnitude * Math.cos(degreeToRadian(angle));
    const y = magnitude * Math.sin(degreeToRadian(angle));

    return new Vector2(x, y);
  }

  static clampMagnitude(vector: Vector2, max: number): Vector2 {
    return Vector2.fromPolar(Math.min(vector.magnitude, max), vector.angle);
  }
}
