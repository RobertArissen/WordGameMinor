let lazerSpeed = 16;

export default class Lazer {
    constructor(game, x, y){
        this.game = game
        this.x = x
        this.y = y
    }

    draw(){
        this.game.fillStyle = "red";
        this.y -= lazerSpeed;
        this.game.fillRect(this.x, this.y, 2, 18);
    }
}