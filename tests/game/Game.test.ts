import { Game } from '../../src/services/game'

describe('test functional of class Game', () => {
    it('check card pool 52', () => {
        const game = new Game(5)
        expect(game.cardPool.length).toBe(52)
    })
    it('should return error with minimum 2 and maximum 10 player', () => {
        const game = new Game(1)
        expect(game.validate()).toBe(false)
        const game1 = new Game(11)
        expect(game1.validate()).toBe(false)
    })
})