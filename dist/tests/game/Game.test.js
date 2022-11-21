"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("../../src/services/game");
describe('test functional of class Game', () => {
    it('check card pool 52', () => {
        const game = new game_1.Game(5);
        expect(game.cardPool.length).toBe(52);
    });
    it('should return error with minimum 2 and maximum 10 player', () => {
        const game = new game_1.Game(1);
        expect(game.validate()).toBe(false);
        const game1 = new game_1.Game(11);
        expect(game1.validate()).toBe(false);
    });
});
