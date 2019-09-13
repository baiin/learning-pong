let x = 200;
let y = 200;
let size = 40;
let cars = [];
let players = [];
let savedPlayers = [];
let counter = 0;
let total = 5;

class Car {
    constructor() {
        this.speed = 5;
        this.width = random(40, 80);
        this.height = 40;
        this.y = 40 * Math.floor(random(0, 10));
        this.x = 0;
        this.direction = (this.y / 40) % 2 === 0 ? 0 : 1;
        this.r = random(1, 255);
        this.g = random(1, 255);
        this.b = random(1, 255);

        // 0 is moving RIGHT
        // 1 is moving LEFT
        if (this.direction === 0) {
            this.x = 0 - 40;
        } else {
            this.x = 400 + 40;
        }
    }

    hit(player) {
        if (this.y === player.y) {
            if (
                !(
                    this.x + this.width < player.x ||
                    this.x > player.x + player.size
                )
            ) {
                return true;
            }
        }

        return false;
    }

    update() {
        if (this.direction === 0) {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }
    }

    draw() {
        stroke(255);
        fill(this.r, this.g, this.b);
        rect(this.x, this.y, this.width, this.height);
    }

    offscreen() {
        return this.y >= height + this.height;
    }
}

class Player {
    constructor(brain) {
        this.size = 40;
        this.x = 200;
        this.y = 400 - this.size;
        this.score = 0;
        this.fitness = 0;

        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork([5], 8, 4);
        }
    }

    dispose() {
        this.brain.dispose();
    }

    draw() {
        fill(255);
        rect(this.x, this.y, this.size, this.size);
    }

    update() {
        ++this.score;
    }

    think(cars) {
        const inputs = [];
        for (let car of cars) {
            const input = [];
            input[0] = this.y / height;
            input[1] = this.x / width;
            input[2] = car.y / height;
            input[3] = floor(car.x) / width;
            input[4] = car.direction;
            inputs.push(input);
        }

        console.log(inputs);

        let output = this.brain.predict(inputs);
        console.log(output);
    }

    move(code) {
        if (code) {
            if (code === LEFT_ARROW) {
                this.x -= this.size;
            }

            if (code === RIGHT_ARROW) {
                this.x += this.size;
            }

            if (code === UP_ARROW) {
                this.y -= this.size;
            }

            if (code === DOWN_ARROW) {
                this.y += this.size;
            }
        }

        if (this.x <= 0) {
            this.x = 0;
        }

        if (this.x >= width - this.size) {
            this.x = width - this.size;
        }

        if (this.y <= 0) {
            this.y = 0;
        }

        if (this.y >= height - this.size) {
            this.y = height - this.size;
        }
    }
}

function keyPressed() {
    for (let player of players) {
        player.move(keyCode);
    }
}

function setup() {
    createCanvas(400, 400);
    background(0);
    players.push(new Player());
}

function draw() {
    background(0);

    if (counter % 20 == 0) {
        cars.push(new Car());
    }

    counter++;

    for (let i = 0; i < cars.length; ++i) {
        cars[i].update();

        if (cars[i].offscreen()) {
            cars.splice(i, 1);
        }

        for (let j = 0; j < players.length; ++j) {
            if (cars[i].hit(players[j])) {
                savedPlayers.push(players.splice(j, 1)[0]);
            }
        }
    }

    if (players.length === 0) {
        counter = 0;
        cars = [];
    }

    for (let player of players) {
        player.think(cars);
        player.update();
    }

    for (let car of cars) {
        car.draw();
    }

    for (let player of players) {
        player.draw();
    }
}

function nextGen() {
    console.log('next generation');
    calculateFitness();

    for (let i = 0; i < total; ++i) {
        players[i] = selectPlayer();
    }

    for (let i = 0; i < total; ++i) {
        players[i].dispose();
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
