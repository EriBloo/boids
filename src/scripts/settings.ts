export const settings = {
  numBoids: 100, // number of boids
  breakFactor: 0.2, // improves performance at the cost of calculations accuracy: breakFactor * numBoids = boid won't check more boids than this
  viewRadius: 100, // boids in this radius will be included in calculations
  avoidRadius: 40, // boids in this radius will be avoided
  viewAngle: 120, // angle to look for boids (NOT IMPLEMENTED)
  minSpeed: 4, // min speed of boid
  maxSpeed: 6, // max speed of boid
  maxSteer: 0.5, // max turn speed of boid
  separationWeight: 1, // weight to adjust separation
  alignmentWeight: 1, // weight to adjust alignment
  cohesionWeight: 1, // weight to adjust cohesion
};
