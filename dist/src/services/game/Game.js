"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const constants_1 = require("../../constants");
const models_1 = require("../../models");
const utils_1 = require("../../utils");
const player_hand_1 = require("../player-hand");
class Game {
    constructor(numberOfPlayer) {
        this.numberOfPlayer = numberOfPlayer;
        this.numberofPlayerCard = 5;
        this.cardPool = [];
        this.playerHandRanks = [];
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
    getPlayerHandRank(cards) {
        // straightFlush have 4 possibilities: Straight Flush, Flush, Straight and null if doesn't match
        const straightFlush = new player_hand_1.StraightFlush(cards).solve();
        if (straightFlush instanceof player_hand_1.StraightFlush)
            return straightFlush;
        // fourOrThreeOfAKind has 3 possibilities: Four of a Kind, Three of a Kind and null if doesn't match
        const fourOrThreeOfAKind = new player_hand_1.FourOfAKind(cards).solve();
        if (fourOrThreeOfAKind) {
            if (fourOrThreeOfAKind instanceof player_hand_1.FourOfAKind)
                return fourOrThreeOfAKind;
            // check fullHouse has 2 possibilities: Full House, Three of a Kind
            const threeOfAKind = fourOrThreeOfAKind;
            const fullHouseOrThreeOfAKind = new player_hand_1.FullHouse(threeOfAKind.restCards).solve(threeOfAKind);
            if (fullHouseOrThreeOfAKind && fullHouseOrThreeOfAKind instanceof player_hand_1.FullHouse)
                return fullHouseOrThreeOfAKind;
            return (straightFlush || fullHouseOrThreeOfAKind);
        }
        // twoOrOnePair has 3 possibilities: Two Pair, One Pair and null if doesn't match
        const twoOrOnePair = new player_hand_1.TwoPair(cards).solve();
        if (twoOrOnePair)
            return twoOrOnePair;
        return new player_hand_1.HighCard(cards).solve();
    }
    play() {
        const shuffledCardPool = (0, utils_1.arrayShuffle)(this.cardPool);
        for (let i = 1; i <= this.numberOfPlayer; i++) {
            const startCardIndex = (i - 1) * 5;
            const endCardIndex = startCardIndex + 5;
            const playerCards = shuffledCardPool.slice(startCardIndex, endCardIndex);
            const palyerName = `Player ${i}`;
            const playerRank = this.getPlayerHandRank(playerCards);
            this.playerHandRanks.push({
                name: palyerName,
                playerRank
            });
        }
        console.log(this.playerHandRanks);
    }
}
exports.Game = Game;
