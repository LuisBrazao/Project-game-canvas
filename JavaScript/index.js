let currentGame;
let currentPlayer;
let id;
const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');
alteredMap1 = map1;
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
let frame = 0;

function startMap(number) {
    let platformArray = [];
    let coinsArray = [];
    let myData = alteredMap1;
    for (let i = 0; i < myData[number].platforms.length; i++) {
        let platform = new Platform(myData[number].platforms[i][0], myData[number].platforms[i][1], myData[number].platforms[i][2], myData[number].platforms[i][3]);
        platformArray.push(platform);
    }
    for (let i = 0; i < myData[number].coins.length; i++) {
        let coin = new Coin(myData[number].coins[i][0], myData[number].coins[i][1], myData[number].coins[i][2], myData[number].coins[i][3], i);
        coinsArray.push(coin);
    }
    let door = new Door(myData[number].door[0], myData[number].door[1], myData[number].door[2], myData[number].door[3], myData[number].door[4])
    let newMap = new MapLayout(myData[number].x, myData[number].y, platformArray, coinsArray, door);
    return newMap;
}



function getMap(number) {
    return startMap(number)
}

startGame();

function startGame() {
    //Instantiate a new game of the game class
    currentGame = new Game(1);
    //Instantiate a new car
    currentMap = getMap(currentGame.currentSection);
    currentPlayer = new Player(currentMap.startingPointX, currentMap.startingPointY);
    currentGame.player = currentPlayer;
    currentGame.player.update();
    currentGame.map = currentMap;
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


function checkDoor() {
    if (!((currentPlayer.y > currentMap.door.y + currentMap.door.height) ||
            (currentPlayer.x + currentPlayer.width < currentMap.door.x) ||
            (currentPlayer.x > currentMap.door.x + currentMap.door.width) ||
            (currentPlayer.y + currentPlayer.height < currentMap.door.y))) {
        currentGame.currentSection = currentMap.door.index;
        currentMap = getMap(currentGame.currentSection);
        currentPlayer.x = currentMap.startingPointX
        currentPlayer.y = currentMap.startingPointY;
        currentGame.player.update();
        currentGame.map = currentMap;
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
            currentGame.player.x = obstacle.x - currentGame.player.width - 7;
            currentGame.player.vx = 0;
            currentGame.player.jumping = true;
        }
    }
}

function catchCoin(coin) {
    if (!((currentPlayer.y > coin.y + coin.height) ||
            (currentPlayer.x + currentPlayer.width < coin.x) ||
            (currentPlayer.x > coin.x + coin.width) ||
            (currentPlayer.y + currentPlayer.height < coin.y))) {
        currentMap.coins.splice(coin.index, coin.index + 1);
        currentPlayer.coins++;
        alteredMap1[currentGame.currentSection].coins.splice(coin.index, coin.index + 1)
    }
}

function isOver() {
    if (currentPlayer.coins === alteredMap1[2]) {
        currentGame.status = false;
    }
}




function updateCanvas() {
    console.log('aqui')
    frame++;
    hitBottom();
    ctx.clearRect(0, 0, 800, 700);
    if (controller.up && currentGame.player.jumping === false) {
        currentGame.player.vy -= 50;
        currentGame.player.jumping = true;
    } else if (controller.left) {
        currentGame.player.vx = -7;
        currentGame.player.setImage("./images/standing-left.png");
    } else if (controller.right) {
        currentGame.player.vx = 7;
        currentGame.player.setImage("./images/standing-right.png");
    } else {
        currentGame.player.jumping = true;
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


    for (let i = 0; i < currentGame.map.platforms.length; i++) {
        currentGame.map.platforms[i].draw();
        collisionTop(currentGame.map.platforms[i]);
        detectOnTop(currentGame.map.platforms[i]);
        collisionLeft(currentGame.map.platforms[i]);
        collisionRight(currentGame.map.platforms[i]);
    }

    for (let i = 0; i < currentGame.map.coins.length; i++) {
        currentGame.map.coins[i].draw();
        if (frame % 7 === 0) {
            currentGame.map.coins[i].updateCoin();
            currentGame.map.coins[i].draw();
        }
        catchCoin(currentGame.map.coins[i]);
    }

    checkDoor();
    isOver();
    currentGame.player.update();
    window.addEventListener("keydown", controller.keyListener)
    window.addEventListener("keyup", controller.keyListener);
    if(currentGame.status){
        requestAnimationFrame(updateCanvas);
    }else{
        ctx.clearRect(0, 0, 800, 700);
    }
}
