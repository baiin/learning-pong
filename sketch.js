let players = [];
let savedPlayers = [];
let totalPlayers = 100;

function setup() {
  createCanvas(640, 400);
  background(0);

  for (let i = 0; i < totalPlayers; ++i) {
    players.push(new Player());
  }
}

function draw() {
  background(0);

  for (let i = 0; i < players.length; ++i) {
    players[i].think();
    players[i].update();

    if (players[i].ballX <= 0) {
      savedPlayers.push(players.splice(i, 1)[0]);
    }
  }

  for (let player of players) {
    player.draw();
  }

  if (players.length === 0) {
    nextGen();
  }
}
