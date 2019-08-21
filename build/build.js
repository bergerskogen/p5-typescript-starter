var leftCheckList = [
    { index: 0, toCheck: [1, 2, 3] },
    { index: 1, toCheck: [2, 3] },
    { index: 2, toCheck: [3] },
    { index: 4, toCheck: [5, 6, 7] },
    { index: 5, toCheck: [6, 7] },
    { index: 6, toCheck: [7] },
    { index: 8, toCheck: [9, 10, 11] },
    { index: 9, toCheck: [10, 11] },
    { index: 10, toCheck: [11] },
    { index: 12, toCheck: [13, 14, 15] },
    { index: 13, toCheck: [14, 15] },
    { index: 14, toCheck: [15] }
];
var rightCheckList = [
    { index: 3, toCheck: [2, 1, 0] },
    { index: 2, toCheck: [1, 0] },
    { index: 1, toCheck: [0] },
    { index: 7, toCheck: [6, 5, 4] },
    { index: 6, toCheck: [5, 4] },
    { index: 5, toCheck: [4] },
    { index: 11, toCheck: [10, 9, 8] },
    { index: 10, toCheck: [9, 8] },
    { index: 9, toCheck: [8] },
    { index: 15, toCheck: [14, 13, 12] },
    { index: 14, toCheck: [13, 12] },
    { index: 13, toCheck: [12] }
];
var Game = (function () {
    function Game() {
    }
    Game.prototype.setup = function (gameSize) {
        if (gameSize === void 0) { gameSize = 800; }
        this.tileSize = Math.floor(gameSize / 4);
        this.x = (windowWidth - gameSize) / 2;
        this.y = (windowHeight - gameSize) / 2;
        this.tiles = new Array(16);
        for (var i = 0; i < 16; i++) {
            this.tiles[i] = null;
        }
        var index = Math.floor(Math.random() * 16);
        this.tiles[index] = 2;
        textAlign(CENTER);
        textSize(this.tileSize / 4);
        textStyle(BOLD);
    };
    Game.prototype.draw = function () {
        var _this = this;
        background("grey");
        this.tiles.forEach(function (tileValue, index) {
            _this.drawTile(tileValue, index);
        });
    };
    Game.prototype.drawTile = function (tileValue, index) {
        var x = this.x + this.tileSize * (index % 4);
        var y = this.y + this.tileSize * Math.floor(index / 4);
        if (tileValue !== null) {
            var greenValue = 255 - (16 * Math.log(tileValue)) / Math.log(2);
            fill(255, greenValue, 0);
        }
        else {
            fill("white");
        }
        rect(x, y, this.tileSize - 5, this.tileSize - 5);
        if (tileValue !== null) {
            fill("black");
            text(tileValue.toString(), x + this.tileSize / 2, y + this.tileSize / 2 + 10);
        }
    };
    Game.prototype.handleMouseClicked = function () {
        game.draw();
    };
    Game.prototype.handleKeyPressed = function () {
        var tilesMoved = this.moveTiles(keyCode);
        if (tilesMoved) {
            this.placeTile();
        }
        this.draw();
    };
    Game.prototype.moveTiles = function (direction) {
        var _this = this;
        var tilesMoved = false;
        var checkArray;
        switch (keyCode) {
            case LEFT_ARROW:
                checkArray = leftCheckList;
                break;
            case RIGHT_ARROW:
                checkArray = rightCheckList;
                break;
            default:
                return false;
        }
        checkArray.forEach(function (checkInfo) {
            var tileIndex = checkInfo.index;
            var tilesToCheck = checkInfo.toCheck;
            if (_this.tiles[tileIndex] === null) {
                var newTileValue = void 0;
                for (var _i = 0, tilesToCheck_1 = tilesToCheck; _i < tilesToCheck_1.length; _i++) {
                    var newTileIndex = tilesToCheck_1[_i];
                    newTileValue = _this.tiles[newTileIndex];
                    if (newTileValue !== null) {
                        _this.tiles[tileIndex] = newTileValue;
                        _this.tiles[newTileIndex] = null;
                        tilesMoved = true;
                        break;
                    }
                }
            }
        });
        return tilesMoved;
    };
    Game.prototype.placeTile = function () {
        var freeIndex = null;
        while (freeIndex === null) {
            var index = Math.floor(Math.random() * 16);
            if (this.tiles[index] === null) {
                freeIndex = index;
            }
        }
        var value = Math.random() > 0.8 ? 4 : 2;
        this.tiles[freeIndex] = value;
    };
    return Game;
}());
var Morph = (function () {
    function Morph() {
    }
    Morph.prototype.setup = function () {
        this.shapes = [];
        this.currentShape = 0;
        var maxSize = min(windowHeight / 2 - 50, windowWidth / 2 - 50);
        var increment = 50;
        for (var size = increment; size < maxSize; size += increment) {
            this.shapes.push({
                points: Shapes.triangle(size),
                color: color("yellow")
            });
            this.shapes.push({
                points: Shapes.circle(size),
                color: color("blue")
            });
            this.shapes.push({ points: Shapes.square(size), color: color("red") });
        }
        for (var size = maxSize; size > increment; size -= increment) {
            this.shapes.push({
                points: Shapes.triangle(size),
                color: color("white")
            });
            this.shapes.push({ points: Shapes.square(size), color: color("black") });
        }
        this.morph = new Array();
        var highestCount = 0;
        for (var i = 0; i < this.shapes.length; i++) {
            highestCount = Math.max(highestCount, this.shapes[i].points.length);
        }
        for (var i = 0; i < highestCount; i++) {
            this.morph.push(new p5.Vector());
        }
    };
    Morph.prototype.recalc = function () {
        var totalDistance = 0;
        var points = this.shapes[this.currentShape].points;
        for (var i = 0; i < points.length; i++) {
            var v1 = points[i];
            var v2 = this.morph[i];
            v2.lerp(v1, 0.1);
            totalDistance += p5.Vector.dist(v1, v2);
        }
        if (totalDistance < 0.1) {
            this.currentShape++;
            if (this.currentShape >= this.shapes.length) {
                this.currentShape = 0;
            }
        }
    };
    Morph.prototype.draw = function () {
        this.recalc();
        var color = this.shapes[this.currentShape].color;
        var points = this.shapes[this.currentShape].points;
        translate(width / 2, height / 2);
        strokeWeight(4);
        beginShape();
        noFill();
        stroke(color);
        for (var i = 0; i < points.length; i++) {
            var v = this.morph[i];
            vertex(v.x, v.y);
        }
        endShape(CLOSE);
    };
    return Morph;
}());
var Shapes = (function () {
    function Shapes() {
    }
    Shapes.circle = function (size) {
        var points = new Array();
        for (var angle = 0; angle < 360; angle += 9) {
            var v = p5.Vector.fromAngle(radians(angle - 135));
            v.mult(size);
            points.push(v);
        }
        return points;
    };
    Shapes.square = function (size) {
        var points = new Array();
        for (var x = -size; x < size; x += 10) {
            points.push(createVector(x, -size));
        }
        for (var y = -size; y < size; y += 10) {
            points.push(createVector(size, y));
        }
        for (var x = size; x > -size; x -= 10) {
            points.push(createVector(x, size));
        }
        for (var y = size; y > -size; y -= 10) {
            points.push(createVector(-size, y));
        }
        return points;
    };
    Shapes.triangle = function (size) {
        var points = new Array();
        var tanAngle = tan(TWO_PI / 6);
        var halfWidth = Math.round((size * sin(PI / 6)) / 10) * 10;
        for (var x = -halfWidth; x <= halfWidth; x += 10) {
            points.push(createVector(x, halfWidth - (halfWidth - abs(x)) * tanAngle));
        }
        return points;
    };
    Shapes.star = function (x, y, radius1, radius2, npoints) {
        var angle = TWO_PI / npoints;
        var halfAngle = angle / 2.0;
        var points = new Array();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius2;
            var sy = y + sin(a) * radius2;
            points.push(createVector(sx, sy));
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            points.push(createVector(sx, sy));
        }
        return points;
    };
    return Shapes;
}());
var game;
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
//# sourceMappingURL=build.js.map