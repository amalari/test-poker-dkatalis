import { PLAYER_RANK, SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { IPlayerHandExt, TwoPair } from '../../src/services/player-hand'

describe('test functional of class TwoPair', () => {
    it('should return Two Pair', () => {
        const playerHand = new TwoPair([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`6 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.TwoPairs)
    })
    it('should return One Pair', () => {
        const playerHand = new TwoPair([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.OnePair)
    })
    it('shoud return true cause first result greater than second result', () => {
        const playerHand = new TwoPair([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`6 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new TwoPair([
            new Card(`3 ${SUITS.Clubs}`),
            new Card(`3 ${SUITS.Diamonds}`),
            new Card(`5 ${SUITS.Spades}`),
            new Card(`5 ${SUITS.Hearts}`),
            new Card(`King ${SUITS.Clubs}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(true)
    })
    it('shoud return false cause first result less than second result', () => {
        const playerHand = new TwoPair([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`6 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new TwoPair([
            new Card(`3 ${SUITS.Clubs}`),
            new Card(`3 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Spades}`),
            new Card(`8 ${SUITS.Hearts}`),
            new Card(`King ${SUITS.Clubs}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(false)
    })
    it('should return null cause does not match', () => {
        const playerHand = new TwoPair([
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