class Ship {
  constructor() {
    this.x = width / 2;
    this.velocity = 10;
    this.xdir = 0;
  }

  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, height - 20, 30, 30);
  }

  setDir(dir) {
    this.xdir = dir;
  }

  move() {
    this.x += this.velocity * this.xdir;
  }
}
