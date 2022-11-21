"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoPair = void 0;
const constants_1 = require("../../constants");
const OnePair_1 = require("./OnePair");
const PlayerHand_1 = require("./PlayerHand");
class TwoPair extends PlayerHand_1.PlayerHand {
    constructor(cards) {
        const name = constants_1.PLAYER_RANK.TwoPairs;
        super(cards, name);
        this.steps = [OnePair_1.OnePair, OnePair_1.OnePair];
        this.rank = '';
        this.suit = '';
        this.restCards = cards;
    }
    solve(checkingStepResultsBefore) {
        const checkingStepResults = [];
        let cards = this.cards;
        const restSteps = this.steps;
        if (checkingStepResultsBefore) {
            this.rank = checkingStepResultsBefore.rank;
            this.suit = checkingStepResultsBefore.suit;
            const foundIndex = restSteps.findIndex((step) => checkingStepResultsBefore.constructor.name === step.name);
            checkingStepResults[foundIndex] = checkingStepResultsBefore;
            restSteps.slice(foundIndex, 1);
            cards = checkingStepResultsBefore.restCards;
        }
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            const checkOnePair = new step(cards).check();
            checkingStepResults[i] = checkOnePair;
            if (checkOnePair) {
                cards = checkOnePair.restCards;
                if (constants_1.RANKS.indexOf(checkOnePair.rank) > constants_1.RANKS.indexOf(this.rank)) {
                    this.rank = checkOnePair.rank;
                }
                if (constants_1.RANKS.indexOf(checkOnePair.rank) === constants_1.RANKS.indexOf(this.rank)
                    && constants_1.RANK_SUITS.indexOf(checkOnePair.suit) > constants_1.RANK_SUITS.indexOf(this.suit)) {
                    this.suit = checkOnePair.suit;
                }
            }
        }
        if (!checkingStepResults.includes(null))
            return this;
        return checkingStepResults[0] || checkingStepResults[1];
        // return checkingStepResults
    }
}
exports.TwoPair = TwoPair;
