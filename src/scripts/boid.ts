interface IBoid {
  position: [number, number];
  rotation: number;
  rotate(amount: number): void;
}

class Boid implements IBoid {
  private x;
  private y;
  private rot;
  private precision = 2;

  constructor(x: number, y: number, rot: number) {
    this.x = parseFloat(x.toFixed(this.precision));
    this.y = parseFloat(y.toFixed(this.precision));
    this.rot = rot;
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

  rotate(amount: number): void {
    this.rot += amount;
  }

  move(distance: number): void {
    const x = this.position[0];
    const y = this.position[1];
    const angle = this.rotation * (Math.PI / 180);

    const newX = x + distance * Math.cos(angle);
    const newY = y + distance * Math.sin(angle);

    this.position = [newX, newY];
  }
}

export default Boid;
