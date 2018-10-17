import Letter from './Letter'
import Player from './Player'

/* Canvas Setup */
const canvas = document.querySelector('canvas')

const WIDTH = 700
const HEIGHT = 500

canvas.width = WIDTH
canvas.height = HEIGHT

const game = canvas.getContext("2d")

document.addEventListener("keydown", KeysDown, true);
document.addEventListener("keyup", KeysUp, true)

/* Keys Control */
let keys = [false, false, false];

/* Letters */
let maxLettersInGame = 24
let lettersInGame = []
let letterSpeed = 1

/*  Player */
let playerX = WIDTH / 2
let playerY = HEIGHT - 30
let playerSpeed = 6
let player = new Player(game)

function DrawPlayer() {
 player.draw(playerX, playerY)
}

function DrawLetters(){
    /* Create new Letters */
	if (Math.random() <= 0.05 && lettersInGame.length < maxLettersInGame) {
        var randomX = 40 + Math.floor(Math.random() * (WIDTH - 80));
        lettersInGame.push(new Letter(game, randomX));
    }

    for (var i = 0; i < lettersInGame.length; i++) {
        let currentLetter = lettersInGame[i];
      
        /* Set letter to top */
        if (currentLetter.y > HEIGHT + currentLetter.height) {
            currentLetter.y = 0;
            currentLetter.x = 40 + Math.floor(Math.random() * (WIDTH - 80));            
        }
        
        currentLetter.setSpeed(letterSpeed)
        currentLetter.draw();
    }
}

function HandleInput() {
    if (keys[0] == true && keys[1] == false && playerX <= WIDTH - 35) {
  	    playerX += playerSpeed;
    }
  
    if (keys[1] == true && keys[0] == false && playerX >= 10) {
  	    playerX -= playerSpeed;
    }
}

function KeysDown(e) {
	e.preventDefault();
  
  // Right
	if (e.keyCode == 39) {
  	keys[0] = true;
  }
  // Left
  else if (e.keyCode == 37) {
  	keys[1] = true;
  }
  
  // Up/Fire
  if (e.keyCode == 38) {
  	keys[2] = true;
  }
}

function KeysUp(e) {
  // Right
	if (e.keyCode == 39) {
  	keys[0] = false;
  }
  // Left
  else if (e.keyCode == 37) {
  	keys[1] = false;
  }
  
  // Up/Fire
  if (e.keyCode == 38) {
  	keys[2] = false;
  }
}

function ClearScreen() {
    game.fillStyle = '#ccc';
    game.fillRect(0, 0, canvas.width, canvas.height);
}

function AnimateGame(){
    
    requestAnimationFrame(AnimateGame)

    ClearScreen()

    HandleInput()

    DrawLetters()

    DrawPlayer()

}

AnimateGame();

