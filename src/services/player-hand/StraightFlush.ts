import { PLAYER_RANK } from "../../constants";
import { Card } from "../../models";
import { Flush } from "./Flush";
import { PlayerHand, IPlayerHandExt } from "./PlayerHand";
import { Straight } from "./Straight";

export class StraightFlush extends PlayerHand implements IPlayerHandExt {
    private steps = [Flush, Straight]
    public restCards: Card[]
    public suit = ''
    public rank = ''

    constructor(cards: Card[]) {
        const name = PLAYER_RANK.StraightFlush
        super(cards, name);
        this.restCards = cards
    }

    public solve() : IPlayerHandExt | null {
        const checkingStepResults: (IPlayerHandExt | null)[] = []
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            const playerHandStep = new step(this.cards)
            checkingStepResults[i] = playerHandStep.check()
            if(checkingStepResults[i]?.name === 'Flush'){
                this.suit = checkingStepResults[i]?.suit as string
            }
            if(checkingStepResults[i]?.name === 'Straight'){
                const rank = (checkingStepResults[i] as Straight)?.rank
                this.rank = rank
                if(rank === 'Ace') this.name = 'Royal Flush'
            }
        }
        if(!checkingStepResults.includes(null)) return (this as StraightFlush)

        return checkingStepResults[0] || checkingStepResults[1]
        // return checkingStepResults
    }
}
