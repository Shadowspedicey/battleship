const Game = (() =>
{
	let players = [];

	let _playerTurn = true;
	let gameOver = false;

	const didPlayersSink = () =>
	{
		for (let i = 0; i < players.length; i++)
		{
			if (players[i].gameboard.didShipsSink()) return players[i];
		}
		return false;
	};

	const clearPlayers = () => players.length = 0;

	const switchTurnsDOM = (test) =>
	{
		if (test) return;
		document.querySelector("#computerboard").classList.toggle("not-turn");
		document.querySelector("#playerboard").classList.toggle("not-turn");
	};

	const computerTurn = () =>
	{
		const computer = players.find(player => player.name === "Computer");
		computer.randomPlay(players.find(player => player.name === "Player"), computer.getRandomCoord)
			.then(() => 
			{
				switchTurnsDOM();
				isGameOver(alert);
			});
	};
	
	const playerTurn = (test) => switchTurnsDOM(test);
	
	const isGameOver = (alert) =>
	{
		if (didPlayersSink()) 
		{
			setTimeout(() => alert("s"), 0);
			gameOver = true;
		}
	};

	const changeTurns = () => _playerTurn = !_playerTurn;
	
	const playRound = (test) =>
	{
		if (gameOver) return;
		_playerTurn ? playerTurn(test) : computerTurn();
		changeTurns();
		isGameOver(alert);
		if (_playerTurn === false) return playRound();
		return _playerTurn;
	};

	return { players, didPlayersSink, clearPlayers, playRound };
})();

export default Game;
