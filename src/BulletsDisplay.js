import { Container, Text } from "../lib/pixi.mjs";

export default class bulletDisplay extends Container {

  constructor(bulletLeft) {
    super();
    this.bulletLeft = bulletLeft;
    this.bulletLeftText = new Text(`Bullets ${this.bulletLeft}/10`, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
    this.position.set(10, 10);
    this.addChild(this.bulletLeftText);
  }

  update(updateNumber = 1) {
    if (this.bulletLeft > 0) {
      this.bulletLeft -= updateNumber;
      this.bulletLeftText.text = `Bullets ${this.bulletLeft}/10`
    }
  }
}