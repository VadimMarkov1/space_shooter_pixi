import { Container, Sprite } from "../../lib/pixi.mjs";

export default class PlayerShip extends Container {
  #speed = 3;
  #directionContext = {
    left: 0,
    right: 0
  }
  #movement = 0;

  constructor() {
    super();
    const shipView = Sprite.from('../../assets/player.png');
    this.canShoot = true
    shipView.width = 60;
    shipView.height = 50;
    this.x = 640;
    this.y = 660;
    this.addChild(shipView);
    this.isDead = false;
  }

  update() {
    if (this.x >= 0 && this.x <= 1220) {
      this.x += this.#speed * this.#movement;
    } else if (this.x < 0) {
      this.x = 0
    } else if (this.x > 1220) {
      this.x = 1220;
    }
  }

  flyLeft() {
    this.#directionContext.left = -1;
    this.#movement = -1;

  }

  flyRight() {
    this.#directionContext.right = 1;
    this.#movement = 1;
  }
  stopFlyLeft() {
    this.#directionContext.left = 0;
    this.#movement = this.#directionContext.right;
  }

  stopFlyRight() {
    this.#directionContext.right = 0;
    this.#movement = this.#directionContext.left;
  }
}