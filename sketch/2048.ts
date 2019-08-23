class TwentyFortyeight {
	tiles: number[]
	tileSize: number
	x: number
	y: number

	setup(gameSize: number = 800) {
		this.tileSize = Math.floor(gameSize / 4)
		this.x = (windowWidth - gameSize) / 2
		this.y = (windowHeight - gameSize) / 2
		this.tiles = new Array<number>(16)

		for (let i = 0; i < 16; i++) {
			this.tiles[i] = null
		}
		const index: number = Math.floor(Math.random() * 16)
		this.tiles[index] = 2
		textAlign(CENTER)
		textSize(this.tileSize / 3)
		textStyle(BOLD)
	}

	draw() {
		background('grey')
		this.tiles.forEach((tileValue, index) => {
			this.drawTile(tileValue, index)
		})
	}

	private drawTile(tileValue: number, index: number) {
		const x: number = this.x + this.tileSize * (index % 4)
		const y: number = this.y + this.tileSize * Math.floor(index / 4)
		if (tileValue !== null) {
			const greenValue: number = 255 - (20 * Math.log(tileValue)) / Math.log(2)
			fill(255, greenValue, 0)
		} else {
			fill('lightgray')
		}
		rect(x, y, this.tileSize - 5, this.tileSize - 5)
		if (tileValue !== null) {
			fill('black')
			text(tileValue.toString(), x + this.tileSize / 2, y + this.tileSize / 2 + 20)
		}
	}

	handleKeyPressed() {
		const tilesMoved: boolean = this.moveTiles(keyCode)
		if (tilesMoved) {
			this.placeTile()
		}
		this.draw()
	}

	moveTiles(direction: number): boolean {
		let tilesMoved: boolean = false

		let checkArray: any[]
		switch (keyCode) {
			case LEFT_ARROW:
				checkArray = leftCheckList
				break
			case RIGHT_ARROW:
				checkArray = rightCheckList
				break
			case UP_ARROW:
				checkArray = upCheckList
				break
			case DOWN_ARROW:
				checkArray = downCheckList
				break
			default:
				return false
		}

		checkArray.forEach((checkInfo) => {
			const sourceIndex: number = checkInfo.index
			const sourceTileValue: number = this.tiles[sourceIndex]
			let doubled: boolean = false

			if (sourceTileValue !== null) {
				const tilesToCheck: number[] = checkInfo.toCheck
				let targetTileValue: number
				let emptyTileIndex: number = null

				for (let checkIndex = 0; checkIndex < tilesToCheck.length; checkIndex++) {
					const targetTileIndex: number = tilesToCheck[checkIndex]
					targetTileValue = this.tiles[targetTileIndex]
					if (targetTileValue !== null) {
						if (targetTileValue === sourceTileValue) {
							this.tiles[targetTileIndex] = sourceTileValue * 2
							this.tiles[sourceIndex] = null
							tilesMoved = true
							doubled = true
						}
						break
					}
					emptyTileIndex = targetTileIndex
				}
				if (!doubled && emptyTileIndex !== null) {
					this.tiles[emptyTileIndex] = sourceTileValue
					this.tiles[sourceIndex] = null
					tilesMoved = true
				}
			}
		})

		return tilesMoved
	}

	private placeTile() {
		let freeIndex: number = null
		while (freeIndex === null) {
			const index = Math.floor(Math.random() * 16)
			if (this.tiles[index] === null) {
				freeIndex = index
			}
		}
		const value: number = Math.random() > 0.8 ? 4 : 2
		this.tiles[freeIndex] = value
	}
}
