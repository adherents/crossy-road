import { images } from './images';
import { Texture } from 'pixi.js';
import { levelSettings } from './level-settings';

export const levelContainer = new PIXI.Container();

const dirt = PIXI.Texture.fromImage(images.dirt);
const road = PIXI.Texture.fromImage(images.road);
const water = PIXI.Texture.fromImage(images.water);
const grass = PIXI.Texture.fromImage(images.grass);

class LevelMap extends PIXI.Sprite {
  constructor(img: Texture, count: number) {
    super(img);
    let someImage: LevelMap;

    for (let i = 0; i < 12 * count; i++) {
      someImage = new PIXI.Sprite(img);
      someImage.anchor.set(0.5);
      someImage.x = (Math.floor(i / (1 * count)) * 50) + 25;
      someImage.y = ((i % (1 * count) * 50)) + levelHeight;
      levelContainer.addChild(someImage);
    }
    levelHeight += count * 50;
  }
}

let levelHeight = 25;

export const dirtLines: Array<number> = [];
export const roadLines: Array<number> = [];
export const waterLines: Array<number> = [];
export const grassLines: Array<number> = [];

export function dirtMap(count: number) {
  const dirtMap = new LevelMap(dirt, count);
  for (let i = levelHeight; i <= levelHeight; i += 50) {
    dirtLines.push(i);
  }
}

export function roadMap(count: number) {
  const roadMap = new LevelMap(road, count);
  for (let i = levelHeight; i <= levelHeight; i += 50) {
    roadLines.push(i);
  }
}

export function waterMap(count: number) {
  const waterMap = new LevelMap(water, count);
  for (let i = levelHeight; i <= levelHeight; i += 50) {
    waterLines.push(i);
  }
}

export function grassMap(count: number) {
  const grassMap = new LevelMap(grass, count);
  for (let i = levelHeight; i <= levelHeight; i += 50) {
    grassLines.push(i);
  }
}

export const lines = {
  roadLines: roadLines,
  waterLines: waterLines,
  grassLines: grassLines
};

levelSettings();
