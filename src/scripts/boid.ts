export interface IBoid {
  position: [number, number];
  rotation: number;
  velocity: number;
  rotate(amount: number): void;
  move(): void;
}

export class Boid implements IBoid {
  private x;
  private y;
  private rot;
  private speed;
  private precision = 2;

  constructor(x: number, y: number, rot: number) {
    this.x = parseFloat(x.toFixed(this.precision));
    this.y = parseFloat(y.toFixed(this.precision));
    this.rot = rot;
    this.speed = 4;
  }

  get position(): [number, number] {
    return [this.x, this.y];
  }

  set position(pos: [number, number]) {
    this.x = parseFloat(pos[0].toFixed(this.precision));
    this.y = parseFloat(pos[1].toFixed(this.precision));
  }

  get rotation(): number {
    return this.rot;
  }

  set rotation(rot: number) {
    this.rot = rot;
  }

  get velocity(): number {
    return this.speed;
  }

  set velocity(vel: number) {
    this.speed = vel;
  }

  rotate(amount: number): void {
    this.rot += amount;
  }

  move(): void {
    const angle = this.rotation * (Math.PI / 180);

    const newX = this.x + this.speed * Math.cos(angle);
    const newY = this.y + this.speed * Math.sin(angle);

    this.position = [newX, newY];
  }
}
