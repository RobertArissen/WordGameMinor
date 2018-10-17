const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export default class Letter{
    constructor(game, x){
        this.x = x;
        this.y = 0;

        this.game = game

        this.size = 20+Math.ceil(Math.random() * 8)
        
        this.letter = letters.substr(Math.floor(Math.random() * letters.length), 1);

        this.width = game.measureText('a').width;
        this.height = this.size * 0.75;
    }

    setSpeed(speed){
        this.speed = speed+Math.ceil(Math.random() * 0.3)
    }

    draw() {
        this.game.font = this.size+"px Nunito";
        this.game.fillStyle = "blue";
        this.game.font = this.size+"px Nunito";
        this.game.textAlign = "center";
        
        this.y += this.speed;
        
        this.game.fillText(this.letter, this.x, this.y);
    }

    
}