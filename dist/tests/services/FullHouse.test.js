"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../src/constants");
const models_1 = require("../../src/models");
const player_hand_1 = require("../../src/services/player-hand");
describe('test functional of class FullHouse', () => {
    it('should return instance of Full House', () => {
        const playerHand = new player_hand_1.FullHouse([
            new models_1.Card(`4 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`4 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`4 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`6 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe(constants_1.PLAYER_RANK.FullHouse);
    });
    it('should return Full House after Three of a Kind checking step', () => {
        const cards = [
            new models_1.Card(`Ace ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Spades}`),
            new models_1.Card(`2 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`2 ${constants_1.SUITS.Hearts}`),
        ];
        const threeOfAKind = new player_hand_1.ThreeOfAKind(cards).check();
        const playerHand = new player_hand_1.FullHouse(threeOfAKind.restCards);
        const result = playerHand.solve(threeOfAKind);
        expect(result === null || result === void 0 ? void 0 : result.name).toBe(constants_1.PLAYER_RANK.FullHouse);
    });
    it('should return instance of Three of a Kind', () => {
        const playerHand = new player_hand_1.FullHouse([
            new models_1.Card(`4 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`4 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`4 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`8 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe(constants_1.PLAYER_RANK.ThreeOfAKind);
    });
    it('shoud return true cause first result greater than second result', () => {
        const playerHand = new player_hand_1.FullHouse([
            new models_1.Card(`4 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`4 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`4 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`6 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
        ]);
        const result = playerHand.solve();
        const comparePlayerHand = new player_hand_1.FullHouse([
            new models_1.Card(`3 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`3 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`3 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`6 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
        ]);
        const compareResult = comparePlayerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.greaterThan(compareResult)).toBe(true);
    });
    it('shoud return false cause first result less than second result', () => {
        const playerHand = new player_hand_1.FullHouse([
            new models_1.Card(`4 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`4 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`4 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`6 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
        ]);
        const result = playerHand.solve();
        const comparePlayerHand = new player_hand_1.FullHouse([
            new models_1.Card(`5 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`5 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`5 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`6 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
        ]);
        const compareResult = comparePlayerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.greaterThan(compareResult)).toBe(false);
    });
    it('return null cause does not match Full House', () => {
        const playerHand = new player_hand_1.FullHouse([
            new models_1.Card(`2 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`10 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`4 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`9 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
        ]);
        const result = playerHand.solve();
        expect(result).toBe(null);
    });
});
