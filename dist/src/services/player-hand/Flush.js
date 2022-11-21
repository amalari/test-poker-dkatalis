"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flush = void 0;
const constants_1 = require("../../constants");
const PlayerHand_1 = require("./PlayerHand");
class Flush extends PlayerHand_1.PlayerHand {
    constructor(cards) {
        const name = constants_1.PLAYER_RANK.Flush;
        super(cards, name);
        this.restCards = [];
        this.suit = '';
        this.rank = '';
        this.restCards = cards;
    }
    check() {
        let result = false;
        const suit = this.cards[0].suit;
        for (let j = 1; j < this.cards.length; j++) {
            let suitMacthed = true;
            if (this.cards[j].suit !== suit) {
                suitMacthed = false;
                j = this.cards.length;
            }
            if (suitMacthed && j === this.cards.length - 1) {
                this.suit = suit;
                const sortedCards = this.cards
                    .sort((cardA, cardB) => {
                    const cardAValue = Array.isArray(cardA.value) ? cardA.value[1] : cardA.value;
                    const cardBValue = Array.isArray(cardB.value) ? cardB.value[1] : cardB.value;
                    return cardAValue - cardBValue;
                });
                this.rank = sortedCards[sortedCards.length - 1].rank;
                result = true;
            }
        }
        return result ? this : null;
    }
    solve() {
        return this.check();
        // const checkingStepResults: (IPlayerHandExt | null)[] = []
        // checkingStepResults[0] = this.check()
        // return checkingStepResults
    }
}
exports.Flush = Flush;
