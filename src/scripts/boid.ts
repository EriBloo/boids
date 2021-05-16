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

  move(distance: number): void {
    const x = this.position[0];
    const y = this.position[1];
    const angle = ((-this.rotation + 90) % 360) * (Math.PI / 180);

    const newX = x + distance * Math.cos(angle);
    const newY = y + distance * Math.sin(angle);

    this.position = [parseFloat(newX.toFixed(2)), parseFloat(newY.toFixed(2))];
  }
}

export default Boid;
