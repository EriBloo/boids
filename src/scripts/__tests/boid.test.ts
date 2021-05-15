import Boid from "../boid";

test("returns correct position", () => {
  const boid = new Boid(10, 2, 90);
  expect(boid.position).toEqual([10, 2]);
});

test("sets correct rotation", () => {
  const boid = new Boid(2, 2, 243);
  boid.rotate(23);
  expect(boid.rotation).toBe(266);
  boid.rotate(-116);
  expect(boid.rotation).toBe(150);
});
