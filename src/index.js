import "regenerator-runtime/runtime";
import DOMHandler from "./DOMHandler";
import Player from "./Player";

DOMHandler.menuStartGame()
	.then(() =>
	{
		const player = Player("playerboard", "Player");
		DOMHandler.createBoard(document.querySelector("#playerboard"), player.gameboard, true)
			.then(() =>
			{
				const computer = Player("computerboard", "Computer");
				DOMHandler.createBoard(document.querySelector("#computerboard"), computer.gameboard);
				for (let i = 1; i <= 5; i++)
				{
					computer.gameboard.placeShipRandomly(i, true, true);
				}
			});
	});

// const computer = Player("computerboard", "Computer");
// DOMHandler.createBoard(document.querySelector("#computerboard"), computer.gameboard);
// for (let i = 1; i <= 5; i++)
// {
// 	computer.gameboard.placeShipRandomly(i, false, true);
// }
