let shield;

class shieldParts {
	constructor(x, y, type) {
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.type = type;
	}
	show() {
		if (this.type == "a") {
			this.color = color(155, 255, 255);
		} else {
			this.color = color(0, 0, 0);
		}
		rect(this.x, this.y, this.width, this.height);
	}
}

class Shield {
	shieldParts = [];

	constructor(x, y, level) {
		console.log("Shield");
		
		//Definen esquina superior izquierda del escudo
		this.x = x;
		this.y = y;
		//Tamaño (# de particulas en el escudo)
		this.level = level;
	}
	createShield() {
		//Crea arreglo de escudo
		for (let i = 1; i <= 42; i++) {
			//REVISAR
			nx, ny, type = this.defineLocation(i);
			console.log(type, i, nx, ny);
			this.shieldParts.push(new shieldParts(nx, ny, color, this.type));
		}
	}
	defineLocation(i) {
		let forma = [1, 2, 6, 7, 8, 14, 25, 31, 32, 33, 38, 39, 40];
		type = "a";
		if (forma.includes(i)) {
			type = "b";
		}
		nx = (i % 7) * 10 + x;
		ny = (i % 6) * 10 + y;
		return nx, ny, type;
	}

	show() {
		for (let i = 0; i < this.shieldParts.length; i++) {
			this.shieldParts[i].show();
		}
	}
}