import "regenerator-runtime/runtime";
import DOMHandler from "./DOMHandler";
import Player from "./Player";

DOMHandler.menuStartGame()
	.then(() =>
	{
		const player = Player("playerboard", "Player");
		DOMHandler.createBoard(document.querySelector("#playerboard"), player.gameboard, true);

		const computer = Player("computerboard", "Computer");
		DOMHandler.createBoard(document.querySelector("#computerboard"), computer.gameboard);
		computer.gameboard.fillComputerBoard();
	});
