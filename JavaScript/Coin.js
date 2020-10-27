const coinImage = new Image();
coinImage.src = './images/Gold/Gold_1.png';
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
                this.image.src = './images/Gold/Gold_2.png';
                this.currentFrame++;
                break;
            case 2:
                this.image.src = './images/Gold/Gold_3.png';
                this.currentFrame++;
                break;
            case 3:
                this.image.src = './images/Gold/Gold_4.png';
                this.currentFrame++;
                break;
            case 4:
                this.image.src = './images/Gold/Gold_5.png';
                this.currentFrame++;
                break;
            case 5:
                this.image.src = './images/Gold/Gold_6.png';
                this.currentFrame++;
                break;
            case 6:
                this.image.src = './images/Gold/Gold_7.png';
                this.currentFrame++;
                break;
            case 7:
                this.image.src = './images/Gold/Gold_8.png';
                this.currentFrame++;
                break;
            case 8:
                this.image.src = './images/Gold/Gold_9.png';
                this.currentFrame++;
                break;
            case 9:
                this.image.src = './images/Gold/Gold_10.png';
                this.currentFrame++;
                break;
            case 10:
                this.image.src = './images/Gold/Gold_9.png';
                this.currentFrame++;
                break;
            case 11:
                this.image.src = './images/Gold/Gold_10.png';
                this.currentFrame++;
                break;
            case 12:
                this.image.src = './images/Gold/Gold_7.png';
                this.currentFrame++;
                break;
            case 13:
                this.image.src = './images/Gold/Gold_6.png';
                this.currentFrame++;
                break;
            case 14:
                this.image.src = './images/Gold/Gold_5.png';
                this.currentFrame++;
                break;
            case 15:
                this.image.src = './images/Gold/Gold_4.png';
                this.currentFrame++;
                break;
            case 16:
                this.image.src = './images/Gold/Gold_3.png';
                this.currentFrame++;
                break;
            case 17:
                this.image.src = './images/Gold/Gold_2.png';
                this.currentFrame++;
                break;
            case 18:
                this.image.src = './images/Gold/Gold_1.png';
                this.currentFrame = 1;
                break;
        }
    }


}
