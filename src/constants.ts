export const RANKS: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
export enum SUITS {
    Diamonds = 'Diamonds',
    Clubs = 'Clubs',
    Hearts = 'Hearts',
    Spades = 'Spades'
}
export enum PLAYER_RANK {
    RoyalFlush = 'Royal Flush',
    StraightFlush = 'Straight Flush',
    FourOfAKind = 'Four of a Kind',
    FullHouse = 'Full House',
    Flush = 'Flush',
    Straight = 'Straight',
    ThreeOfAKind = 'Three of a Kind',
    TwoPairs = 'Two Pairs',
    OnePair = 'One Pair',
    HighCard = 'High Card'
}
export const RANK_SUITS: string[] = [SUITS.Diamonds, SUITS.Clubs, SUITS.Hearts, SUITS.Spades]
export const PLAYER_RANKS: string[] = [
    PLAYER_RANK.HighCard,
    PLAYER_RANK.OnePair,
    PLAYER_RANK.TwoPairs,
    PLAYER_RANK.ThreeOfAKind,
    PLAYER_RANK.Straight,
    PLAYER_RANK.Flush,
    PLAYER_RANK.FullHouse,
    PLAYER_RANK.FourOfAKind,
    PLAYER_RANK.StraightFlush,
    PLAYER_RANK.RoyalFlush,
]
