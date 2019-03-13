import { images } from './images';
import { tests } from './collisionTests';
import { lifes, lifesContainer } from './playersLife';

class Player extends PIXI.Sprite {
  heatPoints = lifes.length;

  constructor() {
    super(PIXI.Texture.fromImage(images.boy));
    this.anchor.set(0.5);
    this.x = 325;
    this.y = 575;
  }

  playerHurt() {
    this.y = 575;
    this.lifesMinus();
  }

  lifesMinus() {
    this.heatPoints --;
    lifesContainer.removeChild(lifes[this.heatPoints]);
    if (this.heatPoints <= 0) {
      this.heatPoints = 0;
      this.y = 0;
    }
  }

  playerMove(offsetX: number, offsetY: number) {
    player.x += offsetX;
    player.y += offsetY;
  }

  keyboard(keyCode) {
    const key: any = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    // The `downHandler`
    key.downHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };

    // The `upHandler`
    key.upHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) {
          key.release();
        }
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };

    // Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
      'keydown', downListener, false
    );
    window.addEventListener(
      'keyup', upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener('keydown', downListener);
      window.removeEventListener('keyup', upListener);
    };
    return key;
  }
}

export const player = new Player();

const left = player.keyboard(37),
      up = player.keyboard(38),
      right = player.keyboard(39),
      down = player.keyboard(40);

left.press = () => {
  player.playerMove(-50, 0);
  if (player.x < 0 ) {
    player.x += 50;
  }
  tests.treeCheck(true, 50);
};

up.press = () => {
  player.playerMove(0, -50);
  if (player.y < 0) {
    player.y += 50;
  }
  tests.treeCheck(false, 50);
};

right.press = () => {
  player.playerMove(50, 0);
  if (player.x > 600) {
    player.x -= 50;
  }
  tests.treeCheck(true, -50);
};

down.press = () => {
  player.playerMove(0, 50);
  if (player.y > 600) {
    player.y -= 50;
  }
  tests.treeCheck(false, -50);
};
