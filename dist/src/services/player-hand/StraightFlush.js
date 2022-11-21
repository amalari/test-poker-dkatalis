"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StraightFlush = void 0;
const constants_1 = require("../../constants");
const Flush_1 = require("./Flush");
const PlayerHand_1 = require("./PlayerHand");
const Straight_1 = require("./Straight");
class StraightFlush extends PlayerHand_1.PlayerHand {
    constructor(cards) {
        const name = constants_1.PLAYER_RANK.StraightFlush;
        super(cards, name);
        this.steps = [Flush_1.Flush, Straight_1.Straight];
        this.suit = '';
        this.rank = '';
        this.restCards = cards;
    }
    greaterThan(data) {
        return PlayerHand_1.PlayerHand.greaterThan(this, data);
    }
    solve() {
        var _a, _b, _c, _d;
        const checkingStepResults = [];
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            const playerHandStep = new step(this.cards);
            checkingStepResults[i] = playerHandStep.check();
            if (((_a = checkingStepResults[i]) === null || _a === void 0 ? void 0 : _a.name) === 'Flush') {
                this.suit = (_b = checkingStepResults[i]) === null || _b === void 0 ? void 0 : _b.suit;
            }
            if (((_c = checkingStepResults[i]) === null || _c === void 0 ? void 0 : _c.name) === 'Straight') {
                const rank = (_d = checkingStepResults[i]) === null || _d === void 0 ? void 0 : _d.rank;
                this.rank = rank;
                if (rank === 'Ace')
                    this.name = 'Royal Flush';
            }
        }
        if (!checkingStepResults.includes(null))
            return this;
        return checkingStepResults[0] || checkingStepResults[1];
    }
}
exports.StraightFlush = StraightFlush;
