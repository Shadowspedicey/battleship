import Gameboard from "./Gameboard.js";
import Game from "./Game.js";
import "regenerator-runtime/runtime";

const Player = (board, name) =>
{
	let obj;

	const gameboard = Gameboard(document.querySelector(`#${board}`));

	const randomPlay = (player, getRandomCoord) =>	
	{
		const playerGameboard = player.gameboard;
		const play = async () =>
		{
			// eslint-disable-next-line no-unused-vars
			const temp = await new Promise(resolve => setTimeout(resolve, 500));
			
			const x = getRandomCoord();
			const y = getRandomCoord();

			if (playerGameboard.getGrid(x, y) === 1) return play();

			const attack = playerGameboard.receiveAttack(x, y);
			return Promise.resolve(attack);
		};
		return play();
	};

	const getRandomCoord = () => Math.floor(Math.random() * 10);

	obj = { gameboard, randomPlay, getRandomCoord, name };

	Game.players.push(obj);
	
	return obj;
};

export default Player;
