class MapLayout{
    constructor(x, y, secondX, secondY, platforms, coins, door){
        this.startingPointX = x;
        this.startingPointY = y;
        this.secondPointX = secondX;
        this.secondPointY = secondY;
        this.platforms = platforms;
        this.coins = coins;
        this.door = door;
    }

    addPlatform(platform){
        this.platforms.push(platform);
    }
}
