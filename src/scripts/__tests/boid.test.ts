import Boid from "../boid";

test("boid correct position", () => {
  const boid = new Boid(10, 2, 90);
  expect(boid.position).toEqual([10, 2]);
});
