import { PLAYER_RANK, SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { IPlayerHandExt, StraightFlush } from '../../src/services/player-hand'

describe('test functional of class StraightFlush', () => {
    it('shoud return a Royal Flush', () => {
        const playerHand = new StraightFlush([
            new Card(`Queen ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`Jack ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe('Royal Flush')
    })
    it('shoud return true cause first result greater than second result', () => {
        const playerHand = new StraightFlush([
            new Card(`Queen ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`Jack ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new StraightFlush([
            new Card(`Queen ${SUITS.Diamonds}`),
            new Card(`10 ${SUITS.Diamonds}`),
            new Card(`Jack ${SUITS.Diamonds}`),
            new Card(`King ${SUITS.Diamonds}`),
            new Card(`9 ${SUITS.Diamonds}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(true)
    })
    it('shoud return false cause first result less than second result', () => {
        const playerHand = new StraightFlush([
            new Card(`Queen ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`Jack ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Clubs}`),
            new Card(`9 ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new StraightFlush([
            new Card(`Queen ${SUITS.Diamonds}`),
            new Card(`10 ${SUITS.Diamonds}`),
            new Card(`Jack ${SUITS.Diamonds}`),
            new Card(`King ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Diamonds}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(false)
    })
    it('shoud return a Straight Flush', () => {
        const playerHand = new StraightFlush([
            new Card(`5 ${SUITS.Diamonds}`),
            new Card(`6 ${SUITS.Diamonds}`),
            new Card(`7 ${SUITS.Diamonds}`),
            new Card(`8 ${SUITS.Diamonds}`),
            new Card(`9 ${SUITS.Diamonds}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.StraightFlush)
    })
    it('shoud return a Straight Flush low with Ace', () => {
        const playerHand = new StraightFlush([
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Spades}`),
            new Card(`3 ${SUITS.Spades}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`5 ${SUITS.Spades}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.StraightFlush)
    })
    it('Straight only', () => {
        const cards = [
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Spades}`),
            new Card(`3 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`5 ${SUITS.Spades}`),
        ]
        const playerHand = new StraightFlush(cards)
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.Straight)
    })
    it('Flush only', () => {
        const cards = [
            new Card(`Ace ${SUITS.Hearts}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`3 ${SUITS.Hearts}`),
            new Card(`4 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Hearts}`),
        ]
        const playerHand = new StraightFlush(cards)
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.Flush)
    })
})