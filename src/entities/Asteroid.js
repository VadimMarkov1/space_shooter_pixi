import { Container, Sprite } from "../../lib/pixi.mjs";

export default class Asteroid extends Container{
  constructor (x, y) {
    super();
    const asteroidView = Sprite.from(`../../assets/asteroids/asteroid${Math.floor(Math.random() * 4) + 1}.png`)
    this.x = x;
    this.y = y;
    asteroidView.width = 50;
    asteroidView.height = 50;
    this.addChild(asteroidView);
  }
}