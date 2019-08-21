class Game {
  tiles: number[];
  tileSize: number;
  x: number;
  y: number;

  setup(gameSize: number = 800) {
    this.tileSize = Math.floor(gameSize / 4);
    this.x = (windowWidth - gameSize) / 2;
    this.y = (windowHeight - gameSize) / 2;
    this.tiles = new Array<number>(16);

    for (let i = 0; i < 16; i++) {
      this.tiles[i] = null;
    }
    const index = Math.floor(Math.random() * 16);
    this.tiles[index] = 2;

    textAlign(CENTER);
    textSize(this.tileSize / 4);
    textStyle(BOLD);
  }

  draw() {
    this.tiles.forEach((tileValue, index) => {
      this.drawTile(tileValue, index);
    });
  }

  private drawTile(tileValue: number, index: number) {
    const x = this.x + this.tileSize * (index % 4);
    const y = this.y + this.tileSize * Math.floor(index / 4);
    if (tileValue !== null) {
      const greenValue = 255 - (16 * Math.log(tileValue)) / Math.log(2);
      fill(255, greenValue, 0);
    } else {
      fill("white");
    }
    rect(x, y, this.tileSize - 5, this.tileSize - 5);
    if (tileValue !== null) {
      fill("black");
      text(
        tileValue.toString(),
        x + this.tileSize / 2,
        y + this.tileSize / 2 + 10
      );
    }
  }
  handleMouseClicked() {
    game.placeTile();
    game.draw();
  }

  private placeTile() {
    let freeIndex: number = null;
    while (freeIndex === null) {
      const index = Math.floor(Math.random() * 16);
      if (this.tiles[index] === null) {
        freeIndex = index;
      }
    }
    const value: number = Math.random() > 0.8 ? 4 : 2;
    this.tiles[freeIndex] = value;
  }

  moveTiles() {}
}
