"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighCard = void 0;
const constants_1 = require("../../constants");
const PlayerHand_1 = require("./PlayerHand");
class HighCard extends PlayerHand_1.PlayerHand {
    constructor(cards) {
        const name = constants_1.PLAYER_RANK.HighCard;
        super(cards, name);
        this.rank = '';
        this.suit = '';
        this.restCards = cards;
    }
    solve() {
        const sortedCards = this.cards
            .sort((cardA, cardB) => {
            const cardAValue = Array.isArray(cardA.value) ? cardA.value[1] : cardA.value;
            const cardBValue = Array.isArray(cardB.value) ? cardB.value[1] : cardB.value;
            return cardAValue - cardBValue;
        });
        this.rank = sortedCards[sortedCards.length - 1].rank;
        this.suit = sortedCards[sortedCards.length - 1].suit;
        return this;
    }
}
exports.HighCard = HighCard;
