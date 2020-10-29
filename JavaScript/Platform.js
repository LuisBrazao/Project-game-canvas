const platformImage = new Image();
platformImage.src = './images/platform.png';
class Platform{
    constructor(x, y, width, height){
        this.x= x;
        this.y= y;
        this.width= width;
        this.height= height;
        this.image = platformImage;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}