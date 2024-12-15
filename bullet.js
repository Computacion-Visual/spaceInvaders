/** Class representing a bullet **/
class Bullet {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.width = 2;
    this.height = 8;
    this.sprite = new Sprite(playerBulletSprites, this.width, this.height, 0.1);
    this.radius = 8;
  }

  update() {
    this.y -= this.speed;
  }

  draw() {
    this.sprite.show(this.x, this.y);
    this.sprite.animate();
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
