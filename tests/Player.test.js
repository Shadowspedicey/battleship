/**
 * @jest-environment jsdom
 */
/* eslint-disable no-unused-vars */

import { test, expect, beforeEach, jest } from "@jest/globals";
import Player from "../src/Player.js";
import "regenerator-runtime/runtime";

let computer;
let player;
let temp;
let fakeGetRandomCoord;
let fakePlayerTurn;
beforeEach(() => 
{
	computer = Player();
	player = Player();
	fakeGetRandomCoord = jest.fn().mockReturnValueOnce(5).mockReturnValueOnce(5)
		.mockReturnValueOnce(6).mockReturnValueOnce(6);
	fakePlayerTurn = jest.fn();
});

test("Each player has his own gameboard", () =>
{
	expect(player.gameboard).toBeTruthy();
	expect(computer.gameboard).toBeTruthy();
});

test("Computer can attack player in random places", async () =>
{
	temp = await computer.randomPlay(player, fakeGetRandomCoord, fakePlayerTurn);
	expect(player.gameboard.getGrid(5, 5)).toBe(1);
});

test("Computer can't attack same place twice", async () =>
{
	temp = await computer.randomPlay(player, fakeGetRandomCoord, fakePlayerTurn);
	expect(player.gameboard.getGrid(5, 5)).toBe(1);
	temp = await computer.randomPlay(player, fakeGetRandomCoord, fakePlayerTurn);
	expect(player.gameboard.getGrid(6, 6)).toBe(1);
});

test("Computer can randomly hit ship", async () =>
{
	player.gameboard.placeShip(4, 5, 2);
	await expect(computer.randomPlay(player, fakeGetRandomCoord, fakePlayerTurn)).resolves.toBe("Ship has been hit at 1");
});
