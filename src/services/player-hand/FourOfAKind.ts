import { PLAYER_RANK } from "../../constants";
import { Card } from "../../models";
import { PlayerHand, IPlayerHandExt } from "./PlayerHand";
import { ThreeOfAKind } from "./ThreeOfAKind";

export class FourOfAKind extends PlayerHand implements IPlayerHandExt {
    public rank = ''
    public suit = ''
    public restCards: Card[]

    constructor(cards: Card[]) {
        const name = PLAYER_RANK.FourOfAKind
        super(cards, name);
        this.restCards = cards
    }

    public solve(checkingStepResultsBefore?: IPlayerHandExt) : IPlayerHandExt | null {
        const threeOfAKindCheck = checkingStepResultsBefore || new ThreeOfAKind(this.cards).check()
        if(threeOfAKindCheck){
            if(threeOfAKindCheck && threeOfAKindCheck.isFourKind && threeOfAKindCheck.isFourKind()){
                this.rank = threeOfAKindCheck.rank as string
                return (this as IPlayerHandExt)
            } else {
                this.restCards = threeOfAKindCheck.restCards
                return threeOfAKindCheck
            }
        }
        return null
    }

    // public solve(checkingStepResultsBefore?: IPlayerHandExt) : IPlayerHandExt | null {
    //     return this.check()
    //     // const checkingStepResults: (IPlayerHandExt | null)[] = []
    //     // checkingStepResults[0] = this.check()

    //     // return checkingStepResults
    // }
}
