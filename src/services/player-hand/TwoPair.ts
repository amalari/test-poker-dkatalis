import { PLAYER_RANK, RANKS, RANK_SUITS } from "../../constants";
import { Card } from "../../models";
import { OnePair } from "./OnePair";
import { PlayerHand, IPlayerHandExt } from "./PlayerHand";

export class TwoPair extends PlayerHand implements IPlayerHandExt {
    private steps = [OnePair, OnePair]
    public rank = ''
    public suit = ''
    public restCards: Card[]

    constructor(cards: Card[]) {
        const name = PLAYER_RANK.TwoPairs
        super(cards, name);
        this.restCards = cards
    }

    public solve(checkingStepResultsBefore?: IPlayerHandExt) : IPlayerHandExt | null {
        const checkingStepResults: (IPlayerHandExt | null)[] = []
        let cards = this.cards
        const restSteps = this.steps

        if(checkingStepResultsBefore){
            this.rank = checkingStepResultsBefore.rank as string
            this.suit = checkingStepResultsBefore.suit as string
            const foundIndex = restSteps.findIndex((step) => checkingStepResultsBefore.constructor.name === step.name)
            checkingStepResults[foundIndex] = checkingStepResultsBefore
            restSteps.slice(foundIndex, 1)
            cards = checkingStepResultsBefore.restCards
        }

        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i]
            const checkOnePair = new step(cards).check()
            checkingStepResults[i] = checkOnePair
            if(checkOnePair){
                cards = (checkOnePair as OnePair).restCards
                if(RANKS.indexOf((checkOnePair as OnePair).rank) > RANKS.indexOf(this.rank)){
                    this.rank = (checkOnePair as OnePair).rank
                }
                if(RANKS.indexOf((checkOnePair as OnePair).rank) === RANKS.indexOf(this.rank)
                    && RANK_SUITS.indexOf((checkOnePair as OnePair).suit) > RANK_SUITS.indexOf(this.suit)
                ){
                    this.suit = (checkOnePair as OnePair).suit
                }
            }
        }
        if(!checkingStepResults.includes(null)) return (this as TwoPair)

        return checkingStepResults[0] || checkingStepResults[1]


        // return checkingStepResults
    }
}