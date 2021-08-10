import DOMHandler from "./DOMHandler.js";
import Ship from "./Ship.js";

const Gameboard = (domBoard) =>
{
	let board =
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	];

	const missedShots = [];
	const ships = [];

	const placeShip = (xCoord, yCoord, length, visible) =>
	{
		if ((xCoord + length) > 10) return "Out of range";
		const ship = Ship(length);
		ships.push(ship);

		let j = 0;
		for (let i = xCoord; i < length + xCoord; i++)
		{
			setGrid(i, yCoord, [ship, j]);
			if (domBoard) DOMHandler.placeShip(i, yCoord, domBoard, visible);
			j++;
		}
	};

	const receiveAttack = (x, y) =>
	{
		if (typeof(getGrid(x, y)) !== "number") return hitShot(x, y);
		else if (getGrid(x, y) === 1) return "You already tried to hit this one";
		else return missShot(x, y);
	};

	const hitShot = (x, y) =>
	{
		if (domBoard) DOMHandler.hitShot(x, y, domBoard);
		return getGrid(x, y)[0].hit(getGrid(x, y)[1]);
	};

	const missShot = (x, y) =>
	{
		missedShots.push([x, y]);
		setGrid(x, y, 1);
		if (domBoard) DOMHandler.missShot(x, y, domBoard);
		return "Miss!";
	};

	const didShipsSink = () =>
	{
		for (let i = 0; i < ships.length; i++)
		{
			if (!ships[i].hasSunk()) return false;
		}
		return true;
	};

	const setGrid = (x, y, value) => board[y][x] = value;
	const getGrid = (x, y) => board[y][x];

	return { placeShip, board, getGrid, receiveAttack, missedShots, didShipsSink, domBoard };
};

export default Gameboard;
