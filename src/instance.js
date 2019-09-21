class Instance {
  constructor(brain) {
    this.r = random(1, 255);
    this.g = random(1, 255);
    this.b = random(1, 255);
    this.ball = new Ball(this.r, this.g, this.b);
    this.leftRect = new Rect(
      this.r,
      this.g,
      this.b,
      30,
      random(0, height - options.rectHeight)
    );
    this.rightRect = new Rect(this.r, this.g, this.b, width - 50, 0);
    this.score = 0;
    this.fitness = 0;

    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(9, 9, 2);
    }
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  dispose() {
    this.brain.dispose();
  }

  thinkLeft() {
    let inputs = [];
    inputs[0] = this.leftRect.y;
    inputs[1] = this.leftRect.height;
    inputs[2] = this.ball.x;
    inputs[3] = this.ball.y;
    inputs[4] = this.ball.xDir;
    inputs[5] = this.ball.yDir;
    inputs[6] = this.ball.size;
    inputs[7] = this.leftRect.x;
    inputs[8] = this.leftRect.width;

    let outputs = this.brain.predict(inputs);

    if (outputs[0] > outputs[1]) {
      this.leftRect.move(UP_ARROW);
    } else {
      this.leftRect.move(DOWN_ARROW);
    }
  }

  thinkRight() {
    let inputs = [];
    inputs[0] = this.rightRect.y / height;
    inputs[1] = this.rightRect.height / height;
    inputs[2] = this.ball.x / width;
    inputs[3] = this.ball.y / height;
    inputs[4] = this.ball.xDir;
    inputs[5] = this.ball.yDir;
    inputs[6] = this.ball.size / 100;
    inputs[7] = this.rightRect.x / width;
    inputs[8] = this.rightRect.width / width;

    let outputs = this.brain.predict(inputs);

    if (outputs[0] > outputs[1]) {
      this.rightRect.move(UP_ARROW);
    } else {
      this.rightRect.move(DOWN_ARROW);
    }
  }

  think() {
    this.thinkLeft();
    // this.thinkRight();
  }

  hit(rect, dir) {
    if (
      rect.x + rect.width < this.ball.x ||
      rect.x > this.ball.x + this.ball.size ||
      rect.y + rect.height < this.ball.y ||
      rect.y > this.ball.y + this.ball.size
    ) {
      // no collision
      return false;
    } else {
      if (this.ball.xDir === dir) {
        return true;
      }
    }

    return false;
  }

  update() {
    ++this.score;
    this.ball.update();
    this.rightRect.control();
    // this.rightRect.autoMove();

    if (this.hit(this.leftRect, DIR.LEFT)) {
      this.score = this.score + 10;
      this.ball.xDir = this.ball.xDir === DIR.LEFT ? DIR.RIGHT : DIR.LEFT;

      if (this.leftRect.yDir === DIR.UP) {
        this.ball.yDir = DIR.UP;
      } else if (this.leftRect.yDir == DIR.DOWN) {
        this.ball.yDir = DIR.DOWN;
      }
    }

    if (this.hit(this.rightRect, DIR.RIGHT)) {
      this.score = this.score + 10;
      this.ball.xDir = this.ball.xDir === DIR.LEFT ? DIR.RIGHT : DIR.LEFT;

      if (this.rightRect.yDir === DIR.UP) {
        this.ball.yDir = DIR.UP;
      } else if (this.rightRect.yDir === DIR.DOWN) {
        this.ball.yDir = DIR.DOWN;
      }
    }
  }

  draw() {
    this.ball.draw();
    this.leftRect.draw();
    this.rightRect.draw();
  }
}
