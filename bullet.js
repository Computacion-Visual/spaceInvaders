class Bullet{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.radius = 5;
        this.damage = 10;
    }

    update(){
        this.y -= this.speed;
    }

    draw(){
        fill(255);
        ellipse(this.x, this.y, this.radius * 2);
    }
}
