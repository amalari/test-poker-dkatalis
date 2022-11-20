"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const constants_1 = require("../../constants");
const models_1 = require("../../models");
const utils_1 = require("../../utils");
class Game {
    // private checkingSteps = [StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard]
    constructor(numberOfPlayer) {
        this.numberOfPlayer = numberOfPlayer;
        this.numberofPlayerCard = 5;
        this.cardPool = [];
        const arrSuits = Object.keys(constants_1.SUITS);
        for (let i = 0; i < constants_1.RANKS.length; i++) {
            const rank = constants_1.RANKS[i];
            for (let j = 0; j < arrSuits.length; j++) {
                const suit = arrSuits[j];
                this.cardPool.push(new models_1.Card(`${rank} ${suit}`));
            }
        }
    }
    validate() {
        return (this.cardPool.length / this.numberOfPlayer) >= 5 ? true : false;
    }
    play() {
        const shuffledCardPool = (0, utils_1.arrayShuffle)(this.cardPool);
        for (let i = 1; i <= this.numberOfPlayer; i++) {
            const startCardIndex = (i - 1) * 5;
            const endCardIndex = startCardIndex + 5;
            const playerCards = this.cardPool.slice(startCardIndex, endCardIndex);
            console.log(`player ${i}`);
            console.log(playerCards);
        }
    }
}
exports.Game = Game;
