const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export default class Letter{
    constructor(game, x){
        this.x = x;
        this.y = 0;

        this.game = game

        this.size = 24+Math.ceil(Math.random() * 3)
        
        this.width = game.measureText('a').width;
        this.height = this.size * 0.75;

        this.health = Math.ceil(Math.random() * 3);

        this.randomLetter()
    }

    setSpeed(speed){
        this.speed = speed+Math.ceil(Math.random() * 0.3)
    }

    isDead(){
        console.log(this.letter)
    }

    randomLetter(){
        this.letter = letters.substr(Math.floor(Math.random() * letters.length), 1);
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