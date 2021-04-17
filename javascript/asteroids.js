
class Astroids{
    constructor(x, y, radius, velocityX, velocityY){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    draw(){

        ctx.beginPath();        
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle ='blue';        
        ctx.lineWidth = 3;
        ctx.stroke(); 

        this.x -= this.velocityX
        this.y += this.velocityY
        
    }
    update(){

        if((this.y - this.radius) < 0 || (this.y + this.radius) > canvas.height){
            this.velocityY = -1 * this.velocityY
        }
        this.draw();

        if((this.x + this.radius) < 0){

        }

    }
}