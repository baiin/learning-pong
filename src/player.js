class Player {
  constructor(brain) {
    this.rectWidth = 10;
    this.ballSize = 10;
    this.ballSpeed = 8;
    this.rectSpeed = 5;

    this.rectX = 30;
    this.rectY = random(0, height - rectHeight);

    this.ballX = random(200, 450);
    this.ballY = random(10, 380);

    this.meX = width - 40;
    this.meY = 100;

    this.ballXDir = floor(random(0, 2));
    this.ballYDir = floor(random(0, 2));

    this.rectYDir = 0;
    this.meYDir = 0;

    this.score = 0;
    this.fitness = 0;

    this.r = random(1, 255);
    this.g = random(1, 255);
    this.b = random(1, 255);

    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(9, 9, 2);
    }
  }

  dispose() {
    this.brain.dispose();
  }

  draw() {
    noStroke();
    fill(this.r, this.g, this.b);
    rect(this.ballX, this.ballY, this.ballSize, this.ballSize);
    rect(this.rectX, this.rectY, this.rectWidth, rectHeight);
    rect(this.meX, this.meY, this.rectWidth, rectHeight);
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

      if (this.rectYDir === 2) {
        this.ballYDir = 1;
      } else if (this.rectYDir == 1) {
        this.ballYDir = 0;
      }
    }

    if (this.hitMe()) {
      this.ballXDir = this.ballXDir === 0 ? 1 : 0;

      if (this.meYDir === 2) {
        this.ballYDir = 1;
      } else if (this.meYDir == 1) {
        this.ballYDir = 0;
      }
    }
  }

  hitMe() {
    if (
      this.meX + this.rectWidth < this.ballX ||
      this.meX > this.ballX + this.ballSize ||
      this.meY + rectHeight < this.ballY ||
      this.meY > this.ballY + this.ballSize
    ) {
      // no collision
      return false;
    } else {
      if (this.ballXDir === 1) {
        return true;
      }
    }

    return false;
  }

  hit() {
    if (
      this.rectX + this.rectWidth < this.ballX ||
      this.rectX > this.ballX + this.ballSize ||
      this.rectY + rectHeight < this.ballY ||
      this.rectY > this.ballY + this.ballSize
    ) {
      // no collision
      return false;
    } else {
      if (this.ballXDir === 0) {
        return true;
      }
    }

    return false;
  }

  meMove() {
    if (keyIsDown(UP_ARROW)) {
      this.meY -= this.rectSpeed;
      this.meYDir = 1;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.meY += this.rectSpeed;
      this.meYDir = 2;
    } else {
      this.meYDir = 0;
    }

    if (this.meY <= 0) {
      this.meY = 0;
    } else if (this.meY + rectHeight >= height) {
      this.meY = height - rectHeight;
    }
  }

  move(code) {
    if (code === UP_ARROW) {
      this.rectY -= this.rectSpeed;
      this.rectYDir = 1;
    } else if (code === DOWN_ARROW) {
      this.rectY += this.rectSpeed;
      this.rectYDir = 2;
    } else {
      this.rectYDir = 0;
    }

    if (this.rectY <= 0) {
      this.rectY = 0;
    } else if (this.rectY + rectHeight >= height) {
      this.rectY = height - rectHeight;
    }
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  think() {
    let inputone = [];
    inputone[0] = this.rectY / height;
    inputone[1] = rectHeight / height;
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
