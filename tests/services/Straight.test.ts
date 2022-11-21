import { PLAYER_RANK, SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { IPlayerHandExt, Straight } from '../../src/services/player-hand'

describe('test functional of class Straight', () => {
    it('shoud return a Straight', () => {
        const playerHand = new Straight([
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`7 ${SUITS.Clubs}`),
            new Card(`8 ${SUITS.Clubs}`),
            new Card(`9 ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Spades}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.Straight)
    })
    it('shoud return true cause first result greater than second result', () => {
        const playerHand = new Straight([
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`7 ${SUITS.Clubs}`),
            new Card(`8 ${SUITS.Clubs}`),
            new Card(`9 ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Spades}`),
        ])
        const result = playerHand.solve()
        console.log({result})
        const comparePlayerHand = new Straight([
            new Card(`5 ${SUITS.Clubs}`),
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`7 ${SUITS.Clubs}`),
            new Card(`8 ${SUITS.Clubs}`),
            new Card(`9 ${SUITS.Spades}`),
        ])
        const compareResult = comparePlayerHand.solve()
        console.log(compareResult?.rank)
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(true)
    })
    it('shoud return false cause first result less than second result', () => {
        const playerHand = new Straight([
            new Card(`6 ${SUITS.Clubs}`),
            new Card(`7 ${SUITS.Clubs}`),
            new Card(`8 ${SUITS.Clubs}`),
            new Card(`9 ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Spades}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new Straight([
            new Card(`10 ${SUITS.Clubs}`),
            new Card(`7 ${SUITS.Clubs}`),
            new Card(`8 ${SUITS.Clubs}`),
            new Card(`9 ${SUITS.Clubs}`),
            new Card(`Jack ${SUITS.Spades}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(false)
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