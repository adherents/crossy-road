import { images } from '../gameMap/images';

export const lifesContainer = new PIXI.Container();

class PlayerLife extends PIXI.Sprite {
  constructor() {
    super(PIXI.Texture.fromImage(images.hp));
    this.scale.set(0.4, 0.4);
    this.y = 5;
  }
}

let k: PlayerLife;
export const lifes: Array<PlayerLife> = [];
function generateHealth(amount: number) {
  for (let i = 0; lifes.length <= amount; i++) {
    k = new PlayerLife();
    lifes.push(k);
  }
}
generateHealth(2);

function placeHealth() {
  let healthNext = 0;
  lifes.forEach(function (life, i, arr) {
    lifes[i].x = 160 - (lifes.length * 50);
    lifes[i].x += healthNext;
    healthNext += 50;
  });
}
placeHealth();

export function healthRender() {
  lifes.forEach(function (life, i, arr) {
    lifesContainer.addChild(life);
  });
}
healthRender();
