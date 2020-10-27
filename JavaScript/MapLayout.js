class MapLayout{
    constructor(x, y, platforms, coins, door){
        this.startingPointX = x;
        this.startingPointY = y;
        this.platforms = platforms;
        this.coins = coins;
        this.door = door;
    }

    addPlatform(platform){
        this.platforms.push(platform);
    }
}
