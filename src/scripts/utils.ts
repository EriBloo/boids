export function modulo(value: number, max: number): number {
  return ((value % max) + max) % max;
}
