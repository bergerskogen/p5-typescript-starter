let game: Game;
function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game();
  game.setup();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  game.draw();
}

function mouseClicked() {
  game.handleMouseClicked();
}

function keyPressed() {
  game.handleKeyPressed();
}
