"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./services/game");
const numberOfPlayer = process.argv.slice(2);
const game = new game_1.Game(parseInt(numberOfPlayer[0]));
if (!game.validate())
    throw new Error('Too many players, please input max 10 player');
game.play();
