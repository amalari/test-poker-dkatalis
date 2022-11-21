import { PLAYER_RANK, SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { FourOfAKind, IPlayerHandExt, ThreeOfAKind } from '../../src/services/player-hand'

describe('test functional of class FourOfAKind', () => {
    it('should return instance of Four of a Kind', () => {
        const playerHand = new FourOfAKind([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`4 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.FourOfAKind)
    })
    it('should return Four of A Kind with check Three of A Kind first', () => {
        const cards = [
            new Card(`Ace ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Hearts}`),
        ]
        const threeOfAKind = new ThreeOfAKind(cards).check() as ThreeOfAKind
        const playerHand = new FourOfAKind(threeOfAKind.restCards)
        const result = playerHand.solve(threeOfAKind)
        expect(result?.name).toBe(PLAYER_RANK.FourOfAKind)
    })
    it('should return instance of Four of a Kind with Ace rank', () => {
        const playerHand = new FourOfAKind([
            new Card(`Ace ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Hearts}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.FourOfAKind)
    })
    it('should return false check with three of a kind', () => {
        const playerHand = new FourOfAKind([
            new Card(`Ace ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`5 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Hearts}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.ThreeOfAKind)
    })
    it('shoud return true cause first result greater than second result', () => {
        const playerHand = new FourOfAKind([
            new Card(`King ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Diamonds}`),
            new Card(`King ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`King ${SUITS.Hearts}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new FourOfAKind([
            new Card(`Queen ${SUITS.Clubs}`),
            new Card(`Queen ${SUITS.Diamonds}`),
            new Card(`Queen ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`Queen ${SUITS.Hearts}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(true)
    })
    it('shoud return false cause first result less than second result', () => {
        const playerHand = new FourOfAKind([
            new Card(`King ${SUITS.Clubs}`),
            new Card(`King ${SUITS.Diamonds}`),
            new Card(`King ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`King ${SUITS.Hearts}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new FourOfAKind([
            new Card(`Ace ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`Ace ${SUITS.Hearts}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(false)
    })

    it('should return null cause does not match three of four of a kind', () => {
        const playerHand = new FourOfAKind([
            new Card(`2 ${SUITS.Clubs}`),
            new Card(`7 ${SUITS.Diamonds}`),
            new Card(`2 ${SUITS.Spades}`),
            new Card(`5 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Hearts}`),
        ])
        const result = playerHand.solve()
        expect(result).toBe(null)
    })
})