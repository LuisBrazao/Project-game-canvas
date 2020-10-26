let currentGame;
let currentPlayer;
const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');
let gravity = 0.5;

let controller = {

    left: false,
    right: false,
    up: false,
    keyListener: function (event) {
        var key_state = (event.type == "keydown") ? true : false;
        switch (event.keyCode) {
            case 37: // left key
                controller.left = key_state;
                break;
            case 32: // up key
                controller.up = key_state;
                break;
            case 39: // right key
                controller.right = key_state;
                break;
        }
    }
};
startGame();


function startGame() {
    //Instantiate a new game of the game class
    currentGame = new Game();
    //Instantiate a new car
    currentPlayer = new Player();
    currentGame.player = currentPlayer;
    currentGame.player.draw();
    updateCanvas();
}


function hitBottom() {
    let rockBottom = myCanvas.height - currentGame.player.radius;
    if (currentGame.player.y > rockBottom) {
        currentGame.player.y = rockBottom;
        currentGame.player.vy = 0;
        this.jumping = false;
    }

}

function detectOnTop(obstacle) {
    if (currentGame.player.y > obstacle.y - obstacle.height &&
        currentGame.player.x + currentGame.player.width > obstacle.x &&
        currentGame.player.x < obstacle.x + obstacle.width &&
        currentGame.player.y < obstacle.y + obstacle.height) {
        currentGame.player.y = obstacle.y - currentGame.player.height;
        currentGame.player.vy = 0;
        currentGame.player.jumping = false;
    }
}


function collisionTop(obstacle) {
    if (currentGame.player.x < obstacle.x + obstacle.width &&
        currentGame.player.x + currentGame.player.width > obstacle.x &&
        currentGame.player.y < obstacle.y + obstacle.height &&
        !(currentGame.player.y + currentGame.player.height < obstacle.y + obstacle.height)) {
        currentGame.player.vy = 0;
        currentGame.player.y = obstacle.y + obstacle.height;
        currentGame.player.jumping = true;
    }
}

function collisionLeft(obstacle) {
    if ((currentGame.player.y < obstacle.y && currentGame.player.y + currentGame.player.height > obstacle.y) ||
        (currentGame.player.y < obstacle.y + obstacle.height && currentGame.player.y + currentGame.player.height > obstacle.y + obstacle.height) ||
        (currentGame.player.y > obstacle.y && currentGame.player.y + currentGame.player.height < obstacle.y + obstacle.height) ||
        (currentGame.player.y === obstacle.y && currentGame.player.y + currentGame.player.height === obstacle.y + obstacle.height) ||
        (currentGame.player.y === obstacle.y && currentGame.player.y + currentGame.player.height < obstacle.y + obstacle.height) ||
        (currentGame.player.y > obstacle.y && currentGame.player.y + currentGame.player.height === obstacle.y + obstacle.height)) {
        if (currentGame.player.x < obstacle.x + obstacle.width + 7 && currentGame.player.x + currentGame.player.width > obstacle.x + obstacle.width) {
            console.log(currentGame.player.x)
            console.log(obstacle.x + obstacle.width)
            console.log("---------------------------")
            currentGame.player.x = obstacle.x + obstacle.width + 7;
            currentGame.player.vx = 0;
            currentGame.player.jumping = true;
        }
    }
}


function collisionRight(obstacle) {
    if ((currentGame.player.y < obstacle.y && currentGame.player.y + currentGame.player.height > obstacle.y) ||
        (currentGame.player.y < obstacle.y + obstacle.height && currentGame.player.y + currentGame.player.height > obstacle.y + obstacle.height) ||
        (currentGame.player.y > obstacle.y && currentGame.player.y + currentGame.player.height < obstacle.y + obstacle.height) ||
        (currentGame.player.y === obstacle.y && currentGame.player.y + currentGame.player.height === obstacle.y + obstacle.height) ||
        (currentGame.player.y === obstacle.y && currentGame.player.y + currentGame.player.height < obstacle.y + obstacle.height) ||
        (currentGame.player.y > obstacle.y && currentGame.player.y + currentGame.player.height === obstacle.y + obstacle.height)) {
        if (currentGame.player.x + currentGame.player.width > obstacle.x - 7 && currentGame.player.x < obstacle.x) {
            console.log(currentGame.player.x + currentGame.player.width)
            console.log(obstacle.x)
            console.log("---------------------------ola")
            currentGame.player.x = obstacle.x - currentGame.player.width - 7;
            currentGame.player.vx = 0;
            currentGame.player.jumping = true;
        }
    }
}


let newObstacle = new Platform(300, 500, 200, 40);
currentGame.platforms.push(newObstacle);
let newObstacle1 = new Platform(200, 600, 200, 40);
currentGame.platforms.push(newObstacle1);
let newObstacle2 = new Platform(0, 660, 200, 40);
currentGame.platforms.push(newObstacle2);

function updateCanvas() {
    hitBottom();
    //detectOnTop();
    ctx.clearRect(0, 0, 800, 700);
    if (controller.up && currentGame.player.jumping === false) {
        currentGame.player.vy -= 50;
        currentGame.player.jumping = true;
    }

    if (controller.left) {
        currentGame.player.vx = -7;
    }

    if (controller.right) {
        currentGame.player.vx = 7;
    }

    currentGame.player.vy += 2; // gravity
    currentGame.player.x += currentGame.player.vx;
    currentGame.player.y += currentGame.player.vy;
    currentGame.player.vx *= 0.9; // friction
    currentGame.player.vy *= 0.9; // friction

    // if currentGame.player is falling below floor line
    if (currentGame.player.y + currentGame.player.height > myCanvas.height) {
        currentGame.player.jumping = false;
        currentGame.player.y = myCanvas.height - currentGame.player.height;
        currentGame.player.vy = 0;

    }


    for (let i = 0; i < currentGame.platforms.length; i++) {
        currentGame.platforms[i].draw();
        collisionTop(currentGame.platforms[i]);
        detectOnTop(currentGame.platforms[i]);
        collisionLeft(currentGame.platforms[i]);
        collisionRight(currentGame.platforms[i]);

    }

    currentGame.player.draw();
    window.addEventListener("keydown", controller.keyListener)
    window.addEventListener("keyup", controller.keyListener);
    requestAnimationFrame(updateCanvas);
}
