import { PLAYER_RANK } from "../../constants";
import { Card } from "../../models";
import { PlayerHand, IPlayerHandExt } from "./PlayerHand";

export class HighCard extends PlayerHand implements IPlayerHandExt {
    public rank = ''
    public suit = ''
    public restCards: Card[]

    constructor(cards: Card[]) {
        const name = PLAYER_RANK.HighCard
        super(cards, name);
        this.restCards = cards
    }

    public greaterThan(data: IPlayerHandExt): boolean{
        return PlayerHand.greaterThan(this as IPlayerHandExt, data)
    }

    public solve() : IPlayerHandExt | null {
        const sortedCards = this.cards
            .sort((cardA, cardB) => {
                const cardAValue = Array.isArray(cardA.value) ? cardA.value[1] : cardA.value
                const cardBValue = Array.isArray(cardB.value) ? cardB.value[1] : cardB.value
                return cardAValue - cardBValue
            })
        
        this.rank = sortedCards[sortedCards.length - 1].rank
        this.suit = sortedCards[sortedCards.length - 1].suit
        return this
    }
}