import EntityFactory from "../entities/EntityFactory.js";


export default class Level2 {

  constructor (pixiApp) {
    this.pixiApp = pixiApp;
    this.entityFactory = new EntityFactory();
    this.boss = this.entityFactory.createBoss();
    this.lastUpdateTimeBoss = performance.now();
    this.bossFire = this.boss.fire();  
    this.pixiApp.stage.addChild(this.boss);
  }

  checkBossHit (isCheckColision, bullets) {
    for (let j = 0; j < bullets.length; j++) {
      if (isCheckColision(this.boss, bullets[j])) {
        this.boss.decreaseHealth();
        bullets[j].removeFromParent();
        bullets.splice(j, 1);
        break
      }
      for (let i = 0; i < this.bossFire.length; i++) {
        if (isCheckColision(this.bossFire[i], bullets[j])) {
          bullets[j].removeFromParent();
          bullets.splice(j, 1);
          this.bossFire[i].removeFromParent();
          this.bossFire.splice(i, 1);
          break 
      }
      }
    }
  }

  checkPlayerHit(isCheckColision, player) {
    for (let i = 0; i < this.bossFire.length; i++) {
      if (isCheckColision(this.bossFire[i], player)) {
        this.bossFire[i].removeFromParent();
        this.bossFire.splice(i, 1);
        player.isDead = true;
        break 
      }
    }
  }

  runBossFire () {
    for (let i = 0; i < this.bossFire.length; i++) {
      this.pixiApp.stage.addChild(this.bossFire[i]);
      this.bossFire[i].bossBulletUpdate();
      if (this.bossFire[i].y > 720) {
        this.bossFire[i].removeFromParent();
        this.bossFire.splice(i, 1);
    }
  }
  }
}