import { RANKS } from "../constants";

export class Card {
    rank: string
    suit: string
    value: number | number[]
    constructor(stringCard: string) {
        const arrStringCard: string[] = stringCard.split(' ')
        this.rank = arrStringCard[0];
        this.suit = arrStringCard[1];
        this.value = this.rank === 'Ace' ? [0, RANKS.indexOf(this.rank)] : RANKS.indexOf(this.rank);
    }
}