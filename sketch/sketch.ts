let game: TwentyFortyeight
function setup() {
	createCanvas(windowWidth, windowHeight)
	game = new TwentyFortyeight()
	game.setup()
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function draw() {
	game.draw()
}

function keyPressed() {
	game.handleKeyPressed()
}
