class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.radius = 3;
    this.damage = 10;
  }

  update() {
    this.y -= this.speed;
  }

  draw() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2);
  }

  hits(invader) {
    if (invader === null) {
      return false;
    }
    const d = dist(this.x, this.y, invader.x, invader.y);
    if (d < this.radius + invader.width / 2) {
      return true;
    } else {
      return false;
    }
  }
}
