"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../src/constants");
const models_1 = require("../../src/models");
const player_hand_1 = require("../../src/services/player-hand");
describe('Three of a Kind', () => {
    it('should return instance of Three of a Kind', () => {
        const playerHand = new player_hand_1.ThreeOfAKind([
            new models_1.Card(`4 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`4 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`4 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`7 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Clubs}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe('Three of a Kind');
    });
    it('shoud return null does not matched Three of A Kind', () => {
        const playerHand = new player_hand_1.ThreeOfAKind([
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
