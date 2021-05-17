import { Boid } from "../boid";

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

test("move correct distance when rotation is 0", () => {
  const boid = new Boid(10, 10, 0);
  boid.move();
  expect(boid.position).toEqual([20, 10]);
});

test("move correct distance when rotation is 90", () => {
  const boid = new Boid(10, 10, 90);
  boid.move();
  expect(boid.position).toEqual([10, 20]);
});

test("move correct distance when rotation is 180", () => {
  const boid = new Boid(10, 10, 180);
  boid.move();
  expect(boid.position).toEqual([0, 10]);
});

test("move correct distance when rotation is 270", () => {
  const boid = new Boid(10, 10, 270);
  boid.move();
  expect(boid.position).toEqual([10, 0]);
});

test("move correct distance when rotation is 360", () => {
  const boid = new Boid(10, 10, 360);
  boid.move();
  expect(boid.position).toEqual([20, 10]);
});

test("move correct distance when rotation is 36.87", () => {
  const boid = new Boid(10, 10, 36.87);
  boid.move();
  expect(boid.position).toEqual([14, 13]);
});
