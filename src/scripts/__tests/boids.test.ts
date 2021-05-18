import { Boids } from "../boids";

test("test separation", () => {
  const boids = new Boids(2, 100, 100);
  expect(boids.separation(boids.boids[0])).toBeTruthy();
});
