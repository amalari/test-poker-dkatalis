"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerHand = void 0;
const Card_1 = require("../../models/Card");
class PlayerHand {
    constructor(cards, name) {
        this.name = name;
        this.cards = typeof cards[0] === "string" ? cards.map((card) => new Card_1.Card(card)) : cards;
    }
    check() {
        return null;
    }
}
exports.PlayerHand = PlayerHand;
// export class Flush extends PlayerHand implements IPlayerHandExt {
//     public restCards: Card[] = []
//     constructor(cards: Card[]) {
//         const name = 'Flush'
//         super(cards, name);
//         this.restCards = cards
//     }
//     public check(): IPlayerHandExt | null {
//         let result = false
//         const suit = this.cards[0].suit
//         for (let j = 1; j < this.cards.length; j++) {
//             let suitMacthed = true
//             if(this.cards[j].suit !== suit) {
//                 suitMacthed = false
//                 j = this.cards.length
//             }
//             if(suitMacthed && j === this.cards.length - 1){
//                 result = true
//             }
//         }
//         return result ? this : null
//     }
//     public solve() : IPlayerHandExt | null {
//         return this.check()
//         // const checkingStepResults: (IPlayerHandExt | null)[] = []
//         // checkingStepResults[0] = this.check()
//         // return checkingStepResults
//     }
// }
// export class Straight extends PlayerHand implements IPlayerHandExt {
//     public highestCard: Card | null = null
//     public restCards: Card[]
//     constructor(cards: Card[]) {
//         const name = 'Straight'
//         super(cards, name);
//         this.restCards = cards
//     }
//     public check(): IPlayerHandExt | null {
//         let result = true
//         let aceCard : Card | null = null
//         const sortedCards = this.cards
//             .filter((card) => {
//                 if(card.rank === 'Ace'){
//                     aceCard = card
//                     return false
//                 }
//                 return true
//             })
//             .sort((cardA, cardB) => {
//                 return (cardA.value as number) - (cardB.value as number)
//             })
//         if(sortedCards.length < 4) return null
//         for (let i = 0; i < sortedCards.length - 1; i++) {
//             const cardValue = sortedCards[i].value as number;
//             const nextCardValue = sortedCards[i+1].value as number;
//             if(nextCardValue - cardValue > 1){
//                 result = false
//                 i = sortedCards.length
//             }
//         }
//         if(result && aceCard){
//             result = false
//             if(sortedCards[sortedCards.length - 1].value === 3){
//                 this.highestCard = sortedCards[sortedCards.length - 1]
//                 result = true
//             }
//             if(sortedCards[sortedCards.length - 1].value === 11){
//                 this.highestCard = aceCard
//                 result = true
//             }
//         }
//         return result ? (this as IPlayerHandExt) : null
//     }
//     public solve() : IPlayerHandExt | null {
//         return this.check()
//         // const checkingStepResults: (IPlayerHandExt | null)[] = []
//         // checkingStepResults[0] = this.check()
//         // return checkingStepResults
//     }
// }
// export class StraightFlush extends PlayerHand implements IPlayerHandExt {
//     private steps = [Flush, Straight]
//     public restCards: Card[]
//     constructor(cards: Card[]) {
//         const name = 'Straight Flush'
//         super(cards, name);
//         this.restCards = cards
//     }
//     public solve() : IPlayerHandExt | null {
//         const checkingStepResults: (IPlayerHandExt | null)[] = []
//         for (let i = 0; i < this.steps.length; i++) {
//             const step = this.steps[i];
//             const playerHandStep = new step(this.cards)
//             checkingStepResults[i] = playerHandStep.check()
//             if(checkingStepResults[i]?.name === 'Straight' && (checkingStepResults[i] as Straight)?.highestCard?.rank === 'Ace'){
//                 this.name = 'Royal Flush'
//             }
//         }
//         if(!checkingStepResults.includes(null)) return (this as StraightFlush)
//         return checkingStepResults[0] || checkingStepResults[1]
//         // return checkingStepResults
//     }
// }
// export class ThreeOfAKind extends PlayerHand implements IPlayerHandExt {
//     public rank = ''
//     public restCards: Card[]
//     private cardValueMappers: {[key: string]: number} = {}
//     constructor(cards: Card[]) {
//         const name = 'Three of a Kind'
//         super(cards, name);
//         this.restCards = cards
//     }
//     public check() : IPlayerHandExt | null {
//         let result = false
//         const cardValueMappers: {[key: string]: number} = {}
//         for (let i = 0; i < this.cards.length; i++) {
//             const card = this.cards[i];
//             if(cardValueMappers[card.rank]){
//                 cardValueMappers[card.rank] += 1
//                 if(cardValueMappers[card.rank] === 3){
//                     result = true
//                     this.rank = card.rank
//                     let duplicateRankCounter = 0
//                     this.restCards = this.cards.filter((restCard) => {
//                         if(restCard.rank === card.rank) duplicateRankCounter++
//                         return restCard.rank !== card.rank || duplicateRankCounter > 3
//                     })
//                 }
//             } else {
//                 cardValueMappers[card.rank] = 1
//             }
//         }
//         this.cardValueMappers = cardValueMappers
//         return result ? (this as IPlayerHandExt) : null
//     }
//     public isFourKind() : boolean {
//         let highestKindCount = 0
//         for (const key in this.cardValueMappers) {
//             highestKindCount = highestKindCount > this.cardValueMappers[key] 
//                 ? highestKindCount : this.cardValueMappers[key]
//         }
//         return highestKindCount === 4
//     }
//     public solve() : IPlayerHandExt | null {
//         return this.check()
//         // const checkingStepResults: (IPlayerHandExt | null)[] = []
//         // checkingStepResults[0] = this.check()
//         // return checkingStepResults
//     }
// }
// export class FourOfAKind extends PlayerHand implements IPlayerHandExt {
//     public rank = ''
//     public restCards: Card[]
//     constructor(cards: Card[]) {
//         const name = 'Four of a Kind'
//         super(cards, name);
//         this.restCards = cards
//     }
//     public solve(checkingStepResultsBefore?: IPlayerHandExt) : IPlayerHandExt | null {
//         const threeOfAKindCheck = checkingStepResultsBefore || new ThreeOfAKind(this.cards).check()
//         if(threeOfAKindCheck){
//             if(threeOfAKindCheck && threeOfAKindCheck.isFourKind && threeOfAKindCheck.isFourKind()){
//                 this.rank = threeOfAKindCheck.rank as string
//                 return (this as IPlayerHandExt)
//             } else {
//                 this.restCards = threeOfAKindCheck.restCards
//                 return threeOfAKindCheck
//             }
//         }
//         return null
//     }
//     // public solve(checkingStepResultsBefore?: IPlayerHandExt) : IPlayerHandExt | null {
//     //     return this.check()
//     //     // const checkingStepResults: (IPlayerHandExt | null)[] = []
//     //     // checkingStepResults[0] = this.check()
//     //     // return checkingStepResults
//     // }
// }
// export class FullHouse extends PlayerHand implements IPlayerHandExt {
//     private steps : (typeof ThreeOfAKind | typeof OnePair | null)[] = [ThreeOfAKind, OnePair]
//     public rank = ''
//     public restCards: Card[]
//     constructor(cards: Card[]) {
//         const name = 'Full House'
//         super(cards, name);
//         this.restCards = cards
//     }
//     public solve(checkingStepResultsBefore?: IPlayerHandExt) : IPlayerHandExt | null {
//         const checkingStepResults: (IPlayerHandExt | null)[] = []
//         let cards = this.cards
//         const restSteps = this.steps
//         if(checkingStepResultsBefore){
//             const foundIndex = restSteps.findIndex((step) => checkingStepResultsBefore.constructor.name === step?.name)
//             checkingStepResults[foundIndex] = checkingStepResultsBefore
//             restSteps[foundIndex] = null
//             cards = checkingStepResultsBefore.restCards
//         }
//         for (let i = 0; i < restSteps.length; i++) {
//             const step = this.steps[i]
//             if(step !== null){
//                 checkingStepResults[i] = new step(cards).check()
//                 if(checkingStepResults[i]){
//                     cards = (checkingStepResults[i] as ThreeOfAKind | OnePair)?.restCards
//                 }    
//             }
//         }
//         if(!checkingStepResults.includes(null)) return (this as FullHouse)
//         return checkingStepResults[0] || checkingStepResults[1]
//     }
// }
// export class OnePair extends PlayerHand implements IPlayerHandExt {
//     public restCards: Card[]
//     public rank = ''
//     constructor(cards: Card[]) {
//         const name = 'One Pair'
//         super(cards, name);
//         this.restCards = cards
//     }
//     public check() : IPlayerHandExt | null {
//         let result = false
//         const pairIndexs: number[] = []
//         const cardRanks = this.cards.map((card) => card.rank )
//         for (let i = 0; i < cardRanks.length; i++) {
//             const duplicateCardRanks = [...cardRanks]
//             duplicateCardRanks[i] = 'null'
//             const foundDuplicateRankIndex = duplicateCardRanks.indexOf(cardRanks[i])
//             if(foundDuplicateRankIndex > -1){
//                 pairIndexs.push(i)
//                 pairIndexs.push(foundDuplicateRankIndex)
//                 this.rank = cardRanks[i]
//                 i = cardRanks.length
//                 result = true
//                 this.restCards = this.cards.filter((card, index) => !pairIndexs.includes(index))
//             }
//         }
//         return result ? (this as unknown as IPlayerHandExt) : null
//     }
//     public solve() : IPlayerHandExt | null {
//         return this.check()
//         // const checkingStepResults: (IPlayerHandExt | null)[] = []
//         // checkingStepResults[0] = this.check()
//         // return checkingStepResults
//     }
// }
// export class TwoPair extends PlayerHand implements IPlayerHandExt {
//     private steps = [OnePair, OnePair]
//     public rank = ''
//     public restCards: Card[]
//     constructor(cards: Card[]) {
//         const name = 'Two Pair'
//         super(cards, name);
//         this.restCards = cards
//     }
//     public solve(checkingStepResultsBefore?: IPlayerHandExt) : IPlayerHandExt | null {
//         const checkingStepResults: (IPlayerHandExt | null)[] = []
//         let cards = this.cards
//         const restSteps = this.steps
//         if(checkingStepResultsBefore){
//             const foundIndex = restSteps.findIndex((step) => checkingStepResultsBefore.constructor.name === step.name)
//             checkingStepResults[foundIndex] = checkingStepResultsBefore
//             restSteps.slice(foundIndex, 1)
//             cards = checkingStepResultsBefore.restCards
//         }
//         for (let i = 0; i < this.steps.length; i++) {
//             const step = this.steps[i]
//             const checkOnePair = new step(cards).check()
//             checkingStepResults[i] = checkOnePair
//             if(checkOnePair){
//                 cards = (checkOnePair as OnePair).restCards
//             }
//         }
//         if(!checkingStepResults.includes(null)) return (this as TwoPair)
//         return checkingStepResults[0] || checkingStepResults[1]
//         // return checkingStepResults
//     }
// }
// export class HighCard extends PlayerHand implements IPlayerHandExt {
//     public rank = ''
//     public restCards: Card[]
//     constructor(cards: Card[]) {
//         const name = 'High Card'
//         super(cards, name);
//         this.restCards = cards
//     }
//     public solve() : IPlayerHandExt | null {
//         const sortedCards = this.cards
//             .sort((cardA, cardB) => {
//                 const cardAValue = Array.isArray(cardA.value) ? cardA.value[1] : cardA.value
//                 const cardBValue = Array.isArray(cardB.value) ? cardB.value[1] : cardB.value
//                 return cardAValue - cardBValue
//             })
//         this.rank = sortedCards[sortedCards.length - 1].rank
//         return this
//     }
// }
