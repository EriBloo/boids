interface IBoid {
  x: number;
  y: number;
  rotation: number;
  position: [number, number];
}

class Boid implements IBoid {
  x;
  y;
  rotation;

  constructor(x: number, y: number, rotation: number) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }

  get position(): [number, number] {
    return [this.x, this.y];
  }
}

export default Boid;
