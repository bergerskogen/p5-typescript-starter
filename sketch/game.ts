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
  }

  draw() {
    this.tiles.forEach((tileValue, index) => {
      this.drawTile(tileValue, index);
    });
  }

  private drawTile(tileValue: number, index: number) {
    const x = this.x + this.tileSize * (index % 4);
    const y = this.y + this.tileSize * Math.floor(index / 4);
    rect(x, y, this.tileSize - 5, this.tileSize - 5);
  }
}
