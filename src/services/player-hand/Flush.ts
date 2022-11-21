import { PLAYER_RANK } from "../../constants";
import { Card } from "../../models";
import { PlayerHand, IPlayerHandExt } from "./PlayerHand";

export class Flush extends PlayerHand implements IPlayerHandExt {
    public restCards: Card[] = []
    public suit = ''
    public rank = ''

    constructor(cards: Card[]) {
        const name = PLAYER_RANK.Flush
        super(cards, name);
        this.restCards = cards
    }

    public greaterThan(data: IPlayerHandExt): boolean{
        return PlayerHand.greaterThan(this as IPlayerHandExt, data)
    }

    public check(): IPlayerHandExt | null {
        let result = false
        const suit = this.cards[0].suit
        for (let j = 1; j < this.cards.length; j++) {
            let suitMacthed = true
            if(this.cards[j].suit !== suit) {
                suitMacthed = false
                j = this.cards.length
            }
            if(suitMacthed && j === this.cards.length - 1){
                this.suit = suit
                const sortedCards = this.cards
                    .sort((cardA, cardB) => {
                        const cardAValue = Array.isArray(cardA.value) ? cardA.value[1] : cardA.value
                        const cardBValue = Array.isArray(cardB.value) ? cardB.value[1] : cardB.value
                        return cardAValue - cardBValue
                    })
                this.rank = sortedCards[sortedCards.length - 1].rank
                result = true
            }
        }

        return result ? this : null
    }

    public solve() : IPlayerHandExt | null {
        return this.check()
        // const checkingStepResults: (IPlayerHandExt | null)[] = []
        // checkingStepResults[0] = this.check()

        // return checkingStepResults
    }
}
