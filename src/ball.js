class Ball {
  constructor(r, g, b) {
    this.x = random(200, 450);
    this.y = random(10, 380);
    this.r = r;
    this.g = g;
    this.b = b;
    this.size = 10;
    this.speed = 5;
    this.xDir = floor(random(0, 2));
    this.yDir = floor(random(2, 3));
  }

  update() {
    if (this.xDir === DIR.LEFT) {
      this.x -= this.speed;
    } else if (this.xDir === DIR.RIGHT) {
      this.x += this.speed;
    }

    if (this.yDir === DIR.UP) {
      this.y -= this.speed;
    } else if (this.yDir === DIR.DOWN) {
      this.y += this.speed;
    }

    if (this.x + this.size >= width) {
      this.xDir = DIR.LEFT;
    }

    if (this.y <= 0) {
      this.yDir = DIR.DOWN;
    } else if (this.y + this.size >= height) {
      this.yDir = DIR.UP;
    }
  }

  draw() {
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.size * 2);
  }
}
