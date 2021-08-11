/**
 * @jest-environment jsdom
 */
/* eslint-disable no-unused-vars */

import { test, expect, beforeEach, jest, describe } from "@jest/globals";
import Player from "../src/Player.js";
import "regenerator-runtime/runtime";

let computer;
let player;
let temp;
let fakeGetRandomCoord;
beforeEach(() => 
{
	computer = Player();
	player = Player();
	fakeGetRandomCoord = jest.fn().mockReturnValueOnce(5).mockReturnValueOnce(5)
		.mockReturnValueOnce(6).mockReturnValueOnce(6);
});

test("Each player has his own gameboard", () =>
{
	expect(player.gameboard).toBeTruthy();
	expect(computer.gameboard).toBeTruthy();
});

test("Computer can attack player in random places", async () =>
{
	temp = await computer.play(player, fakeGetRandomCoord);
	expect(player.gameboard.getGrid(5, 5)).toBe(1);
});

test("Computer can't attack same place twice", async () =>
{
	temp = await computer.play(player, fakeGetRandomCoord);
	expect(player.gameboard.getGrid(5, 5)).toBe(1);
	temp = await computer.play(player, fakeGetRandomCoord);
	expect(player.gameboard.getGrid(6, 6)).toBe(1);
});

test("Computer can randomly hit ship", async () =>
{
	player.gameboard.placeShip(4, 5, 2);
	await expect(computer.play(player, fakeGetRandomCoord)).resolves.toBe(true);
});

describe("Target mode tests", () =>
{
	test("Computer goes in target mode if hit", async () =>
	{
		player.gameboard.placeShip(4, 5, 2);
		await computer.play(player, fakeGetRandomCoord);
		expect(computer.targets).toEqual([[6, 5], [4, 5], [5, 4], [5, 6]]);
	});

	test("Target mode works", async () =>
	{
		player.gameboard.placeShip(4, 5, 2);
		await computer.play(player, fakeGetRandomCoord);
		await computer.play(player, fakeGetRandomCoord);
		expect(player.gameboard.getGrid(6, 5)).toBe(1);
		expect(computer.targets).toEqual([[4, 5], [5, 4], [5, 6]]);
		await computer.play(player, fakeGetRandomCoord);
		expect(player.gameboard.getGrid(4, 5)).toBe(1);
	});

	test.only("Target mode adds to target after hit", async () =>
	{
		player.gameboard.placeShip(4, 5, 4);
		await computer.play(player, fakeGetRandomCoord);
		await computer.play(player, fakeGetRandomCoord);
		expect(computer.targets).toEqual([[4, 5], [5, 4,], [5, 6,], [7, 5,], [6, 4], [6, 6]]);
		await computer.play(player, fakeGetRandomCoord);
		expect(computer.targets).toEqual([[5, 4], [5, 6], [7, 5], [6, 4], [6, 6], [3, 5], [4, 4], [4, 6]]);
	});
});
