let shields = [];
let shieldHeight = 10;
let shieldWidth = 20;

class shieldPart {
  constructor(x, y, tipo) {
    this.x = x;
    this.y = y;
    this.width = shieldWidth;
    this.height = shieldHeight;
    this.tipo = tipo;
    if (this.tipo == "a") {
      this.color = color(0, 255, 0, 255);
    } else {
      this.color = color(0, 0, 0);
    }
  }
  show(i) {
    noStroke();
    fill(this.color);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }
  getHit() {
    if (this.tipo == "a") {
      this.tipo = "b";
      this.color = color(0, 0, 0);
      return true;
    }
    return false;
  }
}

class Shield {
  shieldParts = [];

  constructor(x, y, level, height, width) {
    //Definen esquina superior izquierda del escudo
    this.x = x;
    this.y = y;

    //Alto y ancho
    this.height = height;
    this.width = width;

    //Tamaño (# de particulas en el escudo)
    this.level = level;
    this.createShield();
  }
  createShield() {
    //Crea arreglo de escudo
    let my = 0;
    for (let i = 0; i <= 41; i++) {
      //Posicion en matriz
      const mx = i % this.width;
      const nx = mx * shieldWidth + this.x;
      const ny = my * shieldHeight + this.y;
      //Define tipo (Y la forma del escudo)
      const forma = [1, 2, 6, 7, 8, 14, 25, 31, 32, 33, 38, 39, 40];
      let tipo = "a";
      if (forma.includes(i + 1)) {
        tipo = "b";
      }
      //Crea las partes del escudo
      this.shieldParts.push(new shieldPart(nx, ny, tipo));

      //Aumenta el contaodor de filas
      if (mx == this.width - 1) {
        my++;
      }
    }
  }

  show() {
    for (let i = 0; i < this.shieldParts.length; i++) {
      this.shieldParts[i].show(i);
    }
  }
}
