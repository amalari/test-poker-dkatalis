"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerHand = void 0;
const constants_1 = require("../../constants");
const Card_1 = require("../../models/Card");
class PlayerHand {
    constructor(cards, name) {
        this.name = name;
        this.cards = typeof cards[0] === "string" ? cards.map((card) => new Card_1.Card(card)) : cards;
    }
    check() {
        return null;
    }
    static greaterThan(selfData, data) {
        const selfDataPlayerRank = constants_1.PLAYER_RANKS.indexOf(selfData.name);
        const dataPlayerRank = constants_1.PLAYER_RANKS.indexOf(data.name);
        if (selfDataPlayerRank !== dataPlayerRank)
            return selfDataPlayerRank > dataPlayerRank;
        switch (selfData.name) {
            // compare suit only
            case constants_1.PLAYER_RANK.RoyalFlush: {
                return constants_1.RANK_SUITS.indexOf(selfData.suit) > constants_1.RANK_SUITS.indexOf(data.suit);
            }
            // compare suit first and then rank
            case constants_1.PLAYER_RANK.StraightFlush:
            case constants_1.PLAYER_RANK.FullHouse:
            case constants_1.PLAYER_RANK.Flush: {
                const rankSelfSuit = constants_1.RANK_SUITS.indexOf(selfData.suit);
                const rangkComparingSuit = constants_1.RANK_SUITS.indexOf(data.suit);
                if (rankSelfSuit !== rangkComparingSuit)
                    return rankSelfSuit > rangkComparingSuit;
                const rankSelfRank = constants_1.RANKS.indexOf(selfData.rank);
                const rangkComparingRank = constants_1.RANKS.indexOf(data.rank);
                return rankSelfRank > rangkComparingRank;
            }
            // compare rank only
            case constants_1.PLAYER_RANK.FourOfAKind:
            case constants_1.PLAYER_RANK.ThreeOfAKind: {
                return constants_1.RANKS.indexOf(selfData.rank) > constants_1.RANKS.indexOf(data.rank);
            }
            // compare rank first and then suit
            case constants_1.PLAYER_RANK.Straight:
            case constants_1.PLAYER_RANK.TwoPairs:
            case constants_1.PLAYER_RANK.OnePair:
            case constants_1.PLAYER_RANK.HighCard: {
                const rankSelfRank = constants_1.RANKS.indexOf(selfData.rank);
                const rankComparingRank = constants_1.RANKS.indexOf(data.rank);
                if (rankSelfRank !== rankComparingRank)
                    return rankSelfRank > rankComparingRank;
                const rankSelfSuit = constants_1.RANK_SUITS.indexOf(selfData.suit);
                const rankComparingSuit = constants_1.RANK_SUITS.indexOf(data.suit);
                return rankSelfSuit > rankComparingSuit;
            }
        }
        return false;
    }
}
exports.PlayerHand = PlayerHand;
