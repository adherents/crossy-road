import { images } from './images';
import { lines } from './level';

export const treesContainer = new PIXI.Container();

class Tree extends PIXI.Sprite {
  constructor() {
    super(PIXI.Texture.fromImage(images.tree));
    this.anchor.set(0.5);
    this.x = 25;
  }
}

export const trees: Array<Tree> = [];
const treesLength = lines.grassLines.length;
let sample: Tree;

function addTrees(treesCount: number) {
  let k = 0;
  for (let i = 0; trees.length < treesCount; i++ ) {
    if (k > treesLength - 1) {
      k = 0;
    }
    sample = new Tree();
    sample.y = lines.grassLines[k] - 50;
    trees.push(sample);
    k++;
  }
}
addTrees(treesLength * (Math.floor(Math.random() * 4) + 3));

function placeTrees() {
  let p = 0;
  for (let i = 0 ; i <= trees.length - 1; i++ ) {
    if (p > treesLength - 1) {
      p = 0;
    }
    const treesLine = lines.grassLines[p] - 50;
    trees[i].y = treesLine;
    trees[i].x += ((Math.floor((Math.random() * 11))) * 50);
    if (i - 1 < 0) {
    } else if (trees[i - 1].x === trees[i].x) {
      trees[i].x += ((Math.floor((Math.random() * 12))) * 50) + 50;
    }
    p++;
  }
}
placeTrees();

function treesRender() {
  trees.forEach(function(item, i, arr) {
    treesContainer.addChild(trees[i]);
  });
}
treesRender();
