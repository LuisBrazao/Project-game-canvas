const doorImage = new Image();
doorImage.src = './images/door.png';
class Door{
    constructor(x, y, width, height, index){
        this.x= x;
        this.y= y;
        this.width= width;
        this.height= height;
        this.index = index;
        this.image = doorImage;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}