import { Line } from "../obstacles";
import { Ray } from "../utils/ray";
import { Vector2 } from "../utils/vector";

test("should return false", () => {
  const line = new Line(new Vector2(0, 0), new Vector2(0, 100));
  const ray = new Ray(new Vector2(50, 50), new Vector2(-25, 0));
  expect(ray.cast(line)).toBeTruthy();
});

test("should return true", () => {
  const line = new Line(new Vector2(0, 0), new Vector2(0, 100));
  const ray = new Ray(new Vector2(50, 50), new Vector2(-60, 0));
  expect(ray.cast(line)).toBeTruthy();
});

test("should return true", () => {
  const line = new Line(new Vector2(0, 0), new Vector2(0, 100));
  const ray = new Ray(new Vector2(-50, 50), Vector2.fromPolar(100, 0));
  expect(ray.cast(line)).toBeTruthy();
});
