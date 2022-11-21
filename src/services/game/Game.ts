import { PLAYER_RANK, RANKS, SUITS } from "../../constants";
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
    public sortedPlayerHandRanks: Player[] = []
    public winner: Player | null = null
    
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
        return (this.cardPool.length / this.numberOfPlayer) >= 5 && this.numberOfPlayer > 1 ? true : false
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

    private findTheWinner(): void {
        this.sortedPlayerHandRanks = [...this.playerHandRanks].sort((playerHandRankA, playerHandRankB) => {
            return playerHandRankB.playerRank.greaterThan(playerHandRankA.playerRank) ? 1 : -1
        })
        this.winner = this.sortedPlayerHandRanks[0]
    }

    private announceWinner(): void {
        for (let i = 0; i < this.playerHandRanks.length; i++) {
            const player = this.playerHandRanks[i]
            const playerCard = player.playerRank.cards.map((card) => card.toString())
            if(player.playerRank.name === PLAYER_RANK.HighCard){
                console.log(`${player.name}: ${player.playerRank.name} with highest card ${player.playerRank.rank} ${player.playerRank.suit} (${playerCard})`)
            } else {
                console.log(`${player.name}: ${player.playerRank.name} (${playerCard})`)
            }
        }
        const winner = this.sortedPlayerHandRanks[0]
        const winnerCard = winner.playerRank.cards.map((card) => card.toString())
        console.log('\n')
        console.log("==== The Winner is =====", '\n')
        if(winner.playerRank.name === PLAYER_RANK.HighCard){
            console.log(`${winner.name}: ${winner.playerRank.name} with highest card ${winner.playerRank.rank} ${winner.playerRank.suit} (${winnerCard})`)
        } else {
            console.log(`${winner.name}: ${winner.playerRank.name} (${winnerCard})`)
        }
        console.log('\n')
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
        this.findTheWinner()
        this.announceWinner()
    }
}