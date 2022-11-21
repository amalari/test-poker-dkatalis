import { PLAYER_RANK, SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { IPlayerHandExt, ThreeOfAKind } from '../../src/services/player-hand'

describe('test functional of class ThreeOfAKind', () => {
    it('should return instance of Three of a Kind', () => {
        const playerHand = new ThreeOfAKind([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`7 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.ThreeOfAKind)
    })
    it('shoud return true cause first result greater than second result', () => {
        const playerHand = new ThreeOfAKind([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`7 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new ThreeOfAKind([
            new Card(`3 ${SUITS.Clubs}`),
            new Card(`3 ${SUITS.Diamonds}`),
            new Card(`3 ${SUITS.Spades}`),
            new Card(`7 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(true)
    })
    it('shoud return false cause first result less than second result', () => {
        const playerHand = new ThreeOfAKind([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`7 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new ThreeOfAKind([
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`6 ${SUITS.Diamonds}`),
            new Card(`6 ${SUITS.Spades}`),
            new Card(`7 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(false)
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