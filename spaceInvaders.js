let score = 0;
const escudos = 5;
let globalInvaderSpeed = 1;
let highScore = 0;
let spawnAnimation = true;
let animationIndex = 0;
const invadersWidth = 5;
const invadersHeight = 10;
let ufo = null;
let showUFO = false;
let Screen = 0; // 0 = menu, 1 = Credits, 2 = game
let fontTitle;
let fontBody;
let ufoMenu;
let paused = false;
let ExplosionSound,
  VolumenSounds = 0.4;
let InvaderKilledSound, ShootSound, Ufo_HighPitchSound, Ufo_LowPitchSound;
let ufoSoundPlaying = false;
// Definir los sonidos en spaceInvaders.js o en el archivo adecuado
/*let FastInvader1Sound;
let FastInvader2Sound;
let FastInvader3Sound;
let FastInvader4Sound;
let invaderSoundIndex = 4; // Índice para controlar qué sonido reproducir*/

function preload() {
  /*FastInvader1Sound = loadSound('assets/sounds/fastinvader1.wav');
  FastInvader2Sound = loadSound('assets/sounds/fastinvader2.wav');
  FastInvader3Sound = loadSound('assets/sounds/fastinvader3.wav');
  FastInvader4Sound = loadSound('assets/sounds/fastinvader4.wav');*/
  InvaderKilledSound = loadSound("assets/sounds/invaderkilled.wav");
  ExplosionSound = loadSound("assets/sounds/explosion.wav");
  ShootSound = loadSound("assets/sounds/shoot.wav");
  Ufo_LowPitchSound = loadSound("assets/sounds/ufo_lowpitch.wav");
  ship_sprite = loadShipSprites();
  invaderA_sprites = loadInvaderASprites();
  invaderB_sprites = loadInvaderBSprites();
  invaderC_sprites = loadInvaderCSprites();
  playerBulletSprites = loadPlayerBulletSprites();
  invaderExplosionSprites = loadInvaderExplosionSprites();
  invaderABulletSprites = loadInvaderABulletSprites();
  invaderBBulletSprites = loadInvaderBBulletSprites();
  invaderCBulletSprites = loadInvaderCBulletSprites();
  shipExplosionSprites = loadShipExplosionSprites();
  UFO_sprites = loadUFOSprites();

  fontTitle = loadFont("/assets/fonts/KarmaticArcade-6Yrp1.ttf");
  fontBody = loadFont("/assets/fonts/PressStart2P-vaV7.ttf");
  ufoMenu = loadImage("/assets/ufo/ufo1.png");
}

function setup() {
  globalInvaderSpeed = Math.min(globalInvaderSpeed + 0.1, 10); // Velocidad máxima de 10
  createCanvas(1280, 720);
  ship = new Ship();
  ship_lives = 3;
  highScore = localStorage.getItem("highScore") || 0;
  //spawnInvaders();
  //spawnShields();
}

function draw() {
  if (Screen === 0) {
    menu();
  } else if (Screen === 1) {
    credits();
  } else if (Screen === 2) {
    game();
  }
}

function game() {
  frameRate(30);
  background(0);

  ship.show();
  ship.move();

  //Muestra el escudo
  for (let i = 0; i < shields.length; i++) {
    shields[i].show();
  }

  showHUD();

  let edge = false;
  let allInvadersDestroyed = true; // Variable para comprobar si todos los invasores han sido destruidos

  if (spawnAnimation) {
    spawnInvadersAnimation(animationIndex);
    animationIndex++;
    if (animationIndex >= 50) {
      spawnAnimation = false;
      animationIndex = 0;
    }
    return;
  }
  /*// Reproducir el sonido correspondiente al movimiento del invader
  if (invaderSoundIndex === 1  )
  {
    FastInvader1Sound.setVolume(VolumenSounds);
    FastInvader1Sound.rate(0.5);
    FastInvader1Sound.play();
  }
  else if(invaderSoundIndex === 2  )
  {
    FastInvader2Sound.setVolume(VolumenSounds);
    FastInvader2Sound.rate(0.5);
    FastInvader2Sound.play();
  }
  else if(invaderSoundIndex === 3 )
  {
    FastInvader3Sound.setVolume(VolumenSounds);
    FastInvader3Sound.rate(0.5);
    FastInvader3Sound.play();
  }
  else
  {
    FastInvader4Sound.setVolume(VolumenSounds);
    FastInvader4Sound.rate(0.5);
    FastInvader4Sound.play();
  }

  // Cambiar al siguiente sonido en el array
  invaderSoundIndex = (invaderSoundIndex + 1) % 4;*/

  for (let i = 0; i < invadersHeight; i++) {
    for (let j = 0; j < invadersWidth; j++) {
      if (invaders[i][j] === null) {
        continue;
      }
      allInvadersDestroyed = false; // Si encontramos al menos un invasor, no hemos ganado todavía

      invaders[i][j].show();
      invaders[i][j].move();
      if (invaders[i][j].gonnaShoot()) {
        invaders[i][j].shoot();
      }
      if (invaders[i][j].x > width || invaders[i][j].x < 0) {
        edge = true;
      }
      for (let k = shipBullets.length - 1; k >= 0; k--) {
        let deleteBullet = false;
        for (let s = 0; s < shields.length; s++) {
          const shield = shields[s];
          for (let p = 0; p < shield.shieldParts.length; p++) {
            if (shipBullets[k].hits(shield.shieldParts[p])) {
              if (shield.shieldParts[p].getHit()) {
                explosions.push(
                  new Explosion(
                    shield.shieldParts[p].x + shieldWidth / 2,
                    shield.shieldParts[p].y,
                  ),
                );
                deleteBullet = true;
                break;
              }
            }
          }
          if (deleteBullet) {
            break;
          }
        }

        if (shipBullets[k].hits(invaders[i][j])) {
          explosions.push(
            new Explosion(invaders[i][j].x, invaders[i][j].y, "invader"),
          );
          score += getInvaderScores(invaders[i][j].type);
          invaders[i].splice(j, 1, null);
          deleteBullet = true;
          shipBullets.splice(k, 1);
          // Incrementa la velocidad global de los invasores
          globalInvaderSpeed += 0.025;
          ExplosionSound.setVolume(VolumenSounds - 0.3);
          ExplosionSound.play();
          InvaderKilledSound.setVolume(VolumenSounds - 0.3);
          InvaderKilledSound.play();
        }
        if (deleteBullet) {
          shipBullets.splice(k, 1);
          break;
        }
      }
    }
  }

  if (random(1) < 0.001 && !showUFO) {
    showUFO = true;
    if (random(1) < 0.5) {
      ufo = new Invader(0, 100, "ufo");
    } else {
      ufo = new Invader(width, 100, "ufo");
      ufo.direction = -1;
    }
  }

  if (showUFO) {
    ufo.show();
    // Reproducir el sonido solo si no está sonando
    if (!ufoSoundPlaying) {
      Ufo_LowPitchSound.setVolume(VolumenSounds - 0.2); // Ajustar el volumen
      Ufo_LowPitchSound.play();
      ufoSoundPlaying = true;
    }

    ufo.move();
    if (ufo.x > width || ufo.x < 0) {
      // Desvanecer el volumen poco a poco
      let fadeOutDuration = 1000; // Duración del fade out en milisegundos
      let fadeOutInterval = 100; // Intervalo entre actualizaciones de volumen
      let fadeOutStep = 1 / (fadeOutDuration / fadeOutInterval); // Reducir el volumen en cada paso

      let currentVolume = Ufo_LowPitchSound.getVolume(); // Obtener el volumen actual

      // Función para reducir el volumen gradualmente
      let fadeOut = setInterval(() => {
        currentVolume -= fadeOutStep;

        if (currentVolume <= 0) {
          clearInterval(fadeOut); // Detener el intervalo cuando el volumen llega a 0
          Ufo_LowPitchSound.stop(); // Detener el sonido
          showUFO = false;
          ufoSoundPlaying = false; // Permitir que se reproduzca de nuevo la próxima vez
        } else {
          Ufo_LowPitchSound.setVolume(currentVolume); // Reducir el volumen
        }
      }, fadeOutInterval);
    }

    for (let k = shipBullets.length - 1; k >= 0; k--) {
      if (ufo == null) {
        continue;
      }
      if (shipBullets[k].hits(ufo)) {
        explosions.push(new Explosion(ufo.x, ufo.y, "invader"));
        score += 100;
        showUFO = false;
        ufo = null;
        shipBullets.splice(k, 1);
        ExplosionSound.setVolume(VolumenSounds);
        ExplosionSound.play();
        InvaderKilledSound.setVolume(VolumenSounds - 0.3);
        InvaderKilledSound.play();
      }
    }
  }

  // Detectar cuando el sonido termine para poder reproducirlo nuevamente
  Ufo_LowPitchSound.onended(function () {
    ufoSoundPlaying = false; // El sonido ha terminado, ahora puede sonar nuevamente
  });

  if (allInvadersDestroyed) {
    spawnAnimation = true;
    shipBullets = [];
    invaderBullets = [];
    explosions = [];
    ufo = null;
    spawnInvaders();
    allInvadersDestroyed = false;
  }

  if (edge) {
    for (let i = 0; i < invadersHeight; i++) {
      for (let j = 0; j < invadersWidth; j++) {
        if (invaders[i][j] === null) {
          continue;
        }
        invaders[i][j].shiftDown();
      }
    }
  }

  //Limite de tablero
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
  //Colision de balas de invasores
  for (let i = invaderBullets.length - 1; i >= 0; i--) {
    if (invaderBullets[i].y > height - 70) {
      invaderBullets.splice(i, 1);
    }
    if (invaderBullets[i] == null) {
      continue;
    }
    invaderBullets[i].update();
    invaderBullets[i].draw();
    let eliminado = false;
    //Con escudos
    for (let j = 0; j < shields.length; j++) {
      let shield = shields[j];
      for (let p = 0; p < shield.shieldParts.length; p++) {
        if (invaderBullets[i].hits(shield.shieldParts[p])) {
          if (shield.shieldParts[p].getHit()) {
            explosions.push(
              new Explosion(
                shield.shieldParts[p].x + shieldWidth / 2,
                shield.shieldParts[p].y,
              ),
            );
            eliminado = true;
            break;
          }
        }
      }
      if (eliminado) {
        break;
      }
    }
    if (eliminado) {
      invaderBullets.splice(i, 1);
      break;
    }
    //Con nave
    if (invaderBullets[i].hits(ship)) {
      ship_lives--;
      //explosions.push(new Explosion(ship.x, ship.y, "ship"));
      ship.explode();
      ExplosionSound.setVolume(VolumenSounds);
      ExplosionSound.play();
      invaderBullets.splice(i, 1);
      if (ship_lives === 0) {
        localStorage.setItem("highScore", Math.max(highScore, score));
        highScore = localStorage.getItem("highScore") || 0;
        showGameOver();
      }
    }
  }
}

function spawnInvaders() {
  invaders = [];
  for (let i = 0; i < invadersHeight; i++) {
    invaders.push([]);
    for (let j = 0; j < invadersWidth; j++) {
      if (j === 0) {
        invaders[i].push(new Invader(150 + i * 50, 150 + j * 50, "a"));
      } else if (j === 1 || j === 2) {
        invaders[i].push(new Invader(150 + i * 50, 150 + j * 50, "b"));
      } else {
        invaders[i].push(new Invader(150 + i * 50, 150 + j * 50, "c"));
      }
    }
  }
}

function spawnInvadersAnimation(index) {
  let n = 0;
  for (let i = 0; i < invadersHeight; i++) {
    for (let j = 0; j < invadersWidth; j++) {
      invaders[i][j].showNoAnimation();
      n++;
      if (index === n) {
        return;
      }
    }
  }
}

function spawnShields() {
  const espaciado = (width - 2 * 50) / escudos + 1;
  for (let i = 0; i < escudos; i++) {
    shields.push(new Shield(i * espaciado + 50, height - 200, 0, 6, 7));
  }
}

function reset() {
  ship = new Ship();
  ship_lives = 3;
  score = 0;
  globalInvaderSpeed = 1;
  spawnAnimation = true;
  spawnInvaders();
  spawnShields();
  shipBullets = [];
  invaderBullets = [];
  showUFO = false;
  ufo = null;

  if (!isLooping()) {
    loop();
  }
}

function keyReleased() {
  if (Screen === 2) {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
      ship.setDir(0);
    }
  }
}

function keyPressed() {
  //Menu
  if (Screen === 0) {
    if (key === "C" || key === "c") {
      Screen = 1;
    }

    if (keyCode === 13) {
      Screen = 2;
      spawnInvaders();
      spawnShields();
    }
  }
  //Creditos
  else if (Screen === 1) {
    if (keyCode == 27) {
      Screen = 0;
    }
  }

  //Juego
  else if (Screen === 2) {
    if (spawnAnimation) {
      return;
    }
    if (key === " ") {
      if (shipBullets.length < 1 && !ship.exploded) {
        shipBullets.push(new Bullet(ship.x, ship.y, "player"));
        ShootSound.setVolume(VolumenSounds - 0.3);
        ShootSound.play();
      }
    } else if (keyCode === RIGHT_ARROW) {
      ship.setDir(1);
    } else if (keyCode === LEFT_ARROW) {
      ship.setDir(-1);
    } else if (keyCode === 27) {
      reset();
      Screen = 0;

      if (!isLooping()) {
        loop();
      }
    } else if (key === "r" || key === "R") {
      reset();
    } else if (key === "p" || key === "P") {
      if (paused) {
        loop();
        paused = false;
      } else {
        noLoop();
        paused = true;
      }
    }
  }
}
