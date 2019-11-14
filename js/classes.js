class Ball {
    constructor() {
        this.x = width / 2;
        this.y = height - offset;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    show() {
        fill(255);
        ellipseMode(CENTER);
        ellipse(this.x, this.y, diameter, diameter);
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
}

class Player {
    constructor() {
        this.x = ball.x;
        this.y = ball.y + diameter / 2 + playerHeight / 2;
    }

    show() {
        rectMode(CENTER);
        rect(this.x, this.y, playerWidth, playerHeight);
    }

    update() {
        this.x = mouseX;
    }
}


class Block {
    constructor(x, y, r, g, b) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    show() {
        rectMode(CENTER);
        fill(this.r, this.g, this.b);
        rect(this.x, this.y, size, size);
    }
}