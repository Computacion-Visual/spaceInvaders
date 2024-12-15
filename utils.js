function loadShipSprites() {
  let ship_sprite = [];
  const length = 1;
  for (let i = 1; i <= length; i++) {
    ship_sprite.push(loadImage(`assets/ship/ship${i}.png`));
  }
  return ship_sprite;
}

function loadInvaderASprites() {
  let invaderA_sprites = [];
  const length = 2;
  for (let i = 1; i <= length; i++) {
    invaderA_sprites.push(
      loadImage(`assets/invaders/invaderA/invaderA${i}.png`),
    );
  }
  return invaderA_sprites;
}

function loadInvaderBSprites() {
  let invaderB_sprites = [];
  const length = 2;
  for (let i = 1; i <= length; i++) {
    invaderB_sprites.push(
      loadImage(`assets/invaders/invaderB/invaderB${i}.png`),
    );
  }
  return invaderB_sprites;
}

function loadInvaderCSprites() {
  let invaderC_sprites = [];
  const length = 2;
  for (let i = 1; i <= length; i++) {
    invaderC_sprites.push(
      loadImage(`assets/invaders/invaderC/invaderC${i}.png`),
    );
  }
  return invaderC_sprites;
}

function loadPlayerBulletSprites() {
  let bullet_sprites = [];
  const length = 1;
  for (let i = 1; i <= length; i++) {
    bullet_sprites.push(loadImage(`assets/bullet/player_bullet${i}.png`));
  }
  return bullet_sprites;
}

function loadExplosionSprites() {
  let explosion_sprites = [];
  const length = 1;
  for (let i = 1; i <= length; i++) {
    explosion_sprites.push(loadImage(`assets/explosion/explosion${i}.png`));
  }
  return explosion_sprites;
}
