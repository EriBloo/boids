interface IBoid {
  position: [number, number];
  rotation: number;
  rotate(amount: number): void;
}

class Boid implements IBoid {
  private x;
  private y;
  private rot;

  constructor(x: number, y: number, rot: number) {
    this.x = x;
    this.y = y;
    this.rot = rot;
  }

  get position(): [number, number] {
    return [this.x, this.y];
  }

  set position(pos: [number, number]) {
    this.x = pos[0];
    this.y = pos[1];
  }

  get rotation(): number {
    return this.rot;
  }

  rotate(amount: number): void {
    this.rot += amount;
  }
}

export default Boid;
