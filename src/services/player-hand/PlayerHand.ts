import { PLAYER_RANK, PLAYER_RANKS, RANKS, RANK_SUITS } from "../../constants";
import { Card } from "../../models/Card";

export interface IPlayerHand {
    cards: Card[]
    name: string
    check: () => IPlayerHandExt | null
}

export interface IPlayerHandExt extends Omit<IPlayerHand, 'greaterThan'> {
    restCards: Card[]
    rank?: string
    suit?: string
    isFourKind?: () => boolean
    solve: (checkingStepResultsBefore?: IPlayerHandExt) => IPlayerHandExt | null
    greaterThan: (data: IPlayerHandExt) => boolean
}
export class PlayerHand implements IPlayerHand {
    public cards: Card[]
    public name: string
    constructor(cards: string[] | Card[], name: string) {
        this.name = name
        this.cards = typeof cards[0] === "string" ? (cards as string[]).map((card: string) => new Card(card)) : cards as Card[]
    }
    public check(): IPlayerHandExt | null {
        return null
    }
    public static greaterThan(selfData: IPlayerHandExt, data: IPlayerHandExt): boolean{
        const selfDataPlayerRank = PLAYER_RANKS.indexOf(selfData.name)
        const dataPlayerRank = PLAYER_RANKS.indexOf(data.name)
        if(selfDataPlayerRank !== dataPlayerRank) return selfDataPlayerRank > dataPlayerRank
        
        switch (selfData.name) {
            // compare suit only
            case PLAYER_RANK.RoyalFlush: {
                return RANK_SUITS.indexOf(selfData.suit as string) > RANK_SUITS.indexOf(data.suit as string)
            }
            // compare suit first and then rank
            case PLAYER_RANK.StraightFlush:
            case PLAYER_RANK.FullHouse:
            case PLAYER_RANK.Flush: {
                const rankSelfSuit = RANK_SUITS.indexOf(selfData.suit as string)
                const rangkComparingSuit = RANK_SUITS.indexOf(data.suit as string)
                if(rankSelfSuit !== rangkComparingSuit) return rankSelfSuit > rangkComparingSuit

                const rankSelfRank = RANKS.indexOf(selfData.rank as string)
                const rangkComparingRank = RANKS.indexOf(data.rank as string)
                return rankSelfRank > rangkComparingRank
            }
            // compare rank only
            case PLAYER_RANK.FourOfAKind: 
            case PLAYER_RANK.ThreeOfAKind: {
                return RANKS.indexOf(selfData.rank as string) > RANKS.indexOf(data.rank as string)
            }
            // compare rank first and then suit
            case PLAYER_RANK.Straight:
            case PLAYER_RANK.TwoPairs:
            case PLAYER_RANK.OnePair:
            case PLAYER_RANK.HighCard: {
                const rankSelfRank = RANKS.indexOf(selfData.rank as string)
                const rankComparingRank = RANKS.indexOf(data.rank as string)
                if(rankSelfRank !== rankComparingRank) return rankSelfRank > rankComparingRank

                const rankSelfSuit = RANK_SUITS.indexOf(selfData.suit as string)
                const rankComparingSuit = RANK_SUITS.indexOf(data.suit as string)
                return rankSelfSuit > rankComparingSuit
            }
        }
        return false
    }
}