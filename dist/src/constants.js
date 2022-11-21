"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAYER_RANKS = exports.RANK_SUITS = exports.PLAYER_RANK = exports.SUITS = exports.RANKS = void 0;
exports.RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
var SUITS;
(function (SUITS) {
    SUITS["Diamonds"] = "Diamonds";
    SUITS["Clubs"] = "Clubs";
    SUITS["Hearts"] = "Hearts";
    SUITS["Spades"] = "Spades";
})(SUITS = exports.SUITS || (exports.SUITS = {}));
var PLAYER_RANK;
(function (PLAYER_RANK) {
    PLAYER_RANK["RoyalFlush"] = "Royal Flush";
    PLAYER_RANK["StraightFlush"] = "Straight Flush";
    PLAYER_RANK["FourOfAKind"] = "Four of a Kind";
    PLAYER_RANK["FullHouse"] = "Full House";
    PLAYER_RANK["Flush"] = "Flush";
    PLAYER_RANK["Straight"] = "Straight";
    PLAYER_RANK["ThreeOfAKind"] = "Three of a Kind";
    PLAYER_RANK["TwoPairs"] = "Two Pairs";
    PLAYER_RANK["OnePair"] = "One Pair";
    PLAYER_RANK["HighCard"] = "High Card";
})(PLAYER_RANK = exports.PLAYER_RANK || (exports.PLAYER_RANK = {}));
exports.RANK_SUITS = [SUITS.Diamonds, SUITS.Clubs, SUITS.Hearts, SUITS.Spades];
exports.PLAYER_RANKS = [
    PLAYER_RANK.HighCard,
    PLAYER_RANK.OnePair,
    PLAYER_RANK.TwoPairs,
    PLAYER_RANK.ThreeOfAKind,
    PLAYER_RANK.Straight,
    PLAYER_RANK.Flush,
    PLAYER_RANK.FullHouse,
    PLAYER_RANK.FourOfAKind,
    PLAYER_RANK.StraightFlush,
    PLAYER_RANK.RoyalFlush,
];
