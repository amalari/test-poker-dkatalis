import { PLAYER_RANK } from "../../constants";
import { Card } from "../../models";
import { OnePair } from "./OnePair";
import { PlayerHand, IPlayerHandExt } from "./PlayerHand";
import { ThreeOfAKind } from "./ThreeOfAKind";

export class FullHouse extends PlayerHand implements IPlayerHandExt {
    private steps : (typeof ThreeOfAKind | typeof OnePair | null)[] = [ThreeOfAKind, OnePair]
    public rank = ''
    public suit = ''
    public restCards: Card[]

    constructor(cards: Card[]) {
        const name = PLAYER_RANK.FullHouse
        super(cards, name);
        this.restCards = cards
    }

    public solve(checkingStepResultsBefore?: IPlayerHandExt) : IPlayerHandExt | null {
        const checkingStepResults: (IPlayerHandExt | null)[] = []
        let cards = this.cards
        const restSteps = this.steps

        if(checkingStepResultsBefore){
            this.suit = checkingStepResultsBefore.suit as string
            this.rank = checkingStepResultsBefore.rank as string

            const foundIndex = restSteps.findIndex((step) => checkingStepResultsBefore.constructor.name === step?.name)
            checkingStepResults[foundIndex] = checkingStepResultsBefore
            restSteps[foundIndex] = null
            cards = checkingStepResultsBefore.restCards
        }

        for (let i = 0; i < restSteps.length; i++) {
            const step = this.steps[i]
            if(step !== null){
                checkingStepResults[i] = new step(cards).check()
                if(checkingStepResults[i]){
                    if(step === ThreeOfAKind) {
                        this.suit = checkingStepResults[i]?.suit as string
                        this.rank = checkingStepResults[i]?.rank as string
                    }
                    cards = (checkingStepResults[i] as ThreeOfAKind | OnePair)?.restCards
                }    
            }
        }
        if(!checkingStepResults.includes(null)) return (this as FullHouse)

        return checkingStepResults[0] || checkingStepResults[1]
    }
}