"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeOfAKind = void 0;
const constants_1 = require("../../constants");
const PlayerHand_1 = require("./PlayerHand");
class ThreeOfAKind extends PlayerHand_1.PlayerHand {
    constructor(cards) {
        const name = constants_1.PLAYER_RANK.ThreeOfAKind;
        super(cards, name);
        this.rank = '';
        this.suit = '';
        this.cardValueMappers = {};
        this.restCards = cards;
    }
    greaterThan(data) {
        return PlayerHand_1.PlayerHand.greaterThan(this, data);
    }
    check() {
        let result = false;
        const cardValueMappers = {};
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            if (cardValueMappers[card.rank]) {
                cardValueMappers[card.rank] += 1;
                if (cardValueMappers[card.rank] === 3) {
                    this.rank = card.rank;
                    this.suit = card.suit;
                    let duplicateRankCounter = 0;
                    this.restCards = this.cards.filter((restCard) => {
                        if (restCard.rank === card.rank)
                            duplicateRankCounter++;
                        return restCard.rank !== card.rank || duplicateRankCounter > 3;
                    });
                    result = true;
                }
            }
            else {
                cardValueMappers[card.rank] = 1;
            }
        }
        this.cardValueMappers = cardValueMappers;
        return result ? this : null;
    }
    isFourKind() {
        let highestKindCount = 0;
        for (const key in this.cardValueMappers) {
            highestKindCount = highestKindCount > this.cardValueMappers[key]
                ? highestKindCount : this.cardValueMappers[key];
        }
        return highestKindCount === 4;
    }
    solve() {
        return this.check();
    }
}
exports.ThreeOfAKind = ThreeOfAKind;
