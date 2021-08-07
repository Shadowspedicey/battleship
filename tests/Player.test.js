import { test, expect, beforeEach, jest } from "@jest/globals";
import Player from "../src/Player.js";

let computer;
let player;
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

test("Computer can attack player in random places", () =>
{
	computer.randomPlay(player, fakeGetRandomCoord);
	expect(player.gameboard.getGrid(5, 5)).toBe(1);
});

test("Computer can't attack same place twice", () =>
{
	computer.randomPlay(player, fakeGetRandomCoord);
	expect(player.gameboard.getGrid(5, 5)).toBe(1);
	computer.randomPlay(player, fakeGetRandomCoord);
	expect(player.gameboard.getGrid(6, 6)).toBe(1);
});

test("Computer can randomly hit ship", () =>
{
	player.gameboard.placeShip(4, 5, 2);
	expect(computer.randomPlay(player, fakeGetRandomCoord)).toBe("Ship has been hit at 1");
});
