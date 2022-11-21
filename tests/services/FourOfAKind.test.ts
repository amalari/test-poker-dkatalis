import { SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { FourOfAKind, ThreeOfAKind } from '../../src/services/player-hand'

describe('Four of a Kind', () => {
    it('should return instance of Four of a Kind', () => {
        const playerHand = new FourOfAKind([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`4 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe('Four of a Kind')
    })
    it('should return Four of A Kind with check Three of A Kind first', () => {
        const cards = [
            new Card(`Ace ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Hearts}`),
        ]
        const threeOfAKind = new ThreeOfAKind(cards).check() as ThreeOfAKind
        const playerHand = new FourOfAKind(threeOfAKind.restCards)
        const result = playerHand.solve(threeOfAKind)
        expect(result?.name).toBe('Four of a Kind')
    })
    it('should return instance of Four of a Kind with Ace rank', () => {
        const playerHand = new FourOfAKind([
            new Card(`Ace ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Hearts}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe('Four of a Kind')
    })
    it('should return false check with three of a kind', () => {
        const playerHand = new FourOfAKind([
            new Card(`Ace ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`5 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Hearts}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe('Three of a Kind')
    })
    it('should return null cause does not match three of four of a kind', () => {
        const playerHand = new FourOfAKind([
            new Card(`2 ${SUITS.Clubs}`),
            new Card(`7 ${SUITS.Diamonds}`),
            new Card(`2 ${SUITS.Spades}`),
            new Card(`5 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Hearts}`),
        ])
        const result = playerHand.solve()
        expect(result).toBe(null)
    })
})