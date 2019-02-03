/* Import Objects */
import Letter from './Letter'
import Player from './Player'
import Laser from './Laser'

/* Canvas Setup */
const canvas = document.querySelector('canvas')

const WIDTH = 700
const HEIGHT = 500

canvas.width = WIDTH
canvas.height = HEIGHT

const game = canvas.getContext("2d")

document.addEventListener("keydown", KeysDown, true);
document.addEventListener("keyup", KeysUp, true)

/* Game Setup */
let gameStarted = false
let showNextWords = false
let playedOut = false
let activeWord = ''
let score = 0

let backgroundImage = new Image();
backgroundImage.src = "/public/img/space.png"; 

/* Keys Control */
let keys = [false, false, false];

/* Letters */
let maxLettersInGame = 20
let lettersInGame = []
let letterSpeed = 1
let collidedLetterIndex = -1;

/*  Player */
let playerX = WIDTH / 2
let playerY = HEIGHT - 30
let playerSpeed = 4
let player = new Player(game)

/* lasers */
let laserLoaded = true;
let lasers = [];
let laserReloadDistance = playerY - 120;

/* Health */
let heartImage = new Image();
heartImage.src = "/public/img/heart.png"; 


/* Draw Functions */
function DrawPlayer() {
 player.draw(playerX, playerY)
}

function DrawLetters(){
    /* Create new Letters */
	if (Math.random() <= 0.05 && lettersInGame.length < maxLettersInGame) {
        let randomX = 40 + Math.floor(Math.random() * (WIDTH - 80));
        lettersInGame.push(new Letter(game, randomX, activeWord));
    }

    for (var i = 0; i < lettersInGame.length; i++) {
        let currentLetter = lettersInGame[i];

        if (currentLetter.health <= 0) {
            lettersInGame.splice(i, 1);
            currentLetter.isDead()
        }else{
            /* Set letter to top */
            if (currentLetter.y > HEIGHT + currentLetter.height) {
                currentLetter.y = 0;
                currentLetter.x = 40 + Math.floor(Math.random() * (WIDTH - 40));
                currentLetter.randomLetter()            
            }
            
            currentLetter.setSpeed(letterSpeed)
            currentLetter.draw();
        }
    }
}

function Drawlasers() {
	/* Kijk als de vorige laser is ver genoeg voor een nieuwe laser */
	if (lasers.length != 0) {
        if (lasers[lasers.length - 1].y <= laserReloadDistance) {
            laserLoaded = true;
        }
	}else {
  	    laserLoaded = true;
    }
  
    for (var i = 0; i < lasers.length; i++) {
        var currentlaser = lasers[i];
        
        /* Als die nog op het scherm is, teken hem stuk hoger anders verwijderen */
        if (currentlaser.y > -20) {
            currentlaser.draw();
        }
        else {
            lasers.splice(i, 1);
        }
    }
}

function DrawHearts() {
    for (let index = 0; index < player.health; index++) {
        game.shadowColor = "red";
        game.shadowBlur = 6;
        game.drawImage(heartImage,10+(index*30),10);

        game.shadowBlur = 0;
    }
}
/* End draw Functions */

/* Collision Function */
function CheckCollision() {
	for (let i = 0; i < lettersInGame.length; i++) {
        let currentLetter= lettersInGame[i];
        
        if (collidedLetterIndex == lettersInGame.indexOf(currentLetter) && currentEnemy.y < HEIGHT / 2) {
            collidedLetterIndex = -1;
        }
        
        for (let j = 0; j < lasers.length; j++) {
            let currentlaser = lasers[j];
        
            if (
                currentlaser.x <= currentLetter.x + (currentLetter.width / 2) && 
                currentlaser.x >= currentLetter.x - (currentLetter.width / 2) && 
                currentlaser.y <= currentLetter.y
                )
            {
                currentLetter.health--;
                lasers.splice(lasers.indexOf(currentlaser), 1);
            }
        }
    }
}
/* End Collision Function */

/* Input Functions */
function HandleInput() {
    if (keys[0] == true && keys[1] == false && playerX <= WIDTH - 35) {
  	    playerX += playerSpeed;
    }
  
    if (keys[1] == true && keys[0] == false && playerX >= 10) {
  	    playerX -= playerSpeed;
    }

    if (keys[2]) {
        if (laserLoaded) {
            lasers.push(new Laser(game, playerX+13, playerY));
            laserLoaded = false;
        }
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
  if (e.keyCode == 32) {
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
  if (e.keyCode == 32) {
  	keys[2] = false;
  }
}
/* End input Functions */

/* EventBus Logic */
EventBus.$on('wordCorrect', data => {
    showNextWords = data

    setTimeout(() => {
        showNextWords = false
        lettersInGame = []
        lasers = []
    }, 2000);
});

EventBus.$on('playedOut', data => {
    playedOut = data
});

EventBus.$on('activeWord', word => {
    activeWord = word
});

EventBus.$on('playerHealth', health => {    
    player.health = health
});

EventBus.$on('score', data => {    
    score = data
});

EventBus.$on('launchGame', data => { 
    gameStarted = data
    EventBus.$emit('gameStarted', gameStarted)
});


/* Start Screen Functions */
function startScreen(){
    canvas.style.cursor = 'pointer'

    game.font = '24pt Nunito';
    game.textAlign = 'center';
    game.fillStyle = '#3490dc';
    game.fillText('Start game', canvas.width/2, canvas.height/2);
}

canvas.addEventListener('click', (e) => {
    if(!gameStarted){
        gameStarted = true
        EventBus.$emit('gameStarted', gameStarted)
    }
});
/* End Screen Functions */


function nextWordScreen(){
    game.font = '24pt Nunito';
    game.textAlign = 'center';
    game.fillStyle = '#3490dc';
    game.fillText('Het '+ showNextWords[0] +' woord voor '+ showNextWords[1], canvas.width/2, canvas.height/2);
}

function playedOutScreen(){
    game.font = '24pt Nunito';
    game.textAlign = 'center';
    game.fillStyle = '#3490dc';
    game.fillText('Je hebt het spel uitgespeeld!', canvas.width/2, canvas.height/2);
}

function gameOverScreen(){
    game.font = '24pt Nunito';
    game.textAlign = 'center';
    game.fillStyle = '#3490dc';
    game.fillText('Je bent af met een score van: '+ score, canvas.width/2, canvas.height/2);
}

function ClearScreen() {
    canvas.style.cursor = 'default'

    game.drawImage(backgroundImage,0,0);   

}

function resetGame(){
    setTimeout(() => {
        location.reload();
    }, 2000);
}

function AnimateGame(){
    
    requestAnimationFrame(AnimateGame)

    ClearScreen()

    if(gameStarted){

        if(showNextWords){
            nextWordScreen()
        }else if(playedOut){
            playedOutScreen()
            resetGame()
        }else if(player.health === 0){
            gameOverScreen()
            resetGame()
        }else{
        HandleInput()
        
        CheckCollision()
    
        DrawLetters()
    
        DrawPlayer()
    
        Drawlasers()

        DrawHearts()
    }
    }else{
        startScreen()
    }
}

/* Run Game */
AnimateGame();

