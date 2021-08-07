import { expect, test, beforeEach } from "@jest/globals";
import Gameboard from "../src/Gameboard.js";

let gameboard;
beforeEach(() => gameboard = Gameboard());

test("Place ships with coords", () => 
{
	const length = 4;
	const x = 0;
	const y = 0;
	gameboard.placeShip(x, y, length);
	for (let i = x; i < length; i++)
	{
		expect(typeof(gameboard.getGrid(i, y))).toBe("object");
	}
});

test("Placing ships fails if out of range", () => expect(gameboard.placeShip(6, 0, 5)).toBe("Out of range"));

test("Can damage ship with coords", () =>
{
	gameboard.placeShip(0, 0, 2);
	expect(gameboard.receiveAttack(1, 0)).toBe("Ship has been hit at 1");
});

test("Knows when it was a miss", () =>
{
	gameboard.placeShip(0, 0, 1);
	expect(gameboard.receiveAttack(1, 0)).toBe("Miss!");
	expect(gameboard.missedShots[0]).toEqual([1, 0]);
	gameboard.receiveAttack(2, 0);
	expect(gameboard.missedShots[1]).toEqual([2, 0]);
});

test("Can't hit an already missed position again", () =>
{
	gameboard.placeShip(0, 0, 1);
	gameboard.receiveAttack(1, 0);
	expect(gameboard.receiveAttack(1, 0)).toBe("You already tried to hit this one");
});

test("Check if all ships sank", () =>
{
	gameboard.placeShip(0, 0, 1);
	gameboard.placeShip(0, 1, 1);
	gameboard.placeShip(0, 2, 1);
	gameboard.receiveAttack(0, 0);
	gameboard.receiveAttack(0, 1);
	gameboard.receiveAttack(0, 2);
	expect(gameboard.didShipsSink()).toBe(true);

	gameboard.placeShip(1, 0, 1);
	gameboard.receiveAttack(2, 0);
	expect(gameboard.didShipsSink()).toBe(false);
});
