let ship;
let ship_lives;
let ship_sprite = [];
let shipBullets = [];

/** class representing the player's ship */
class Ship {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.velocity = 10;
    this.xdir = 0;
    this.width = 26 * 2;
    this.height = 16 * 2;
    this.sprite = new Sprite(ship_sprite, this.width, this.height, 0.1);
    this.exploded = false;
  }

  show() {
    this.sprite.show(this.x, this.y);
    this.sprite.animate();
    if (this.exploded && this.sprite.isDone()) {
      this.exploded = false;
      this.sprite = new Sprite(ship_sprite, this.width, this.height, 0.1);
    }
  }

  setDir(dir) {
    this.xdir = dir;
  }

  move() {
    if (this.exploded) {
      return;
    }
    this.x += this.velocity * this.xdir;
    // Restringe el movimiento dentro de los límites de la pantalla
    this.x = constrain(
      this.x,
      0 + this.sprite.width / 2,
      width - this.sprite.width / 2,
    );
  }

  explode() {
    this.exploded = true;
    this.sprite = new Sprite(
      shipExplosionSprites,
      this.width,
      this.height,
      0.1
    );
  }
}
