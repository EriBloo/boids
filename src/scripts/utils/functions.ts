export function modulo(value: number, max: number): number {
  return ((value % max) + max) % max;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function radianToDegree(angle: number): number {
  return angle * (180 / Math.PI);
}

export function degreeToRadian(angle: number): number {
  return angle * (Math.PI / 180);
}
