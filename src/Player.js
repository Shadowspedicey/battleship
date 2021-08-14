import Gameboard from "./Gameboard.js";
import Game from "./Game.js";
import "regenerator-runtime/runtime";

const Player = (board, name) =>
{
	let obj;

	let targets = [];
	let shots = [];

	const gameboard = Gameboard(document.querySelector(`#${board}`));

	const play = async (player, getRandomCoord) =>	
	{
		// eslint-disable-next-line no-unused-vars
		const temp = await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 500) + 500));

		if (targets.length !== 0) return targetMode(player);

		const playerGameboard = player.gameboard;
		const randomPlay = () =>
		{			
			const x = getRandomCoord();
			const y = getRandomCoord();

			if (playerGameboard.getGrid(x, y) === 1) return randomPlay();

			// Checks if parity applies to the random coords
			if ((y % 2 === 0 && x % 2 === 0) || (y % 2 === 1 && x % 2 === 1)) 
				return randomPlay();

			const attack = playerGameboard.receiveAttack(x, y);
			shots.push([x, y]);
			if (attack === true) loadTargets([x, y]);
			return Promise.resolve(attack);
		};
		return randomPlay();
	};

	const loadTargets = coords =>
	{
		if (coords[0] + 1 !== 10)
			if (searchForDuplicates([coords[0] + 1, coords[1]])) 
				targets.push([coords[0] + 1, coords[1]]);
		
		if (coords[0] - 1 !== -1)
			if (searchForDuplicates([coords[0] - 1, coords[1]]))
				targets.push([coords[0] - 1, coords[1]]);

		if (coords[1] - 1 !== -1)
			if (searchForDuplicates([coords[0], coords[1] - 1]))
				targets.push([coords[0], coords[1] - 1]);
		
		if (coords[1] + 1 !== 10)
			if (searchForDuplicates([coords[0], coords[1] + 1]))
				targets.push([coords[0], coords[1] + 1]);
	};

	const targetMode = player =>
	{
		const hit = player.gameboard.receiveAttack(targets[0][0], targets[0][1]);
		shots.push([targets[0][0], targets[0][1]]);

		if (hit === true) 
		{
			loadTargets([targets[0][0], targets[0][1]]);
		}
		targets.shift();
	};

	const searchForDuplicates = coords =>
	{
		for (let i = 0; i < targets.length; i++)
		{
			if (targets[i][0] === coords[0] && targets[i][1] === coords[1]) return false;
		}

		for (let i = 0; i < shots.length; i++)
		{
			if (shots[i][0] === coords[0] && shots[i][1] === coords[1]) return false;
		}

		return true;
	};

	const reset = () =>
	{
		shots.length = 0;
		targets.length = 0;
	};

	const getRandomCoord = () => Math.floor(Math.random() * 10);

	obj = { gameboard, play, getRandomCoord, name, targets, reset };

	Game.players.push(obj);
	
	return obj;
};

export default Player;
