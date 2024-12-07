function showHUD() {
  showScore();
}

function showScore() {
  fill(255);
  textSize(32);
  text("SCORE", 20, 50);
  text(score, 20, 80);
}
