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
    this.width = 16 * 2.5;
    this.height = 16 * 2.5;
    this.speed = globalInvaderSpeed;
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
    this.x += globalInvaderSpeed * this.direction;
  }

  shiftDown() {
    this.y += this.height / 2;
    this.direction *= -1;
  }

  gonnaShoot() {
    let shootChance = 0; // Inicializa la probabilidad de disparo

    // Modificamos la probabilidad de disparo según el tipo de invasor y la velocidad global
    switch (this.type) {
      case "c":
        shootChance = 0.0005 + globalInvaderSpeed * 0.002; // Aumento de probabilidad con la velocidad
        break;
      case "b":
        shootChance = 0.001 + globalInvaderSpeed * 0.003;
        break;
      case "a":
        shootChance = 0.002 + globalInvaderSpeed * 0.004;
        break;
      default:
        shootChance = 0.0005 + globalInvaderSpeed * 0.002;
        break;
    }

    // Controlamos que la probabilidad no sea superior a 1
    shootChance = Math.min(shootChance, 0.0003); // Limitamos la probabilidad máxima para evitar disparos demasiado rápidos

    // Disparar si la probabilidad es mayor que un número aleatorio
    return random(1) < shootChance;
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
