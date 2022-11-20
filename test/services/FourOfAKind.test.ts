import { SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { FourOfAKind } from '../../src/services/player-hand'

describe('Four of a Kind', () => {
    it('should return instance of Four of a Kind', () => {
        const playerHand = new FourOfAKind([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`4 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const results = playerHand.solve()
        expect(results.includes(null)).toBe(false)
        expect(results[0]?.name).toBe('Four of a Kind')
    })
    it('should return instance of Four of a Kind with Ace rank', () => {
        const playerHand = new FourOfAKind([
            new Card(`Ace ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Hearts}`),
        ])
        const results = playerHand.solve()
        expect(results.includes(null)).toBe(false)
        expect(results[0]?.name).toBe('Four of a Kind')
    })
    it('should return false check with three of a kind', () => {
        const playerHand = new FourOfAKind([
            new Card(`Ace ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`5 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Hearts}`),
        ])
        const results = playerHand.solve()
        expect(results.includes(null)).toBe(true)
    })
})