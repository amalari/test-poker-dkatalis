import { SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { Straight } from '../../src/services/player-hand'

describe('Straight', () => {
    it('shoud return a Straight', () => {
        const playerHand = new Straight([
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`7 ${SUITS.Clubs}`),
            new Card(`8 ${SUITS.Clubs}`),
            new Card(`9 ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Spades}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe('Straight')
    })
    it('shoud return null does not matched any straight', () => {
        const playerHand = new Straight([
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