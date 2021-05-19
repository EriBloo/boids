import { BoidsController } from "../boidsController";

test("test separation", () => {
  const boids = new BoidsController(2, 100, 100);
  expect(boids.separation(boids.boids[0])).toBeTruthy();
});
