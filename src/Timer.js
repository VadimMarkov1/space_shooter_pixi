import { Container, Text } from "../lib/pixi.mjs";

export default class Timer extends Container{

  constructor (time) {
    super();
    this.time = time;
    this.timerText = new Text(`${this.time}`, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
    this.position.set(1240, 10);
    this.addChild(this.timerText);
  }

  update () {
    if (this.time>0) {
      this.time --;
      this.timerText.text = `${this.time}`
    } 
  }
}