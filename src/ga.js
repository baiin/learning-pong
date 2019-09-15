let selected = [];

function nextGen() {
    console.log('next generation');
    calculateFitness();

    for (let i = 0; i < totalPlayers; ++i) {
        players[i] = selectPlayer();
    }

    for (let i = 0; i < totalPlayers; ++i) {
        savedPlayers[i].dispose();
    }

    document.getElementById('pres-id').innerText = selected.filter(
        (item, index) => selected.indexOf(item) === index
    ).length;

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

    selected.push(index);

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
