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

	const ships = [];
	const missedShots = [];

	const placeShip = (xCoord, yCoord, length, vertical, visible) =>
	{
		if (!checkRange(xCoord, yCoord, length, vertical)) return "Out of range";
		const ship = Ship(length);
		ships.push(ship);

		let j = 0;
		if (!vertical)
		{
			for (let i = xCoord; i < length + xCoord; i++)
			{
				setGrid(i, yCoord, [ship, j]);
				if (domBoard) DOMHandler.placeShip(i, yCoord, domBoard, visible);
				j++;
			}
		} else
		{
			for (let i = yCoord; i < length + yCoord; i++)
			{
				setGrid(xCoord, i, [ship, j]);
				if (domBoard) DOMHandler.placeShip(xCoord, i, domBoard, visible);
				j++;
			}
		}
		return true;
	};

	const placeShipRandomly = (length, vertical, visibility) => 
	{
		const foo = () =>
		{
			if (placeShip(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), length, vertical, visibility) === "Out of range")
				foo();
		};
		foo();
	};

	const checkRange = (xCoord, yCoord, length, vertical) =>
	{
		if (!vertical)
		{
			if ((xCoord + length) > 10) return false;
			for (let i = xCoord; i < length; i++)
			{
				if (getGrid(i, yCoord) !== 0) return false;
			}
			return true;
		} else
		{
			if ((yCoord + length) > 10) return false;
			for (let i = yCoord; i < length; i++)
			{
				if (getGrid(xCoord, i) !== 0) return false;
			}
			return true;
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
		const _info = getGrid(x, y)[0].hit(getGrid(x, y)[1]);
		setGrid(x, y, 1);
		return _info;
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

	return { placeShip, placeShipRandomly, board, getGrid, receiveAttack, missedShots, didShipsSink, domBoard };
};

export default Gameboard;
