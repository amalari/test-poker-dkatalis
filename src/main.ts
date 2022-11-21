import { Game } from "./services/game";

const numberOfPlayer = process.argv.slice(2);
const game = new Game(parseInt(numberOfPlayer[0]))
if(!game.validate()) throw new Error('Too many players, please input max 10 player')

game.play()