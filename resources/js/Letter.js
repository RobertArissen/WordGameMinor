const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export default class Letter{
    constructor(game, x){
        this.x = x;
        this.y = 0;

        this.game = game

        this.health = Math.ceil(Math.random() * 4);

        this.size = 20
        
        this.letter = letters.substr(Math.floor(Math.random() * letters.length), 1);

        this.width = game.measureText('a').width;
        this.height = this.size * 0.75;
    }

    setSpeed(speed){
        this.speed = speed+Math.ceil(Math.random() * 4)
    }

    getY(){
        return this.y
    }

    getHeight(){
        return this.height
    }

    draw() {
        this.game.font = this.size+"px Arial";
        this.game.fillStyle = "blue";
        this.game.shadowColor = "blue";
        this.game.shadowBlur = 15;
        this.game.font = this.size+"px Arial";
        this.game.textAlign = "center";
        
        this.y += this.speed;
        
        this.game.fillText(this.letter, this.x, this.y);
    }
}