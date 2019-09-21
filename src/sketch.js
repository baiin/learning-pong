let started = false;

// population variables
let instances = [];
let savedInstances = [];

// dom elements
let frameSlider;
let heightSlider;
let populationSlider;
let startButton;
let container;
let chart;
let canvas;

// user options
let options = {
  rectHeight: 80,
  totalInstances: 150
};

const DIR = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
  STOP: 4
};

function setup() {
  let main = createDiv("").id("main");

  let header = createDiv("");
  header.id("header");
  header.parent(main);
  let title = createElement("h2", "learning-pong");
  title.parent(header);
  title.id("title");
  startButton = createButton("start");
  startButton.class("btn btn-warning");
  startButton.mousePressed(reset);
  startButton.parent(header);
  startButton.size(100, 40);

  let body = createDiv("").id("body");

  canvas = createCanvas(640, 400);
  canvas.id("canvas");
  canvas.parent(body);
  background(0);
  tf.setBackend("cpu");

  let options = createDiv("").size(640, 200);
  options.id("options");
  let frameText = createP("Frame Rate");
  frameText.parent(options);
  frameSlider = createSlider(1, 10, 1);
  frameSlider.parent(options);

  let heightText = createP("Paddle Height");
  heightText.parent(options);
  heightSlider = createSlider(10, 200, options.rectHeight);
  heightSlider.parent(options);

  let populationText = createP("Population Size");
  populationText.parent(options);
  populationSlider = createSlider(1, 200, options.totalInstances);
  populationSlider.parent(options);
  options.parent(body);

  container = createDiv("").size(640, 400);
  container.id("canvas-container");
  chart = createElement("canvas", "");
  chart.id("myChart");
  chart.parent(container);
  container.parent(body);
  initChart();
}

function draw() {
  drawBoard();

  if (started) {
    for (let n = 0; n < frameSlider.value(); ++n) {
      for (let i = 0; i < instances.length; ++i) {
        instances[i].think();
        instances[i].update();

        if (instances[i].ball.x <= 0) {
          savedInstances.push(instances.splice(i, 1)[0]);
        }
      }

      if (instances.length === 0) {
        nextGen();
      }
    }

    for (let instance of instances) {
      instance.draw();
    }
  }
}

function drawBoard() {
  background(0);
  fill(255);
  rect(width / 2 - 5, 20, 10, height - 40);
}

function keyPressed() {
  if (key === "s") {
    let instance = instances[0];
    saveJSON(instance.brain, "instance.json");
  }
}

function reset() {
  options.rectHeight = heightSlider.value();
  options.totalInstances = populationSlider.value();

  for (let instance of instances) {
    instance.dispose();
  }

  for (let saved of savedInstances) {
    saved.dispose();
  }

  instances = [];
  savedInstances = [];

  for (let i = 0; i < options.totalInstances; ++i) {
    instances.push(new Instance());
  }

  resetChart();

  started = true;
}
