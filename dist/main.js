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
              toggle.textContent = "Vertical";
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
                if (l === 5) endSetUp(domBoard, resolve);
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
  };

  var endSetUp = function endSetUp(domBoard, resolve) {
    domBoard.style.pointerEvents = "none";
    domBoard.parentElement.querySelector("h1").remove();
    resolve();
  };

  var placeShip = function placeShip(x, y, domBoard) {
    var visible = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var element = domBoard.querySelector(".board-element[data-coords=\"(".concat(x, ", ").concat(y, ")\"]"));
    if (visible) element.style.backgroundColor = "red";
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
    hitShot: hitShot
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
    computer.randomPlay(players.find(function (player) {
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

  var placeShip = function placeShip(xCoord, yCoord, length, vertical, visible) {
    if (!checkRange(xCoord, yCoord, length, vertical)) return "Out of range";
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

  var placeShipRandomly = function placeShipRandomly(length, vertical, visibility) {
    var foo = function foo() {
      if (placeShip(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), length, vertical, visibility) === "Out of range") foo();
    };

    foo();
  };

  var checkRange = function checkRange(xCoord, yCoord, length, vertical) {
    if (!vertical) {
      // This checks if ships is out of bounds
      if (xCoord + length > 10) return false; // This checks for overlapping

      for (var i = xCoord; i < length + xCoord; i++) {
        if (getGrid(i, yCoord) !== 0) return false;
      }

      return true;
    } else {
      if (yCoord + length > 10) return false;

      for (var _i2 = yCoord; _i2 < length + yCoord; _i2++) {
        if (getGrid(xCoord, _i2) !== 0) return false;
      }

      return true;
    }
  };

  var receiveAttack = function receiveAttack(x, y) {
    if (typeof getGrid(x, y) !== "number") return hitShot(x, y);else if (getGrid(x, y) === 1) return "You already tried to hit this one";else return missShot(x, y);
  };

  var hitShot = function hitShot(x, y) {
    if (domBoard) _DOMHandler_js__WEBPACK_IMPORTED_MODULE_0__.default.hitShot(x, y, domBoard);

    var _info = getGrid(x, y)[0].hit(getGrid(x, y)[1]);

    setGrid(x, y, 1);
    return _info;
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
    domBoard: domBoard
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
  var gameboard = (0,_Gameboard_js__WEBPACK_IMPORTED_MODULE_0__.default)(document.querySelector("#".concat(board)));

  var randomPlay = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(player, getRandomCoord) {
      var temp, playerGameboard, play;
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
              playerGameboard = player.gameboard;

              play = function play() {
                var x = getRandomCoord();
                var y = getRandomCoord();
                if (playerGameboard.getGrid(x, y) === 1) return play();
                var attack = playerGameboard.receiveAttack(x, y);
                return Promise.resolve(attack);
              };

              return _context.abrupt("return", play());

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function randomPlay(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getRandomCoord = function getRandomCoord() {
    return Math.floor(Math.random() * 10);
  };

  obj = {
    gameboard: gameboard,
    randomPlay: randomPlay,
    getRandomCoord: getRandomCoord,
    name: name
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



var player = (0,_Player__WEBPACK_IMPORTED_MODULE_2__.default)("playerboard", "Player");
_DOMHandler__WEBPACK_IMPORTED_MODULE_1__.default.createBoard(document.querySelector("#playerboard"), player.gameboard, true).then(function () {
  var computer = (0,_Player__WEBPACK_IMPORTED_MODULE_2__.default)("computerboard", "Computer");
  _DOMHandler__WEBPACK_IMPORTED_MODULE_1__.default.createBoard(document.querySelector("#computerboard"), computer.gameboard);

  for (var i = 1; i <= 5; i++) {
    computer.gameboard.placeShipRandomly(i, false, true);
  }
}); // const computer = Player("computerboard", "Computer");
// DOMHandler.createBoard(document.querySelector("#computerboard"), computer.gameboard);
// for (let i = 1; i <= 5; i++)
// {
// 	computer.gameboard.placeShipRandomly(i, false, true);
// }
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsbUJBQW1CO0FBQ3BEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZ0JBQWdCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxLQUEwQixvQkFBb0IsQ0FBRTtBQUNsRDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7Ozs7Ozs7VUNqdkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBRUEsSUFBTXpELE1BQU0sR0FBRzhFLGdEQUFNLENBQUMsYUFBRCxFQUFnQixRQUFoQixDQUFyQjtBQUNBcEYsNERBQUEsQ0FBdUJhLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBdkIsRUFBK0R2QixNQUFNLENBQUN3QyxTQUF0RSxFQUFpRixJQUFqRixFQUNFVyxJQURGLENBQ08sWUFDTjtBQUNDLE1BQU1MLFFBQVEsR0FBR2dDLGdEQUFNLENBQUMsZUFBRCxFQUFrQixVQUFsQixDQUF2QjtBQUNBcEYsRUFBQUEsNERBQUEsQ0FBdUJhLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXZCLEVBQWlFdUIsUUFBUSxDQUFDTixTQUExRTs7QUFDQSxPQUFLLElBQUlwQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJLENBQXJCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQ0E7QUFDQzBDLElBQUFBLFFBQVEsQ0FBQ04sU0FBVCxDQUFtQjJCLGlCQUFuQixDQUFxQy9ELENBQXJDLEVBQXdDLEtBQXhDLEVBQStDLElBQS9DO0FBQ0E7QUFDRCxDQVRGLEdBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcblxuY29uc3QgRE9NSGFuZGxlciA9ICgoKSA9Plxue1xuXHRjb25zdCBsZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xuXHRsZXQgdmVydGljYWwgPSBmYWxzZTtcblxuXHRjb25zdCBjcmVhdGVCb2FyZCA9IChkb21Cb2FyZCwgYm9hcmQsIHBsYXllcikgPT5cblx0e1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+XG5cdFx0e1xuXHRcdFx0bGV0IGwgPSAwO1xuXHRcdFx0Ly8gaSBpcyB0aGUgeSBheGlzXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdC8vIGogaXMgdGhlIHggYXhpc1xuXHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBncmlkRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdFx0Z3JpZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkLWVsZW1lbnRcIik7XG5cdFx0XHRcdFx0Z3JpZEVsZW1lbnQuZGF0YXNldC5jb29yZHMgPSBgKCR7an0sICR7aX0pYDtcblx0XHRcdFx0XHRkb21Cb2FyZC5hcHBlbmRDaGlsZChncmlkRWxlbWVudCk7XG5cdFxuXHRcdFx0XHRcdC8vIENoZWNrIGlmIGhhdmUgdG8gcGxhY2UgZmlyc3Rcblx0XHRcdFx0XHRpZiAoIXBsYXllcilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRncmlkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGJvYXJkLnJlY2VpdmVBdHRhY2soaiwgaSk7XG5cdFx0XHRcdFx0XHRcdEdhbWUucGxheVJvdW5kKCk7XG5cdFx0XHRcdFx0XHR9LCB7b25jZTogdHJ1ZX0pO1xuXHRcdFx0XHRcdH0gXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChpID09PSAwICYmIGogPT09IDApXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblx0XHRcdFx0XHRcdFx0dG9nZ2xlLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbFwiO1xuXHRcdFx0XHRcdFx0XHRncmlkRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodG9nZ2xlKTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGlmICh2ZXJ0aWNhbClcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHR2ZXJ0aWNhbCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0dG9nZ2xlLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbFwiO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdHZlcnRpY2FsID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdHRvZ2dsZS50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbFwiO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGdyaWRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aWYgKCF2ZXJ0aWNhbClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGZvciAobGV0IGsgPSBqOyBrIDwgbGVuZ3Roc1tsXSArIGo7IGsrKylcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gZ3JpZEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS1jb29yZHM9XCIoJHtrfSwgJHtpfSlcIl1gKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghZWxlbWVudCkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgayA9IGk7IGsgPCBsZW5ndGhzW2xdICsgaTsgaysrKVxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBncmlkRWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYGRpdltkYXRhLWNvb3Jkcz1cIigke2p9LCAke2t9KVwiXWApO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFlbGVtZW50KSByZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFxuXHRcdFx0XHRcdFx0Z3JpZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlmICghdmVydGljYWwpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCBrID0gajsgayA8IGxlbmd0aHNbbF0gKyBqOyBrKyspXG5cdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IGdyaWRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEtY29vcmRzPVwiKCR7a30sICR7aX0pXCJdYCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVsZW1lbnQpIHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGZvciAobGV0IGsgPSBpOyBrIDwgbGVuZ3Roc1tsXSArIGk7IGsrKylcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gZ3JpZEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS1jb29yZHM9XCIoJHtqfSwgJHtrfSlcIl1gKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghZWxlbWVudCkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcblx0XHRcdFx0XHRcdGdyaWRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZiAoYm9hcmQucGxhY2VTaGlwKGosIGksIGxlbmd0aHNbbF0sIHZlcnRpY2FsLCB0cnVlKSA9PT0gdHJ1ZSlcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGJvYXJkLnBsYWNlU2hpcChqLCBpLCBsZW5ndGhzW2xdLCB2ZXJ0aWNhbCwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCF2ZXJ0aWNhbClcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCBrID0gajsgayA8IGxlbmd0aHNbbF0gKyBqOyBrKyspXG5cdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGdyaWRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEtY29vcmRzPVwiKCR7a30sICR7aX0pXCJdYCkuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgayA9IGk7IGsgPCBsZW5ndGhzW2xdICsgaTsgaysrKVxuXHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRncmlkRWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYGRpdltkYXRhLWNvb3Jkcz1cIigke2p9LCAke2t9KVwiXWApLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRsKys7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGwgPT09IDUpIGVuZFNldFVwKGRvbUJvYXJkLCByZXNvbHZlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XHRcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBlbmRTZXRVcCA9IChkb21Cb2FyZCwgcmVzb2x2ZSkgPT5cblx0e1xuXHRcdGRvbUJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcblx0XHRkb21Cb2FyZC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMVwiKS5yZW1vdmUoKTtcblx0XHRyZXNvbHZlKCk7XG5cdH07XG5cblx0Y29uc3QgcGxhY2VTaGlwID0gKHgsIHksIGRvbUJvYXJkLCB2aXNpYmxlID0gZmFsc2UpID0+XG5cdHtcblx0XHRjb25zdCBlbGVtZW50ID0gZG9tQm9hcmQucXVlcnlTZWxlY3RvcihgLmJvYXJkLWVsZW1lbnRbZGF0YS1jb29yZHM9XCIoJHt4fSwgJHt5fSlcIl1gKTtcblx0XHRpZiAodmlzaWJsZSkgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuXHR9O1xuXG5cdGNvbnN0IG1pc3NTaG90ID0gKHgsIHksIGRvbUJvYXJkKSA9PiBcblx0XHRkb21Cb2FyZC5xdWVyeVNlbGVjdG9yKGAuYm9hcmQtZWxlbWVudFtkYXRhLWNvb3Jkcz1cIigke3h9LCAke3l9KVwiXWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwieWVsbG93XCI7XG5cblx0Y29uc3QgaGl0U2hvdCA9ICh4LCB5LCBkb21Cb2FyZCkgPT5cblx0XHRkb21Cb2FyZC5xdWVyeVNlbGVjdG9yKGAuYm9hcmQtZWxlbWVudFtkYXRhLWNvb3Jkcz1cIigke3h9LCAke3l9KVwiXWApLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG5cblx0cmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlU2hpcCwgbWlzc1Nob3QsIGhpdFNob3QgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IERPTUhhbmRsZXI7XG4iLCJjb25zdCBHYW1lID0gKCgpID0+XG57XG5cdGxldCBwbGF5ZXJzID0gW107XG5cblx0bGV0IF9wbGF5ZXJUdXJuID0gdHJ1ZTtcblx0bGV0IGdhbWVPdmVyID0gZmFsc2U7XG5cblx0Y29uc3QgZGlkUGxheWVyc1NpbmsgPSAoKSA9PlxuXHR7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmIChwbGF5ZXJzW2ldLmdhbWVib2FyZC5kaWRTaGlwc1NpbmsoKSkgcmV0dXJuIHBsYXllcnNbaV07XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHRjb25zdCBjbGVhclBsYXllcnMgPSAoKSA9PiBwbGF5ZXJzLmxlbmd0aCA9IDA7XG5cblx0Y29uc3Qgc3dpdGNoVHVybnNET00gPSAodGVzdCkgPT5cblx0e1xuXHRcdGlmICh0ZXN0KSByZXR1cm47XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wdXRlcmJvYXJkXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJub3QtdHVyblwiKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcmJvYXJkXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJub3QtdHVyblwiKTtcblx0fTtcblxuXHRjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PlxuXHR7XG5cdFx0Y29uc3QgY29tcHV0ZXIgPSBwbGF5ZXJzLmZpbmQocGxheWVyID0+IHBsYXllci5uYW1lID09PSBcIkNvbXB1dGVyXCIpO1xuXHRcdGNvbXB1dGVyLnJhbmRvbVBsYXkocGxheWVycy5maW5kKHBsYXllciA9PiBwbGF5ZXIubmFtZSA9PT0gXCJQbGF5ZXJcIiksIGNvbXB1dGVyLmdldFJhbmRvbUNvb3JkKVxuXHRcdFx0LnRoZW4oKCkgPT4gXG5cdFx0XHR7XG5cdFx0XHRcdHN3aXRjaFR1cm5zRE9NKCk7XG5cdFx0XHRcdGlzR2FtZU92ZXIoYWxlcnQpO1xuXHRcdFx0fSk7XG5cdH07XG5cdFxuXHRjb25zdCBwbGF5ZXJUdXJuID0gKHRlc3QpID0+IHN3aXRjaFR1cm5zRE9NKHRlc3QpO1xuXHRcblx0Y29uc3QgaXNHYW1lT3ZlciA9IChhbGVydCkgPT5cblx0e1xuXHRcdGlmIChkaWRQbGF5ZXJzU2luaygpKSBcblx0XHR7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGFsZXJ0KFwic1wiKSwgMCk7XG5cdFx0XHRnYW1lT3ZlciA9IHRydWU7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGNoYW5nZVR1cm5zID0gKCkgPT4gX3BsYXllclR1cm4gPSAhX3BsYXllclR1cm47XG5cdFxuXHRjb25zdCBwbGF5Um91bmQgPSAodGVzdCkgPT5cblx0e1xuXHRcdGlmIChnYW1lT3ZlcikgcmV0dXJuO1xuXHRcdF9wbGF5ZXJUdXJuID8gcGxheWVyVHVybih0ZXN0KSA6IGNvbXB1dGVyVHVybigpO1xuXHRcdGNoYW5nZVR1cm5zKCk7XG5cdFx0aXNHYW1lT3ZlcihhbGVydCk7XG5cdFx0aWYgKF9wbGF5ZXJUdXJuID09PSBmYWxzZSkgcmV0dXJuIHBsYXlSb3VuZCgpO1xuXHRcdHJldHVybiBfcGxheWVyVHVybjtcblx0fTtcblxuXHRyZXR1cm4geyBwbGF5ZXJzLCBkaWRQbGF5ZXJzU2luaywgY2xlYXJQbGF5ZXJzLCBwbGF5Um91bmQgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJpbXBvcnQgRE9NSGFuZGxlciBmcm9tIFwiLi9ET01IYW5kbGVyLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwLmpzXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IChkb21Cb2FyZCkgPT5cbntcblx0bGV0IGJvYXJkID1cblx0W1xuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XTtcblxuXHRjb25zdCBzaGlwcyA9IFtdO1xuXHRjb25zdCBtaXNzZWRTaG90cyA9IFtdO1xuXG5cdGNvbnN0IHBsYWNlU2hpcCA9ICh4Q29vcmQsIHlDb29yZCwgbGVuZ3RoLCB2ZXJ0aWNhbCwgdmlzaWJsZSkgPT5cblx0e1xuXHRcdGlmICghY2hlY2tSYW5nZSh4Q29vcmQsIHlDb29yZCwgbGVuZ3RoLCB2ZXJ0aWNhbCkpIHJldHVybiBcIk91dCBvZiByYW5nZVwiO1xuXHRcdGNvbnN0IHNoaXAgPSBTaGlwKGxlbmd0aCk7XG5cdFx0c2hpcHMucHVzaChzaGlwKTtcblxuXHRcdC8vIGogaXMgc2hpcCBwYXJ0c1xuXHRcdGxldCBqID0gMDtcblx0XHRpZiAoIXZlcnRpY2FsKVxuXHRcdHtcblx0XHRcdGZvciAobGV0IGkgPSB4Q29vcmQ7IGkgPCBsZW5ndGggKyB4Q29vcmQ7IGkrKylcblx0XHRcdHtcblx0XHRcdFx0c2V0R3JpZChpLCB5Q29vcmQsIFtzaGlwLCBqXSk7XG5cdFx0XHRcdGlmIChkb21Cb2FyZCkgRE9NSGFuZGxlci5wbGFjZVNoaXAoaSwgeUNvb3JkLCBkb21Cb2FyZCwgdmlzaWJsZSk7XG5cdFx0XHRcdGorKztcblx0XHRcdH1cblx0XHR9IGVsc2Vcblx0XHR7XG5cdFx0XHRmb3IgKGxldCBpID0geUNvb3JkOyBpIDwgbGVuZ3RoICsgeUNvb3JkOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdHNldEdyaWQoeENvb3JkLCBpLCBbc2hpcCwgal0pO1xuXHRcdFx0XHRpZiAoZG9tQm9hcmQpIERPTUhhbmRsZXIucGxhY2VTaGlwKHhDb29yZCwgaSwgZG9tQm9hcmQsIHZpc2libGUpO1xuXHRcdFx0XHRqKys7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cdGNvbnN0IHBsYWNlU2hpcFJhbmRvbWx5ID0gKGxlbmd0aCwgdmVydGljYWwsIHZpc2liaWxpdHkpID0+IFxuXHR7XG5cdFx0Y29uc3QgZm9vID0gKCkgPT5cblx0XHR7XG5cdFx0XHRpZiAocGxhY2VTaGlwKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBsZW5ndGgsIHZlcnRpY2FsLCB2aXNpYmlsaXR5KSA9PT0gXCJPdXQgb2YgcmFuZ2VcIilcblx0XHRcdFx0Zm9vKCk7XG5cdFx0fTtcblx0XHRmb28oKTtcblx0fTtcblxuXHRjb25zdCBjaGVja1JhbmdlID0gKHhDb29yZCwgeUNvb3JkLCBsZW5ndGgsIHZlcnRpY2FsKSA9PlxuXHR7XG5cdFx0aWYgKCF2ZXJ0aWNhbClcblx0XHR7XG5cdFx0XHQvLyBUaGlzIGNoZWNrcyBpZiBzaGlwcyBpcyBvdXQgb2YgYm91bmRzXG5cdFx0XHRpZiAoKHhDb29yZCArIGxlbmd0aCkgPiAxMCkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0Ly8gVGhpcyBjaGVja3MgZm9yIG92ZXJsYXBwaW5nXG5cdFx0XHRmb3IgKGxldCBpID0geENvb3JkOyBpIDwgbGVuZ3RoICsgeENvb3JkOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChnZXRHcmlkKGksIHlDb29yZCkgIT09IDApIHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZVxuXHRcdHtcblx0XHRcdGlmICgoeUNvb3JkICsgbGVuZ3RoKSA+IDEwKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0geUNvb3JkOyBpIDwgbGVuZ3RoICsgeUNvb3JkOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChnZXRHcmlkKHhDb29yZCwgaSkgIT09IDApIHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fTtcblxuXHRjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+XG5cdHtcblx0XHRpZiAodHlwZW9mKGdldEdyaWQoeCwgeSkpICE9PSBcIm51bWJlclwiKSByZXR1cm4gaGl0U2hvdCh4LCB5KTtcblx0XHRlbHNlIGlmIChnZXRHcmlkKHgsIHkpID09PSAxKSByZXR1cm4gXCJZb3UgYWxyZWFkeSB0cmllZCB0byBoaXQgdGhpcyBvbmVcIjtcblx0XHRlbHNlIHJldHVybiBtaXNzU2hvdCh4LCB5KTtcblx0fTtcblxuXHRjb25zdCBoaXRTaG90ID0gKHgsIHkpID0+XG5cdHtcblx0XHRpZiAoZG9tQm9hcmQpIERPTUhhbmRsZXIuaGl0U2hvdCh4LCB5LCBkb21Cb2FyZCk7XG5cdFx0Y29uc3QgX2luZm8gPSBnZXRHcmlkKHgsIHkpWzBdLmhpdChnZXRHcmlkKHgsIHkpWzFdKTtcblx0XHRzZXRHcmlkKHgsIHksIDEpO1xuXHRcdHJldHVybiBfaW5mbztcblx0fTtcblxuXHRjb25zdCBtaXNzU2hvdCA9ICh4LCB5KSA9PlxuXHR7XG5cdFx0bWlzc2VkU2hvdHMucHVzaChbeCwgeV0pO1xuXHRcdHNldEdyaWQoeCwgeSwgMSk7XG5cdFx0aWYgKGRvbUJvYXJkKSBET01IYW5kbGVyLm1pc3NTaG90KHgsIHksIGRvbUJvYXJkKTtcblx0XHRyZXR1cm4gXCJNaXNzIVwiO1xuXHR9O1xuXG5cdGNvbnN0IGRpZFNoaXBzU2luayA9ICgpID0+XG5cdHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmICghc2hpcHNbaV0uaGFzU3VuaygpKSByZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cdGNvbnN0IGdldEdyaWQgPSAoeCwgeSkgPT4gYm9hcmRbeV1beF07XG5cdGNvbnN0IHNldEdyaWQgPSAoeCwgeSwgdmFsdWUpID0+IGJvYXJkW3ldW3hdID0gdmFsdWU7XG5cblx0cmV0dXJuIHsgcGxhY2VTaGlwLCBwbGFjZVNoaXBSYW5kb21seSwgYm9hcmQsIGdldEdyaWQsIHJlY2VpdmVBdHRhY2ssIG1pc3NlZFNob3RzLCBkaWRTaGlwc1NpbmssIGRvbUJvYXJkIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL0dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZS5qc1wiO1xuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5cbmNvbnN0IFBsYXllciA9IChib2FyZCwgbmFtZSkgPT5cbntcblx0bGV0IG9iajtcblxuXHRjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9YCkpO1xuXG5cdGNvbnN0IHJhbmRvbVBsYXkgPSBhc3luYyAocGxheWVyLCBnZXRSYW5kb21Db29yZCkgPT5cdFxuXHR7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdFx0Y29uc3QgdGVtcCA9IGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MDApICsgNTAwKSk7XG5cblx0XHRjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBwbGF5ZXIuZ2FtZWJvYXJkO1xuXHRcdGNvbnN0IHBsYXkgPSAoKSA9PlxuXHRcdHtcdFx0XHRcblx0XHRcdGNvbnN0IHggPSBnZXRSYW5kb21Db29yZCgpO1xuXHRcdFx0Y29uc3QgeSA9IGdldFJhbmRvbUNvb3JkKCk7XG5cblx0XHRcdGlmIChwbGF5ZXJHYW1lYm9hcmQuZ2V0R3JpZCh4LCB5KSA9PT0gMSkgcmV0dXJuIHBsYXkoKTtcblxuXHRcdFx0Y29uc3QgYXR0YWNrID0gcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGF0dGFjayk7XG5cdFx0fTtcblx0XHRyZXR1cm4gcGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IGdldFJhbmRvbUNvb3JkID0gKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG5cdG9iaiA9IHsgZ2FtZWJvYXJkLCByYW5kb21QbGF5LCBnZXRSYW5kb21Db29yZCwgbmFtZSB9O1xuXG5cdEdhbWUucGxheWVycy5wdXNoKG9iaik7XG5cdFxuXHRyZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY29uc3QgU2hpcCA9IChsZW5ndGgpID0+XG57XG5cdGNvbnN0IGluZm8gPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKylcblx0e1xuXHRcdGluZm8ucHVzaCgwKTtcblx0fVxuXG5cdGNvbnN0IGhpdCA9IG51bWJlciA9PlxuXHR7XG5cdFx0aW5mb1tudW1iZXJdID0gMTtcblx0XHRyZXR1cm4gYFNoaXAgaGFzIGJlZW4gaGl0IGF0ICR7bnVtYmVyfWA7XG5cdH07XG5cblx0Y29uc3QgaGFzU3VuayA9ICgpID0+XG5cdHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGluZm8ubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYgKGluZm9baV0gPT09IDApIHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblx0cmV0dXJuIHsgbGVuZ3RoLCBpbmZvLCBoaXQsIGhhc1N1bmsgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIGRlZmluZShHcCwgXCJjb25zdHJ1Y3RvclwiLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gIGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCBHZW5lcmF0b3JGdW5jdGlvbik7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIGluIG1vZGVybiBlbmdpbmVzXG4gIC8vIHdlIGNhbiBleHBsaWNpdGx5IGFjY2VzcyBnbG9iYWxUaGlzLiBJbiBvbGRlciBlbmdpbmVzIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5pbXBvcnQgRE9NSGFuZGxlciBmcm9tIFwiLi9ET01IYW5kbGVyXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xuXG5jb25zdCBwbGF5ZXIgPSBQbGF5ZXIoXCJwbGF5ZXJib2FyZFwiLCBcIlBsYXllclwiKTtcbkRPTUhhbmRsZXIuY3JlYXRlQm9hcmQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXJib2FyZFwiKSwgcGxheWVyLmdhbWVib2FyZCwgdHJ1ZSlcblx0LnRoZW4oKCkgPT5cblx0e1xuXHRcdGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXJib2FyZFwiLCBcIkNvbXB1dGVyXCIpO1xuXHRcdERPTUhhbmRsZXIuY3JlYXRlQm9hcmQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wdXRlcmJvYXJkXCIpLCBjb21wdXRlci5nYW1lYm9hcmQpO1xuXHRcdGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKylcblx0XHR7XG5cdFx0XHRjb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwUmFuZG9tbHkoaSwgZmFsc2UsIHRydWUpO1xuXHRcdH1cblx0fSk7XG5cbi8vIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXJib2FyZFwiLCBcIkNvbXB1dGVyXCIpO1xuLy8gRE9NSGFuZGxlci5jcmVhdGVCb2FyZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXB1dGVyYm9hcmRcIiksIGNvbXB1dGVyLmdhbWVib2FyZCk7XG4vLyBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspXG4vLyB7XG4vLyBcdGNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBSYW5kb21seShpLCBmYWxzZSwgdHJ1ZSk7XG4vLyB9XG4iXSwibmFtZXMiOlsiR2FtZSIsIkRPTUhhbmRsZXIiLCJsZW5ndGhzIiwidmVydGljYWwiLCJjcmVhdGVCb2FyZCIsImRvbUJvYXJkIiwiYm9hcmQiLCJwbGF5ZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsImwiLCJpIiwiaiIsImdyaWRFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGF0YXNldCIsImNvb3JkcyIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlY2VpdmVBdHRhY2siLCJwbGF5Um91bmQiLCJvbmNlIiwidG9nZ2xlIiwidGV4dENvbnRlbnQiLCJwYXJlbnRFbGVtZW50IiwiayIsImVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicmVtb3ZlIiwicGxhY2VTaGlwIiwiZW5kU2V0VXAiLCJzdHlsZSIsInBvaW50ZXJFdmVudHMiLCJ4IiwieSIsInZpc2libGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtaXNzU2hvdCIsImhpdFNob3QiLCJwbGF5ZXJzIiwiX3BsYXllclR1cm4iLCJnYW1lT3ZlciIsImRpZFBsYXllcnNTaW5rIiwibGVuZ3RoIiwiZ2FtZWJvYXJkIiwiZGlkU2hpcHNTaW5rIiwiY2xlYXJQbGF5ZXJzIiwic3dpdGNoVHVybnNET00iLCJ0ZXN0IiwiY29tcHV0ZXJUdXJuIiwiY29tcHV0ZXIiLCJmaW5kIiwibmFtZSIsInJhbmRvbVBsYXkiLCJnZXRSYW5kb21Db29yZCIsInRoZW4iLCJpc0dhbWVPdmVyIiwiYWxlcnQiLCJwbGF5ZXJUdXJuIiwic2V0VGltZW91dCIsImNoYW5nZVR1cm5zIiwiU2hpcCIsIkdhbWVib2FyZCIsInNoaXBzIiwibWlzc2VkU2hvdHMiLCJ4Q29vcmQiLCJ5Q29vcmQiLCJjaGVja1JhbmdlIiwic2hpcCIsInB1c2giLCJzZXRHcmlkIiwicGxhY2VTaGlwUmFuZG9tbHkiLCJ2aXNpYmlsaXR5IiwiZm9vIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2V0R3JpZCIsIl9pbmZvIiwiaGl0IiwiaGFzU3VuayIsInZhbHVlIiwiUGxheWVyIiwib2JqIiwidGVtcCIsInBsYXllckdhbWVib2FyZCIsInBsYXkiLCJhdHRhY2siLCJpbmZvIiwibnVtYmVyIl0sInNvdXJjZVJvb3QiOiIifQ==