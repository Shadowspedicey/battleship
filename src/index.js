import DOMHandler from "./DOMHandler";
import Player from "./Player";

const player = Player("playerboard");
DOMHandler.createBoard(document.querySelector("#playerboard"), player.gameboard);
player.gameboard.placeShip(0, 0, 4, true);
player.gameboard.placeShip(0, 5, 2, true);
player.gameboard.placeShip(6, 2, 3, true);
player.gameboard.placeShip(9, 9, 1, true);


const computer = Player("computerboard");
DOMHandler.createBoard(document.querySelector("#computerboard"), computer.gameboard);
computer.gameboard.placeShip(0, 0, 4);


