/** Class representing a sprite. */
class Sprite {
  /** @param {Array} images
   * @param {number} width
   * @param {number} height
   * @param {number} speed
   * */
  constructor(images, width, height, speed) {
    this.images = images;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.index = 0;
    this.len = this.images.length;
  }

  /** @param {number} x
   * @param {number} y
   * */
  show(x, y) {
    const index = floor(this.index) % this.len;
    imageMode(CENTER);
    image(this.images[index], x, y, this.width, this.height);
  }

  animate() {
    this.index += this.speed;
    if (this.index >= this.len + 1) {
      this.index = 0;
    }
  }

  isDone() {
    if (floor(this.index) >= this.len) {
      return true;
    }
    return false;
  }
}
