class Player {
  constructor(brain) {
    this.rectWidth = 20;
    this.rectHeight = 100;
    this.ballSize = 20;
    this.ballSpeed = 5;
    this.rectSpeed = 5;

    this.rectX = 20;
    this.rectY = random(0, height - this.rectHeight);

    this.ballX = random(200, 450);
    this.ballY = random(10, 380);

    this.meX = width - 40;
    this.meY = 100;

    this.ballXDir = floor(random(0, 2));
    this.ballYDir = floor(random(0, 2));

    this.score = 0;
    this.fitness = 0;

    this.r = random(1, 255);
    this.g = random(1, 255);
    this.b = random(1, 255);

    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(9, 12, 2);
    }
  }

  dispose() {
    this.brain.dispose();
  }

  draw() {
    fill(this.r, this.g, this.b);
    rect(this.ballX, this.ballY, this.ballSize, this.ballSize);
    rect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
    rect(this.meX, this.meY, this.rectWidth, this.rectHeight);
  }

  update() {
    ++this.score;
    this.meMove();

    if (this.ballXDir === 0) {
      this.ballX -= this.ballSpeed;
    } else {
      this.ballX += this.ballSpeed;
    }

    if (this.ballYDir === 0) {
      this.ballY -= this.ballSpeed;
    } else {
      this.ballY += this.ballSpeed;
    }

    if (this.ballX + this.ballSize >= width) {
      this.ballXDir = 0;
    }

    if (this.ballY <= 0) {
      this.ballYDir = 1;
    } else if (this.ballY + this.ballSize >= height) {
      this.ballYDir = 0;
    }

    if (this.hit()) {
      this.score = this.score + 100;
      this.ballXDir = this.ballXDir === 0 ? 1 : 0;
    }

    if (this.hitMe()) {
      this.ballXDir = this.ballXDir === 0 ? 1 : 0;
    }
  }

  hitMe() {
    if (
      this.meX + this.rectWidth < this.ballX ||
      this.meX > this.ballX + this.ballSize ||
      this.meY + this.rectHeight < this.ballY ||
      this.meY > this.ballY + this.ballSize
    ) {
      // no collision
      return false;
    } else {
      return true;
    }
  }

  hit() {
    if (
      this.rectX + this.rectWidth < this.ballX ||
      this.rectX > this.ballX + this.ballSize ||
      this.rectY + this.rectHeight < this.ballY ||
      this.rectY > this.ballY + this.ballSize
    ) {
      // no collision
      return false;
    } else {
      return true;
    }
  }

  meMove() {
    if (keyIsDown(UP_ARROW)) {
      this.meY -= this.rectSpeed;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.meY += this.rectSpeed;
    }

    if (this.meY <= 0) {
      this.meY = 0;
    } else if (this.meY + this.rectHeight >= height) {
      this.meY = height - this.rectHeight;
    }
  }

  move(code) {
    if (code === UP_ARROW) {
      this.rectY -= this.rectSpeed;
    } else if (code === DOWN_ARROW) {
      this.rectY += this.rectSpeed;
    }

    if (this.rectY <= 0) {
      this.rectY = 0;
    } else if (this.rectY + this.rectHeight >= height) {
      this.rectY = height - this.rectHeight;
    }
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  think() {
    let inputone = [];
    inputone[0] = this.rectY / height;
    inputone[1] = this.rectHeight / height;
    inputone[2] = this.ballX / width;
    inputone[3] = this.ballY / height;
    inputone[4] = this.ballXDir;
    inputone[5] = this.ballYDir;
    inputone[6] = this.ballSize / 100;
    inputone[7] = this.rectX / width;
    inputone[8] = this.rectWidth / width;

    let output = this.brain.predict(inputone);

    if (output[0] > output[1]) {
      this.move(UP_ARROW);
    } else {
      this.move(DOWN_ARROW);
    }
  }
}
