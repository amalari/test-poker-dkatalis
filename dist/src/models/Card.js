"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const constants_1 = require("../constants");
class Card {
    constructor(stringCard) {
        const arrStringCard = stringCard.split(' ');
        this.rank = arrStringCard[0];
        this.suit = arrStringCard[1];
        this.value = this.rank === 'Ace' ? [0, constants_1.RANKS.indexOf(this.rank)] : constants_1.RANKS.indexOf(this.rank);
    }
    toString() {
        return `${this.rank} ${this.suit}`;
    }
}
exports.Card = Card;
