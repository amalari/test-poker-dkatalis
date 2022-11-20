"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighCard = exports.TwoPair = exports.OnePair = exports.FullHouse = exports.FourOfAKind = exports.ThreeOfAKind = exports.StraightFlush = exports.Straight = exports.Flush = exports.PlayerHand = void 0;
const Card_1 = require("../../models/Card");
class PlayerHand {
    constructor(cards, name) {
        this.playerName = '';
        this.name = name;
        this.cards = typeof cards[0] === "string" ? cards.map((card) => new Card_1.Card(card)) : cards;
    }
    check() {
        return null;
    }
}
exports.PlayerHand = PlayerHand;
class Flush extends PlayerHand {
    constructor(cards) {
        const name = 'Flush';
        super(cards, name);
        this.restCards = [];
    }
    check() {
        let result = false;
        const suit = this.cards[0].suit;
        for (let j = 1; j < this.cards.length; j++) {
            let suitMacthed = true;
            if (this.cards[j].suit !== suit) {
                suitMacthed = false;
                j = this.cards.length;
            }
            if (suitMacthed && j === this.cards.length - 1) {
                result = true;
            }
        }
        return result ? this : null;
    }
    solve() {
        const checkingStepResults = [];
        checkingStepResults[0] = this.check();
        return checkingStepResults;
    }
}
exports.Flush = Flush;
class Straight extends PlayerHand {
    constructor(cards) {
        const name = 'Straight';
        super(cards, name);
        this.highestCard = null;
        this.restCards = cards;
    }
    check() {
        let result = true;
        let aceCard = null;
        const sortedCards = this.cards
            .filter((card) => {
            if (card.rank === 'Ace') {
                aceCard = card;
                return false;
            }
            return true;
        })
            .sort((cardA, cardB) => {
            return cardB.value - cardA.value;
        });
        if (sortedCards.length < 4)
            return null;
        for (let i = 0; i < sortedCards.length - 1; i++) {
            const cardValue = sortedCards[i].value;
            const nextCardValue = sortedCards[i + 1].value;
            if (nextCardValue - cardValue > 1) {
                result = false;
                i = sortedCards.length;
            }
        }
        if (result && aceCard) {
            result = false;
            if (sortedCards[sortedCards.length - 1].value === 3) {
                this.highestCard = sortedCards[sortedCards.length - 1];
                result = true;
            }
            if (sortedCards[sortedCards.length - 1].value === 11) {
                this.highestCard = aceCard;
                result = true;
            }
        }
        return result ? this : null;
    }
    solve() {
        const checkingStepResults = [];
        checkingStepResults[0] = this.check();
        return checkingStepResults;
    }
}
exports.Straight = Straight;
class StraightFlush extends PlayerHand {
    constructor(cards) {
        const name = 'Straight Flush';
        super(cards, name);
        this.steps = [Flush, Straight];
        this.restCards = cards;
    }
    solve() {
        var _a, _b, _c;
        const checkingStepResults = [];
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            const playerHandStep = new step(this.cards);
            checkingStepResults[i] = playerHandStep.check();
            if (((_a = checkingStepResults[i]) === null || _a === void 0 ? void 0 : _a.name) === 'Straight' && ((_c = (_b = checkingStepResults[i]) === null || _b === void 0 ? void 0 : _b.highestCard) === null || _c === void 0 ? void 0 : _c.rank) === 'Ace') {
                this.name = 'Royal Flush';
            }
        }
        return checkingStepResults;
    }
}
exports.StraightFlush = StraightFlush;
class ThreeOfAKind extends PlayerHand {
    constructor(cards) {
        const name = 'Three of a Kind';
        super(cards, name);
        this.rank = '';
        this.cardValueMappers = {};
        this.restCards = cards;
    }
    check() {
        let result = false;
        const cardValueMappers = {};
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            if (cardValueMappers[card.rank]) {
                cardValueMappers[card.rank] += 1;
                if (cardValueMappers[card.rank] === 3) {
                    result = true;
                    this.rank = card.rank;
                    let duplicateRankCounter = 0;
                    this.restCards = this.cards.filter((restCard) => {
                        if (restCard.rank === card.rank)
                            duplicateRankCounter++;
                        return restCard.rank !== card.rank || duplicateRankCounter >= 3;
                    });
                }
            }
            else {
                cardValueMappers[card.rank] = 1;
            }
        }
        this.cardValueMappers = cardValueMappers;
        return result ? this : null;
    }
    isFourKind() {
        let highestKindCount = 0;
        for (const key in this.cardValueMappers) {
            highestKindCount = highestKindCount > this.cardValueMappers[key]
                ? highestKindCount : this.cardValueMappers[key];
        }
        return highestKindCount === 4;
    }
    solve() {
        const checkingStepResults = [];
        checkingStepResults[0] = this.check();
        return checkingStepResults;
    }
}
exports.ThreeOfAKind = ThreeOfAKind;
class FourOfAKind extends PlayerHand {
    constructor(cards) {
        const name = 'Four of a Kind';
        super(cards, name);
        this.rank = '';
        this.restCards = cards;
    }
    check() {
        const threeOfAKindCheck = new ThreeOfAKind(this.cards).check();
        if (threeOfAKindCheck && threeOfAKindCheck.isFourKind && threeOfAKindCheck.isFourKind()) {
            this.rank = threeOfAKindCheck.rank;
            return this;
        }
        return null;
    }
    solve() {
        const checkingStepResults = [];
        checkingStepResults[0] = this.check();
        return checkingStepResults;
    }
}
exports.FourOfAKind = FourOfAKind;
class FullHouse extends PlayerHand {
    constructor(cards) {
        const name = 'Full House';
        super(cards, name);
        this.steps = [ThreeOfAKind, OnePair];
        this.rank = '';
        this.restCards = cards;
    }
    solve() {
        var _a;
        const checkingStepResults = [];
        let cards = this.cards;
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            checkingStepResults[i] = new step(cards).check();
            if (checkingStepResults[i]) {
                cards = (_a = checkingStepResults[i]) === null || _a === void 0 ? void 0 : _a.restCards;
            }
        }
        return checkingStepResults;
    }
}
exports.FullHouse = FullHouse;
class OnePair extends PlayerHand {
    constructor(cards) {
        const name = 'One Pair';
        super(cards, name);
        this.rank = '';
        this.restCards = cards;
    }
    check() {
        let result = false;
        const pairIndexs = [];
        const cardRanks = this.cards.map((card) => card.rank);
        for (let i = 0; i < cardRanks.length; i++) {
            const duplicateCardRanks = [...cardRanks];
            duplicateCardRanks[i] = 'null';
            const foundDuplicateRankIndex = duplicateCardRanks.indexOf(cardRanks[i]);
            if (foundDuplicateRankIndex > -1) {
                pairIndexs.push(i);
                pairIndexs.push(foundDuplicateRankIndex);
                this.rank = cardRanks[i];
                i = cardRanks.length;
                result = true;
                this.restCards = this.cards.filter((card, index) => !pairIndexs.includes(index));
            }
        }
        return result ? this : null;
    }
    solve() {
        const checkingStepResults = [];
        checkingStepResults[0] = this.check();
        return checkingStepResults;
    }
}
exports.OnePair = OnePair;
class TwoPair extends PlayerHand {
    constructor(cards) {
        const name = 'Two Pair';
        super(cards, name);
        this.steps = [OnePair, OnePair];
        this.rank = '';
        this.restCards = cards;
    }
    solve() {
        const checkingStepResults = [];
        let cards = this.cards;
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            const checkOnePair = new step(cards).check();
            if (checkOnePair) {
                checkingStepResults[i] = checkOnePair;
                cards = checkOnePair.restCards;
            }
        }
        return checkingStepResults;
    }
}
exports.TwoPair = TwoPair;
class HighCard extends PlayerHand {
    constructor(cards) {
        const name = 'High Card';
        super(cards, name);
        this.rank = '';
        this.restCards = cards;
    }
    solve() {
        const checkingStepResults = [];
        const sortedCards = this.cards
            .sort((cardA, cardB) => {
            const cardAValue = Array.isArray(cardA.value) ? cardA.value[1] : cardA.value;
            const cardBValue = Array.isArray(cardB.value) ? cardB.value[1] : cardB.value;
            return cardBValue - cardAValue;
        });
        this.rank = sortedCards[sortedCards.length - 1].rank;
        checkingStepResults[0] = this;
        return checkingStepResults;
    }
}
exports.HighCard = HighCard;
