"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullHouse = void 0;
const constants_1 = require("../../constants");
const OnePair_1 = require("./OnePair");
const PlayerHand_1 = require("./PlayerHand");
const ThreeOfAKind_1 = require("./ThreeOfAKind");
class FullHouse extends PlayerHand_1.PlayerHand {
    constructor(cards) {
        const name = constants_1.PLAYER_RANK.FullHouse;
        super(cards, name);
        this.steps = [ThreeOfAKind_1.ThreeOfAKind, OnePair_1.OnePair];
        this.rank = '';
        this.suit = '';
        this.restCards = cards;
    }
    greaterThan(data) {
        return PlayerHand_1.PlayerHand.greaterThan(this, data);
    }
    solve(checkingStepResultsBefore) {
        var _a, _b, _c;
        const checkingStepResults = [];
        let cards = this.cards;
        const restSteps = this.steps;
        if (checkingStepResultsBefore) {
            this.suit = checkingStepResultsBefore.suit;
            this.rank = checkingStepResultsBefore.rank;
            const foundIndex = restSteps.findIndex((step) => checkingStepResultsBefore.constructor.name === (step === null || step === void 0 ? void 0 : step.name));
            checkingStepResults[foundIndex] = checkingStepResultsBefore;
            restSteps[foundIndex] = null;
            cards = checkingStepResultsBefore.restCards;
        }
        for (let i = 0; i < restSteps.length; i++) {
            const step = this.steps[i];
            if (step !== null) {
                checkingStepResults[i] = new step(cards).check();
                if (checkingStepResults[i]) {
                    if (step === ThreeOfAKind_1.ThreeOfAKind) {
                        this.suit = (_a = checkingStepResults[i]) === null || _a === void 0 ? void 0 : _a.suit;
                        this.rank = (_b = checkingStepResults[i]) === null || _b === void 0 ? void 0 : _b.rank;
                    }
                    cards = (_c = checkingStepResults[i]) === null || _c === void 0 ? void 0 : _c.restCards;
                }
            }
        }
        if (!checkingStepResults.includes(null))
            return this;
        return checkingStepResults[0] || checkingStepResults[1];
    }
}
exports.FullHouse = FullHouse;
