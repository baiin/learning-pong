let players = [];
let savedPlayers = [];
let totalPlayers = 100;
let counter = 0;
let slider;
let started = false;
let rectHeight = 60;

let heightSlider;
let populationSlider;
let startButton;

function setup() {
  createCanvas(640, 400);
  background(0);
  tf.setBackend("cpu");
  slider = createSlider(1, 10, 1);
  heightSlider = createSlider(10, 200, 60);
  populationSlider = createSlider(1, 200, 50);
  slider.position(0, 0);
  heightSlider.position(0, 20);
  populationSlider.position(0, 40);
  startButton = createButton("start");
  startButton.mousePressed(reset);
  startButton.position(0, 60);
}

function draw() {
  if (started) {
    for (let n = 0; n < slider.value(); ++n) {
      for (let i = 0; i < players.length; ++i) {
        players[i].think();
        players[i].update();

        if (players[i].ballX <= 0) {
          savedPlayers.push(players.splice(i, 1)[0]);
        }
      }

      if (players.length === 0) {
        nextGen();
      }
    }

    background(0);
    fill(255);
    rect(width / 2 - 5, 20, 10, height - 40);

    for (let player of players) {
      player.draw();
    }
  }
}

function keyPressed() {
  if (key === "s") {
    let player = players[0];
    saveJSON(player.brain, "player.json");
  }
}

function reset() {
  console.log("started");

  rectHeight = heightSlider.value();
  totalPlayers = populationSlider.value();

  for (let player of players) {
    player.dispose();
  }

  for (let saved of savedPlayers) {
    saved.dispose();
  }

  players = [];
  savedPlayers = [];

  for (let i = 0; i < totalPlayers; ++i) {
    players.push(new Player());
  }

  started = true;
}
