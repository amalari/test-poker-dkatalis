"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../src/constants");
const models_1 = require("../../src/models");
const player_hand_1 = require("../../src/services/player-hand");
describe('Straight', () => {
    it('shoud return a Straight', () => {
        const playerHand = new player_hand_1.Straight([
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`7 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`8 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`9 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`10 ${constants_1.SUITS.Spades}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe('Straight');
    });
    it('shoud return null does not matched any straight', () => {
        const playerHand = new player_hand_1.Straight([
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
