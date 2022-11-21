import { PLAYER_RANK } from "../../constants";
import { Card } from "../../models";
import { PlayerHand, IPlayerHandExt } from "./PlayerHand";

export class Straight extends PlayerHand implements IPlayerHandExt {
    // public highestCard: Card | null = null
    public restCards: Card[]
    public rank= ''
    public suit= ''

    constructor(cards: Card[]) {
        const name = PLAYER_RANK.Straight
        super(cards, name);
        this.restCards = cards
    }

    public check(): IPlayerHandExt | null {
        let result = true
        let aceCard : Card | null = null
        const sortedCards = this.cards
            .filter((card) => {
                if(card.rank === 'Ace'){
                    aceCard = card
                    return false
                }
                return true
            })
            .sort((cardA, cardB) => {
                return (cardA.value as number) - (cardB.value as number)
            })

        if(sortedCards.length < 4) return null

        for (let i = 0; i < sortedCards.length - 1; i++) {
            const cardValue = sortedCards[i].value as number;
            const nextCardValue = sortedCards[i+1].value as number;
            if(nextCardValue - cardValue > 1){
                result = false
                i = sortedCards.length
            }
        }

        if(result && aceCard){
            result = false
            if(sortedCards[sortedCards.length - 1].value === 3){
                this.rank = sortedCards[sortedCards.length - 1].rank
                this.suit = sortedCards[sortedCards.length - 1].suit
                result = true
            }
            if(sortedCards[sortedCards.length - 1].value === 11){
                this.rank = (aceCard as Card).rank
                this.suit = (aceCard as Card).suit
                result = true
            }
        }
        return result ? (this as IPlayerHandExt) : null
    }

    public solve() : IPlayerHandExt | null {
        return this.check()
        // const checkingStepResults: (IPlayerHandExt | null)[] = []
        // checkingStepResults[0] = this.check()

        // return checkingStepResults
    }
}
