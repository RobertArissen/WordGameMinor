let lazerSpeed = 16;

export default class Laser {
    constructor(game, x, y){
        this.game = game
        this.x = x
        this.y = y
    }

    draw(){
        this.game.fillStyle = "#ffed4a";
        this.game.shadowColor = "#ffed4a";
        this.game.shadowBlur = 6;

        this.y -= lazerSpeed;
        this.game.fillRect(this.x, this.y, 3, 18);

        this.game.shadowBlur = 0;
    }
}