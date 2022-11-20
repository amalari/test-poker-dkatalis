import { RANKS, SUITS } from "../../constants";
import { Card } from "../../models";
import { arrayShuffle } from "../../utils";
import { Flush, FourOfAKind, FullHouse, HighCard, OnePair, Straight, StraightFlush, ThreeOfAKind, TwoPair } from "../player-hand/PlayerHand";

export class Game {
    public numberofPlayerCard = 5
    public cardPool: Card[] = []
    // private checkingSteps = [StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard]
    
    constructor(public numberOfPlayer: number){
        const arrSuits = Object.keys(SUITS)
        for (let i = 0; i < RANKS.length; i++) {
            const rank = RANKS[i];
            for (let j = 0; j < arrSuits.length; j++) {
                const suit = arrSuits[j];
                this.cardPool.push(new Card(`${rank} ${suit}`))
            }
        }
    }

    public validate(): boolean {
        return (this.cardPool.length / this.numberOfPlayer) >= 5 ? true : false
    }

    public play(): void {
        const shuffledCardPool = arrayShuffle(this.cardPool) as Card[]
        for (let i = 1; i <= this.numberOfPlayer; i++) {
            const startCardIndex = (i - 1) * 5
            const endCardIndex = startCardIndex + 5
            const playerCards = this.cardPool.slice(startCardIndex, endCardIndex)
            console.log(`player ${i}`)
            console.log(playerCards)
        }
    }
}