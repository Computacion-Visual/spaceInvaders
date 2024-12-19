let score = 0;
let globalInvaderSpeed = 3;
let isWinner = false; // Variable para rastrear si el jugador ha ganado

function preload() {
  ship_sprite = loadShipSprites();
  invaderA_sprites = loadInvaderASprites();
  invaderB_sprites = loadInvaderBSprites();
  invaderC_sprites = loadInvaderCSprites();
  playerBulletSprites = loadPlayerBulletSprites();
  explosionSprites = loadExplosionSprites();
  invaderABulletSprites = loadInvaderABulletSprites();
  invaderBBulletSprites = loadInvaderBBulletSprites();
  invaderCBulletSprites = loadInvaderCBulletSprites();
}

function setup() {
  globalInvaderSpeed = Math.min(globalInvaderSpeed + 0.1, 10); // Velocidad máxima de 10
  createCanvas(1280, 720);
  ship = new Ship();
  for (let i = 0; i < 10; i++) {
    invaders.push([]);
    for (let j = 0; j < 5; j++) {
      if (j === 0) {
        invaders[i].push(new Invader(100 + i * 60, 100 + j * 60, "a"));
      } else if (j === 1 || j === 2) {
        invaders[i].push(new Invader(100 + i * 60, 100 + j * 60, "b"));
      } else {
        invaders[i].push(new Invader(100 + i * 60, 100 + j * 60, "c"));
      }
    }
  }
}

function draw() {
  frameRate(30);
  background(0);

   if (isWinner) {
    // Mostrar el mensaje de "Winner"
    textAlign(CENTER, CENTER);
    textSize(64);
    fill(255, 255, 0);
    text("WINNER", width / 2, height / 2);

    // Mostrar el score debajo del "Winner"
    textSize(32);
    fill(255, 255, 255); // Color blanco para el puntaje
    text("Score: " + score, width / 2, height / 2 + 60); // Ajusta la posición según sea necesario
    return; // Detenemos la ejecución del resto del juego
  }

  ship.show();
  ship.move();
  showHUD();
  
  let edge = false;
  let allNull = true; // Variable para comprobar si todos los invasores han sido destruidos
  
   // Verifica las colisiones de las balas de los invasores con el barco
  for (let i = invaderBullets.length - 1; i >= 0; i--) {
  let bullet = invaderBullets[i]; // Asegúrate de definir la bala en cada iteración
  if (bullet.hits(ship)) {
    // Si la bala toca el barco, el juego termina
    gameOver();
    return;
    }
    if (bullet.y > height) {
      invaderBullets.splice(i, 1);  // Eliminar bala si sale de la pantalla
    }
  }

  
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      if (invaders[i][j] === null) {
        continue;
      }
      allNull = false; // Si encontramos al menos un invasor, no hemos ganado todavía
      invaders[i][j].show();
      invaders[i][j].move();
      if (invaders[i][j].gonnaShoot()) {
        invaders[i][j].shoot();
      }
      if (invaders[i][j].x > width || invaders[i][j].x < 0) {
        edge = true;
      }
      for (let k = shipBullets.length - 1; k >= 0; k--) {
        if (shipBullets[k].hits(invaders[i][j])) {
          explosions.push(new Explosion(invaders[i][j].x, invaders[i][j].y));
          score += getInvaderScores(invaders[i][j].type);
          invaders[i].splice(j, 1, null);
          shipBullets.splice(k, 1);
          // Incrementa la velocidad global de los invasores
          globalInvaderSpeed += 0.1;
        }
      }
    }
  }

  if (allNull) {
    isWinner = true; // Todos los invasores han sido destruidos
  }

  if (edge) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        if (invaders[i][j] === null) {
          continue;
        }
        invaders[i][j].shiftDown();
      }
    }
  }

  for (let i = shipBullets.length - 1; i >= 0; i--) {
    shipBullets[i].update();
    shipBullets[i].draw();
    if (shipBullets[i].y < 0) {
      shipBullets.splice(i, 1);
    }
  }

  for (let i = explosions.length - 1; i >= 0; i--) {
    explosions[i].show();
    if (explosions[i].sprite.isDone()) {
      explosions.splice(i, 1);
    }
  }

  for (let i = invaderBullets.length - 1; i >= 0; i--) {
    invaderBullets[i].update();
    invaderBullets[i].draw();
    if (invaderBullets[i].y > height) {
      invaderBullets.splice(i, 1);
    }
  }
}

// Función para manejar el fin del juego
function gameOver() {
  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255, 0, 0); // Rojo para el "Game Over"
  text("GAME OVER", width / 2, height / 2);

  textSize(32);
  fill(255, 255, 255); // Color blanco para el puntaje
  text("Score: " + score, width / 2, height / 2 + 60); // Ajusta la posición según sea necesario

  noLoop(); // Detener el juego
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    ship.setDir(0);
  }
}

function keyPressed() {
  if (key === " ") {
    shipBullets.push(new Bullet(ship.x, height - 20, "player"));
  } else if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}
