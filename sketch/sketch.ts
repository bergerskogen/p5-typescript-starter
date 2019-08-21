let game: Game;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("grey");
  game = new Game();
  game.setup();
  game.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {}

function mouseClicked() {
  game.handleMouseClicked();
}
