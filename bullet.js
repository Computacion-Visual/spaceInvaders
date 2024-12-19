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
    this.width = 6;
    this.height = 14;
    this.sprite = new Sprite(
      getBulletSprites(type),
      this.width,
      this.height,
      0.3
    );
    this.radius = 16;
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
    // Verifica si el target no es null ni undefined y tiene las propiedades necesarias
    if (!target || target.x === undefined || target.y === undefined || target.width === undefined || target.height === undefined) {
      return false; // Si el target no está definido o es inválido, no hay colisión
    }
  
    // Comprobar colisión simple con un objetivo (como un invasor o el jugador)
    return (
      this.x > target.x - target.width / 2 &&
      this.x < target.x + target.width / 2 &&
      this.y > target.y - target.height / 2 &&
      this.y < target.y + target.height / 2
    );
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
      return -10;
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
