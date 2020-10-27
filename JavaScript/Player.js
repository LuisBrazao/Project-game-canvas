const image = new Image();
image.src = './images/standing-right.png';
class Player {
    constructor(x, y) {
        this.height = 41;
        this.width = 40;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 1;
        this.jumping = false;
        this.image = image;
        this.coins = 0;
    }

    update() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    setImage(src){
        this.image.src = src;
    }


}
