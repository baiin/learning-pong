let preserved = [];
let generation = 1;

function generateRow() {
  let avgscore = 0;

  for (let player of savedPlayers) {
    avgscore += player.score;
  }

  avgscore = parseFloat(avgscore / savedPlayers.length).toFixed(2);
  addData({ x: generation, y: parseFloat(avgscore) });
  ++generation;
}

function nextGen() {
  calculateFitness();

  for (let i = 0; i < totalPlayers; ++i) {
    players[i] = selectPlayer();
  }

  generateRow();

  for (let i = 0; i < totalPlayers; ++i) {
    savedPlayers[i].dispose();
  }

  savedPlayers = [];
}

function selectPlayer() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedPlayers[index].fitness;
    index++;
  }
  index--;
  let player = savedPlayers[index];
  let child = new Player(player.brain);
  child.mutate();

  preserved.push(index);

  return child;
}

function calculateFitness() {
  let sum = 0;

  for (let palyer of savedPlayers) {
    sum += palyer.score;
  }

  for (let palyer of savedPlayers) {
    palyer.fitness = palyer.score / sum;
  }
}
