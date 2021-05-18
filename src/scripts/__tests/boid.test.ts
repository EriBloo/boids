import { Boid } from "../boid";

test("returns correct position", () => {
  const boid = new Boid(10, 2, 4, 90);
  expect(boid.position).toEqual([10, 2]);
});

test("sets correct rotation", () => {
  const boid = new Boid(2, 2, 4, 243);
  boid.rotate(23);
  expect(boid.velocity).toEqual([4, 266]);
  boid.rotate(-116);
  expect(boid.velocity).toEqual([4, 150]);
});

test("move correct distance when rotation is 0", () => {
  const boid = new Boid(10, 10, 4, 0);
  boid.move();
  expect(boid.position).toEqual([14, 10]);
});

test("move correct distance when rotation is 90", () => {
  const boid = new Boid(10, 10, 4, 90);
  boid.move();
  expect(boid.position).toEqual([10, 14]);
});

test("move correct distance when rotation is 180", () => {
  const boid = new Boid(10, 10, 4, 180);
  boid.move();
  expect(boid.position).toEqual([6, 10]);
});

test("move correct distance when rotation is 270", () => {
  const boid = new Boid(10, 10, 4, 270);
  boid.move();
  expect(boid.position).toEqual([10, 6]);
});

test("move correct distance when rotation is 360", () => {
  const boid = new Boid(10, 10, 4, 360);
  boid.move();
  expect(boid.position).toEqual([14, 10]);
});
