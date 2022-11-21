"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../src/constants");
const models_1 = require("../../src/models");
const player_hand_1 = require("../../src/services/player-hand");
describe('test functional of class Flush', () => {
    it('shoud return a Flush', () => {
        const playerHand = new player_hand_1.Flush([
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`10 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Jack ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`King ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Clubs}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe(constants_1.PLAYER_RANK.Flush);
    });
    it('shoud return null does not matched any suit flush', () => {
        const playerHand = new player_hand_1.Flush([
            new models_1.Card(`5 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`6 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`10 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`8 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`9 ${constants_1.SUITS.Diamonds}`),
        ]);
        const result = playerHand.solve();
        expect(result).toBe(null);
    });
});
