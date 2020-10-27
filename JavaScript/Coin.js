const coinImage = new Image();
coinImage.src = './images/gold/gold_1.png';
class Coin {
    constructor(x, y, width, height, index) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.index = index;
        this.currentFrame = 1;
        this.image = coinImage;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    updateCoin() {
        switch (this.currentFrame) {
            case 1:
                this.image.src = './images/gold/gold_2.png';
                this.currentFrame ++;
                break;
            case 2:
                this.image.src = './images/gold/gold_3.png';
                this.currentFrame ++;
                break;
            case 3:
                this.image.src = './images/gold/gold_4.png';
                this.currentFrame ++;
                break;
            case 4:
                this.image.src = './images/gold/gold_5.png';
                this.currentFrame ++;
                break;
            case 5:
                this.image.src = './images/gold/gold_6.png';
                this.currentFrame ++;
                break;
            case 6:
                this.image.src = './images/gold/gold_7.png';
                this.currentFrame ++;
                break;
            case 7:
                this.image.src = './images/gold/gold_8.png';
                this.currentFrame ++;
                break;
            case 8:
                this.image.src = './images/gold/gold_9.png';
                this.currentFrame ++;
                break;
            case 9:
                this.image.src = './images/gold/gold_10.png';
                this.currentFrame ++;
                break;
            case 10:
                this.image.src = './images/gold/gold_1.png';
                this.currentFrame = 1;
                break;
        }
    }


}
