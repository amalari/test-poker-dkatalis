import { PLAYER_RANK, SUITS } from '../../src/constants'
import { Card } from '../../src/models'
import { FullHouse, IPlayerHandExt, ThreeOfAKind } from '../../src/services/player-hand'

describe('test functional of class FullHouse', () => {
    it('should return instance of Full House', () => {
        const playerHand = new FullHouse([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.FullHouse)
    })
    it('should return Full House after Three of a Kind checking step', () => {
        const cards = [
            new Card(`Ace ${SUITS.Clubs}`),
            new Card(`Ace ${SUITS.Diamonds}`),
            new Card(`Ace ${SUITS.Spades}`),
            new Card(`2 ${SUITS.Hearts}`),
            new Card(`2 ${SUITS.Hearts}`),
        ]
        const threeOfAKind = new ThreeOfAKind(cards).check() as ThreeOfAKind
        const playerHand = new FullHouse(threeOfAKind.restCards)
        const result = playerHand.solve(threeOfAKind)
        expect(result?.name).toBe(PLAYER_RANK.FullHouse)
    })
    
    it('should return instance of Three of a Kind', () => {
        const playerHand = new FullHouse([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`8 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result?.name).toBe(PLAYER_RANK.ThreeOfAKind)
    })
    it('shoud return true cause first result greater than second result', () => {
        const playerHand = new FullHouse([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new FullHouse([
            new Card(`3 ${SUITS.Clubs}`),
            new Card(`3 ${SUITS.Diamonds}`),
            new Card(`3 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Clubs}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(true)
    })
    it('shoud return false cause first result less than second result', () => {
        const playerHand = new FullHouse([
            new Card(`4 ${SUITS.Clubs}`),
            new Card(`4 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        const comparePlayerHand = new FullHouse([
            new Card(`5 ${SUITS.Clubs}`),
            new Card(`5 ${SUITS.Diamonds}`),
            new Card(`5 ${SUITS.Spades}`),
            new Card(`6 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Clubs}`),
        ])
        const compareResult = comparePlayerHand.solve()
        expect(result?.greaterThan(compareResult as IPlayerHandExt)).toBe(false)
    })
    it('return null cause does not match Full House', () => {
        const playerHand = new FullHouse([
            new Card(`2 ${SUITS.Clubs}`),
            new Card(`10 ${SUITS.Diamonds}`),
            new Card(`4 ${SUITS.Spades}`),
            new Card(`9 ${SUITS.Hearts}`),
            new Card(`6 ${SUITS.Clubs}`),
        ])
        const result = playerHand.solve()
        expect(result).toBe(null)
    })
})