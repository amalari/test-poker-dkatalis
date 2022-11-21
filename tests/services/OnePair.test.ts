import { SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { OnePair } from '../../src/services/player-hand'

describe('One Pair', () => {
    it('should return One Pair', () => {
        const playerHand = new OnePair([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe('One Pair')
    })
    
    it('should return null cause does not match One Pair', () => {
        const playerHand = new OnePair([
            new Card(`2 ${SUITS.Clubs}`),
            new Card(`8 ${SUITS.Diamonds}`),
            new Card(`10 ${SUITS.Spades}`),
            new Card(`Jack ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result).toBe(null)
    })
})