import { SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { ThreeOfAKind } from '../../src/services/player-hand'

describe('Three of a Kind', () => {
    it('should return instance of Three of a Kind', () => {
        const playerHand = new ThreeOfAKind([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`7 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe('Three of a Kind')
    })
    it('shoud return null does not matched Three of A Kind', () => {
        const playerHand = new ThreeOfAKind([
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