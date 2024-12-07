class Ship {
  constructor() {
    this.x = width / 2;
    this.velocity = 20;
  }

  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, height - 20, 30, 30);
  }

  move(dir) {
    this.x += this.velocity * dir;
  }
}
