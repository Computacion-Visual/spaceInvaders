let explosions = [];
let invaderExplosionSprites = [];
let shipExplosionSprites = [];

class Explosion {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 26 * 2.5;
    this.height = 16 * 2.5;
    this.sprite = new Sprite(
      getExplosionSprites(type),
      this.width,
      this.height,
      0.2,
    );
  }

  show() {
    this.sprite.show(this.x, this.y);
    this.sprite.animate();
  }
}

function getExplosionSprites(type) {
  switch (type) {
    case "invader":
      return invaderExplosionSprites;
    case "ship":
      return shipExplosionSprites;
    default:
      return invaderExplosionSprites;
  }
}
