class Platform{
    constructor(x, y, width, height){
        this.x= x;
        this.y= y;
        this.width= width;
        this.height= height;    
    }

    draw() {
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x-7, this.y, this.width+14, this.height);
    }
}