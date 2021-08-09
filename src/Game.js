const Game = (() =>
{
	let players = [];

	const didPlayersSink = () =>
	{
		for (let i = 0; i < players.length; i++)
		{
			if (players[i].gameboard.didShipsSink()) return players[i];
		}
		return false;
	};

	const clearPlayers = () => players.length = 0;

	const switchTurnsDOM = () =>
	{
		document.querySelector("#computerboard").classList.toggle("not-turn");
		document.querySelector("#playerboard").classList.toggle("not-turn");
	};

	const computerTurn = () =>
	{
		switchTurnsDOM();
		
		const computer = players.find(player => player.name === "Computer");
		computer.randomPlay(players.find(player => player.name === "Player"), computer.getRandomCoord);
	};

	const playerTurn = () => switchTurnsDOM();

	return { players, didPlayersSink, clearPlayers, computerTurn, playerTurn };
})();

export default Game;
