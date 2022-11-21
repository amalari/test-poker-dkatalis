"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../src/constants");
const models_1 = require("../../src/models");
const player_hand_1 = require("../../src/services/player-hand");
describe('test functional of class StraightFlush', () => {
    it('shoud return a Royal Flush', () => {
        const playerHand = new player_hand_1.StraightFlush([
            new models_1.Card(`Queen ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`10 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Jack ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`King ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Clubs}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe('Royal Flush');
    });
    it('shoud return true cause first result greater than second result', () => {
        const playerHand = new player_hand_1.StraightFlush([
            new models_1.Card(`Queen ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`10 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Jack ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`King ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Clubs}`),
        ]);
        const result = playerHand.solve();
        const comparePlayerHand = new player_hand_1.StraightFlush([
            new models_1.Card(`Queen ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`10 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`Jack ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`King ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`9 ${constants_1.SUITS.Diamonds}`),
        ]);
        const compareResult = comparePlayerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.greaterThan(compareResult)).toBe(true);
    });
    it('shoud return false cause first result less than second result', () => {
        const playerHand = new player_hand_1.StraightFlush([
            new models_1.Card(`Queen ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`10 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Jack ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`King ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`9 ${constants_1.SUITS.Clubs}`),
        ]);
        const result = playerHand.solve();
        const comparePlayerHand = new player_hand_1.StraightFlush([
            new models_1.Card(`Queen ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`10 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`Jack ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`King ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Diamonds}`),
        ]);
        const compareResult = comparePlayerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.greaterThan(compareResult)).toBe(false);
    });
    it('shoud return a Straight Flush', () => {
        const playerHand = new player_hand_1.StraightFlush([
            new models_1.Card(`5 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`6 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`7 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`8 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`9 ${constants_1.SUITS.Diamonds}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe(constants_1.PLAYER_RANK.StraightFlush);
    });
    it('shoud return a Straight Flush low with Ace', () => {
        const playerHand = new player_hand_1.StraightFlush([
            new models_1.Card(`Ace ${constants_1.SUITS.Spades}`),
            new models_1.Card(`2 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`3 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`4 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`5 ${constants_1.SUITS.Spades}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe(constants_1.PLAYER_RANK.StraightFlush);
    });
    it('Straight only', () => {
        const cards = [
            new models_1.Card(`Ace ${constants_1.SUITS.Spades}`),
            new models_1.Card(`2 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`3 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`4 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`5 ${constants_1.SUITS.Spades}`),
        ];
        const playerHand = new player_hand_1.StraightFlush(cards);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe(constants_1.PLAYER_RANK.Straight);
    });
    it('Flush only', () => {
        const cards = [
            new models_1.Card(`Ace ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`2 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`3 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`4 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`6 ${constants_1.SUITS.Hearts}`),
        ];
        const playerHand = new player_hand_1.StraightFlush(cards);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe(constants_1.PLAYER_RANK.Flush);
    });
});
