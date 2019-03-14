import { images } from './images';

export const endGameContainer = new PIXI.Container();

export function endGame(message: string) {
  const stone = PIXI.Texture.fromImage(images.stone);

  for (let i = 0; i < 144; i++) {
    const stoneMap = new PIXI.Sprite(stone);
    stoneMap.x = (i % 12) * 50;
    stoneMap.y = Math.floor(i / 12) * 50;
    endGameContainer.addChild(stoneMap);
  }

  const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 64,
    fill: '#8BC81E',
    stroke: '#FFD700',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: '#FFD700',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 4,
  });

  const msg = new PIXI.Text(message, style);
  msg.anchor.set(0.5);
  msg.x = endGameContainer.width / 2;
  msg.y = endGameContainer.height / 2;
  endGameContainer.addChild(msg);
}
