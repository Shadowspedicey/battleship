import { expect, test, beforeEach } from "@jest/globals";
import Ship from "../src/Ship.js";

let ship;
beforeEach(() => ship = Ship(5));

test("Create ship with specified length 5", () => expect(ship.length).toBe(5));

test("Ship can take damage", () => expect(ship.hit(2)).toBe("Ship has been hit at 2"));

test("Ship has correct info on creation", () => expect(ship.info).toEqual([0,0,0,0,0]));

test("Ship updates info when hit", () =>
{
	ship.hit(0);
	expect(ship.info).toEqual([1,0,0,0,0]);
});

test("Ship knows when it sank", () =>
{
	for (let i = 0; i < 5; i++)
	{
		ship.hit(i);
	}
	expect(ship.hasSunk()).toBe(true);
});

test("Ship knows when it didn't sink", () =>
{
	for (let i = 0; i < 3; i++)
	{
		ship.hit(i);
	}
	expect(ship.hasSunk()).toBe(false);
});
