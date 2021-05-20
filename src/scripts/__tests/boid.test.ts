import { Boid } from "../boid";

test("returns correct position", () => {
  const boid = new Boid(1, 10, 2, 90);
  expect(boid.position).toEqual([10, 2]);
});

test("move correct distance when rotation is 0", () => {
  const boid = new Boid(1, 10, 10, 0);
  boid.move();
  expect(boid.position).toEqual([14, 10]);
});

test("move correct distance when rotation is 90", () => {
  const boid = new Boid(1, 10, 10, 90);
  boid.move();
  expect(boid.position).toEqual([10, 14]);
});

test("move correct distance when rotation is 180", () => {
  const boid = new Boid(1, 10, 10, 180);
  boid.move();
  expect(boid.position).toEqual([6, 10]);
});

test("move correct distance when rotation is 270", () => {
  const boid = new Boid(1, 10, 10, 270);
  boid.move();
  expect(boid.position).toEqual([10, 6]);
});

test("move correct distance when rotation is 360", () => {
  const boid = new Boid(1, 10, 10, 360);
  boid.move();
  expect(boid.position).toEqual([14, 10]);
});

test("can see other boid (120 degree vision)", () => {
  const boid1 = new Boid(1, 10, 10, 0);
  const boid2 = new Boid(1, 12, 12, 140);
  const boid3 = new Boid(1, 10, 12, 12);
  const boid4 = new Boid(1, 9, 14, 12);
  expect(boid1.inSight(boid2)).toBeTruthy();
  expect(boid1.inSight(boid3)).toBeTruthy();
  expect(boid1.inSight(boid4)).toBeTruthy();
});

test("can't see other boid (120 degree vision)", () => {
  const boid1 = new Boid(1, 10, 10, 0);
  const boid2 = new Boid(1, 8, 10, 140);
  const boid3 = new Boid(1, 8, 12, 122);
  expect(boid1.inSight(boid2)).toBeFalsy();
  expect(boid1.inSight(boid3)).toBeFalsy();
});
