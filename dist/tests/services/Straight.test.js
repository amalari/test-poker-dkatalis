"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../src/constants");
const models_1 = require("../../src/models");
const player_hand_1 = require("../../src/services/player-hand");
describe('test functional of class Straight', () => {
    it('shoud return a Straight', () => {
        const playerHand = new player_hand_1.Straight([
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`7 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`8 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`9 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`10 ${constants_1.SUITS.Spades}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe(constants_1.PLAYER_RANK.Straight);
    });
    it('shoud return true cause first result greater than second result', () => {
        const playerHand = new player_hand_1.Straight([
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`7 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`8 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`9 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`10 ${constants_1.SUITS.Spades}`),
        ]);
        const result = playerHand.solve();
        console.log({ result });
        const comparePlayerHand = new player_hand_1.Straight([
            new models_1.Card(`5 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`7 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`8 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`9 ${constants_1.SUITS.Spades}`),
        ]);
        const compareResult = comparePlayerHand.solve();
        console.log(compareResult === null || compareResult === void 0 ? void 0 : compareResult.rank);
        expect(result === null || result === void 0 ? void 0 : result.greaterThan(compareResult)).toBe(true);
    });
    it('shoud return false cause first result less than second result', () => {
        const playerHand = new player_hand_1.Straight([
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`7 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`8 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`9 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`10 ${constants_1.SUITS.Spades}`),
        ]);
        const result = playerHand.solve();
        const comparePlayerHand = new player_hand_1.Straight([
            new models_1.Card(`10 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`7 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`8 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`9 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Jack ${constants_1.SUITS.Spades}`),
        ]);
        const compareResult = comparePlayerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.greaterThan(compareResult)).toBe(false);
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
