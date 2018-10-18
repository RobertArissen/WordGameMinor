/* Import Objects */
import Letter from './Letter'
import Player from './Player'
import Lazer from './Lazer'

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
let activeWord = false
let score = 0

/* Keys Control */
let keys = [false, false, false];

/* Letters */
let maxLettersInGame = 24
let lettersInGame = []
let letterSpeed = 1
let collidedLetterIndex = -1;

/*  Player */
let playerX = WIDTH / 2
let playerY = HEIGHT - 30
let playerSpeed = 4
let player = new Player(game)

/* Lazers */
let lazerLoaded = true;
let lazers = [];
let lazerReloadDistance = playerY - 120;

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
        var randomX = 40 + Math.floor(Math.random() * (WIDTH - 80));
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
                currentLetter.x = 40 + Math.floor(Math.random() * (WIDTH - 80));
                currentLetter.randomLetter()            
            }
            
            currentLetter.setSpeed(letterSpeed)
            currentLetter.draw();
        }
    }
}

function DrawLazers() {
	/* Kijk als de vorige lazer is ver genoeg voor een nieuwe lazer */
	if (lazers.length != 0) {
        if (lazers[lazers.length - 1].y <= lazerReloadDistance) {
            lazerLoaded = true;
        }
	}else {
  	    lazerLoaded = true;
    }
  
    for (var i = 0; i < lazers.length; i++) {
        var currentLazer = lazers[i];
        
        /* Als die nog op het scherm is, teken hem stuk hoger anders verwijderen */
        if (currentLazer.y > -20) {
            currentLazer.draw();
        }
        else {
            lazers.splice(i, 1);
        }
    }
}

function DrawHearts() {
    for (let index = 0; index < player.health; index++) {
        game.drawImage(heartImage,10+(index*30),10);
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
        
        for (let j = 0; j < lazers.length; j++) {
            let currentLazer = lazers[j];
        
            if (
                currentLazer.x <= currentLetter.x + (currentLetter.width / 2) && 
                currentLazer.x >= currentLetter.x - (currentLetter.width / 2) && 
                currentLazer.y <= currentLetter.y
                )
            {
                currentLetter.health--;
                lazers.splice(lazers.indexOf(currentLazer), 1);
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
        if (lazerLoaded) {
            lazers.push(new Lazer(game, playerX+13, playerY));
            lazerLoaded = false;
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
/* End input Functions */

/* EventBus Logic */
EventBus.$on('wordCorrect', data => {
    showNextWords = data

    setTimeout(() => {
        showNextWords = false
        lettersInGame = []
        lazers = []
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

    game.fillStyle = '#ccc';
    game.fillRect(0, 0, canvas.width, canvas.height);
}

function AnimateGame(){
    
    requestAnimationFrame(AnimateGame)

    ClearScreen()

    if(gameStarted){

        if(showNextWords){
            nextWordScreen()
        }else if(playedOut){
            playedOutScreen()
        }else if(player.health === 0){
            gameOverScreen()
        }else{
        HandleInput()
        
        CheckCollision()
    
        DrawLetters()
    
        DrawPlayer()
    
        DrawLazers()

        DrawHearts()
    }
    }else{
        startScreen()
    }
}

/* Run Game */
AnimateGame();

