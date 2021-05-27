export const settings = {
  numBoids: 100, // number of boids
  breakFactor: 0.15, // improves performance at the cost of calculations accuracy: breakFactor * numBoids = boid won't check more flockmates than this
  viewRadius: 100, // boids in this radius will be included in calculations
  avoidRadius: 40, // boids in this radius will be avoided
  collisionRadius: 200, // avoid collision with obstacles in this radius
  minSpeed: 6, // min speed of boid
  maxSpeed: 10, // max speed of boid
  maxSteer: 0.5, // max turn speed of boid
  separationWeight: 1, // weight to adjust separation
  alignmentWeight: 1, // weight to adjust alignment
  cohesionWeight: 0.6, // weight to adjust cohesion
  collisionWeight: 10, // weight to avoid obstacles
};
