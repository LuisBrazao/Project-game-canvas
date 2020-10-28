class Door{
    constructor(x, y, width, height, index){
        this.x= x;
        this.y= y;
        this.width= width;
        this.height= height;
        this.index = index;
    }
    draw() {
        ctx.fillStyle = "brown";
        ctx.fillRect(this.x-7, this.y, this.width+14, this.height);
    }
}