let shields = [];
let alto = 10;
let ancho = 20;


class shieldPart {
	constructor(x, y, tipo) {
		this.x = x;
		this.y = y;
		this.width = ancho;
		this.height = alto;
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
		rect(this.x, this.y, this.width, this.height);
		//fill(0, 0, 255);
		//textSize();
		//text(i, this.x, this.y + 50);
	}
	getHit() {
		this.tipo = "b";
		this.color = color(0, 0, 0);
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
		let my = 0
		for (let i = 0; i <= 41; i++) {
			//Posicion en matriz
			let mx = i % this.width;
			let nx = mx * ancho + this.x;
			let ny = my * alto + this.y;
			//Define tipo (Y la forma del escudo)
			let forma = [1, 2, 6, 7, 8, 14, 25, 31, 32, 33, 38, 39, 40];
			let tipo = "a";
			if (forma.includes(i+1)) {
				tipo = "b";
			}
			//Crea las partes del escudo
			this.shieldParts.push(new shieldPart(nx , ny, tipo));

			//Aumenta el contaodor de filas
			if(mx == this.width-1){
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
