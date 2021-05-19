import { degreeToRadian, radianToDegree } from "./functions";

interface IVector {
  x: number;
  y: number;
  magnitude: number;
  angle: number;
  add(vector: Vector): Vector;
  sub(vector: Vector): Vector;
  mult(scalar: number): Vector;
  div(scalar: number): Vector;
  invert(): Vector;
  normalize(): Vector;
  copy(): Vector;
}

export class Vector implements IVector {
  x;
  y;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get magnitude(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
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

  add(vector: Vector): Vector {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  sub(vector: Vector): Vector {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  mult(scalar: number): Vector {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  div(scalar: number): Vector {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  invert(): Vector {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  normalize(): Vector {
    const mag = this.magnitude;
    if (mag > 0) {
      this.div(mag);
    }
    return this;
  }

  copy(): Vector {
    return new Vector(this.x, this.y);
  }

  static zero(): Vector {
    return new Vector(0, 0);
  }

  static fromPolar(magnitude: number, angle: number): Vector {
    const x = magnitude * Math.cos(degreeToRadian(angle));
    const y = magnitude * Math.sin(degreeToRadian(angle));

    return new Vector(x, y);
  }
}
