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
        this.sortedPlayerHandRanks = [];
        this.winner = null;
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
        return (this.cardPool.length / this.numberOfPlayer) >= 5 && this.numberOfPlayer > 1 ? true : false;
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
    findTheWinner() {
        this.sortedPlayerHandRanks = [...this.playerHandRanks].sort((playerHandRankA, playerHandRankB) => {
            return playerHandRankB.playerRank.greaterThan(playerHandRankA.playerRank) ? 1 : -1;
        });
        this.winner = this.sortedPlayerHandRanks[0];
    }
    announceWinner() {
        for (let i = 0; i < this.playerHandRanks.length; i++) {
            const player = this.playerHandRanks[i];
            const playerCard = player.playerRank.cards.map((card) => card.toString());
            if (player.playerRank.name === constants_1.PLAYER_RANK.HighCard) {
                console.log(`${player.name}: ${player.playerRank.name} with highest card ${player.playerRank.rank} ${player.playerRank.suit} (${playerCard})`);
            }
            else {
                console.log(`${player.name}: ${player.playerRank.name} (${playerCard})`);
            }
        }
        const winner = this.sortedPlayerHandRanks[0];
        const winnerCard = winner.playerRank.cards.map((card) => card.toString());
        console.log('\n');
        console.log("==== The Winner is =====", '\n');
        if (winner.playerRank.name === constants_1.PLAYER_RANK.HighCard) {
            console.log(`${winner.name}: ${winner.playerRank.name} with highest card ${winner.playerRank.rank} ${winner.playerRank.suit} (${winnerCard})`);
        }
        else {
            console.log(`${winner.name}: ${winner.playerRank.name} (${winnerCard})`);
        }
        console.log('\n');
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
        this.findTheWinner();
        this.announceWinner();
    }
}
exports.Game = Game;
