class Game {
  tiles: number[];
  tileSize: number;

  setup(gameSize: number = 800) {
    this.tileSize = Math.floor(gameSize / 16);
    this.tiles = new Array<number>(16);
    for (let i = 0; i < 16; i++) {
      this.tiles[i] = null;
    }
  }

  draw() {}
}
