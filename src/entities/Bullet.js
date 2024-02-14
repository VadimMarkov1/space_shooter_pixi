import { Container, Graphics } from "../../lib/pixi.mjs";

export default class Bullet extends Container{

  #speed = 5;
  constructor (x, y) {
    super();
    const skin = new Graphics();
    skin.beginFill(0xff2222);
    skin.drawCircle(0,0,6);
    this.x = x;
    this.y = y;
    this.addChild(skin);
  }

  update () {
    this.y -= this.#speed;
  }

  bossBulletUpdate () {
    this.y += this.#speed;
  }
}