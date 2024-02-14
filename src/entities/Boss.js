import { Container, Sprite, Graphics } from "../../lib/pixi.mjs";
import EntityFactory from "./EntityFactory.js";


export default class Boss extends Container{
  
  #speed = 1;

  constructor () {
    super();
    this.bossShipView = Sprite.from('../../assets/boss_ship.png');
    this.healthSegments = 4;
    this.bossShipView.width = 108;
    this.bossShipView.height = 92;
    this.x = 540;
    this.y = 50;
    this.addChild(this.bossShipView);
    this.healthList = []; 
    this.drawHealthBar();
  }

  drawHealthBar() {
    for (let i = 0; i < this.healthSegments; i++) {
      const healthSegment = new Graphics();
      healthSegment.lineStyle(1, 0x000000);
      healthSegment.beginFill(0x00FF00);
      healthSegment.drawRect(0, -20, 26, 10);
      healthSegment.endFill();
      healthSegment.x = 26 * i
      this.healthList.push(healthSegment);
      this.addChild(healthSegment);
    }

  }

  decreaseHealth() {
      this.healthSegments --; 
      this.healthList.forEach((item)=>{this.removeChild(item)});
      console.log(this.healthSegments);
      this.drawHealthBar();
    }

  fly (randomDistance) {
    if (this.x > randomDistance) {
      this.x -= this.#speed;
    } else {
      this.x += this.#speed;
  }
}

  fire () {
    const bullets = [];
    setInterval(() => {
      const newEntityFactoryInstance = new EntityFactory();
      const bullet = newEntityFactoryInstance.createBullet(this.x + this.width/2, this.y + this.height);
      bullets.push(bullet);
  }, 2000);
  return bullets;
  }
}