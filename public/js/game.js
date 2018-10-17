/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Letter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Player__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lazer__ = __webpack_require__(7);
/* Import Objects */




/* Canvas Setup */
var canvas = document.querySelector('canvas');

var WIDTH = 700;
var HEIGHT = 500;

canvas.width = WIDTH;
canvas.height = HEIGHT;

var game = canvas.getContext("2d");

document.addEventListener("keydown", KeysDown, true);
document.addEventListener("keyup", KeysUp, true);

/* Keys Control */
var keys = [false, false, false];

/* Letters */
var maxLettersInGame = 24;
var lettersInGame = [];
var letterSpeed = 1;
var collidedLetterIndex = -1;

/*  Player */
var playerX = WIDTH / 2;
var playerY = HEIGHT - 30;
var playerSpeed = 4;
var player = new __WEBPACK_IMPORTED_MODULE_1__Player__["a" /* default */](game);

/* Lazers */
var lazerLoaded = true;
var lazers = [];
var lazerReloadDistance = playerY - 120;

/* Draw Functions */
function DrawPlayer() {
    player.draw(playerX, playerY);
}

function DrawLetters() {
    /* Create new Letters */
    if (Math.random() <= 0.05 && lettersInGame.length < maxLettersInGame) {
        var randomX = 40 + Math.floor(Math.random() * (WIDTH - 80));
        lettersInGame.push(new __WEBPACK_IMPORTED_MODULE_0__Letter__["a" /* default */](game, randomX));
    }

    for (var i = 0; i < lettersInGame.length; i++) {
        var currentLetter = lettersInGame[i];

        if (currentLetter.health <= 0) {
            lettersInGame.splice(i, 1);
            currentLetter.isDead();
        } else {
            /* Set letter to top */
            if (currentLetter.y > HEIGHT + currentLetter.height) {
                currentLetter.y = 0;
                currentLetter.x = 40 + Math.floor(Math.random() * (WIDTH - 80));
                currentLetter.randomLetter();
            }

            currentLetter.setSpeed(letterSpeed);
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
    } else {
        lazerLoaded = true;
    }

    for (var i = 0; i < lazers.length; i++) {
        var currentLazer = lazers[i];

        /* Als die nog op het scherm is, teken hem stuk hoger anders verwijderen */
        if (currentLazer.y > -20) {
            currentLazer.draw();
        } else {
            lazers.splice(i, 1);
        }
    }
}
/* End draw Functions */

/* Collision Function */
function CheckCollision() {
    for (var i = 0; i < lettersInGame.length; i++) {
        var currentLetter = lettersInGame[i];

        if (collidedLetterIndex == lettersInGame.indexOf(currentLetter) && currentEnemy.y < HEIGHT / 2) {
            collidedLetterIndex = -1;
        }

        for (var j = 0; j < lazers.length; j++) {
            var currentLazer = lazers[j];

            if (currentLazer.x <= currentLetter.x + currentLetter.width / 2 && currentLazer.x >= currentLetter.x - currentLetter.width / 2 && currentLazer.y <= currentLetter.y) {
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
            lazers.push(new __WEBPACK_IMPORTED_MODULE_2__Lazer__["a" /* default */](game, playerX + 13, playerY));
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

function ClearScreen() {
    game.fillStyle = '#ccc';
    game.fillRect(0, 0, canvas.width, canvas.height);
}

function AnimateGame() {

    requestAnimationFrame(AnimateGame);

    ClearScreen();

    HandleInput();

    CheckCollision();

    DrawLetters();

    DrawPlayer();

    DrawLazers();
}

/* Run Game */
AnimateGame();

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var Letter = function () {
    function Letter(game, x) {
        _classCallCheck(this, Letter);

        this.x = x;
        this.y = 0;

        this.game = game;

        this.size = 24 + Math.ceil(Math.random() * 3);

        this.width = game.measureText('a').width;
        this.height = this.size * 0.75;

        this.health = Math.ceil(Math.random() * 3);

        this.randomLetter();
    }

    _createClass(Letter, [{
        key: "setSpeed",
        value: function setSpeed(speed) {
            this.speed = speed + Math.ceil(Math.random() * 0.3);
        }
    }, {
        key: "isDead",
        value: function isDead() {
            console.log(this.letter);
        }
    }, {
        key: "randomLetter",
        value: function randomLetter() {
            this.letter = letters.substr(Math.floor(Math.random() * letters.length), 1);
        }
    }, {
        key: "draw",
        value: function draw() {
            this.game.fillStyle = "#1c3d5a";
            this.game.font = "bold " + this.size + "px Nunito";
            this.game.textAlign = "center";
            this.game.shadowColor = "rgba(0,0,0,0.5)";
            this.game.shadowBlur = 4;

            this.y += this.speed;

            this.game.fillText(this.letter, this.x, this.y);
        }
    }]);

    return Letter;
}();

/* harmony default export */ __webpack_exports__["a"] = (Letter);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(game, x, y) {
        _classCallCheck(this, Player);

        this.game = game;

        this.playerImage = new Image();
        this.playerImage.src = "/public/img/player.png";
    }

    _createClass(Player, [{
        key: "draw",
        value: function draw(x, y) {
            this.game.drawImage(this.playerImage, x, y);
        }
    }]);

    return Player;
}();

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lazerSpeed = 16;

var Lazer = function () {
    function Lazer(game, x, y) {
        _classCallCheck(this, Lazer);

        this.game = game;
        this.x = x;
        this.y = y;
    }

    _createClass(Lazer, [{
        key: "draw",
        value: function draw() {
            this.game.fillStyle = "#ffed4a";
            this.y -= lazerSpeed;
            this.game.fillRect(this.x, this.y, 2, 18);
        }
    }]);

    return Lazer;
}();

/* harmony default export */ __webpack_exports__["a"] = (Lazer);

/***/ })
/******/ ]);