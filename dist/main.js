/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMHandler.js":
/*!***************************!*\
  !*** ./src/DOMHandler.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ "./src/Game.js");


var DOMHandler = function () {
  var lengths = [5, 4, 3, 3, 2];
  var vertical = false;

  var createBoard = function createBoard(domBoard, board, player) {
    return new Promise(function (resolve) {
      var l = 0; // i is the y axis

      var _loop = function _loop(i) {
        var _loop2 = function _loop2(j) {
          var gridElement = document.createElement("div");
          gridElement.classList.add("board-element");
          gridElement.dataset.coords = "(".concat(j, ", ").concat(i, ")");
          domBoard.appendChild(gridElement); // Check if have to place first

          if (!player) {
            gridElement.addEventListener("click", function () {
              board.receiveAttack(j, i);
              _Game__WEBPACK_IMPORTED_MODULE_0__.default.playRound();
            }, {
              once: true
            });
          } else {
            if (i === 0 && j === 0) {
              var toggle = document.createElement("h1");
              if (!vertical) toggle.textContent = "Vertical";else toggle.textContent = "Horizontal";
              toggle.id = "toggle";
              gridElement.parentElement.parentElement.appendChild(toggle);
              toggle.addEventListener("click", function () {
                if (vertical) {
                  vertical = false;
                  toggle.textContent = "Vertical";
                } else {
                  vertical = true;
                  toggle.textContent = "Horizontal";
                }
              });
            }

            gridElement.addEventListener("mouseover", function () {
              if (!vertical) {
                for (var k = j; k < lengths[l] + j; k++) {
                  var element = gridElement.parentElement.querySelector("div[data-coords=\"(".concat(k, ", ").concat(i, ")\"]"));
                  if (!element) return;
                  element.classList.add("hovered");
                }
              } else {
                for (var _k = i; _k < lengths[l] + i; _k++) {
                  var _element = gridElement.parentElement.querySelector("div[data-coords=\"(".concat(j, ", ").concat(_k, ")\"]"));

                  if (!_element) return;

                  _element.classList.add("hovered");
                }
              }
            });
            gridElement.addEventListener("mouseout", function () {
              if (!vertical) {
                for (var k = j; k < lengths[l] + j; k++) {
                  var element = gridElement.parentElement.querySelector("div[data-coords=\"(".concat(k, ", ").concat(i, ")\"]"));
                  if (!element) return;
                  element.classList.remove("hovered");
                }
              } else {
                for (var _k2 = i; _k2 < lengths[l] + i; _k2++) {
                  var _element2 = gridElement.parentElement.querySelector("div[data-coords=\"(".concat(j, ", ").concat(_k2, ")\"]"));

                  if (!_element2) return;

                  _element2.classList.remove("hovered");
                }
              }
            });
            gridElement.addEventListener("click", function () {
              if (board.placeShip(j, i, lengths[l], vertical, true) === true) {
                board.placeShip(j, i, lengths[l], vertical, true);

                if (!vertical) {
                  for (var k = j; k < lengths[l] + j; k++) {
                    gridElement.parentElement.querySelector("div[data-coords=\"(".concat(k, ", ").concat(i, ")\"]")).classList.remove("hovered");
                  }
                } else {
                  for (var _k3 = i; _k3 < lengths[l] + i; _k3++) {
                    gridElement.parentElement.querySelector("div[data-coords=\"(".concat(j, ", ").concat(_k3, ")\"]")).classList.remove("hovered");
                  }
                }

                l++;
                if (l === 5) endSetUp(domBoard, board, resolve, l);
              }
            });
          }
        };

        // j is the x axis
        for (var j = 0; j < 10; j++) {
          _loop2(j);
        }
      };

      for (var i = 0; i < 10; i++) {
        _loop(i);
      }
    });
  }; // eslint-disable-next-line no-unused-vars


  var endSetUp = function endSetUp(domBoard, board, resolve, l) {
    domBoard.style.pointerEvents = "none";
    domBoard.parentElement.querySelector("#toggle").remove();

    (function () {
      if (document.querySelector(".buttons-container")) return document.querySelector(".buttons-container").style = "";
      var div = document.createElement("div");
      div.classList.add("buttons-container");
      var start = document.createElement("h1");
      start.textContent = "Start Game";
      start.style.cursor = "pointer";
      div.appendChild(start);
      var reset = document.createElement("h1");
      reset.textContent = "Reset";
      reset.style.cursor = "pointer";
      div.appendChild(reset);
      domBoard.parentElement.appendChild(div);
      start.addEventListener("click", function () {
        div.remove();
        resolve();
      });
      reset.addEventListener("click", function () {
        l = 0;
        domBoard.style.pointerEvents = "initial";
        domBoard.innerHTML = "";
        createBoard(domBoard, board, true);
        div.style.display = "none";
        board.reset();
      });
    })();
  };

  var placeShip = function placeShip(x, y, domBoard) {
    var visible = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var element = domBoard.querySelector(".board-element[data-coords=\"(".concat(x, ", ").concat(y, ")\"]"));
    if (visible) element.style.backgroundColor = "red";
  };

  var createBoards = function createBoards() {
    var boards = document.createElement("div");
    boards.id = "boards";
    var playerboardContainer = document.createElement("div");
    playerboardContainer.id = "playerboard-container";
    var playerboard = document.createElement("div");
    playerboard.id = "playerboard";
    playerboard.classList.add("board");
    playerboard.style.pointerEvents = "inherit";
    playerboardContainer.appendChild(playerboard);
    boards.appendChild(playerboardContainer);
    var computerboard = document.createElement("div");
    computerboard.id = "computerboard";
    computerboard.classList.add("board");
    boards.appendChild(computerboard);
    document.querySelector("#content").appendChild(boards);
  };

  var menuStartGame = function menuStartGame() {
    return new Promise(function (resolve) {
      var menuStartGame = document.querySelector("#menu-start-game");
      menuStartGame.addEventListener("click", function () {
        menuStartGame.parentElement.style.opacity = "0%";
        setTimeout(function () {
          return menuStartGame.parentElement.remove();
        }, 325);
        setTimeout(function () {
          createBoards();
          resolve();
        }, 0);
      });
    });
  };

  var missShot = function missShot(x, y, domBoard) {
    return domBoard.querySelector(".board-element[data-coords=\"(".concat(x, ", ").concat(y, ")\"]")).style.backgroundColor = "yellow";
  };

  var hitShot = function hitShot(x, y, domBoard) {
    return domBoard.querySelector(".board-element[data-coords=\"(".concat(x, ", ").concat(y, ")\"]")).classList.add("hit");
  };

  return {
    createBoard: createBoard,
    placeShip: placeShip,
    missShot: missShot,
    hitShot: hitShot,
    menuStartGame: menuStartGame
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMHandler);

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Game = function () {
  var players = [];
  var _playerTurn = true;
  var gameOver = false;

  var didPlayersSink = function didPlayersSink() {
    for (var i = 0; i < players.length; i++) {
      if (players[i].gameboard.didShipsSink()) return players[i];
    }

    return false;
  };

  var clearPlayers = function clearPlayers() {
    return players.length = 0;
  };

  var switchTurnsDOM = function switchTurnsDOM(test) {
    if (test) return;
    document.querySelector("#computerboard").classList.toggle("not-turn");
    document.querySelector("#playerboard").classList.toggle("not-turn");
  };

  var computerTurn = function computerTurn() {
    var computer = players.find(function (player) {
      return player.name === "Computer";
    });
    computer.play(players.find(function (player) {
      return player.name === "Player";
    }), computer.getRandomCoord).then(function () {
      switchTurnsDOM();
      isGameOver(alert);
    });
  };

  var playerTurn = function playerTurn(test) {
    return switchTurnsDOM(test);
  };

  var isGameOver = function isGameOver(alert) {
    if (didPlayersSink()) {
      setTimeout(function () {
        return alert("s");
      }, 0);
      gameOver = true;
    }
  };

  var changeTurns = function changeTurns() {
    return _playerTurn = !_playerTurn;
  };

  var playRound = function playRound(test) {
    if (gameOver) return;
    _playerTurn ? playerTurn(test) : computerTurn();
    changeTurns();
    isGameOver(alert);
    if (_playerTurn === false) return playRound();
    return _playerTurn;
  };

  return {
    players: players,
    didPlayersSink: didPlayersSink,
    clearPlayers: clearPlayers,
    playRound: playRound
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOMHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMHandler.js */ "./src/DOMHandler.js");
/* harmony import */ var _Ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship.js */ "./src/Ship.js");



var Gameboard = function Gameboard(domBoard) {
  var board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  var ships = [];
  var missedShots = [];

  var placeShip = function placeShip(xCoord, yCoord, length, vertical, visible, computer) {
    if (!checkRange(xCoord, yCoord, length, vertical, computer)) return "Out of range";
    var ship = (0,_Ship_js__WEBPACK_IMPORTED_MODULE_1__.default)(length);
    ships.push(ship); // j is ship parts

    var j = 0;

    if (!vertical) {
      for (var i = xCoord; i < length + xCoord; i++) {
        setGrid(i, yCoord, [ship, j]);
        if (domBoard) _DOMHandler_js__WEBPACK_IMPORTED_MODULE_0__.default.placeShip(i, yCoord, domBoard, visible);
        j++;
      }
    } else {
      for (var _i = yCoord; _i < length + yCoord; _i++) {
        setGrid(xCoord, _i, [ship, j]);
        if (domBoard) _DOMHandler_js__WEBPACK_IMPORTED_MODULE_0__.default.placeShip(xCoord, _i, domBoard, visible);
        j++;
      }
    }

    return true;
  };

  var placeShipRandomly = function placeShipRandomly(length, vertical, visibility, computer) {
    var foo = function foo() {
      if (placeShip(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), length, vertical, visibility, computer) === "Out of range") foo();
    };

    foo();
  };

  var checkRange = function checkRange(xCoord, yCoord, length, vertical, computer) {
    if (!vertical) {
      // This checks if ships is out of bounds
      if (xCoord + length > 10) return false; // This checks for overlapping

      for (var i = xCoord; i < length + xCoord; i++) {
        if (getGrid(i, yCoord) !== 0) return false;

        if (computer) {
          if (xCoord + length !== 10) if (getGrid(i + 1, yCoord) !== 0) return false;
          if (xCoord !== 0) if (getGrid(i - 1, yCoord) !== 0) return false;
          if (yCoord !== 9) if (getGrid(i, yCoord + 1) !== 0) return false;
          if (yCoord !== 0) if (getGrid(i, yCoord - 1) !== 0) return false;
        }
      }

      return true;
    } else {
      if (yCoord + length > 10) return false;

      for (var _i2 = yCoord; _i2 < length + yCoord; _i2++) {
        if (getGrid(xCoord, _i2) !== 0) return false;

        if (computer) {
          if (yCoord + length !== 10) if (getGrid(xCoord, _i2 + 1) !== 0) return false;
          if (yCoord !== 0) if (getGrid(xCoord, _i2 - 1) !== 0) return false;
          if (xCoord !== 9) if (getGrid(xCoord + 1, _i2) !== 0) return false;
          if (xCoord !== 0) if (getGrid(xCoord - 1, _i2) !== 0) return false;
        }
      }

      return true;
    }
  };

  var receiveAttack = function receiveAttack(x, y) {
    if (typeof getGrid(x, y) !== "number") return hitShot(x, y);else if (getGrid(x, y) === 1) return "You already tried to hit this one";else return missShot(x, y);
  };

  var hitShot = function hitShot(x, y) {
    if (domBoard) _DOMHandler_js__WEBPACK_IMPORTED_MODULE_0__.default.hitShot(x, y, domBoard);
    getGrid(x, y)[0].hit(getGrid(x, y)[1]);
    setGrid(x, y, 1);
    return true;
  };

  var missShot = function missShot(x, y) {
    missedShots.push([x, y]);
    setGrid(x, y, 1);
    if (domBoard) _DOMHandler_js__WEBPACK_IMPORTED_MODULE_0__.default.missShot(x, y, domBoard);
    return "Miss!";
  };

  var didShipsSink = function didShipsSink() {
    for (var i = 0; i < ships.length; i++) {
      if (!ships[i].hasSunk()) return false;
    }

    return true;
  };

  var reset = function reset() {
    ships.length = 0;

    for (var y = 0; y < 10; y++) {
      for (var x = 0; x < 10; x++) {
        setGrid(x, y, 0);
      }
    }
  };

  var getGrid = function getGrid(x, y) {
    return board[y][x];
  };

  var setGrid = function setGrid(x, y, value) {
    return board[y][x] = value;
  };

  return {
    placeShip: placeShip,
    placeShipRandomly: placeShipRandomly,
    board: board,
    getGrid: getGrid,
    receiveAttack: receiveAttack,
    missedShots: missedShots,
    didShipsSink: didShipsSink,
    domBoard: domBoard,
    reset: reset
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard.js */ "./src/Gameboard.js");
/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game.js */ "./src/Game.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var Player = function Player(board, name) {
  var obj;
  var targets = [];
  var shots = [];
  var gameboard = (0,_Gameboard_js__WEBPACK_IMPORTED_MODULE_0__.default)(document.querySelector("#".concat(board)));

  var play = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(player, getRandomCoord) {
      var temp, playerGameboard, randomPlay;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, Math.floor(Math.random() * 500) + 500);
              });

            case 2:
              temp = _context.sent;

              if (!(targets.length !== 0)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", targetMode(player));

            case 5:
              playerGameboard = player.gameboard;

              randomPlay = function randomPlay() {
                var x = getRandomCoord();
                var y = getRandomCoord();
                if (playerGameboard.getGrid(x, y) === 1) return randomPlay();
                var attack = playerGameboard.receiveAttack(x, y);
                shots.push([x, y]);
                if (attack === true) loadTargets([x, y]);
                return Promise.resolve(attack);
              };

              return _context.abrupt("return", randomPlay());

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function play(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var loadTargets = function loadTargets(coords) {
    if (coords[0] + 1 !== 10) if (searchForDuplicates([coords[0] + 1, coords[1]])) targets.push([coords[0] + 1, coords[1]]);
    if (coords[0] - 1 !== 0) if (searchForDuplicates([coords[0] - 1, coords[1]])) targets.push([coords[0] - 1, coords[1]]);
    if (coords[1] - 1 !== 0) if (searchForDuplicates([coords[0], coords[1] - 1])) targets.push([coords[0], coords[1] - 1]);
    if (coords[1] + 1 !== 10) if (searchForDuplicates([coords[0], coords[1] + 1])) targets.push([coords[0], coords[1] + 1]);
  };

  var targetMode = function targetMode(player) {
    var hit = player.gameboard.receiveAttack(targets[0][0], targets[0][1]);
    shots.push([targets[0][0], targets[0][1]]);

    if (hit === true) {
      loadTargets([targets[0][0], targets[0][1]]);
    }

    targets.shift();
  };

  var searchForDuplicates = function searchForDuplicates(coords) {
    for (var i = 0; i < targets.length; i++) {
      if (targets[i][0] === coords[0] && targets[i][1] === coords[1]) return false;
    }

    for (var _i = 0; _i < shots.length; _i++) {
      if (shots[_i][0] === coords[0] && shots[_i][1] === coords[1]) return false;
    }

    return true;
  };

  var getRandomCoord = function getRandomCoord() {
    return Math.floor(Math.random() * 10);
  };

  obj = {
    gameboard: gameboard,
    play: play,
    getRandomCoord: getRandomCoord,
    name: name,
    targets: targets
  };
  _Game_js__WEBPACK_IMPORTED_MODULE_1__.default.players.push(obj);
  return obj;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ship = function Ship(length) {
  var info = [];

  for (var i = 0; i < length; i++) {
    info.push(0);
  }

  var hit = function hit(number) {
    info[number] = 1;
    return "Ship has been hit at ".concat(number);
  };

  var hasSunk = function hasSunk() {
    for (var _i = 0; _i < info.length; _i++) {
      if (info[_i] === 0) return false;
    }

    return true;
  };

  return {
    length: length,
    info: info,
    hit: hit,
    hasSunk: hasSunk
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DOMHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMHandler */ "./src/DOMHandler.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/Player.js");



var lengths = [5, 4, 3, 3, 2];
_DOMHandler__WEBPACK_IMPORTED_MODULE_1__.default.menuStartGame().then(function () {
  var player = (0,_Player__WEBPACK_IMPORTED_MODULE_2__.default)("playerboard", "Player");
  _DOMHandler__WEBPACK_IMPORTED_MODULE_1__.default.createBoard(document.querySelector("#playerboard"), player.gameboard, true).then(function () {
    var computer = (0,_Player__WEBPACK_IMPORTED_MODULE_2__.default)("computerboard", "Computer");
    _DOMHandler__WEBPACK_IMPORTED_MODULE_1__.default.createBoard(document.querySelector("#computerboard"), computer.gameboard);

    for (var i = 0; i < 5; i++) {
      computer.gameboard.placeShipRandomly(lengths[i], true, true, true);
    }
  });
}); // const computer = Player("computerboard", "Computer");
// DOMHandler.createBoard(document.querySelector("#computerboard"), computer.gameboard);
// for (let i = 1; i <= 5; i++)
// {
// 	computer.gameboard.placeShipRandomly(i, false, true);
// }
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsbUJBQW1CO0FBQ3BEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZ0JBQWdCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxLQUEwQixvQkFBb0IsQ0FBRTtBQUNsRDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7Ozs7Ozs7VUNqdkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBRUEsSUFBSTVFLE9BQU8sR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBQWQ7QUFFQUQsOERBQUEsR0FDRXdFLElBREYsQ0FDTyxZQUNOO0FBQ0MsTUFBTWxFLE1BQU0sR0FBRzJGLGdEQUFNLENBQUMsYUFBRCxFQUFnQixRQUFoQixDQUFyQjtBQUNBakcsRUFBQUEsNERBQUEsQ0FBdUJhLFFBQVEsQ0FBQ2lCLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBdkIsRUFBK0R4QixNQUFNLENBQUN1RCxTQUF0RSxFQUFpRixJQUFqRixFQUNFVyxJQURGLENBQ08sWUFDTjtBQUNDLFFBQU1MLFFBQVEsR0FBRzhCLGdEQUFNLENBQUMsZUFBRCxFQUFrQixVQUFsQixDQUF2QjtBQUNBakcsSUFBQUEsNERBQUEsQ0FBdUJhLFFBQVEsQ0FBQ2lCLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXZCLEVBQWlFcUMsUUFBUSxDQUFDTixTQUExRTs7QUFDQSxTQUFLLElBQUluRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLENBQXBCLEVBQXVCQSxDQUFDLEVBQXhCLEVBQ0E7QUFDQ3lELE1BQUFBLFFBQVEsQ0FBQ04sU0FBVCxDQUFtQjBCLGlCQUFuQixDQUFxQ3RGLE9BQU8sQ0FBQ1MsQ0FBRCxDQUE1QyxFQUFpRCxJQUFqRCxFQUF1RCxJQUF2RCxFQUE2RCxJQUE3RDtBQUNBO0FBQ0QsR0FURjtBQVVBLENBZEYsR0FnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcblxuY29uc3QgRE9NSGFuZGxlciA9ICgoKSA9Plxue1xuXHRjb25zdCBsZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xuXHRsZXQgdmVydGljYWwgPSBmYWxzZTtcblxuXHRjb25zdCBjcmVhdGVCb2FyZCA9IChkb21Cb2FyZCwgYm9hcmQsIHBsYXllcikgPT5cblx0e1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+XG5cdFx0e1xuXHRcdFx0bGV0IGwgPSAwO1xuXHRcdFx0Ly8gaSBpcyB0aGUgeSBheGlzXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdC8vIGogaXMgdGhlIHggYXhpc1xuXHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBncmlkRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdFx0Z3JpZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkLWVsZW1lbnRcIik7XG5cdFx0XHRcdFx0Z3JpZEVsZW1lbnQuZGF0YXNldC5jb29yZHMgPSBgKCR7an0sICR7aX0pYDtcblx0XHRcdFx0XHRkb21Cb2FyZC5hcHBlbmRDaGlsZChncmlkRWxlbWVudCk7XG5cdFxuXHRcdFx0XHRcdC8vIENoZWNrIGlmIGhhdmUgdG8gcGxhY2UgZmlyc3Rcblx0XHRcdFx0XHRpZiAoIXBsYXllcilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRncmlkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGJvYXJkLnJlY2VpdmVBdHRhY2soaiwgaSk7XG5cdFx0XHRcdFx0XHRcdEdhbWUucGxheVJvdW5kKCk7XG5cdFx0XHRcdFx0XHR9LCB7b25jZTogdHJ1ZX0pO1xuXHRcdFx0XHRcdH0gXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChpID09PSAwICYmIGogPT09IDApXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblx0XHRcdFx0XHRcdFx0aWYgKCF2ZXJ0aWNhbCkgdG9nZ2xlLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbFwiO1xuXHRcdFx0XHRcdFx0XHRlbHNlIHRvZ2dsZS50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbFwiO1xuXHRcdFx0XHRcdFx0XHR0b2dnbGUuaWQgPSBcInRvZ2dsZVwiO1xuXHRcdFx0XHRcdFx0XHRncmlkRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodG9nZ2xlKTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGlmICh2ZXJ0aWNhbClcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHR2ZXJ0aWNhbCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0dG9nZ2xlLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbFwiO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdHZlcnRpY2FsID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdHRvZ2dsZS50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbFwiO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGdyaWRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aWYgKCF2ZXJ0aWNhbClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGZvciAobGV0IGsgPSBqOyBrIDwgbGVuZ3Roc1tsXSArIGo7IGsrKylcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gZ3JpZEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS1jb29yZHM9XCIoJHtrfSwgJHtpfSlcIl1gKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghZWxlbWVudCkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgayA9IGk7IGsgPCBsZW5ndGhzW2xdICsgaTsgaysrKVxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBncmlkRWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYGRpdltkYXRhLWNvb3Jkcz1cIigke2p9LCAke2t9KVwiXWApO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFlbGVtZW50KSByZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFxuXHRcdFx0XHRcdFx0Z3JpZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlmICghdmVydGljYWwpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCBrID0gajsgayA8IGxlbmd0aHNbbF0gKyBqOyBrKyspXG5cdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IGdyaWRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEtY29vcmRzPVwiKCR7a30sICR7aX0pXCJdYCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVsZW1lbnQpIHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGZvciAobGV0IGsgPSBpOyBrIDwgbGVuZ3Roc1tsXSArIGk7IGsrKylcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gZ3JpZEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS1jb29yZHM9XCIoJHtqfSwgJHtrfSlcIl1gKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghZWxlbWVudCkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcblx0XHRcdFx0XHRcdGdyaWRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZiAoYm9hcmQucGxhY2VTaGlwKGosIGksIGxlbmd0aHNbbF0sIHZlcnRpY2FsLCB0cnVlKSA9PT0gdHJ1ZSlcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGJvYXJkLnBsYWNlU2hpcChqLCBpLCBsZW5ndGhzW2xdLCB2ZXJ0aWNhbCwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCF2ZXJ0aWNhbClcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCBrID0gajsgayA8IGxlbmd0aHNbbF0gKyBqOyBrKyspXG5cdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGdyaWRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEtY29vcmRzPVwiKCR7a30sICR7aX0pXCJdYCkuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgayA9IGk7IGsgPCBsZW5ndGhzW2xdICsgaTsgaysrKVxuXHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRncmlkRWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYGRpdltkYXRhLWNvb3Jkcz1cIigke2p9LCAke2t9KVwiXWApLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRsKys7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGwgPT09IDUpIGVuZFNldFVwKGRvbUJvYXJkLCBib2FyZCwgcmVzb2x2ZSwgbCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVx0XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdGNvbnN0IGVuZFNldFVwID0gKGRvbUJvYXJkLCBib2FyZCwgcmVzb2x2ZSwgbCkgPT5cblx0e1xuXHRcdGRvbUJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcblx0XHRkb21Cb2FyZC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9nZ2xlXCIpLnJlbW92ZSgpO1xuXHRcdFxuXHRcdCgoKSA9PlxuXHRcdHtcblx0XHRcdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbnMtY29udGFpbmVyXCIpKSBcblx0XHRcdFx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9ucy1jb250YWluZXJcIikuc3R5bGUgPSBcIlwiO1xuXHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGRpdi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9ucy1jb250YWluZXJcIik7XG5cblx0XHRcdGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXHRcdFx0c3RhcnQudGV4dENvbnRlbnQgPSBcIlN0YXJ0IEdhbWVcIjtcblx0XHRcdHN0YXJ0LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuXHRcdFx0ZGl2LmFwcGVuZENoaWxkKHN0YXJ0KTtcblxuXHRcdFx0Y29uc3QgcmVzZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cdFx0XHRyZXNldC50ZXh0Q29udGVudCA9IFwiUmVzZXRcIjtcblx0XHRcdHJlc2V0LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuXHRcdFx0ZGl2LmFwcGVuZENoaWxkKHJlc2V0KTtcblxuXHRcdFx0ZG9tQm9hcmQucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChkaXYpO1xuXG5cdFx0XHRzdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cblx0XHRcdHtcblx0XHRcdFx0ZGl2LnJlbW92ZSgpO1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG5cdFx0XHR7XG5cdFx0XHRcdGwgPSAwO1xuXHRcdFx0XHRkb21Cb2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG5cdFx0XHRcdGRvbUJvYXJkLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0XHRcdGNyZWF0ZUJvYXJkKGRvbUJvYXJkLCBib2FyZCwgdHJ1ZSk7XG5cdFx0XHRcdGRpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRcdGJvYXJkLnJlc2V0KCk7XG5cdFx0XHR9KTtcblx0XHR9KSgpO1xuXHR9O1xuXG5cdGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5LCBkb21Cb2FyZCwgdmlzaWJsZSA9IGZhbHNlKSA9PlxuXHR7XG5cdFx0Y29uc3QgZWxlbWVudCA9IGRvbUJvYXJkLnF1ZXJ5U2VsZWN0b3IoYC5ib2FyZC1lbGVtZW50W2RhdGEtY29vcmRzPVwiKCR7eH0sICR7eX0pXCJdYCk7XG5cdFx0aWYgKHZpc2libGUpIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcblx0fTtcblxuXHRjb25zdCBjcmVhdGVCb2FyZHMgPSAoKSA9PlxuXHR7XG5cdFx0Y29uc3QgYm9hcmRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRib2FyZHMuaWQgPSBcImJvYXJkc1wiO1xuXG5cdFx0Y29uc3QgcGxheWVyYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHBsYXllcmJvYXJkQ29udGFpbmVyLmlkID0gXCJwbGF5ZXJib2FyZC1jb250YWluZXJcIjtcblxuXHRcdGNvbnN0IHBsYXllcmJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwbGF5ZXJib2FyZC5pZCA9IFwicGxheWVyYm9hcmRcIjtcblx0XHRwbGF5ZXJib2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG5cdFx0cGxheWVyYm9hcmQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5oZXJpdFwiO1xuXHRcdHBsYXllcmJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcmJvYXJkKTtcblxuXHRcdGJvYXJkcy5hcHBlbmRDaGlsZChwbGF5ZXJib2FyZENvbnRhaW5lcik7XG5cblx0XHRjb25zdCBjb21wdXRlcmJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb21wdXRlcmJvYXJkLmlkID0gXCJjb21wdXRlcmJvYXJkXCI7XG5cdFx0Y29tcHV0ZXJib2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG5cdFx0Ym9hcmRzLmFwcGVuZENoaWxkKGNvbXB1dGVyYm9hcmQpO1xuXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpLmFwcGVuZENoaWxkKGJvYXJkcyk7XG5cdH07XG5cblx0Y29uc3QgbWVudVN0YXJ0R2FtZSA9ICgpID0+XG5cdHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuXHRcdHtcblx0XHRcdGNvbnN0IG1lbnVTdGFydEdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lbnUtc3RhcnQtZ2FtZVwiKTtcblx0XHRcdG1lbnVTdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG5cdFx0XHR7XG5cdFx0XHRcdG1lbnVTdGFydEdhbWUucGFyZW50RWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIwJVwiO1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IG1lbnVTdGFydEdhbWUucGFyZW50RWxlbWVudC5yZW1vdmUoKSwgMzI1KTtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3JlYXRlQm9hcmRzKCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHR9LCAwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IG1pc3NTaG90ID0gKHgsIHksIGRvbUJvYXJkKSA9PiBcblx0XHRkb21Cb2FyZC5xdWVyeVNlbGVjdG9yKGAuYm9hcmQtZWxlbWVudFtkYXRhLWNvb3Jkcz1cIigke3h9LCAke3l9KVwiXWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwieWVsbG93XCI7XG5cblx0Y29uc3QgaGl0U2hvdCA9ICh4LCB5LCBkb21Cb2FyZCkgPT5cblx0XHRkb21Cb2FyZC5xdWVyeVNlbGVjdG9yKGAuYm9hcmQtZWxlbWVudFtkYXRhLWNvb3Jkcz1cIigke3h9LCAke3l9KVwiXWApLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG5cblx0cmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlU2hpcCwgbWlzc1Nob3QsIGhpdFNob3QsIG1lbnVTdGFydEdhbWUgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IERPTUhhbmRsZXI7XG4iLCJjb25zdCBHYW1lID0gKCgpID0+XG57XG5cdGxldCBwbGF5ZXJzID0gW107XG5cblx0bGV0IF9wbGF5ZXJUdXJuID0gdHJ1ZTtcblx0bGV0IGdhbWVPdmVyID0gZmFsc2U7XG5cblx0Y29uc3QgZGlkUGxheWVyc1NpbmsgPSAoKSA9PlxuXHR7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmIChwbGF5ZXJzW2ldLmdhbWVib2FyZC5kaWRTaGlwc1NpbmsoKSkgcmV0dXJuIHBsYXllcnNbaV07XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHRjb25zdCBjbGVhclBsYXllcnMgPSAoKSA9PiBwbGF5ZXJzLmxlbmd0aCA9IDA7XG5cblx0Y29uc3Qgc3dpdGNoVHVybnNET00gPSAodGVzdCkgPT5cblx0e1xuXHRcdGlmICh0ZXN0KSByZXR1cm47XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wdXRlcmJvYXJkXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJub3QtdHVyblwiKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcmJvYXJkXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJub3QtdHVyblwiKTtcblx0fTtcblxuXHRjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PlxuXHR7XG5cdFx0Y29uc3QgY29tcHV0ZXIgPSBwbGF5ZXJzLmZpbmQocGxheWVyID0+IHBsYXllci5uYW1lID09PSBcIkNvbXB1dGVyXCIpO1xuXHRcdGNvbXB1dGVyLnBsYXkocGxheWVycy5maW5kKHBsYXllciA9PiBwbGF5ZXIubmFtZSA9PT0gXCJQbGF5ZXJcIiksIGNvbXB1dGVyLmdldFJhbmRvbUNvb3JkKVxuXHRcdFx0LnRoZW4oKCkgPT4gXG5cdFx0XHR7XG5cdFx0XHRcdHN3aXRjaFR1cm5zRE9NKCk7XG5cdFx0XHRcdGlzR2FtZU92ZXIoYWxlcnQpO1xuXHRcdFx0fSk7XG5cdH07XG5cdFxuXHRjb25zdCBwbGF5ZXJUdXJuID0gKHRlc3QpID0+IHN3aXRjaFR1cm5zRE9NKHRlc3QpO1xuXHRcblx0Y29uc3QgaXNHYW1lT3ZlciA9IChhbGVydCkgPT5cblx0e1xuXHRcdGlmIChkaWRQbGF5ZXJzU2luaygpKSBcblx0XHR7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGFsZXJ0KFwic1wiKSwgMCk7XG5cdFx0XHRnYW1lT3ZlciA9IHRydWU7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGNoYW5nZVR1cm5zID0gKCkgPT4gX3BsYXllclR1cm4gPSAhX3BsYXllclR1cm47XG5cdFxuXHRjb25zdCBwbGF5Um91bmQgPSAodGVzdCkgPT5cblx0e1xuXHRcdGlmIChnYW1lT3ZlcikgcmV0dXJuO1xuXHRcdF9wbGF5ZXJUdXJuID8gcGxheWVyVHVybih0ZXN0KSA6IGNvbXB1dGVyVHVybigpO1xuXHRcdGNoYW5nZVR1cm5zKCk7XG5cdFx0aXNHYW1lT3ZlcihhbGVydCk7XG5cdFx0aWYgKF9wbGF5ZXJUdXJuID09PSBmYWxzZSkgcmV0dXJuIHBsYXlSb3VuZCgpO1xuXHRcdHJldHVybiBfcGxheWVyVHVybjtcblx0fTtcblxuXHRyZXR1cm4geyBwbGF5ZXJzLCBkaWRQbGF5ZXJzU2luaywgY2xlYXJQbGF5ZXJzLCBwbGF5Um91bmQgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJpbXBvcnQgRE9NSGFuZGxlciBmcm9tIFwiLi9ET01IYW5kbGVyLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwLmpzXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IChkb21Cb2FyZCkgPT5cbntcblx0bGV0IGJvYXJkID1cblx0W1xuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XTtcblxuXHRjb25zdCBzaGlwcyA9IFtdO1xuXHRjb25zdCBtaXNzZWRTaG90cyA9IFtdO1xuXG5cdGNvbnN0IHBsYWNlU2hpcCA9ICh4Q29vcmQsIHlDb29yZCwgbGVuZ3RoLCB2ZXJ0aWNhbCwgdmlzaWJsZSwgY29tcHV0ZXIpID0+XG5cdHtcblx0XHRpZiAoIWNoZWNrUmFuZ2UoeENvb3JkLCB5Q29vcmQsIGxlbmd0aCwgdmVydGljYWwsIGNvbXB1dGVyKSkgcmV0dXJuIFwiT3V0IG9mIHJhbmdlXCI7XG5cdFx0Y29uc3Qgc2hpcCA9IFNoaXAobGVuZ3RoKTtcblx0XHRzaGlwcy5wdXNoKHNoaXApO1xuXG5cdFx0Ly8gaiBpcyBzaGlwIHBhcnRzXG5cdFx0bGV0IGogPSAwO1xuXHRcdGlmICghdmVydGljYWwpXG5cdFx0e1xuXHRcdFx0Zm9yIChsZXQgaSA9IHhDb29yZDsgaSA8IGxlbmd0aCArIHhDb29yZDsgaSsrKVxuXHRcdFx0e1xuXHRcdFx0XHRzZXRHcmlkKGksIHlDb29yZCwgW3NoaXAsIGpdKTtcblx0XHRcdFx0aWYgKGRvbUJvYXJkKSBET01IYW5kbGVyLnBsYWNlU2hpcChpLCB5Q29vcmQsIGRvbUJvYXJkLCB2aXNpYmxlKTtcblx0XHRcdFx0aisrO1xuXHRcdFx0fVxuXHRcdH0gZWxzZVxuXHRcdHtcblx0XHRcdGZvciAobGV0IGkgPSB5Q29vcmQ7IGkgPCBsZW5ndGggKyB5Q29vcmQ7IGkrKylcblx0XHRcdHtcblx0XHRcdFx0c2V0R3JpZCh4Q29vcmQsIGksIFtzaGlwLCBqXSk7XG5cdFx0XHRcdGlmIChkb21Cb2FyZCkgRE9NSGFuZGxlci5wbGFjZVNoaXAoeENvb3JkLCBpLCBkb21Cb2FyZCwgdmlzaWJsZSk7XG5cdFx0XHRcdGorKztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblx0Y29uc3QgcGxhY2VTaGlwUmFuZG9tbHkgPSAobGVuZ3RoLCB2ZXJ0aWNhbCwgdmlzaWJpbGl0eSwgY29tcHV0ZXIpID0+IFxuXHR7XG5cdFx0Y29uc3QgZm9vID0gKCkgPT5cblx0XHR7XG5cdFx0XHRpZiAocGxhY2VTaGlwKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBsZW5ndGgsIHZlcnRpY2FsLCB2aXNpYmlsaXR5LCBjb21wdXRlcikgPT09IFwiT3V0IG9mIHJhbmdlXCIpXG5cdFx0XHRcdGZvbygpO1xuXHRcdH07XG5cdFx0Zm9vKCk7XG5cdH07XG5cblx0Y29uc3QgY2hlY2tSYW5nZSA9ICh4Q29vcmQsIHlDb29yZCwgbGVuZ3RoLCB2ZXJ0aWNhbCwgY29tcHV0ZXIpID0+XG5cdHtcblx0XHRpZiAoIXZlcnRpY2FsKVxuXHRcdHtcblx0XHRcdC8vIFRoaXMgY2hlY2tzIGlmIHNoaXBzIGlzIG91dCBvZiBib3VuZHNcblx0XHRcdGlmICgoeENvb3JkICsgbGVuZ3RoKSA+IDEwKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdC8vIFRoaXMgY2hlY2tzIGZvciBvdmVybGFwcGluZ1xuXHRcdFx0Zm9yIChsZXQgaSA9IHhDb29yZDsgaSA8IGxlbmd0aCArIHhDb29yZDsgaSsrKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoZ2V0R3JpZChpLCB5Q29vcmQpICE9PSAwKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdFx0aWYgKGNvbXB1dGVyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKHhDb29yZCArIGxlbmd0aCAhPT0gMTApIGlmIChnZXRHcmlkKGkgKyAxLCB5Q29vcmQpICE9PSAwKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKHhDb29yZCAhPT0gMCkgaWYgKGdldEdyaWQoaSAtIDEsIHlDb29yZCkgIT09IDApIHJldHVybiBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICh5Q29vcmQgIT09IDkpIGlmIChnZXRHcmlkKGksIHlDb29yZCArIDEpICE9PSAwKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKHlDb29yZCAhPT0gMCkgaWYgKGdldEdyaWQoaSwgeUNvb3JkIC0gMSkgIT09IDApXHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZVxuXHRcdHtcblx0XHRcdGlmICgoeUNvb3JkICsgbGVuZ3RoKSA+IDEwKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0geUNvb3JkOyBpIDwgbGVuZ3RoICsgeUNvb3JkOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChnZXRHcmlkKHhDb29yZCwgaSkgIT09IDApIHJldHVybiBmYWxzZTtcblxuXHRcdFx0XHRpZiAoY29tcHV0ZXIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoeUNvb3JkICsgbGVuZ3RoICE9PSAxMCkgaWYgKGdldEdyaWQoeENvb3JkLCBpICsgMSkgIT09IDApIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRpZiAoeUNvb3JkICE9PSAwKSBpZiAoZ2V0R3JpZCh4Q29vcmQsIGkgLSAxKSAhPT0gMCkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHhDb29yZCAhPT0gOSkgaWYgKGdldEdyaWQoeENvb3JkICsgMSwgaSkgIT09IDApIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRpZiAoeENvb3JkICE9PSAwKSBpZiAoZ2V0R3JpZCh4Q29vcmQgLSAxLCBpKSAhPT0gMClcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT5cblx0e1xuXHRcdGlmICh0eXBlb2YoZ2V0R3JpZCh4LCB5KSkgIT09IFwibnVtYmVyXCIpIHJldHVybiBoaXRTaG90KHgsIHkpO1xuXHRcdGVsc2UgaWYgKGdldEdyaWQoeCwgeSkgPT09IDEpIHJldHVybiBcIllvdSBhbHJlYWR5IHRyaWVkIHRvIGhpdCB0aGlzIG9uZVwiO1xuXHRcdGVsc2UgcmV0dXJuIG1pc3NTaG90KHgsIHkpO1xuXHR9O1xuXG5cdGNvbnN0IGhpdFNob3QgPSAoeCwgeSkgPT5cblx0e1xuXHRcdGlmIChkb21Cb2FyZCkgRE9NSGFuZGxlci5oaXRTaG90KHgsIHksIGRvbUJvYXJkKTtcblx0XHRnZXRHcmlkKHgsIHkpWzBdLmhpdChnZXRHcmlkKHgsIHkpWzFdKTtcblx0XHRzZXRHcmlkKHgsIHksIDEpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cdGNvbnN0IG1pc3NTaG90ID0gKHgsIHkpID0+XG5cdHtcblx0XHRtaXNzZWRTaG90cy5wdXNoKFt4LCB5XSk7XG5cdFx0c2V0R3JpZCh4LCB5LCAxKTtcblx0XHRpZiAoZG9tQm9hcmQpIERPTUhhbmRsZXIubWlzc1Nob3QoeCwgeSwgZG9tQm9hcmQpO1xuXHRcdHJldHVybiBcIk1pc3MhXCI7XG5cdH07XG5cblx0Y29uc3QgZGlkU2hpcHNTaW5rID0gKCkgPT5cblx0e1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYgKCFzaGlwc1tpXS5oYXNTdW5rKCkpIHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblx0Y29uc3QgcmVzZXQgPSAoKSA9PlxuXHR7XG5cdFx0c2hpcHMubGVuZ3RoID0gMDtcblx0XHRmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspXG5cdFx0e1xuXHRcdFx0Zm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKVxuXHRcdFx0e1xuXHRcdFx0XHRzZXRHcmlkKHgsIHksIDApO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRjb25zdCBnZXRHcmlkID0gKHgsIHkpID0+IGJvYXJkW3ldW3hdO1xuXHRjb25zdCBzZXRHcmlkID0gKHgsIHksIHZhbHVlKSA9PiBib2FyZFt5XVt4XSA9IHZhbHVlO1xuXG5cdHJldHVybiB7IHBsYWNlU2hpcCwgcGxhY2VTaGlwUmFuZG9tbHksIGJvYXJkLCBnZXRHcmlkLCByZWNlaXZlQXR0YWNrLCBtaXNzZWRTaG90cywgZGlkU2hpcHNTaW5rLCBkb21Cb2FyZCwgcmVzZXQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vR2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lLmpzXCI7XG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcblxuY29uc3QgUGxheWVyID0gKGJvYXJkLCBuYW1lKSA9Plxue1xuXHRsZXQgb2JqO1xuXG5cdGxldCB0YXJnZXRzID0gW107XG5cdGxldCBzaG90cyA9IFtdO1xuXG5cdGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH1gKSk7XG5cblx0Y29uc3QgcGxheSA9IGFzeW5jIChwbGF5ZXIsIGdldFJhbmRvbUNvb3JkKSA9Plx0XG5cdHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0XHRjb25zdCB0ZW1wID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwMCkgKyA1MDApKTtcblxuXHRcdGlmICh0YXJnZXRzLmxlbmd0aCAhPT0gMCkgcmV0dXJuIHRhcmdldE1vZGUocGxheWVyKTtcblxuXHRcdGNvbnN0IHBsYXllckdhbWVib2FyZCA9IHBsYXllci5nYW1lYm9hcmQ7XG5cdFx0Y29uc3QgcmFuZG9tUGxheSA9ICgpID0+XG5cdFx0e1x0XHRcdFxuXHRcdFx0Y29uc3QgeCA9IGdldFJhbmRvbUNvb3JkKCk7XG5cdFx0XHRjb25zdCB5ID0gZ2V0UmFuZG9tQ29vcmQoKTtcblxuXHRcdFx0aWYgKHBsYXllckdhbWVib2FyZC5nZXRHcmlkKHgsIHkpID09PSAxKSByZXR1cm4gcmFuZG9tUGxheSgpO1xuXG5cdFx0XHRjb25zdCBhdHRhY2sgPSBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcblx0XHRcdHNob3RzLnB1c2goW3gsIHldKTtcblx0XHRcdGlmIChhdHRhY2sgPT09IHRydWUpIGxvYWRUYXJnZXRzKFt4LCB5XSk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGF0dGFjayk7XG5cdFx0fTtcblx0XHRyZXR1cm4gcmFuZG9tUGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IGxvYWRUYXJnZXRzID0gY29vcmRzID0+XG5cdHtcblx0XHRpZiAoY29vcmRzWzBdICsgMSAhPT0gMTApXG5cdFx0XHRpZiAoc2VhcmNoRm9yRHVwbGljYXRlcyhbY29vcmRzWzBdICsgMSwgY29vcmRzWzFdXSkpIFxuXHRcdFx0XHR0YXJnZXRzLnB1c2goW2Nvb3Jkc1swXSArIDEsIGNvb3Jkc1sxXV0pO1xuXHRcdFxuXHRcdGlmIChjb29yZHNbMF0gLSAxICE9PSAwKVxuXHRcdFx0aWYgKHNlYXJjaEZvckR1cGxpY2F0ZXMoW2Nvb3Jkc1swXSAtIDEsIGNvb3Jkc1sxXV0pKVxuXHRcdFx0XHR0YXJnZXRzLnB1c2goW2Nvb3Jkc1swXSAtIDEsIGNvb3Jkc1sxXV0pO1xuXG5cdFx0aWYgKGNvb3Jkc1sxXSAtIDEgIT09IDApXG5cdFx0XHRpZiAoc2VhcmNoRm9yRHVwbGljYXRlcyhbY29vcmRzWzBdLCBjb29yZHNbMV0gLSAxXSkpXG5cdFx0XHRcdHRhcmdldHMucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gLSAxXSk7XG5cdFx0XG5cdFx0aWYgKGNvb3Jkc1sxXSArIDEgIT09IDEwKVxuXHRcdFx0aWYgKHNlYXJjaEZvckR1cGxpY2F0ZXMoW2Nvb3Jkc1swXSwgY29vcmRzWzFdICsgMV0pKVxuXHRcdFx0XHR0YXJnZXRzLnB1c2goW2Nvb3Jkc1swXSwgY29vcmRzWzFdICsgMV0pO1xuXHR9O1xuXG5cdGNvbnN0IHRhcmdldE1vZGUgPSBwbGF5ZXIgPT5cblx0e1xuXHRcdGNvbnN0IGhpdCA9IHBsYXllci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh0YXJnZXRzWzBdWzBdLCB0YXJnZXRzWzBdWzFdKTtcblx0XHRzaG90cy5wdXNoKFt0YXJnZXRzWzBdWzBdLCB0YXJnZXRzWzBdWzFdXSk7XG5cblx0XHRpZiAoaGl0ID09PSB0cnVlKSBcblx0XHR7XG5cdFx0XHRsb2FkVGFyZ2V0cyhbdGFyZ2V0c1swXVswXSwgdGFyZ2V0c1swXVsxXV0pO1xuXHRcdH1cblx0XHR0YXJnZXRzLnNoaWZ0KCk7XG5cdH07XG5cblx0Y29uc3Qgc2VhcmNoRm9yRHVwbGljYXRlcyA9IGNvb3JkcyA9PlxuXHR7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmICh0YXJnZXRzW2ldWzBdID09PSBjb29yZHNbMF0gJiYgdGFyZ2V0c1tpXVsxXSA9PT0gY29vcmRzWzFdKSByZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaG90cy5sZW5ndGg7IGkrKylcblx0XHR7XG5cdFx0XHRpZiAoc2hvdHNbaV1bMF0gPT09IGNvb3Jkc1swXSAmJiBzaG90c1tpXVsxXSA9PT0gY29vcmRzWzFdKSByZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblx0Y29uc3QgZ2V0UmFuZG9tQ29vcmQgPSAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cblx0b2JqID0geyBnYW1lYm9hcmQsIHBsYXksIGdldFJhbmRvbUNvb3JkLCBuYW1lLCB0YXJnZXRzIH07XG5cblx0R2FtZS5wbGF5ZXJzLnB1c2gob2JqKTtcblx0XG5cdHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCkgPT5cbntcblx0Y29uc3QgaW5mbyA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuXHR7XG5cdFx0aW5mby5wdXNoKDApO1xuXHR9XG5cblx0Y29uc3QgaGl0ID0gbnVtYmVyID0+XG5cdHtcblx0XHRpbmZvW251bWJlcl0gPSAxO1xuXHRcdHJldHVybiBgU2hpcCBoYXMgYmVlbiBoaXQgYXQgJHtudW1iZXJ9YDtcblx0fTtcblxuXHRjb25zdCBoYXNTdW5rID0gKCkgPT5cblx0e1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaW5mby5sZW5ndGg7IGkrKylcblx0XHR7XG5cdFx0XHRpZiAoaW5mb1tpXSA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXHRyZXR1cm4geyBsZW5ndGgsIGluZm8sIGhpdCwgaGFzU3VuayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lKEdwLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcbmltcG9ydCBET01IYW5kbGVyIGZyb20gXCIuL0RPTUhhbmRsZXJcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XG5cbmxldCBsZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xuXG5ET01IYW5kbGVyLm1lbnVTdGFydEdhbWUoKVxuXHQudGhlbigoKSA9PlxuXHR7XG5cdFx0Y29uc3QgcGxheWVyID0gUGxheWVyKFwicGxheWVyYm9hcmRcIiwgXCJQbGF5ZXJcIik7XG5cdFx0RE9NSGFuZGxlci5jcmVhdGVCb2FyZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcmJvYXJkXCIpLCBwbGF5ZXIuZ2FtZWJvYXJkLCB0cnVlKVxuXHRcdFx0LnRoZW4oKCkgPT5cblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoXCJjb21wdXRlcmJvYXJkXCIsIFwiQ29tcHV0ZXJcIik7XG5cdFx0XHRcdERPTUhhbmRsZXIuY3JlYXRlQm9hcmQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wdXRlcmJvYXJkXCIpLCBjb21wdXRlci5nYW1lYm9hcmQpO1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBSYW5kb21seShsZW5ndGhzW2ldLCB0cnVlLCB0cnVlLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH0pO1xuXG4vLyBjb25zdCBjb21wdXRlciA9IFBsYXllcihcImNvbXB1dGVyYm9hcmRcIiwgXCJDb21wdXRlclwiKTtcbi8vIERPTUhhbmRsZXIuY3JlYXRlQm9hcmQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wdXRlcmJvYXJkXCIpLCBjb21wdXRlci5nYW1lYm9hcmQpO1xuLy8gZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKVxuLy8ge1xuLy8gXHRjb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwUmFuZG9tbHkoaSwgZmFsc2UsIHRydWUpO1xuLy8gfVxuIl0sIm5hbWVzIjpbIkdhbWUiLCJET01IYW5kbGVyIiwibGVuZ3RocyIsInZlcnRpY2FsIiwiY3JlYXRlQm9hcmQiLCJkb21Cb2FyZCIsImJvYXJkIiwicGxheWVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJsIiwiaSIsImoiLCJncmlkRWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImRhdGFzZXQiLCJjb29yZHMiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWNlaXZlQXR0YWNrIiwicGxheVJvdW5kIiwib25jZSIsInRvZ2dsZSIsInRleHRDb250ZW50IiwiaWQiLCJwYXJlbnRFbGVtZW50IiwiayIsImVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicmVtb3ZlIiwicGxhY2VTaGlwIiwiZW5kU2V0VXAiLCJzdHlsZSIsInBvaW50ZXJFdmVudHMiLCJkaXYiLCJzdGFydCIsImN1cnNvciIsInJlc2V0IiwiaW5uZXJIVE1MIiwiZGlzcGxheSIsIngiLCJ5IiwidmlzaWJsZSIsImJhY2tncm91bmRDb2xvciIsImNyZWF0ZUJvYXJkcyIsImJvYXJkcyIsInBsYXllcmJvYXJkQ29udGFpbmVyIiwicGxheWVyYm9hcmQiLCJjb21wdXRlcmJvYXJkIiwibWVudVN0YXJ0R2FtZSIsIm9wYWNpdHkiLCJzZXRUaW1lb3V0IiwibWlzc1Nob3QiLCJoaXRTaG90IiwicGxheWVycyIsIl9wbGF5ZXJUdXJuIiwiZ2FtZU92ZXIiLCJkaWRQbGF5ZXJzU2luayIsImxlbmd0aCIsImdhbWVib2FyZCIsImRpZFNoaXBzU2luayIsImNsZWFyUGxheWVycyIsInN3aXRjaFR1cm5zRE9NIiwidGVzdCIsImNvbXB1dGVyVHVybiIsImNvbXB1dGVyIiwiZmluZCIsIm5hbWUiLCJwbGF5IiwiZ2V0UmFuZG9tQ29vcmQiLCJ0aGVuIiwiaXNHYW1lT3ZlciIsImFsZXJ0IiwicGxheWVyVHVybiIsImNoYW5nZVR1cm5zIiwiU2hpcCIsIkdhbWVib2FyZCIsInNoaXBzIiwibWlzc2VkU2hvdHMiLCJ4Q29vcmQiLCJ5Q29vcmQiLCJjaGVja1JhbmdlIiwic2hpcCIsInB1c2giLCJzZXRHcmlkIiwicGxhY2VTaGlwUmFuZG9tbHkiLCJ2aXNpYmlsaXR5IiwiZm9vIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2V0R3JpZCIsImhpdCIsImhhc1N1bmsiLCJ2YWx1ZSIsIlBsYXllciIsIm9iaiIsInRhcmdldHMiLCJzaG90cyIsInRlbXAiLCJ0YXJnZXRNb2RlIiwicGxheWVyR2FtZWJvYXJkIiwicmFuZG9tUGxheSIsImF0dGFjayIsImxvYWRUYXJnZXRzIiwic2VhcmNoRm9yRHVwbGljYXRlcyIsInNoaWZ0IiwiaW5mbyIsIm51bWJlciJdLCJzb3VyY2VSb290IjoiIn0=