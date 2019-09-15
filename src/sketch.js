let players = [];
let savedPlayers = [];
let totalPlayers = 100;
let counter = 0;
let slider;
let generations = 0;

function setup() {
    createCanvas(640, 400);
    background(0);
    slider = createSlider(1, 10, 1);
    for (let i = 0; i < totalPlayers; ++i) {
        players.push(new Player());
    }
}

function draw() {
    for (let n = 0; n < slider.value(); ++n) {
        for (let i = 0; i < players.length; ++i) {
            players[i].think();
            players[i].update();

            if (players[i].ballX <= 0) {
                savedPlayers.push(players.splice(i, 1)[0]);
            }
        }

        if (players.length === 0) {
            updateGen();
        }
    }

    background(0);
    fill(255);
    rect(width / 2 - 5, 20, 10, height - 40);

    for (let player of players) {
        player.draw();
    }
}

function updateGen() {
    ++generations;
    document.getElementById('gen-id').innerText = generations;
    nextGen();
}

function keyPressed() {
    if (key === 's') {
        let player = players[0];
        saveJSON(player.brain, 'player.json');
    }
}
