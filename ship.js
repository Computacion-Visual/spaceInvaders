/** class representing the player's ship */
class Ship {
  constructor() {
    this.x = width / 2;
    this.velocity = 10;
    this.xdir = 0;
    this.sprite = new Sprite(ship_sprite, 30, 30, 0.1);
  }

  show() {
    this.sprite.show(this.x, height - 20);
    this.sprite.animate();
  }

  setDir(dir) {
    this.xdir = dir;
  }

  move() {
    this.x += this.velocity * this.xdir;
  }
}
