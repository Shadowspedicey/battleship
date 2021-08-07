import Gameboard from "./Gameboard.js";
import Game from "./Game.js";

const Player = (board) =>
{
	let obj;

	const gameboard = Gameboard(document.querySelector(`#${board}`));
	const randomPlay = (player, getRandomCoord) =>	
	{
		const playerGameboard = player.gameboard;
		const play = () =>
		{
			const x = getRandomCoord();
			const y = getRandomCoord();

			if (playerGameboard.getGrid(x, y) === 1) return play();
			return playerGameboard.receiveAttack(x, y);
		};
		return play();
	};

	const getRandomCoord = () => Math.floor(Math.random() * 10);

	obj = { gameboard, randomPlay, getRandomCoord };

	Game.players.push(obj);
	
	return obj;
};

export default Player;
