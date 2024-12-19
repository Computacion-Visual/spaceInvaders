let ship;
let ship_sprite = [];
let shipBullets = [];

/** class representing the player's ship */
class Ship {
  constructor() {
    this.x = width / 2;
    this.y = height - 20;
    this.velocity = 10;
    this.xdir = 0;
    this.sprite = new Sprite(ship_sprite, 30, 30, 0.1);
    this.width = 26;
    this.height = 16;
  }

  show() {
    this.sprite.show(this.x, this.y);
    this.sprite.animate();
  }

  setDir(dir) {
    this.xdir = dir;
  }

  move() {
    this.x += this.velocity * this.xdir;
    // Restringe el movimiento dentro de los límites de la pantalla
    this.x = constrain(
      this.x,
      0 + this.sprite.width / 2,
      width - this.sprite.width / 2,
    );
  }
}
