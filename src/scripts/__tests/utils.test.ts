import { vectorOperations } from "../utils";

test("add vectors", () => {
  expect(vectorOperations.add([8, 13], [26, 7])).toEqual([34, 20]);
});

test("invert vectors", () => {
  expect(vectorOperations.invert([8, 13])).toEqual([-8, -13]);
});

test("subtract vectors", () => {
  expect(vectorOperations.subtract([12, 2], [4, 5])).toEqual([8, -3]);
});

test("polar to cartesian", () => {
  expect(vectorOperations.polarToCartesian([120, -45])[0]).toBeCloseTo(
    84.85,
    2
  );
  expect(vectorOperations.polarToCartesian([120, -45])[1]).toBeCloseTo(
    -84.85,
    2
  );
});

test("cartesian to polar", () => {
  expect(vectorOperations.cartesianToPolar([184.85, 88.36])[0]).toBeCloseTo(
    204.88,
    2
  );
  expect(vectorOperations.cartesianToPolar([184.85, 88.36])[1]).toBeCloseTo(
    25.5,
    1
  );
});
