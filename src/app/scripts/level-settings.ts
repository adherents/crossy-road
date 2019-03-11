import { grassMap, waterMap, roadMap, dirtMap } from './level';

export function levelSettings() {
  dirtMap(1); // end-game line

  grassMap(1);
  roadMap(1);
  waterMap(2);
  roadMap(2);
  grassMap(1);
  waterMap(1);
  roadMap(2);

  dirtMap(1); // start-game line
}

