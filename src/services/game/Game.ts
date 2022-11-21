import { RANKS, SUITS } from "../../constants";
import { Card } from "../../models";
import { arrayShuffle } from "../../utils";
import { FourOfAKind, FullHouse, HighCard, IPlayerHandExt, StraightFlush, ThreeOfAKind, TwoPair } from "../player-hand";

type Player = {
    name: string
    playerRank: IPlayerHandExt
}
export class Game {
    public numberofPlayerCard = 5
    public cardPool: Card[] = []
    public playerHandRanks: Player[] = []
    
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

    private getPlayerHandRank(cards: Card[]): IPlayerHandExt {
        // straightFlush have 4 possibilities: Straight Flush, Flush, Straight and null if doesn't match
        const straightFlush = new StraightFlush(cards).solve()
        if(straightFlush instanceof StraightFlush) return straightFlush
        
        // fourOrThreeOfAKind has 3 possibilities: Four of a Kind, Three of a Kind and null if doesn't match
        const fourOrThreeOfAKind = new FourOfAKind(cards).solve()
        if(fourOrThreeOfAKind){
            if(fourOrThreeOfAKind instanceof FourOfAKind) return fourOrThreeOfAKind

            // check fullHouse has 2 possibilities: Full House, Three of a Kind
            const threeOfAKind = (fourOrThreeOfAKind as ThreeOfAKind)
            const fullHouseOrThreeOfAKind = new FullHouse(threeOfAKind.restCards).solve(threeOfAKind)
            if(fullHouseOrThreeOfAKind && fullHouseOrThreeOfAKind instanceof FullHouse) return fullHouseOrThreeOfAKind
            return (straightFlush || fullHouseOrThreeOfAKind) as IPlayerHandExt
        }

        // twoOrOnePair has 3 possibilities: Two Pair, One Pair and null if doesn't match
        const twoOrOnePair = new TwoPair(cards).solve()
        if(twoOrOnePair) return twoOrOnePair
        
        return new HighCard(cards).solve() as IPlayerHandExt
    }

    public play(): void {
        const shuffledCardPool = arrayShuffle(this.cardPool) as Card[]
        for (let i = 1; i <= this.numberOfPlayer; i++) {
            const startCardIndex = (i - 1) * 5
            const endCardIndex = startCardIndex + 5
            const playerCards = shuffledCardPool.slice(startCardIndex, endCardIndex)
            const palyerName = `Player ${i}`
            const playerRank = this.getPlayerHandRank(playerCards)
            this.playerHandRanks.push({
                name: palyerName,
                playerRank
            })
        }
        console.log(this.playerHandRanks)
    }
}