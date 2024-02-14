import Asteroid from "./Asteroid.js";
import PlayerShip from "./PlayerShip.js";
import Bullet from "./Bullet.js";
import Boss from "./Boss.js";

export default class EntityFactory {

  createAsteroid() {
    const asteroid = new Asteroid(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 500));
    return asteroid
  }

  createPlayerShip() {
    const spaceShip = new PlayerShip();
    return spaceShip;
  }

  createBullet(x, y) {
    const bullet = new Bullet(x, y);
    return bullet;
  }

  createBoss() {
    const boss = new Boss();
    return boss;
  }

}
