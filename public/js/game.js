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

/*  Player */
var playerX = WIDTH / 2;
var playerY = HEIGHT - 30;
var playerSpeed = 6;
var player = new __WEBPACK_IMPORTED_MODULE_1__Player__["a" /* default */](game);

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

        /* Set letter to top */
        if (currentLetter.y > HEIGHT + currentLetter.height) {
            currentLetter.y = 0;
            currentLetter.x = 40 + Math.floor(Math.random() * (WIDTH - 80));
        }

        currentLetter.setSpeed(letterSpeed);
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

function AnimateGame() {

    requestAnimationFrame(AnimateGame);

    ClearScreen();

    HandleInput();

    DrawLetters();

    DrawPlayer();
}

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

        this.size = 20 + Math.ceil(Math.random() * 8);

        this.letter = letters.substr(Math.floor(Math.random() * letters.length), 1);

        this.width = game.measureText('a').width;
        this.height = this.size * 0.75;
    }

    _createClass(Letter, [{
        key: "setSpeed",
        value: function setSpeed(speed) {
            this.speed = speed + Math.ceil(Math.random() * 0.3);
        }
    }, {
        key: "draw",
        value: function draw() {
            this.game.font = this.size + "px Nunito";
            this.game.fillStyle = "blue";
            this.game.font = this.size + "px Nunito";
            this.game.textAlign = "center";

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

/***/ })
/******/ ]);