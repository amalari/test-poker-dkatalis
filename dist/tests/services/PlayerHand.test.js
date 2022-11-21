"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../src/constants");
const models_1 = require("../../src/models");
const player_hand_1 = require("../../src/services/player-hand");
describe('test functional of class PlayerHand', () => {
    it('shoud return a PlayerHand instance', () => {
        const playerHand = new player_hand_1.PlayerHand([
            new models_1.Card(`6 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`10 ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Jack ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`King ${constants_1.SUITS.Clubs}`),
            new models_1.Card(`Ace ${constants_1.SUITS.Clubs}`),
        ], constants_1.PLAYER_RANK.Flush);
        expect(playerHand === null || playerHand === void 0 ? void 0 : playerHand.name).toBe(constants_1.PLAYER_RANK.Flush);
        expect(playerHand === null || playerHand === void 0 ? void 0 : playerHand.check()).toBe(null);
    });
});
