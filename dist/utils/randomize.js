"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayShuffle = void 0;
const arrayShuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};
exports.arrayShuffle = arrayShuffle;
