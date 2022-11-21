import { SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { HighCard } from '../../src/services/player-hand'

describe('High Card', () => {
    it('should return High Pair', () => {
        const playerHand = new HighCard([
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe('High Card')
        expect(result?.rank).toBe('Ace')
    })
})