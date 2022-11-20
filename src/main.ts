import { SUITS } from "./constants";
import { Flush, PlayerHand } from "./services";
import { Game } from "./services/game";

const game = new Game(5)
if(!game.validate()) throw new Error('Too many players, please input max 10 player')

game.play()