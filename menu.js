function menu() {
  background(0);
  fill(0, 255, 0);
  textAlign(CENTER, CENTER);

  //Titulo
  textSize(100);
  textFont(fontTitle);
  text('S P A C E', 640, 80);
  text('I N V A D E R S', 640, 190);

  //Jugar
  textSize(30);
  textFont(fontBody);
  text('Presiona ENTER para jugar', 640, 310);

  //Puntajes
  showPoints(700, 450);

  //Instrucciones
  text('INSTRUCCIONES', 400, 380);
  text('← Izquierda', 400, 420);
  text('→ Derecha', 400, 460);
  text('ESPACIO Disparar', 400, 500);
  text('ESC Salir', 400, 540);
  text('P Pausa', 400, 580);
  text('R Reiniciar', 400, 620);
  text('C Créditos', 400, 680);


  //Score
  text('HI-SCORE', 930, 600);
  text(highScore, 930, 630);
}

function showPoints(x, y) {
  imageMode(CORNER)
    image(invaderC_sprites[0], x+30, y-54-10, 32, 32);
  text('10 points', x+260, y-45);

  image(invaderB_sprites[0], x+30, y-22-5, 32, 32);
  text('20 points', x+260, y-8);

  image(invaderA_sprites[0], x+30, y+10+5, 32, 32);
  text('40 points', x+260, y+32);

  image(ufoMenu, x, y+47+5, 96, 42);
  text('100 points', x+260, y+70);
  imageMode(CENTER)
}


function credits() {
  background(0);
  fill(0, 255, 0);
  textAlign(CENTER, CENTER);

  textSize(80);
  textFont(fontTitle);
  text('C O M P U T A C I O N', 640, 120);
  text('V I S U A L', 640, 230);


  textSize(30);
  textFont(fontBody);
  text('Diego Esteban Morales Granados', 640, 380);
  text('Andrés Leonardo Leguizamón Gutiérrez', 640, 420);
  text('Juan Andrés Bueno Ramírez', 640, 460);
  text('Luis Esteban León Rojas', 640, 500);

  text('ESC Volver', 640, 600);
}
