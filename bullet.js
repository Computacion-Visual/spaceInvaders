let playerBulletSprites = [];
let invaderABulletSprites = [];
let invaderBBulletSprites = [];
let invaderCBulletSprites = [];

/** Class representing a bullet **/
class Bullet {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.speed = getBulletVel(type);
    this.type = type;
    this.width = 2 * 2;
    this.height = 8 * 2;
    this.sprite = new Sprite(
      getBulletSprites(type),
      this.width,
      this.height,
      0.3,
    );
    this.radius = 8;
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    this.sprite.show(this.x, this.y);
    this.sprite.animate();
  }

  // Método para verificar si la bala ha colisionado con un objeto
  hits(target) {
    if (target === null) {
      return false;
    }
    const d = dist(this.x, this.y, target.x, target.y);
    if (d < this.radius + target.width / 2) {
      return true;
    } else {
      return false;
    }
  }
}

/** @param {string} type */
function getBulletSprites(type) {
  switch (type) {
    case "player":
      return playerBulletSprites;
    case "a":
      return invaderABulletSprites;
    case "b":
      return invaderBBulletSprites;
    case "c":
      return invaderCBulletSprites;
    default:
      return playerBulletSprites;
  }
}

/** @param {string} type */
function getBulletVel(type) {
  switch (type) {
    case "player":
      return -20;
    case "a":
      return 10;
    case "b":
      return 5;
    case "c":
      return 5;
    default:
      return 10;
  }
}
