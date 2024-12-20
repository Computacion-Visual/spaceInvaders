function showHUD() {
  showScore();
  showHighScore();
  showLives();
}

function showScore() {
  fill(255);
  textSize(24);
  text("SCORE", 20, 30);
  text(score === 0 ? "0000" : score.toString().padStart(4, "0"), 20, 60);
}

function showHighScore() {
  fill(255);
  textSize(24);
  text("HI-SCORE", width - 150, 30);
  text(
    highScore === 0 ? "0000" : highScore.toString().padStart(4, "0"),
    width - 150,
    60,
  );
}

// Función para manejar el fin del juego
function showGameOver() {
  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255, 0, 0); // Rojo para el "Game Over"
  text("GAME OVER", width / 2, height / 2);

  textSize(32);
  fill(255, 255, 255); // Color blanco para el puntaje
  text("Score: " + score, width / 2, height / 2 + 60); // Ajusta la posición según sea necesario

  noLoop(); // Detener el juego
}

function showWinner() {
  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255, 255, 0);
  text("WINNER", width / 2, height / 2);

  textSize(32);
  fill(255, 255, 255);
  text("Score: " + score, width / 2, height / 2 + 60);
  noLoop();
}

function showLives() {
  stroke(0, 255, 0);
  strokeWeight(4);
  line(0, height - 60, width, height - 60);
  noStroke();

  for (let i = 0; i < ship_lives; i++) {
    image(
      ship_sprite[0],
      ship.width + 60 * i,
      height - 30,
      ship.width,
      ship.height,
    );
  }
}
