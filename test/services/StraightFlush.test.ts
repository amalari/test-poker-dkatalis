import { SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { StraightFlush } from '../../src/services/player-hand'

describe('Straight Flush', () => {
    it('A Royal Flush', () => {
        const playerHand = new StraightFlush([
            new Card(`Queen ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`Jack ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const results = playerHand.solve()
        expect(results.includes(null)).toBe(false)
        expect(playerHand.name).toBe('Royal Flush')
    })
    it('A Straight Flush', () => {
        const playerHand = new StraightFlush([
            new Card(`5 ${SUITS.Diamonds}`),
            new Card(`6 ${SUITS.Diamonds}`),
            new Card(`7 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Diamonds}`),
            new Card(`9 ${SUITS.Diamonds}`),
        ])
        const results = playerHand.solve()
        expect(results.includes(null)).toBe(false)
        expect(playerHand.name).toBe('Straight Flush')
    })
    it('A Straight Flush low with Ace', () => {
        const playerHand = new StraightFlush([
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Spades}`),
            new Card(`3 ${SUITS.Spades}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`5 ${SUITS.Spades}`),
        ])
        const results = playerHand.solve()
        expect(results.includes(null)).toBe(false)
        expect(playerHand.name).toBe('Straight Flush')
    })
    it('Straight only', () => {
        const cards = [
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Spades}`),
            new Card(`3 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`5 ${SUITS.Spades}`),
        ]
        const playerHand = new StraightFlush(cards)
        const results = playerHand.solve().filter((result) => result !== null)
        expect(results.length).toBe(1)
        expect(results[0]?.name).toBe('Straight')
    })
    it('Flush only', () => {
        const cards = [
            new Card(`Ace ${SUITS.Hearts}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`3 ${SUITS.Hearts}`),
            new Card(`4 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Hearts}`),
        ]
        const playerHand = new StraightFlush(cards)
        const results = playerHand.solve().filter((result) => result !== null)
        expect(results.length).toBe(1)
        expect(results[0]?.name).toBe('Flush')
    })
})