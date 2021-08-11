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
    shots.push(coords);
    if (coords[0] + 1 !== 10) if (searchForDuplicates([coords[0] + 1, coords[1]])) targets.push([coords[0] + 1, coords[1]]);
    if (coords[0] - 1 !== 0) if (searchForDuplicates([coords[0] - 1, coords[1]])) targets.push([coords[0] - 1, coords[1]]);
    if (coords[1] - 1 !== 0) if (searchForDuplicates([coords[0], coords[1] - 1])) targets.push([coords[0], coords[1] - 1]);
    if (coords[1] + 1 !== 10) if (searchForDuplicates([coords[0], coords[1] + 1])) targets.push([coords[0], coords[1] + 1]);
  };

  var targetMode = function targetMode(player) {
    var hit = player.gameboard.receiveAttack(targets[0][0], targets[0][1]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsbUJBQW1CO0FBQ3BEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZ0JBQWdCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxLQUEwQixvQkFBb0IsQ0FBRTtBQUNsRDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7Ozs7Ozs7VUNqdkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBRUEsSUFBSTVFLE9BQU8sR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBQWQ7QUFFQUQsOERBQUEsR0FDRXdFLElBREYsQ0FDTyxZQUNOO0FBQ0MsTUFBTWxFLE1BQU0sR0FBRzJGLGdEQUFNLENBQUMsYUFBRCxFQUFnQixRQUFoQixDQUFyQjtBQUNBakcsRUFBQUEsNERBQUEsQ0FBdUJhLFFBQVEsQ0FBQ2lCLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBdkIsRUFBK0R4QixNQUFNLENBQUN1RCxTQUF0RSxFQUFpRixJQUFqRixFQUNFVyxJQURGLENBQ08sWUFDTjtBQUNDLFFBQU1MLFFBQVEsR0FBRzhCLGdEQUFNLENBQUMsZUFBRCxFQUFrQixVQUFsQixDQUF2QjtBQUNBakcsSUFBQUEsNERBQUEsQ0FBdUJhLFFBQVEsQ0FBQ2lCLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXZCLEVBQWlFcUMsUUFBUSxDQUFDTixTQUExRTs7QUFDQSxTQUFLLElBQUluRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLENBQXBCLEVBQXVCQSxDQUFDLEVBQXhCLEVBQ0E7QUFDQ3lELE1BQUFBLFFBQVEsQ0FBQ04sU0FBVCxDQUFtQjBCLGlCQUFuQixDQUFxQ3RGLE9BQU8sQ0FBQ1MsQ0FBRCxDQUE1QyxFQUFpRCxJQUFqRCxFQUF1RCxJQUF2RCxFQUE2RCxJQUE3RDtBQUNBO0FBQ0QsR0FURjtBQVVBLENBZEYsR0FnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcblxuY29uc3QgRE9NSGFuZGxlciA9ICgoKSA9Plxue1xuXHRjb25zdCBsZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xuXHRsZXQgdmVydGljYWwgPSBmYWxzZTtcblxuXHRjb25zdCBjcmVhdGVCb2FyZCA9IChkb21Cb2FyZCwgYm9hcmQsIHBsYXllcikgPT5cblx0e1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+XG5cdFx0e1xuXHRcdFx0bGV0IGwgPSAwO1xuXHRcdFx0Ly8gaSBpcyB0aGUgeSBheGlzXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdC8vIGogaXMgdGhlIHggYXhpc1xuXHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBncmlkRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdFx0Z3JpZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkLWVsZW1lbnRcIik7XG5cdFx0XHRcdFx0Z3JpZEVsZW1lbnQuZGF0YXNldC5jb29yZHMgPSBgKCR7an0sICR7aX0pYDtcblx0XHRcdFx0XHRkb21Cb2FyZC5hcHBlbmRDaGlsZChncmlkRWxlbWVudCk7XG5cdFxuXHRcdFx0XHRcdC8vIENoZWNrIGlmIGhhdmUgdG8gcGxhY2UgZmlyc3Rcblx0XHRcdFx0XHRpZiAoIXBsYXllcilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRncmlkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGJvYXJkLnJlY2VpdmVBdHRhY2soaiwgaSk7XG5cdFx0XHRcdFx0XHRcdEdhbWUucGxheVJvdW5kKCk7XG5cdFx0XHRcdFx0XHR9LCB7b25jZTogdHJ1ZX0pO1xuXHRcdFx0XHRcdH0gXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChpID09PSAwICYmIGogPT09IDApXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblx0XHRcdFx0XHRcdFx0aWYgKCF2ZXJ0aWNhbCkgdG9nZ2xlLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbFwiO1xuXHRcdFx0XHRcdFx0XHRlbHNlIHRvZ2dsZS50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbFwiO1xuXHRcdFx0XHRcdFx0XHR0b2dnbGUuaWQgPSBcInRvZ2dsZVwiO1xuXHRcdFx0XHRcdFx0XHRncmlkRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodG9nZ2xlKTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGlmICh2ZXJ0aWNhbClcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHR2ZXJ0aWNhbCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0dG9nZ2xlLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbFwiO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdHZlcnRpY2FsID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdHRvZ2dsZS50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbFwiO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGdyaWRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aWYgKCF2ZXJ0aWNhbClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGZvciAobGV0IGsgPSBqOyBrIDwgbGVuZ3Roc1tsXSArIGo7IGsrKylcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gZ3JpZEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS1jb29yZHM9XCIoJHtrfSwgJHtpfSlcIl1gKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghZWxlbWVudCkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgayA9IGk7IGsgPCBsZW5ndGhzW2xdICsgaTsgaysrKVxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBncmlkRWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYGRpdltkYXRhLWNvb3Jkcz1cIigke2p9LCAke2t9KVwiXWApO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFlbGVtZW50KSByZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFxuXHRcdFx0XHRcdFx0Z3JpZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlmICghdmVydGljYWwpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCBrID0gajsgayA8IGxlbmd0aHNbbF0gKyBqOyBrKyspXG5cdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IGdyaWRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEtY29vcmRzPVwiKCR7a30sICR7aX0pXCJdYCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVsZW1lbnQpIHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGZvciAobGV0IGsgPSBpOyBrIDwgbGVuZ3Roc1tsXSArIGk7IGsrKylcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gZ3JpZEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS1jb29yZHM9XCIoJHtqfSwgJHtrfSlcIl1gKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghZWxlbWVudCkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcblx0XHRcdFx0XHRcdGdyaWRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZiAoYm9hcmQucGxhY2VTaGlwKGosIGksIGxlbmd0aHNbbF0sIHZlcnRpY2FsLCB0cnVlKSA9PT0gdHJ1ZSlcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGJvYXJkLnBsYWNlU2hpcChqLCBpLCBsZW5ndGhzW2xdLCB2ZXJ0aWNhbCwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCF2ZXJ0aWNhbClcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCBrID0gajsgayA8IGxlbmd0aHNbbF0gKyBqOyBrKyspXG5cdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGdyaWRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEtY29vcmRzPVwiKCR7a30sICR7aX0pXCJdYCkuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgayA9IGk7IGsgPCBsZW5ndGhzW2xdICsgaTsgaysrKVxuXHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRncmlkRWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYGRpdltkYXRhLWNvb3Jkcz1cIigke2p9LCAke2t9KVwiXWApLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRsKys7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGwgPT09IDUpIGVuZFNldFVwKGRvbUJvYXJkLCBib2FyZCwgcmVzb2x2ZSwgbCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVx0XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdGNvbnN0IGVuZFNldFVwID0gKGRvbUJvYXJkLCBib2FyZCwgcmVzb2x2ZSwgbCkgPT5cblx0e1xuXHRcdGRvbUJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcblx0XHRkb21Cb2FyZC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9nZ2xlXCIpLnJlbW92ZSgpO1xuXHRcdFxuXHRcdCgoKSA9PlxuXHRcdHtcblx0XHRcdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbnMtY29udGFpbmVyXCIpKSBcblx0XHRcdFx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9ucy1jb250YWluZXJcIikuc3R5bGUgPSBcIlwiO1xuXHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGRpdi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9ucy1jb250YWluZXJcIik7XG5cblx0XHRcdGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXHRcdFx0c3RhcnQudGV4dENvbnRlbnQgPSBcIlN0YXJ0IEdhbWVcIjtcblx0XHRcdHN0YXJ0LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuXHRcdFx0ZGl2LmFwcGVuZENoaWxkKHN0YXJ0KTtcblxuXHRcdFx0Y29uc3QgcmVzZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cdFx0XHRyZXNldC50ZXh0Q29udGVudCA9IFwiUmVzZXRcIjtcblx0XHRcdHJlc2V0LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuXHRcdFx0ZGl2LmFwcGVuZENoaWxkKHJlc2V0KTtcblxuXHRcdFx0ZG9tQm9hcmQucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChkaXYpO1xuXG5cdFx0XHRzdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cblx0XHRcdHtcblx0XHRcdFx0ZGl2LnJlbW92ZSgpO1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG5cdFx0XHR7XG5cdFx0XHRcdGwgPSAwO1xuXHRcdFx0XHRkb21Cb2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG5cdFx0XHRcdGRvbUJvYXJkLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0XHRcdGNyZWF0ZUJvYXJkKGRvbUJvYXJkLCBib2FyZCwgdHJ1ZSk7XG5cdFx0XHRcdGRpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRcdGJvYXJkLnJlc2V0KCk7XG5cdFx0XHR9KTtcblx0XHR9KSgpO1xuXHR9O1xuXG5cdGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5LCBkb21Cb2FyZCwgdmlzaWJsZSA9IGZhbHNlKSA9PlxuXHR7XG5cdFx0Y29uc3QgZWxlbWVudCA9IGRvbUJvYXJkLnF1ZXJ5U2VsZWN0b3IoYC5ib2FyZC1lbGVtZW50W2RhdGEtY29vcmRzPVwiKCR7eH0sICR7eX0pXCJdYCk7XG5cdFx0aWYgKHZpc2libGUpIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcblx0fTtcblxuXHRjb25zdCBjcmVhdGVCb2FyZHMgPSAoKSA9PlxuXHR7XG5cdFx0Y29uc3QgYm9hcmRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRib2FyZHMuaWQgPSBcImJvYXJkc1wiO1xuXG5cdFx0Y29uc3QgcGxheWVyYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHBsYXllcmJvYXJkQ29udGFpbmVyLmlkID0gXCJwbGF5ZXJib2FyZC1jb250YWluZXJcIjtcblxuXHRcdGNvbnN0IHBsYXllcmJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwbGF5ZXJib2FyZC5pZCA9IFwicGxheWVyYm9hcmRcIjtcblx0XHRwbGF5ZXJib2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG5cdFx0cGxheWVyYm9hcmQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiaW5oZXJpdFwiO1xuXHRcdHBsYXllcmJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcmJvYXJkKTtcblxuXHRcdGJvYXJkcy5hcHBlbmRDaGlsZChwbGF5ZXJib2FyZENvbnRhaW5lcik7XG5cblx0XHRjb25zdCBjb21wdXRlcmJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb21wdXRlcmJvYXJkLmlkID0gXCJjb21wdXRlcmJvYXJkXCI7XG5cdFx0Y29tcHV0ZXJib2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG5cdFx0Ym9hcmRzLmFwcGVuZENoaWxkKGNvbXB1dGVyYm9hcmQpO1xuXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpLmFwcGVuZENoaWxkKGJvYXJkcyk7XG5cdH07XG5cblx0Y29uc3QgbWVudVN0YXJ0R2FtZSA9ICgpID0+XG5cdHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuXHRcdHtcblx0XHRcdGNvbnN0IG1lbnVTdGFydEdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lbnUtc3RhcnQtZ2FtZVwiKTtcblx0XHRcdG1lbnVTdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG5cdFx0XHR7XG5cdFx0XHRcdG1lbnVTdGFydEdhbWUucGFyZW50RWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIwJVwiO1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IG1lbnVTdGFydEdhbWUucGFyZW50RWxlbWVudC5yZW1vdmUoKSwgMzI1KTtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3JlYXRlQm9hcmRzKCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHR9LCAwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IG1pc3NTaG90ID0gKHgsIHksIGRvbUJvYXJkKSA9PiBcblx0XHRkb21Cb2FyZC5xdWVyeVNlbGVjdG9yKGAuYm9hcmQtZWxlbWVudFtkYXRhLWNvb3Jkcz1cIigke3h9LCAke3l9KVwiXWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwieWVsbG93XCI7XG5cblx0Y29uc3QgaGl0U2hvdCA9ICh4LCB5LCBkb21Cb2FyZCkgPT5cblx0XHRkb21Cb2FyZC5xdWVyeVNlbGVjdG9yKGAuYm9hcmQtZWxlbWVudFtkYXRhLWNvb3Jkcz1cIigke3h9LCAke3l9KVwiXWApLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG5cblx0cmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlU2hpcCwgbWlzc1Nob3QsIGhpdFNob3QsIG1lbnVTdGFydEdhbWUgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IERPTUhhbmRsZXI7XG4iLCJjb25zdCBHYW1lID0gKCgpID0+XG57XG5cdGxldCBwbGF5ZXJzID0gW107XG5cblx0bGV0IF9wbGF5ZXJUdXJuID0gdHJ1ZTtcblx0bGV0IGdhbWVPdmVyID0gZmFsc2U7XG5cblx0Y29uc3QgZGlkUGxheWVyc1NpbmsgPSAoKSA9PlxuXHR7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmIChwbGF5ZXJzW2ldLmdhbWVib2FyZC5kaWRTaGlwc1NpbmsoKSkgcmV0dXJuIHBsYXllcnNbaV07XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHRjb25zdCBjbGVhclBsYXllcnMgPSAoKSA9PiBwbGF5ZXJzLmxlbmd0aCA9IDA7XG5cblx0Y29uc3Qgc3dpdGNoVHVybnNET00gPSAodGVzdCkgPT5cblx0e1xuXHRcdGlmICh0ZXN0KSByZXR1cm47XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wdXRlcmJvYXJkXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJub3QtdHVyblwiKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcmJvYXJkXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJub3QtdHVyblwiKTtcblx0fTtcblxuXHRjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PlxuXHR7XG5cdFx0Y29uc3QgY29tcHV0ZXIgPSBwbGF5ZXJzLmZpbmQocGxheWVyID0+IHBsYXllci5uYW1lID09PSBcIkNvbXB1dGVyXCIpO1xuXHRcdGNvbXB1dGVyLnBsYXkocGxheWVycy5maW5kKHBsYXllciA9PiBwbGF5ZXIubmFtZSA9PT0gXCJQbGF5ZXJcIiksIGNvbXB1dGVyLmdldFJhbmRvbUNvb3JkKVxuXHRcdFx0LnRoZW4oKCkgPT4gXG5cdFx0XHR7XG5cdFx0XHRcdHN3aXRjaFR1cm5zRE9NKCk7XG5cdFx0XHRcdGlzR2FtZU92ZXIoYWxlcnQpO1xuXHRcdFx0fSk7XG5cdH07XG5cdFxuXHRjb25zdCBwbGF5ZXJUdXJuID0gKHRlc3QpID0+IHN3aXRjaFR1cm5zRE9NKHRlc3QpO1xuXHRcblx0Y29uc3QgaXNHYW1lT3ZlciA9IChhbGVydCkgPT5cblx0e1xuXHRcdGlmIChkaWRQbGF5ZXJzU2luaygpKSBcblx0XHR7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGFsZXJ0KFwic1wiKSwgMCk7XG5cdFx0XHRnYW1lT3ZlciA9IHRydWU7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGNoYW5nZVR1cm5zID0gKCkgPT4gX3BsYXllclR1cm4gPSAhX3BsYXllclR1cm47XG5cdFxuXHRjb25zdCBwbGF5Um91bmQgPSAodGVzdCkgPT5cblx0e1xuXHRcdGlmIChnYW1lT3ZlcikgcmV0dXJuO1xuXHRcdF9wbGF5ZXJUdXJuID8gcGxheWVyVHVybih0ZXN0KSA6IGNvbXB1dGVyVHVybigpO1xuXHRcdGNoYW5nZVR1cm5zKCk7XG5cdFx0aXNHYW1lT3ZlcihhbGVydCk7XG5cdFx0aWYgKF9wbGF5ZXJUdXJuID09PSBmYWxzZSkgcmV0dXJuIHBsYXlSb3VuZCgpO1xuXHRcdHJldHVybiBfcGxheWVyVHVybjtcblx0fTtcblxuXHRyZXR1cm4geyBwbGF5ZXJzLCBkaWRQbGF5ZXJzU2luaywgY2xlYXJQbGF5ZXJzLCBwbGF5Um91bmQgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJpbXBvcnQgRE9NSGFuZGxlciBmcm9tIFwiLi9ET01IYW5kbGVyLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwLmpzXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IChkb21Cb2FyZCkgPT5cbntcblx0bGV0IGJvYXJkID1cblx0W1xuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XTtcblxuXHRjb25zdCBzaGlwcyA9IFtdO1xuXHRjb25zdCBtaXNzZWRTaG90cyA9IFtdO1xuXG5cdGNvbnN0IHBsYWNlU2hpcCA9ICh4Q29vcmQsIHlDb29yZCwgbGVuZ3RoLCB2ZXJ0aWNhbCwgdmlzaWJsZSwgY29tcHV0ZXIpID0+XG5cdHtcblx0XHRpZiAoIWNoZWNrUmFuZ2UoeENvb3JkLCB5Q29vcmQsIGxlbmd0aCwgdmVydGljYWwsIGNvbXB1dGVyKSkgcmV0dXJuIFwiT3V0IG9mIHJhbmdlXCI7XG5cdFx0Y29uc3Qgc2hpcCA9IFNoaXAobGVuZ3RoKTtcblx0XHRzaGlwcy5wdXNoKHNoaXApO1xuXG5cdFx0Ly8gaiBpcyBzaGlwIHBhcnRzXG5cdFx0bGV0IGogPSAwO1xuXHRcdGlmICghdmVydGljYWwpXG5cdFx0e1xuXHRcdFx0Zm9yIChsZXQgaSA9IHhDb29yZDsgaSA8IGxlbmd0aCArIHhDb29yZDsgaSsrKVxuXHRcdFx0e1xuXHRcdFx0XHRzZXRHcmlkKGksIHlDb29yZCwgW3NoaXAsIGpdKTtcblx0XHRcdFx0aWYgKGRvbUJvYXJkKSBET01IYW5kbGVyLnBsYWNlU2hpcChpLCB5Q29vcmQsIGRvbUJvYXJkLCB2aXNpYmxlKTtcblx0XHRcdFx0aisrO1xuXHRcdFx0fVxuXHRcdH0gZWxzZVxuXHRcdHtcblx0XHRcdGZvciAobGV0IGkgPSB5Q29vcmQ7IGkgPCBsZW5ndGggKyB5Q29vcmQ7IGkrKylcblx0XHRcdHtcblx0XHRcdFx0c2V0R3JpZCh4Q29vcmQsIGksIFtzaGlwLCBqXSk7XG5cdFx0XHRcdGlmIChkb21Cb2FyZCkgRE9NSGFuZGxlci5wbGFjZVNoaXAoeENvb3JkLCBpLCBkb21Cb2FyZCwgdmlzaWJsZSk7XG5cdFx0XHRcdGorKztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblx0Y29uc3QgcGxhY2VTaGlwUmFuZG9tbHkgPSAobGVuZ3RoLCB2ZXJ0aWNhbCwgdmlzaWJpbGl0eSwgY29tcHV0ZXIpID0+IFxuXHR7XG5cdFx0Y29uc3QgZm9vID0gKCkgPT5cblx0XHR7XG5cdFx0XHRpZiAocGxhY2VTaGlwKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBsZW5ndGgsIHZlcnRpY2FsLCB2aXNpYmlsaXR5LCBjb21wdXRlcikgPT09IFwiT3V0IG9mIHJhbmdlXCIpXG5cdFx0XHRcdGZvbygpO1xuXHRcdH07XG5cdFx0Zm9vKCk7XG5cdH07XG5cblx0Y29uc3QgY2hlY2tSYW5nZSA9ICh4Q29vcmQsIHlDb29yZCwgbGVuZ3RoLCB2ZXJ0aWNhbCwgY29tcHV0ZXIpID0+XG5cdHtcblx0XHRpZiAoIXZlcnRpY2FsKVxuXHRcdHtcblx0XHRcdC8vIFRoaXMgY2hlY2tzIGlmIHNoaXBzIGlzIG91dCBvZiBib3VuZHNcblx0XHRcdGlmICgoeENvb3JkICsgbGVuZ3RoKSA+IDEwKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdC8vIFRoaXMgY2hlY2tzIGZvciBvdmVybGFwcGluZ1xuXHRcdFx0Zm9yIChsZXQgaSA9IHhDb29yZDsgaSA8IGxlbmd0aCArIHhDb29yZDsgaSsrKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoZ2V0R3JpZChpLCB5Q29vcmQpICE9PSAwKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdFx0aWYgKGNvbXB1dGVyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKHhDb29yZCArIGxlbmd0aCAhPT0gMTApIGlmIChnZXRHcmlkKGkgKyAxLCB5Q29vcmQpICE9PSAwKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKHhDb29yZCAhPT0gMCkgaWYgKGdldEdyaWQoaSAtIDEsIHlDb29yZCkgIT09IDApIHJldHVybiBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICh5Q29vcmQgIT09IDkpIGlmIChnZXRHcmlkKGksIHlDb29yZCArIDEpICE9PSAwKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKHlDb29yZCAhPT0gMCkgaWYgKGdldEdyaWQoaSwgeUNvb3JkIC0gMSkgIT09IDApXHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZVxuXHRcdHtcblx0XHRcdGlmICgoeUNvb3JkICsgbGVuZ3RoKSA+IDEwKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0geUNvb3JkOyBpIDwgbGVuZ3RoICsgeUNvb3JkOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChnZXRHcmlkKHhDb29yZCwgaSkgIT09IDApIHJldHVybiBmYWxzZTtcblxuXHRcdFx0XHRpZiAoY29tcHV0ZXIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoeUNvb3JkICsgbGVuZ3RoICE9PSAxMCkgaWYgKGdldEdyaWQoeENvb3JkLCBpICsgMSkgIT09IDApIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRpZiAoeUNvb3JkICE9PSAwKSBpZiAoZ2V0R3JpZCh4Q29vcmQsIGkgLSAxKSAhPT0gMCkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHhDb29yZCAhPT0gOSkgaWYgKGdldEdyaWQoeENvb3JkICsgMSwgaSkgIT09IDApIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRpZiAoeENvb3JkICE9PSAwKSBpZiAoZ2V0R3JpZCh4Q29vcmQgLSAxLCBpKSAhPT0gMClcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT5cblx0e1xuXHRcdGlmICh0eXBlb2YoZ2V0R3JpZCh4LCB5KSkgIT09IFwibnVtYmVyXCIpIHJldHVybiBoaXRTaG90KHgsIHkpO1xuXHRcdGVsc2UgaWYgKGdldEdyaWQoeCwgeSkgPT09IDEpIHJldHVybiBcIllvdSBhbHJlYWR5IHRyaWVkIHRvIGhpdCB0aGlzIG9uZVwiO1xuXHRcdGVsc2UgcmV0dXJuIG1pc3NTaG90KHgsIHkpO1xuXHR9O1xuXG5cdGNvbnN0IGhpdFNob3QgPSAoeCwgeSkgPT5cblx0e1xuXHRcdGlmIChkb21Cb2FyZCkgRE9NSGFuZGxlci5oaXRTaG90KHgsIHksIGRvbUJvYXJkKTtcblx0XHRnZXRHcmlkKHgsIHkpWzBdLmhpdChnZXRHcmlkKHgsIHkpWzFdKTtcblx0XHRzZXRHcmlkKHgsIHksIDEpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cdGNvbnN0IG1pc3NTaG90ID0gKHgsIHkpID0+XG5cdHtcblx0XHRtaXNzZWRTaG90cy5wdXNoKFt4LCB5XSk7XG5cdFx0c2V0R3JpZCh4LCB5LCAxKTtcblx0XHRpZiAoZG9tQm9hcmQpIERPTUhhbmRsZXIubWlzc1Nob3QoeCwgeSwgZG9tQm9hcmQpO1xuXHRcdHJldHVybiBcIk1pc3MhXCI7XG5cdH07XG5cblx0Y29uc3QgZGlkU2hpcHNTaW5rID0gKCkgPT5cblx0e1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYgKCFzaGlwc1tpXS5oYXNTdW5rKCkpIHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblx0Y29uc3QgcmVzZXQgPSAoKSA9PlxuXHR7XG5cdFx0c2hpcHMubGVuZ3RoID0gMDtcblx0XHRmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspXG5cdFx0e1xuXHRcdFx0Zm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKVxuXHRcdFx0e1xuXHRcdFx0XHRzZXRHcmlkKHgsIHksIDApO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRjb25zdCBnZXRHcmlkID0gKHgsIHkpID0+IGJvYXJkW3ldW3hdO1xuXHRjb25zdCBzZXRHcmlkID0gKHgsIHksIHZhbHVlKSA9PiBib2FyZFt5XVt4XSA9IHZhbHVlO1xuXG5cdHJldHVybiB7IHBsYWNlU2hpcCwgcGxhY2VTaGlwUmFuZG9tbHksIGJvYXJkLCBnZXRHcmlkLCByZWNlaXZlQXR0YWNrLCBtaXNzZWRTaG90cywgZGlkU2hpcHNTaW5rLCBkb21Cb2FyZCwgcmVzZXQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vR2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lLmpzXCI7XG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcblxuY29uc3QgUGxheWVyID0gKGJvYXJkLCBuYW1lKSA9Plxue1xuXHRsZXQgb2JqO1xuXG5cdGxldCB0YXJnZXRzID0gW107XG5cdGxldCBzaG90cyA9IFtdO1xuXG5cdGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH1gKSk7XG5cblx0Y29uc3QgcGxheSA9IGFzeW5jIChwbGF5ZXIsIGdldFJhbmRvbUNvb3JkKSA9Plx0XG5cdHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0XHRjb25zdCB0ZW1wID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwMCkgKyA1MDApKTtcblxuXHRcdGlmICh0YXJnZXRzLmxlbmd0aCAhPT0gMCkgcmV0dXJuIHRhcmdldE1vZGUocGxheWVyKTtcblxuXHRcdGNvbnN0IHBsYXllckdhbWVib2FyZCA9IHBsYXllci5nYW1lYm9hcmQ7XG5cdFx0Y29uc3QgcmFuZG9tUGxheSA9ICgpID0+XG5cdFx0e1x0XHRcdFxuXHRcdFx0Y29uc3QgeCA9IGdldFJhbmRvbUNvb3JkKCk7XG5cdFx0XHRjb25zdCB5ID0gZ2V0UmFuZG9tQ29vcmQoKTtcblxuXHRcdFx0aWYgKHBsYXllckdhbWVib2FyZC5nZXRHcmlkKHgsIHkpID09PSAxKSByZXR1cm4gcmFuZG9tUGxheSgpO1xuXG5cdFx0XHRjb25zdCBhdHRhY2sgPSBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcblx0XHRcdGlmIChhdHRhY2sgPT09IHRydWUpIGxvYWRUYXJnZXRzKFt4LCB5XSk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGF0dGFjayk7XG5cdFx0fTtcblx0XHRyZXR1cm4gcmFuZG9tUGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IGxvYWRUYXJnZXRzID0gY29vcmRzID0+XG5cdHtcblx0XHRzaG90cy5wdXNoKGNvb3Jkcyk7XG5cblx0XHRpZiAoY29vcmRzWzBdICsgMSAhPT0gMTApXG5cdFx0XHRpZiAoc2VhcmNoRm9yRHVwbGljYXRlcyhbY29vcmRzWzBdICsgMSwgY29vcmRzWzFdXSkpIFxuXHRcdFx0XHR0YXJnZXRzLnB1c2goW2Nvb3Jkc1swXSArIDEsIGNvb3Jkc1sxXV0pO1xuXHRcdFxuXHRcdGlmIChjb29yZHNbMF0gLSAxICE9PSAwKVxuXHRcdFx0aWYgKHNlYXJjaEZvckR1cGxpY2F0ZXMoW2Nvb3Jkc1swXSAtIDEsIGNvb3Jkc1sxXV0pKVxuXHRcdFx0XHR0YXJnZXRzLnB1c2goW2Nvb3Jkc1swXSAtIDEsIGNvb3Jkc1sxXV0pO1xuXG5cdFx0aWYgKGNvb3Jkc1sxXSAtIDEgIT09IDApXG5cdFx0XHRpZiAoc2VhcmNoRm9yRHVwbGljYXRlcyhbY29vcmRzWzBdLCBjb29yZHNbMV0gLSAxXSkpXG5cdFx0XHRcdHRhcmdldHMucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gLSAxXSk7XG5cdFx0XG5cdFx0aWYgKGNvb3Jkc1sxXSArIDEgIT09IDEwKVxuXHRcdFx0aWYgKHNlYXJjaEZvckR1cGxpY2F0ZXMoW2Nvb3Jkc1swXSwgY29vcmRzWzFdICsgMV0pKVxuXHRcdFx0XHR0YXJnZXRzLnB1c2goW2Nvb3Jkc1swXSwgY29vcmRzWzFdICsgMV0pO1xuXHR9O1xuXG5cdGNvbnN0IHRhcmdldE1vZGUgPSBwbGF5ZXIgPT5cblx0e1xuXHRcdGNvbnN0IGhpdCA9IHBsYXllci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh0YXJnZXRzWzBdWzBdLCB0YXJnZXRzWzBdWzFdKTtcblxuXHRcdGlmIChoaXQgPT09IHRydWUpIFxuXHRcdHtcblx0XHRcdGxvYWRUYXJnZXRzKFt0YXJnZXRzWzBdWzBdLCB0YXJnZXRzWzBdWzFdXSk7XG5cdFx0fVxuXHRcdHRhcmdldHMuc2hpZnQoKTtcblx0fTtcblxuXHRjb25zdCBzZWFyY2hGb3JEdXBsaWNhdGVzID0gY29vcmRzID0+XG5cdHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYgKHRhcmdldHNbaV1bMF0gPT09IGNvb3Jkc1swXSAmJiB0YXJnZXRzW2ldWzFdID09PSBjb29yZHNbMV0pIHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNob3RzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmIChzaG90c1tpXVswXSA9PT0gY29vcmRzWzBdICYmIHNob3RzW2ldWzFdID09PSBjb29yZHNbMV0pIHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXHRjb25zdCBnZXRSYW5kb21Db29yZCA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuXHRvYmogPSB7IGdhbWVib2FyZCwgcGxheSwgZ2V0UmFuZG9tQ29vcmQsIG5hbWUsIHRhcmdldHMgfTtcblxuXHRHYW1lLnBsYXllcnMucHVzaChvYmopO1xuXHRcblx0cmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9Plxue1xuXHRjb25zdCBpbmZvID0gW107XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG5cdHtcblx0XHRpbmZvLnB1c2goMCk7XG5cdH1cblxuXHRjb25zdCBoaXQgPSBudW1iZXIgPT5cblx0e1xuXHRcdGluZm9bbnVtYmVyXSA9IDE7XG5cdFx0cmV0dXJuIGBTaGlwIGhhcyBiZWVuIGhpdCBhdCAke251bWJlcn1gO1xuXHR9O1xuXG5cdGNvbnN0IGhhc1N1bmsgPSAoKSA9PlxuXHR7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmIChpbmZvW2ldID09PSAwKSByZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cdHJldHVybiB7IGxlbmd0aCwgaW5mbywgaGl0LCBoYXNTdW5rIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmUoR3AsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb24pO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCBpbiBtb2Rlcm4gZW5naW5lc1xuICAvLyB3ZSBjYW4gZXhwbGljaXRseSBhY2Nlc3MgZ2xvYmFsVGhpcy4gSW4gb2xkZXIgZW5naW5lcyB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xuaW1wb3J0IERPTUhhbmRsZXIgZnJvbSBcIi4vRE9NSGFuZGxlclwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIjtcblxubGV0IGxlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG5cbkRPTUhhbmRsZXIubWVudVN0YXJ0R2FtZSgpXG5cdC50aGVuKCgpID0+XG5cdHtcblx0XHRjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoXCJwbGF5ZXJib2FyZFwiLCBcIlBsYXllclwiKTtcblx0XHRET01IYW5kbGVyLmNyZWF0ZUJvYXJkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyYm9hcmRcIiksIHBsYXllci5nYW1lYm9hcmQsIHRydWUpXG5cdFx0XHQudGhlbigoKSA9PlxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBjb21wdXRlciA9IFBsYXllcihcImNvbXB1dGVyYm9hcmRcIiwgXCJDb21wdXRlclwiKTtcblx0XHRcdFx0RE9NSGFuZGxlci5jcmVhdGVCb2FyZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXB1dGVyYm9hcmRcIiksIGNvbXB1dGVyLmdhbWVib2FyZCk7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcFJhbmRvbWx5KGxlbmd0aHNbaV0sIHRydWUsIHRydWUsIHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fSk7XG5cbi8vIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXJib2FyZFwiLCBcIkNvbXB1dGVyXCIpO1xuLy8gRE9NSGFuZGxlci5jcmVhdGVCb2FyZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXB1dGVyYm9hcmRcIiksIGNvbXB1dGVyLmdhbWVib2FyZCk7XG4vLyBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspXG4vLyB7XG4vLyBcdGNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBSYW5kb21seShpLCBmYWxzZSwgdHJ1ZSk7XG4vLyB9XG4iXSwibmFtZXMiOlsiR2FtZSIsIkRPTUhhbmRsZXIiLCJsZW5ndGhzIiwidmVydGljYWwiLCJjcmVhdGVCb2FyZCIsImRvbUJvYXJkIiwiYm9hcmQiLCJwbGF5ZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsImwiLCJpIiwiaiIsImdyaWRFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGF0YXNldCIsImNvb3JkcyIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlY2VpdmVBdHRhY2siLCJwbGF5Um91bmQiLCJvbmNlIiwidG9nZ2xlIiwidGV4dENvbnRlbnQiLCJpZCIsInBhcmVudEVsZW1lbnQiLCJrIiwiZWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmUiLCJwbGFjZVNoaXAiLCJlbmRTZXRVcCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsImRpdiIsInN0YXJ0IiwiY3Vyc29yIiwicmVzZXQiLCJpbm5lckhUTUwiLCJkaXNwbGF5IiwieCIsInkiLCJ2aXNpYmxlIiwiYmFja2dyb3VuZENvbG9yIiwiY3JlYXRlQm9hcmRzIiwiYm9hcmRzIiwicGxheWVyYm9hcmRDb250YWluZXIiLCJwbGF5ZXJib2FyZCIsImNvbXB1dGVyYm9hcmQiLCJtZW51U3RhcnRHYW1lIiwib3BhY2l0eSIsInNldFRpbWVvdXQiLCJtaXNzU2hvdCIsImhpdFNob3QiLCJwbGF5ZXJzIiwiX3BsYXllclR1cm4iLCJnYW1lT3ZlciIsImRpZFBsYXllcnNTaW5rIiwibGVuZ3RoIiwiZ2FtZWJvYXJkIiwiZGlkU2hpcHNTaW5rIiwiY2xlYXJQbGF5ZXJzIiwic3dpdGNoVHVybnNET00iLCJ0ZXN0IiwiY29tcHV0ZXJUdXJuIiwiY29tcHV0ZXIiLCJmaW5kIiwibmFtZSIsInBsYXkiLCJnZXRSYW5kb21Db29yZCIsInRoZW4iLCJpc0dhbWVPdmVyIiwiYWxlcnQiLCJwbGF5ZXJUdXJuIiwiY2hhbmdlVHVybnMiLCJTaGlwIiwiR2FtZWJvYXJkIiwic2hpcHMiLCJtaXNzZWRTaG90cyIsInhDb29yZCIsInlDb29yZCIsImNoZWNrUmFuZ2UiLCJzaGlwIiwicHVzaCIsInNldEdyaWQiLCJwbGFjZVNoaXBSYW5kb21seSIsInZpc2liaWxpdHkiLCJmb28iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZXRHcmlkIiwiaGl0IiwiaGFzU3VuayIsInZhbHVlIiwiUGxheWVyIiwib2JqIiwidGFyZ2V0cyIsInNob3RzIiwidGVtcCIsInRhcmdldE1vZGUiLCJwbGF5ZXJHYW1lYm9hcmQiLCJyYW5kb21QbGF5IiwiYXR0YWNrIiwibG9hZFRhcmdldHMiLCJzZWFyY2hGb3JEdXBsaWNhdGVzIiwic2hpZnQiLCJpbmZvIiwibnVtYmVyIl0sInNvdXJjZVJvb3QiOiIifQ==