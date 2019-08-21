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
var morph;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);
    textSize(50);
    rect(500, 500, 500, 500);
    textSize(50);
    text("Test", 750, 750);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() { }
//# sourceMappingURL=build.js.map