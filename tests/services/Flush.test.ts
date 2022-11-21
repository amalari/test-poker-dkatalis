import { SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { Flush } from '../../src/services/player-hand'

describe('Flush', () => {
    it('shoud return a Flush', () => {
        const playerHand = new Flush([
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`Jack ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe('Flush')
    })
    it('shoud return null does not matched any suit flush', () => {
        const playerHand = new Flush([
            new Card(`5 ${SUITS.Diamonds}`),
            new Card(`6 ${SUITS.Diamonds}`),
            new Card(`10 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Hearts}`),
            new Card(`9 ${SUITS.Diamonds}`),
        ])
        const result = playerHand.solve()
        expect(result).toBe(null)
    })
})