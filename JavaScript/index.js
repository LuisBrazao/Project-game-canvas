let currentGame;
let currentPlayer;
let currentLevel;
let id;
let startTime;
let endTime;
const myCanvas = document.getElementById('canvas');
myCanvas.style.display = "none";
const ctx = myCanvas.getContext('2d');
alteredMap1 = map1;
alteredMap2 = map2;

document.getElementById("start-level1").addEventListener('click', () => {
    myCanvas.style.display = "block";
    document.getElementById("start-level1").style.display = "none";
    document.getElementById("start-level2").style.display = "none";
    document.getElementById("scores").style.display = "none";
    startGame(alteredMap1);

})

document.getElementById("start-level2").addEventListener('click', () => {
    myCanvas.style.display = "block";
    document.getElementById("start-level2").style.display = "none";
    document.getElementById("start-level1").style.display = "none";
    document.getElementById("scores").style.display = "none";
    startGame(alteredMap2);

})


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

function startMap(map, number) {
    let platformArray = [];
    let coinsArray = [];
    let doorsArray = [];
    let myData = map;
    for (let i = 0; i < myData[number].platforms.length; i++) {
        let platform = new Platform(myData[number].platforms[i][0], myData[number].platforms[i][1], myData[number].platforms[i][2], myData[number].platforms[i][3]);
        platformArray.push(platform);
    }
    for (let i = 0; i < myData[number].coins.length; i++) {
        let coin = new Coin(myData[number].coins[i][0], myData[number].coins[i][1], myData[number].coins[i][2], myData[number].coins[i][3], i);
        coinsArray.push(coin);
    }
    for (let i = 0; i < myData[number].doors.length; i++) {
        let door = new Door(myData[number].doors[i][0], myData[number].doors[i][1], myData[number].doors[i][2], myData[number].doors[i][3], myData[number].doors[i][4])
        doorsArray.push(door);
    }
    let newMap = new MapLayout(myData[number].x, myData[number].y, myData[number].secondX, myData[number].secondY, platformArray, coinsArray, doorsArray);
    return newMap;
}



function getMap(map, number) {
    return startMap(map, number)
}

function startGame(map) {
    //Instantiate a new game of the game class
    startTime = new Date().getTime();
    currentGame = new Game(0);
    currentLevel = map;
    currentMap = getMap(map, currentGame.currentSection);
    currentPlayer = new Player(currentMap.startingPointX, currentMap.startingPointY);
    currentGame.player = currentPlayer;
    currentGame.player.update();
    currentGame.map = currentMap;
    updateCanvas();
}

function checkDoor(door) {
    if (!((currentPlayer.y > door.y + door.height) ||
            (currentPlayer.x + currentPlayer.width < door.x) ||
            (currentPlayer.x > door.x + door.width) ||
            (currentPlayer.y + currentPlayer.height < door.y))) {
        let oldIndex = currentGame.currentSection;
        currentGame.currentSection = door.index;
        currentMap = getMap(currentLevel, currentGame.currentSection);
        if (oldIndex < currentGame.currentSection) {
            currentPlayer.x = currentMap.startingPointX
            currentPlayer.y = currentMap.startingPointY;
            currentGame.player.update();
            currentGame.map = currentMap;
        } else {
            currentPlayer.x = currentMap.secondPointX
            currentPlayer.y = currentMap.secondPointY;
            currentGame.player.update();
            currentGame.map = currentMap;
        }

    }
}


function detectOnTop(obstacle) {
    if (currentGame.player.y > obstacle.y - obstacle.height &&
        currentGame.player.x + currentGame.player.width > obstacle.x &&
        currentGame.player.x < obstacle.x + obstacle.width &&
        currentGame.player.y < obstacle.y + obstacle.height) {
        return true;
    } else {
        return false;
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
        currentMap.coins.splice(coin.index, 1);
        currentPlayer.coins++;
        alteredMap1[currentGame.currentSection].coins.splice(coin.index, 1)
        let audio = new Audio('./Sounds/coin.wav');
        audio.play();
        for (let i = 0; i < currentGame.map.coins.length; i++) {
            currentGame.map.coins[i].index = i;
        }
    }
}

function isOver() {
    if (currentPlayer.coins === alteredMap1[alteredMap1.length - 1]) {
        currentGame.status = false;
        endTime = new Date().getTime();
        let time = endTime - startTime;
        addScore("Bernardo", 1, time, currentPlayer.coins);
        myCanvas.style.display = "none";
        getScores();
        document.getElementById("scores").style.display = "block";
        document.getElementById("start-level1").style.display = "none";
    }
}

function updateCanvas() {
    frame++;
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
    currentGame.player.vx *= 0.7; // friction
    currentGame.player.vy *= 0.85; // friction


    for (let i = 0; i < currentGame.map.platforms.length; i++) {
        currentGame.map.platforms[i].draw();
        collisionTop(currentGame.map.platforms[i])
        if (detectOnTop(currentGame.map.platforms[i])) {
            currentGame.player.jumping = false;
            currentGame.player.y = currentGame.map.platforms[i].y - currentGame.player.height;
            currentGame.player.vy = 0;
        }
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

    for (let i = 0; i < currentGame.map.door.length; i++) {
        currentGame.map.door[i].draw();
        checkDoor(currentGame.map.door[i]);
    }

    isOver();
    currentGame.player.update();
    window.addEventListener("keydown", controller.keyListener)
    window.addEventListener("keyup", controller.keyListener);
    if (currentGame.status) {
        requestAnimationFrame(updateCanvas);
    } else {
        ctx.clearRect(0, 0, 800, 700);
    }
}
