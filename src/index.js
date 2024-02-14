import * as PIXI from '../lib/pixi.mjs'

import Game from './Game.js';

const pixiApp = new PIXI.Application({
  width: 1280,
  height: 720,
});


document.body.appendChild(pixiApp.view);

const game = new Game(pixiApp)

pixiApp.ticker.add(game.update, game);

document.addEventListener("keydown", (key) => game.onKeyDown(key));
document.addEventListener("keyup", (key) => game.onKeyUp(key));



