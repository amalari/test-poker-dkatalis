import { PLAYER_RANK, SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { HighCard, IPlayerHandExt } from '../../src/services/player-hand'

describe('test functional of class HighCard', () => {
    it('should return High Pair', () => {
        const playerHand = new HighCard([
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.HighCard)
        expect(result?.rank).toBe('Ace')
    })
    it('shoud return true cause first result greater than second result', () => {
        const playerHand = new HighCard([
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new HighCard([
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`King ${SUITS.Clubs}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(true)
    })
    it('shoud return false cause first result less than second result', () => {
        const playerHand = new HighCard([
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new HighCard([
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Spades}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(false)
    })
})