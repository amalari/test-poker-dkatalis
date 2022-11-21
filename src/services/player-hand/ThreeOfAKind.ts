import { PLAYER_RANK } from "../../constants";
import { Card } from "../../models";
import { PlayerHand, IPlayerHandExt } from "./PlayerHand";

export class ThreeOfAKind extends PlayerHand implements IPlayerHandExt {
    public rank = ''
    public suit = ''
    public restCards: Card[]

    private cardValueMappers: {[key: string]: number} = {}
    constructor(cards: Card[]) {
        const name = PLAYER_RANK.ThreeOfAKind
        super(cards, name);
        this.restCards = cards
    }

    public check() : IPlayerHandExt | null {
        let result = false
        const cardValueMappers: {[key: string]: number} = {}
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            if(cardValueMappers[card.rank]){
                cardValueMappers[card.rank] += 1
                if(cardValueMappers[card.rank] === 3){
                    this.rank = card.rank
                    this.suit = card.suit
                    
                    let duplicateRankCounter = 0
                    this.restCards = this.cards.filter((restCard) => {
                        if(restCard.rank === card.rank) duplicateRankCounter++
                        return restCard.rank !== card.rank || duplicateRankCounter > 3
                    })

                    result = true
                }
            } else {
                cardValueMappers[card.rank] = 1
            }
        }
        this.cardValueMappers = cardValueMappers

        return result ? (this as IPlayerHandExt) : null
    }

    public isFourKind() : boolean {
        let highestKindCount = 0
        for (const key in this.cardValueMappers) {
            highestKindCount = highestKindCount > this.cardValueMappers[key] 
                ? highestKindCount : this.cardValueMappers[key]
        }
        return highestKindCount === 4
    }

    public solve() : IPlayerHandExt | null {
        return this.check()
        // const checkingStepResults: (IPlayerHandExt | null)[] = []
        // checkingStepResults[0] = this.check()

        // return checkingStepResults
    }
}

