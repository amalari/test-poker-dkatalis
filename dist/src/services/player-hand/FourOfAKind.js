"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FourOfAKind = void 0;
const constants_1 = require("../../constants");
const PlayerHand_1 = require("./PlayerHand");
const ThreeOfAKind_1 = require("./ThreeOfAKind");
class FourOfAKind extends PlayerHand_1.PlayerHand {
    constructor(cards) {
        const name = constants_1.PLAYER_RANK.FourOfAKind;
        super(cards, name);
        this.rank = '';
        this.suit = '';
        this.restCards = cards;
    }
    solve(checkingStepResultsBefore) {
        const threeOfAKindCheck = checkingStepResultsBefore || new ThreeOfAKind_1.ThreeOfAKind(this.cards).check();
        if (threeOfAKindCheck) {
            if (threeOfAKindCheck && threeOfAKindCheck.isFourKind && threeOfAKindCheck.isFourKind()) {
                this.rank = threeOfAKindCheck.rank;
                return this;
            }
            else {
                this.restCards = threeOfAKindCheck.restCards;
                return threeOfAKindCheck;
            }
        }
        return null;
    }
}
exports.FourOfAKind = FourOfAKind;
