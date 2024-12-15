let invaders = [];
let invaderA_sprites = [];
let invaderB_sprites = [];
let invaderC_sprites = [];
let invaderBullets = [];

/** Class representing an invader */
class Invader {
  /**
   * @param {number} x
   * @param {number} y
   * @param {string} type
   */
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 40;
    this.height = 40;
    this.speed = 3;
    this.direction = 1;
    this.sprite = new Sprite(
      getInvaderSprites(type),
      this.width,
      this.height,
      0.1,
    );
  }

  show() {
    this.sprite.show(this.x, this.y);
    this.sprite.animate();
  }

  move() {
    this.x += this.speed * this.direction;
  }

  shiftDown() {
    this.y += this.height / 2;
    this.direction *= -1;
  }

  gonnaShoot() {
    switch (this.type) {
      case "c":
        return random(1) < 0.00005;
      case "b":
        return random(1) < 0.0001;
      case "a":
        return random(1) < 0.0002;
      default:
        return random(1) < 0.00005;
    }
  }

  shoot() {
    invaderBullets.push(new Bullet(this.x, this.y, this.type));
  }
}

/** @param {string} type */
function getInvaderSprites(type) {
  switch (type) {
    case "c":
      return invaderC_sprites;
    case "b":
      return invaderB_sprites;
    case "a":
      return invaderA_sprites;
    default:
      return invaderA_sprites;
  }
}

/** @param {string} type */
function getInvaderScores(type) {
  switch (type) {
    case "c":
      return 10;
    case "b":
      return 20;
    case "a":
      return 40;
    default:
      return 10;
  }
}
