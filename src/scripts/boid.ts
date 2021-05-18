export interface IBoid {
  position: [number, number];
  velocity: [number, number];
  rotate(amount: number): void;
  move(): void;
}

export class Boid implements IBoid {
  private x;
  private y;
  private rotation;
  private speed;
  private precision = 2;

  constructor(x: number, y: number, speed: number, rotation: number) {
    this.x = parseFloat(x.toFixed(this.precision));
    this.y = parseFloat(y.toFixed(this.precision));
    this.speed = speed;
    this.rotation = rotation;
  }

  get position(): [number, number] {
    return [this.x, this.y];
  }

  set position(pos: [number, number]) {
    this.x = parseFloat(pos[0].toFixed(this.precision));
    this.y = parseFloat(pos[1].toFixed(this.precision));
  }

  get velocity(): [number, number] {
    return [this.speed, this.rotation];
  }

  set velocity(vel: [number, number]) {
    this.speed = vel[0];
    this.rotation = vel[1];
  }

  rotate(amount: number): void {
    this.rotation += amount;
  }

  move(): void {
    const angle = this.rotation * (Math.PI / 180);

    const newX = this.x + this.speed * Math.cos(angle);
    const newY = this.y + this.speed * Math.sin(angle);

    this.position = [newX, newY];
  }
}
