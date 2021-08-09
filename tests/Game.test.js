/**
 * @jest-environment jsdom
 */

import { test, expect, beforeEach } from "@jest/globals";
import Game from "../src/Game.js";
import Player from "../src/Player.js";

beforeEach(() => Game.clearPlayers());

test("Registers Players", () =>
{
	Player();
	Player();
	expect(Game.players.length).toBe(2);
});

test("Knows when 1 player lost", () =>
{
	const player = Player(null, "Player");
	const computer = Player();
	computer.gameboard.placeShip(0, 0, 1);
	player.gameboard.placeShip(0, 0, 1);
	expect(Game.didPlayersSink()).toBe(false);

	player.gameboard.receiveAttack(0, 0);

	expect(Game.didPlayersSink()).toBe(player);
	expect(Game.didPlayersSink().name).toBe("Player");
});
