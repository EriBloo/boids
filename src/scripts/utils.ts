export type Vector2d = [number, number];

interface IVectorOperations {
  add(vector1: Vector2d, vector2: Vector2d): Vector2d;
  subtract(vector1: Vector2d, vector2: Vector2d): Vector2d;
  invert(vector: Vector2d): Vector2d;
  length(vector: Vector2d): number;
  cartesianToPolar(vector: Vector2d): Vector2d;
  polarToCartesian(vector: Vector2d): Vector2d;
  zeroVector(): Vector2d;
  multByScalar(vector: Vector2d, scalar: number): Vector2d;
}

export function modulo(value: number, max: number): number {
  return ((value % max) + max) % max;
}

export function radianToDegree(angle: number): number {
  return angle * (180 / Math.PI);
}

export function degreeToRadian(angle: number): number {
  return angle * (Math.PI / 180);
}

export const vectorOperations = ((): IVectorOperations => {
  const add = (first: Vector2d, ...vectors: Vector2d[]): Vector2d => {
    return vectors.reduce((prevVector: Vector2d, currVector: Vector2d) => {
      return [prevVector[0] + currVector[0], prevVector[1] + currVector[1]];
    }, first);
  };
  const subtract = (first: Vector2d, ...vectors: Vector2d[]): Vector2d => {
    return vectors.reduce((prevVector: Vector2d, currVector: Vector2d) => {
      return [prevVector[0] - currVector[0], prevVector[1] - currVector[1]];
    }, first);
  };
  const invert = (vector: Vector2d): Vector2d => {
    return [-vector[0], -vector[1]];
  };
  const length = (vector: Vector2d): number => {
    return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
  };
  const cartesianToPolar = (vector: Vector2d): Vector2d => {
    const r = length(vector);
    let angle = 0;

    if (vector[0] === 0) {
      if (vector[1] > 0) {
        angle = 90;
      } else if (vector[1] < 0) {
        angle = 270;
      }
      return [r, angle];
    }

    angle = Math.atan(vector[1] / vector[0]);

    if (vector[0] < 0) {
      angle += Math.PI;
    }

    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    return [r, radianToDegree(angle)];
  };
  const polarToCartesian = (vector: Vector2d): Vector2d => {
    const x = vector[0] * Math.cos(degreeToRadian(vector[1]));
    const y = vector[0] * Math.sin(degreeToRadian(vector[1]));

    return [x, y];
  };
  const zeroVector = (): Vector2d => {
    return [0, 0];
  };
  const multByScalar = (vector: Vector2d, scalar: number): Vector2d => {
    return [vector[0] * scalar, vector[1] * scalar];
  };

  return {
    add,
    subtract,
    invert,
    length,
    cartesianToPolar,
    polarToCartesian,
    zeroVector,
    multByScalar,
  };
})();
