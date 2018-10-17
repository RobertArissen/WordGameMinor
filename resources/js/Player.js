export default class Player {
    constructor(game, x, y){
        this.game = game

        this.playerImage = new Image();
        this.playerImage.src = "/public/img/player.png"; 
    }

    draw(x, y){
        this.game.drawImage(this.playerImage,x,y);
    }
}