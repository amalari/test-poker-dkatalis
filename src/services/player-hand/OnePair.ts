import { PLAYER_RANK } from "../../constants";
import { Card } from "../../models";
import { PlayerHand, IPlayerHandExt } from "./PlayerHand";

export class OnePair extends PlayerHand implements IPlayerHandExt {
    public restCards: Card[]
    public rank = ''
    public suit = ''

    constructor(cards: Card[]) {
        const name = PLAYER_RANK.OnePair
        super(cards, name);
        this.restCards = cards
    }

    public check() : IPlayerHandExt | null {
        let result = false
        const pairIndexs: number[] = []
        const cardRanks = this.cards.map((card) => card.rank )
        for (let i = 0; i < cardRanks.length; i++) {
            const duplicateCardRanks = [...cardRanks]
            duplicateCardRanks[i] = 'null'
            const foundDuplicateRankIndex = duplicateCardRanks.indexOf(cardRanks[i])

            if(foundDuplicateRankIndex > -1){
                pairIndexs.push(i)
                pairIndexs.push(foundDuplicateRankIndex)
                this.rank = cardRanks[i]
                this.suit = this.cards[i].suit
                i = cardRanks.length
                result = true
                this.restCards = this.cards.filter((card, index) => !pairIndexs.includes(index))
            }
        }

        return result ? (this as unknown as IPlayerHandExt) : null
    }

    public solve() : IPlayerHandExt | null {
        return this.check()
        // const checkingStepResults: (IPlayerHandExt | null)[] = []
        // checkingStepResults[0] = this.check()

        // return checkingStepResults
    }
}
