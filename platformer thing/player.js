function Player(x,y) {
    //init vars
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 100;
    this.health = 100;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.maxGroundSpeed = 20;
    this.maxYSpeed = 40;
    this.drag = 0.6;
    this.playerCanMove = true;
    this.playerIsOnGround = true;
    //init methods
    this.step = function() {
        if(this.playerCanMove) {
            //x movement
            if(!leftKey && !rightKey || leftKey && rightKey) {
                this.xVelocity *= this.drag;
            } else if(rightKey) {
                console.log("right move success" + this.xVelocity);
                this.xVelocity++;
            } else if(leftKey) {
                console.log("left move success" + this.xVelocity);
                this.xVelocity--;
            }
            //y movement
            if(upKey) {
                this.yVelocity -= 10;
            }
            if(downKey) {
                this.yVelocity += 10;
            }
            //gravity
            this.yVelocity += 2
            //speed correction
            if(this.xVelocity > this.maxGroundSpeed) {
                this.xVelocity = this.maxGroundSpeed;
            } else if(this.xVelocity < -this.maxGroundSpeed) {
                this.xVelocity = -this.maxGroundSpeed;
            } else if(this.yVelocity > this.maxYSpeed) {
                this.yVelocity = this.maxYSpeed;
            } else if(this.yVelocity < -this.maxYSpeed) {
                this.yVelocity = -this.maxYSpeed;
            }
            //update player coords
            this.x += this.xVelocity;
            this.y += this.yVelocity;
            console.log("player y " + this.y);
        }
    }
    this.drawToCanvas = function() {
        context.fillStyle = "red";
        context.fillRect(this.x,this.y,this.width,this.height);
    }

}