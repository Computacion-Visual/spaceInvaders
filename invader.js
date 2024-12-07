class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.speed = 5;
    this.direction = 1;
  }

  show() {
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speed * this.direction;
  }

  shiftDown() {
    this.y += this.height;
    this.direction *= -1;
  }
}
