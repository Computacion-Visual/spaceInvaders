class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.sprite = new Sprite(explosionSprites, this.width, this.height, 0.2);
  }

  show() {
    this.sprite.show(this.x, this.y);
    this.sprite.animate();
  }
}
