let started = false;

// population variables
let instances = [];
let savedInstances = [];

// dom elements
let frameSlider;
let heightSlider;
let populationSlider;
let startButton;

// user options
let options = {
    rectHeight: 60,
    totalInstances: 100
};

const DIR = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
    STOP: 4
};

function setup() {
    createCanvas(640, 400);
    background(0);
    tf.setBackend('cpu');

    frameSlider = createSlider(1, 10, 1);
    heightSlider = createSlider(10, 200, 60);
    populationSlider = createSlider(1, 200, 50);
    frameSlider.position(640, 0);
    heightSlider.position(640, 30);
    populationSlider.position(640, 60);
    startButton = createButton('start');
    startButton.mousePressed(reset);
    startButton.position(640, 90);
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
    if (key === 's') {
        let instance = instances[0];
        saveJSON(instance.brain, 'instance.json');
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

    started = true;
}
