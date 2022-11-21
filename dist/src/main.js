"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./services/game");
const game = new game_1.Game(5);
if (!game.validate())
    throw new Error('Too many players, please input max 10 player');
game.play();
