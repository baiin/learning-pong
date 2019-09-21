let preserved = [];
let generation = 1;

function generateRow() {
  let avgscore = 0;

  for (let instance of savedInstances) {
    avgscore += instance.score;
  }

  avgscore = parseFloat(avgscore / savedInstances.length).toFixed(2);
  addData({ x: generation, y: parseFloat(avgscore) });
  ++generation;
}

function nextGen() {
  calculateFitness();

  for (let i = 0; i < options.totalInstances; ++i) {
    instances[i] = selectInstance();
  }

  generateRow();

  for (let i = 0; i < options.totalInstances; ++i) {
    savedInstances[i].dispose();
  }

  savedInstances = [];
}

function selectInstance() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedInstances[index].fitness;
    index++;
  }
  index--;
  const instance = savedInstances[index];
  const child = new Instance(instance.brain);
  child.mutate();

  preserved.push(index);

  return child;
}

function calculateFitness() {
  let sum = 0;

  for (let instance of savedInstances) {
    sum += instance.score;
  }

  for (let instance of savedInstances) {
    instance.fitness = instance.score / sum;
  }
}
