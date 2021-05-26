import { Line, Polygon } from "../obstacles";
import { Vector2 } from "../utils/vector";

test("Polygon contstrucion interrupts with less than 3 points", () => {
  expect(() => new Polygon(new Vector2(0, 10), new Vector2(20, 40))).toThrow();
});

test("Correctly creates Line", () => {
  expect(new Line(new Vector2(2, 2), new Vector2(6, 6)).boundries.length).toBe(
    1
  );
});

test("Correctly creates Polygon", () => {
  expect(
    new Polygon(new Vector2(2, 2), new Vector2(6, 6), new Vector2(14, 7))
      .boundries.length
  ).toBe(3);
});
