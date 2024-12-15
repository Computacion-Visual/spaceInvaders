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
    this.speed = 5;
    this.direction = 1;
    this.sprite = new Sprite(
      this.getInvaderSprites(type),
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
    this.y += this.height;
    this.direction *= -1;
  }

  /** @param {string} type */
  getInvaderSprites(type) {
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
}
