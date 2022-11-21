"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Straight = void 0;
const constants_1 = require("../../constants");
const PlayerHand_1 = require("./PlayerHand");
class Straight extends PlayerHand_1.PlayerHand {
    constructor(cards) {
        const name = constants_1.PLAYER_RANK.Straight;
        super(cards, name);
        this.rank = '';
        this.suit = '';
        this.restCards = cards;
    }
    greaterThan(data) {
        return PlayerHand_1.PlayerHand.greaterThan(this, data);
    }
    check() {
        let result = true;
        let aceCard = null;
        const sortedCards = this.cards
            .filter((card) => {
            if (card.rank === 'Ace') {
                aceCard = card;
                return false;
            }
            return true;
        })
            .sort((cardA, cardB) => {
            return cardA.value - cardB.value;
        });
        if (sortedCards.length < 4)
            return null;
        for (let i = 0; i < sortedCards.length - 1; i++) {
            const cardValue = sortedCards[i].value;
            const nextCardValue = sortedCards[i + 1].value;
            if (nextCardValue - cardValue > 1) {
                result = false;
                i = sortedCards.length;
            }
        }
        if (!result)
            return null;
        this.rank = sortedCards[sortedCards.length - 1].rank;
        this.suit = sortedCards[sortedCards.length - 1].suit;
        if (aceCard) {
            if (sortedCards[sortedCards.length - 1].value === 11) {
                this.rank = aceCard.rank;
                this.suit = aceCard.suit;
                result = true;
            }
        }
        return this;
    }
    solve() {
        return this.check();
    }
}
exports.Straight = Straight;
