import { trees } from './tree';
import { player } from './player';
import { carsController } from './movableObjects';

class Test {
  treeCheck(horizontal: boolean, value: number) {
    trees.forEach(function (item, i, arr) {
      if (hitTestRectangle(player, item)) {
        if (horizontal === true) {
          player.x += value;
        } else {
          player.y += value;
        }
      }
    });
  }

  carCheck() {
    carsController.objects.forEach(function(item, i, arr) {
      if (hitTestRectangle(player, item)) {
        player.playerHurt();
      }
    });
  }
}

export const tests = new Test();

function hitTestRectangle(r1, r2) {

  // Define the variables we'll need to calculate
  let combinedHalfWidths, combinedHalfHeights, vx, vy;

  // Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  // Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  // Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  // Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  // Check for a collision on the x axis
  return Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights;
}
