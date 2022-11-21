import { PLAYER_RANK, SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { Flush, IPlayerHandExt } from '../../src/services/player-hand'

describe('test functional of class Flush', () => {
    it('shoud return a Flush', () => {
        const playerHand = new Flush([
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`Jack ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.Flush)
    })
    it('shoud return true cause first result greater than second result', () => {
        const playerHand = new Flush([
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`Jack ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new Flush([
            new Card(`6 ${SUITS.Diamonds}`),
            new Card(`10 ${SUITS.Diamonds}`),
            new Card(`Jack ${SUITS.Diamonds}`),
            new Card(`King ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Diamonds}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(true)
    })
    it('shoud return false cause first result less than second result', () => {
        const playerHand = new Flush([
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`Jack ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new Flush([
            new Card(`6 ${SUITS.Spades}`),
            new Card(`10 ${SUITS.Spades}`),
            new Card(`Jack ${SUITS.Spades}`),
            new Card(`King ${SUITS.Spades}`),
            new Card(`Ace ${SUITS.Spades}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(false)
    })
    it('shoud return a Flush', () => {
        const playerHand = new Flush([
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`Jack ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.Flush)
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