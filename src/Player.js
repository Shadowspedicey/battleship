import Gameboard from "./Gameboard";

const Player = () =>
{
	const gameboard = Gameboard();

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

	return { gameboard, randomPlay, getRandomCoord };
};

export default Player;
