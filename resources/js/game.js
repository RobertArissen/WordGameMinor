import Letter from './Letter'


/* Canvas Setup */
const canvas = document.querySelector('canvas');

const WIDTH = 700
const HEIGHT = 500

canvas.width = WIDTH;
canvas.height = HEIGHT;

const game = canvas.getContext("2d");

/* Letters */
let maxLettersInGame = 24;
let lettersInGame = [];
let letterSpeed = 4;

function DrawLetters(){
    /* Create new Letters */
	if (Math.random() <= 0.05 && lettersInGame.length < maxLettersInGame) {
        var randomX = 40 + Math.floor(Math.random() * (WIDTH - 80));
        lettersInGame.push(new Letter(game, randomX));
    }


    for (var i = 0; i < lettersInGame.length; i++) {
        let currentEnemy = lettersInGame[i];
      
        /* Set letter to top */
        if (currentEnemy.getY() > HEIGHT + currentEnemy.getHeight()) {
            currentEnemy.y = 0;
            currentEnemy.x = 40 + Math.floor(Math.random() * (WIDTH - 80));
            continue;
        }
        
        currentEnemy.setSpeed(letterSpeed)
        currentEnemy.draw();
    }
}

function ClearScreen() {
    game.fillStyle = '#ccc';
    game.fillRect(0, 0, canvas.width, canvas.height);
}


function animateGame(){
    
    requestAnimationFrame(animateGame)

    ClearScreen();

    DrawLetters()
}

animateGame();

