class Rect {
  constructor(r, g, b, x, y) {
    this.width = 10;
    this.height = options.rectHeight;
    this.speed = 5;
    this.r = r;
    this.g = g;
    this.b = b;
    this.x = x;
    this.y = y;
    this.yDir = DIR.STOP;
  }

  draw() {
    noStroke();
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.width, this.height);
  }

  control() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
      this.yDir = DIR.UP;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
      this.yDir = DIR.DOWN;
    } else {
      this.yDir = DIR.STOP;
    }

    if (this.y <= 0) {
      this.y = 0;
    } else if (this.y + this.height >= height) {
      this.y = height - this.height;
    }
  }

  autoMove() {
    if (random(0, 1) <= 0.25) {
      if (this.yDir === DIR.UP) {
        this.y -= this.speed;
      } else if (this.yDir === DIR.DOWN) {
        this.y += this.speed;
      } else {
        this.yDir = DIR.UP;
      }

      if (this.y <= 0 && this.yDir === DIR.UP) {
        this.yDir = DIR.DOWN;
      } else if (this.y + this.height >= height && this.yDir === DIR.DOWN) {
        this.yDir = DIR.UP;
      } else if (this.y === height / 2) {
        this.yDir = Math.floor(random(2, 4));
      }
    }
  }

  move(code) {
    if (code === UP_ARROW) {
      this.y -= this.speed;
      this.yDir = DIR.UP;
    } else if (code === DOWN_ARROW) {
      this.y += this.speed;
      this.yDir = DIR.DOWN;
    } else {
      this.yDir = DIR.STOP;
    }

    if (this.y <= 0) {
      this.y = 0;
    } else if (this.y + this.height >= height) {
      this.y = height - this.height;
    }
  }
}
