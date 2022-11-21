"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnePair = void 0;
const constants_1 = require("../../constants");
const PlayerHand_1 = require("./PlayerHand");
class OnePair extends PlayerHand_1.PlayerHand {
    constructor(cards) {
        const name = constants_1.PLAYER_RANK.OnePair;
        super(cards, name);
        this.rank = '';
        this.suit = '';
        this.restCards = cards;
    }
    greaterThan(data) {
        return PlayerHand_1.PlayerHand.greaterThan(this, data);
    }
    check() {
        let result = false;
        const pairIndexs = [];
        const cardRanks = this.cards.map((card) => card.rank);
        for (let i = 0; i < cardRanks.length; i++) {
            const duplicateCardRanks = [...cardRanks];
            duplicateCardRanks[i] = 'null';
            const foundDuplicateRankIndex = duplicateCardRanks.indexOf(cardRanks[i]);
            if (foundDuplicateRankIndex > -1) {
                pairIndexs.push(i);
                pairIndexs.push(foundDuplicateRankIndex);
                this.rank = cardRanks[i];
                this.suit = constants_1.RANK_SUITS.indexOf(this.cards[i].suit) > constants_1.RANK_SUITS.indexOf(this.cards[foundDuplicateRankIndex].suit)
                    ? this.cards[i].suit : this.cards[foundDuplicateRankIndex].suit;
                i = cardRanks.length;
                result = true;
                this.restCards = this.cards.filter((card, index) => !pairIndexs.includes(index));
            }
        }
        return result ? this : null;
    }
    solve() {
        return this.check();
    }
}
exports.OnePair = OnePair;
