class Player {
    constructor() {
        this.height = 40;
        this.width = 40;
        this.x = 400;
        this.y = 30;
        this.vx = 0;
        this.vy = 1;
        this.color = "green";
        this.jumping = false;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveCar(keyCode) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
        switch (keyCode) {
            case 37:
                //Making sure car doesn't go off the road
                this.vx = -5;
                break;
            case 39:
                //Making sure car doesn't go off the road
                this.vx = 5;
                break;
            case 32:
                if (this.jumping === false) {
                    this.userPull = 1;
                    this.jumping = true;
                } else {
                    this.userPull = 0;
                }
                break;
        }
    }
}
