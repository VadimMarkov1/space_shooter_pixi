import { Sprite, TextStyle, Text, Graphics } from "../lib/pixi.mjs";
import EntityFactory from "./entities/EntityFactory.js";
import Timer from "./Timer.js";
import bulletDisplay from "./BulletsDisplay.js";
import Level1 from "./levels/Level1.js";
import Level2 from "./levels/Level2.js";

export default class Game {
  
  #bullets = [];
  #currentLevel = 'level1'
  #bullet_count = 0;

  constructor (pixiApp) {
    this.pixiApp = pixiApp;
    const back = Sprite.from('../assets/space.png');
    back.width = 1280;
    this.pixiApp.stage.addChild(back);
    this.entityFactory = new EntityFactory();
    this.level = new Level1(this.pixiApp);
    this.playerShip = this.entityFactory.createPlayerShip();
    this.pixiApp.stage.addChild(this.playerShip);
    this.timer = new Timer(60);
    this.pixiApp.stage.addChild(this.timer);
    this.bulletDisplay = new bulletDisplay(10);
    this.pixiApp.stage.addChild(this.bulletDisplay);
    this.lastUpdateTime = performance.now();
    this.randomBossDistance = Math.floor(Math.random() * 1200);
    this.lastUpdateTimeBoss = performance.now();
  }

  onKeyDown (key) {
    if (key.code === 'ArrowLeft' && this.playerShip.x > this.playerShip.width/2) {
      this.playerShip.flyLeft();
    }
    
    if (key.code === 'ArrowRight' && this.playerShip.x < 1280 - this.playerShip.width/2) {
      this.playerShip.flyRight();
    }

    if (key.code === 'Space' && this.playerShip.canShoot && this.#bullet_count < 10) {
      const bullet = this.entityFactory.createBullet(this.playerShip.x + this.playerShip.width/2, this.playerShip.y - 10);
      this.#bullets.push(bullet);
      this.bulletDisplay.update();
      this.playerShip.canShoot = false;
      this.#bullet_count ++;
    }
  }

  onKeyUp (key) {
    if (key.code === 'ArrowLeft') {
      this.playerShip.stopFlyLeft();
    }
    
    if (key.code === 'ArrowRight') {
      this.playerShip.stopFlyRight();
    }
    if (key.code === 'Space') {
      this.playerShip.canShoot = true;
    }
  }

  update () {
    this.playerShip.update();

    this.playerShip.update();
    for (let i = 0; i < this.#bullets.length; i++) {
      this.pixiApp.stage.addChild(this.#bullets[i]);
      this.#bullets[i].update();
      if (this.#bullets[i].y < 0) {
        this.#bullets[i].removeFromParent();
        this.#bullets.splice(i, 1);
      }
    }
    if (this.#currentLevel === 'level1') {
      this.level.checkAsteroidHit(this.isCheckColision, this.#bullets)
    }
    const now = performance.now();
    const elapsed = now - this.lastUpdateTime;
    const elapsedBoss = now - this.lastUpdateTimeBoss;

    if (elapsed >= 1000) {
      this.timer.update(); 
      this.lastUpdateTime = now; 
    }
    if (elapsedBoss >= 6000) {
      this.randomBossDistance = Math.floor(Math.random() * 1200);
      this.lastUpdateTimeBoss = now; 
    }  
    this.checkGameStatus();
    if (this.#currentLevel === 'level2') {
      this.level.boss.fly(this.randomBossDistance);
      this.level.runBossFire()
      this.level.checkBossHit(this.isCheckColision, this.#bullets);
      this.level.checkPlayerHit(this.isCheckColision, this.playerShip);
    }
  }

  checkGameStatus(){

    if(this.#currentLevel === 'level1'){
      if (this.level.asteroids.length === 0) {
        this.pixiApp.stage.removeFromParent();
        this.switchLevel();
      }
      if ((this.bulletDisplay.bulletLeft === 0 && this.#bullets.length === 0) || this.timer.time === 0) {
        this.gameOver('defeat');
      }
        
    } else if (this.#currentLevel === 'level2') {
      if ((this.bulletDisplay.bulletLeft === 0 && this.#bullets.length === 0) || this.timer.time === 0 || this.playerShip.isDead) {
        this.level.bossFire.length = 0;
        this.gameOver('defeat');
      }
      if (this.level.boss.healthSegments === 0) {
        this.level.bossFire.length = 0;
        this.gameOver('victory');
      }

    }
  }

  gameOver (result) {
    this.pixiApp.stage.removeChildren();
    this.pixiApp.ticker.autoStart = false;
    this.pixiApp.ticker.stop();
    if (result === 'victory') {
      this.showEndGame('YOU WIN', [0xffffff, 0x008000], 0xadd8e6);
    } else if (result === 'defeat') {
      this.showEndGame('YOU LOSE', [0xffffff, 0xdd0000], 0x808080);
    }
  }

  showEndGame(finalText, color, backgroundColor){
    const style = new TextStyle({
        fontFamily: "Arial",
        fontSize: 50,
        fill: color,
        stroke: 0x000000,
        strokeThickness: 5,
        letterSpacing: 30,
    })

    const background = new Graphics();
    background.beginFill(backgroundColor); 
    background.drawRect(0, 0, this.pixiApp.screen.width, this.pixiApp.screen.height);
    background.endFill();
    this.pixiApp.stage.addChild(background);

    const text = new Text(finalText, style);
    text.x = this.pixiApp.screen.width/2 - text.width/2;
    text.y = this.pixiApp.screen.height/2 - text.height/2;
    this.pixiApp.stage.addChild(text);
}

  switchLevel () {
      this.#currentLevel = 'level2'
      this.level = new Level2(this.pixiApp);
      this.bulletDisplay.bulletLeft = 10;
      this.#bullet_count = 0;
      this.bulletDisplay.update(0);
      this.timer.time = 60;
  }

  isCheckColision(entity1, entity2) {
    return (entity1.x < entity2.x + entity2.width &&
        entity1.x + entity1.width > entity2.x &&
        entity1.y < entity2.y + entity2.height &&
        entity1.y + entity1.height > entity2.y);
  }
}