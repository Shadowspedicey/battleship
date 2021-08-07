/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMHandler.js":
/*!***************************!*\
  !*** ./src/DOMHandler.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var DOMHandler = function () {
  var createBoard = function createBoard(domBoard, board) {
    var _loop = function _loop(i) {
      var _loop2 = function _loop2(j) {
        var gridElement = document.createElement("div");
        gridElement.classList.add("board-element");
        gridElement.dataset.coords = "(".concat(j, ", ").concat(i, ")");
        domBoard.appendChild(gridElement);
        gridElement.addEventListener("click", function () {
          return board.receiveAttack(j, i);
        });
      };

      for (var j = 0; j < 10; j++) {
        _loop2(j);
      }
    };

    for (var i = 0; i < 10; i++) {
      _loop(i);
    }
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

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOMHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMHandler.js */ "./src/DOMHandler.js");
/* harmony import */ var _Ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship.js */ "./src/Ship.js");



var Gameboard = function Gameboard(domBoard) {
  var board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  var missedShots = [];
  var ships = [];

  var placeShip = function placeShip(xCoord, yCoord, length, visible) {
    if (xCoord + length > 10) return "Out of range";
    var ship = (0,_Ship_js__WEBPACK_IMPORTED_MODULE_1__.default)(length);
    ships.push(ship);
    var j = 0;

    for (var i = xCoord; i < length + xCoord; i++) {
      setGrid(i, yCoord, [ship, j]);
      _DOMHandler_js__WEBPACK_IMPORTED_MODULE_0__.default.placeShip(i, yCoord, domBoard, visible);
      j++;
    }
  };

  var receiveAttack = function receiveAttack(x, y) {
    if (typeof getGrid(x, y) !== "number") return hitShot(x, y);else if (getGrid(x, y) === 1) return "You already tried to hit this one";else return missShot(x, y);
  };

  var hitShot = function hitShot(x, y) {
    getGrid(x, y)[0].hit(getGrid(x, y)[1]);
    _DOMHandler_js__WEBPACK_IMPORTED_MODULE_0__.default.hitShot(x, y, domBoard);
  };

  var missShot = function missShot(x, y) {
    missedShots.push([x, y]);
    setGrid(x, y, 1);
    _DOMHandler_js__WEBPACK_IMPORTED_MODULE_0__.default.missShot(x, y, domBoard);
    return "Miss!";
  };

  var didShipsSink = function didShipsSink() {
    for (var i = 0; i < ships.length; i++) {
      if (!ships[i].hasSunk()) return false;
    }

    return true;
  };

  var setGrid = function setGrid(x, y, value) {
    return board[y][x] = value;
  };

  var getGrid = function getGrid(x, y) {
    return board[y][x];
  };

  return {
    placeShip: placeShip,
    board: board,
    getGrid: getGrid,
    receiveAttack: receiveAttack,
    missedShots: missedShots,
    didShipsSink: didShipsSink
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard.js */ "./src/Gameboard.js");


var Player = function Player(board) {
  var gameboard = (0,_Gameboard_js__WEBPACK_IMPORTED_MODULE_0__.default)(document.querySelector("#".concat(board)));

  var randomPlay = function randomPlay(player, getRandomCoord) {
    var playerGameboard = player.gameboard;

    var play = function play() {
      var x = getRandomCoord();
      var y = getRandomCoord();
      if (playerGameboard.getGrid(x, y) === 1) return play();
      return playerGameboard.receiveAttack(x, y);
    };

    return play();
  };

  var getRandomCoord = function getRandomCoord() {
    return Math.floor(Math.random() * 10);
  };

  return {
    gameboard: gameboard,
    randomPlay: randomPlay,
    getRandomCoord: getRandomCoord
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DOMHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMHandler */ "./src/DOMHandler.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ "./src/Player.js");


var player = (0,_Player__WEBPACK_IMPORTED_MODULE_1__.default)("playerboard");
_DOMHandler__WEBPACK_IMPORTED_MODULE_0__.default.createBoard(document.querySelector("#playerboard"), player.gameboard);
player.gameboard.placeShip(0, 0, 4, true);
player.gameboard.placeShip(0, 5, 2, true);
player.gameboard.placeShip(6, 2, 3, true);
player.gameboard.placeShip(9, 9, 1, true);
var computer = (0,_Player__WEBPACK_IMPORTED_MODULE_1__.default)("computerboard");
_DOMHandler__WEBPACK_IMPORTED_MODULE_0__.default.createBoard(document.querySelector("#computerboard"), computer.gameboard);
computer.gameboard.placeShip(0, 0, 4);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLENBRkQsRUFHQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLENBSEQsRUFJQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLENBSkQsRUFLQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLENBTEQsRUFNQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLENBTkQsRUFPQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLENBUEQsRUFRQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLENBUkQsRUFTQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLENBVEQsRUFVQyxDQUFDLENBQUQsRUFBSSxDQUFK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R0FBR1osZ0RBQU0sQ0FBQyxlQUFELENBQXZCO0FBQ0F6Qyw0REFBQSxDQUF1Qk8sUUFBUSxDQUFDYyxhQUFULENBQXVCLGdCQUF2QixDQUF2QixFQUFpRWdDLFFBQVEsQ0FBQ1gsU0FBMUU7QUFDQVcsUUFBUSxDQUFDWCxTQUFULENBQW1CMUIsU0FBbkIsQ0FBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvRE9NSGFuZGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRE9NSGFuZGxlciA9ICgoKSA9Plxue1xuXHRjb25zdCBjcmVhdGVCb2FyZCA9IChkb21Cb2FyZCwgYm9hcmQpID0+XG5cdHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG5cdFx0e1xuXHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBncmlkRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdGdyaWRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1lbGVtZW50XCIpO1xuXHRcdFx0XHRncmlkRWxlbWVudC5kYXRhc2V0LmNvb3JkcyA9IGAoJHtqfSwgJHtpfSlgO1xuXHRcdFx0XHRkb21Cb2FyZC5hcHBlbmRDaGlsZChncmlkRWxlbWVudCk7XG5cblx0XHRcdFx0Z3JpZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGJvYXJkLnJlY2VpdmVBdHRhY2soaiwgaSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRjb25zdCBwbGFjZVNoaXAgPSAoeCwgeSwgZG9tQm9hcmQsIHZpc2libGUgPSBmYWxzZSkgPT5cblx0e1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBkb21Cb2FyZC5xdWVyeVNlbGVjdG9yKGAuYm9hcmQtZWxlbWVudFtkYXRhLWNvb3Jkcz1cIigke3h9LCAke3l9KVwiXWApO1xuXHRcdGlmICh2aXNpYmxlKSBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XG5cdH07XG5cblx0Y29uc3QgbWlzc1Nob3QgPSAoeCwgeSwgZG9tQm9hcmQpID0+IFxuXHRcdGRvbUJvYXJkLnF1ZXJ5U2VsZWN0b3IoYC5ib2FyZC1lbGVtZW50W2RhdGEtY29vcmRzPVwiKCR7eH0sICR7eX0pXCJdYCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ5ZWxsb3dcIjtcblxuXHRjb25zdCBoaXRTaG90ID0gKHgsIHksIGRvbUJvYXJkKSA9PlxuXHRcdGRvbUJvYXJkLnF1ZXJ5U2VsZWN0b3IoYC5ib2FyZC1lbGVtZW50W2RhdGEtY29vcmRzPVwiKCR7eH0sICR7eX0pXCJdYCkuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcblxuXHRyZXR1cm4geyBjcmVhdGVCb2FyZCwgcGxhY2VTaGlwLCBtaXNzU2hvdCwgaGl0U2hvdCB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRE9NSGFuZGxlcjtcbiIsImltcG9ydCBET01IYW5kbGVyIGZyb20gXCIuL0RPTUhhbmRsZXIuanNcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL1NoaXAuanNcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKGRvbUJvYXJkKSA9Plxue1xuXHRsZXQgYm9hcmQgPVxuXHRbXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRdO1xuXG5cdGNvbnN0IG1pc3NlZFNob3RzID0gW107XG5cdGNvbnN0IHNoaXBzID0gW107XG5cblx0Y29uc3QgcGxhY2VTaGlwID0gKHhDb29yZCwgeUNvb3JkLCBsZW5ndGgsIHZpc2libGUpID0+XG5cdHtcblx0XHRpZiAoKHhDb29yZCArIGxlbmd0aCkgPiAxMCkgcmV0dXJuIFwiT3V0IG9mIHJhbmdlXCI7XG5cdFx0Y29uc3Qgc2hpcCA9IFNoaXAobGVuZ3RoKTtcblx0XHRzaGlwcy5wdXNoKHNoaXApO1xuXG5cdFx0bGV0IGogPSAwO1xuXHRcdGZvciAobGV0IGkgPSB4Q29vcmQ7IGkgPCBsZW5ndGggKyB4Q29vcmQ7IGkrKylcblx0XHR7XG5cdFx0XHRzZXRHcmlkKGksIHlDb29yZCwgW3NoaXAsIGpdKTtcblx0XHRcdERPTUhhbmRsZXIucGxhY2VTaGlwKGksIHlDb29yZCwgZG9tQm9hcmQsIHZpc2libGUpO1xuXHRcdFx0aisrO1xuXHRcdH1cblx0fTtcblxuXHRjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+XG5cdHtcblx0XHRpZiAodHlwZW9mKGdldEdyaWQoeCwgeSkpICE9PSBcIm51bWJlclwiKSByZXR1cm4gaGl0U2hvdCh4LCB5KTtcblx0XHRlbHNlIGlmIChnZXRHcmlkKHgsIHkpID09PSAxKSByZXR1cm4gXCJZb3UgYWxyZWFkeSB0cmllZCB0byBoaXQgdGhpcyBvbmVcIjtcblx0XHRlbHNlIHJldHVybiBtaXNzU2hvdCh4LCB5KTtcblx0fTtcblxuXHRjb25zdCBoaXRTaG90ID0gKHgsIHkpID0+XG5cdHtcblx0XHRnZXRHcmlkKHgsIHkpWzBdLmhpdChnZXRHcmlkKHgsIHkpWzFdKTtcblx0XHRET01IYW5kbGVyLmhpdFNob3QoeCwgeSwgZG9tQm9hcmQpO1xuXHR9O1xuXG5cdGNvbnN0IG1pc3NTaG90ID0gKHgsIHkpID0+XG5cdHtcblx0XHRtaXNzZWRTaG90cy5wdXNoKFt4LCB5XSk7XG5cdFx0c2V0R3JpZCh4LCB5LCAxKTtcblx0XHRET01IYW5kbGVyLm1pc3NTaG90KHgsIHksIGRvbUJvYXJkKTtcblx0XHRyZXR1cm4gXCJNaXNzIVwiO1xuXHR9O1xuXG5cdGNvbnN0IGRpZFNoaXBzU2luayA9ICgpID0+XG5cdHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmICghc2hpcHNbaV0uaGFzU3VuaygpKSByZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cdGNvbnN0IHNldEdyaWQgPSAoeCwgeSwgdmFsdWUpID0+IGJvYXJkW3ldW3hdID0gdmFsdWU7XG5cdGNvbnN0IGdldEdyaWQgPSAoeCwgeSkgPT4gYm9hcmRbeV1beF07XG5cblx0cmV0dXJuIHsgcGxhY2VTaGlwLCBib2FyZCwgZ2V0R3JpZCwgcmVjZWl2ZUF0dGFjaywgbWlzc2VkU2hvdHMsIGRpZFNoaXBzU2luayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9HYW1lYm9hcmQuanNcIjtcblxuY29uc3QgUGxheWVyID0gKGJvYXJkKSA9Plxue1xuXHRjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9YCkpO1xuXHRjb25zdCByYW5kb21QbGF5ID0gKHBsYXllciwgZ2V0UmFuZG9tQ29vcmQpID0+XHRcblx0e1xuXHRcdGNvbnN0IHBsYXllckdhbWVib2FyZCA9IHBsYXllci5nYW1lYm9hcmQ7XG5cdFx0Y29uc3QgcGxheSA9ICgpID0+XG5cdFx0e1xuXHRcdFx0Y29uc3QgeCA9IGdldFJhbmRvbUNvb3JkKCk7XG5cdFx0XHRjb25zdCB5ID0gZ2V0UmFuZG9tQ29vcmQoKTtcblxuXHRcdFx0aWYgKHBsYXllckdhbWVib2FyZC5nZXRHcmlkKHgsIHkpID09PSAxKSByZXR1cm4gcGxheSgpO1xuXHRcdFx0cmV0dXJuIHBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuXHRcdH07XG5cdFx0cmV0dXJuIHBsYXkoKTtcblx0fTtcblxuXHRjb25zdCBnZXRSYW5kb21Db29yZCA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuXHRyZXR1cm4geyBnYW1lYm9hcmQsIHJhbmRvbVBsYXksIGdldFJhbmRvbUNvb3JkIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCkgPT5cbntcblx0Y29uc3QgaW5mbyA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuXHR7XG5cdFx0aW5mby5wdXNoKDApO1xuXHR9XG5cblx0Y29uc3QgaGl0ID0gbnVtYmVyID0+XG5cdHtcblx0XHRpbmZvW251bWJlcl0gPSAxO1xuXHRcdHJldHVybiBgU2hpcCBoYXMgYmVlbiBoaXQgYXQgJHtudW1iZXJ9YDtcblx0fTtcblxuXHRjb25zdCBoYXNTdW5rID0gKCkgPT5cblx0e1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaW5mby5sZW5ndGg7IGkrKylcblx0XHR7XG5cdFx0XHRpZiAoaW5mb1tpXSA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXHRyZXR1cm4geyBsZW5ndGgsIGluZm8sIGhpdCwgaGFzU3VuayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IERPTUhhbmRsZXIgZnJvbSBcIi4vRE9NSGFuZGxlclwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIjtcblxuY29uc3QgcGxheWVyID0gUGxheWVyKFwicGxheWVyYm9hcmRcIik7XG5ET01IYW5kbGVyLmNyZWF0ZUJvYXJkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyYm9hcmRcIiksIHBsYXllci5nYW1lYm9hcmQpO1xucGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoMCwgMCwgNCwgdHJ1ZSk7XG5wbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCgwLCA1LCAyLCB0cnVlKTtcbnBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKDYsIDIsIDMsIHRydWUpO1xucGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoOSwgOSwgMSwgdHJ1ZSk7XG5cblxuY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoXCJjb21wdXRlcmJvYXJkXCIpO1xuRE9NSGFuZGxlci5jcmVhdGVCb2FyZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXB1dGVyYm9hcmRcIiksIGNvbXB1dGVyLmdhbWVib2FyZCk7XG5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwKDAsIDAsIDQpO1xuXG5cbiJdLCJuYW1lcyI6WyJET01IYW5kbGVyIiwiY3JlYXRlQm9hcmQiLCJkb21Cb2FyZCIsImJvYXJkIiwiaSIsImoiLCJncmlkRWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImRhdGFzZXQiLCJjb29yZHMiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWNlaXZlQXR0YWNrIiwicGxhY2VTaGlwIiwieCIsInkiLCJ2aXNpYmxlIiwiZWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsIm1pc3NTaG90IiwiaGl0U2hvdCIsIlNoaXAiLCJHYW1lYm9hcmQiLCJtaXNzZWRTaG90cyIsInNoaXBzIiwieENvb3JkIiwieUNvb3JkIiwibGVuZ3RoIiwic2hpcCIsInB1c2giLCJzZXRHcmlkIiwiZ2V0R3JpZCIsImhpdCIsImRpZFNoaXBzU2luayIsImhhc1N1bmsiLCJ2YWx1ZSIsIlBsYXllciIsImdhbWVib2FyZCIsInJhbmRvbVBsYXkiLCJwbGF5ZXIiLCJnZXRSYW5kb21Db29yZCIsInBsYXllckdhbWVib2FyZCIsInBsYXkiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJpbmZvIiwibnVtYmVyIiwiY29tcHV0ZXIiXSwic291cmNlUm9vdCI6IiJ9