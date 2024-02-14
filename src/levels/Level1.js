import EntityFactory from "../entities/EntityFactory.js";


export default class Level1 {
  asteroids = [];

  constructor (pixiApp) {
    this.pixiApp = pixiApp;
    this.entityFactory = new EntityFactory();
    for (let i = 0; i < 5; i++) {
      const asteroid = this.entityFactory.createAsteroid();
      this.pixiApp.stage.addChild(asteroid);
      this.asteroids.push(asteroid);
    }
  }

  checkAsteroidHit (isCheckColision, bullets) {
    for (let i = 0; i <  this.asteroids.length; i++) {
      for (let j = 0; j < bullets.length; j++) {
        if (isCheckColision(this.asteroids[i], bullets[j])) {
          this.asteroids[i].removeFromParent();
          this.asteroids.splice(i, 1);
          bullets[j].removeFromParent();
          bullets.splice(j, 1);
          break
        }
      }
    }
  }
}