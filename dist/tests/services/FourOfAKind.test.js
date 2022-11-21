"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../src/constants");
const models_1 = require("../../src/models");
const player_hand_1 = require("../../src/services/player-hand");
describe('Four of a Kind', () => {
    it('should return instance of Four of a Kind', () => {
        const playerHand = new player_hand_1.FourOfAKind([
            new models_1.Card(`4 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`4 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`4 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`4 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Clubs}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe('Four of a Kind');
    });
    it('should return Four of A Kind with check Three of A Kind first', () => {
        const cards = [
            new models_1.Card(`Ace ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Spades}`),
            new models_1.Card(`2 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Hearts}`),
        ];
        const threeOfAKind = new player_hand_1.ThreeOfAKind(cards).check();
        const playerHand = new player_hand_1.FourOfAKind(threeOfAKind.restCards);
        const result = playerHand.solve(threeOfAKind);
        expect(result === null || result === void 0 ? void 0 : result.name).toBe('Four of a Kind');
    });
    it('should return instance of Four of a Kind with Ace rank', () => {
        const playerHand = new player_hand_1.FourOfAKind([
            new models_1.Card(`Ace ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Spades}`),
            new models_1.Card(`2 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Hearts}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe('Four of a Kind');
    });
    it('should return false check with three of a kind', () => {
        const playerHand = new player_hand_1.FourOfAKind([
            new models_1.Card(`Ace ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Spades}`),
            new models_1.Card(`5 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`6 ${constants_1.SUITS.Hearts}`),
        ]);
        const result = playerHand.solve();
        expect(result === null || result === void 0 ? void 0 : result.name).toBe('Three of a Kind');
    });
    it('should return null cause does not match three of four of a kind', () => {
        const playerHand = new player_hand_1.FourOfAKind([
            new models_1.Card(`2 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`7 ${constants_1.SUITS.Diamonds}`),
            new models_1.Card(`2 ${constants_1.SUITS.Spades}`),
            new models_1.Card(`5 ${constants_1.SUITS.Hearts}`),
            new models_1.Card(`6 ${constants_1.SUITS.Hearts}`),
        ]);
        const result = playerHand.solve();
        expect(result).toBe(null);
    });
});
