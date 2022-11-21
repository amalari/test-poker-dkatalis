import { PLAYER_RANK, SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { PlayerHand } from '../../src/services/player-hand'

describe('test functional of class PlayerHand', () => {
    it('shoud return a PlayerHand instance', () => {
        const playerHand = new PlayerHand([
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`Jack ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ], PLAYER_RANK.Flush)
        expect(playerHand?.name).toBe(PLAYER_RANK.Flush)
        expect(playerHand?.check()).toBe(null)
    })
})